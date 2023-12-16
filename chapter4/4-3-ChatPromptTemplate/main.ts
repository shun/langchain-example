import { load } from "https://deno.land/std@0.209.0/dotenv/mod.ts";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  PromptTemplate,
  SystemMessagePromptTemplate,
} from "npm:langchain/prompts";
import { HumanMessage, SystemMessage } from "npm:langchain/schema";
import { ChatOpenAI } from "npm:langchain/chat_models/openai";

await load({ export: true });

const chat_prompt = ChatPromptTemplate.fromMessages([
  SystemMessagePromptTemplate.fromTemplate(
    "あなたは{country}料理のプロフェッショナルです。",
  ),
  HumanMessagePromptTemplate.fromTemplate(
    "以下の料理のレシピを考えてください\n\n料理名：{dish}",
  ),
]);

const messages = await chat_prompt.formatMessages({
  country: "イギリス",
  dish: "肉じゃが",
});

// --------------------------------------------
// additional
//
console.log("---------------------------------------------");
console.log(messages[1].content);
console.log("---------------------------------------------");
const chat = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  template: 0,
});

const result = await chat.invoke(messages);
console.log(`[${result.content}]`);
