<template>
  <div>
    <v-row class="neu-glow-primary with-radius ma-12" align="center"
           justify="center">
      <h1 class="pa-6 home__products__header">
        Products
      </h1>
    </v-row>
    <v-card
        class="mx-auto neu-glow-inset px-12 py-12"

    >

      <v-row dense>
        <v-col
            :key="product.id"
            v-for="product in showHomeProducts"
            class="px-4"
            cols="12"
            md="4"
        >
          <v-card>
            <v-img

                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
                :src="url+'/uploads/products/'+product.image"
            >
              <v-card-title class="product__inStock" v-if="product.quantity>0" > In Stock</v-card-title>
              <v-card-title v-else class="product__outStock" > Out Of Stock</v-card-title>

            </v-img>

            <div class="ml-4">
              <div class="my-3">{{product.name}}</div>
              <div>${{product.price}}</div>
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
  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import axios from "axios";

export default {
  data: () => ({
    url: axios.defaults.baseURL,
    userId: '',
  }),
  created() {
    this.pullHomeProducts();
  },
  computed: {
    ...mapGetters("products", [
      "showHomeProducts",
    ]),
  },
  methods: {
    ...mapActions("products", [
      "pullHomeProducts",
    ]),
    viewProduct(product) {
      this.$store.dispatch('products/viewProduct', {product: product})
    },
    addToCart(id) {
      this.userId = localStorage.getItem('userId');
      this.$store.dispatch('carts/addToCart', {productId: id,userId:this.userId,quantity:0})
    },
  },
}
</script>