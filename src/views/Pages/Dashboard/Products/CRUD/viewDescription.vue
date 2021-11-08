<template>
  <v-row>
    <v-col cols="auto">
      <v-dialog
          transition="dialog-bottom-transition"
          max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              color="primary"
              v-bind="attrs"
              v-on="on"
          >Description</v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
                color="primary"
                dark
            >{{item.name}}</v-toolbar>
            <v-card-text>
              <div class="text-h6 pa-12">{{item.description}}</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                  class="secondary"
                  text
                  @click="dialog.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>
<script>

export default {
  props:['item'],
  data: () => ({

      }
  ),
}
</script>