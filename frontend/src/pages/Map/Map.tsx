import { useEffect, useRef } from "react";
import maplibregl, { type DataDrivenPropertyValueSpecification } from "maplibre-gl";
import useStore from "@stores/useStore";
import "maplibre-gl/dist/maplibre-gl.css";
import MapSidebar from "../../components/MapSideBar/MapSideBar";
import styles from "./Map.module.css";

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const palette = ["#dbead7", "#c3dcbc", "#abcea1", "#94c186", "#7cb36b", "#66a253", "#558745", "#446c37", "#33512a", "#20331a"];

  const { setRegionData, setSelectedRegionId }: any = useStore();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef?.current, // container id
      style: "https://tiles.openfreemap.org/styles/positron", // style URL
      center: [-4, 54], // starting position [lng, lat]
      zoom: 5, // starting zoom
    });

    mapRef.current = map;

    map.on("load", async () => {
      const response = await fetch("http://localhost:3000/carbon-intensity/live-intensity/regions");
      const data = await response.json();
      const geojson = data.geojson;
      setRegionData(data.regions);

      map.addSource("boundaries", {
        type: "geojson",
        data: geojson,
      });

      map.addLayer({
        id: "boundaries-fill",
        source: "boundaries",
        type: "fill",
        paint: {
          "fill-color": ["step", ["get", "forecast"], palette[0], ...palette.flatMap((color, i) => [Math.floor((i * geojson.maxValue) / palette.length), color])] as DataDrivenPropertyValueSpecification<string>,
          "fill-opacity": 0.6,
        },
      });

      map.addLayer({
        id: "boundaries-line",
        source: "boundaries",
        type: "line",
        paint: {
          "line-color": "#20331a",
        },
      });
    });

    const popup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
    });

    map.on("click", "boundaries-fill", (e) => {
      const feature = e.features?.[0];
      if (feature) {
        const forecast = feature.properties?.forecast;
        const regionId = feature.properties?.ID;
        setSelectedRegionId(regionId);
        popup.setLngLat(e.lngLat).setHTML(`<strong>Forecast:</strong> ${forecast}`).addTo(map);
      }
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <main>
      <MapSidebar />
      <div className={styles.mapContainer} ref={mapContainerRef}></div>
    </main>
  );
}
