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
exports.FreeAiChatClient = void 0;
/**
 * FreeAiChatClient is a client for interacting with the FreeAiChat API.
 * It allows you to send messages and receive responses from the AI model.
 * @example
 * const client = new FreeAiChatClient({ apiKey: 'your-api-key' });
 * const response = await client.send({ messages: [{ role: 'user', content: 'Hello!' }] });
 * console.log(response);
 */
class FreeAiChatClient {
    constructor(options) {
        this.apiKey = options.apiKey;
        this.baseUrl = 'https://freeaichatplayground.com/api/v1/';
        this.timeoutMs = options.timeoutMs || 10000; // Default timeout is 10 seconds
    }
    /**
     * Sends a request to the FreeAiChat API with the specified parameters.
     * @param req - The request object containing the parameters for the API call.
     * @returns A ReadableStream of the response from the API.
     * @throws An error if the request fails or if the response is not valid.
     */
    send(req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (!req.messages || req.messages.length === 0) {
                throw new Error("Cannot send empty message array");
            }
            const payload = {
                apiKey: this.apiKey,
                model: req.model,
                messages: req.messages,
            };
            if (req.temperature != null)
                payload.temperature = req.temperature;
            if (req.maxTokens != null)
                payload.maxTokens = req.maxTokens;
            const token = (_a = req.apiKey) !== null && _a !== void 0 ? _a : this.apiKey;
            const controller = new AbortController();
            const timer = setTimeout(() => controller.abort(), this.timeoutMs);
            const res = yield fetch(`${this.baseUrl}/chat/completions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
                signal: controller.signal,
            });
            clearTimeout(timer);
            if (!res.ok) {
                let msg = res.statusText;
                try {
                    const err = yield res.json();
                    msg = (_b = err.error) !== null && _b !== void 0 ? _b : msg;
                }
                catch (_c) { }
                throw { status: res.status, message: msg };
            }
            if (!res.body) {
                throw { status: 500, message: "No response body" };
            }
            return res.body;
        });
    }
}
exports.FreeAiChatClient = FreeAiChatClient;
