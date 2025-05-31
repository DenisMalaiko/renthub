<template>
  <div class="chat">
    <div class="chat-messages" v-if="isOpen">
      <div class="chat-messages-title">
        <span>{{title}}</span>
      </div>

      <div ref="chatMessagesList" class="chat-messages-list">
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="message"
          :class="{'AI': message.sender === 'AI'}"
        >
          {{message.message}}
        </div>
      </div>

      <div class="chat-messages-input">
        <v-textarea
          v-model="message"
          label="Message"
          rows="2"
          hide-details
          @keydown.enter.exact.prevent="sendMessage"
        ></v-textarea>

        <v-btn color="primary" @click="sendMessage" :loading="loading" :disabled="loading" >
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </div>
    </div>

    <div class="chat-btn" @click="open">
      <v-icon> mdi-forum </v-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChatLogic } from "~/components/Chat/Chat";

const {
  title,
  isOpen,
  open,
  message,
  sendMessage,
  messages,
  loading,
  chatMessagesList
} = useChatLogic();
</script>

<style src="./Chat.scss" lang="scss"></style>