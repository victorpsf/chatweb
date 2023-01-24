<template>
  <div class="app-main">
    <users-component class="users-components-app" @user-click="userClick" :nickname="nickname" :users="users" />
    <chat-component class="chat-components-app" @send-message="sendMessage" :chat="chat" :messages="messages" />
  </div>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
  -->
</template>

<script src="@/views/app/App.ts" lang="ts"></script>
<style src="@/views/app/App.scss" lang="scss"></style>
