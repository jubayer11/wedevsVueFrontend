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
            <v-col cols="12" md="3">
              jubayer ahmed
            </v-col>
            <v-col cols="12" md="2">
              Total Price: $120
            </v-col>
            <v-col cols="12" md="2">

                <div class="product__quantity">Quantity:</div>
            </v-col>
            <v-col cols="12" md="2">
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

        <v-card class="px-6 py-6">
          <v-textarea
              outlined
              name="input-7-4"
              label="Address"
              value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
          ></v-textarea>
        </v-card>

        <v-row class="mt-12" align="center" justify="center">
          <v-btn large class="primary">
            Order
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
<style scoped>
.checkout__price
{
  font-size: 30px;
  color: orange;
  font-weight: bolder;
}

</style>