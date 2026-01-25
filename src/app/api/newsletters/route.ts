import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import type { NewsletterDB, NewsletterResponse, Newsletter } from '@/types/newsletter';

export async function GET() {
  try {
    // Create Supabase client with service role key for admin access
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      // console.error('Missing Supabase environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }
    console.log('supabaseServiceKey', supabaseServiceKey);
    console.log('supabaseUrl', supabaseUrl);
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Fetch all newsletter metadata from database
    const { data, error } = await supabase
      .from('newsletters')
      .select('*')
      .order('created_at', { ascending: false });
    console.log('data from newsletters', data);  
    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // If no newsletters found, return empty object
    if (!data || data.length === 0) {
      return NextResponse.json({});
    }

    const newsletters = data as NewsletterDB[];
    const grouped: NewsletterResponse = {};

    // Process each newsletter and generate signed URL
    for (const newsletter of newsletters) {
      // Remove 'newsletters/' prefix if it exists in the file_path
      const cleanPath = newsletter.file_path.startsWith('newsletters/')
        ? newsletter.file_path.substring('newsletters/'.length)
        : newsletter.file_path;

      // Generate signed URL (valid for 1 hour)
      const { data: signedData, error: signedError } = await supabase.storage
        .from('newsletters')
        .createSignedUrl(cleanPath, 3600); // 1 hour = 3600 seconds

      if (signedError) {
        console.error('Error generating signed URL:', signedError);
        continue; // Skip this newsletter if URL generation fails
      }

      const newsletterWithUrl: Newsletter = {
        id: newsletter.id,
        title: newsletter.title,
        description: newsletter.description || undefined,
        category: newsletter.category,
        file_path: newsletter.file_path,
        created_at: newsletter.created_at,
        url: signedData.signedUrl,
      };

      // Group by category
      if (!grouped[newsletter.category]) {
        grouped[newsletter.category] = [];
      }

      grouped[newsletter.category].push(newsletterWithUrl);
    }

    return NextResponse.json(grouped);
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

