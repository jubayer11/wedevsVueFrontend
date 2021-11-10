<template>
  <div>
    <v-badge
        bordered
        color="error"
        overlap
        class="mr-3"
        :content="getCartCount"
    >

      <v-btn
          color="primary"
          depressed
          rounded
          small
          @click="showCart"
      >
        <v-icon small>
          fa-shopping-cart
        </v-icon>
      </v-btn>
    </v-badge>
  </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  data: () => ({
        userId: '',
      }

  ),
  created() {
    this.getProductCartCount();
  },
  computed: {
    ...
        mapGetters("carts", [
          "getCartCount",
        ]),
  },
  methods: {
    getProductCartCount() {
      this.userId = localStorage.getItem('userId');
      this.$store.dispatch('carts/getProductCartCount', {userId: this.userId})
    },
    showCart() {
      this.$store.dispatch('carts/viewCart')
    },
  },
}
</script>
