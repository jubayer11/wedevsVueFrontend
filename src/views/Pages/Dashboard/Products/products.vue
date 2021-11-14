<template>
  <div class="vuse-content-wrapper">
    <v-container fluid>
      <v-card v-if="showProducts !=''" class="neu-glow-inset with-radius pa-5">
        <v-data-table
            :headers="headers"
            class="elevation-2 pt-6"
            :items="showProducts"
            item-key="name"
            :search="search"
        >

          <template v-slot:top>
            <v-row class="px-4" align="center" justify="center">
              <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify "
                  label="Search"
                  outlined
                  dense
                  single-line
                  class="shrink"

              ></v-text-field>

            </v-row>
            <v-toolbar
                flat
            >
              <v-toolbar-title>Products</v-toolbar-title>


              <v-divider
                  class="mx-4"
                  inset
                  vertical
              ></v-divider>


              <v-spacer></v-spacer>
              <createProduct></createProduct>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <div class="display__flex">
              <editProduct :item="item"></editProduct>

              <delete-product :item="item"></delete-product>
            </div>
          </template>
          <template v-slot:item.image="{ item }">
            <v-img gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                   max-height="100" max-width="100" :src="url+'/uploads/products/'+item.image">

            </v-img>
          </template>
          <template v-slot:item.price="{ item }">
           ${{item.price}}
          </template>
          <template v-slot:item.description="{ item }">
            <div class="display__flex">
              <viewDescription :item="item"></viewDescription>
            </div>
          </template>
        </v-data-table>
      </v-card>
      <noRecord v-else></noRecord>
    </v-container>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import createProduct from "./CRUD/createProduct";
import editProduct from "./CRUD/editProduct";
import deleteProduct from "./CRUD/deleteProduct";
import viewDescription from "./CRUD/viewDescription"
import axios from "axios";
import noRecord from "../../../Pages/noRecord/noReccordd";
export default {
  components: {createProduct, viewDescription,editProduct,deleteProduct,noRecord},
  data: () => ({
        fetchUsers: 'allUsers',
        search: '',
        dialogDelete: false,
        url: axios.defaults.baseURL,
        headers: [
          {
            align: 'start',
            text: 'Image',
            value: 'image',
          },
          {
            text: 'Name',
            value: 'name',
          },
          {text: 'uniqueId', value: 'uniqueId'},
          {text: 'Price', value: 'price'},
          {text: 'Quantity', value: 'quantity'},
          {text: 'description', value: 'description'},
          {text: 'Actions', value: 'actions', sortable: false},
        ],
      }
  ),


  computed: {
    ...mapGetters("products", [
      "showProducts",
    ]),
  },


  created() {
    this.getProducts();
  },


  methods: {
    ...mapActions("products", [
      "getProducts",
    ]),
  },
}
</script>
<style scoped>
.display__flex {
  display: flex !important;
}
</style>