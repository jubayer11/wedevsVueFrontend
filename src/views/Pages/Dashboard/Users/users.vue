<template>
  <div class="vuse-content-wrapper">
    <v-container fluid>
      <v-card class="neu-glow-inset with-radius pa-5">
        <v-data-table
            :headers="headers"
            class="elevation-2 pt-6"
            v-model="selected"
            :items="showUsers"
            item-key="name"
            :search="search"
        >

          <template v-slot:top>
            <v-switch
                v-model="singleSelect"
                label="Single select"
                class="pa-3"
            ></v-switch>
          </template>
          <template v-slot:top>
            <v-row class="px-4">
              <v-col class="justify-center" cols="12" offset-md="1" md="4">
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify "
                    label="Search"
                    outlined
                    dense
                    single-line
                    class="shrink"

                ></v-text-field>
              </v-col>
              <v-col class="justify-center" cols="12" offset-md="1" md="4">
                <v-select
                    :items="choice"
                    v-model="fetchUsers"
                    outlined
                    label="Show Users"
                    dense
                    single-line
                    class="shrink"
                ></v-select>
              </v-col>
            </v-row>
            <v-toolbar
                flat
            >
              <v-toolbar-title>Users</v-toolbar-title>


              <v-divider
                  class="mx-4"
                  inset
                  vertical
              ></v-divider>


              <v-spacer></v-spacer>
              <createUsers></createUsers>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <div class="display__flex">
              <v-icon
                  small
                  class="mr-2"
                  @click="viewItem(item)"
                  color="green darken-2"
              >
                remove_red_eye
              </v-icon>
              <editUsers :item="item"></editUsers>

              <deleteUsers :item="item"></deleteUsers>
            </div>

          </template>
          <template v-slot:item.isStaff="{ item }">
            <div class="staff" v-if="item.isStaff==0">
              NO
            </div>
            <div class="notStaff" v-else>
              YES
            </div>
          </template>
          <template v-slot:item.isPermission="{ item }">
            <assignPermissionToUser :item="item" v-if="item.isStaff==1"></assignPermissionToUser>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import createUsers from "./CRUD/create/createUsers";
import deleteUsers from "./CRUD/delete/deleteUsers";
import editUsers from "./CRUD/edit/editUsers"
import assignPermissionToUser from "./CRUD/assign/assignPermissionToUser";

export default {
  components: {createUsers, deleteUsers, editUsers, assignPermissionToUser},
  data: () => ({
        fetchUsers: 'allUsers',
        search: '',

        dialogDelete: false,
        selected: [],
        singleSelect: false,
        choice: ['users', 'staffUsers', 'allUsers'],
        headers: [

          {
            align: 'start',
            text: 'Name',
            value: 'name',
          },
          {text: 'Role', value: 'role'},
          {text: 'Email', value: 'email'},
          {text: 'Staff', value: 'isStaff'},
          {text: 'Actions', value: 'actions', sortable: false},
        ],
        tableShowUsers: '',
        xyz: '',


      }
  ),


  computed: {
    ...mapGetters("authorization", [
      "showUsers",
    ]),
    ...mapGetters("snackbar", [
      "getSnackbar",

    ]),

    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    fetchUsers(newValue) {
      this.$store.commit('authorization/fetchUsersAdmin', {user: newValue});

    },
  },

  created() {
    this.getUsers();
    this.getRole();
    this.pullAllPermission();
  },


  methods: {
    ...mapActions("authorization", [
      "getUsers",
      "pullAllPermission",
    ]),

    viewItem(user) {


      this.$store.dispatch('authorization/userProfile', {user: user})
    },

    getRole() {
      this.$store.dispatch('authorization/getRoles')
    },
  },
}
</script>
<style scoped>
.display__flex {
  display: flex !important;
}
</style>