"use client"
import "../../globals.css";
import { hasLocale, NextIntlClientProvider, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useState } from "react";


export default function AutreLayout({ children }: Readonly<{ children: React.ReactNode}>) {
  
  const pathname = usePathname();

  // Ce hook permet d'obtenir la locale actuelle
  const locale = useLocale();
  const t = useTranslations();

  // Ce hook nous permettra de changer la route sans utiliser un élément <Link>
  const router = useRouter();

  // État pour stocker la locale actuellement utilisée
  const [selectLocale, setSelectLocale] = useState(locale);

  // Fonction qui change la locale utilisée ET l'état selectLocale
  function chooseLocale(e : any){
    setSelectLocale(e.target.value); // On met l'état à jour
    router.replace(pathname, { locale : e.target.value }); // On change la locale dans la route
  }
  
  return (
    <div>
        <header className="w-full">
          <div className="flex items-center">
            <div className="p-2 navHover">
              <h1 className="text-3xl">{t('Home.spotMe')}</h1>
            </div>
            <div className="flex-1"></div>
            <div className="p-2 navHover">
              <h2 className="text-3xl"><a>{t('Home.yourArtists')}</a></h2>
            </div>
            <div className="p-2">
              <select onChange={chooseLocale} value={selectLocale} name="language" className="bg-black py-1 px-2 rounded-md text-whites">
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </header>
        {children}
        <footer className="w-full">
          <div className="py-1">
            <div>
              <p className="text-center">&copy; {t('Home.yonk')}</p>
            </div>
          </div>
        </footer>
    </div>
  );
}
