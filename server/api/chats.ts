import { conversations } from "~/utils";

export default defineEventHandler(async (event) => {
  return {
    status: 200,
    body: {
      conversations
    }
  };
});
