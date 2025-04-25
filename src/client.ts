import { ApiError, ApiRequest } from "./types";



export interface FreeAiChatClientOptions {
    apiKey: string;
    timeoutMs?: number;
}

/**
 * FreeAiChatClient is a client for interacting with the FreeAiChat API.
 * It allows you to send messages and receive responses from the AI model.
 * @example
 * const client = new FreeAiChatClient({ apiKey: 'your-api-key' });
 * const response = await client.send({ messages: [{ role: 'user', content: 'Hello!' }] });
 * console.log(response);
 */
export class FreeAiChatClient {
    private apiKey: string
    private baseUrl: string
    private timeoutMs: number


    constructor(options: FreeAiChatClientOptions) {
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
    public async send(req: ApiRequest): Promise<ReadableStream<Uint8Array>> {
        if (!req.messages || req.messages.length === 0) {
            throw new Error("Cannot send empty message array");
        }

        const payload: Record<string, any> = {
            apiKey: this.apiKey,
            model: req.model,
            messages: req.messages,
        };
        if (req.temperature != null) payload.temperature = req.temperature;
        if (req.maxTokens != null) payload.maxTokens = req.maxTokens;

        const token = req.apiKey ?? this.apiKey;
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), this.timeoutMs);

        const res = await fetch(`${this.baseUrl}/chat/completions`, {
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
                const err = await res.json();
                msg = (err as any).error ?? msg;
            } catch { }
            throw { status: res.status, message: msg } as ApiError;
        }

        if (!res.body) {
            throw { status: 500, message: "No response body" } as ApiError;
        }

        return res.body;
    }
}