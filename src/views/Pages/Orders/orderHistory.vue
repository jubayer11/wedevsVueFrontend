<template>
  <div class="vuse-content-wrapper">
    <v-container>
      <v-card v-for="(product,index) in showOrderHistory" :key="index" class="neu-glow-inset px-2 py-2">
        <div v-if="product.method=='updated'" class=" ma-12 px-4">Order Edited: {{ product.createdAt }}</div>
        <div v-if="product.method=='deleted'" class=" ma-12 px-4">Order Deleted: {{ product.createdAt }}</div>
        <v-card class="neu-glow-primary with-radius ma-12 px-4">
          <v-row justify="center" align="center">
            <v-col cols="12" md="3">
              <v-img

                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="50px"
                  width="50"
                  :src="url+'/uploads/products/'+product.productImage"
              >
              </v-img>
            </v-col>
            <v-col cols="12" md="3">
              {{ product.productName }}
            </v-col>
            <v-col v-if="product.method=='updated'" cols="12" md="4">
              product quantity has changed from {{ product.oldQuantity }} to {{ product.newQuantity }}
            </v-col>
            <v-col v-if="product.method=='deleted'" cols="12" md="4">
              this product has deleted from the order
            </v-col>
          </v-row>
        </v-card>
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

  }),
  created() {

    this.orderId = this.$route.params.id;
    this.getOrderHistory({id: this.orderId});
  },
  computed: {
    ...mapGetters("orders", [
      "showOrderHistory",
    ]),
  },
  methods: {
    ...mapActions("orders", [
      "getOrderHistory",

    ]),
  },

}
</script>
