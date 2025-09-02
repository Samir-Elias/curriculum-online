# Mobile Education Modal

## Descripción
Componente JSX para mostrar información detallada de educación en dispositivos móviles, reutilizando los estilos del modal de proyectos para mantener consistencia visual.

## Características

### 🎯 **Funcionalidades Principales**
- **Cards colapsibles** para organizar la información
- **Navegación entre educaciones** con botones de anterior/siguiente
- **Información estructurada** en secciones lógicas
- **Imágenes de certificaciones** con slider integrado
- **Diseño responsive** optimizado para móvil

### 📱 **Estructura de Cards**
1. **Descripción General** - Información general del programa
2. **Detalles Institucionales** - Institución, período, duración, modalidad, estado
3. **Competencias Adquiridas** - Lista de habilidades y conocimientos
4. **Certificaciones** - Imágenes y enlaces a certificados

### 🎨 **Estilos Reutilizados**
- Base del modal móvil de proyectos
- Sistema de cards colapsibles
- Navegación y controles
- Responsive design

## Uso

### Props Requeridas
```jsx
<MobileEducationModal
  isOpen={boolean}
  onClose={function}
  education={object}
  onNextEducation={function}
  onPrevEducation={function}
  hasNextEducation={boolean}
  hasPrevEducation={boolean}
/>
```

### Estructura de Datos Esperada
```javascript
const education = {
  titulo: "Nombre del programa",
  institucion: "Nombre de la institución",
  duracion: "Duración del programa",
  modalidad: "Modalidad de estudio",
  descripcion: "Descripción detallada",
  competencias: ["Array de competencias"],
  certificaciones: [{
    nombre: "Nombre del certificado",
    emisor: "Emisor del certificado",
    imagenes: ["Array de URLs de imágenes"],
    url: "URL del certificado"
  }],
  estado: "Estado del programa",
  periodo: "Período de estudio"
}
```

## Implementación

### 1. Importar el Componente
```jsx
import MobileEducationModal from './MobileEducationModal';
```

### 2. Estado del Modal
```jsx
const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
const [currentEducationIndex, setCurrentEducationIndex] = useState(0);
```

### 3. Funciones de Navegación
```jsx
const nextEducation = () => {
  setCurrentEducationIndex((prev) => 
    (prev + 1) % formacionTecnica.length
  );
};

const prevEducation = () => {
  setCurrentEducationIndex((prev) => 
    (prev - 1 + formacionTecnica.length) % formacionTecnica.length
  );
};
```

### 4. Renderizar el Modal
```jsx
<MobileEducationModal
  isOpen={isEducationModalOpen}
  onClose={() => setIsEducationModalOpen(false)}
  education={formacionTecnica[currentEducationIndex]}
  onNextEducation={nextEducation}
  onPrevEducation={prevEducation}
  hasNextEducation={currentEducationIndex < formacionTecnica.length - 1}
  hasPrevEducation={currentEducationIndex > 0}
/>
```

## Estilos CSS

### Archivo Principal
- `mobile-education-modal.css` - Estilos específicos para educación

### Clases CSS Importantes
- `.education-details-grid` - Grid de detalles institucionales
- `.competencies-grid` - Grid de competencias
- `.certifications-container` - Contenedor de certificaciones
- `.status-badge` - Badge de estado del programa

### Responsive Design
- **Mobile First** - Optimizado para dispositivos móviles
- **Breakpoints** - 480px, 768px para ajustes específicos
- **Touch Friendly** - Elementos táctiles optimizados

## Ventajas

✅ **Consistencia Visual** - Mismo diseño que proyectos móvil  
✅ **Información Organizada** - Cards colapsibles para mejor UX  
✅ **Navegación Intuitiva** - Botones de anterior/siguiente  
✅ **Responsive** - Adaptado a diferentes tamaños de pantalla  
✅ **Reutilizable** - Estilos base compartidos con otros modales  

## Dependencias

- `react` - Hooks y funcionalidad base
- `react-dom` - Portal para renderizado
- `framer-motion` - Animaciones (opcional)
- `lucide-react` - Íconos
- `ImageSlider` - Componente de slider de imágenes

## Notas de Implementación

- El modal usa `createPortal` para renderizar fuera del DOM normal
- Las cards son colapsibles para optimizar el espacio en móvil
- Los estilos se importan automáticamente en `education-section.css`
- Compatible con el sistema de navegación existente de educación
