"use client"

import { Show } from "@/app/_types/show";
import axios from "axios";
import { useParams } from "next/navigation";

export default function Home() {

  const apiKey = "2b32475766802ac01eefda45e9e42ea0";
  const param = useParams<{ name: string }>();
  const name = param.name

  async function getShow() {

    const response = await axios.get(`https://rest.bandsintown.com/artists/${name}/events?app_id=${apiKey}`);
    console.log(response.data);

    let shows: Show[] = [];
    for (let s of response.data) {
      shows.push(new Show(s.id, s.datetime, s.venue.location[1], s.venue.location[0]));
    }

    return shows;

  }

  return (
    <main className="w-5xl mx-auto my-4">
      <h2 className="text-center text-2xl py-1">Concerts de {name}</h2>
      <div className="mx-auto w-2xl artist">
        <img src="images/carte.png" alt="Carte" />
      </div>

      <div className="flex m-3 flex-wrap">
        <div className="basis-1/4">
          <div className="m-1 p-1 artist">
            <h4>DATE ET HEURE</h4>
            <div>PAYS</div>
            <div>VILLE</div>
          </div>
        </div>
      </div>
    </main>
  );
}
