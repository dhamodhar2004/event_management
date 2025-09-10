import React from 'react';
import QRCode from 'react-qr-code';
import { X, Download } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  qrData: string;
}

export function QRCodeModal({ isOpen, onClose, eventTitle, qrData }: QRCodeModalProps) {
  if (!isOpen) return null;

  const downloadQR = () => {
    const svg = document.querySelector('.qr-code-svg') as SVGElement;
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `${eventTitle}-qr-code.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Event QR Code</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="text-center">
          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4 inline-block">
            <QRCode
              className="qr-code-svg"
              value={qrData}
              size={200}
              level="M"
            />
          </div>
          
          <h3 className="font-medium text-gray-900 mb-2">{eventTitle}</h3>
          <p className="text-sm text-gray-600 mb-6">
            Show this QR code at the event entrance for quick check-in.
          </p>
          
          <div className="flex space-x-3">
            <button
              onClick={downloadQR}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}