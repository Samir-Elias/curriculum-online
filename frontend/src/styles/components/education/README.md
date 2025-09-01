# Educación Section - Nueva Estructura

## Descripción
Esta carpeta contiene los estilos y componentes para la sección de educación completamente rediseñada.

## Archivos

### `education-section.css`
- Estilos principales para la sección de educación
- Diseño de carrusel similar al de proyectos pero adaptado para información educativa
- Responsive design con breakpoints optimizados
- Efectos de glassmorphism y animaciones suaves

### Certificaciones
- Los certificados ahora se muestran dentro del modal de educación unificado
- Layout responsive integrado en education-section.css
- Slider de imágenes de certificados dentro del modal principal

## Características Principales

### Educación Section
- ✅ Carrusel de navegación con controles intuitivos
- ✅ Diseño de tarjetas con información organizada
- ✅ Metadatos visuales (duración, modalidad, período)
- ✅ Lista completa de competencias desarrolladas
- ✅ Botón para ver certificaciones en modal
- ✅ Indicadores de progreso (dots)
- ✅ Navegación por teclado y gestos táctiles
- ✅ Diseño responsive completo

### Certificate Modal
- ✅ Layout de dos columnas (info/imagen)
- ✅ Información detallada del certificado
- ✅ Slider de imágenes para múltiples certificados
- ✅ Botones de acción (ver original, cerrar)
- ✅ Animaciones suaves de entrada/salida
- ✅ Diseño responsive que se adapta a móviles

## Estructura de Datos
La sección utiliza la estructura `formacionTecnica` del `profileData.jsx` que incluye:
- Título e institución
- Duración, modalidad y período
- Descripción detallada
- Lista de competencias
- Array de certificaciones con imágenes

## Responsive Design
- **Desktop**: Layout completo con dos columnas en modal
- **Tablet**: Adaptación de columnas y espaciado
- **Mobile**: Stack vertical y controles optimizados

## Tecnologías Utilizadas
- React con hooks personalizados
- Framer Motion para animaciones
- CSS Grid y Flexbox para layouts
- Glassmorphism y efectos modernos
- Tailwind CSS para utilidades
