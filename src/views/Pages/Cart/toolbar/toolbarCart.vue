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

      }

  ),
  computed: {
    ...
        mapGetters("carts", [
          "getCartCount",
        ]),
  },
}
</script>
