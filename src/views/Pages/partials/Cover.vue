<template>
      <v-parallax
          dark
          src="../../../assets/home/home.jpg"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      >
        <v-row
            align="center"
            justify="center"
        >
          <v-col
              class="text-center"
              cols="12"
          >
            <h1 class="text-h4 font-weight-thin mb-4">
              Vuetify
            </h1>
            <h4 class="subheading">
              Build your application today!
            </h4>
          </v-col>
        </v-row>
      </v-parallax>
</template>
<script>

export default {

  data() {
    return {
      page: "Home",
      breadcrumbs: [
        {
          text: "Home",
          disabled: true,
        },
      ],
    };
  },
};
</script>
