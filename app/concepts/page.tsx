import type { Metadata } from "next";
import { ConceptAtlas } from "./ConceptAtlas";

export const metadata: Metadata = {
  title: "核心术语关系地图 · AI World Map",
  description: "通过十五个核心术语和它们之间的关系，建立人工智能的整体认知。",
  openGraph: {
    title: "AI World Map · Core Concepts",
    description: "通过十五个核心术语和它们之间的关系，建立人工智能的整体认知。",
    images: [{ url: "/og-concepts.png", width: 1200, height: 630, alt: "AI World Map — Core Concepts" }],
  },
  twitter: { card: "summary_large_image", images: ["/og-concepts.png"] },
};

export default function ConceptsPage() { return <ConceptAtlas />; }
