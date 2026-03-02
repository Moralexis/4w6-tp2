"use client"

import { Show } from "@/app/_types/show";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  //google map
  const googleApiKey = "AIzaSyCdXEJDERdzW46faUuv9xhoKJbsMXyc7es";
  const center = { lat: -4, lng: -40 };
  const zoom = 4;
  const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([])
  const [showList, setShowList] = useState<Show[]>([])
  const t = useTranslations();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleApiKey
  });

  const apiKey = "2b32475766802ac01eefda45e9e42ea0";
  const param = useParams<{ name: string }>();
  const name = decodeURIComponent(param.name)
  //parseFloat(monString) pour changer un string en number (lat/long)

  async function getShow() {

    const response = await axios.get(`https://rest.bandsintown.com/artists/${name}/events?app_id=${apiKey}`);
    console.log(response.data);

    let shows: Show[] = [];
    for (let s of response.data) {
      shows.push(new Show(s.id, s.datetime, s.venue.country, s.venue.city, s.venue.longitude, s.venue.latitude));
    }

    return shows;

  }

  async function addShow() {
    const s = await getShow();
    setShowList(s);
    
    const mark :{ lat: number; lng: number } [] = [];
    for(const c of s){
      const lat = parseFloat(c.latitude);
      const lng = parseFloat(c.longitude);
      mark.push({ lat, lng });
    }

    setMarkers(mark)
  }

  //founction format date Pris d'internet pour pouvoir affiché comme dans l'image 
  //(j'ai quand même pris le temps de comprendre le code en générale avant de la mettre)
  
  function formatDate(date: Date) {
    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, '0');
    const month = d.toLocaleString(`fr-Fr`,{month: 'long'})
    const year = d.getFullYear();

    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');

    return `${day} ${month} ${year} à ${hours}:${minutes}:${seconds}`;
  }

  useEffect(() => {
    addShow()
  }, []);

  return (
    <main className="w-5xl mx-auto my-4">
      <h2 className="text-center text-2xl py-1">{t('Concerts.concertsOf', {name})}</h2>
      <div className="mx-auto w-2xl artist">
        {isLoaded &&
          <GoogleMap
            center={center}
            zoom={zoom}
            mapContainerStyle={{ width: "100%", height: "400px" }}
          >
            {markers.map((m, index) =>
              <Marker key={index} position={{ lat: m.lat, lng: m.lng }}></Marker>
            )}
          </GoogleMap>}
      </div>
      <div className="flex m-3 flex-wrap">
        {showList.length == 0 &&
        <div>{t('Concerts.noShows')}</div>
        }
        {showList.map(s =>
          <div key={`${s.id}`} className="basis-1/4">
            <div className="m-1 p-1 artist">
              <h4>{formatDate(s.date)}</h4>
              <div>{s.pays}</div>
              <div>{s.ville}</div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
