import { Routes, Route, useNavigate, useLocation, Navigate, } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Generate from "./components/Generate";
import WebSocketTest from "./components/WebsocketTest";

const App = () => {
    console.log("🚀 App.tsx est rendu !");
    const navigate = useNavigate();
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // 🔥 Fonction pour vérifier la session
    const checkSession = async () => {
        console.log("🔍 Vérification de la session...");
        try {
            const res = await fetch("http://localhost:8080/auth/session", { credentials: "include" });
            if (res.ok) {
                setIsAuthenticated(true);
                console.log("✅ Session active détectée");
            } else {
                setIsAuthenticated(false);
                console.log("❌ Aucune session active détectée");
            }
        } catch (error) {
            console.error("Erreur de session:", error);
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
      console.log("🔄 useEffect - Vérification de la session");
  
      fetch("http://localhost:8080/auth/session", { credentials: "include" })
          .then((res) => {
              console.log("✅ Réponse reçue de /auth/session:", res.status);
              if (res.ok) {
                  setIsAuthenticated(true);
              } else {
                  setIsAuthenticated(false);
              }
          })
          .catch((error) => console.error("⚠️ Erreur lors de la récupération de session:", error));
  }, []);

    // 🔄 Vérifie explicitement après OAuth
    useEffect(() => {
        if (location.pathname.includes("/auth/callback")) {
            console.log("🔄 Vérification après callback OAuth");
            setTimeout(() => {
                checkSession();
            }, 500); // Petit délai pour s'assurer que le cookie est bien reçu
        }
    }, [location]);

    // 🚀 Redirige après détection de connexion
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/generate");
        }
    }, [isAuthenticated, navigate]);

    return (
      <Layout>
        <div>
            <h1>Test WebSocket</h1>
            <WebSocketTest />
        </div>
        <Routes>
            <Route 
                path="/" 
                element={
                        <h1 className="text-3xl font-bold text-center mt-10">Bienvenue sur Terra AI</h1>
                } 
            />
            <Route path="/generate" element={isAuthenticated ? <Generate /> : <Navigate to="/" />} />
        </Routes>
      </Layout> 
    );
};

export default App;