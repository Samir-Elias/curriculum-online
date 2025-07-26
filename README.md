# CV Digital - Samir Elias Salatino

## 🚀 Descripción del Proyecto

CV digital interactivo desarrollado con React y Tailwind CSS. Presenta de manera moderna y profesional el perfil de Samir Elias Salatino como Desarrollador Backend Java | Full-Stack Developer.

## 🛠️ Stack Tecnológico

### Frontend
- **React 19** - Framework principal
- **Tailwind CSS** - Estilos y diseño responsive
- **Framer Motion** - Animaciones fluidas
- **Lucide React** - Iconografía moderna
- **Radix UI** - Componentes accesibles

### Backend (Opcional)
- **FastAPI** - API REST
- **MongoDB** - Base de datos
- **Python** - Lenguaje backend

## 📁 Estructura del Proyecto

```
/app
├── frontend/          # Aplicación React
│   ├── src/
│   │   ├── components/
│   │   │   ├── Resume.jsx     # Componente principal del CV
│   │   │   └── ui/            # Componentes UI reutilizables
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
├── backend/           # API FastAPI (opcional)
│   ├── server.py
│   └── requirements.txt
└── README.md
```

## 🚀 Instrucciones de Deploy

### Opción 1: Deploy Solo Frontend (Recomendado)

#### Netlify
1. **Preparar el build:**
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Deploy en Netlify:**
   - Conecta tu repositorio GitHub a Netlify
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/build`
   - O arrastra la carpeta `build` directamente a Netlify

#### Vercel
1. **Preparar el proyecto:**
   ```bash
   cd frontend
   npm install
   ```

2. **Deploy en Vercel:**
   - Conecta tu repositorio a Vercel
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`

#### GitHub Pages
1. **Instalar gh-pages:**
   ```bash
   cd frontend
   npm install --save-dev gh-pages
   ```

2. **Agregar scripts en package.json:**
   ```json
   {
     "homepage": "https://tu-usuario.github.io/tu-repositorio",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

### Opción 2: Deploy Full-Stack

#### Railway/Render
1. **Variables de entorno necesarias:**
   ```
   MONGO_URL=tu_mongodb_connection_string
   DB_NAME=tu_database_name
   ```

2. **Deploy backend:**
   - Conecta tu repositorio
   - Root Directory: `backend`
   - Start Command: `uvicorn server:app --host 0.0.0.0 --port $PORT`

3. **Deploy frontend:**
   - Conecta el mismo repositorio
   - Root Directory: `frontend`
   - Build Command: `npm run build`

## 🔧 Desarrollo Local

### Solo Frontend
```bash
cd frontend
npm install
npm start
```
La aplicación estará disponible en `http://localhost:3000`

### Con Backend
1. **Backend:**
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn server:app --reload
   ```

2. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```

## 📱 Características

- ✅ **Diseño Responsive** - Optimizado para móviles, tablets y desktop
- ✅ **Animaciones Fluidas** - Transiciones suaves con Framer Motion
- ✅ **Modo Impresión** - Optimizado para generar PDF
- ✅ **Navegación Suave** - Scroll automático entre secciones
- ✅ **Componentes Interactivos** - Proyectos expandibles y enlaces funcionales
- ✅ **SEO Optimizado** - Meta tags y estructura semántica
- ✅ **Accesibilidad** - Componentes accesibles con Radix UI

## 🎨 Personalización

### Colores y Tema
Los colores principales se pueden modificar en `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Personaliza aquí los colores
      }
    }
  }
}
```

### Contenido
Todo el contenido del CV se encuentra en el objeto `profileData` dentro de `/frontend/src/components/Resume.jsx`

## 📞 Contacto

- **Email:** samireliassalatino@gmail.com
- **LinkedIn:** [Samir Elías](https://www.linkedin.com/in/samir-elías)
- **GitHub:** [Samir-Elias](https://github.com/Samir-Elias)
- **Portfolio:** [Google Sites](https://sites.google.com/view/samir-elias-salatino/inicio)

## 📄 Licencia

Este proyecto es de uso personal para Samir Elias Salatino.

---

**Desarrollado con ❤️ desde Mendoza, Argentina**
