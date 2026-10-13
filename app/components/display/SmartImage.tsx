import Image, { type ImageProps } from "next/image";
import { isMediaHost, isRemoteUrl, mediaUrl } from "@/app/lib/media";

/**
 * next/image for portfolio images. A stored R2 key (or site path / URL) is turned into a URL;
 * our own R2 bucket is optimised by next/image, any other external URL is served as-is
 * because it is not in next.config's allow-list.
 */
export default function SmartImage(props: ImageProps) {
  const src = typeof props.src === "string" ? mediaUrl(props.src) : props.src;
  const external = typeof src === "string" && isRemoteUrl(src) && !isMediaHost(src);
  // eslint-disable-next-line jsx-a11y/alt-text -- alt is forwarded from props
  return <Image {...props} src={src} unoptimized={external || props.unoptimized} />;
}
