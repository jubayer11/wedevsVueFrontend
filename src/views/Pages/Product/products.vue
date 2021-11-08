<template>
  <div class="vuse-content-wrapper mx-6 my-10">
    <v-container>
      <v-card class="neu-glow-primary mx-6 my-6">
        <v-row class="px-12 py-12">
          <v-col cols="12" md="4">
            <v-text-field
                v-model="last"
                label="Search By Name"
                filled
                shaped

            ></v-text-field>
          </v-col>
          <v-col class="mt-sm-3" cols="12" md="2">
            <v-btn class="primary">Search</v-btn>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
                shaped
                :items="sort"
                filled
                item-text="data"
                item-value="id"
                label="Sort"
            ></v-select>

          </v-col>
          <v-col class="mt-sm-3" cols="12" md="2">
            <v-btn class="primary">Sort</v-btn>
          </v-col>
        </v-row>
      </v-card>
      <v-card class="neu-glow-inset py-3" style="min-height: 80vh">
        <v-row dense>
          <v-col
              :key="card.id"
              v-for="card in cards"
              class="px-4"
          >
            <v-card>
              <v-img

                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
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

      <div class="text-center my-6">
        <v-pagination
            v-model="page"
            :length="4"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"

        ></v-pagination>
      </div>
    </v-container>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data: () => ({
        sort: [{
          id: 1,
          data: 'price low to high',
        },
          {
            id: 2,
            data: 'price high to low',
          },
        ],
        cards: [
          {title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 4},
          {title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 4},
          {title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 4},
          {title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 4},
          {title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 4},
          {title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 4},
          {title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 4},
          {title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 4},
          {title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 4},
          {title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 4},
          {title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 4},
          {title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 4},
        ],
        page: 1,
      }

  ),
  created() {
    this.pullProductProducts();
  },
  computed: {
    ...mapGetters("products", [
      "showProductProducts",
    ]),
  },
  methods: {
    ...mapActions("products", [
      "pullProductProducts",
    ]),
  },
}
</script>