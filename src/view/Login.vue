<template>
    <div class="login">
        <div class="login-container">
            <form class="login-form">
                <div>
                    <div>
                    <input type="text" name="username" v-model="formValues.username" placeholder="User Name">
                    </div>
                    <p class="error" v-if="err.username">{{err.username}}</p>
                </div>
                <div>
                    <div>
                    <input type="password" name="password" v-model="formValues.password" placeholder="Password">
                    </div>
                    <p class="error" v-if="err.password">{{err.password}}</p>
                    <p class="error" v-if="err.submit">{{err.submit}}</p>
                </div>
                <div class="login-button"><button type="submit" @click.prevent="handleLogin"> Login</button></div>
            </form>

        </div>
    </div>
</template>

<script>
import '../style/error.css'
import '../style/input.css'
import '../style/button.css'
import authApi from '@/api/authApi';

export default {
    name: 'login-view',
    data(){
        return{
            formValues:{
                username:'',
                password:'',
            },
            err:{
                
            }
        }
    },
    methods:{
       async handleLogin(){
            
            const data = this.formValues
            
            this.err = this.validateLoginForm(data)
            if (Object.keys(this.err).length === 0 && this.err.constructor === Object){
            const res = authApi.login(data) 

            res.then((res)=>{
                console.log(res);
                
                this.$store.dispatch('login',res.user)
                this.$router.push('/')
            })
            .catch((error)=>{
                // console.log(error.response);
                
                this.err.submit = error.response.data.message
                })}
            
            
        },
        validateLoginForm(values){
            const err = {};
            if (values.username === '') err.username = '*Bắt buộc'
            if (values.password === '') err.password = '*Bắt buộc'
            
            return err
        }
    }


}
</script>

<style>
.login{
    display: flex;
    justify-content: center;
    align-items: center;
    
}
.login-container{
    box-sizing: border-box;
    box-shadow: 0 0 5px grey ;
    border-radius: 10px;
    border: 1px solid grey;
    padding: 30px;
    margin-top: 200px;
}
.login-form{
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.login-button{
    display: flex;
    justify-content: center;
}


</style>