'use client';

import { useEffect } from 'react';

interface PDFViewerProps {
  url: string;
  title: string;
  onClose: () => void;
}

export default function PDFViewer({ url, title, onClose }: PDFViewerProps) {
  useEffect(() => {
    // Open PDF in new tab
    window.open(url, '_blank');
    // Close the modal immediately
    onClose();
  }, [url, onClose]);

  // Return null as we're opening in a new tab
  return null;
}

