import { Routes, Route } from "react-router-dom";
import { StudioLanding } from "./components/StudioLanding";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "Revyakin.tech — Веб-разработка и мобильные приложения";
    
    // Update meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Разрабатываю сайты, мобильные приложения и сервисы под ключ. React, Flutter, Next.js, Python. Прокопьевск, Россия.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Разрабатываю сайты, мобильные приложения и сервисы под ключ. React, Flutter, Next.js, Python. Прокопьевск, Россия.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<StudioLanding />} />
    </Routes>
  );
}

export default App;
