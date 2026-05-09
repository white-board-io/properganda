import ColoringStudio from "./components/ColoringStudio";
import { getMothersDayColoringPages } from "./lib/coloring-pages";

export default async function MothersDayPage() {
  const images = await getMothersDayColoringPages();

  return <ColoringStudio images={images} />;
}
