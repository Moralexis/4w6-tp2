import Image from "next/image";

export default function Home() {
  return (
    <main className="w-5xl mx-auto my-4">
      <h2 className="text-center text-2xl py-1">Concerts de NOM_ARTISTE</h2>
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
