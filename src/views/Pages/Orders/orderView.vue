<template>
  <div class="vuse-content-wrapper">
    <v-container>
      <v-card class="neu-glow-inset px-2 py-2">
        <v-card class="neu-glow-primary with-radius ma-12 px-4" :key="product.id"
                v-for="(product,index)  in showOrderView"
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
            <v-col cols="12" md="2">
              Total Price: ${{ parseFloat(parseFloat(product.price) * parseInt(product.customerQuantity)) }}
            </v-col>
            <v-col cols="12" md="3">
              <v-row v-if="view==1">
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
              <v-row v-if="view==2">
                <div class="product__quantity">Quantity:</div>
                <div class="product__quantity">{{ product.customerQuantity }}</div>
              </v-row>
            </v-col>

            <v-col v-if="view==1" cols="12" md="1">
              <v-btn @click="detachOrderProduct(product)" small color="red">
                <v-icon small>
                  delete
                </v-icon>
              </v-btn>
            </v-col>

          </v-row>
        </v-card>
        <v-card class="neu-glow-primary with-radius ma-12 py-10">
          <v-row justify="center" align="center">
            <div class="checkout__price">Total: ${{ this.$store.state.orders.orders.totalPrice }}</div>
          </v-row>
        </v-card>
        <v-row align="center" justify="center">
          <v-btn v-if="view==1" @click="saveOrder" large class="primary">
            Submit
          </v-btn>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import axios from "axios";

export default {

  data: () => ({
    url: axios.defaults.baseURL,
    userId: '',
    oderId: '',
    view: '',
  }),
  created() {
    this.orderId = this.$route.params.id;
    this.getOrderView({id: this.orderId});
    this.view = this.$route.params.view;
  },
  computed: {
    ...mapGetters("orders", [
      "showOrderView",
    ]),
  },
  methods: {
    ...mapActions("orders", [
      "getOrderView",

    ]),
    saveOrder() {
      this.$store.dispatch('orders/saveUpdatedOrder')
    },
    quantityChange(index, value) {
      if (value == 1) {
        this.showOrderView[index].customerQuantity += 1;
        this.showOrderView[index].quantity -= 1;
        this.showOrderView[index].decrement = false;
        this.$store.state.orders.orders.totalPrice += parseInt(this.showOrderView[index].price);
      } else {

        this.showOrderView[index].customerQuantity -= 1;
        this.showOrderView[index].quantity += 1;
        this.showOrderView[index].increment = false;
        this.$store.state.orders.orders.totalPrice -= parseInt(this.showOrderView[index].price);
      }

      if (this.showOrderView[index].quantity == 0) {
        this.showOrderView[index].increment = true;
      } else if (this.showOrderView[index].customerQuantity == 0) {
        this.showOrderView[index].decrement = true;
      }
    },
    detachOrderProduct(product) {
      this.$store.dispatch('orders/detachOrderProduct', {product: product})
    },
  },
}
</script>
<style scoped>
.checkout__price {
  font-size: 30px;
  color: orange;
  font-weight: bolder;
}

.orderView__head {
  font-size: 20px;
  color: orangered;
  font-weight: bolder;
}

</style>