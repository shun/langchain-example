import { load } from "https://deno.land/std@0.209.0/dotenv/mod.ts";
import { OpenAI } from "npm:langchain/llms/openai";
import { PromptTemplate } from "npm:langchain/prompts";

await load({ export: true });

const llm = new OpenAI({
  modelName: "text-davinci-003",
  template: 0,
});

const result = await llm.call("自己紹介してください。");
console.log(`[${result}]`);
