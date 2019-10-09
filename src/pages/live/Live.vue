<template>
  <div>
    <q-splitter v-model="splitterModel" :horizontal="horizontal" style="height:100vh">
      <template v-slot:before>
        <div class="q-pa-md">
            <div class="text-h4 q-mb-md" style="position:fixed">礼物</div>
            <div v-for="n in 20" :key="n" class="q-my-md">{{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</div>
        </div>
      </template>

      <!-- <template v-slot:separator>
        <q-avatar color="primary" text-color="white" size="40px" icon="drag_indicator" />
      </template> -->

      <template v-slot:after>
        <div class="q-pa-md">
        </div>
      </template>

    </q-splitter>

  </div>
</template>
<script>
export default {
  data () {
    return {
      splitterModel: 50, // start at 50%
      horizontal: false
    }
  }
}
</script>
