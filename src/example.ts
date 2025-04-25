// src/example.ts
import { ApiRequest, FreeAiChatClient, FreeAiChatClientOptions, createTextMessage } from "./index";

async function main() {

    // 1) Create the client
    const clientConfig: FreeAiChatClientOptions = {
        apiKey: "ai-afeac491-5cd5-4aa8-be37-63e3f7904789",
        timeoutMs: 100000,
    }
    const client = new FreeAiChatClient(clientConfig);


    // 2) Create a message with a unique ID
    const history = [
        createTextMessage("user", "gpt-4", "Hola IA, prueba de ejemplo."),
        createTextMessage("assistant", "gpt-4", "¡Recibido! Aquí tu respuesta."),
        createTextMessage("user", "gpt-4", "¿Puedes ayudarme con algo?"),
    ];

    const apiRequest: ApiRequest = {
        messages: history,
        model: "GPT 4o",
    }

    const stream = await client.send(apiRequest);


    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let done = false;
    while (!done) {
        const { value, done: d } = await reader.read();
        done = d;
        if (value) {
            process.stdout.write(decoder.decode(value));
        }
    }
    console.log("\n✅ Example completed successfully!");
}

main().catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
});
