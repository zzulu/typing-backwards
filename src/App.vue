<template>
  <div class="container">
    <InputBackwards />
    <Sentences />
  </div>
</template>

<script>
import Sentences from '@/components/Sentences.vue'
import InputBackwards from '@/components/InputBackwards.vue'

export default {
  name: 'App',
  components: {
    Sentences,
    InputBackwards,
  }
}
</script>

<style>

</style>
