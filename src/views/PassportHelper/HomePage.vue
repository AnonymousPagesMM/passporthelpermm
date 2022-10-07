<template>
  <div class="m-0 p-0 row">
    <NavBar>
      <div class="text-start ms-2  my-2">
        <router-link to="/" class="btn btn-primary btn-lg me-2">Main</router-link>
        <router-link to="/add" class="btn btn-primary btn-lg"><i class="fa-solid fa-circle-plus"></i> Add
          (အသစ်ထည့်သွင်းရန်)
        </router-link>
      </div>
    </NavBar>
    <div class="row m-0 p-0" style="overflow:auto">
      <div v-if="homePageState == 'error'" class="alert alert-danger py-5" role="alert" data-mdb-color="primary">
        <strong><i class="fa-solid fa-triangle-exclamation"></i> {{ homePage.error.status }}</strong> {{
        homePage.error.statusText }}
      </div>
      <div v-if="homePageState == 'input0'" class="my-3">
        <h4><i class="fa-solid fa-keyboard"></i> Please Enter Key to Search</h4>
      </div>
      <div v-if="homePageState == 'loading'" class="d-flex justify-content-center my-5">
        <div class="spinner-grow text-danger" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-if="homePageState == 'data0'" class="my-3">
        <div class="alert alert-danger" role="alert" data-mdb-color="primary">
          Hmm?Can't find concern with <strong>"{{ homePage.searchKey }}"</strong>
        </div>
      </div>

      <table v-if="homePageState == 'data'" class="table align-middle mb-0 bg-white col-md-12">
        <thead class="bg-light">
          <tr>
            <th>Case</th>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data,index) in homePage.data" :key="index">
            <td>{{ data.id }}</td>
            <td>{{ data.name }}</td>
            <td>
              <span class="text-upp">{{ data.type }}</span>
            </td>
            <td>
              <span v-if="data.status == '1'" class="badge badge-danger rounded-pill d-inline">
                လိမ်ညာထားသည်
              </span>
              <span v-if="data.status == '0'" class="badge badge-success rounded-pill d-inline">
                အတည်မပြုနိုင်သေးပါ
              </span>
            </td>
            <td>
              <button type="button" @click="goToMore(data.id)" class="btn btn-link btn-sm btn-rounded">
                ပိုမို ကြည့်ရန်
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import NavBar from './NavBar.vue';
export default {
  name: 'HomePage',
  components: {
    NavBar,
  },
  data() {
    return {

    }
  },
  methods: {
    goToMore(id) {
      this.$router.push('/more/' + id)
    }
  },
  computed: {
    ...mapState(['homePage']),
    ...mapGetters(['homePageState']),
  },
}
</script>

<style lang="scss" scoped>
.overflow {
  overflow: hidden;
}
</style>