<template>
    <div class="users-component">
        <div class="user-name user">{{ nickname }}</div>
        <div class="users">
            <div class="user to-chat" v-for="(user, index) in users" @click="userClick($event, user)" :key="index">
                {{ user.nickname }}
            </div>
        </div>
    </div>
</template>

<script src="@/components/users/UsersComponent.ts" lang="ts"></script>
<style src="@/components/users/UsersComponent.scss" lang="scss" scoped></style>