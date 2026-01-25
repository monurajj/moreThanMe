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
      const prompt = `Please analyze this UPI payment receipt screenshot and extract the following information in JSON format. This is for payment verification purposes, so accuracy is crucial:

{
  "sender_name": string (sender's name like "Mira Bai Jena"),
  "sender_phone": string (sender's phone number like "+91 87639 59773"),
  "from_account": string (sender's bank account details like "Nabin Kumar Sahu (State Bank of India)"),
  "from_upi_id": string (sender's UPI ID like "mirabaijena1c-4@oksbi"),
  "recipient_name": string (recipient's name like "Manish Kumar"),
  "to_upi_id": string (recipient's UPI ID like "mk10092004-1@oksbi"),
  "amount": number (the donation amount in INR, extract ONLY the numeric value without any currency symbols),
  "status": string (payment status like "Completed", "Pending", etc.),
  "date_time": string (date and time of transaction like "26 July 2025, 8:08 PM"),
  "transaction_id": string (UPI reference number or transaction ID),
  "payment_method": string (UPI, card, etc.),
  "confidence": number (0-1, how confident you are in the extraction),
  "notes": string (any additional notes or observations),
  "verification_status": string ("verified", "pending", "failed" based on your confidence)
}

IMPORTANT INSTRUCTIONS:
1. Focus on extracting UPI payment details like sender name, phone, UPI IDs, recipient details, amount, status, and date/time
2. For the amount field, extract ONLY the numeric value without any currency symbols or formatting
3. Examples: "₹500" → 500, "₹3,000" → 3000, "₹1,50,000" → 150000
4. Set verification_status to "verified" if confidence > 0.8, "pending" if 0.5-0.8, "failed" if < 0.5
5. If any field cannot be determined from the image, use null for that field
6. This is for payment verification, so be very careful with amount extraction
7. Return ONLY valid JSON, no additional text`;

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
        const errorData = await geminiResponse.json();
        throw new Error(errorData.error || 'Failed to call Gemini API');
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
        model_used: 'gemini-1.5-flash'
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
        // Return mock data for testing when quota is exceeded
        const mockData = {
          sender_name: "Mira Bai Jena",
          sender_phone: "+91 87639 59773",
          from_account: "Nabin Kumar Sahu (State Bank of India)",
          from_upi_id: "mirabaijena1c-4@oksbi",
          recipient_name: "Manish Kumar",
          to_upi_id: "mk10092004-1@oksbi",
          amount: 3000,
          status: "Completed",
          date_time: "26 July 2025, 8:08 PM",
          transaction_id: "UPI123456789",
          payment_method: "UPI",
          confidence: 0.95,
          notes: "Mock data - Gemini quota exceeded",
          verification_status: "pending"
        };

        return NextResponse.json({
          success: true,
          data: mockData,
          mock_data: true,
          message: "Using mock data due to Gemini quota exceeded"
        }, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });
      }
      
      throw geminiError;
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