<template>
  <div class="chat">
    <div class="chat-messages" v-if="isOpen">
      <div class="chat-messages-title">
        <span>{{title}}</span>
      </div>

      <div class="chat-messages-list">
        <div class="message my">
          Hello
        </div>

        <div class="message">
          Hello
        </div>
      </div>

      <div class="chat-messages-input">
        <v-textarea
          v-model="message"
          label="Message"
          rows="1"
          hide-details
        ></v-textarea>

        <v-btn color="primary" @click="sendMessage">
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
const { title, isOpen, open, message, sendMessage } = useChatLogic();
</script>

<style src="./Chat.scss" lang="scss"></style>