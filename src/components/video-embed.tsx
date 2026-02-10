/** biome-ignore-all lint/style/useBlockStatements: <syntax> */
/** biome-ignore-all lint/nursery/noShadow: <> */
/** biome-ignore-all lint/performance/useTopLevelRegex: <> */

interface VideoEmbedProps {
  url: string;
  title?: string;
  provider?: "youtube" | "vimeo" | "other";
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  className?: string;
}

export function VideoEmbed({
  url,
  title,
  provider = "youtube",
  autoplay = false,
  controls = true,
  loop = false,
  className = "",
}: VideoEmbedProps) {
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <>
  const getEmbedUrl = () => {
    if (!url) return "";

    // Handle YouTube URLs
    if (
      provider === "youtube" ||
      url.includes("youtube.com") ||
      url.includes("youtu.be")
    ) {
      const youtubeId = extractYouTubeId(url);
      if (youtubeId) {
        const params = new URLSearchParams();
        if (autoplay) params.set("autoplay", "1");
        if (!controls) params.set("controls", "0");
        if (loop) params.set("loop", "1");
        return `https://www.youtube.com/embed/${youtubeId}?${params.toString()}`;
      }
    }

    // Handle Vimeo URLs
    if (provider === "vimeo" || url.includes("vimeo.com")) {
      const vimeoId = extractVimeoId(url);
      if (vimeoId) {
        const params = new URLSearchParams();
        if (autoplay) params.set("autoplay", "1");
        if (!controls) params.set("controls", "0");
        if (loop) params.set("loop", "1");
        return `https://player.vimeo.com/video/${vimeoId}?${params.toString()}`;
      }
    }

    return url;
  };

  const extractYouTubeId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    );
    return match ? match[1] : null;
  };

  const extractVimeoId = (url: string) => {
    const match = url.match(/(?:vimeo\.com\/)([0-9]+)/);
    return match ? match[1] : null;
  };

  const embedUrl = getEmbedUrl();

  if (!embedUrl) {
    return (
      <div className={`rounded-lg bg-muted p-4 text-center ${className}`}>
        <p className="text-muted-foreground">Invalid video URL</p>
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-hidden rounded-lg ${className}`}>
      <div className="relative aspect-video">
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 h-full w-full"
          src={embedUrl}
          title={title || "Embedded video"}
        />
      </div>
    </div>
  );
}
