<template>
    <div id='test_footer'>
      <p> {{ info }}</p>
    </div>
</template>

<script>
export default {
  data:() => ({
    info: 'copyright © Beijing Jingwei Hirain Tech. Co.Ltd'
  })
}
</script>

<style scoped>
p {
  line-height: 20px;
  margin: 20px 0px;
}
</style>