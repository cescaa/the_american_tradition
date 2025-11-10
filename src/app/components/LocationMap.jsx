"use client";

import { useEffect, useRef } from "react";

export default function LocationMap({
  center = { lat: 41.594646, lng: -87.408331 }, // Fresno
  zoom = 13,
  mapId, // optional: your Cloud Map ID
  className = "", // let parent pass extra classes
}) {
  const mapRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    // 1) Ensure the Maps bootstrap has run and importLibrary exists.
    const waitForImportLibrary = () =>
      new Promise((resolve) => {
        const tick = () => {
          if (
            typeof window !== "undefined" &&
            window.google?.maps?.importLibrary
          ) {
            resolve();
          } else {
            setTimeout(tick, 50);
          }
        };
        tick();
      });

    (async () => {
      await waitForImportLibrary();

      const { Map } = await google.maps.importLibrary("maps");
      const { Marker } = await google.maps.importLibrary("marker");
      const { ColorScheme } = await google.maps.importLibrary("core");

      if (cancelled || !mapRef.current) return;

      // 2) Build the map
      const map = new Map(mapRef.current, {
        center,
        zoom,
        mapId,
        colorScheme: ColorScheme.DARK,
        clickableIcons: false,
        mapTypeControl: false,
        streetViewControl: false,
      });

      new Marker({ position: center, map });

      // 3) If the container was 0x0 at init (can happen in grids),
      //    force a resize once it's laid out.
      requestAnimationFrame(() => {
        if (!cancelled) google.maps.event.trigger(map, "resize");
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [center.lat, center.lng, zoom, mapId]);

  // IMPORTANT: explicit height, otherwise nothing renders
  return (
    <div
      ref={mapRef}
      className={`w-full rounded flex-none h-108 ${className}`}
    />
  );
}
