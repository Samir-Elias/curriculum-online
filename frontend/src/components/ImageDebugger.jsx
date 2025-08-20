import React, { useState, useEffect } from "react";
import { AlertTriangle, CheckCircle, XCircle, RefreshCw } from "lucide-react";

const ImageDebugger = ({ images, projectName }) => {
  const [imageStatus, setImageStatus] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  // Normalizar las imágenes a un array
  const normalizedImages = React.useMemo(() => {
    if (!images) return [];
    if (typeof images === 'string') return [images];
    if (Array.isArray(images)) return images;
    return [];
  }, [images]);

  // Función para probar si una imagen se puede cargar
  const testImageLoad = (url, index) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        setImageStatus(prev => ({
          ...prev,
          [index]: { status: 'success', url, error: null }
        }));
        resolve(true);
      };
      img.onerror = (error) => {
        setImageStatus(prev => ({
          ...prev,
          [index]: { status: 'error', url, error: error.type || 'Error de carga' }
        }));
        resolve(false);
      };
      img.src = url;
    });
  };

  // Probar todas las imágenes
  const testAllImages = async () => {
    setImageStatus({});
    for (let i = 0; i < normalizedImages.length; i++) {
      await testImageLoad(normalizedImages[i], i);
    }
  };

  useEffect(() => {
    if (normalizedImages.length > 0) {
      testAllImages();
    }
  }, [normalizedImages]);

  // Solo mostrar el debugger si hay errores o si está forzado a ser visible
  const hasErrors = Object.values(imageStatus).some(status => status.status === 'error');
  
  if (!hasErrors && !isVisible) {
    return (
      <div className="mb-2">
        <button
          onClick={() => setIsVisible(true)}
          className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
        >
          <AlertTriangle size={12} />
          Debug imágenes
        </button>
      </div>
    );
  }

  return (
    <div className="mb-4 p-3 bg-gray-50 border rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <AlertTriangle size={16} className="text-orange-500" />
          Debug de imágenes - {projectName}
        </h4>
        <div className="flex gap-2">
          <button
            onClick={testAllImages}
            className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1"
          >
            <RefreshCw size={12} />
            Recargar
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="text-xs px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Ocultar
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        {normalizedImages.map((url, index) => {
          const status = imageStatus[index];
          return (
            <div key={index} className="flex items-start gap-2 text-xs">
              <div className="flex-shrink-0 mt-0.5">
                {!status ? (
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                ) : status.status === 'success' ? (
                  <CheckCircle size={16} className="text-green-500" />
                ) : (
                  <XCircle size={16} className="text-red-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Imagen {index + 1}:</span>
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    !status ? 'bg-gray-200 text-gray-600' :
                    status.status === 'success' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {!status ? 'Cargando...' : status.status === 'success' ? 'OK' : 'Error'}
                  </span>
                </div>
                <div className="text-gray-600 break-all mt-1">
                  {url}
                </div>
                {status && status.error && (
                  <div className="text-red-600 mt-1">
                    Error: {status.error}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {normalizedImages.length === 0 && (
        <div className="text-center py-2 text-gray-500 text-sm">
          No hay imágenes configuradas para este proyecto
        </div>
      )}
      
      <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
        <strong>Consejos de debugging:</strong>
        <ul className="mt-1 space-y-1 text-gray-600">
          <li>• Verifica que las URLs sean accesibles públicamente</li>
          <li>• Revisa la consola del navegador para más detalles</li>
          <li>• Asegúrate de que las imágenes tengan CORS habilitado</li>
          <li>• Verifica que el formato de imagen sea compatible (jpg, png, gif, webp)</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageDebugger;