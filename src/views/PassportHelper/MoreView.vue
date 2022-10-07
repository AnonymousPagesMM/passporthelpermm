<template>
    <div class="row m-0 p-0">
        <NavBar :searchBar="false" headerText="အချက်အလက်များ">
            <div class="text-start ms-2 my-2">
                <router-link to="/home" class="btn btn-danger btn-lg"><i class="fa-solid fa-arrow-left-long"></i>
                    Back
                </router-link>
            </div>
        </NavBar>
        <div class="col-md-12">
            <div v-if="isLoading" class="d-flex justify-content-center my-5">
                <div class="spinner-grow text-danger" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <div v-else class="card text-center">
                <div class="card-header fs-3">Information of <i class="fa-solid fa-user-secret"></i> <span
                        class="text-uppercase fw-bold">{{ lier.name }}</span></div>
                <div class="card-body">
                    <h5 class="card-title p-2">{{ lier.type }} အနေဖြင့်
                        <span v-if="lier.status == '1'" class="badge badge-danger rounded-pill d-inline">
                            လိမ်ညာထားသည်
                        </span>
                        <span v-if="lier.status == '0'" class="badge badge-success rounded-pill d-inline">
                            အတည်မပြုနိုင်သေးပါ
                        </span>
                    </h5>
                    <p class="card-text">{{ lier.description }}</p>
                    <a :href="lier.account_link" target="_black" v-if="isValidUrl(lier.account_link)"
                        class="btn btn-link me-3">အကောင့်ကိုကြည့်ရန်</a>
                    <span v-else class="me-3 btn btn-link text-decoration-line-through ">အကောင့်လင့်ပျက်နေပါသည်</span>
                    <a :href="lier.evidence" target="_black" v-if="isValidUrl(lier.evidence)"
                        class="btn btn-link">အထောက်အထားကိုကြည့်ရန်</a>
                    <span v-else class="me-3 btn btn-link text-decoration-line-through ">အကောင့်လင့်ပျက်နေပါသည်</span>
                </div>
                <div class="card-footer text-muted">{{ created_at }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import NavBar from './NavBar.vue'
import { mapState } from 'vuex'
export default {
    name: 'MoreView',
    data() {
        return {
            lier: '',
            isLoading: true,
        }
    },
    methods: {
        isValidUrl: (urlString) => {
            try {
                return Boolean(new URL(urlString));
            }
            catch (e) {
                return false;
            }
        }
    },
    beforeMount() {
        axios.get(this.ApiUrl + '/lie_user/' + this.$route.params.id)
            .then(r => {
                this.lier = r.data;
                this.isLoading = false;
            })
    },
    computed: {
        ...mapState(['ApiUrl', 'month']),
        created_at() {
            let date = new Date(this.lier.created_at);
            let d = date.getDate()
            let M = this.month[date.getMonth()];
            let Y = date.getFullYear();
            return `${d}-${M}-${Y}`
        }
    },
    components: {
        NavBar,
    },
}
</script>

<style lang="scss" scoped>

</style>