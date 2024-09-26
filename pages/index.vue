<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Mes Conversations</h1>
    <div class="mb-4">
      <UButton @click="newConversation">Nouvelle Conversation</UButton>
    </div>
    <ul class="flex gap-2 flex-col">
      <li v-for="[key, conversation] in Object.entries(conversations)" :key="key">
        <NuxtLink :to="`/chat/${key}`">
          <UCard>
            <h2 class="text-xl">{{ conversation.model.model }}</h2>
            <p v-if="conversation._history?.length" class="text-gray-500 truncate">
              {{ conversation._history[conversation._history.length - 1].parts[0].text }}
            </p>
          </UCard>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { v4 as uuidv4 } from "uuid";

const { data } = await useFetch("/api/chats");
console.log("data", data);

const conversations = data.value.body.conversations;

const newConversation = () => {
  const id = uuidv4();
  router.push(`/chat/${ id }`);
};

const router = useRouter();
</script>
