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
    eventDate: "2026-11-06T14:00:00-06:00",
    displayDate: "Viernes, 06 de Noviembre de 2026",
    eventTime: "14:00 hrs",
    
    // Ubicación y Lugar
    venue: "Salón Princes",
    address: "Huanimaro, GTO",
    latitude: 19.432608,
    longitude: -99.133209,
    googleMapsUrl: "https://maps.google.com/?q=19.432608,-99.133209",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!4v1785541373429!6m8!1m7!1s_LLMjFp9mmaJcp6V1wrsFg!2m2!1d20.36884792324512!2d-101.4927663524957!3f352.6073068665633!4f3.668149797827681!5f0.7820865974627469",

    // WhatsApp para confirmaciones (Incluir código de país sin '+')
    whatsappNumber: "5215512345678",
    whatsappMessageTemplate: "¡Hola! Confirmo con mucho gusto mi asistencia a los XV Años de {NAME} el {DATE}. ¡Nos vemos allá! ✨",

    // Música de Fondo
    musicUrl: "assets/music/BeautifulPiano.mp3",

    // Imágenes
    heroImage: "assets/images/hero_bg.png",
    ogImage: "assets/images/og_preview.png",
    
    // Mensaje de bienvenida
    welcomeTitle: "Hay momentos inolvidables...",
    welcomeMessage: "Hay momentos en la vida que merecen ser celebrados y compartidos con las personas que más queremos. Gracias por formar parte de mi historia y acompañarme en este día tan mágico y especial.",

    // Itinerario de actividades
    itinerary: [
        {
            time: "02:00 pm",
            title: "Ceremonia Religiosa",
            icon: "church",
            description: "Templo de Nuestra Sra. de Guadalupe"
        },
        {
            time: "03:00 pm",
            title: "Recepción de Invitados",
            icon: "glass",
            description: ""
        },
        {
            time: "03:30 pm",
            title: "Entrada de la Quinceañera",
            icon: "sparkles",
            description: "Presentación oficial de Romina ante sus invitados."
        },
        {
            time: "04:00 pm",
            title: "Comida",
            icon: "utensils",
            description: ""
        },

        {
            time: "08:00 pm",
            title: "Apertura de Pista & Fiesta",
            icon: "party",
            description: "¡Música en vivo"
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
    dressCode: "Formal",
    dressCodeDescription: "Queremos compartir contigo una noche elegante y muy especial.",

    // Padres y Padrinos
    parentsAndGodparents: {
        enabled: true,

        title: "Padres y Padrinos",

        subtitle: "Con mucho cariño y gratitud, compartimos los nombres de quienes nos acompañan y forman parte especial de este momento.",

        parents: {
            title: "Mis Padres",
            father: "Pablo Salazar",
            mother: "Yessica Vidal"
        },

        godparents: {
            title: "Mis Padrinos",
            godfather: "Erick Saldaña",
            godmother: "Adriana Vidal"
        }
    },

    // Mensaje Final y Despedida
    finalMessage: "Gracias por formar parte de este momento tan especial. Tu presencia hará que este día sea aún más inolvidable.",
    footerText: "Con cariño, Romina Salazar Vidal • Mis XV Años 🌸"
};

if (typeof window !== 'undefined') {
    window.invitationData = invitationData;
}
