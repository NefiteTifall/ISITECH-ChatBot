<template>
  <div class="container mx-auto p-4 flex flex-col h-screen">
    <div class="mb-4">
      <NuxtLink to="/">← Retour aux conversations</NuxtLink>
    </div>
    <div class="flex-1 overflow-auto mb-4">
      <div v-if="conversation?.body && conversation.body.history.length === 0" class="text-center">
        <p class="text-gray-500">Aucun message pour le moment, commencez la conversation :) </p>
      </div>
      <div v-for="message in conversation.body.history" :key="message.id" class="mb-2">
        <div :class="messageClass(message.role)">
          <MDC v-for="part in message.parts" :key="part" :value="part.text" />
        </div>
      </div>
      <div v-if="isLoading || status === 'pending'" class="text-center">
        <USkeleton class="mb-2 h-8" />
        <p v-if="status === 'pending'" class="text-sm text-gray-500">Chargement des messages...</p>
        <p v-else="status === 'pending'" class="text-sm text-gray-500">Envoi du message...</p>
      </div>
    </div>
    <form @submit.prevent="sendMessage" class="flex">
      <input
        v-model="newMessage"
        type="text"
        ref="input"
        placeholder="Écrivez votre message..."
        class="flex-1 border border-gray-300 p-2 rounded-l"
        :disabled="isLoading"
      />
      <UButton type="submit" class="rounded-l-none">Envoyer</UButton>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const conversationId = route.params.id;
let conversation = ref(null);
const isLoading = ref(false);

let status;
const fetchMessages = async () => {
  const fetch = useLazyFetch("/api/chat/" + conversationId);
  status = fetch.status;
  conversation = fetch.data;
}
fetchMessages();

watch(conversation, (newData) => {
  console.log("newData.body", newData.body)
});

const newMessage = ref("");
const input = ref(null);

const sendMessage = () => {
  if (newMessage.value.trim() === "") return;

  isLoading.value = true;
  fetch(`/api/chat/${ conversationId }`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: newMessage.value
    })
  }).then(async (res) => {
    const data = await res.json();
    newMessage.value = "";
    conversation.value = data;
    isLoading.value = false;
  });
};

const messageClass = (sender) => {
  return sender === "user"
    ? "text-right bg-blue-100 p-2 rounded mb-1"
    : "text-left bg-gray-100 p-2 rounded mb-1";
};
</script>
