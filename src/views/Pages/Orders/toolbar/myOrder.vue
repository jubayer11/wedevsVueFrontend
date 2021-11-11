<template>
  <div>
    <v-btn
        color="primary"
        depressed
        rounded
        small
        class="mr-3"
        @click="showMyOrder"
    >
      <v-icon left small class="mr-2">
        fa-boxes
      </v-icon>
      My Orders
    </v-btn>
  </div>
</template>
<script>

export default {
  data: () => ({

      }

  ),

  methods: {
    showMyOrder() {
      this.$store.dispatch('orders/showMyOrder')
    },
  },
}
</script>
