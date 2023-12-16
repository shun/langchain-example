import { load } from "https://deno.land/std@0.209.0/dotenv/mod.ts";
import { ChatOpenAI } from "npm:langchain/chat_models/openai";
import { AIMessage, HumanMessage, SystemMessage } from "npm:langchain/schema";

await load({ export: true });

const chat = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  template: 0,
});

const messages = [
  new SystemMessage({ content: "You are a helpful assistant." }),
  new HumanMessage({ content: "こんにちは！私はジョンと言います。" }),
  new AIMessage({
    content: "こんにちは、ジョンさん！どのようにお手伝いできますか？",
  }),
  new HumanMessage({ content: "私の名前がわかりますか？" }),
];

const result = await chat.invoke(messages);
console.log(`[${result.content}]`);
