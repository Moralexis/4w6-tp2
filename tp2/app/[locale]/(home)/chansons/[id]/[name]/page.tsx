"use client"
import { useEffect, useState } from "react";
import { useConnect } from "../../../../../_hooks/use-connect"
import axios from "axios";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Home() {
	const apiKey = "AIzaSyCdXEJDERdzW46faUuv9xhoKJbsMXyc7es";
	const [token, setToken] = useState();
	const param = useParams<{ id: string, name: string }>();
	const [songsList, setSongsList] = useState<string[]>([])
	const id = param.id;
	const name = param.name
	const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);
	const t = useTranslations();

	async function getSongs(albumId: string) {

		const response = await axios.get("http://localhost:5143/api/Songs/GetSongs/" + albumId, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token // 🔑 Votre token de connexion
			}
		});
		console.log(response.data);

		let songs: string[] = [];
		for (let s of response.data) songs.push(s.name);

		return songs;

	}

	async function searchVideo(songName : string) {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?type=video&part=id&maxResults=1&key=${apiKey}&q=${songName + name}`)
    console.log(response.data);
    let videoId = response.data.items[0].id.videoId
    setVideoUrl(`https://www.youtube.com/embed/${videoId}`)
  }

	async function addSong() {
		const s = await getSongs(id);
		setSongsList(s);
	}

	useEffect(() => {
		useConnect();
		addSong()
	}, []);

	return (
		<main className="w-5xl mx-auto my-4">
			<h2 className="text-center text-2xl py-1">{t('Songs.songsOf', {name})}</h2>
			<div className="flex m-2 flex-wrap">
				{songsList.map(s =>
					<div key={`${s}`} className="basis-1/5">
						<div className="m-1 text-center p-1 artist">
							<h4>{s}</h4>
							<a><button onClick={() => searchVideo(s)} className="lightButton form-control mt-1">{t('Songs.listen')}</button></a>
						</div>
					</div>
				)}
			</div>
			{
				videoUrl != undefined &&

				<div className="flex justify-center">
					<iframe width="560" height="315" src={videoUrl} title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
				</div>
			}
		</main>
	);
}