"use client";
import { useEffect, useRef } from "react";

export default function LocationMap({
  center = { lat: 41.594646, lng: -87.408331 },
  zoom = 13,
  mapId,
  className = "",
}) {
  const divRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const waitForImportLibrary = () =>
      new Promise((resolve) => {
        const tick = () => {
          if (window.google?.maps?.importLibrary) resolve();
          else setTimeout(tick, 50);
        };
        tick();
      });

    (async () => {
      await waitForImportLibrary();
      const { Map } = await google.maps.importLibrary("maps");
      const { Marker } = await google.maps.importLibrary("marker");
      const { ColorScheme } = await google.maps.importLibrary("core");

      if (cancelled || !divRef.current) return;

      mapRef.current = new Map(divRef.current, {
        center,
        zoom,
        mapId,
        colorScheme: ColorScheme.DARK,
        clickableIcons: false,
        mapTypeControl: false,
        streetViewControl: false,
      });

      markerRef.current = new Marker({ position: center, map: mapRef.current });

      requestAnimationFrame(() => {
        if (!cancelled) google.maps.event.trigger(mapRef.current, "resize");
      });
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // update when center changes
  useEffect(() => {
    if (!mapRef.current || !markerRef.current) return;
    if (center?.lat == null || center?.lng == null) return;

    const pos = { lat: Number(center.lat), lng: Number(center.lng) };
    mapRef.current.setCenter(pos);
    markerRef.current.setPosition(pos);
  }, [center?.lat, center?.lng]);

  // optionally update zoom too
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setZoom(zoom);
  }, [zoom]);

  return (
    <div
      ref={divRef}
      className={`w-full rounded flex-none h-108 ${className}`}
    />
  );
}
