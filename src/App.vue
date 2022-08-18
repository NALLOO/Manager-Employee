<template>
  <div class="app">
    <div class="container">
      <Navigation />
      <router-view />
    </div>

  </div>

</template>

<script>

// import PopUpForm from './components/PopUpForm.vue'
// import Pagination from './components/Pagination.vue'
import Navigation from './components/Navigation.vue'



export default {
  name: 'App',
  data() {
    return {}},
  created(){
    console.log('created');
    // if(!window.localStorage.getItem('access_token')) this.$router.push('/login')
  },
  
      

  
  computed: {
  }
  ,
  methods: {
  },
  components: {
    Navigation
  //   PopUpForm,
  //   Pagination,
  // 
  }


    }

</script>

<style>
.container {
  width: 100%;
  min-height: 931px;
  
}
body{
  margin: 0;
}


</style>
