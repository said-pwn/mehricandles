import React, { useContext, useEffect } from "react";
import AppRoutes from "./AppRoutes";
import { LanguageContext } from "./context/LanguageContext";

export default function AppWrapper() {
  const { lang } = useContext(LanguageContext);

  useEffect(() => {
    document.body.classList.remove("lang-uz", "lang-en");
    document.body.classList.add(`lang-${lang}`);
  }, [lang]);

  return <AppRoutes />;
}
