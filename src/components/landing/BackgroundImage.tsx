
import React from "react";

const BackgroundImage = () => {
  return (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-900 to-blue-950 z-0">
      <img
        src="/lovable-uploads/483b237a-7371-4738-8d3b-f4c377e50673.png"
        alt="Background"
        className="w-full h-full object-cover opacity-60"
        onError={(e) => {
          console.error("Background image failed to load");
          if (e.target instanceof HTMLImageElement) {
            e.target.style.display = "none";
          }
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-slate-900/60"></div>
    </div>
  );
};

export default BackgroundImage;
