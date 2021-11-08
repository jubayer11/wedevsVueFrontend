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
                class="button__border hidden-xs-only"
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
            >
              New Product
            </v-btn>

            <v-btn
                class="button__border fab__button hidden-sm-and-up"
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
            <span class="headline create__user__headline">Create Product</span>
          </v-card-title>
          <v-form
              @submit.prevent="$v.$invalid ? null : submit()"
              ref="form"
          >
            <v-card-text>
              <v-container>


                <v-row>
                  <v-col cols="12" md="12" sm="12">
                    <div v-if="checkPreview==2" class="border pa-2 mt-3  createProduct__image__preview">
                      <p class="createProduct__image__preview__header">Selected Image:</p>

                      <img :src="preview" class="img-fluid createProduct__image__preview__image"/>
                      <p class="mb-0 createProduct__image__preview__fileName">file name: <span>{{ image.name }}</span>
                      </p>
                      <p class="mb-0 createProduct__image__preview__fileSize">size: <span> {{
                          image.size / 1024
                        }}KB</span></p>

                    </div>

                    <v-row>
                      <v-col cols="12" md="6" offset="3">
                        <div class="form-group">
                          <div class="createProduct__image__header">Upload Product Picture:</div>
                          <div class="createProduct__image__upload">
                            <input type="file" ref="fileupload" accept=".jpg,.jpeg,.png" @change="filechanged"
                                   class="form-control form-control-lg" placeholder="Large form control">
                          </div>
                        </div>
                        <div class="createProduct__image__error" v-if="this.errorMessage.wrong!=''">{{
                            this.errorMessage.wrong
                          }}
                        </div>
                      </v-col>
                    </v-row>

                    <br>
                    <v-progress-linear
                        v-if="progressCheck==1"
                        v-model="getImageProgressbar"
                        height="25"
                        reactive
                    >
                      <strong>{{ Math.ceil(getImageProgressbar) }}%</strong>
                    </v-progress-linear>
                  </v-col>
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
                          placeholder="enter product name"
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
                          :error-messages="fieldErrors('form.price')"
                          @input="$v.form.price.$touch()"
                          @blur="$v.form.price.$touch()"
                          v-model="form.price"
                          type="number"
                          label="Price*"
                          placeholder="Insert product price"
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
                          :error-messages="fieldErrors('form.quantity')"
                          @input="$v.form.quantity.$touch()"
                          @blur="$v.form.quantity.$touch()"
                          v-model="form.quantity"
                          label="Quantity*"
                          placeholder="insert product quantity"
                          outlined
                          dense
                          type="number"
                      ></v-text-field>
                    </div>

                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="6"
                  >
                    <div class="create__user">
                      <v-textarea
                          :error-messages="fieldErrors('form.description')"
                          @input="$v.form.description.$touch()"
                          @blur="$v.form.description.$touch()"
                          v-model="form.description"
                          label="Description*"
                          placeholder="insert product description"
                          outlined
                          dense
                      ></v-textarea>
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
      file: '',
      check: 0,
      preview: '',
      name: '',
      price: '',
      quantity: '',
      description: '',

    };

export default {
  mixins: [validationMixin],

  validations: {
    form: {
      name: {required},
      price: {required},
      quantity: {required},
      description: {required},
    },
  },
  validationMessages: {
    form: {

      name: {
        required: "Please enter product name",
      },
      price: {
        required: "Please enter product price",
      },
      quantity: {
        required: "Please enter product quantity",
      },
      description: {
        required: "Please enter product description",
      },
    },
  },
  data: () =>
      ({
        disable: true,
        getImageProgressbar: 5,
        errorMessage: {
          wrong: '',
        },
        progressCheck: 0,
        preview: null,
        image: null,
        checkPreview: 0,
        dialogCreate: false,
        form: Object.assign({}, defaultForm),
      }),

  watch: {
    getDialogClose(newValue) {
      if (newValue == 1) {
        this.progressCheck = 0;
        this.checkPreview = 0;
        this.preview = null;
        this.errorMessage.wrong = '';
        this.image = '';
        this.$refs.fileupload.value = null;
        this.dialogCreate = false;
        this.form = Object.assign({}, defaultForm);
        this.$refs.form.reset();
        this.$v.$reset();
      }
    }
  },
  computed: {
    ...mapGetters("products", [
      "getDialogClose",
    ]),
    checking() {
      if (this.$v.$invalid == false && this.disable == false) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    resetData() {
      this.progressCheck = 0;
      this.disable = true;
    },
    submit() {
      this.$store.dispatch('products/createProduct', this.form)
    },
    dialogCreateSubmit() {
      this.progressCheck = 0;
      this.dialogCreate = false;
      this.checkPreview = 0;
      this.preview = null;
      this.errorMessage.wrong = '';
      this.image = '';
      this.$refs.fileupload.value = null;
      this.form = Object.assign({}, defaultForm);
      this.$refs.form.reset();
      this.$v.$reset();
    },
    filechanged(e) {
      this.errorMessage.wrong = '';
      var input = e.target;
      if (input.files.length > 0) {
        console.log('hello honey boney')
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = null;
          this.preview = e.target.result;
        }
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
        var res = this.image.name.split(".");
        var imageType = res[1];
        if (imageType != 'jpg' && imageType != 'JPG' && imageType != 'jpeg' && imageType != 'JPEG' && imageType != 'png' && imageType != 'PNG') {
          this.disable = true;
          this.errorMessage.wrong = 'Image type must be jpg,jpeg,png';
          this.image = null;
          this.$refs.fileupload.value = '';
          this.checkPreview = 0;
        } else if (this.image.size / 1024 > 500) {
          this.disable = true;
          this.image = null;
          this.$refs.fileupload.value = '';
          this.errorMessage.wrong = 'Image size must be less than 500kb';
          this.checkPreview = 0;
        } else {
          this.checkPreview = 2;
          this.disable = false;
          this.errorMessage.wrong = '';
          var fileReader = new FileReader();
          fileReader.readAsDataURL(e.target.files[0]);
          fileReader.onload = (e) => {
            this.form.file = e.target.result

          }
        }
      } else {
        this.disable = true;
        this.errorMessage.wrong = 'Open an Image';
        this.image = null;
        this.$refs.fileupload.value = '';
        this.checkPreview = 0;
      }

    },
  }
}
</script>