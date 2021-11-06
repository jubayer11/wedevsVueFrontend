<template>
  <div>
    <template>
      <v-dialog
          v-model="dialogCreate"
          persistent
          max-width="600px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-icon
              small
              class="mr-2"
              color="primary"
              v-bind="attrs"
              v-on="on"
              @click="setPreviousData"
          >
            mdi-pencil
          </v-icon>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline create__user__headline">Edit User</span>

          </v-card-title>
          <v-form
              @submit.prevent="$v.$invalid ? null : submit()"
              ref="form"
          >
            <v-card-text>
              <v-container>


                <v-row>
                  <v-col
                      cols="12"
                      sm="6"
                      md="6"
                  >
                    <div class="create__user">
                      <v-text-field
                          :error-messages="fieldErrors('form.firstName')"
                          @input="$v.form.firstName.$touch()"
                          @blur="$v.form.firstName.$touch()"
                          v-model="form.firstName"
                          label="First Name*"
                          placeholder="Enter User First Name"
                          outlined
                          dense
                      ></v-text-field>
                    </div>

                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="6"
                  >
                    <div class="create__user">
                      <v-text-field
                          :error-messages="fieldErrors('form.lastName')"
                          @input="$v.form.lastName.$touch()"
                          @blur="$v.form.lastName.$touch()"
                          v-model="form.lastName"
                          label="Last Name*"
                          placeholder="Enter User Last Name"
                          outlined
                          dense
                      ></v-text-field>
                    </div>

                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="6"
                  >
                    <div class="create__user">
                      <v-select
                          :error-messages="fieldErrors('form.role')"
                          @input="$v.form.role.$touch()"
                          @blur="$v.form.role.$touch()"
                          v-model="form.role"
                          :items="showRoles"
                          item-text="name"
                          item-value="name"
                          label="Select Role*"
                          outlined
                          dense
                      ></v-select>
                    </div>

                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="6"
                  >
                    <div class="create__user">
                      <v-text-field
                          :error-messages="fieldErrors('form.email')"

                          @blur="$v.form.email.$touch()"
                          v-model="form.email"
                          @input="onEmailInput"
                          label="Email*"
                          placeholder="Enter User Email Address"
                          outlined
                          dense
                      ></v-text-field>
                    </div>
                    <div class="text-sm-h6 d-flex justify-center align-center mb-3">
                        <span class="custom__error__message"
                              v-if="getEditErrorMessage.email && errorShowEmail"> {{
                            getEditErrorMessage.email[0]
                          }} </span>
                    </div>

                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="6"
                  >
                    <div class="create__user">
                      <v-text-field
                          label="Phone*"
                          :error-messages="fieldErrors('form.phone')"
                          @blur="$v.form.phone.$touch()"
                          v-model="form.phone"
                          select-label="Code"
                          @input="onInput"
                          outlined
                          dense
                          @focus="checkingShowErrorPhone"
                      />
                    </div>

                    <div class="text-sm-h6 d-flex justify-center align-center mb-3">
                        <span class="custom__error__message"
                              v-if="validPhoneError.condition"> {{ validPhoneError.message }} </span>
                      <span class="custom__error__message"
                            v-if="!validPhoneError.condition && getEditErrorMessage.phone && errorShowPhone"> {{
                          getEditErrorMessage.phone[0]
                        }} </span>
                    </div>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="6"
                  >
                    <div class="create__user">
                      <v-text-field
                          :error-messages="fieldErrors('form.nationality')"
                          @input="$v.form.nationality.$touch()"
                          @blur="$v.form.nationality.$touch()"
                          v-model="form.nationality"
                          label="Nationality*"
                          placeholder="Enter User nationality"
                          outlined
                          dense
                      ></v-text-field>
                    </div>


                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                      offset-md="2"
                      class="mt-0 pt-0"
                  >
                    <div class="create__user">
                      <v-radio-group
                          v-model="form.isStaff"
                          :error-messages="fieldErrors('form.isStaff')"
                          @input="$v.form.isStaff.$touch()"
                          @blur="$v.form.isStaff.$touch()"
                      >
                        <template v-slot:label>
                          <div>is Staff?</div>
                        </template>
                        <v-radio :value="isStaff.yes">
                          <template v-slot:label>
                            <div>Yes</div>
                          </template>
                        </v-radio>
                        <v-radio :value="isStaff.no">
                          <template v-slot:label>
                            <div>NO</div>
                          </template>
                        </v-radio>
                      </v-radio-group>
                    </div>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      class="mt-0 pt-0"

                  >
                    <div class="create__user">
                      <v-radio-group
                          :error-messages="fieldErrors('form.isActive')"
                          @input="$v.form.isActive.$touch()"
                          @blur="$v.form.isActive.$touch()"
                          v-model="form.isActive">
                        <template v-slot:label>
                          <div>is Active?</div>
                        </template>
                        <v-radio :value="isActive.active">
                          <template v-slot:label>
                            <div>Yes</div>
                          </template>
                        </v-radio>
                        <v-radio :value="isActive.notActive">
                          <template v-slot:label>
                            <div>NO</div>
                          </template>
                        </v-radio>
                      </v-radio-group>
                    </div>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="6"
                  >
                    <v-text-field
                        :error-messages="fieldErrors('form.password')"
                        :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPwd ? 'text' : 'password'"
                        @input="$v.form.password.$touch()"
                        @blur="$v.form.password.$touch()"
                        prepend-inner-icon="lock"
                        v-model="form.password"
                        label="Password"
                        @click:append="showPwd = !showPwd"
                        outlined

                    />
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="6"
                  >
                    <v-text-field
                        type="password"
                        label="Confirm Password"
                        v-model="form.repeatPassword"
                        :error-messages="fieldErrors('form.repeatPassword')"
                        @input="$v.form.repeatPassword.$touch()"
                        @blur="$v.form.repeatPassword.$touch()"
                        prepend-inner-icon="enhanced_encryption"
                        required
                        outlined
                    ></v-text-field>
                  </v-col>
                </v-row>

              </v-container>
              <small class="create__user__indicates">*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <div class="create__dialog__close">
                <v-btn

                    @click="dialogCreateSubmit"


                >
                  Close
                </v-btn>
              </div>

              <div class="create__dialog__save">
                <v-btn
                    block
                    type="submit" :disabled="checking"
                >
                  Save
                </v-btn>
              </div>

            </v-card-actions>
          </v-form>

        </v-card>
      </v-dialog>
    </template>
  </div>
</template>
<script>
import {mapGetters} from "vuex";
import {email, minLength, required, sameAs} from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";

const defaultForm =
    {

      firstName: '',
      lastName: '',
      role: '',
      email: '',
      phone: '',
      nationality: '',
      password: '',
      isStaff: '',
      isActive: '',
    };

export default {
  props: ['item'],
  mixins: [validationMixin],

  validations: {
    form: {
      password: {minLength: minLength(6)},
      repeatPassword: {
        sameAsPassword: sameAs("password"),
      },
      firstName: {required},
      lastName: {required},
      role: {required},
      email: {required, email},
      phone: {required},
      nationality: {required},
      isStaff: {required},
      isActive: {required},
    },
  },
  validationMessages: {
    form: {
      email: {
        required: "Please enter email",
        email: "Email must be valid",
      },
      firstName: {
        required: "Please enter first name",
      },
      lastName: {
        required: "Please enter last name",
      },
      phone: {
        required: "Please enter phone number",
      },
      role: {
        required: "Please select a role",
      },
      nationality: {
        required: "Please enter nationality",
      },
      password: {
        minLength: "Password must be of 6 characters",
      },
      isActive: {
        required: "Please select one",
      },
      isStaff: {
        required: "Please select one",
      },
      repeatPassword: {
        sameAsPassword: "Password does not match",
      },
    },
  },
  data: () =>
      ({
        isActive: {
          active: 1,
          notActive: 0,
        },
        isStaff:
            {
              yes: 1,
              no: 0,
            },
        validPhoneError: {
          condition: false,
          message: 'Input Phone Number is Invalid'
        },
        dialogCreate: false,
        showPwd: false,
        form: Object.assign({}, defaultForm),
        country: 'AU',
        countryName: true,
        myPhone: '',
        phone: {
          number: '',
          valid: false,
          country: undefined,
        },
        errorShowEmail: true,
        errorShowPhone: true,
        itemLength: 0,
        setItem: '',
      }),


  watch: {
    getDialogCloseEdit(newValue) {
      if (newValue == 1) {
        this.dialogCreate = false;
        this.dialogCreate = false;
        this.form = Object.assign({}, defaultForm);

      }
    }
  },

  computed: {
    ...mapGetters("authorization", [
      "showRoles",
      "getDialogCloseEdit",
      "getEditErrorMessage",

    ]),
    checking() {
      if (this.$v.$invalid == false && this.phone.valid == true) {
        return false;
      } else {
        return true;
      }
    },
  }
  ,
  methods: {
    checkingShowErrorPhone() {
      this.errorShowPhone = false;
    },
    setPreviousData() {
      this.errorShowPhone = false;
      console.log(this.errorShowPhone);
      this.setItem = Object.assign({}, this.item);
      this.duplicateSetPreviousData(this.setItem)
    },
    duplicateSetPreviousData(editUserData) {
      this.itemLength = editUserData.name.split(' ').length;
      editUserData.firstName = editUserData.name.split(' ').slice(0, 1).join(' ');
      editUserData.lastName = editUserData.name.split(' ').slice(1, this.itemLength).join(' ');
      if (editUserData.nationality != null) {
        editUserData.nationality = editUserData.nationality.nationality;
      }

      this.form = editUserData;
    },
    onEmailInput() {
      this.$v.form.email.$touch()
      this.errorShowEmail = false;
    },

    dialogCreateSubmit() {
      this.dialogCreate = false;

    }

    ,
    onInput(formattedNumber, {number, valid, country}) {
      this.$v.form.phone.$touch()
      this.phone.number = number.international;
      this.phone.valid = valid;
      this.phone.country = country && country.name;
      if (this.phone.valid == false) {
        this.validPhoneError.condition = true;
      } else {
        this.validPhoneError.condition = false;
      }

    },

    submit() {

      this.form.phone = this.phone.number;
      this.errorShowEmail = true;
      this.errorShowPhone = true;
      this.$store.dispatch('authorization/editUsers', this.form)


    }
  }
}
</script>