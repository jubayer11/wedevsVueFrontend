<template>
  <div class="vuse-content-wrapper mx-6 my-10">
    <v-container>
      <v-card class="neu-glow-primary mx-6 my-6">
        <v-row class="px-12 py-12">
          <v-col cols="12" md="4">
            <v-text-field
                label="Search By Name"
                filled
                shaped
                v-model="searchProduct"
            ></v-text-field>
          </v-col>
          <v-col class="mt-sm-3" cols="12" md="2">
            <v-btn @click="searchProductProduct" class="primary">Search</v-btn>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
                shaped
                :items="sort"
                filled
                item-text="data"
                item-value="id"
                label="Sort By Price"
                v-model="productSort"
            ></v-select>

          </v-col>
          <v-col class="mt-sm-3" cols="12" md="2">
            <v-btn class="primary" @click="searchProductProduct">Sort</v-btn>
          </v-col>
        </v-row>
      </v-card>
      <v-card class="neu-glow-inset py-3" style="min-height: 80vh">
        <v-row dense>
          <v-col
              :key="product.id"
              v-for="product in showProductProducts"
              class="px-4"
              cols="12"
              md="4"

          >
            <v-card>
              <v-img
                  height="200px"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  :src="url+'/uploads/products/'+product.image"
              >
                <v-card-title class="product__inStock" v-if="product.quantity>0"> In Stock</v-card-title>
                <v-card-title v-else class="product__outStock"> Out Of Stock</v-card-title>
              </v-img>

              <div class="ml-4">
                <div class="my-3">{{ product.name }}</div>
                <div>${{ product.price }}</div>
              </div>
              <v-card-actions>
                <v-btn
                    tile
                    color="success"
                    @click="addToCart(product.id)"
                >
                  <v-icon left>
                    fa-shopping-cart
                  </v-icon>
                  ADD to cart
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    tile
                    color="orange"
                    @click="viewProduct(product)"
                >
                  <v-icon left>
                    fa-eye
                  </v-icon>
                  View Product
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card>

      <div class="text-center my-6">
        <v-pagination
            v-model="page"
            :length="getPaginationLast"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            :total-visible="7"
        ></v-pagination>
      </div>
    </v-container>
  </div>
</template>
<script>
import {mapGetters} from "vuex";
import axios from "axios";

export default {
  data: () => ({
        url: axios.defaults.baseURL,
        sort: [{
          id: 1,
          data: 'price low to high',
        },
          {
            id: 2,
            data: 'price high to low',
          },
        ],
        page: 1,
        searchProduct: ' ',
        productSort: 0,
        userId: '',
      }

  ),
  created() {
    this.pullProductProducts();
  },
  watch: {
    page() {
      this.pullProductProducts();
    },
  },

  computed: {
    ...
        mapGetters("products", [
          "showProductProducts",
          "getPaginationLast",
        ]),
  }
  ,
  methods: {
    addToCart(id) {
      this.userId = localStorage.getItem('userId');
      this.$store.dispatch('carts/addToCart', {productId: id, userId: this.userId, quantity: 0})
    },
    viewProduct(product) {
      this.$store.dispatch('products/viewProduct', {product: product})
    },
    pullProductProducts() {
      this.$store.dispatch('products/pullProductProducts', {
        searchProduct: this.searchProduct,
        page: this.page,
        sort: this.productSort
      })
    },
    searchProductProduct() {
      this.page = 1;
      this.pullProductProducts();
    },
  },

}
</script>