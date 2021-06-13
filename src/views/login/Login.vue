<template>
  <div>
    <div class="top">
      <div class="header">
        <img alt="logo" class="logo" src="@/assets/logo.png" />
      </div>
      <h2>RFID application</h2>
    </div>
    <div class="login">
      <a-form :form="form" @submit.prevent="onSubmit">
        <a-form-item>
          <a-input
            v-decorator="[
              'username',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please enter your username',
                    whitespace: true
                  }
                ]
              }
            ]"
            autocomplete="off"
            size="large"
            placeholder="Username"
          >
            <a-icon slot="prefix" type="user" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'password',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please enter password',
                    whitespace: true
                  }
                ]
              }
            ]"
            size="large"
            placeholder="Password"
            autocomplete="off"
            type="password"
          >
            <a-icon slot="prefix" type="lock" />
          </a-input>
        </a-form-item>
        <div>
          <a-checkbox :checked="true">Auto login</a-checkbox>
          <a style="float: right">Forget password</a>
        </div>
        <a-form-item>
          <a-button
            :loading="logging"
            style="width: 100%; margin-top: 24px"
            size="large"
            html-type="submit"
            type="primary"
            >Log in
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      logging: false,
      error: '',
      form: this.$form.createForm(this)
    }
  },
  methods: {
    ...mapActions('user', ['login']),
    onSubmit() {
      this.form.validateFields(async err => {
        if (!err) {
          this.logging = true
          const username = this.form.getFieldValue('username')
          const password = this.form.getFieldValue('password')
          let payload = {
            username,
            password
          }
          try {
            await this.login(payload)
            const { redirect } = this.$router.currentRoute.query || '/'
            await this.$router.push({ path: redirect })
          } catch (e) {
            console.error(e)
          } finally {
            this.logging = false
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.common-layout {
  .top {
    text-align: center;

    .header {
      height: 44px;
      line-height: 44px;

      a {
        text-decoration: none;
      }

      .logo {
        height: 44px;
        vertical-align: top;
        margin-right: 16px;
      }

      .title {
        font-size: 33px;
        color: $title-color;
        font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
        font-weight: 600;
        position: relative;
        top: 2px;
      }
    }

    .desc {
      font-size: 18px;
      color: $title-color;
      font-weight: 700;
      margin-top: 12px;
      margin-bottom: 30px;
    }
  }

  .login {
    width: 368px;
    margin: 0 auto;
    @media screen and (max-width: 576px) {
      width: 95%;
    }
    @media screen and (max-width: 320px) {
      .captcha-button {
        font-size: 14px;
      }
    }

    .icon {
      font-size: 40px;
      color: $text-color-second;
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: $primary-color;
      }
    }
  }
}
</style>
