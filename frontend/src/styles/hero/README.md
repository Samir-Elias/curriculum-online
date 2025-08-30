# Hero Section - Estructura Modular

Este directorio contiene todos los estilos modulares para el Hero Section del portfolio.

## Estructura de Archivos

```
hero/
├── index.css              # Archivo principal que importa todos los módulos
├── hero-section.css       # Estilos principales del hero section
├── hero-cards-container.css # Contenedor de las 3 cards principales
├── hero-brand-card.css    # Card del brand "PrograMate"
├── hero-avatar.css        # Avatar e información personal
├── hero-navigation.css    # Navegación y badges
├── hero-projects.css      # Preview de proyectos
├── hero-floating-texts.css # Textos flotantes inferiores
├── hero-responsive.css    # Estilos responsive
└── README.md             # Esta documentación
```

## Módulos

### 1. `hero-section.css`
- Estilos principales del hero section
- Layout y contenedores base
- Transparencias y z-index
- Diferenciación de badges
- Colores de texto

### 2. `hero-cards-container.css`
- Contenedor invisible para modularización
- Layout de las 3 cards principales
- Estructura base de cada card

### 3. `hero-brand-card.css`
- Card del brand "PrograMate"
- Estilos del título principal
- Animación del logo "Mate"

### 4. `hero-avatar.css`
- Avatar e información personal
- Botones de acción (email, PDF, redes sociales)
- Información del usuario
- Estados y animaciones

### 5. `hero-navigation.css`
- Navegación entre secciones
- Badges de navegación
- Efectos hover y animaciones
- Iconos y descripciones

### 6. `hero-projects.css`
- Preview de proyectos
- Grid de proyectos
- Imágenes y descripciones
- Efectos hover

### 7. `hero-floating-texts.css`
- Textos flotantes inferiores
- Badges con iconos
- Efectos hover

### 8. `hero-responsive.css`
- Diseño responsive completo
- Breakpoints para tablet, mobile y small mobile
- Adaptaciones de tamaños y layouts

## Características

- **Modular**: Cada componente tiene su propio archivo CSS
- **Mantenible**: Fácil de modificar y actualizar
- **Escalable**: Estructura preparada para futuras expansiones
- **Responsive**: Adaptado a todos los tamaños de pantalla
- **Transparente**: Integrado con BackgroundAnimation
- **Accesible**: Cumple con estándares de accesibilidad

## Uso

Para usar estos estilos, simplemente importa el archivo principal:

```css
@import "./hero/index.css";
```

Esto importará automáticamente todos los módulos necesarios en el orden correcto.

## Modificaciones

Para modificar un componente específico:
1. Identifica el módulo correspondiente
2. Edita solo ese archivo
3. Los cambios se aplicarán automáticamente

## Notas Importantes

- Todos los estilos mantienen la transparencia para el BackgroundAnimation
- Los z-index están optimizados para la superposición correcta
- Los colores están configurados para legibilidad sobre el fondo animado
- Los efectos hover están optimizados para rendimiento
