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
            <div class="home__tag__slogan">
            <h1 class="text-h4 font-weight-thin mb-4">
              The World’s Most Comfortable Shoes
            </h1>
            <h4 class="subheading">
             check now
            </h4>
            </div>
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
