import { GoogleGenerativeAI } from "@google/generative-ai";
import { v4 as uuidv4 } from "uuid";
import { conversations } from "~/utils";

const genAI = new GoogleGenerativeAI(process.env.GEMEINI_KEY);

export default defineEventHandler(async (event) => {
  let { message, token } = await readBody(event);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  if (!token) token = uuidv4();
  if (!conversations[token]) {
    conversations[token] = await model.startChat({
      generationConfig: {
        maxOutputTokens: 100
      }
    });
  }

  const result = await conversations[token].sendMessage(message);
  const response = await result.response;
  const text = response.text();

  return {
    status: 200,
    body: {
      text,
      token
    }
  };
});
