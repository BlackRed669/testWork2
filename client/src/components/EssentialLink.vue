<template>
  <div @click="createChat">
    <q-item class="clickeble">
      <q-item-section v-if="props.icon" avatar>
        <q-img :src="props.icon" class="circleIcon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ props.name }}</q-item-label>
        <q-item-label message>{{ (lastMessage.length > 10) ? (lastMessage).substring(0, 10) + "..." : lastMessage
          }}</q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ active }}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { socket } from "boot/socket";

const router = useRouter();
const props = defineProps({
  name: {
    type: String,
    required: true
  },

  message: {
    type: String,
    default: ""
  },

  chatId: {
    type: Number,
    default: 0
  },

  id: {
    type: Number,
    default: 0
  },

  connectUserId: {
    type: Number,
    default: 0
  },

  icon: {
    type: String,
    default: ""
  },

  active: {
    type: String,
    default: ""
  }
})

let chatId = reactive(props.chatId);
let active = ref(props.active);
let lastMessage = ref(props.message);

socket.on("on_offline", (data) => {
  if (props.connectUserId == data.id) {
    active.value = data.online;
  }
});

socket.on("getSMS",(data) => {
  if (props.chatId == data.chatId) {
    lastMessage.value = data.message;
  }
});

socket.on("createChat", (data) => {
  if (data.hostUser == props.connectUserId) {
    chatId = data.id;
  }
  if (Number(data.hostUser) == Number(props.id))
    router.push("/chat/" + data.id + "/" + props.id);
});

function createChat() {
  if (chatId == 0) {
    const variables = reactive({
      hostUser: props.id,
      connectUser: props.connectUserId
    });
    socket.emit("findChat", variables);
  }
  else {
    router.push("/chat/" + chatId + "/" + props.id);
  }

}

</script>
<style>
.clickeble {
  cursor: pointer;
}

.circleIcon {
  border-radius: 50%;
}
</style>