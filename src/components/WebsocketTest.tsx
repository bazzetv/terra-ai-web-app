import { useEffect, useState } from "react";

const userId = "1234"; // Remplace avec un vrai ID utilisateur
const token = "root"; // Remplace avec ton API_SECRET

export default function WebSocketTest() {
    const [messages, setMessages] = useState<string[]>([]); // ✅ Ajout du typage string[]

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8080/api/notifications/ws?token=${token}&user_id=${userId}`);

        ws.onopen = () => {
            console.log("✅ WebSocket connecté !");
        };

        ws.onmessage = (event) => {
            console.log("📩 Message reçu :", event.data);
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };

        ws.onclose = (event) => {
            console.log(`❌ WebSocket fermé. Code: ${event.code}, Raison: ${event.reason}`);
        };

        ws.onerror = (error) => {
            console.error("⚠️ Erreur WebSocket :", error);
        };

        return () => {
            ws.close();
        };
    }, []);

    return (
        <div>
            <h2>WebSocket Test</h2>
            <p>Status: {messages.length > 0 ? "📩 Messages reçus" : "🕐 En attente..."}</p>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </div>
    );
}