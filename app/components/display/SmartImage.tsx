import Image, { type ImageProps } from "next/image";

/**
 * next/image that also accepts admin-entered external URLs. Remote images are not in
 * next.config's allow-list, so they are served as-is (unoptimized) instead of erroring.
 */
export default function SmartImage(props: ImageProps) {
  const remote = typeof props.src === "string" && /^https?:\/\//i.test(props.src);
  // eslint-disable-next-line jsx-a11y/alt-text -- alt is forwarded from props
  return <Image {...props} unoptimized={remote || props.unoptimized} />;
}
