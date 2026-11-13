import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Videos — Luma",
  description: "Project demo and promotional videos for the Luma landing page.",
  alternates: { canonical: "/videos" },
};

type Video = {
  id: string;
  label: string;
  title: string;
  description: string;
  // Set to the file in public/videos once the video exists; null shows a "coming soon" placeholder.
  src: string | null;
  orientation: "horizontal" | "vertical";
};

const demo: Video = {
  id: "demo",
  label: "Demo",
  title: "Project walkthrough",
  description: "A tour of the landing page, its responsive layouts, the mobile menu and the contact form.",
  src: "/videos/luma-demo.mp4",
  orientation: "horizontal",
};

const promos: Video[] = [
  {
    id: "promo-horizontal",
    label: "Promo · 16:9",
    title: "Luma promo, horizontal",
    description: "For desktop, YouTube and presentations.",
    src: "/videos/luma-promo-horizontal.mp4",
    orientation: "horizontal",
  },
  {
    id: "promo-vertical",
    label: "Promo · 9:16",
    title: "Luma promo, vertical",
    description: "For Reels, Shorts and Stories.",
    src: "/videos/luma-promo-vertical.mp4",
    orientation: "vertical",
  },
];

function VideoCard({ video, className }: { video: Video; className?: string }) {
  const titleId = `${video.id}-title`;
  const aspect = video.orientation === "horizontal" ? "aspect-video" : "aspect-[9/16]";

  return (
    <article aria-labelledby={titleId} className={cn("flex flex-col gap-4", className)}>
      {video.src ? (
        <video
          controls
          playsInline
          preload="metadata"
          className={cn("w-full rounded-2xl bg-navy", aspect)}
          aria-labelledby={titleId}
        >
          <source src={video.src} type="video/mp4" />
          <a href={video.src} className="text-brand underline">
            Download the video
          </a>
        </video>
      ) : (
        <div
          className={cn(
            "flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line bg-white text-center",
            aspect,
          )}
        >
          <p className="font-display text-h5-m font-bold text-ink md:text-h5">Coming soon</p>
          <p className="text-body text-ink-muted">The demo video is being recorded.</p>
        </div>
      )}
      <div>
        <Eyebrow>{video.label}</Eyebrow>
        <h2 id={titleId} className="mt-2 font-display text-h5-m font-bold text-ink md:text-h5">
          {video.title}
        </h2>
        <p className="mt-1 text-body text-ink-muted">{video.description}</p>
      </div>
    </article>
  );
}

export default function VideosPage() {
  return (
    <>
      <header className="border-b border-line bg-cream">
        <Container className="flex h-18 items-center justify-between">
          <Link href="/" aria-label="Luma home">
            <Image src="/images/logo.svg" alt="" width={54} height={17} className="h-[17px] w-auto" priority />
          </Link>
          <Link href="/" className="text-body font-semibold text-brand hover:underline">
            Back to the site
          </Link>
        </Container>
      </header>

      <main id="main" className="bg-cream py-15 md:py-20">
        <Container className="flex flex-col gap-12 md:gap-16">
          <div className="max-w-[640px]">
            <Eyebrow>Frontend Engineer Coding Challenge</Eyebrow>
            <h1 className="mt-4 font-display text-h2-m font-extrabold text-ink md:text-h2">Videos</h1>
            <p className="mt-4 text-subtitle-1-m text-ink-muted md:text-subtitle-1">
              A walkthrough of the project and two promotional cuts of the Luma landing page.
            </p>
          </div>

          <VideoCard video={demo} />

          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[2fr_1fr] md:gap-8">
            {promos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                className={video.orientation === "vertical" ? "mx-auto w-full max-w-[360px]" : undefined}
              />
            ))}
          </div>
        </Container>
      </main>
    </>
  );
}
