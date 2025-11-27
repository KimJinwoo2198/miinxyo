import { getAboutData, getExperienceData, getPortfolioData, getContactData } from "@/lib/markdown";
import { InteractivePortfolio } from "@/components/InteractivePortfolio";

export default function Home() {
  const about = getAboutData();
  const experience = getExperienceData();
  const portfolio = getPortfolioData();
  const contact = getContactData();

  return (
    <InteractivePortfolio
      about={about}
      experience={experience}
      portfolio={portfolio}
      contact={contact}
    />
  );
}
