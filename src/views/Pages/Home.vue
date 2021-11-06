<template>
  <div class="vuse-content-wrapper">
    <v-container>
      <Cover></Cover>
      <homeProducts></homeProducts>
    </v-container>
  </div>
</template>
<script>

import Cover from "./partials/Cover";
import homeProducts from "./partials/homeProducts";
export default {
  components:{Cover,homeProducts},
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
