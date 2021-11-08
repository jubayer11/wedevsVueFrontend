<template>
  <div class="vuse-content-wrapper">
    <v-container>
      <v-card class="neu-glow-inset py-12" style="min-height: 80vh">
        <v-row class="px-12 py-12">
          <v-col cols="12" md="4">
            <v-card elevation="1" class="mx-auto px-6 py-6">
              <v-img
                  height="400"
                  :src="url+'/uploads/products/'+showViewProduct.image"
                  max-width="600"
              ></v-img>
            </v-card>
          </v-col>
          <v-col cols="12" md="8" >
            <v-card class="neu-glow-inset product__information">
              <div class="ml-4">
                <div class="my-3  product__name">{{ showViewProduct.name }}</div>
                <div>${{ showViewProduct.price }}</div>
                <v-row>
                  <div class="product__quantity">Quantity:</div>
                  <v-btn @click="quantityChange(1)" :disabled="increment" class="product__quantity" small>
                    <v-icon small>fa-plus</v-icon>
                  </v-btn>
                  <div class="product__quantity">{{ selectedQuantity }}</div>
                  <v-btn @click="quantityChange(2)" :disabled="decrement" class="product__quantity" small>
                    <v-icon small>fa-minus</v-icon>
                  </v-btn>

                  <div class="product__quantity ">only {{ showViewProduct.quantity }} items left</div>
                </v-row>

                <v-row>
                  <v-btn
                      tile
                      color="success"
                      class="ml-3"
                      @click="addToCart"
                  >
                    <v-icon left>
                      fa-shopping-cart
                    </v-icon>
                    ADD to cart
                  </v-btn>
                </v-row>

              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-card class="product__description">
          <v-card-text align="center" justify="center">
            {{ showViewProduct.description }}
          </v-card-text>
        </v-card>
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
        selectedQuantity: 0,
        increment: false,
        decrement: false,
        userId: '',
      }

  ),
  created() {
    this.pullViewProduct();
    this.decrement = true;
    if (this.showViewProduct.quantity == 0) {
      this.increment = true;
    }
  },


  computed: {
    ...
        mapGetters("products", [
          "showViewProduct",
        ]),
  },
  watch: {
    selectedQuantity(newValue) {
      if (this.showViewProduct.quantity == 0) {
        this.increment = true;
      } else if (newValue == 0) {
        this.decrement = true;
      }
    }
  },
  methods: {
    pullViewProduct() {
      this.$store.dispatch('products/pullViewProduct', {id: this.$route.params.id})
    },
    quantityChange(value) {
      if (value == 1) {
        this.selectedQuantity += 1;
        this.showViewProduct.quantity -= 1;
        this.decrement = false;
      } else {

        this.selectedQuantity -= 1;
        this.showViewProduct.quantity += 1;
        this.increment = false;
      }
    },
    addToCart() {
      this.userId = localStorage.getItem('userId');
      this.$store.dispatch('carts/addToCart', {productId: this.$route.params.id,userId:this.userId,quantity:this.selectedQuantity})
    },
  },

}
</script>