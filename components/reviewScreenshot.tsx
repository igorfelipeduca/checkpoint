import { Image } from "@nextui-org/react";
import { XIcon } from "lucide-react";

interface ReviewScreenshotProps {
  setScreenshots: React.Dispatch<React.SetStateAction<Screenshot[]>>;
  id: number;
  url: string;
}

export interface Screenshot {
  id: number;
  url: string;
}

export default function ReviewScreenshot({
  id,
  url,
  setScreenshots,
}: ReviewScreenshotProps) {
  const removeScreenshot = () => {
    setScreenshots((screenshots) => screenshots.filter((_, i) => i != id));
  };

  return (
    <Image
      alt="screenshot"
      className="rounded-xl w-full h-full aspect-video"
      isBlurred
      src={url}
    />
  );
}
