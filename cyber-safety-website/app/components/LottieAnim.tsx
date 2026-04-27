import { useLottie } from "lottie-react";

export default function LottieAnim({ animationData, loop, autoplay }: { animationData: any; loop?: boolean; autoplay?: boolean }) {
  const { View } = useLottie({
    animationData: JSON.parse(JSON.stringify(animationData)), // ← deep clone
    loop: loop ?? true,
    autoplay: autoplay ?? true,
  });
  return View;
}