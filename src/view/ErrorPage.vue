<template>
    <div class="error-container">
        <div class="error-page">404</div>
        <div class="message">Page not found</div>
        <button class="btn-gohome" @click="$router.push('/')">Go home</button>
    </div>
</template>

<script>
export default {
    name: 'error-page'
}
</script>

<style>
    .error-page{
        font-size: 50px;
        font-weight: 700;
    }
    .message{
        font-weight: 700;
        font-size: 40px;
    }
    .btn-gohome{
        font-weight: 600;
        font-size: 30;
        color: #fff;
        background-color: rgb(3, 181, 50);
        border: none;
        border-radius: 8px;
    }
    .error-container{
        margin: 50px 200px;
    }
</style>