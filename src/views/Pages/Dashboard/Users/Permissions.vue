<template>
  <div class="vuse-content-wrapper">
    <v-container fluid>
      <v-card class="neu-glow-inset with-radius pa-5">
        <v-data-table
            :headers="headers"
            class="elevation-2 pt-6"
            v-model="selected"
            :items="showPermissions"
            item-key="name"
            :search="search"
        >
          <template #item.isActive="{ item }">
            <div v-if="item.isActive==1">
              YES
            </div>
            <div v-else>
              NO
            </div>
          </template>
          <template v-slot:top>
            <v-switch
                v-model="singleSelect"
                label="Single select"
                class="pa-3"
            ></v-switch>
          </template>
          <template v-slot:top>

            <v-row>
              <v-col  md="8" sm="12" class="mx-auto">
              <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify "
                  label="Search"
                  outlined
                  dense
                  single-line
                  class="shrink my-auto mx-3 hidden-sm-and-up" 
                  
              ></v-text-field>
              </v-col>
            </v-row>

            <v-toolbar
                flat
            >
              <v-toolbar-title>Roles</v-toolbar-title>


              <v-divider
                  class="mx-4"
                  inset
                  vertical
              ></v-divider>

              <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify "
                  label="Search"
                  outlined
                  dense
                  single-line
                  class="shrink  my-auto hidden-xs-only"

              ></v-text-field>

              <v-spacer></v-spacer>

              <newPermission></newPermission>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <div class="display-flex">
              <editPermission :item="item"></editPermission>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import newPermission from './CRUD/create/createPermission'
import editPermission from './CRUD/edit/editPermission'


export default {
  components: {newPermission, editPermission},
  data: () => ({
    search: '',
    selected: [],
    singleSelect: false,
    headers: [

      {
        align: 'start',
        text: 'Name',
        value: 'name',
      },
      {text: 'Label', value: 'label'},
      {text: 'Is Active?', value: 'isActive'},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
  }),

  created() {
    this.getAllPermission();
  },

  computed: {
    ...mapGetters("authorization", [
      "showPermissions",

    ]),
  },


  methods: {
    ...mapActions("authorization", [
      "getAllPermission",
    ]),
  },
}
</script>