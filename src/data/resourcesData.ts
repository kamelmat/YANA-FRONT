import avatarMedit1 from "../assets/resources/avatar_medit1.png"
import avatarMedit2 from "../assets/resources/avatar_medit2.png"
import avatarMedit3 from "../assets/resources/avatar_medit3.png"
import avatarMedit4 from "../assets/resources/avatar_medit4.png"
import imgMedit1 from "../assets/resources/img_medit1.png"
import imgMedit2 from "../assets/resources/img_medit2.png"
import imgMedit3 from "../assets/resources/img_medit3.png"
import imgMedit4 from "../assets/resources/img_medit4.png"

import avatarPodcast1 from "../assets/resources/avatarPodcast1.png"
import avatarPodcast2 from "../assets/resources/avatarPodcast2.png"
import avatarPodcast3 from "../assets/resources/avatarPodcast3.png"
import avatarPodcast4 from "../assets/resources/avatarPodcast4.png"
import avatarPodcast5 from "../assets/resources/avatarPodcast5.png"
import avatarPodcast6 from "../assets/resources/avatarPodcast6.png"
import imgPodcast1 from "../assets/resources/imgPodcast1.png"
import imgPodcast2 from "../assets/resources/imgPodcast2.png"
import imgPodcast3 from "../assets/resources/imgPodcast3.png"
import imgPodcast4 from "../assets/resources/imgPodcast4.png"
import imgPodcast5 from "../assets/resources/imgPodcast5.png"
import imgPodcast6 from "../assets/resources/imgPodcast6.png"

import imgPlaylist1 from "../assets/resources/imgPlaylist1.svg"
import imgPlaylist2 from "../assets/resources/imgPlaylist2.svg"
import imgPlaylist3 from "../assets/resources/imgPlaylist3.svg"
import imgPlaylist4 from "../assets/resources/imgPlaylist4.svg"

export type resourcesDataProps = {
  id: number
  avatar: string | null
  title: string
  description: string
  image: string
}

export const meditationData: resourcesDataProps[] = [
  {
    id: 1,
    avatar: avatarMedit1,
    title: "Mente tranquila. Un espacio seguro.",
    description: "Meditación para principiantes.Gabriela Málaga · 3k de vistas · hace 1 año",
    image: imgMedit1,
  },
  {
    id: 2,
    avatar: avatarMedit2,
    title: "Bienestar emocional.Tiempo de introspección.",
    description: "Meditación guiada para relajar. Luz Zapata · 4k de vistas · hace 3 meses",
    image: imgMedit2,
  },
  {
    id: 3,
    avatar: avatarMedit3,
    title: "Aquí y ahora. En busca de la tranquilidad.",
    description: "Medita y conecta Alma Soler · 11k de vistas · hace 11 meses",
    image: imgMedit3,
  },
  {
    id: 4,
    avatar: avatarMedit4,
    title: "Runa solar.Un viaje sonoro a tu interior.",
    description: "Medita y conócete a ti mismo. Runa Solar · 1k de vistas ·  hace 2 años",
    image: imgMedit4,
  },
]

export const podcastData: resourcesDataProps[] = [
  {
    id: 1,
    avatar: avatarPodcast1,
    title: "¿Cómo cultivar la solidaridad?",
    description: "Lic. Ana Gabriela Mena y equipo",
    image: imgPodcast1,
  },
  {
    id: 2,
    avatar: avatarPodcast2,
    title: "Aprender en comunidad",
    description: "Centro de Crecimiento Personal",
    image: imgPodcast2,
  },
  {
    id: 3,
    avatar: avatarPodcast3,
    title: "Vivir vale la pena",
    description: "Escuela de Desarrollo Colectivo",
    image: imgPodcast3,
  },
  {
    id: 4,
    avatar: avatarPodcast4,
    title: "Siempre adelante",
    description: "Lorena Capobianco Ludueña",
    image: imgPodcast4,
  },
  {
    id: 5,
    avatar: avatarPodcast5,
    title: "Cuentas conmigo",
    description: "Centro Médico Zafiro",
    image: imgPodcast5,
  },
  {
    id: 6,
    avatar: avatarPodcast6,
    title: "Puentes conectados",
    description: "ONG Red de apoyo",
    image: imgPodcast6,
  },
]

export const playlistData: resourcesDataProps[] = [
  {
    id: 1,
    title: "Manos enlazadas. Canciones para conectar con tu entorno.",
    description: "Música india orientada a mejorar tu vinculación con lo que te rodea.",
    image: imgPlaylist1,
    avatar: null,
  },
  {
    id: 2,
    title: "Sensaciones. Sonidos que calman.",
    description: "Una exquisita selección musical producida con cuencos tibetanos.",
    image: imgPlaylist2,
    avatar: null,
  },
  {
    id: 3,
    title: "Sonidos que te ayudan a dormir.",
    description: "Una experiencia auditiva relajante para conciliar el sueño.",
    image: imgPlaylist3,
    avatar: null,
  },
  {
    id: 4,
    title: "ENYA La naturaleza como fuente de inspiración.",
    description:
      "La música de la artista irlandesa guía hacia un viaje de conexión profunda con el ambiente.",
    image: imgPlaylist4,
    avatar: null,
  },
]
