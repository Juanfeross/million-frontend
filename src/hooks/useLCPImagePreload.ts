import { useEffect } from "react";

export const useLCPImagePreload = (imageUrl: string | null | undefined) => {
  useEffect(() => {
    if (!imageUrl) return;

    const existingLink = document.querySelector(`link[rel="preload"][as="image"][href="${imageUrl}"]`);
    if (existingLink) return;

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = imageUrl;
    (link as HTMLLinkElement & { fetchPriority?: string }).fetchPriority = "high";

    const firstChild = document.head.firstChild;
    if (firstChild) {
      document.head.insertBefore(link, firstChild);
    } else {
      document.head.appendChild(link);
    }

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [imageUrl]);
};
