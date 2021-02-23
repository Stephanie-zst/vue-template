<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <p>HomePage</p>
  </div>
</template>

<script>
import UserApi from '@/api/user'
export default {
  name: 'HomePage',
  data() {
    return {}
  },
  created() {
    UserApi.getInfo()
  },
  mounted() {},
  filters: {},
  watch: {},
  methods: {},
}
</script>

<style>
</style>
