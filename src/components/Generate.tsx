import { useState } from "react";

const Generate = () => {
  const [prompt, setPrompt] = useState("");

  const handleGenerate = async () => {
    
    const response = await fetch("http://localhost:8080/api/generate?prompt=Hello", {
        method: "GET",
        credentials: "include", // 🔥 Important pour envoyer le cookie d'authent
    });

    if (response.ok) {
        const result = await response.text();
        console.log("Image générée :", result);
    } else {
        console.error("Erreur :", response.status);
    }
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Génère ton image avec l'IA</h1>
      <textarea
        className="border rounded w-1/2 p-2"
        placeholder="Décris ton image..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={handleGenerate} className="bg-green-500 text-white px-4 py-2 rounded mt-4">
        Générer
      </button>
    </div>
  );
};

export default Generate;