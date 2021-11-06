<template>
  <div class="vuse-content-wrapper">
    <v-container>
      <orderHistory class="mb-6"></orderHistory>
      <v-card class="neu-glow-inset px-2 py-2">
        <v-row class=" ma-12 px-4">
          <div class="orderView__head">Order Date: 25th january 2021</div>
          <v-spacer>
          </v-spacer>
          <div class="orderView__head">order Status: shipped</div>
        </v-row>
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
            <v-col cols="12" md="2">
              jubayer ahmed
            </v-col>
            <v-col cols="12" md="2">
              Total Price: $120
            </v-col>
            <v-col cols="12" md="3">
              <v-row>
                <div class="product__quantity">Quantity:</div>
                <v-btn class="product__quantity" small>
                  <v-icon small>fa-plus</v-icon>
                </v-btn>
                <div class="product__quantity">2</div>
                <v-btn class="product__quantity" small>
                  <v-icon small>fa-minus</v-icon>
                </v-btn>

                <div class="product__quantity ">only 1 items left</div>
              </v-row>
            </v-col>
            <v-col cols="12" md="1">
              <v-btn small color="red">
                <v-icon small>
                  delete
                </v-icon>
              </v-btn>
            </v-col>

          </v-row>
        </v-card>
        <v-card class="neu-glow-primary with-radius ma-12 py-10">
          <v-row justify="center" align="center">
            <div class="checkout__price">Total: $540</div>
          </v-row>
        </v-card>
      </v-card>
    </v-container>
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

.orderView__head {
  font-size: 20px;
  color: orangered;
  font-weight: bolder;
}

</style>