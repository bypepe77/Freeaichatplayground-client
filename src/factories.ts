import { v4 as uuidv4 } from "uuid";
import { Message, Attachment, Role } from "./types";

/**
 * Create a message with a unique ID.
 * @param role - The role of the message (user or assistant).
 * @param model - The model used for the message.
 * @param text - The text content of the message.
 * @param attachments - Optional attachments for the message.
 * @returns A message object with a unique ID.
 * @example
 * const message = createTextMessage("user", "gpt-3.5-turbo", "Hello, world!");
 * console.log(message);
 * // // Output:
 * // // {
 * // //   id: "unique-id",
 * // //   role: "user",
 * // //   model: "gpt-3.5-turbo",
 * // //   content: "Hello, world!",
 * // //   experimental_attachments: undefined
 * // // }
 * 
 */
export function createTextMessage(
  role: Role,
  model: string,
  text: string,
  attachments?: Attachment[]
): Message {
  return {
    id: uuidv4(),
    role,
    model,
    content: text,
    experimental_attachments: attachments && attachments.length > 0 ? attachments : undefined,
  };
}

/**
* Creates an attachment object with a unique ID.
* @param name - The name of the attachment.
* @param contentType - The content type of the attachment (e.g., "image/png").
* @param url - The URL or base64 data of the attachment.
* @return An attachment object with a unique ID.
* @example
* const attachment = createAttachment("image.png", "image/png", "https://example.com/image.png");
* console.log(attachment);
* // Output:
* // {
* //   id: "unique-id",
* //   name: "image.png",
* //   contentType: "image/png",
* //   url: "https://example.com/image.png"
* // }
* 
* 
 */
export function createAttachment(
  name: string,
  contentType: string,
  url: string
): Attachment {
  return {
    id: uuidv4(),
    name,
    contentType,
    url,
  };
}
