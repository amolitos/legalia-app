import {
  AudioLines,
  FileIcon,
  FileTextIcon,
  ImageIcon,
  VideoIcon,
} from "lucide-react";

const getFileIcon = (mimeType: string) => {
  const iconMap = {
    pdf: {
      icon: FileTextIcon,
      conditions: (mimeType: string) =>
        mimeType.includes("/pdf") || mimeType.includes("text/"),
    },
    image: {
      icon: ImageIcon,
      conditions: (mimeType: string) => mimeType.includes("image/"),
    },
    audio: {
      icon: AudioLines,
      conditions: (mimeType: string) => mimeType.includes("audio/"),
    },
    video: {
      icon: VideoIcon,
      conditions: (mimeType: string) => mimeType.includes("video/"),
    },
  };

  for (const { icon: Icon, conditions } of Object.values(iconMap)) {
    if (conditions(mimeType)) {
      return <Icon className="size-5 opacity-60" />;
    }
  }

  return <FileIcon className="size-5 opacity-60" />;
};

export const DocumentIcon = ({ mimeType }: { mimeType: string }) => {
  return (
    <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-md">
      {getFileIcon(mimeType)}
    </div>
  );
};
