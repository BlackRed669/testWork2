<template>
  <q-page>
    <div>
      <q-input v-model="fromTo" label="Your login ID" />
      <q-input v-model="message" label="Your message" />
      <q-btn label="Send" @click="sendMessage" />

      <div v-for="(msg, index) in messages" :key="index">
        {{ msg }}
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue';
import { socket } from 'boot/socket';


export default {
  setup() {
    const message = ref('');
    const fromTo = ref('');
    const messages = ref([]);

    // Слушаем события от сервера
    onMounted(() => {
      socket.on('response', (data) => {
        messages.value.push(data.message);
      });
    });

    // Отправляем сообщение на сервер
    const sendMessage = () => {

      let formData = {
        "value": message.value,
        "fromId": fromTo.value
      };


      socket.emit('message', formData);
      message.value = ''; // Очищаем поле ввода
    };

    return {
      message,
      messages,
      fromTo,
      sendMessage
    };
  }
};
</script>
