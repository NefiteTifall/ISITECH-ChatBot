import { GoogleGenerativeAI } from "@google/generative-ai";
import { v4 as uuidv4 } from "uuid";
import { conversations } from "~/utils";

const genAI = new GoogleGenerativeAI(process.env.GEMEINI_KEY);

export default defineEventHandler(async (event) => {
  let { message } = await readBody(event);
  const chatId = getRouterParam(event, 'chatId')

  const result = await conversations[chatId].sendMessage(message);

  console.log("conversations[chatId].ChatSession", conversations[chatId]._history)

  return {
    status: 200,
    body: {
      history: conversations[chatId]._history,
      chatId,
    }
  };
});
