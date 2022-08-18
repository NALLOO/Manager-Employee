<template>
  <div class="employee-list">
    <div class="employee-list-container">
      <button class="add-employee" @click="handleClickAdd">Add</button>
      <table class="employee-list-table">
        <tr>
          <th>ID</th>
          <th>Avatar</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Gender</th>
          <th>Birth date</th>
          <th>Salary</th>
          <th>Department</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        <template v-for="employee in this.$store.state.employees" :key="employee.emp_no">
          <tr>
            <td>{{employee.emp_no}}</td>
            <td><img :src=baseImgUrl+employee.avatar alt="Ava"></td>
            <td>{{employee.first_name}}</td>
            <td>{{employee.last_name}}</td>
            <td v-if="employee.gender==='M'">Male</td> 
            <td v-else>Female</td>
            <td>{{formatDate(employee.birth_date)}}</td>
            <td>{{employee.salary}}</td>
            <td>{{employee.department}}</td>
            <td><button class="btn-list" @click="handleClickEdit(employee)">Edit</button></td>
            <td><button class="btn-list" @click="handleDelete(employee)">Delete</button></td>
          </tr>
        </template>
      </table>
      <Pagination v-model = "page"/>
    </div>
   
  </div>
   <PopUpForm v-if="isAddMode" :isAddMode="isAddMode" :employees="employee" @exitform="handleExitForm"/>
   <PopUpForm v-if="isEditMode" :isEditMode="isEditMode" :employees="employee" @exitform="handleExitForm"/>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import employeeApi from '@/api/employeeApi'
import PopUpForm from './PopUpForm.vue'
import formatDate from '@/mixin/formatDate'

export default {
    name: 'employee-list',
    mixins:[formatDate]
    ,
    data(){
      return{
        baseImgUrl: process.env.VUE_APP_IMG_URL,
        isAddMode: false,
        isEditMode: false,
        page: 1,
        
        employee:{}
      }
    },
    watch:{
      page(newPage, oldPage){
        if(newPage!==oldPage){
          this.getEmployee(newPage);
        }
      }
    },
    components:{
    Pagination,
    PopUpForm
    },
    created(){
      
            
        const res= employeeApi.getAll(this.$route.params)
        res.then((response)=>{
        if ((+this.$route.params.page<1)||(+this.$route.params.page>=response.maxPage) ) {
          this.$store.dispatch('setPage', 1);
          this.$store.dispatch('setMaxPage',response.maxPage);
          
          const res= employeeApi.getAll({page: 1})
          res.then((response)=>{
            this.$store.dispatch('setEmployees',response.data)
          })
          this.$router.push({name:'employee',params:{page:1}})
        }
        else {
        this.$store.dispatch('setPage', +this.$route.params.page);
        this.$store.dispatch('setMaxPage',response.maxPage);
        this.$store.dispatch('setEmployees',response.data);}
      })
      .catch((error)=>{console.log(error);})
    },
    methods:{
      getEmployee(page){
         const res= employeeApi.getAll({page: page})
          res.then((response)=>{
            this.$store.dispatch('setEmployees',response.data)
          })
          .catch((err)=>{console.log(err);})
      }
      ,
      handleClickAdd(){
        this.isAddMode = true,
        this.employee ={}
      },
      handleClickEdit(employee){
        // console.log(employee);
        this.employee=employee;
        this.isEditMode= true;
      },
      handleDelete(employee){
        // console.log(employee);
        employeeApi.delete(employee.id);
        const employees = this.$store.state.employees.filter(emp => emp.emp_no !== employee.emp_no)
        console.log(employees);
        
        this.$store.dispatch('setEmployees',employees)
        
      }
      ,
      handleExitForm(){
        this.isAddMode=false,
        this.isEditMode=false
        
      }
    }

}
</script>

<style>
.employee-list{
  display: flex;
  justify-content: center;
}
.employee-list-container{
  margin-top: 100px;
  width: 1500px;
}
.employee-list-table{
  width: 100%;
}
table{
  border: 1px solid rgb(61, 61, 61) ;
  border-radius: 5px;
  box-shadow: 0 0 5px grey;
}
td,th{
  padding: 10px 15px;
  font-size: 23px;
}
.btn-list{
  width: 80px;
  height: 35px;
}
.add-employee{
  margin-bottom: 20px;
}
td img{
  width: 40px;height: 40px;
  border-radius: 50%;
  border: 1px solid gray;
  box-shadow: 0 0 4px rgb(82, 80, 80);
}
</style>