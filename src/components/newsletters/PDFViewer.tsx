'use client';

import { useEffect } from 'react';

interface PDFViewerProps {
  url: string;
  onClose: () => void;
}

export default function PDFViewer({ url, onClose }: PDFViewerProps) {
  useEffect(() => {
    // Open PDF in new tab
    window.open(url, '_blank');
    // Close the modal immediately
    onClose();
  }, [url, onClose]);

  // Return null as we're opening in a new tab
  return null;
}

