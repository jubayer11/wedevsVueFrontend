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

            </v-toolbar>
          </template>
          <template v-slot:item.isStaff="{ item }">
            <div class="staff" v-if="item.isStaff==0">
              NO
            </div>
            <div class="notStaff" v-else>
              YES
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";


export default {

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
          {text: 'created', value: 'createdAt'},
        ],
        tableShowUsers: '',
        xyz: '',


      }
  ),


  computed: {
    ...mapGetters("authorization", [
      "showUsers",
    ]),
  },

  watch: {
    fetchUsers(newValue) {
      this.$store.commit('authorization/fetchUsersAdmin', {user: newValue});
    },
  },

  created() {
    this.getUsers();

  },


  methods: {
    ...mapActions("authorization", [
      "getUsers",
    ]),
  },
}
</script>
<style scoped>
.display__flex {
  display: flex !important;
}
</style>