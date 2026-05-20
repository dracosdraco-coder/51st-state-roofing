'use client';

interface BackgroundVideoProps {
  src: string;
  opacity?: number;
}

export default function BackgroundVideo({ src, opacity = 60 }: BackgroundVideoProps) {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="absolute inset-0 w-full h-full object-cover z-0"
      style={{
        opacity: opacity / 100,
        WebkitPlaysinline: 'true',
      } as React.CSSProperties}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
