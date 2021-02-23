<template>
  <div class="hello">
    <p>components: {{ msg }}-{{ tip }}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: {
      required: true,
      type: String,
      default: '',
    },
    tip: {
      required: false,
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped>
</style>
