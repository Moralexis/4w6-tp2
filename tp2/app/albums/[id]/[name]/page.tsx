"use client"
import { useEffect, useState } from "react";
import { useConnect } from "../../../_hooks/use-connect"
import { Album } from "../../../_types/album";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Artist } from "@/app/_types/artist";


export default function Home() {
  const [token, setToken] = useState();
  const [albumList, setAlbumList] = useState<Album[]>([]);
  const param = useParams<{ id: string, name: string }>();
  const id = param.id;
  const name = param.name
  const router = useRouter();


  async function getAlbums(artistId: string) {

    const response = await axios.get("http://localhost:5143/api/Albums/getAlbums/" + artistId, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token // 🔑 Votre token de connexion
      }
    });
    console.log(response.data);

    let albums: Album[] = [];
    for (let a of response.data) {
      albums.push(new Album(a.id, a.name, a.imageUrl));
    }

    return albums;

  }

  async function addAlbum() {
    const a = await getAlbums(id);
    setAlbumList(a);
  }

  useEffect(() => {
    useConnect();
    addAlbum()
  }, []);

  return (
    <main className="w-5xl mx-auto mt-4">
      <h2 className="text-center text-2xl py-1">Albums de {name}</h2>
      <div className="flex text-center m-3 flex-wrap">
        {albumList.map(a =>
          <div key={a.name} className="basis-1/4">
            <div className="m-1 text-center p-1 artist">
              <h4>{a.name}</h4>
              <img src={a.image} alt={a.name} />
              <a><button onClick={() => router.push(`/chansons/${a.id}/${a.name}`)} className="lightButton mt-1">Chansons</button></a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
