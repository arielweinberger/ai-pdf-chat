import { encoding_for_model } from "@dqbd/tiktoken";

const encoding = encoding_for_model("gpt-3.5-turbo");

function countTokens (text: string) {
  const tokens = encoding.encode(text);
  return tokens.length;
}