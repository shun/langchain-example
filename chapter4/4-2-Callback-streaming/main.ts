import { load } from "https://deno.land/std@0.209.0/dotenv/mod.ts";
import { ChatOpenAI } from "npm:langchain/chat_models/openai";
import { HumanMessage } from "npm:langchain/schema";

await load({ export: true });

const chat = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  template: 0,
  streaming: true,
});

const messages = [
  new HumanMessage({ content: "自己紹介してください。" }),
];
const encoder = new TextEncoder();
const result = await chat.call(messages, {
  callbacks: [
    {
      handleLLMNewToken(token: string) {
        const bytes = encoder.encode(token);
        Deno.stdout.write(bytes);
      },
    },
  ],
});
