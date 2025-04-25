export type Role = "user" | "assistant";

export interface ApiError {
    status: number;
    message: string;
}

export interface ApiRequest{
    apiKey?: string;
    messages: Message[];
    model: string;
    temperature?: number;
    maxTokens?: number;
}

export interface Message {
    id: string
    role: Role
    content:
      | string
      | Array<{
          type: string
          text?: string
          image_url?: {
            url: string
          }
        }>
    model: string,
    experimental_attachments?: Attachment[]
}

export interface Attachment {
    name: string
    contentType: string
    url: string
    id?: string
}

