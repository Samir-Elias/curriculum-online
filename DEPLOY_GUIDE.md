# 🚀 Guía Completa de Deploy

## Opciones de Deploy Recomendadas

### 1. 🌐 Netlify (Más Fácil - Recomendado)

#### Opción A: Drag & Drop
1. Construir la aplicación:
   ```bash
   cd frontend
   npm install
   npm run build
   ```
2. Ve a [netlify.com](https://netlify.com)
3. Arrastra la carpeta `frontend/build` al área de deploy
4. ¡Listo! Tu CV estará online

#### Opción B: GitHub Integration
1. Sube tu código a GitHub
2. Conecta tu repositorio en Netlify
3. Configuración:
   - **Build command:** `cd frontend && npm run build`
   - **Publish directory:** `frontend/build`
4. Deploy automático en cada push

### 2. ▲ Vercel (Muy Rápido)

1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu repositorio GitHub
3. Configuración:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
4. Deploy automático

### 3. 🐙 GitHub Pages (Gratis)

1. En `frontend/package.json`, agrega:
   ```json
   {
     "homepage": "https://tu-usuario.github.io/nombre-repositorio",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

2. Instalar gh-pages:
   ```bash
   cd frontend
   npm install --save-dev gh-pages
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

### 4. 🔥 Firebase Hosting

1. Instalar Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Inicializar:
   ```bash
   cd frontend
   firebase login
   firebase init hosting
   ```

3. Configurar:
   - **Public directory:** `build`
   - **Single-page app:** `Yes`

4. Build y deploy:
   ```bash
   npm run build
   firebase deploy
   ```

## 🛠️ Deploy Full-Stack (Opcional)

### Railway
1. Ve a [railway.app](https://railway.app)
2. Conecta tu repositorio
3. Crea dos servicios:
   - **Backend:** Root directory `backend`, Start command `uvicorn server:app --host 0.0.0.0 --port $PORT`
   - **Frontend:** Root directory `frontend`, Build command `npm run build`

### Render
1. Ve a [render.com](https://render.com)
2. Crea Web Service para backend:
   - **Root Directory:** `backend`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn server:app --host 0.0.0.0 --port $PORT`
3. Crea Static Site para frontend:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Publish Directory:** `build`

## 📱 Optimizaciones Pre-Deploy

### Performance
```bash
cd frontend
npm run build
# Analizar bundle size
npx serve -s build
```

### SEO
- ✅ Meta tags configurados
- ✅ Estructura semántica
- ✅ Imágenes optimizadas
- ✅ Responsive design

### Accesibilidad
- ✅ Componentes Radix UI
- ✅ Contraste adecuado
- ✅ Navegación por teclado

## 🔧 Troubleshooting

### Error: "Module not found"
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Error de build
```bash
cd frontend
npm run build -- --verbose
```

### Problemas de routing (SPA)
- Netlify: `_redirects` file incluido
- Vercel: `vercel.json` configurado
- Apache: Necesita `.htaccess`

## 📊 Monitoreo Post-Deploy

### Analytics (Opcional)
- Google Analytics
- Hotjar
- Vercel Analytics

### Performance
- Google PageSpeed Insights
- GTmetrix
- WebPageTest

## 🎯 Recomendación Final

**Para máxima simplicidad:** Usa Netlify con drag & drop
**Para desarrollo continuo:** Usa Vercel con GitHub
**Para presupuesto cero:** Usa GitHub Pages

---

¿Necesitas ayuda? Contacta a samireliassalatino@gmail.com