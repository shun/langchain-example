import { load } from "https://deno.land/std@0.209.0/dotenv/mod.ts";
import { z } from "https://deno.land/x/zod/mod.ts";

import { ChatOpenAI } from "npm:langchain/chat_models/openai";
import { PromptTemplate } from "npm:langchain/prompts";
import { StructuredOutputParser } from "npm:langchain/output_parsers";
import { HumanMessage } from "npm:langchain/schema";

await load({ export: true });

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    ingredients: z
      .array(z.string())
      .describe("ingredients of the dish"),
    steps: z
      .array(z.string())
      .describe("steps to make the dish"),
  }),
);

const template = `
料理のレシピを考えてください。

{format_instructinos}

料理名：{dish}
`;

const prompt = new PromptTemplate({
  inputVariables: ["dish"],
  template,
  partialVariables: { format_instructinos: parser.getFormatInstructions() },
});

const formatted_prompt = await prompt.format({ dish: "カレー" });
//console.log(formatted_prompt);

const chat = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  template: 0,
});

const messages = [new HumanMessage({ content: formatted_prompt })];
const output = await chat.invoke(messages);
//console.log(output.content);

const recipe = await parser.parse(output.content);
console.log(recipe);
