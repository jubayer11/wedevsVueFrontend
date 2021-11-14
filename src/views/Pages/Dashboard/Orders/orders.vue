<template>
  <div class="vuse-content-wrapper">
    <v-container fluid>
      <v-card v-if="pullAllOrder!=''" class="neu-glow-inset with-radius pa-5">
        <v-data-table
            :headers="headers"
            class="elevation-2 pt-6"
            :items="pullAllOrder"
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
              Canceled
            </div>
            <div v-if="item.status==3">
              Shipped
            </div>
            <div v-if="item.status==4">
              Delivered
            </div>
          </template>
          <template v-slot:top>
            <v-row class="px-4" align="center" justify="center">
              <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify "
                  label="Search"
                  outlined
                  dense
                  single-line
                  class="shrink"

              ></v-text-field>

            </v-row>
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
              <editOrder :item="item"></editOrder>
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
import editOrder from "./Crud/editOrder";
import noRecord from "../../../Pages/noRecord/noReccordd";

export default {
  components: {editOrder,noRecord},
  data: () => ({
        search: '',

        headers: [
          {
            align: 'start',
            text: 'Order Date',
            value: 'createdAt',
          },
          {
            text: 'User Name',
            value: 'userName',
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


  computed: {
    ...mapGetters("orders", [
      "pullAllOrder",

    ]),
  },


  created() {

    this.getAllOrders();
  },


  methods: {
    ...mapActions("orders", [
      "getAllOrders",
    ]),
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