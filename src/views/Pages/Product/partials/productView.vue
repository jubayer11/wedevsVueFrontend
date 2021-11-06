<template>
  <div class="vuse-content-wrapper">
    <v-container>
      <v-card class="neu-glow-inset py-12" style="min-height: 80vh">
        <v-row class="px-12 py-12">
          <v-col cols="12" md="4">
            <v-card elevation="1" class="mx-auto px-6 py-6">
              <v-img
                  height="400"
                  src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                  max-width="600"
              ></v-img>
            </v-card>
          </v-col>
          <v-col cols="12" md="8" >
            <v-card class="neu-glow-inset product__information">
              <div class="ml-4">
                <div class="my-3  product__name">jubayer ahmed</div>
                <div>$200</div>
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

                <v-row>
                  <v-btn
                      tile
                      color="success"
                      class="ml-3"
                  >
                    <v-icon left>
                      fa-shopping-cart
                    </v-icon>
                    ADD to cart
                  </v-btn>
                  <v-btn
                      tile
                      color="orange"
                      class="ml-4"
                  >
                    <v-icon left>
                      fa-eye
                    </v-icon>
                    View Product
                  </v-btn>
                </v-row>

              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-card class="product__description">
          <v-card-text align="center" justify="center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, ad cumque ducimus error eveniet fuga
            inventore, iusto libero modi non perspiciatis porro quasi quo rerum saepe sapiente voluptatum. Nihil,
            non?
          </v-card-text>
        </v-card>
      </v-card>
    </v-container>
  </div>

</template>
