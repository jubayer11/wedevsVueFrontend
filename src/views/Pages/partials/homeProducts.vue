<template>
  <div>
    <v-row class="neu-glow-primary with-radius ma-12" align="center"
           justify="center">
      <h1 class="pa-6 home__products__header">
        Products
      </h1>
    </v-row>
    <v-card
        class="mx-auto neu-glow-inset px-12 py-12"

    >

      <v-row dense>
        <v-col
            :key="card.id"
            v-for="card in cards"
            class="px-4"
            cols="12"
            :md="card.flex"
        >
          <v-card>
            <v-img

                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
                :src="card.src"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>

            <div class="ml-4">
              <div class="my-3">jubayer ahmed</div>
              <div>$200</div>
            </div>
            <v-card-actions>
              <v-btn
                  tile
                  color="success"
              >
                <v-icon left>
                  fa-shopping-cart
                </v-icon>
                ADD to cart
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                  tile
                  color="orange"
              >
                <v-icon left>
                  fa-eye
                </v-icon>
                View Product
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

    </v-card>
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