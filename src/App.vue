<template>
  <v-app class="rounded rounded-md">

    <v-app-bar title="SBG Calculator" color="blue-darken-4"></v-app-bar>

    <v-navigation-drawer color="blue" class="">
      <v-list class="">
        <v-list-item title="Calculator" :to="{ name: 'calculator' }"></v-list-item>
        <v-divider color="blue-darken-4" thickness="3"></v-divider>
        <v-list-item class="">Google Data
          <span @click="$emit('refreshData')" class="px-2">
            <v-icon color="grey-lighten-1">mdi-refresh</v-icon>
            <v-tooltip activator="parent" location="top" origin="">Refresh material/cost data from Google spreadsheets</v-tooltip>
          </span>
          <span @click="openGoogleSheet" class="px-2">
            <v-icon color="">mdi-open-in-new</v-icon>
            <v-tooltip activator="parent" location="top" origin="">Open Google spreadsheets</v-tooltip>
          </span>
        </v-list-item>
        <!--<v-list-item title="Materials/Labor/Costs" class="">
          <v-list class="">
            <v-list-item @click="$emit('refreshData')" prepend-icon="mdi-refresh">Refresh
              <v-tooltip activator="parent" location="center end" origin="auto">Refresh data from Google
                spreadsheet</v-tooltip>
            </v-list-item>
            <v-list-item @click="openGoogleSheet" prepend-icon="mdi-open-in-new">Open
              <v-tooltip activator="parent" location="center end" origin="auto">Open Google spreadsheet</v-tooltip>
            </v-list-item>
          </v-list>
        </v-list-item>-->

        <v-list-item title="Manage Presets" disabled></v-list-item>
        <v-list-item title="Setup" disabled></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="" style="min-height: 300px">
      <router-view class="view main-content"></router-view>
    </v-main>
  </v-app>
</template>

<script>
//
export default {
  methods: {
    openGoogleSheet() {
      window.open(import.meta.env.VITE_GOOGLE_SHEET_URL);
    }
  },
  emits: ['refreshData'],
};
</script>
