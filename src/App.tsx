import { Routes, Route } from "react-router-dom";
import { StudioLanding } from "./components/StudioLanding";
import { useEffect, useState } from "react";
import { translations, type Lang } from "./lib/translations";

function App() {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('lang');
    return (saved === 'ru' || saved === 'en') ? saved : 'ru';
  });

  useEffect(() => {
    const t = translations[lang];
    const seo = t.seo;

    // Update title
    document.title = seo.title;

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (metaDescription) {
      metaDescription.setAttribute('content', seo.description);
    } else {
      metaDescription = document.createElement('meta') as HTMLMetaElement;
      metaDescription.name = 'description';
      metaDescription.content = seo.description;
      document.head.appendChild(metaDescription);
    }

    // Update or create meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (metaKeywords) {
      metaKeywords.setAttribute('content', seo.keywords);
    } else {
      metaKeywords = document.createElement('meta') as HTMLMetaElement;
      metaKeywords.name = 'keywords';
      metaKeywords.content = seo.keywords;
      document.head.appendChild(metaKeywords);
    }

    // Update or create OG title
    let ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
    if (ogTitle) {
      ogTitle.setAttribute('content', seo.ogTitle);
    } else {
      ogTitle = document.createElement('meta') as HTMLMetaElement;
      ogTitle.setAttribute('property', 'og:title');
      ogTitle.content = seo.ogTitle;
      document.head.appendChild(ogTitle);
    }

    // Update or create OG description
    let ogDescription = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
    if (ogDescription) {
      ogDescription.setAttribute('content', seo.ogDescription);
    } else {
      ogDescription = document.createElement('meta') as HTMLMetaElement;
      ogDescription.setAttribute('property', 'og:description');
      ogDescription.content = seo.ogDescription;
      document.head.appendChild(ogDescription);
    }

    // Update or create OG image
    let ogImage = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;
    if (ogImage) {
      ogImage.setAttribute('content', 'https://revyakin.tech/images/logo.png');
    } else {
      ogImage = document.createElement('meta') as HTMLMetaElement;
      ogImage.setAttribute('property', 'og:image');
      ogImage.content = 'https://revyakin.tech/images/logo.png';
      document.head.appendChild(ogImage);
    }

    // Update or create OG URL
    let ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement;
    if (ogUrl) {
      ogUrl.setAttribute('content', 'https://revyakin.tech');
    } else {
      ogUrl = document.createElement('meta') as HTMLMetaElement;
      ogUrl.setAttribute('property', 'og:url');
      ogUrl.content = 'https://revyakin.tech';
      document.head.appendChild(ogUrl);
    }

    // Update or create OG type
    let ogType = document.querySelector('meta[property="og:type"]') as HTMLMetaElement;
    if (ogType) {
      ogType.setAttribute('content', 'website');
    } else {
      ogType = document.createElement('meta') as HTMLMetaElement;
      ogType.setAttribute('property', 'og:type');
      ogType.content = 'website';
      document.head.appendChild(ogType);
    }

    // Update html lang attribute
    document.documentElement.lang = lang;
  }, [lang]);

  const handleLangChange = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  return (
    <Routes>
      <Route path="/" element={<StudioLanding lang={lang} onLangChange={handleLangChange} />} />
    </Routes>
  );
}

export default App;
