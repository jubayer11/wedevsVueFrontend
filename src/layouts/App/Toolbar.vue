<template>
  <v-app-bar
      app
      flat
      :clipped-left="isClippedLeft"
      :clipped-right="isClippedRight"
      v-if="isVisibleHeader"
      v-bind="bindStyle"
      :dense="isDense"
      :prominent="isProminent"
      :hide-on-scroll="isHideOnScroll"
      :shrink-on-scroll="isShrinkOnScroll"
  >
    <v-sheet
        color="transparent"

    >
      <v-list-item class="pl-0">
        <v-list-item-avatar tile>
          <vuse-logo class="primary--text" size="40"/>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-h6 primary--text"
          >Wedevs
          </v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-sheet>
    <div class="toolbar__component">
      <v-btn
          class="mx-5"
          v-for="item in nav"
          :key="item.icon"
          :to="item.to"
          :title="item.title"
          :color="item.color"
          @click="changeTab(item.id)"

      >{{ item.text }}
      </v-btn>
    </div>
    <v-spacer/>
    <v-btn
        color="primary"
        depressed
        rounded
        small
        class="mr-3"
        to="/login"
    >
      <v-icon left small class="mr-2">
        fa-sign-in-alt
      </v-icon>
     Sign In/Sign Up
    </v-btn>
    <toolbarMyOrder></toolbarMyOrder>
    <toolbarCart></toolbarCart>
    <v-badge
        bordered
        color="error"
        icon="mdi-lock"
        overlap
        class="mr-3"
    >
      <v-btn
          color="primary"
          depressed
          rounded
          small
      >
        <v-icon small>
          fa-bell
        </v-icon>
      </v-btn>
    </v-badge>
    <v-btn
        v-if="$vuetify.breakpoint.mdAndDown"
        class="mr-3"
        small
        fab
        :class="!bindStyle.color ? 'neu-glow' : ''"
        @click="handleSidenavDrawer()"
    >
      <v-icon :color="!bindStyle.color ? 'primary' : bindStyle.color"
      >menu
      </v-icon
      >
    </v-btn>
    <v-btn
        v-if="isSettingsShow"
        class="mr-3"
        small
        fab
        :class="!bindStyle.color ? 'neu-glow' : ''"
        @click="handleSettingsDrawer()"
    >
      <v-icon :color="!bindStyle.color ? 'primary' : bindStyle.color">
        settings
      </v-icon>
    </v-btn>
    <v-menu offset-y close-on-click>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" small fab class="neu-glow mr-3">
          <v-avatar size="30">
            <v-img :src="currentLocaleImg"></v-img>
          </v-avatar>
        </v-btn>
      </template>

      <v-list dense class="neu-glow">
        <v-list-item
            v-for="(item, index) in langs"
            :key="index"
            @click="handleInternationalization(item.value)"
        >
          <v-list-item-avatar tile class="with-radius" size="25">
            <v-img :src="item.img"></v-img>
          </v-list-item-avatar>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <!-- User Profile Menu -->
    <v-menu offset-y min-width="160">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon class="mr-0">
          <v-avatar size="40" v-if="bindStyle.color">
            <v-img :src="authUser.avatar"></v-img>
          </v-avatar>
          <vuse-avatar size="40" :src="authUser.avatar" v-else/>
        </v-btn>
      </template>
      <v-list nav dense class="neu-glow-primary with-radius">
        <template v-for="(item, index) in items">
          <v-divider v-if="item.divider" :key="index"></v-divider>
          <v-list-item :key="index" @click="() => {}" v-else>
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
    <v-snackbar :value="getSnackbar.condition" absolute top right color="success">
      <span>{{ getSnackbar.message }}</span>
      <v-icon dark>check_circle</v-icon>
    </v-snackbar>
  </v-app-bar>
</template>

<script>
import {mapGetters} from "vuex";
import {availableLocale} from "@/config/locale";
import toolbarCart from "./../../views/Pages/Cart/toolbar/toolbarCart"
import toolbarMyOrder from "./../../views/Pages/Orders/toolbar/myOrder"

export default {
  props: {
    handleSettingsDrawer: Function,
  },
  components:{toolbarCart,toolbarMyOrder},
  data() {
    return {
      id: '',
      authUser: {
        name: "Alice Blue",
        firstname: "Alice",
        lastname: "Blue",
        email: "aliceblue@example.com",
        avatar: `/static/ali.jpg`,
        mood: "Vuse - Powerful VuejS admin template.",
        status: {
          color: "success",
          icon: "check_circle",
        },
      },
      items: [
        {icon: "person", text: "Profile"},
        {divider: true},
        {icon: "power_settings_new", text: "Logout"},
      ],
      nav: [
        {
          id: 1,
          icon: 'home',
          text: 'Home',
          title: 'Back to Home page',
          active: true,
          color: 'red',
          to:'/home'
        },
        {
          id: 2,
          icon: 'info',
          text: 'Products',
          title: 'About this demo',
          active: false,
          to:'/products',
          color: '',
        },
      ],
      langs: availableLocale,
    };
  },
  computed: {
    activeItemStyle: (state) => state.activeMenuStyle,
    ...mapGetters("snackbar", [
      "getSnackbar",
    ]),

    ...mapGetters("navigations", [
      "isSettingsShow",
      "isVisibleHeader",
      "isSidenavPostionRight",
      "isClippedOver",
      "isMinSideNav",
      "isDense",
      "isProminent",
      "isHideOnScroll",
      "isShrinkOnScroll",
      "isFloating",
    ]),
    ...mapGetters("scheme", ["header"]),
    ...mapGetters(["locale"]),
    isClippedRight() {
      return this.isClippedOver && this.isSidenavPostionRight;
    },
    isClippedLeft() {
      return this.isClippedOver && !this.isSidenavPostionRight;
    },
    bindStyle() {
      const {color, dark, classes} = this.header;
      return {
        class: {
          "vuse-header": true,
          "with-radius": true,
          [classes]: true,
          "mx-6 mt-3": this.isFloating && !this.isClippedOver,
        },
        dark,
        color,
      };
    },
    currentLocaleImg() {
      return this.langs.find((item) => item.value === this.locale).img;
    },
  },
  methods: {
    changeTab(id) {
      this.id = id;
      if (this.id == 1) {
        this.nav[0].color = 'red';
        this.nav[1].color = '';
      }
      else
      {
        this.nav[1].color = 'red';
        this.nav[0].color = '';
      }
    },
    toggleMiniVariant() {
      this.$store.dispatch("navigations/setMiniVariant");
    },
    handleSidenavDrawer() {
      this.$store.dispatch("navigations/setSidenavVisibility");
    },
    handleInternationalization(value) {
      this.$store.dispatch("setLocale", value);
    },
  },
};
</script>
