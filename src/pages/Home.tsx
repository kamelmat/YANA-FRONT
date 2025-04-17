import Emotions from "../components/Emotions";

export default function Home() {
  return <Emotions onEmotionClick={(emotion) => console.log(`Elegiste: ${emotion}`)} />
}
