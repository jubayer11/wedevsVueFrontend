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
          </div>

        </template>
        <v-card>
          <v-card-title>
            <span class="headline create__user__headline">Edit Order</span>
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
                      sm="12"
                      md="12"
                  >
                    <div class="create__user">
                      <v-select
                          :items="items"
                          :error-messages="fieldErrors('form.status')"
                          @input="$v.form.status.$touch()"
                          @blur="$v.form.status.$touch()"
                          v-model="form.status"
                          item-color="red"
                          item-text="value"
                          item-value="id"
                          label="Status*"
                          placeholder="change Status"
                          outlined
                          dense
                      ></v-select>
                    </div>

                  </v-col>
                </v-row>

              </v-container>
              <small class="create__user__indicates">*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <div class="create__dialog__close mr-3">
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
      status: 0,

    };

export default {
  props: ['item'],
  mixins: [validationMixin],
  data: () =>
      ({
        dialogCreate: false,
        form: Object.assign({}, defaultForm),
        items: [
          {id: 0, value: 'processing'},
          {id: 1, value: 'Approved'},
          {id: 2, value: 'Rejected'},
          {id: 3, value: 'Shipped'},
          {id: 4, value: 'Delivered'}



        ],
      }),
  validations: {
    form: {
      status: {required},
    },
  },
  validationMessages: {
    form: {
      status: {
        required: "Please select one",
      },
    },
  },


  watch: {
    getEditOrderDialog(newValue) {
      if (newValue == 1) {
        this.dialogCreate = false;
        this.form = Object.assign({}, defaultForm);
        this.$v.$reset();
      }
    }
  },
  computed: {
    ...mapGetters("orders", [
      "getEditOrderDialog",
    ]),
    checking() {
      if (this.$v.$invalid == false) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    setPreviousData() {
      this.form = Object.assign({}, this.item);
    },

    submit() {
      this.$store.dispatch('orders/editOrder', this.form)
    },
    dialogCreateSubmit() {
      this.dialogCreate = false;
      this.form = Object.assign({}, defaultForm);
      this.$v.$reset();
    },

  }
}
</script>