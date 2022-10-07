<template>
    <div class="p-0 m-0">
        <nav class="navbar navbar-light bg-light">
            <div class="container-fluid m-0 p-0">
                <a class="navbar-brand text-danger"><i class="fa-solid fa-passport fs-1 me-1"></i> Passport Helper</a>
                <div class="d-flex input-group w-auto" v-if="searchBar">
                    <input @keypress.enter="searchData()" v-model="searchKey" type="search" class="form-control rounded"
                        placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                    <button @click="searchData()" class="input-group-text btn btn-danger border-0" id="search-addon">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
                <div class="badge badge-danger">{{ headerText }}</div>
            </div>
        </nav>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'NavBar',
    props: {
        searchBar: {
            type: Boolean,
            default: true,
        },
        headerText: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            searchKey: localStorage.getItem('searchKey')
        }
    },
    methods: {
        searchData() {
            let status = this.$store.dispatch('findData', this.searchKey);
        },
    },
    computed: {

    },
    beforeMount() {
        this.searchData();
    },
}
</script>

<style lang="scss" scoped>

</style>