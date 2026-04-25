import { Routes, Route } from "react-router-dom";
import { StudioLanding } from "./components/StudioLanding";
import { ServicesPage } from "./components/ServicesPage";
import { useState } from "react";
import { translations, type Lang } from "./lib/translations";

function App() {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('lang');
    return (saved === 'ru' || saved === 'en') ? saved : 'ru';
  });

  const handleLangChange = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  return (
    <Routes>
      <Route path="/" element={<StudioLanding lang={lang} onLangChange={handleLangChange} />} />
      <Route path="/services" element={<ServicesPage lang={lang} />} />
    </Routes>
  );
}

export default App;
