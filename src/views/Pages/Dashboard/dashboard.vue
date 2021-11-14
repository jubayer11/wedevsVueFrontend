<template>
  <div class="vuse-content-wrapper">
    <v-container fluid>
      <v-card class="neu-glow-inset py-12 px-12" style="min-height: 80vh">
      <v-row>
        <v-col   cols="12" md="4">
          <v-card  align="center"  class="neu-glow-primary mx-6 my-6 dashboard" >
            <div>{{pullDashboardData.userCount}} Users </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card align="center"  cols="12" md="4" class="neu-glow-primary mx-6 my-6 dashboard">
            <div>{{pullDashboardData.productCount}} Products </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card align="center" cols="12" md="4" class="neu-glow-primary mx-6 my-6 dashboard">
            <div>{{pullDashboardData.orderCount}} new Orders </div>
          </v-card>
        </v-col>
      </v-row>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  data: () => ({}),
  created() {
    this.getDashboardData();
  },

  computed: {
    ...
        mapGetters("notifications", [
          "pullDashboardData",
        ]),
  },
  methods: {
    getDashboardData() {
      this.$store.dispatch('notifications/getDashboardData')
    },
  },
};
</script>
<style scoped>

</style>
