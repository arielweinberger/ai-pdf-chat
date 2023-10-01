import { MAX_RESPONSE_TOKENS, trimMessages } from "@/lib/tokens";
import { createOrReadVectorStoreIndex } from "@/lib/vector-store";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { MetadataMode } from "llamaindex";
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemMessage = {
    role: "system",
    content: "You are a helpful AI assistant",
  };

  const latestMessage = messages[messages.length - 1];
  const index = await createOrReadVectorStoreIndex();

  const retriever = index.asRetriever();
  retriever.similarityTopK = 1;

  const [matchingNode] = await retriever.retrieve(latestMessage.content);

  if (matchingNode.score > 0.8) {
    const knowledge = matchingNode.node.getContent(MetadataMode.NONE);

    systemMessage.content = `
      You are a helpful AI assistant. Your knowledge is enriched by this document:
      ---
      ${knowledge}
      ---
      When possible, explain the reasoning for your responses based on this knowledge.
    `;
  }

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0,
    max_tokens: MAX_RESPONSE_TOKENS,
    messages: trimMessages([systemMessage, ...messages]),
    stream: true,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}