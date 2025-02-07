<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Quasar Chat
        </q-toolbar-title>

        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>

        <div v-if="!isLoaded">
          Loading...
        </div>

        <div v-else-if="isSignedIn"> {{ user?.fullName ?? user?.username }}</div>

        <div v-else>Not signed in</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Список чатов
        </q-item-label>

        <EssentialLink v-for="link in state.linksList" :key="link.id" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/vue"
import { ref, reactive, watch } from "vue"
import EssentialLink from "components/EssentialLink.vue"
// import { useQuery } from "@vue/apollo-composable"
// import gql from "graphql-tag"
import { socket } from "boot/socket";

const { isSignedIn, user, isLoaded } = useUser();
const state = reactive({ linksList: [] });
const loadUser = ref(isLoaded);

watch(loadUser, () => {
  appendUser();
})

function appendUser() {

  const variables = reactive({
    userValue1: JSON.stringify(user.value),
  });

  socket.emit("appendUser", variables);
}

socket.on('getLinks',(data)=>{
  state.linksList = data;
});


const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
