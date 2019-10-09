<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-faded">抱歉, 找不到当前路径...<strong>(404)</strong></p>
    <q-btn
      color="secondary"
      style="width:200px;"
      to="/"
      label="返回主页"
    />
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>
