<template>
    <div class="row p-0 m-0">
        <NavBar :searchBar="false" headerText="အသစ်ထည့်သွင်းခြင်း">
            <div class="text-start ms-2 my-2">
                <router-link to="/home" class="btn btn-danger btn-lg"><i class="fa-solid fa-arrow-left-long"></i>
                    Back
                </router-link>
            </div>
        </NavBar>
        <div class="row p-0 m-0 my-5">
            <div class="col-md-3"></div>
            <div class="col-md-6 p-0 m-0">
                <div class="row p-0 m-0">
                    <div v-if="dataState == 0" class="col-md-12">
                        <div class="form-group text-start mt-3">
                            <label for="inputName" class="my-2">လိမ်ညာသူ၏အမည်ကိုထည့်ပါ</label>
                            <input v-model="formData.name" :class="[formError.name ? isInvalid:'']" type="text"
                                id="inputName" class="form-control" placeholder="Enter Name">
                            <div class="invalid-feedback" v-if="formError.name">
                                <small>Required</small>
                            </div>
                        </div>
                        <div class="form-group text-start mt-3">
                            <label for="inputType" class="my-2">Type ကိုထည့်ပါ</label>
                            <select v-model="formData.type" name="inputType" :class="[formError.type ? isInvalid:'']"
                                class=" form-select">
                                <option value="">Choose Type...</option>
                                <option value="customer">Customer</option>
                                <option value="agent">Agent</option>
                            </select>
                            <div class="invalid-feedback" v-if="formError.type">
                                <small>Please choose type!</small>
                            </div>
                        </div>
                    </div>
                    <div v-if="dataState == 1" class="col-md-12">
                        <div class="form-group text-start mt-3">
                            <label for="inputAccount" class="my-2">facebook,telegram စသည် တို့ ၏အကောင့်လငိ့ကို
                                ထည့်သွင်းပေးပါ</label>
                            <input v-model="formData.accountLink" :class="[formError.accountLink ? isInvalid:'']"
                                type="text" id="inputAccount" class="form-control" placeholder="Enter Account Link">
                            <div class="invalid-feedback" v-if="formError.accountLink">
                                <small>Must be Url!</small>
                            </div>
                        </div>
                        <div class="form-group text-start mt-3">
                            <label for="inputEvidence" class="my-2">facebook တွင် public ဖြင့်ရှဲထားသော ပိုစ်(post)၏လငိ့
                                ကိုထည့်ပါ</label>
                            <input v-model="formData.evidence" :class="[formError.evidence ? isInvalid:'']" type="text"
                                id="inputEvidence" class="form-control" placeholder="Enter Evidence Link">
                            <div class="invalid-feedback" v-if="formError.evidence">
                                <small>Must be Url!</small>
                            </div>
                        </div>
                    </div>
                    <div v-if="dataState == 2" class="col-md-12">
                        <div class="form-group text-start mt-3">
                            <label for="inputPhone" class="my-2">လိမ်ညာသူ၏ဖုန်းနံပါတ် ရှိပါ က ထည့်ပါ</label>
                            <input v-model="formData.phone" type="text" id="inputPhone" class="form-control"
                                placeholder="Enter Phone">
                        </div>
                        <div class="form-group text-start mt-3">
                            <label for="inputDesc" class="my-2">ဖော်ပြလိုသော အကြောင်းအရာများကို‌ရေးပေးပါ</label>
                            <textarea v-model="formData.description" :class="[formError.description ? isInvalid:'']"
                                id="inputDesc" rows="5" class="form-control" placeholder="Enter Description"></textarea>
                            <div class="invalid-feedback" v-if="formError.description">
                                <small>Required</small>
                            </div>
                        </div>
                    </div>
                    <div v-if="dataState == 3" class="col-md-12 text-start">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title">ဖြည်သွင်းထားသော အချက် အလက်များ</h5>
                            </div>
                            <div class="card-body">
                                <h6 class="card-subtitle mb-2 text-muted">Imformation of {{ formData.name }}</h6>
                                <p class="card-text">{{ formData.description }}</p>
                                <a :href="formData.accountLink" target="_black" class="card-link">အကောင့်ကိုကြည့်ရန်</a>
                                <a :href="formData.evidence" target="_black" class="card-link">အထောက်အထား</a>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4">
                        <button v-if="dataState != 0" @click="goBack()"
                            class="btn btn-secondary float-start">Back</button>
                        <button class="btn btn-danger float-end" v-if="dataState < 3 "
                            @click="checkDataStatus()">Next</button>
                        <button @click="dataSubmit()" v-if="dataState == 3" class="btn btn-danger float-end">Confirm and
                            Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import NavBar from './NavBar.vue'
import { mapState } from 'vuex';
export default {
    name: 'AddPage',
    components: {
        NavBar,
    },
    data() {
        return {
            dataState: 0,
            isInvalid: "is-invalid",
            formData: {
                name: '',
                accountLink: '',
                phone: '',
                type: '',
                description: '',
                evidence: ''
            },
            formError: {
                name: false,
                accountLink: false,
                phone: false,
                type: false,
                description: false,
                evidence: false
            },
            ConfirmBtnLoading: false,
        }
    },
    methods: {
        gotoNext(state) {
            this.dataState == 3 ? '' : this.dataState = state;
        },
        goBack() {
            this.dataState != 0 ? this.dataState -= 1 : '';
        },
        isValidUrl: (urlString) => {
            try {
                return Boolean(new URL(urlString));
            }
            catch (e) {
                return false;
            }
        },
        checkDataStatus() {
            if (this.dataState == 0) {
                this.formData.type == '' ? this.formError.type = true : this.formError.type = false;
                this.formData.name == '' ? this.formError.name = true : this.formError.name = false;
                if (this.formError.type || this.formError.name) {
                    this.gotoNext(0);
                } else {
                    this.gotoNext(1);
                }
                return;
            }
            if (this.dataState == 1) {
                this.formData.accountLink == '' ? this.formError.accountLink = true : this.formError.accountLink = false;
                this.formData.evidence == '' ? this.formError.evidence = true : this.formError.evidence = false;
                !this.isValidUrl(this.formData.accountLink) ? this.formError.accountLink = true : this.formError.accountLink = false;
                !this.isValidUrl(this.formData.evidence) ? this.formError.evidence = true : this.formError.evidence = false;
                if (this.formError.accountLink || this.formError.evidence) {
                    this.gotoNext(1);
                } else {
                    this.gotoNext(2);
                }
                return;
            }
            if (this.dataState == 2) {
                // this.formData.accountLink == '' ? this.formError.accountLink = true : this.formError.accountLink = false;
                this.formData.description == '' ? this.formError.description = true : this.formError.description = false;
                if (this.formError.description) {
                    this.gotoNext(2);
                } else {
                    this.gotoNext(3);
                }
                return;
            }
        },
        backToStart() {
            this.dataState = 0;
            this.formData = {
                name: '',
                accountLink: '',
                phone: '',
                type: '',
                description: '',
                evidence: ''
            };
            this.ConfirmBtnLoading = false;
        },
        dataSubmit() {
            // this.ConfirmBtnLoading = true;
            axios.post(this.ApiUrl + '/lie_user/insert', this.formData)
                .then(r => {
                    if (r.data.success) {
                        this.$swal('Success.', r.data.success, 'success');
                        this.backToStart();
                    } else {
                        let errors = '';
                        for (let i = 0; i < r.data.errors.length; i++) {
                            errors += r.data.errors[i];
                        }
                        this.$swal("Error!", errors, 'error');
                        this.ConfirmBtnLoading = false;
                    }
                }).catch(err => {
                    this.$swal(err.response.status + '!', err.response.statusText, 'error');
                    this.ConfirmBtnLoading = false;
                })
        }
    }, computed: {
        ...mapState(['ApiUrl']),
    },

}
</script>

<style lang="scss" scoped>

</style>