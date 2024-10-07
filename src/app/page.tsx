"use client"

import { Button } from "~/components/ui/button";


export default function Home() {

  const posters = new Array(3).fill("")

  return (
    <main className="">
      {/* Header Section */}
      <img src="/images/poster69.jpg" className="aspect-video h-80 w-full object-cover" />
      <div className="flex flex-col items-center justify-center w-full min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 grid"><span>Välkommen till</span> <span>AutoArt Graphics</span></h1>
        <div className="w-full flex justify-center items-center">
          <p className="text-lg max-w-lg w-full sm:text-xl text-gray-700">
            Skicka in en bild på ditt favoritfordon, så förvandlar vi den till en fantastisk affisch. Klicka på knappen nedan för att ladda upp din bild och börja skapa!
          </p>
        </div>
      </div>

      {/* Call to Action Button */}
      <div className="mb-16">
        <Button asChild>
          <a href="/skapaorder">Skapa din order</a>
        </Button>
      </div>

      {/* Images Section */}

      <div className="flex justify-center flex-col items-center gap-8 pt-24">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Här är några exempel:
        </h4>
        <ul className="flex flex-wrap justify-center gap-6">
          {posters.map((poster, i) => (
            <img  className={`w-56 rounded-xl shadow-lg border transition-transform ${
              i % 4 === 0
                ? "hover:rotate-1"
                : i % 4 === 1
                ? "hover:rotate-2"
                : i % 4 === 2
                ? "hover:-rotate-1"
                : "hover:-rotate-2"
            }`} src={`/images/poster${i + 1}.jpg`} />
          ))}
        </ul>
      </div>
          </div>
    </main>

  );
}
