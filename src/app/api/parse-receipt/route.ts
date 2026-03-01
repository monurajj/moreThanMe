import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: "Parse receipt API is working",
    geminiConfigured: !!process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY,
    geminiKeyLength: process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY?.length || 0
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    // Check if Gemini API key is configured
    if (!process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY === '') {
      console.error("Gemini API key not configured or empty");
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        }
      );
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    try {
      const prompt = `You are a receipt data extractor. Analyze the UPI payment receipt screenshot image provided and extract the ACTUAL values visible in the image.

CRITICAL: Extract ONLY what you see in the image. Do NOT invent, guess, or use placeholder values. If a field is not visible (e.g. phone number), use null.

Return a single JSON object with these exact keys:
{
  "sender_name": string or null (payer name, e.g. "Payment initiated by" or "Debited account" holder),
  "sender_phone": string or null (only if visible in the receipt),
  "from_account": string or null (bank name and account, e.g. "State Bank Of India"),
  "from_upi_id": string or null (payer UPI ID, may be masked),
  "recipient_name": string or null (BANKING NAME - the recipient/business name, e.g. "AKASH G" or "Payment received by"),
  "to_upi_id": string or null (recipient UPI ID - extract exactly as shown, often masked like ****3722@kotak or 8088133722@kotakbank),
  "amount": number (ONLY the numeric amount in INR - e.g. ₹1.00 → 1, ₹500 → 500),
  "status": string (e.g. "Paid", "Completed", "Success"),
  "date_time": string (exact date and time from receipt),
  "transaction_id": string (the UPI reference/transaction ID number),
  "payment_method": string (e.g. "UPI", "Bank account"),
  "confidence": number (0-1, your confidence in this extraction),
  "notes": string or null,
  "verification_status": "verified" or "pending" or "failed"
}

RULES:
- recipient_name: Extract the banking/recipient name exactly as shown (e.g. "AKASH G").
- to_upi_id: Extract as shown - may be full (8088133722@kotakbank) or masked (****3722@kotak). Include last 4 digits before @ when visible.
- amount: Extract the exact number. ₹1.00 = 1, ₹3000 = 3000. No currency symbols.
- verification_status: "verified" if confidence > 0.8, else "pending" or "failed"
- date_time: Use format "DD MMM YYYY, HH:MM AM/PM" (e.g. "1 Mar 2025, 3:45 PM"). If not visible use null.
- Return ONLY valid JSON, no markdown, no extra text`;

      // Call Gemini API via proxy
      const geminiResponse = await fetch(`${request.nextUrl.origin}/api/gemini-proxy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          imageData: base64Image,
          mimeType: file.type
        })
      });

      if (!geminiResponse.ok) {
        let errorData: { error?: string; details?: string } = {};
        try {
          errorData = await geminiResponse.json();
        } catch {
          errorData = { error: `Gemini API returned ${geminiResponse.status}` };
        }
        const msg = errorData.error || 'Failed to call Gemini API';
        const fullMsg = errorData.details ? `${msg}: ${errorData.details}` : msg;
        throw new Error(fullMsg);
      }

      const geminiData = await geminiResponse.json();
      const content = geminiData.data;
      
      if (!content) {
        throw new Error('No response from Gemini');
      }

      // Try to parse the JSON response
      let parsedData;
      try {
        // Extract JSON from the response (in case it includes additional text)
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedData = JSON.parse(jsonMatch[0]);
        } else {
          parsedData = JSON.parse(content);
        }
      } catch (parseError) {
        console.error('Failed to parse Gemini response:', parseError);
        console.error('Content that failed to parse:', content);
        return NextResponse.json(
          { error: 'Failed to parse receipt data', details: parseError instanceof Error ? parseError.message : 'Unknown parsing error' },
          { 
            status: 500,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type',
            },
          }
        );
      }

      return NextResponse.json({
        success: true,
        data: parsedData,
        raw_response: content,
        model_used: 'gemini-2.0-flash'
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });

    } catch (geminiError) {
      console.error('Gemini Vision API Error:', geminiError);
      
      // Check if it's a quota exceeded error
      const errorMessage = geminiError instanceof Error ? geminiError.message : 'Unknown error';
      const isQuotaExceeded = errorMessage.includes('429') || errorMessage.includes('quota') || errorMessage.includes('rate limit');
      
      if (isQuotaExceeded) {
        return NextResponse.json(
          {
            error: 'Gemini quota exceeded. Please try again later.',
            quotaExceeded: true,
          },
          {
            status: 429,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type',
            },
          }
        );
      }

      // Return proper JSON instead of rethrowing (so client always gets structured error)
      const errMsg = geminiError instanceof Error ? geminiError.message : 'Unknown error';
      return NextResponse.json(
        { error: errMsg, details: errMsg },
        { status: 500, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } }
      );
    }

  } catch (error) {
    console.error('Error processing receipt:', error);
    
    // Check if it's a quota exceeded error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const isQuotaExceeded = errorMessage.includes('429') || errorMessage.includes('quota') || errorMessage.includes('rate limit');
    
    return NextResponse.json(
      { 
        error: isQuotaExceeded ? 'Gemini quota exceeded. Please try again later or add credits to your account.' : 'Failed to process receipt', 
        details: errorMessage,
        quotaExceeded: isQuotaExceeded,
        stack: error instanceof Error ? error.stack : undefined
      },
      { 
        status: isQuotaExceeded ? 429 : 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  }
} 