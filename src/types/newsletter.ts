export interface Newsletter {
  id: string;
  title: string;
  description?: string;
  category: string;
  file_path: string;
  created_at: string;
  url: string;
}

export interface NewsletterResponse {
  [category: string]: Newsletter[];
}

export interface NewsletterDB {
  id: string;
  title: string;
  description: string | null;
  category: string;
  file_path: string;
  created_at: string;
}

