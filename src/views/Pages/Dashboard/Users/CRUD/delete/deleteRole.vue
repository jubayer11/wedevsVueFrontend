<template>
  <div class="text-center">
    <v-dialog
        v-model="dialog"
        max-width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-icon
            small
            color="red"
            v-bind="attrs"
            v-on="on"
        >
          mdi-delete
        </v-icon>
      </template>

      <v-card class="delete__card">
        <v-card-title class="delete__card__title">
          <v-icon
              large
              color="red"
          >
            delete
          </v-icon>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="delete__card__text">
          <div>
            Are you sure you want to delete this record?
          </div>
        </v-card-text>
        <v-card-actions class="delete__card__actions">
          <v-spacer></v-spacer>
          <div class="delete__dialog__cancel">
            <v-btn
                @click="dialog = false"
            >
              Cancel
            </v-btn>
          </div>

          <div class="delete__dialog__delete">
            <v-btn
                @click="deleteUsers"
            >
              Delete
            </v-btn>
          </div>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    deleteUsers() {
      this.dialog = false;
      this.$store.dispatch('authorization/deleteRoles', this.item)
    }
  },
}
</script>