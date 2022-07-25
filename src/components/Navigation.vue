<template>
    <div class="navigation">
        <div class="nav-link-home" ><router-link class="nav-link-home" to="/">NALLOO</router-link></div>
        <div class="nav-link">

            <ul>
                <li v-if="!$store.state.profile.id">
                <router-link to="/register" class="link">Đăng ký</router-link></li>
                <li v-else-if="$store.state.profile.id%2===0">
                    <router-link :to="{name:'employee',params:{page: $store.state.page}}" class="link">Nhân viên</router-link>
                </li>
                
                    
                
                <li v-if="$store.state.profile.id" class="link" @click="handleLogout">Đăng xuất</li>

            </ul>
        </div>

    </div>
</template>

<script>
import authApi from '@/api/authApi';
import profileApi from '@/api/profileApi';



export default 
{   
     name :'navigation-component',
     props:{

     },
     data(){
        return{
            
        }
     },
     created(){
        const response = profileApi.getAll();
            response.then((response)=>{
            // console.log('profile',response);
            this.$store.dispatch('setProfile', response.item)
            if(this.$store.state.profile.id%2!==0){
                const path = ['/',]
                if (!path.includes(this.$route.path)) {
                    
                    this.$router.push('/')
                    
                }
            }

        })
        .catch((error)=>{
            console.log('error',error);
        })
    }
,
    computed:{
        
    }
,
     methods:{
        async handleLogout(){
           await authApi.logout();
            this.$store.dispatch('logout');
            await localStorage.removeItem('access_token')
             localStorage.removeItem('refresh_token')
             localStorage.removeItem('token_type')
            this.$router.push('/login')
        }

     }

}
</script>

<style>
.navigation{
    padding: 20px 50px;
    background-color: rgb(183, 182, 182);
    display: flex;
    justify-content: space-between;
    
}
.nav-link ul{
    display: flex;
    justify-content: space-between;
    gap: 120px;
}
.nav-link ul li {
    
    font-size: 25px;
    font-weight: 700;
    list-style: none;
    cursor: pointer;
}
.link{
    text-decoration: none;
    color: #000;
    transition: all 0.15s ease-in-out;
}
.link:hover{
    color:rgb(5, 81, 222)
}
.nav-link-home{
    font-weight: 600;
    font-size: 30px;
    text-decoration: none;
    color: #000;
}
div.nav-link-home{
    display: flex;
    align-items: center;
}

</style>