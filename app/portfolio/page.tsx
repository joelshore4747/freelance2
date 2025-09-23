import type { Metadata } from "next"
import PortfolioClientPage from "./PortfolioClientPage"

export const metadata: Metadata = {
  title: "Portfolio - Studio Duo | Our Best Work & Case Studies",
  description:
    "Explore our portfolio of successful web design and development projects. See case studies, results, and the technologies we use to create exceptional digital experiences.",
  openGraph: {
    title: "Portfolio - Studio Duo",
    description:
      "Explore our portfolio of successful web design and development projects. See case studies, results, and the technologies we use.",
  },
}

export default function PortfolioPage() {
  return <PortfolioClientPage />
}
