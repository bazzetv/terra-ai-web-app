import { useEffect, useState } from "react";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vérifie la session actuelle
  const checkSession = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/session", { credentials: "include" });
      if (res.ok) {
        setIsAuthenticated(true);
        return true;
      }
    } catch (err) {
      console.error("Erreur lors de la vérification de la session", err);
    }
    return false;
  };

  useEffect(() => {
    checkSession(); // Vérifier la session au chargement
  }, []);

  const handleLogin = () => {
    const popup = window.open(
      "http://localhost:8080/auth/login",
      "_blank",
      "width=500,height=600"
    );

    if (!popup) return;

    let pollingInterval = setInterval(async () => {
      const sessionValid = await checkSession();
      if (sessionValid || !popup || popup.closed) {
        console.log("✅ Session détectée ou popup fermée, arrêt du polling");
        clearInterval(pollingInterval);
        setIsAuthenticated(true); // Met à jour l'état React
        if (popup) popup.close(); // Ferme la popup si elle est encore ouverte
        window.location.reload()
      }
    }, 2000); // Vérifie toutes les 2 secondes
  };

  const handleLogout = () => {
    fetch("http://localhost:8080/auth/logout", { credentials: "include" })
      .then(() => setIsAuthenticated(false));
          window.location.reload();
  };

  return (
    <header className="flex justify-between items-center p-4 shadow bg-white">
      <h1 className="text-2xl font-bold text-blue-600">🚀 Terra AI</h1>
      {isAuthenticated ? (
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
          Se déconnecter
        </button>
      ) : (
        <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
          Se connecter
        </button>
      )}
    </header>
  );
};

export default Header;