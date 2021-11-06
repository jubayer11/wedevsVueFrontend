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
            <span class="headline create__user__headline">Edit Role</span>
          </v-card-title>
          <v-form
              @submit.prevent="$v.$invalid ? null : submit()"
              ref="form"
          >
            <v-card-text>
              <v-container>



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
                <div class="create__user">
                  <v-radio-group
                      v-model="form.isActive"
                      :error-messages="fieldErrors('form.isActive')"
                      @input="$v.form.isActive.$touch()"
                      @blur="$v.form.isActive.$touch()"
                  >
                    <template v-slot:label>
                      <div>Is Active?*</div>
                    </template>
                    <v-radio :value=isActive.yes>
                      <template v-slot:label>
                        <div>yes</div>
                      </template>
                    </v-radio>
                    <v-radio :value=isActive.no>
                      <template v-slot:label>
                        <div>no</div>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </div>



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

      label: '',
      isActive:'',
    };

export default {
  props: ['item'],
  mixins: [validationMixin],
  validations: {
    form: {
      label: {required},
      isActive: {required},

    },
  },
  validationMessages: {
    form: {

      label: {
        required: 'please enter the label'
      },
      isActive: {
        required: 'please select one'
      },
    },
  },
  data: () =>
      ({

        isActive: {
          yes: 1,
          no: 0,
        },
        dialogCreate: false,
        form: Object.assign({}, defaultForm),
        setItem: '',
        editRoleData: {},
      }),


  watch: {
    getDialogRoleEditClose(newValue) {
      if (newValue == 1) {
        this.dialogCreate = false;
        this.form = Object.assign({}, defaultForm);

      }
    }
  },

  computed: {
    ...mapGetters("authorization", [
      "getDialogRoleEditClose",
      "getRoleEditErrorMessage",

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
    setPreviousData() {
      this.setItem = Object.assign({}, this.item);
      this.duplicateSetPreviousData(this.setItem)
    },
    duplicateSetPreviousData(editRoleData) {
      this.editRoleData.isActive = editRoleData.isActive;
      this.editRoleData.label = editRoleData.label;
      this.editRoleData.id = editRoleData.id;
      this.form = Object.assign({}, this.editRoleData);
    },


    dialogCreateSubmit() {
      this.dialogCreate = false;

    },


    submit() {
      this.$store.dispatch('authorization/editRole', this.form)


    }
  }
}
</script>