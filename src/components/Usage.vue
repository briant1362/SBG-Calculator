<script>

export default {
  props: {
    baseUsage: Object
  },
  data: () => ({
  }),
  computed: {
    usage() {
      return this.baseUsage.calcUsage(this.qty, this.width, this.height);
    },
    cost() {
      return this.baseUsage.calcCost(this.qty, this.width, this.height);
    },
    price() {
      return this.baseUsage.calcPrice(this.qty, this.width, this.height);
    },
    SF() {
      return (this.width * this.height) / 144;
    },

  },
  methods: {
  },
  emits: ['deleteUsage'],
  inject: ['qty', 'width', 'height', 'sides', 'bleed', 'spacing']
}    
</script>

<template>
  <v-container class="pt-0 pb-0">
    <v-row no-gutters class="d-flex justify-space-between">
      <v-col class="text-truncate">
        <span >
          {{ baseUsage.name }}
        </span>        
        <v-tooltip activator="parent" location="top" origin="">{{baseUsage.name}}</v-tooltip>
      </v-col>
      <v-col>uses {{ Number(usage).toFixed(2) }} {{ baseUsage.unitForDisplay }}</v-col>
      <v-col>@ ${{ Number(baseUsage.costPerUnit).toFixed(2) }} per {{ baseUsage.unitForDisplay }}</v-col>
      <v-col>= ${{ Number(cost).toFixed(2) }} </v-col>
      <v-col>x {{ baseUsage.markup }} </v-col>
      <v-col>= ${{ Number(price).toFixed(2) }}</v-col>
      <v-col>
        <span class="mx-2">
          <v-icon color="grey-lighten-1">mdi-square-edit-outline</v-icon>
          <v-tooltip activator="parent" location="top" origin="">Override values</v-tooltip>
        </span>
        <span @click="$emit('deleteUsage')" class="mx-2">
          <v-icon>mdi-delete</v-icon>
          <v-tooltip activator="parent" location="top" origin="">Remove item</v-tooltip>
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>
  

  
