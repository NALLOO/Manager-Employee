<template>
  <div class="register">
    <div class="register-container">
      <form class="register-form">
        <div>
          <div>

            <input type="text" name="username" placeholder="User name" v-model="registerValues.username">
          </div>
          <p class="error" v-if="err.username">{{err.username}}</p>
        </div>
        <div>
          <div>

            <input type="email" name="email" placeholder="Email" v-model="registerValues.email"> 
          </div>
          <p class="error" v-if="err.email">{{err.email}}</p>
        </div>
        <div>
          <div>

            <input type="password" name="password" placeholder="Enter the password" v-model="registerValues.password">
          </div>
          <p class="error" v-if="err.password">{{err.password}}</p>
        </div>
        <div>
          <div>

            <input type="password" name="re-password" placeholder="Re-enter the password" v-model="registerValues.repassword">
          </div>
          <p class="error" v-if="err.repassword">{{err.repassword}}</p>
          <p class="error" v-if="err.submit">{{err.submit}}</p>
        </div>
        <div class="register-button">
          <button @click.prevent="handleRegister">Signup</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import authApi from '@/api/authApi'
import '../style/error.css'

export default {
    name: 'register-view',
    data(){
      return{
        err:{},
        registerValues:{
          username:'',
          email:'',
          password:'',
          repassword:''
        }
      }
    },
    methods:{
      handleRegister(){
        this.err = this.validateRegister(this.registerValues)
         if (Object.keys(this.err).length === 0 && this.err.constructor === Object){
            const data = {
              username: this.registerValues.username,
              email:this.registerValues.email,
              password:this.registerValues.password,
            }
            const res = authApi.register(data)
            res.then((response)=>{
              console.log(response);
              this.$router.push('/login')
            })
            .catch((error)=>{
              console.log(error);
              this.err.submit = error.response.data.message
            })
         }
      },
      validateRegister(values){
        const err ={}
        if (values.username === '') err.username = '*Bắt buộc'
        if (values.email === '') err.email = '*Bắt buộc'; 
        else if (!values.email.toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
        err.email = '*email không hợp lệ'
        if (values.password === '') err.password = '*Bắt buộc'
        if (values.repassword === '') err.repassword = '*Bắt buộc'
        if (values.repassword !== values.password) err.repassword = '*Không đúng'
        return err
      }

    }
}
</script>

<style>

.register{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.register-container{
  box-sizing: border-box;
    box-shadow: 0 0 5px grey;
    border-radius: 10px;
    border: 1px solid grey;
    padding: 30px;
    margin-top: 200px;
}
.register-form{
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.register-button{
  display: flex;
  justify-content: center;
}


</style>