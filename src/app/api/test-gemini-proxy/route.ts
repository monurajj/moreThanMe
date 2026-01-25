import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: "Gemini proxy test endpoint",
    geminiConfigured: !!process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY,
    geminiKeyLength: process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY?.length || 0,
    environment: process.env.NODE_ENV
  });
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, imageData, mimeType } = await request.json();

    if (!prompt || !imageData) {
      return NextResponse.json(
        { error: 'Missing prompt or image data' },
        { status: 400 }
      );
    }

    // Call the Gemini proxy API
    const proxyResponse = await fetch(`${request.nextUrl.origin}/api/gemini-proxy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        imageData,
        mimeType: mimeType || 'image/jpeg'
      })
    });

    const proxyData = await proxyResponse.json();

    return NextResponse.json({
      success: proxyResponse.ok,
      proxyResponse: proxyData,
      testEndpoint: true
    });

  } catch (error) {
    console.error('Error in test endpoint:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to test proxy', details: errorMessage },
      { status: 500 }
    );
  }
} 