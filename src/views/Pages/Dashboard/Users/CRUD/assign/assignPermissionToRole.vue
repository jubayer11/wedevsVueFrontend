<template>
  <div class="text-center">
    <v-dialog
        v-model="dialog"
        max-width="1000"

    >
      <template v-slot:activator="{ on, attrs }">
        <div class="delete__dialog__delete">

          <v-btn
              class="mr-5 ml-2"
              dark
              v-bind="attrs"
              v-on="on"
              @click="pullRolePermissions(item)"
          >

            Assign
          </v-btn>
        </div>
      </template>

      <v-card class="delete__card">
        <v-card-title class="delete__card__title">
          <v-icon
              large
              color="#1A237E"
          >
            assignment
          </v-icon>
          Assign Permission To {{ item.name }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="delete__card__text">
          <div class="permission__list">
            <v-row>
              <v-col cols="12" md="5">
                <div class="create__user">
                  <v-text-field
                      label="Search Permission*"
                      placeholder="Search Permission here"
                      outlined
                      dense
                      v-model="searchPermission"
                  ></v-text-field>
                </div>
                <div class="permission__border">
                  <div @click="selectItem(permission,1,index)" :class="'permission__item'+' '+permission.customClass"
                       v-for="(permission,index) in getAllPermission" :key="permission.id">
                    <div class="permission__childItem">
                      {{ permission.name }}
                    </div>
                    <div class="permission__childItem">| {{ permission.label }}</div>
                    <div class="permission__childItem">

                      <div v-if="permission.isActive==1">| Active</div>
                      <div v-else>| Not Active</div>

                    </div>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="2" justify-self="center" align-self="center">
                <div class="permission__middle">
                  <div @click="movingPermission" class="newUser">
                    <v-btn color="primary">
                      <v-icon
                          large

                      >
                        compare_arrows
                      </v-icon>
                      Move
                    </v-btn>
                  </div>
                  <div @click="unselectPermission" class="newUser">
                    <v-btn color="#101820" class="mt-6">

                      <span style="color: white">Unselect</span>
                    </v-btn>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="5">
                <div class="create__user">
                  <v-text-field
                      label="Search Permission*"
                      placeholder="Search Permission here"
                      outlined
                      dense
                      v-model="searchRolePermission"
                  ></v-text-field>
                </div>
                <div class="permission__border">
                  <div @click="selectItem(permission,2,index)" :class="'permission__item'+' '+permission.customClass"
                       v-for="(permission,index) in getRolePermissions" :key="permission.id">

                    <div class="permission__childItem">
                      {{ permission.name }}
                    </div>
                    <div class="permission__childItem">| {{ permission.label }}</div>
                    <div class="permission__childItem">

                      <div v-if="permission.isActive==1">| Active</div>
                      <div v-else>| Not Active</div>

                    </div>


                  </div>
                </div>
              </v-col>

            </v-row>
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
            <v-btn @click="assignPermissionToRole">
              Assign
            </v-btn>
          </div>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>


import {mapGetters} from "vuex";

export default {
  props: ['item'],
  data() {
    return {
      dialog: false,
      selectedItem:
          {
            check: '',
            item: '',
            index: '',
          },
      searchPermission: '',
      searchRolePermission: '',
    }
  },
  watch:
      {
        searchRolePermission(newValue) {
          this.$store.commit('authorization/searchRolePermission', newValue)

        },
        searchPermission(newValue) {
          this.$store.commit('authorization/searchPermission', newValue)

        },
        getDialogCloseAssignPermission(newValue) {
          console.log('hello john',newValue)
          if (newValue == 1) {
            this.dialog = false;

          }
        }
      },
  computed: {
    ...mapGetters("authorization", [
      "getAllPermission",
      "getRolePermissions",
      "getDialogCloseAssignPermission",
    ]),

  },
  methods: {
    assignPermissionToRole() {
      this.$store.dispatch('authorization/assignPermissionToRole')
    },
    pullRolePermissions(item) {

      this.$store.dispatch('authorization/pullRolePermissions', item.id)
    },
    selectItem(item, check, index) {
      this.selectedItem.check = check;
      this.selectedItem.item = item;
      this.selectedItem.index = index;
      this.$store.commit('authorization/selectPermission', this.selectedItem)

    },
    unselectPermission() {
      this.$store.commit('authorization/unselectPermission', this.selectedItem)

    },
    movingPermission() {
      this.$store.commit('authorization/movingPermission', this.selectedItem)

    }

  }
}
</script>