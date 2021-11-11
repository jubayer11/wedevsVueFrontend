<template>
  <div class="vuse-content-wrapper">
    <v-container>
      <v-card class="neu-glow-inset px-12 py-12">
        <v-card class="neu-glow-primary with-radius ma-12 px-4" :key="product.id"
                v-for="product in showCartProduct"
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
            <v-col cols="12" md="3">
              {{ product.name }}
            </v-col>
            <v-col cols="12" md="2">
              Total Price: ${{ parseFloat(parseFloat(product.price) * parseInt(product.customerQuantity)) }}
            </v-col>
            <v-col cols="12" md="2">

              <div class="product__quantity">Quantity: {{ product.customerQuantity }}</div>
            </v-col>
            <v-col cols="12" md="2">
              <v-btn @click="detachCartProduct(product)" small color="red">
                <v-icon small>
                  delete
                </v-icon>
              </v-btn>
            </v-col>

          </v-row>
        </v-card>
        <v-card class="neu-glow-primary with-radius ma-12 py-10">
          <v-row justify="center" align="center">
            <div class="checkout__price">Total: ${{ this.$store.state.carts.carts.totalPrice }}</div>
          </v-row>
        </v-card>

        <v-card class="px-6 py-6">
          <v-textarea
              outlined
              name="input-7-4"
              label="Address"
              v-model="address"
          ></v-textarea>
        </v-card>

        <v-row class="mt-12" align="center" justify="center">
          <v-btn @click="orderProduct" large class="primary">
            Order
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
    address: '',
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
    getCartProduct() {
      this.userId = localStorage.getItem('userId');
      this.$store.dispatch('carts/getCartProduct', {userId: this.userId})
    },
    detachCartProduct(product) {
      this.$store.dispatch('carts/detachCartProduct', {product: product})
    },
    orderProduct() {
      this.userId = localStorage.getItem('userId');
      this.$store.dispatch('orders/orderProduct', {data: this.showCartProduct, userId: this.userId,address:this.address})
    }
  },
}
</script>
<style scoped>
.checkout__price {
  font-size: 30px;
  color: orange;
  font-weight: bolder;
}

</style>