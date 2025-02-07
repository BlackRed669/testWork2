<template>
  <div>
    <div class="q-pa-md row justify-center">
      <div style="padding: 10px; width: 100%;  max-height: 500px; overflow: auto;" id="qwert">

        <div v-for="message in this.messages" :key="message.id" :id="message.id" class="justify-end">
          <q-chat-message :name="message.name" :sent="message.sent">
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

    onBeforeRouteUpdate((to, from, next) => {
      next();
      getHistory(to.params.chatId, to.params.userId);
    });

    onUpdated(() => {
      let div = document.getElementById("qwert").lastElementChild;
      if (div)
        div.scrollIntoView({ behavior: 'smooth' })
    });

    onMounted(() => {
      getHistory();
    });

    socket.on("getSMS", (data) => {
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
          }`, variables
      ).onResult(
        (res) => {
          if (res.data) {
            res.data.history.forEach(n => messages.value.push(n));
          }
        }
      );

    }

    return {
      myMessage,
      messages,
      sendMessage
    };
  },
};
</script>
