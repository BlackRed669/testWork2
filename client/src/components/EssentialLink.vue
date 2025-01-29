<template>
  <q-item
    clickable
    tag="a"
    :href="props.connectUser"
  >
    <!-- <q-item-section
      v-if="props.icon"
      avatar
    > 
      <q-icon :name="props.icon" />
    </q-item-section> -->

    <q-item-section>
      <q-item-label>{{ props.connectName }}</q-item-label>
      <q-item-label lastContent>{{ props.lastContent }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
const props = defineProps({
  connectName: {
    type: String,
    required: true
  },

  lastContent: {
    type: String,
    default: ''
  },

  connectUser: {
    type: Number,
    default: 0
  },
})
</script>
