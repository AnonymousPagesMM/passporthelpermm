
import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
  state: {
    month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    ApiUrl: 'http://passporthelpermm-001-site1.etempurl.com/api',
    homePage: {
      data: [],
      searchKey: localStorage.getItem('searchKey'),
      isLoading: false,
      error: '',
    }
  },
  getters: {
    homePageState: state => {
      if (state.homePage.error != '') {
        return 'error'
      } else if (state.homePage.searchKey?.length == 0 && !state.homePage.isLoading) {
        return 'input0';
      } else if (state.homePage.isLoading) {
        return 'loading'
      } else if (state.homePage.data.length == 0 && state.homePage.searchKey?.length != 0) {
        return 'data0'
      } else {
        return 'data'
      }
    }
  },

  mutations: {
  },
  actions: {
    findData: ({ state }, value) => {
      state.homePage.isLoading = true;
      state.homePage.data = [];
      localStorage.setItem('searchKey', value);
      state.homePage.searchKey = value;
      axios.get(state.ApiUrl + '/lie_user/user/search?key=' + value)
        .then(r => {
          state.homePage.error = '';
          if (r.data.length > 0) {
            state.homePage.data = r.data;
          }
          state.homePage.isLoading = false;
        }).catch(err => {
          state.homePage.error = err.response;
        })
    },
  },
  modules: {
  }
})
