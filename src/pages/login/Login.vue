<template>
<div class="row q-col-gutter-md">
    <div class="col-lg-3 col-md-2"></div>
    <div class="col-lg-6 col-md-8">
      <q-item style="margin-top:100px">
        <img src="~assets/fm.jpeg" style="height:400px">
        <q-card flat bordered square style="width: 100%">
          <q-item-section>
            <div class="row flex-center bg-white" style="height: 115px;">
              <img alt="Tummy logo" src="~assets/xdz.gif" style="height: 75px;">
              <div class="caption q-ml-md">
                Tummy System
              </div>
            </div>
            <div class="q-pa-md">
                <q-form @submit="onSubmit" class="q-gutter-md">
                <q-input
                    outlined
                    clearable
                    v-model="username"
                    label="账号 *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || '请输入账号']"
                />
                <q-input
                    outlined
                    clearable
                    type="password"
                    v-model="password"
                    label="密码 *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || '请输入密码']"
                />
                <div class="text-center">
                    <q-btn label="登 录" type="submit" size="16px" class="full-width" color="primary" />
                    <!-- <q-btn label="忘记密码" color="primary" flat class="q-ml-sm" /> -->
                </div>
                </q-form>
            </div>
          </q-item-section>
        </q-card>
      </q-item>
    </div>
    <div class="col-lg-3 col-md-2"></div>
</div>
</template>

<script>
import AuthService from '../../services/AuthService'
import Storage from '../../services/Storage'
export default {
  data () {
    return {
      username: null,
      password: null
    }
  },
  methods: {
    onSubmit () {
      AuthService.authenticate({ username: this.username, password: this.password }).then((response) => {
        if (response.success) {
          Storage.set('token', response.data[0].token).then(() => {
            AuthService.getPassport().then(() => {
              this.$router.push('/index')
            })
          })
        } else {
          this.$q.notify({
            message: response.message,
            color: 'red',
            icon: 'warning',
            position: 'top',
            timeout: 2500
          })
        }
      })
    }
  }
}
</script>
