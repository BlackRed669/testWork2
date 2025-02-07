<template>
  <div>
    <div class="border-bottom">
      <q-item>

        <q-item-section avatar>
          <a href="/"><q-btn outline color="primary" label="<" /></a>
        </q-item-section>

        <q-item-section avatar>
          <q-img :src="icon" class="circleIcon" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ name }}</q-item-label>
        </q-item-section>

      </q-item>

    </div>
    <div class="q-pa-md row justify-center">
      <div class="divMain" id="chatDiv">

        <div v-for="message in this.messages" :key="message.id" :id="message.id" class="justify-end">
          <q-chat-message :sent="message.sent">
            <div>
              {{ message.message }}
            </div>
          </q-chat-message>
        </div>

      </div>
    </div>

    <div>
      <q-input v-model="myMessage" bg-color="white" class="full-width" outlined rounded dense label="Your message"
        @keyup.enter="sendMessage">
        <template v-slot:after>
          <q-btn round color="primary" icon="navigation" @click="sendMessage" />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive, onUpdated } from "vue";
import { socket } from "boot/socket";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

export default {
  setup() {
    const myMessage = ref("");
    let messages = ref([]);
    const route = useRoute();
    let icon = ref("");
    let name = ref("");

    onBeforeRouteUpdate((to, from, next) => {
      next();
      getHistory(to.params.chatId, to.params.userId);
    });

    onUpdated(() => {
      let div = document.getElementById("chatDiv").lastElementChild;
      if (div)
        div.scrollIntoView({ behavior: "smooth" })
    });

    onMounted(() => {
      getHistory();
    });

    socket.on("getSMS", (data) => {
      if (data.chatId == route.params.chatId)
        messages.value.push(data);
    });

    const sendMessage = () => {
      let formData = {
        "content": myMessage.value,
        "chatId": route.params.chatId,
      };
      socket.emit("sendSMS", formData);
      myMessage.value = ""; // Очищаем поле ввода
    };

    function getHistory(chatId, userId) {
      messages.value = [];

      if (!userId || !chatId) {
        chatId = route.params.chatId;
        userId = route.params.userId;
      }

      const variables = reactive({
        myId: Number(userId),
        chatId: Number(chatId)
      });
      useQuery(gql`
          query getHistory($myId: Int, $chatId:Int)
          {
            history (myId:$myId, chatId:$chatId) {
              id
              message
              sent
              name
            }
            getUser(myId:$myId, chatId:$chatId)
            {
              name
              icon
            }
          }`, variables, { fetchPolicy: "no-cache" }
      ).onResult(
        (res) => {
          if (res.data) {
            res.data.history.forEach(n => messages.value.push(n));
            name.value = res.data.getUser.name;
            icon.value = res.data.getUser.icon;
          }
        }
      );

    }

    return {
      myMessage,
      messages,
      icon,
      name,
      sendMessage
    };
  },
};
</script>

<style>
.divMain {
  padding: 10px;
  width: 100%;
  max-height: 500px;
  overflow: auto;
}

.border-bottom {
  border-bottom: 2px solid #00000011;
}
</style>
