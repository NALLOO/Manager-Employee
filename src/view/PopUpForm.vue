<template>

    <div class="popup">
        <div class="popup-container">

            <h2 class="title-form" v-if="isAddMode">Add Employee</h2>
            <h2 class="title-form" v-if="isEditMode">Edit Employee</h2>
            <div class="popup-form">
                <div>
                    <div class="input">
                        <label for="first-name">First name</label>
                        <input id="first-name" v-model="employee.first_name" maxlength="20" type="text" placeholder="First name">
                    </div>
                    <p v-if="err.first_name" class="error">{{ err.first_name }}</p>
                </div>
                <div>

                    <div class="input">
                        <label for="">Last name</label>
                        <input  v-model="employee.last_name" maxlength="20" type="text" placeholder="Last name">
                        
                    </div>
                    <p v-if="err.last_name" class="error">{{ err.last_name }}</p>
                </div>
                <div>

                    <div class="input-gender">
                        
                        <input name="gender" v-model="employee.gender" id="Male" type="radio" value="M"> <label for="Male">Male</label>
                        <input name="gender" v-model="employee.gender" id="Female" type="radio" value="F"><label for="Female">Female</label>
                    </div>
                    <p v-if="err.gender" class="error">{{ err.gender }}</p>
                </div>
                <div>

                    <div class="input">
                        <label for="">Hire date</label>
                        <input  v-model="employee.hire_date" type="date" >
                       
                    </div>
                    <p v-if="err.hire_date" class="error">{{ err.hire_date }}</p>
                </div>
                <div>

                    <div class="input">
                        <label for="">Birth date asasas</label>
                        <input  v-model="employee.birth_date" type="date">
                        
                    </div>
                    <p v-if="err.birth_date" class="error">{{ err.birth_date }}</p>
                </div>
                <div>

                    <div class="input">
                        <label for="">Title</label>
                        <select v-model="employee.title_id" name="title" >
                        <option value=1 >Manager</option>
                        <option value=2 >Developer</option>
                        </select>
                        
                    </div>
                    <p v-if="err.title" class="error">{{ err.title }}</p>
                </div>
                <div>

                    <div class="input">
                        <label for="">Department</label>
                        <select name="department" v-model="employee.department_id">
                        <option value="1">Division 1</option>
                        <option value="2">Division 2</option>
                        </select>
                    </div>
                    <p v-if="err.department" class="error">{{ err.department }}</p>
                </div>
                <div>

                    <div class="input">
                        <label for="">Salary</label>
                        <input type="number" min="0" v-model="employee.salary" >
                    </div>
                    <p v-if="err.salary" class="error">{{ err.salary }}</p>
                </div>
                <div class="input">
                    <label >Avatar</label>
                    <input v-if="!url" type="file" class="input-file" required accept="image/*" @change="setAvatar($event)">
                    <div v-else class="input-file"><img  :src="url"/> <div class="img-delete" @click="deleteImg">X</div></div>
                </div>

                <div class=" submit">
                    <button class="exit-form" @click="handleClickExit">Back</button>
                    <button type="submit" class="submit-form" @click.prevent="handleSubmit">submit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script >
import employeeApi from '@/api/employeeApi';



export default {
    name: 'popup-form',
    props: {
        isAddMode:{
            type: Boolean,
            default:() => false
        },
        isEditMode:{
            type:Boolean,
            default:() => false
        },
        employees:{
            type:Object,
            default:() => {}
        }

    },
    data() {
        return {
            err: {},
            url: this.employees.avatar? process.env.VUE_APP_IMG_URL+this.employees.avatar: null,
            // employee: this.emptyemployee,
            employee:{...this.employees},
            
        }
    },
    methods: {
        handleClickExit(){
            this.$emit('exitform')
        },
        async handleSubmit() {
            if (this.isEditMode){
                const employeeList = this.$store.state.employees;
                const index = employeeList.findIndex(emp => this.employee.emp_no === emp.emp_no)
                employeeList[index] = this.employee
                this.$store.dispatch('setEmployees', employeeList)
                const data = new FormData()
                data.append('emp_no', this.employee.emp_no)
                data.append('first_name', this.employee.first_name) 
                data.append('last_name', this.employee.last_name)
                data.append('gender', this.employee.gender)
                data.append('hire_date', this.employee.hire_date)
                data.append('birth_date', this.employee.birth_date)
                data.append('title_id', this.employee.title_id)
                data.append('department_id', this.employee.department_id)
                data.append('salary', this.employee.salary)
                data.append('avatar', this.employee.avatar)
                // console.log(data);
                employeeApi.update({data: data,id: this.employee.id})
                this.$emit('exitform')
            }
            if (this.isAddMode){
                const index = Math.floor(Math.random()*1000)+1000
                this.employee.emp_no = index;

                const data = new FormData()
                data.append('emp_no', this.employee.emp_no)
                data.append('first_name', this.employee.first_name)
                data.append('last_name', this.employee.last_name)
                data.append('gender', this.employee.gender)
                data.append('hire_date', this.employee.hire_date)
                data.append('birth_date', this.employee.birth_date)
                data.append('title_id', this.employee.title_id)
                data.append('department_id', this.employee.department_id)
                data.append('salary', this.employee.salary)
                data.append('avatar', this.employee.avatar)
                // console.log(index);
                await employeeApi.add(data)
                this.$emit('exitform')
                location.reload()
                
            }

        },
        setAvatar(e){
            this.url = URL.createObjectURL(e.target.files[0])
            // console.log(this.url);
            this.employee.avatar = e.target.files[0]

            // console.log(e);
        },
        deleteImg(){
            this.url = null;
            this.employee.avatar = null;

        }

        ,
        validate(data) {
            const error = {};
            if (!data.first_name) error.first_name = "bắt buộc"
            if (!data.last_name) error.last_name = "bắt buộc"
            if (!data.code_employee) error.code_employee = "bắt buộc"
            if (!data.class) error.class = "bắt buộc"
            if (!data.math) error.math = "bắt buộc"; else if ((data.math < 0) || (data.math > 10)) error.math = 'điểm không hợp lệ'
            if (!data.physical) error.physical = "bắt buộc"; else if ((data.physical < 0) || (data.physical > 10)) error.physical = 'điểm không hợp lệ'
            if (!data.chemistry) error.chemistry = "bắt buộc"; else if ((data.chemistry < 0) || (data.chemistry > 10)) error.chemistry = 'điểm không hợp lệ'
            

            
                return error;
        }
    }

}
</script>

<style >
.popup {
    display: flex;
    justify-content: center;
    align-items: center;
    
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);
}

.popup-container {
    box-sizing: border-box;
    width: 500px;
    background-color: #fff;
    padding: 40px;
    border-radius: 10px;

}
.popup-container h2{
    text-align: center;
    font-size: 30px;
}
.popup-form{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
}
.popup-form input{
    width: 300px;
}
.popup-form label{
    font-size: 20px;
    padding: 15px 0;
}
.popup-form select{
    padding: 5px 15px;
    width: 300px;
    border-radius: 8px;
    font-size: 20px;
    
}
.popup-form select option{
    font-size: 17px;
}


.input {
    display: flex;
    justify-content: space-between;
}


.submit {
    display: flex;
    justify-content: center;
}

.submit-form, .exit-form {
    margin-right: 15px;
    width: 100px;
    height: 30px;
}
.input-gender{
    display: flex;
    justify-content: end;
    height: 25px;
}
.input-gender > label{
    padding: 0;
}
.error {
    margin: 5px;
    text-align: right;
    color: red;
    font-style: italic;
    font-size: 13px;
}
#Male, #Female{
    width: 20px;
    height: 20px;
}
.input img{
    width: 100px;
    height: 100px;
    margin-right: 100px;
}
.input-file{
    position: relative;
}
.img-delete{
    position: absolute;
    top:0;
    right: 0;
    width: 20px;
    height: 20px;
    color:#fff;
    background-color: red;
    
    box-sizing: border-box;
    cursor: pointer;
    font-size: 16px;
    padding: 1px;
    border-radius: 5px;
    border: 1px solid gray;
}

</style>