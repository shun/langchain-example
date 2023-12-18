import { load } from "https://deno.land/std@0.209.0/dotenv/mod.ts";

import { ChatOpenAI } from "npm:langchain/chat_models/openai";
import { PromptTemplate } from "npm:langchain/prompts";
import { LLMChain, SimpleSequentialChain } from "npm:langchain/chains";

await load({ export: true });

const chat = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  template: 0,
});

const cot_template = `
以下の質問に回答してください。

質問：{question}

ステップバイステップで考えましょう
`;

const cot_prompt = new PromptTemplate({
  inputVariables: ["question"],
  template: cot_template,
});

const cot_chain = new LLMChain({ prompt: cot_prompt, llm: chat });

const summarize_template = `
以下の文章を結論だけ一言に要約してください。

{input}
`;

const summarize_prompt = new PromptTemplate({
  inputVariables: ["input"],
  template: summarize_template,
});

const summarize_chain = new LLMChain({ prompt: summarize_prompt, llm: chat });

const cot_summarize_chain = new SimpleSequentialChain({
  chains: [cot_chain, summarize_chain],
});
const result = await cot_summarize_chain.run(
  "私は市場へ行って10個のりんごを買いました。隣人に２つ、修理工に２つ渡しました。それから５つのリンゴを買って１つ食べました。残りは何個ですか？",
);
console.log(result);
