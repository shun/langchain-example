import { load } from "https://deno.land/std@0.209.0/dotenv/mod.ts";
import { PromptTemplate } from "npm:langchain/prompts";

await load({ export: true });

const template = `
以下の料理のレシピを考えてください。

料理名：{dish}
`;

const prompt = new PromptTemplate({
  inputVariables: ["dish"],
  template,
});

const result = await prompt.format({ dish: "カレー" });
console.log(`[${result}]`);
