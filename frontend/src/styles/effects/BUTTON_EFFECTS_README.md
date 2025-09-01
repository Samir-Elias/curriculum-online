# Efectos de Botones - Documentación

## 📁 Archivo: `button-effects.css`

Este archivo contiene **TODOS** los efectos de botones del proyecto, centralizados en un solo lugar para evitar conflictos y duplicaciones.

## 🎯 **Objetivo**
- **Centralizar** todos los estilos de botones
- **Eliminar** duplicaciones entre archivos
- **Mantener** consistencia en todos los efectos
- **Facilitar** el mantenimiento y actualizaciones

## 🔧 **Estructura del Archivo**

### 1. **Variables CSS**
```css
:root {
  --button-color: #000000;    /* Color base de los botones */
  --button-hover: #10b981;    /* Color verde para hover */
  --button-text: #ffffff;     /* Color del texto */
}
```

### 2. **Botones Principales**
- `.action-button` - Botón de acción general
- `.github-button` - Botón específico para GitHub
- `.demo-button` - Botón específico para demos
- `.desktop-action-btn` - Botones de acción en desktop
- `.project-modal-button` - Botón del modal de proyectos

### 3. **Efectos Alternativos**
- `.fill` - El verde se expande desde el centro
- `.pulse` - Efecto de pulso con animación
- `.slide` - El verde se desliza desde la izquierda
- `.up` - El verde se desliza desde abajo
- `.close` - El verde se desliza desde ambos lados
- `.raise` - Elevación con sombra externa

### 4. **Estados Especiales**
- **Deshabilitado**: `.disabled` - Opacidad reducida
- **Carga**: `.loading` - Spinner de carga
- **Focus**: Contorno azul para accesibilidad
- **Reduced Motion**: Desactiva animaciones

## 🚀 **Cómo Usar**

### **Importación**
El archivo se importa automáticamente en:
```css
@import url('./button-effects.css');
```

### **Aplicar Efectos**
```html
<!-- Botón básico con efecto offset -->
<button class="action-button">Código</button>

<!-- Botón con efecto alternativo -->
<button class="action-button fill">Demo</button>

<!-- Botón con estado de carga -->
<button class="action-button loading">Cargando...</button>
```

## 📱 **Responsive**
- **Desktop**: Efectos completos con animaciones
- **Móvil**: Efectos optimizados para touch
- **Reduced Motion**: Sin animaciones para accesibilidad

## 🎨 **Efectos Disponibles**

### **Offset (Por defecto)**
- **Estado normal**: Negro sólido con sombra offset
- **Hover**: Verde se desliza desde las esquinas
- **Transición**: 0.25s suave

### **Fill**
- **Hover**: Verde se expande desde el centro
- **Ideal para**: Botones de acción principal

### **Pulse**
- **Hover**: Efecto de pulso con animación
- **Ideal para**: Llamadas a la acción importantes

### **Slide**
- **Hover**: Verde se desliza desde la izquierda
- **Ideal para**: Navegación

### **Up**
- **Hover**: Verde se desliza desde abajo
- **Ideal para**: Botones de formulario

### **Close**
- **Hover**: Verde se desliza desde ambos lados
- **Ideal para**: Botones de cerrar

### **Raise**
- **Hover**: Elevación con sombra externa
- **Ideal para**: Botones de tarjetas

## 🔄 **Mantenimiento**

### **Agregar Nuevo Efecto**
1. Agregar el CSS en `button-effects.css`
2. Documentar el efecto aquí
3. Probar en todos los dispositivos

### **Modificar Colores**
1. Cambiar las variables CSS en `:root`
2. Los cambios se aplican automáticamente a todos los botones

### **Agregar Nuevo Botón**
1. Usar las clases existentes
2. Si es necesario, agregar nueva clase en `button-effects.css`
3. Documentar el uso

## ⚠️ **Reglas Importantes**

1. **NO** duplicar estilos de botones en otros archivos
2. **SIEMPRE** usar las clases definidas en `button-effects.css`
3. **MANTENER** la consistencia en todos los efectos
4. **PROBAR** en todos los dispositivos antes de publicar

## 🐛 **Solución de Problemas**

### **Efecto no se aplica**
- Verificar que la clase esté en `button-effects.css`
- Verificar que el archivo esté importado
- Verificar que no haya CSS conflictivo

### **Efecto se ve diferente**
- Verificar las variables CSS
- Verificar que no haya estilos duplicados
- Verificar el orden de importación

### **Problemas de rendimiento**
- Verificar que no haya animaciones infinitas
- Verificar el uso de `will-change`
- Verificar `prefers-reduced-motion`

## 📞 **Contacto**
Para dudas o problemas con los efectos de botones, revisar este archivo primero.
