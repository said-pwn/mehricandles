import React, { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

const NotFound = () => {
  const { texts } = useContext(LanguageContext);
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">{texts.notFoundTitle}</h1>
      <p className="text-lg">{texts.notFoundDesc}</p>
    </div>
  );
};
export default NotFound;