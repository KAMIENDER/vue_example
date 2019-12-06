<template>
  <div class="page2">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'blog',
  data () {
    return {
      msg: 'blog'
    }
  }
}
</script>

<style scoped>
h1 {
  font-weight: normal;
  text-align: center;
  height: 10px;
  width: 20px;
  margin-left: 45%;
  margin-top: 10%;
}
</style>
