<template>
  <div class="vuse-content-wrapper">
    <v-container>
      <v-card class="neu-glow-inset px-12 py-12">
        <v-card class="neu-glow-primary with-radius ma-12 px-4" :key="product.id"
                v-for="(product,index) in showCartProduct"
        >
          <v-row justify="center" align="center">
            <v-col cols="12" md="3">
              <v-img
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                  :src="url+'/uploads/products/'+product.image"

              >
                <v-card-title class="product__inStock" v-if="product.quantity>0"> In Stock</v-card-title>
                <v-card-title v-else class="product__outStock"> Out Of Stock</v-card-title>
              </v-img>
            </v-col>
            <v-col cols="12" md="2">
              {{ product.name }}
            </v-col>
            <v-col cols="12" md="1">
              ${{ product.price }}
            </v-col>
            <v-col cols="12" md="3">
              <v-row>
                <div class="product__quantity">Quantity:</div>
                <v-btn @click="quantityChange(index,1)" :disabled="product.increment" class="product__quantity" small>
                  <v-icon small>fa-plus</v-icon>
                </v-btn>
                <div class="product__quantity">{{ product.customerQuantity }}</div>
                <v-btn @click="quantityChange(index,2)" :disabled="product.decrement" class="product__quantity" small>
                  <v-icon small>fa-minus</v-icon>
                </v-btn>

                <div class="product__quantity ">only {{ product.quantity }} items left</div>
              </v-row>
            </v-col>
            <v-col cols="12" md="3">
              <v-btn @click="detachCartProduct(product)" small color="red">
                <v-icon small>
                  delete
                </v-icon>
              </v-btn>
            </v-col>

          </v-row>
        </v-card>

        <v-row align="center" justify="center">
          <v-btn @click="checkOutCart" large class="primary">
            CHECKOUT
          </v-btn>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import {mapGetters} from "vuex";
import axios from "axios";

export default {
  data: () => ({
    url: axios.defaults.baseURL,
    userId: '',
  }),
  created() {
    this.getCartProduct();
  },
  computed: {
    ...
        mapGetters("carts", [
          "showCartProduct",
        ]),
  },
  methods: {
    checkOutCart() {
      this.$store.dispatch('carts/viewCheckOut')
    },
    getCartProduct() {
      this.userId = localStorage.getItem('userId');
      this.$store.dispatch('carts/getCartProduct', {userId: this.userId})
    },
    detachCartProduct(product) {
      this.$store.dispatch('carts/detachCartProduct', {product: product})
    },
    quantityChange(index, value) {
      if (value == 1) {
        this.showCartProduct[index].customerQuantity += 1;
        this.showCartProduct[index].quantity -= 1;
        this.showCartProduct[index].decrement = false;
      } else {

        this.showCartProduct[index].customerQuantity -= 1;
        this.showCartProduct[index].quantity += 1;
        this.showCartProduct[index].increment = false;
      }

      if (this.showCartProduct[index].quantity == 0) {
        this.showCartProduct[index].increment = true;
      } else if (this.showCartProduct[index].customerQuantity == 0) {
        this.showCartProduct[index].decrement = true;
      }
    },
  }
}
</script>