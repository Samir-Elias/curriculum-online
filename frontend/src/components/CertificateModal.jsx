import React from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import ImageSlider from "./ImageSlider";

const CertificateModal = ({ selectedCertificate, setSelectedCertificate }) => {
  if (!selectedCertificate) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={() => setSelectedCertificate(null)}
    >
      <div 
        className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden certificate-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header del modal */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{selectedCertificate.nombre}</h3>
            <p className="text-sm text-gray-600">{selectedCertificate.emisor}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(selectedCertificate.url)}
              className="text-xs"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Enlace original
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedCertificate(null)}
              className="text-xs"
            >
              ✕ Cerrar
            </Button>
          </div>
        </div>
        
        {/* Imagen de la certificación */}
        <div className="flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-full max-h-[70vh] relative">
            <ImageSlider 
              images={selectedCertificate.imagenes}
              alt={`Certificado ${selectedCertificate.nombre}`}
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;