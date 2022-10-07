import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'mdb-ui-kit/js/mdb.min.js';
import 'mdb-ui-kit/css/mdb.min.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
createApp(App).use(store).use(router).use(VueSweetalert2).mount('#app')
