#!/bin/bash

echo "🚀 Script de Deploy - CV Samir Elias Salatino"
echo "=============================================="

# Función para mostrar opciones
show_menu() {
    echo ""
    echo "Selecciona una opción de deploy:"
    echo "1) Build local (para testing)"
    echo "2) Preparar para Netlify"
    echo "3) Preparar para Vercel"
    echo "4) Preparar para GitHub Pages"
    echo "5) Salir"
    echo ""
}

# Función para build local
build_local() {
    echo "📦 Construyendo aplicación localmente..."
    cd frontend
    npm install
    npm run build
    echo "✅ Build completado. Archivos en frontend/build/"
    echo "💡 Puedes servir localmente con: npx serve -s build"
}

# Función para Netlify
prepare_netlify() {
    echo "🌐 Preparando para deploy en Netlify..."
    cd frontend
    npm install
    npm run build
    echo "✅ Preparado para Netlify!"
    echo "📋 Instrucciones:"
    echo "   1. Ve a https://netlify.com"
    echo "   2. Arrastra la carpeta frontend/build"
    echo "   3. O conecta tu repositorio GitHub"
    echo "   4. Build command: npm run build"
    echo "   5. Publish directory: build"
}

# Función para Vercel
prepare_vercel() {
    echo "▲ Preparando para deploy en Vercel..."
    cd frontend
    npm install
    echo "✅ Preparado para Vercel!"
    echo "📋 Instrucciones:"
    echo "   1. Ve a https://vercel.com"
    echo "   2. Conecta tu repositorio GitHub"
    echo "   3. Root Directory: frontend"
    echo "   4. Build Command: npm run build"
    echo "   5. Output Directory: build"
}

# Función para GitHub Pages
prepare_github_pages() {
    echo "🐙 Preparando para GitHub Pages..."
    cd frontend
    npm install
    npm install --save-dev gh-pages
    echo "✅ Preparado para GitHub Pages!"
    echo "📋 Instrucciones:"
    echo "   1. Agrega a package.json:"
    echo '      "homepage": "https://tu-usuario.github.io/tu-repositorio"'
    echo "   2. Agrega scripts:"
    echo '      "predeploy": "npm run build"'
    echo '      "deploy": "gh-pages -d build"'
    echo "   3. Ejecuta: npm run deploy"
}

# Menú principal
while true; do
    show_menu
    read -p "Ingresa tu opción (1-5): " choice
    
    case $choice in
        1)
            build_local
            ;;
        2)
            prepare_netlify
            ;;
        3)
            prepare_vercel
            ;;
        4)
            prepare_github_pages
            ;;
        5)
            echo "👋 ¡Hasta luego!"
            exit 0
            ;;
        *)
            echo "❌ Opción inválida. Por favor selecciona 1-5."
            ;;
    esac
    
    echo ""
    read -p "Presiona Enter para continuar..."
done