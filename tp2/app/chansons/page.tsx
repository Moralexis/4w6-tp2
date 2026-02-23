"use client"
import { useEffect } from "react";
import { useConnect } from "../_hooks/use-connect"

useEffect(() => {
    useConnect();
  }, []);
  
export default function Home() {
  return (
    <main className="w-5xl mx-auto my-4">
		<h2 className="text-center text-2xl py-1">Chansons de NOM_ALBUM</h2>
		<div className="flex m-2 flex-wrap">
			<div className="basis-1/5">
				<div className="m-1 text-center p-1 artist">
					<h4>NOM_CHANSON</h4>
					<a><button className="lightButton form-control mt-1">Écouter</button></a>
				</div>
			</div>
		</div>
		<div className="flex justify-center">
			<img src="images/video.png" alt="Vidéo youtube" />
		</div>
	</main>
  );
}
