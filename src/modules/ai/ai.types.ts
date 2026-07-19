export interface AIMessage {
  role: "user" | "assistant";

  content: string;
}

export interface AIConversation {
  userId: string;

  messages: AIMessage[];

  createdAt: Date;
}
