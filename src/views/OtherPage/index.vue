<template>
  <div class="other">
    <p>OtherPage</p>
    <HelloWorld msg="HelloWorld" />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld'

export default {
  name: 'OtherPage',
  components: {
    HelloWorld,
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  filters: {},
  watch: {},
  methods: {},
}
</script>

<style>
</style>
