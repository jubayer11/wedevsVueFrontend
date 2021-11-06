<template>
  <div class="vuse-content-wrapper">
    <v-container>
      <v-card class="neu-glow-inset px-12 py-12">
        <v-card class="neu-glow-primary with-radius ma-12 px-4"   :key="card.id"
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
            <v-col cols="12" md="1">
              $120
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
            <v-col cols="12" md="3">
              <v-btn small color="red">
                <v-icon small>
                  delete
                </v-icon>
              </v-btn>
            </v-col>

          </v-row>
        </v-card>

        <v-row align="center" justify="center">
          <v-btn large class="primary">
            CHECKOUT
          </v-btn>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    cards: [
      {title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 4},
      {title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 4},
      {title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 4},
    ],
  }),
}
</script>