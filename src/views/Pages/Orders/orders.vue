<template>
  <div class="vuse-content-wrapper">
    <v-container fluid>
      <v-card class="neu-glow with-radius pa-5">
      <v-row class="px-4" align="center" justify="center">
        <v-col cols="12" md="6">
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify "
              label="Search"
              outlined
              dense
              single-line
              class="shrink"

          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
              :items="items"
              v-model="status"
              label="filter by status"
              item-text="value"
              item-value="id"
              outlined
              dense
              single-line
              class="shrink"
          ></v-select>
        </v-col>
      </v-row>
      </v-card>
      <v-card v-if="pullMyOrder!=''" class="neu-glow-inset with-radius pa-5">
        <v-data-table
            :headers="headers"
            class="elevation-2 pt-6"
            :items="pullMyOrder"
            item-key="name"
            :search="search"
        >
          <template v-slot:item.status="{ item }">

            <div v-if="item.status==0">
              Processing
            </div>
            <div v-if="item.status==1">
              Approved
            </div>
            <div v-if="item.status==2">
              Rejected
            </div>
            <div v-if="item.status==3">
              Shipped
            </div>
            <div v-if="item.status==4">
              Delivered
            </div>
          </template>
          <template v-slot:top>
            <v-toolbar
                flat
            >
              <v-toolbar-title>Orders</v-toolbar-title>


              <v-divider
                  class="mx-4"
                  inset
                  vertical
              ></v-divider>


              <v-spacer></v-spacer>

            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <div class="display__flex">
              <v-icon
                  small
                  class="mr-2"
                  @click="viewItemView(item)"
                  color="green darken-2"
              >
                remove_red_eye
              </v-icon>
              <v-icon
                  small
                  class="mr-2"
                  @click="viewItemEdit(item)"
                  color="primary"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                  small
                  class="mr-2"
                  @click="viewItemHistory(item)"
                  color="primary"
              >
                fa-history
              </v-icon>
            </div>
          </template>
        </v-data-table>
      </v-card>
      <noRecord v-else></noRecord>

    </v-container>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import noRecord from "../../Pages/noRecord/noReccordd";


export default {
  components: {noRecord},
  data: () => ({
        userId: '',
        search: '',
        status: 5,
        items: [
          {id: 5, value: 'all'},
          {id: 0, value: 'Processing'},
          {id: 1, value: 'Approved'},
          {id: 2, value: 'Rejected'},
          {id: 3, value: 'Shipped'},
          {id: 4, value: 'Delivered'}
        ],
        headers: [
          {
            align: 'start',
            text: 'Order Date',
            value: 'createdAt',
          },
          {
            text: 'Billing Address',
            value: 'billingAddress',
          },
          {
            text: 'status',
            value: 'status',
          },
          {text: 'Actions', value: 'actions', sortable: false},
        ],
      }
  ),


  watch: {
    status(newValue) {
      this.$store.commit('orders/filterOrder', {status: newValue})

    }
  },

  computed: {
    ...mapGetters("orders", [
      "pullMyOrder",

    ]),
  },


  created() {
    this.userId = localStorage.getItem('userId');
    this.getMyOrders({userId: this.userId});
  },


  methods: {
    ...mapActions("orders", [
      "getMyOrders",
    ]),
    viewItemEdit(order) {
      this.$store.dispatch('orders/viewEditOrder', {order: order})
    },
    viewItemHistory(order) {
      this.$store.dispatch('orders/viewHistoryOrder', {order: order})
    },
    viewItemView(order) {
      this.$store.dispatch('orders/viewViewOrder', {order: order})
    },
  },
}
</script>
<style scoped>
.display__flex {
  display: flex !important;
}
</style>