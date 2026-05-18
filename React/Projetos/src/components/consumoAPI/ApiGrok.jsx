import { useState } from "react";

export default function ApiGrok (){

    const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  async function sendMessage() {

    if (!message) return;

    try {

      const request = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",

          headers: {
            "Authorization": `Bearer ${VITE_GROQ_API_KEY}`,
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",

            messages: [
              {
                role: "user",
                content: message
              }
            ]
          })
        }
      );

      const data = await request.json();

      setResponse(
        data.choices[0].message.content
      );

    } catch (error) {

      setResponse(
        "Erro ao conectar com a API."
      );

      console.error(error);
    }
  }
    
    return (
        <div>
              <h1>Chatbot React</h1>

      <input
        type="text"
        placeholder="Digite sua mensagem"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>
        Enviar
      </button>

      <div id="response">
        <strong>Resposta:</strong>
        <p>{response}</p>
      </div>
        </div>
    );
}