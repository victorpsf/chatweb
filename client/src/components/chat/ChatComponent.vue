<template>
    <div>
        <div class="chat-component" v-if="chat">
            <div class="user-message">{{ chat.nickname }}</div>
            <div class="messages">
                <div v-for="(message, index) in currentMessages" :key="index" :class="getClass(message.type)">
                    <div class="message">{{ message.text }}</div>
                </div>
            </div>
            <div class="message-write">
                <input type="text" v-model="value">
                <button @click="sendMessage(event)">Send</button>
            </div>
        </div>
    </div>
</template>

<script src="@/components/chat/ChatComponent.ts" lang="ts"></script>
<style src="@/components/chat/ChatComponent.scss" lang="scss"></style>