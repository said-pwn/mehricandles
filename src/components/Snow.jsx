import { useEffect } from "react";

export default function Snow() {
  useEffect(() => {
    const container = document.getElementById("snow-container");

    for (let i = 0; i < 50; i++) {
      const snowflake = document.createElement("div");
      snowflake.className = "snowflake";
      snowflake.textContent = "❄";

      snowflake.style.left = Math.random() * 100 + "vw";
      snowflake.style.fontSize = 10 + Math.random() * 20 + "px";
      snowflake.style.animationDuration = 5 + Math.random() * 10 + "s";
      snowflake.style.animationDelay = Math.random() * 5 + "s";

      container.appendChild(snowflake);
    }
  }, []);

  return <div id="snow-container" className="snow"></div>;
}
