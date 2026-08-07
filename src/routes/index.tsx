import { createFileRoute } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const Portfolio = lazy(() => import("@/components/Portfolio"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aniket Chakraborty — Developer Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Aniket Chakraborty: AI-powered web apps, full-stack projects, data analytics work, internships and certifications.",
      },
      { property: "og:title", content: "Aniket Chakraborty — Developer Portfolio" },
      {
        property: "og:description",
        content:
          "AI-powered web apps, full-stack projects and data analytics work by Aniket Chakraborty.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <ClientOnly fallback={<div className="min-h-screen bg-background" />}>
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Portfolio />
      </Suspense>
    </ClientOnly>
  );
}
