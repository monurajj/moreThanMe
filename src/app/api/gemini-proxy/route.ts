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

    try {
      // Call Gemini Vision API
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const imagePart = {
        inlineData: {
          data: imageData,
          mimeType: mimeType || 'image/jpeg'
        }
      };

      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const content = response.text();

      if (!content) {
        throw new Error('No response from Gemini');
      }

      return NextResponse.json({
        success: true,
        data: content
      });

    } catch (geminiError) {
      console.error('Gemini API Error via proxy:', geminiError);
      
      const errorMessage = geminiError instanceof Error ? geminiError.message : 'Unknown error';
      const isQuotaExceeded = errorMessage.includes('429') || errorMessage.includes('quota');
      
      return NextResponse.json(
        { 
          error: isQuotaExceeded ? 'Gemini quota exceeded. Please try again later.' : 'Failed to process with Gemini', 
          details: errorMessage,
          quotaExceeded: isQuotaExceeded
        },
        { status: isQuotaExceeded ? 429 : 500 }
      );
    }

  } catch (error) {
    console.error('Error in Gemini proxy:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to process request', details: errorMessage },
      { status: 500 }
    );
  }
} 