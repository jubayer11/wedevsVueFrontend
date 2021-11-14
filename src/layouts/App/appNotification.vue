<template>
  <v-menu
      transition="slide-y-transition"
      nudge-bottom="50"
      nudge-width="100"
      open-on-hover
      allow-overflow
      max-width="250"
      v-model="showMenu"

  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn

          icon
          depressed
          color="primary"
          class="mr-3"
          v-bind="attrs"
          v-on="on"

      >
        <v-badge
            :color="color"
        >
          <template v-slot:badge>
            <div v-if="getCountUnreadNotification>0">{{ getCountUnreadNotification }}</div>
          </template>

          <v-icon :color="color">notifications</v-icon>
        </v-badge>
      </v-btn>
    </template>

    <v-list
        style="max-height: 400px"
        class="overflow-y-auto"
    >

      <v-list-item v-for="item in showNotification.unread" :key="item.id">
        <div class="caption" style="color: #e53935;text-decoration:none">{{ item.data.data }}</div>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item v-for="item in showNotification.read" :key="item.id">
        <div class="caption" style="text-decoration:none;color:#c67107">{{ item.data.data }}</div>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>


import {mapGetters} from "vuex";

export default {
  data() {
    return {
      read: {},
      unread: {},
      unreadCount: 0,
      id: 0,
      showMenu: false,
    }
  },
  created() {
    this.getNotifications()
  },
  methods: {
    getNotifications() {
      this.id = localStorage.getItem('userId');
      if (this.id == 1) {
        this.$store.dispatch('notifications/getNotifications', this.id)
      }
    },


  },
  watch: {
    showMenu(newValue) {
      if (newValue == false) {
        this.id = localStorage.getItem('userId');
        if (this.id == 1) {
          this.$store.dispatch('notifications/markReadNotifications', this.id)
        }
      }
    }
  },
  computed: {

    ...mapGetters("notifications", [
      "showNotification",
      "getCountUnreadNotification",
    ]),
    color() {
      return this.getCountUnreadNotification > 0 ? 'red' : ''
    }
  }
}
</script>
