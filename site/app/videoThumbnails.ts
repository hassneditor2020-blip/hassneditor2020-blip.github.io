import { localVideoCovers } from "./videoCovers";

export function videoCoverSource(videoId: string, thumbnailUrl?: string) {
  if (thumbnailUrl && !thumbnailUrl.startsWith(`https://i.ytimg.com/vi/${videoId}/`)) return thumbnailUrl;
  return localVideoCovers[videoId]?.src || thumbnailUrl || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

export function videoThumbnailSrcSet(videoId: string, thumbnailUrl?: string, maxWidth = 1280) {
  if (localVideoCovers[videoId] && (!thumbnailUrl || thumbnailUrl.startsWith(`https://i.ytimg.com/vi/${videoId}/`) || thumbnailUrl === localVideoCovers[videoId].src)) return localVideoCovers[videoId].srcSet;
  // Preserve custom/local artwork. Only select alternate sizes of the same
  // YouTube cover when the source is a YouTube thumbnail.
  if (thumbnailUrl && !thumbnailUrl.startsWith(`https://i.ytimg.com/vi/${videoId}/`)) return undefined;
  const base = `https://i.ytimg.com/vi/${videoId}`;
  const sizes = [`${base}/mqdefault.jpg 320w`, `${base}/hqdefault.jpg 480w`];
  if (maxWidth > 480 && (!thumbnailUrl || thumbnailUrl.endsWith("/maxresdefault.jpg"))) sizes.push(`${base}/maxresdefault.jpg 1280w`);
  return sizes.join(", ");
}
