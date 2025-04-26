# FreeAIChat Playground API

FreeAIChat Playground API is a lightweight TypeScript client for interacting with [https://freeaichatplayground.com](https://freeaichatplayground.com). You get access to over 20 AI models with 1000 free credits per day.

---

## 🚀 Installation

```bash
npm install freeaichatplayground-client
```

---

## 🔑 Get Your API Key

1. Go to [https://freeaichatplayground.com](https://freeaichatplayground.com)
2. Sign up for a free account
3. Copy your API key from the **API** section in your profile

---

## 📦 Usage Example

```ts
import { ApiRequest, createTextMessage, FreeAiChatClient, FreeAiChatClientOptions, Message } from "freeaichatplayground-client";


async function main() {
    const options: FreeAiChatClientOptions = {
        apiKey: "YOUR_API_KEY",
        timeoutMs: 1000000
    }

    const client = new FreeAiChatClient(options)

    const history: Message[] = [
        createTextMessage("user", "gpt-4", "Hello AI, test message."),
        createTextMessage("assistant", "gpt-4", "Received! Here’s your response."),
        createTextMessage("user", "gpt-4", "Can you help me with something?"),
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
```

---

## 💰 Available Models and Pricing

| Model                        | Credits/msg | Max msgs/day (1000 credits) |
|-----------------------------|-------------|------------------------------|
| GPT 4o Mini                 | 1           | 1000                         |
| Deepseek V3                 | 1           | 1000                         |
| Deepseek V3 0324            | 3           | 333                          |
| Llama 4 Scout               | 4           | 250                          |
| QwQ Plus                    | 5           | 200                          |
| Grok 3 Mini                 | 5           | 200                          |
| Deepseek R1                 | 10          | 100                          |
| Llama 4 Maverick            | 10          | 100                          |
| Mistral Nemo                | 10          | 100                          |
| GPT 4o                      | 15          | 66                           |
| O3 Mini                     | 15          | 66                           |
| O4 Mini                     | 15          | 66                           |
| GPT 4o Latest               | 15          | 66                           |
| Gemini 2.5 Pro              | 15          | 66                           |
| O4 Mini High                | 25          | 40                           |
| GPT 4.1 Mini                | 25          | 40                           |
| GPT 4.1                     | 35          | 28                           |
| Mistral Large               | 40          | 25                           |
| Grok 3                      | 40          | 25                           |
| Claude 3.7 Sonnet           | 280         | 3                            |
| Claude 3.7 Sonnet (Think)   | 300         | 3                            |
| O3                          | 300         | 3                            |
| O3 High                     | 500         | 2                            |
| GPT 4.5 Preview             | 800         | 1                            |

> All models support streaming and attachments

---

## 📅 Daily Credits

- You receive **1000 free credits per day**
- Each message uses a number of credits based on the selected model
- Use lightweight models for simple tasks to save credits efficiently

---

## 📄 License

MIT License

---

## 🤝 Contributing

PRs are welcome! If you have improvements or ideas, feel free to open an issue or submit a pull request.
```
