import { load } from "https://deno.land/std@0.209.0/dotenv/mod.ts";

import { ChatOpenAI } from "npm:langchain/chat_models/openai";
import { ConversationChain } from "npm:langchain/chains";
import { BufferMemory } from "npm:langchain/memory";

await load({ export: true });

const chat = new ChatOpenAI({
  modelName: "gpt-4",
  template: 0,
});

const conversation = new ConversationChain({
  llm: chat,
  memory: new BufferMemory(),
});

while (true) {
  const userMessage = prompt("You: ");
  const ai_message = await conversation.call({ input: userMessage });
  console.log(`AI: ${ai_message.response}`);
}
