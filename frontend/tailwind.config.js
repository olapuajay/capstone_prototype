/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#04070d",
        midnight: "#0d1b2a",
        accent: "#3ddc97",
        warning: "#ff7b54",
      },
      boxShadow: {
        panel: "0 20px 45px rgba(0, 0, 0, 0.35)",
      },
      backgroundImage: {
        "mesh-gradient":
          "radial-gradient(circle at 20% 20%, rgba(61,220,151,0.22), transparent 40%), radial-gradient(circle at 80% 10%, rgba(255,123,84,0.20), transparent 45%), radial-gradient(circle at 50% 90%, rgba(64,115,255,0.18), transparent 45%)",
      },
    },
  },
  plugins: [],
};
