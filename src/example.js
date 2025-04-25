"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/example.ts
const index_1 = require("./index");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // 1) Create the client
        const clientConfig = {
            apiKey: "ai-afeac491-5cd5-4aa8-be37-63e3f7904789",
            timeoutMs: 100000,
        };
        const client = new index_1.FreeAiChatClient(clientConfig);
        // 2) Create a message with a unique ID
        const history = [
            (0, index_1.createTextMessage)("user", "gpt-4", "Hola IA, prueba de ejemplo."),
            (0, index_1.createTextMessage)("assistant", "gpt-4", "¡Recibido! Aquí tu respuesta."),
            (0, index_1.createTextMessage)("user", "gpt-4", "¿Puedes ayudarme con algo?"),
        ];
        const apiRequest = {
            messages: history,
            model: "GPT 4o",
        };
        const stream = yield client.send(apiRequest);
        const reader = stream.getReader();
        const decoder = new TextDecoder();
        let done = false;
        while (!done) {
            const { value, done: d } = yield reader.read();
            done = d;
            if (value) {
                process.stdout.write(decoder.decode(value));
            }
        }
        console.log("\n✅ Example completed successfully!");
    });
}
main().catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
});
