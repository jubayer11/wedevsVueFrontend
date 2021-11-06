<template>
  <div >

      <orderHistory></orderHistory>
      <v-card class="neu-glow-inset px-2 py-2">
        <div class=" ma-12 px-4">Order Edited Date: 25th january 2021</div>
        <v-card class="neu-glow-primary with-radius ma-12 px-4" :key="card.id"
                v-for="card in cards"
        >
          <v-row justify="center" align="center">
            <v-col cols="12" md="3">
              <v-img

                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                  :src="card.src"
              >
                <v-card-title v-text="card.title"></v-card-title>
              </v-img>
            </v-col>
            <v-col cols="12" md="3">
              jubayer ahmed
            </v-col>
            <v-col cols="12" md="2">
              Total Price: $120
            </v-col>
            <v-col cols="12" md="2">

              <div class="product__quantity">Quantity:</div>
            </v-col>
          </v-row>
        </v-card>
        <v-card class="neu-glow-primary with-radius ma-12 py-10">
          <v-row justify="center" align="center">
            <div class="checkout__price">Total: $540</div>
          </v-row>
        </v-card>
      </v-card>
  </div>
</template>
<script>
import orderHistory from "./../Orders/orderHistory"

export default {
  components: {orderHistory},
  data: () => ({
    cards: [
      {title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 4},
      {title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 4},
      {title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 4},
    ],
  }),
}
</script>
<style scoped>
.checkout__price {
  font-size: 30px;
  color: orange;
  font-weight: bolder;
}

</style>