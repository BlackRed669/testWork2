<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Список чатов
        </q-item-label>

        <EssentialLink
          v-for="link in state.linksList"
          :key="link.connectUser"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useQuery } from "@vue/apollo-composable"
import gql from "graphql-tag"


const state = reactive({linksList:[]});

onMounted(() => {
  getLinks();
    });


function getLinks()
{
  useQuery(gql`
      query getMyChats 
      {
        chats (myId: 2){
          id
          lastContent
          connectUser
          connectName
        }
      }
    `).onResult(
      (res) => {
        if(res.data) 
        state.linksList = res.data.chats;
      }
    );
}

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
