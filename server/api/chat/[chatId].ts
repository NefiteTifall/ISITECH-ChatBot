import { GoogleGenerativeAI } from "@google/generative-ai";
import { v4 as uuidv4 } from "uuid";
import { conversations } from "~/utils";

const genAI = new GoogleGenerativeAI(process.env.GEMEINI_KEY);

export default defineEventHandler(async (event) => {
  const chatId = getRouterParam(event, 'chatId')
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "Je suis un assistant virtuel qui peut aider pour le développement informatique, **ne répond pas aux autres question**, si tu estimes que la question n'est pas pertinante lié au développement informatique alors ne répond pas !"
  });

  if (!conversations[chatId]) {
    conversations[chatId] = await model.startChat();
  }

  return {
    status: 200,
    body: {
      history: conversations[chatId]._history,
      chatId
    }
  };
});
