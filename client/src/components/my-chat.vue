<template>
 <div class="q-pa-md row justify-center">
    <div style="width: 100%; max-width: 400px">
      
      <q-chat-message
        name="Me"
        :text="['hey, how are you?']"
        sent
      />
      <q-chat-message
        name="Me"
        :text="['hey, how are you?']"
        
      />
      <q-chat-message
        name="me"
        :text="['doing fine, how r you?']"
        sent
      />
      <q-chat-message
        name="Jane1"
        :text="['doing fine, how r you?']"
      />
      <q-chat-message
        name="Jane"
        :text="['doing fine, how r you?']"
      /> 
      
    </div>
  </div>



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
    const toId = '1';

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
        "fromId": fromTo.value,
        "toId": toId
      };
      socket.emit('sendSMS', formData);
      message.value = ''; // Очищаем поле ввода
    };

    const getSMS = () => {
      socket.emit('getSMS');
      
    };

    console.log(getSMS);
    return {
      message,
      messages,
      fromTo,
      sendMessage
    };
  }
};
</script>
