import { useCallback, useState } from "react";

const useSound = (url: any) => {
  const [audio] = useState(new Audio(url));

  const play = useCallback(() => {
    audio.currentTime = 0;
    audio.play();
  }, [audio]);

  return { play };
};

export default useSound;
