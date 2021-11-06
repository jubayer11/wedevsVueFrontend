<template>
  <div>
    <template>
      <v-dialog
          v-model="dialogCreate"
          persistent
          max-width="600px"
      >
        <template v-slot:activator="{ on, attrs }">

          <div class="newUser">
            <v-btn
                class="button__border fab__button hidden-xs-only"
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
            >
              New Role
            </v-btn>

             <v-btn
                class="button__border  hidden-sm-and-up"
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                fab
            >
              <v-icon dark>
                 mdi-plus
             </v-icon>
            </v-btn>
          </div>

        </template>
        <v-card>
          <v-card-title>
            <span class="headline create__user__headline">Create Role</span>
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
                          :error-messages="fieldErrors('form.name')"
                          @input="$v.form.name.$touch()"
                          @blur="$v.form.name.$touch()"
                          v-model="form.name"
                          label="Name*"
                          placeholder="Enter role Name"
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
                          :error-messages="fieldErrors('form.label')"
                          @input="$v.form.label.$touch()"
                          @blur="$v.form.label.$touch()"
                          v-model="form.label"
                          label="Label*"
                          placeholder="Enter role label"
                          outlined
                          dense
                      ></v-text-field>
                    </div>

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
import {required} from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";

const defaultForm =
    {
      name: '',
      label: '',
    }

export default {
  mixins: [validationMixin],
  validations: {
    form: {
      name: {required},
      label: {required},
    },
  },
  validationMessages: {
    form: {
      name: {
        required: "Please enter the role name"
      },
      label: {
        required: 'please enter the label'
      }

    },
  },
  data: () =>
      ({

        dialogCreate: false,

        isActive: {
          active: 1,
          notActive: 0,
        },

        form: Object.assign({}, defaultForm),

      }),

  watch: {
    getDialogRoleCreateClose(newValue) {
      if (newValue == 1) {
        this.dialogCreate = false;
        this.form = Object.assign({}, defaultForm);
        this.$refs.form.reset();
        this.$v.$reset();
      }
    }
  },
  computed: {
    ...mapGetters("authorization", [
        "getDialogRoleCreateClose",
      "getRoleErrorMessage",


    ]),
    checking() {
      if (this.$v.$invalid == false) {
        return false;
      } else {
        return true;
      }
    },
  }
  ,
  methods: {


    dialogCreateSubmit() {
      this.dialogCreate = false;

    },


    submit() {


      this.$store.dispatch('authorization/createRole', this.form)


    }
  }
}
</script>