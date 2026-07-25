/**
 * CONFIGURACIÓN CENTRALIZADA DE LA INVITACIÓN DIGITAL DE XV AÑOS
 * Quinceañera: Romina Salazar Vidal
 */

const invitationData = {
    // Datos de la Quinceañera
    quinceaneraName: "Romina Salazar Vidal",
    shortName: "Romina",
    eventSubtitle: "Mis XV Años",
    heroPhrase: "Con mucha ilusión quiero compartir contigo uno de los días más especiales de mi vida.",
    
    // Fecha y Hora del Evento (Formato ISO para la cuenta regresiva)
    eventDate: "2026-08-15T18:00:00",
    displayDate: "Sábado, 15 de Agosto de 2026",
    eventTime: "18:00 hrs",
    
    // Ubicación y Lugar
    venue: "Salón Jardín Las Amapolas",
    address: "Av. de las Rosas #1500, Col. Vista Hermosa, Ciudad de México",
    latitude: 19.432608,
    longitude: -99.133209,
    googleMapsUrl: "https://maps.google.com/?q=19.432608,-99.133209",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.661608637085!2d-99.13539768509341!3d19.4326079868822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f92b00000001%3A0x123456789abcdef!2sZocalo!5e0!3m2!1ses!2smx!4v1600000000000!5m2!1ses!2smx",

    // WhatsApp para confirmaciones (Incluir código de país sin '+')
    whatsappNumber: "5215512345678",
    whatsappMessageTemplate: "¡Hola! Confirmo con mucho gusto mi asistencia a los XV Años de {NAME} el {DATE}. ¡Nos vemos allá! ✨",

    // Música de Fondo
    musicUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-waltz-112191.mp3",

    // Imágenes
    heroImage: "assets/images/hero_bg.png",
    ogImage: "assets/images/og_preview.png",
    
    // Mensaje de bienvenida
    welcomeTitle: "Hay momentos inolvidables...",
    welcomeMessage: "Hay momentos en la vida que merecen ser celebrados y compartidos con las personas que más queremos. Gracias por formar parte de mi historia y acompañarme en este día tan mágico y especial.",

    // Itinerario de actividades
    itinerary: [
        {
            time: "18:00",
            title: "Ceremonia Religiosa",
            icon: "church",
            description: "Capilla de San José. Una misa de acción de gracias."
        },
        {
            time: "20:00",
            title: "Recepción de Invitados",
            icon: "glass",
            description: "Coctel de bienvenida con música suave en el jardín."
        },
        {
            time: "20:30",
            title: "Entrada de la Quinceañera",
            icon: "sparkles",
            description: "Presentación oficial de Romina ante sus invitados."
        },
        {
            time: "21:00",
            title: "El Vals de Honor",
            icon: "music",
            description: "Baile tradicional con sus padres, padrinos y chambelanes."
        },
        {
            time: "21:30",
            title: "Cena Gourmet",
            icon: "utensils",
            description: "Banquete a tres tiempos y brindis de honor."
        },
        {
            time: "22:30",
            title: "Apertura de Pista & Fiesta",
            icon: "party",
            description: "¡Música en vivo, DJ y mucha diversión!"
        }
    ],

    // Galería de Fotografías (Lightbox)
    gallery: [
        {
            url: "assets/images/quinceanera_1.png",
            caption: "El vestido de mis sueños ✨"
        },
        {
            url: "assets/images/quinceanera_2.png",
            caption: "Contando los días con emoción"
        },
        {
            url: "assets/images/quinceanera_3.png",
            caption: "Detalles inolvidables"
        },
        {
            url: "assets/images/quinceanera_4.png",
            caption: "Celebrando mis XV en el jardín"
        }
    ],

    // Dress Code (Código de Vestimenta)
    dressCode: "Formal / Etiqueta",
    dressCodeDescription: "Queremos compartir contigo una noche elegante y muy especial. Se sugiere vestido largo para damas y traje formal para caballeros. (Agradecemos reservar los tonos blanco y rosa para la festejada).",

    // Mesa de Regalos / Regalos (Opcional)
    giftRegistry: {
        enabled: true,
        title: "Mesa de Regalos",
        subtitle: "Tu presencia es nuestro mejor regalo. Si deseas obsequiarme un detalle especial, te compartimos las siguientes opciones con mucho cariño:",
        stores: [
            {
                name: "Liverpool",
                icon: "bag",
                url: "https://www.liverpool.com.mx",
                code: "Evento #50982341"
            },
            {
                name: "Amazon",
                icon: "package",
                url: "https://www.amazon.com.mx",
                code: "Mesa de Regalos XV Romina"
            }
        ],
        bankDetails: {
            enabled: true,
            title: "Lluvia de Sobres / Transferencia",
            description: "Si lo prefieres, dispondremos de un buzón para sobres el día del evento, o bien puedes realizar una transferencia a:",
            bank: "BBVA Bancomer",
            clabe: "012 180 0150982341 0",
            account: "1509823410",
            beneficiary: "Romina Salazar Vidal & Familia"
        }
    },

    // Mensaje Final y Despedida
    finalMessage: "Gracias por formar parte de este momento tan especial. Tu presencia hará que este día sea aún más inolvidable.",
    footerText: "Con cariño, Romina Salazar Vidal • Mis XV Años 🌸"
};

if (typeof window !== 'undefined') {
    window.invitationData = invitationData;
}
