"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Artist } from "./_types/artist";
import { useConnect } from "./_hooks/use-connect"

export default function Home() {

  const [artist, setArtist] = useState<Artist>();
  const [artistList, setArtistList] = useState<Artist[]>([]);
  const [token, setToken] = useState();
  const [name, setName] = useState<string>("");

  //async function connect() {

    // Vous devez utiliser les identifiants "abc" et "123".
   // const response = await axios.post("http://localhost:5143/api/Users/Login", {
   //   username: "abc",
   //   password: "123"
    //});
    //console.log(response.data);

    //(response.data.token); // Le token peut-être rangé dans un état ...
   // localStorage.setItem("token", response.data.token) // ... ou dans le stockage local.

  //}

  async function getArtist(name: string) {

    const response = await axios.get("http://localhost:5143/api/Artists/GetArtist/" + name, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token // 🔑 Votre token de connexion
      }
    });
    console.log(response.data);

    return new Artist(response.data.id, response.data.name, response.data.imageUrl);

  }

  async function addArtist() {
    const a = await getArtist(name);
    setArtist(a);
    setArtistList(prem => {
      const nouveauArtist = [...prem, a];
      localStorage.setItem("artist", JSON.stringify(nouveauArtist));
      return nouveauArtist;
    });
    setName("");
  }

  function clearStokage() {
    setArtistList([])
    localStorage.clear()
  }

  useEffect(() => {
    //connect();
    useConnect();
    const artistJSON: string | null = localStorage.getItem("artist");

    if (artistJSON != null) setArtistList(JSON.parse(artistJSON));

  }, []);

  return (
    <main className="w-5xl mx-auto my-4">
      <div className="flex">
        <div className="flex-1 p-3">
          <h3 className="text-xl font-bold">Ajouter un artiste</h3>
          <input type="text" name="artist" placeholder="Nana Mouskouri" className="lightInput my-2" value={name} onChange={e => setName(e.target.value)} />
          <input type="submit" value="Rechercher" className="lightButton" onClick={addArtist} />
        </div>
        <div className="flex-3 p-3 text-center">
          <h2 className="text-2xl font-bold">Vos artistes</h2>
          <div className="flex flex-wrap mt-2">
            {artistList.map((a) =>
              <div key={a.name} className="basis-1/3">
                <div className="m-1 p-1 artist">
                  <h4>{a.name}</h4>
                  <img src={a.imageUrl} alt={a.name} />
                  <a><button className="lightButton mt-1 mr-1">Concerts</button></a>
                  <a><button className="lightButton mt-1">Albums</button></a>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-center mt-2">
            <button onClick={clearStokage} className="lightButton">Vider les favoris</button>
          </div>
        </div>
      </div>
    </main>
  );
}
