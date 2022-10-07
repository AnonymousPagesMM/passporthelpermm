<template>
    <div class="row mt-5">
        <h1 class="mb-4">Welcome From Hello!</h1>
        <div class="col-md-4">
            <div class="card py-4 fs-3" @click="goToHelloMovie()" style="cursor:pointer">
                <i class="fa-solid fa-clapperboard fs-1"></i>
                Hello Movie
            </div>
        </div>
        <div class="col-md-4">
            <div @click="goToPassportHelper()" class="card py-4 fs-3" style="cursor:pointer">
                <i class="fa-solid fa-passport fs-1"></i>
                Passport Helper
            </div>
        </div>
        <div class="col-md-4">
            <div class="card py-4 fs-3" style="cursor:pointer">
                <i class="fa-solid fa-ellipsis fs-1"></i>
                Coming Soon...
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MainView',
    data() {
        return {

        }
    },
    methods: {
        goToPassportHelper() {
            this.$router.push('/home')
        },
        goToHelloMovie() {
            window.location.href = "http://hellolinker-001-site1.gtempurl.com/"
        }
    },
}
</script>

<style lang="scss" scoped>

</style>