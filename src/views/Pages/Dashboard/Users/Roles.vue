<template>
  <div class="vuse-content-wrapper">
    <v-container fluid>
      <v-card class="neu-glow-inset with-radius pa-5">
        <v-data-table
            :headers="headers"
            class="elevation-2 pt-6"
            v-model="selected"
            :items="showRoles"
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
                  class="shrink my-auto hidden-xs-only"

              ></v-text-field>

              <v-spacer></v-spacer>

              <newRole></newRole>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <div class="display-flex">
              <assignPermissionToRole :item="item"></assignPermissionToRole>
              <editRole :item="item"></editRole>
              <deleteRole :item="item"></deleteRole>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import newRole from './CRUD/create/createRole'
import editRole from './CRUD/edit/editRole'
import deleteRole from "./CRUD/delete/deleteRole";
import assignPermissionToRole from "./CRUD/assign/assignPermissionToRole";

export default {
  components: {newRole, editRole, deleteRole, assignPermissionToRole},
  data: () => ({
    search: '',
    dialog: false,
    dialogDelete: false,
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
      {text: 'Created AT', value: 'createdAt'},
      {text: 'Actions', value: 'actions', sortable: false},
    ],

  }),

  created() {
    this.getRoles();
    this.pullAllPermission();
  },


  computed: {
    ...mapGetters("authorization", [
      "showRoles",

    ]),
  },


  methods: {
    ...mapActions("authorization", [
      "getRoles",
      "pullAllPermission",
    ]),
  },
}
</script>