"use client"
import { useState, useEffect, useCallback } from "react";
import QRCode from "qrcode";
import Image from "next/image";

interface QRCodeGeneratorProps {
  upiId: string;
  payeeName: string;
  amount?: number;
}

export default function QRCodeGenerator({ upiId, payeeName, amount }: QRCodeGeneratorProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const generateQRCode = useCallback(async () => {
    setIsLoading(true);
    try {
      // Create UPI payment URL
      const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}${amount ? `&am=${amount}` : ""}&cu=INR`;
      
      // Generate QR code
      const qrDataUrl = await QRCode.toDataURL(upiUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF"
        }
      });
      
      setQrCodeDataUrl(qrDataUrl);
    } catch (error) {
      console.error("Error generating QR code:", error);
    } finally {
      setIsLoading(false);
    }
  }, [upiId, payeeName, amount]);

  useEffect(() => {
    generateQRCode();
  }, [generateQRCode]);



  if (isLoading) {
    return (
      <div className="w-[200px] h-[200px] bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
        <div className="text-gray-400">Generating QR Code...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-[200px] h-[200px] bg-white rounded-lg flex items-center justify-center">
        {qrCodeDataUrl ? (
          <Image 
            src={qrCodeDataUrl} 
            alt="UPI QR Code" 
            width={200}
            height={200}
            className="rounded-lg"
          />
        ) : (
          <div className="text-center">
            <div className="text-4xl mb-2">📱</div>
            <p className="text-sm text-gray-600">QR Code</p>
          </div>
        )}
      </div>
    </div>
  );
} 