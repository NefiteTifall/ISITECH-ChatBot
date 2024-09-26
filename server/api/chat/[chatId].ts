import { GoogleGenerativeAI } from "@google/generative-ai";
import { v4 as uuidv4 } from "uuid";
import { conversations } from "~/utils";

const genAI = new GoogleGenerativeAI(process.env.GEMEINI_KEY);

export default defineEventHandler(async (event) => {
  let { token } = await readBody(event);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  if (!token) token = uuidv4();
  if (!conversations[token]) {
    conversations[token] = await model.startChat({
      generationConfig: {
        maxOutputTokens: 100
      }
    });
    const result = await conversations[token].sendMessage("Bonjour !");
  }

  return {
    status: 200,
    body: {
      conversation: conversations[token],
      token
    }
  };
});
