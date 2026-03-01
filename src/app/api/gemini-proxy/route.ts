import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Use public environment variable as requested
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    // Check if Gemini API key is configured
    if (!process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY) {
      console.error("Gemini API key not configured");
      return NextResponse.json(
        { 
          error: 'Gemini API key not configured',
          details: 'Please set NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY in your environment variables'
        },
        { status: 500 }
      );
    }

    const { prompt, imageData, mimeType } = await request.json();

    if (!prompt || !imageData) {
      return NextResponse.json(
        { error: 'Missing prompt or image data' },
        { status: 400 }
      );
    }

    const imagePart = {
      inlineData: {
        data: imageData,
        mimeType: mimeType || 'image/jpeg'
      }
    };

    // Gemini 1.5 Flash first (15 req/min, 1,500 req/day), then fallbacks
    const modelsToTry = ['gemini-1.5-flash', 'gemini-2.5-flash-lite', 'gemini-2.0-flash', 'gemini-2.5-flash'];
    let lastError: Error | null = null;

    const isQuotaErr = (msg: string) =>
      /429|quota|rate limit|resource.?exhausted|exceeded|resource_exhausted|retry/i.test(msg);
    const isModelNotFound = (msg: string) => /404|not found|not supported/i.test(msg);

    for (const modelName of modelsToTry) {
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName });
          const result = await model.generateContent([prompt, imagePart]);
          const response = await result.response;
          const content = response.text();

          if (!content) throw new Error('No response from Gemini');

          return NextResponse.json({
            success: true,
            data: content,
            model_used: modelName
          });
        } catch (err) {
          lastError = err instanceof Error ? err : new Error(String(err));
          const msg = lastError.message;
          const quotaErr = isQuotaErr(msg);
          const notFound = isModelNotFound(msg);
          console.warn(
            `[Gemini] ${modelName} attempt ${attempt} failed:`,
            msg.slice(0, 120),
            notFound ? '→ model not found, trying next' : quotaErr ? '→ will retry/fallback' : '→ stopping'
          );
          if (!quotaErr && !notFound) break;
          if (quotaErr && attempt === 1) await new Promise((r) => setTimeout(r, 8000));
        }
      }
      if (lastError && !isQuotaErr(lastError.message) && !isModelNotFound(lastError.message)) break;
      await new Promise((r) => setTimeout(r, 1500));
    }

    const errorMessage = lastError?.message || 'Unknown error';
    const isQuotaExceeded = isQuotaErr(errorMessage);
    
    return NextResponse.json(
      { 
        error: isQuotaExceeded ? 'Gemini quota exceeded. Please try again later.' : 'Failed to process with Gemini', 
        details: errorMessage,
        quotaExceeded: isQuotaExceeded
      },
      { status: isQuotaExceeded ? 429 : 500 }
    );

  } catch (error) {
    console.error('Error in Gemini proxy:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to process request', details: errorMessage },
      { status: 500 }
    );
  }
} 