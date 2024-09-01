
import { useStore } from "@/store/index";
import AboutSectionTwo from "../home_2/AboutSection";
import AboutSection from "../home/AboutSection";

export default function AboutSectionWrapper() {
  const settings = useStore((state) => state.settings);

  if (settings?.theme == "theme1") {
    return <AboutSectionTwo />;
  } else {
    return <AboutSection />;
  }
}
