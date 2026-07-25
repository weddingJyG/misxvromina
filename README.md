# 🌸 INVITACIÓN DIGITAL PREMIUM DE XV AÑOS

Invitación web estática, elegate, femenina, romántica y 100% funcional creada para la celebración de **XV Años**.

Diseñada bajo un enfoque estrictamente **Mobile First**, optimizada para teléfonos móviles (iOS / Android) y adaptable a tablets y computadoras de escritorio.

---

## 🚀 CARACTERÍSTICAS PRINCIPALES

- **Mobile First & Responsive**: Optimizada para pantallas de 320px hasta 1200px+.
- **Configuración Centralizada (`js/config.js`)**: Toda la información (Nombre, Fecha, Hora, Ubicación, WhatsApp, Galería, Itinerario, Dress Code, Mesa de Regalos) se edita en un solo archivo JS sin tocar el HTML/CSS.
- **Sin Frameworks pesados**: Desarrollada en HTML5, CSS3 y JavaScript ES6+ Vanilla.
- **Vista Previa de WhatsApp (Open Graph)**: Incluye etiquetas `og:title`, `og:description`, `og:image` y `og:url` para que al compartir por WhatsApp se genere una tarjeta de presentación elegante.
- **Música de Fondo (Opcional)**: Botón flotante delicado para reproducir/pausar música de fondo.
- **Pétalos de Rosa Flotantes**: Efecto visual interactivo mediante HTML5 Canvas y CSS sin afectar el rendimiento.
- **Cuenta Regresiva en Vivo**: Cálculo automático en tiempo real hasta la fecha del evento.
- **Galería de Fotos Interactiva**: Con Lightbox modal full-screen y soporte de gestos táctiles (Swipe).
- **Confirmación por WhatsApp**: Genera automáticamente el mensaje de confirmación con el nombre y fecha.
- **Sección de Ubicación con Mapa**: Muestra el lugar y un botón interactivo "Cómo llegar" conectado a Google Maps.
- **Mesa de Regalos & Lluvia de Sobres**: Botones configurables a tiendas (Liverpool, Amazon, etc.) y datos bancarios para transferencias.

---

## 📂 ESTRUCTURA DEL PROYECTO

```
invitacion-xv/
├── index.html              # Estructura principal HTML5
├── css/
│   └── styles.css          # Sistema de diseño CSS3 (Variables, Grids, Glassmorphism)
├── js/
│   ├── config.js           # ARCHIVO DE CONFIGURACIÓN CENTRALIZADA
│   └── main.js             # Lógica JavaScript (Cuenta regresiva, audio, lightbox, petals)
├── assets/
│   ├── images/             # Imágenes y preview para WhatsApp (hero_bg, quinceanera_1-4, og_preview)
│   └── music/              # Pistas de audio (opcional)
└── README.md
```

---

## ⚙️ CÓMO PERSONALIZAR UNA NUEVA INVITACIÓN

Para adaptar esta invitación a otra festejada o fecha, solo debes abrir el archivo:

`js/config.js`

Y modificar el objeto `invitationData`:

```javascript
const invitationData = {
    quinceaneraName: "VALENTINA",
    eventSubtitle: "Mis XV Años",
    eventDate: "2026-08-15T18:00:00", // Formato YYYY-MM-DDTHH:MM:SS
    displayDate: "Sábado, 15 de Agosto de 2026",
    eventTime: "18:00 hrs",
    venue: "Salón Jardín Las Amapolas",
    address: "Av. de las Rosas #1500, Col. Vista Hermosa, Ciudad de México",
    googleMapsUrl: "https://maps.google.com/?q=...",
    whatsappNumber: "5215512345678", // Número con clave de país sin el símbolo '+'
    musicUrl: "assets/music/vals.mp3", // O URL HTTPS
    ...
};
```

---

## 💻 CÓMO EJECUTAR EL PROYECTO

1. **Localmente**: Simplemente abre `index.html` haciendo doble clic en cualquier navegador web moderno (Chrome, Safari, Edge, Firefox).
2. **Servidor Local Dev**: Puedes usar la extensión "Live Server" de VS Code o `npx serve` / `python -m http.server`.
3. **Despliegue Web Gratuito**: Puedes subir la carpeta del proyecto a:
   - GitHub Pages
   - Netlify
   - Vercel
   - Firebase Hosting
   - Cualquier Hosting cPanel / FTP tradicional

---

## ✨ TECNOLOGÍAS

- **HTML5 Semantic Markup**
- **CSS3 Modern Custom Properties & Glassmorphism**
- **Vanilla JavaScript ES6+**
- **Google Fonts (Great Vibes & Cormorant Garamond)**
