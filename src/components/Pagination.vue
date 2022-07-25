<template>
    <div class="pagination-row">
        <div>
        <button :class="{isActive: (this.$store.state.page>1)}" class="pagination-button" @click="handlePrev">Prev</button>
        <span v-for="(item, index) in new Array(this.$store.state.maxpage)" :key="index">

            <button 
            class="change-button" 
            :class="{ ispage: (this.$store.state.page == index + 1) }" 
            
                @click="handleChangePage(index+1)">{{
            index + 1
    }}</button>
        </span>
        <button :class="{isActive: (this.$store.state.page<this.$store.state.maxpage)}" class="pagination-button" @click="handleNext">Next</button>
    </div>
    </div>
</template>

<script >
import employeeApi from '@/api/employeeApi'



// console.log(this.pages);
export default {
    name: 'pagination-component',
    props: {
        pages: Number,
        onPage: {
            type: Number,
            default() { return 0 }
        }
    },
    mounted() {

    },
    data() {
        return {
            page: 1
        }
    },
    methods: {
        async handleChangePage(index) {
            if(this.$store.state.page !== index) {
                await this.$router.push({ name: 'employee', params: { page: index }})
                await this.$store.dispatch('setPage', index);
                const res = employeeApi.getAll(this.$route.params)
                res.then((response) => {

                    this.$store.dispatch('setPage', +this.$route.params.page);
                    this.$store.dispatch('setMaxPage', response.maxPage);
                    this.$store.dispatch('setEmployees', response.data);
                })
                    .catch((error) => { console.log(error); })
            }

        },
        async handlePrev() {
            if (this.$store.state.page > 1){
                await this.$router.push({ name: 'employee', params: { page: this.$store.state.page - 1 } })
                await this.$store.dispatch('setPage', this.$store.state.page - 1);
                const res = employeeApi.getAll(this.$route.params)
                res.then((response) => {

                    this.$store.dispatch('setPage', +this.$route.params.page);
                    this.$store.dispatch('setMaxPage', response.maxPage);
                    this.$store.dispatch('setEmployees', response.data);
                })
                    .catch((error) => { console.log(error); })
            }
        },

        async handleNext() {
            if (this.$store.state.page < this.$store.maxpage) {
                await this.$router.push({ name: 'employee', params: { page: this.$store.state.page + 1 } })
                await this.$store.dispatch('setPage', this.$store.state.page + 1);
                const res = employeeApi.getAll(this.$route.params)
                res.then((response) => {

                    this.$store.dispatch('setPage', +this.$route.params.page);
                    this.$store.dispatch('setMaxPage', response.maxPage);
                    this.$store.dispatch('setEmployees', response.data);
                })
                    .catch((error) => { console.log(error); })
            }
        }
    }
}


</script>

<style >
.pagination-row {
    padding: 20px;
    display: flex;
    justify-content: center;

}
.pagination-row>div{
    display: flex;
    justify-content: space-between;
    gap: 10px;
}

.change-button{
    background-color: grey;
    transition: all ease 0.2s;
    width: 30px;
    height: 40px;
}
.change-button:hover{
  background-color: rgb(42, 41, 41);  
}

.pagination-button {
    background-color: grey;
    transition: all ease 0.2s;
    width: 70px;

}

.isActive:hover {
    background-color: rgb(63, 63, 63);
}

.ispage {
    background-color: rgb(42, 41, 41);
}
</style>