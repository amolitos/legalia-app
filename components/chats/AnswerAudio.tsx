import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Download, Pause, Play } from "lucide-react";
import { useChatMediaURL } from "@/hooks/useChat";
import { useAudioPlayerContext } from "react-use-audio-player";
import { ChatMessage } from "@/lib/types";
import { Slider } from "../ui/slider";

export const AnswerAudio = ({
  chatId,
  message,
}: {
  chatId: number;
  message: ChatMessage;
}) => {
  const lastLoadedAudioSrc = useRef<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);

  const {
    duration: globalDuration,
    load,
    src,
    isPlaying,
    togglePlayPause,
    getPosition,
    seek,
  } = useAudioPlayerContext();

  const {
    activeId,
    audioSrc,
    isLoading,
    setActiveId,
    getPlaybackUrl,
    getDownloadUrl,
  } = useChatMediaURL(chatId, message.answer_file_path);

  const iAmActive = activeId === message.id && src === audioSrc;

  useEffect(() => {
    if (!iAmActive || !isPlaying) {
      return;
    }
    const interval = setInterval(() => {
      const newTime = Math.floor(getPosition());
      if (!isNaN(newTime)) {
        setCurrentTime(newTime);
      }
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, [iAmActive, isPlaying, getPosition]);

  useEffect(() => {
    if (!iAmActive && currentTime !== 0) {
      setCurrentTime(0);
    }
  }, [iAmActive, currentTime]);

  useEffect(() => {
    if (!audioSrc || activeId !== message.id) {
      lastLoadedAudioSrc.current = null;
      return;
    }

    if (lastLoadedAudioSrc.current === audioSrc) {
      return;
    }

    load(audioSrc, {
      initialVolume: 0.75,
      autoplay: true,
    });

    lastLoadedAudioSrc.current = audioSrc;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioSrc, activeId, message.id]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const paddedSecs = secs.toString().padStart(2, "0");
    return `${mins}:${paddedSecs}`;
  };

  const handlePlay = () => {
    if (iAmActive) {
      togglePlayPause();
      return;
    }

    setActiveId(message.id);

    if (!audioSrc) {
      getPlaybackUrl();
      return;
    }

    if (audioSrc && src !== audioSrc) {
      load(audioSrc, {
        initialVolume: 0.75,
        autoplay: true,
      });
      lastLoadedAudioSrc.current = audioSrc;
    }
  };

  const handleSeek = useCallback(
    (value: number[]) => {
      const newTime = value[0];
      if (iAmActive) {
        seek(newTime);
        setCurrentTime(newTime);
      }
    },
    [iAmActive, seek]
  );

  const displayDuration = iAmActive ? Math.floor(globalDuration) : 0;
  const displayTime = iAmActive ? currentTime : 0;
  const showPauseIcon = iAmActive && isPlaying;

  return (
    <div className="flex items-center gap-3 border border-neutral-200 rounded-2xl p-3">
      <Button onClick={handlePlay} variant="ghost" size="icon">
        {showPauseIcon ? <Pause /> : <Play />}
      </Button>
      <p className="w-10 text-sm text-neutral-500 text-center">
        {formatTime(displayTime)}
      </p>
      <Slider
        value={[displayTime]}
        onValueChange={handleSeek}
        max={displayDuration}
        step={1}
        disabled={isLoading || displayDuration === 0}
      />
      <p className="w-10 text-sm text-neutral-500 text-center">
        {formatTime(displayDuration)}
      </p>
      <Button onClick={getDownloadUrl} variant="ghost" size="icon">
        <Download />
      </Button>
    </div>
  );
};
