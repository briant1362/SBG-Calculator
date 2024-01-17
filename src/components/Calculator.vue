// eslint-disable-next-line vue/multi-word-component-names
<template>
  <!--I was here-->
  <v-container class="">
    <v-row no-gutters class="">
      <v-col class="pa-4">

        <v-card elevation="4">
          <v-toolbar flat density="compact" color="blue-lighten-5">
            <v-icon class="ml-3">mdi-orbit</v-icon>
            <v-toolbar-title>
              General

            </v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn variant="text" @click="reset">Reset</v-btn>
            |
            <v-btn color="primary" >
              Select Preset...
              <v-menu activator="parent">
                <v-list>

                  <v-list-item v-for="(item, index) in presets" :key="index" :value="item.name" @click="loadPreset(item)">
                    <v-list-item-title class="">{{ item.name }}</v-list-item-title>
                  </v-list-item>

                  <!--<v-list-item title="Yard Signs" value="yard-sign"></v-list-item>
                  <v-list-item title="A-Frame" value="a-frame"></v-list-item>
                  <v-list-item title="Stickers (Econo)" value="print"></v-list-item>
                  <v-list-item title="Mural/Wall Graphic" value="mural"></v-list-item>
                  <v-list-item title="Vinyl" value="vinyl"></v-list-item>-->
                </v-list>
              </v-menu>
            </v-btn>
          </v-toolbar>

          <v-divider></v-divider>

          <v-card-item class="">
            <v-row density="compact" class="pt-6 justify-space-between">
              <v-col class="ml-6">
                <v-text-field v-model="qty" type="number" label="Quantity" clearable default="1" persistent-clear
                  variant="outlined"></v-text-field>
              </v-col>
              <v-col class="mx-6">
                <v-text-field v-model="width" type="number" label="Width (in inches)" variant="outlined"></v-text-field>
              </v-col>
              <v-col class="mx-6">
                <v-text-field v-model="height" type="number" label="Height (in inches)" variant="outlined"></v-text-field>
              </v-col>
              <v-col class="mr-6">
                <v-text-field v-model="SFforDisplay" label="SF/ea (total)" variant="outlined" readonly></v-text-field>
              </v-col>
            </v-row>
            <v-row class="justify=start">
              <v-btn v-if="show" variant="text" @focus.prevent @click="show = !show" append-icon="mdi-chevron-up">Advanced
                Options</v-btn>
              <v-btn v-else variant="text" @focus.prevent @click="show = !show" append-icon="mdi-chevron-down">Advanced
                Options</v-btn>
            </v-row>
            <v-expand-transition>

              <v-row v-show="show" class="pt-6 justify-center">
                <v-combobox v-model="sides" label="Sides" :items="['1', '2']" variant="outlined"
                  class="ml-6"></v-combobox>
                <v-combobox v-model="bleed" label="Bleed" :items="['0', '0.25', '0.5', '0.75', '1.0']" variant="outlined"
                  class="mx-6"></v-combobox>
                <v-combobox v-model="spacing" label="Spacing" :items="['0', '0.25', '0.5', '0.75', '1', '1.5', '2.0']"
                  variant="outlined" class="mr-6"></v-combobox>
              </v-row>

            </v-expand-transition>
          </v-card-item>

        </v-card>

      </v-col>
      <v-col class="pa-4">
        <v-card elevation="4" color="blue-lighten-5" class="pa-1 h-100">
          <v-toolbar flat density="compact" color="blue-lighten-5">
            <v-icon class="ml-3">mdi-chart-bar</v-icon>
            <v-toolbar-title>
              Summary/Analysis
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon>mdi-download</v-icon>
            </v-btn>

          </v-toolbar>
          <v-divider></v-divider>
          <v-card-item class="pb-0">
            <!--<v-table>-->
            <v-row density="compact" class="pt-4">
              <v-col>
                Price:
                ${{ Number(pricePerItem).toFixed(2) }}/ea (${{ Number(pricePerSF).toFixed(2) }}/SF)
              </v-col>
              <v-col>
                Margin: {{ totalPrice > 0 ? Number(((totalPrice - totalCost) / totalPrice) * 100).toFixed(2) : 0 }}%
                <span>
                  <v-icon color="red">mdi-alert
                  </v-icon>
                  <v-tooltip activator="parent" location="top" origin="auto">Margin is inaccurate!</v-tooltip>
                </span>
              </v-col>
            </v-row>
            <v-row density="compact">
              <v-col>
                <b>Total:
                  ${{ Number(totalPrice).toFixed(2) }}</b>
              </v-col>
              <v-col>
                Profit: ${{ Number(totalPrice - totalCost).toFixed(2) }}
              </v-col>
            </v-row>
            <!--</v-table>-->

          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters class="">
      <v-col class="w-100 pa-4">
        <v-card elevation="4" class="w-100">
          <v-toolbar flat density="compact" color="blue-lighten-5">
            <v-icon class="ml-3">mdi-layers</v-icon>
            <v-toolbar-title>
              Materials/Labor/Costs
            </v-toolbar-title>
          </v-toolbar>

          <v-divider></v-divider>

          <v-card-item>
            <Usage v-for="item, i in usages" :baseUsage="item" :key="item.name" :index="i"
              @deleteUsage="handleDeleteUsage(i)">
            </Usage>

            <v-divider></v-divider>

            <v-container class="d-flex justify-space-evenly">
              <v-btn outlined prepend-icon="mdi-plus">Printer
                <v-menu activator="parent" location="center">
                  <v-list>
                    <v-list-item v-for="(item, index) in printing" :key="index" :value="item.name"
                      @click="addPrintingUsage(item)">
                      <v-list-item-title v-if="item.name.startsWith('>>>>')" class="bg-blue" disabled
                        @click.stop.prevent>{{ item.name }}</v-list-item-title>
                      <v-list-item-title v-else class="">{{ item.name }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-btn>

              <v-btn outlined prepend-icon="mdi-plus">Substrate
                <v-menu activator="parent" location="center">
                  <v-list>
                    <v-list-item v-for="(item, index) in substrates" :key="index" :value="item.name"
                      @click="addSubstrateUsage(item)">
                      <v-list-item-title v-if="item.name.startsWith('>>>>')" class="bg-blue" disabled
                        @click.stop.prevent>{{ item.name }}</v-list-item-title>
                      <v-list-item-title v-else class="">{{ item.name }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-btn>

              <v-btn outlined prepend-icon="mdi-plus">Media
                <v-menu activator="parent" location="center">
                  <v-list>
                    <v-list-item v-for="(item, index) in media" :key="index" :value="item" @click="addMediaUsage(item)">
                      <v-list-item-title v-if="item.name.startsWith('>>>>')" class="bg-blue" disabled
                        @click.stop.prevent>{{ item.name }}</v-list-item-title>
                      <v-list-item-title v-else class="">{{ item.name }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-btn>

              <v-btn outlined prepend-icon="mdi-plus">Laminate
                <v-menu activator="parent" location="center">
                  <v-list>
                    <v-list-item v-for="(item, index) in laminates" :key="index" :value="item.name"
                      @click="addLaminateUsage(item)">
                      <v-list-item-title v-if="item.name.startsWith('>>>>')" class="bg-blue" disabled
                        @click.stop.prevent>{{ item.name }}</v-list-item-title>
                      <v-list-item-title v-else class="">{{ item.name }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-btn>
              <v-btn disabled outlined prepend-icon="mdi-plus">Vinyl

              </v-btn>

              <v-btn disabled outlined prepend-icon="mdi-plus">Labor

              </v-btn>

              <v-btn disabled outlined prepend-icon="mdi-plus">Adjustment

              </v-btn>

              <v-btn disabled outlined prepend-icon="mdi-plus">Product

              </v-btn>

              <v-btn disabled outlined prepend-icon="mdi-plus">Misc

              </v-btn>
            </v-container>

          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { computed } from "vue";

//import jsonSubstrates from "@/data/substrates.json";
//import jsonMedia from "@/data/media.json";
import jsonPrinting from "@/data/printing.json";
import jsonPresets from "@/data/presets.json";

import Usage from './Usage.vue'

const csvToJson = (string, headers, quoteChar = '"', delimiter = ",") => {
  const regex = new RegExp(
    `\\s*(${quoteChar})?(.*?)\\1\\s*(?:${delimiter}|$)`,
    "gs"
  );
  const match = (string) =>
    [...string.matchAll(regex)]
      .map((match) => match[2])
      .filter((_, i, a) => i < a.length - 1); // cut off blank match at end

  const lines = string.split("\n");
  const heads = headers || match(lines.splice(0, 1)[0]);
  return lines.map((line) =>
    match(line).reduce(
      (acc, cur, i) => ({
        ...acc,
        [heads[i] || `extra_${i}`]: cur.length > 0 ? Number(cur) || cur : null
      }),
      {}
    )
  );
};

class BaseUsage {

  constructor(name, costPerUnit, unit) {
    this.name = name;
    this.markup = -1;
    this.costPerUnit = costPerUnit;
    this.unitForDisplay = unit;
  }
  toString() {
    return this.name;
  }
  calcCost(q, w, h) {
    return this.calcUsage(q, w, h) * this.costPerUnit;
  }
  calcUsage(q, w, h) {
    return -1 * q * w * h;
  }
  calcPrice(q, w, h) {
    return this.calcCost(q, w, h) * this.markup;
  }
  bestRollUsage(qty, w, h, materialWidth, materialHeight, spacing) {

    if (materialWidth == 0) return 0;

    var usageByWidth = this.rollUsage(qty, w, h, materialWidth - 1, 99999, spacing);
    var usageByHeight = this.rollUsage(qty, h, w, materialWidth - 1, 99999, spacing);

    var usageLF = Math.min(usageByWidth, usageByHeight);
    if (usageLF == 99999) return 0;

    return usageLF + 1; //ROLL_WASTE_LF;
  }

  rollUsage(qty, w, h, materialWidth, materialHeight, spacing) {

    var cols = Math.floor(materialWidth / w);
    if (cols == 0) return 99999;

    if (spacing > 0) {
      var widthWithSpacing = cols * w + ((cols + 1) * spacing);
      var colsWithSpacing = Math.floor(materialWidth / widthWithSpacing);
      if (colsWithSpacing > 0) cols = colsWithSpacing;
    }

    var rows = Math.round(qty / cols);
    if (rows == 0) rows = 1;

    var lf = h * rows / 12 + (rows + 1) * spacing;
    return lf;

  }

  bestSheetUsage(qty, w, h, materialWidth, materialHeight) {
    var wXh = this.sheetUsage(qty, w, h, materialWidth, materialHeight);
    var hXw = this.sheetUsage(qty, h, w, materialWidth, materialHeight);
    if (wXh == 0) return hXw;
    if (hXw == 0) return wXh;
    return Math.min(wXh, hXw);
  }

  sheetUsage(qty, w, h, materialWidth, materialHeight) {

    var cols = Math.floor(materialWidth / w);
    if (cols == 0) return 0;

    var rows = Math.round(qty / cols);
    if (rows == 0) rows = 1;
    var nSheets = (h * rows) / materialHeight;
    var nFullSheets = Math.floor(nSheets);
    var nPartialSheets = nSheets - nFullSheets;
    if (nPartialSheets > 0) {
      if (nPartialSheets <= .25) {
        nPartialSheets = .25;
      } else if (nPartialSheets <= .50) {
        nPartialSheets = .50;
      } else if (nPartialSheets <= .75) {
        nPartialSheets = .75
      } else nPartialSheets = 1;
    }
    return nFullSheets + nPartialSheets;
  }
}

class SubstrateUsage extends BaseUsage {
  constructor(obj) {
    super(obj.name, obj.cost, "sheet");
    this.width = obj.width;
    this.height = obj.height;
    this.markup = 2;
  }

  calcUsage(q, w, h) {
    return this.bestSheetUsage(q, w, h, this.width, this.height);
  }

}

class MediaUsage extends BaseUsage {
  constructor(obj) {
    super(obj.name, obj.costPerLF, "LF");
    this.width = obj.width;
    this.markup = 2.25;
  }

  calcUsage(q, w, h) {
    return this.bestRollUsage(q, w, h, this.width - 1, 99999, 0);
  }

}

class LaminateUsage extends BaseUsage {
  constructor(obj) {
    super(obj.name, obj.costPerLF, "LF");
    this.width = obj.width;
    this.markup = 2.25;
  }

  calcUsage(q, w, h) {
    return this.bestRollUsage(q, w, h, this.width - 1, 99999, 0);
  }

}

class PrinterUsage extends BaseUsage {
  constructor(obj) {
    super(obj.name, 1, "SF");
    this.width = obj.width;
    this.markup = obj.costPerSF;
  }

  calcUsage(q, w, h) {
    return (q * w * h) / 144;
  }

}

export default {

  data: () => ({
    show: false,
    substrates: null,
    media: null,
    laminates: null,
    printing: jsonPrinting.printing,
    presets: jsonPresets.presets,
    usages: [],
    x: null,
    y: null,
    qty: 1,
    width: 24,
    height: 18,
    sides: 1,
    bleed: 0,
    spacing: 0
  }),
  computed: {
    perItemSF() {
      return (this.width * this.height) / 144;
    },
    totalSF() {
      return this.qty * this.perItemSF;
    },
    pricePerItem() {
      return this.totalPrice / this.qty;
    },
    pricePerSF() {
      return this.totalPrice / this.totalSF;
    },
    totalPrice() {
      return this.usages.reduce((accumulator, usage) => {
        return accumulator + usage.calcPrice(this.qty, this.width, this.height)
      }, 0);
    },
    totalCost() {
      return this.usages.reduce((accumulator, usage) => {
        return accumulator + usage.calcCost(this.qty, this.width, this.height)
      }, 0);
    },
    SFforDisplay() {
      return Number(this.perItemSF).toFixed(2) + " (" + Number(this.totalSF).toFixed(2) + ")";
    }
  },
  created() {
    this.fetchMedia();
    this.fetchSubstrates();
    this.fetchLaminates();
  },
  methods: {
    loadPreset(preset) {
      this.qty = 1;
      this.width = preset.width;
      this.height = preset.height;
      this.sides = preset.sides ? item.sides : 1;
      this.bleed = preset.bleed ? item.bleed : 0;
      this.spacing = preset.spacing ? item.spacing : 0;
      this.usages = [];
      if (preset.printers) {
        preset.printers.forEach((printer) => {
          this.addPrintingUsage(printer);
        });
      }
      if (preset.substrates) {
        preset.media.forEach((substrate) => {
          this.addSubstrateUsage(substrate);
        });
      }         
      if (preset.media) {
        preset.media.forEach((media) => {
          this.addMediaUsage(media);
        });
      }      
      if (preset.laminates) {
        preset.laminates.forEach((laminate) => {
          this.addLaminateUsage(laminate);
        });
      }         
    },
    addSubstrateUsage(item) {
      this.usages.push(new SubstrateUsage(item))
    },
    addMediaUsage(item) {
      this.usages.push(new MediaUsage(item))
    },
    addPrintingUsage(item) {
      this.usages.push(new PrinterUsage(item))
    },
    addLaminateUsage(item) {
      this.usages.push(new LaminateUsage(item))
    },
    handleDeleteUsage(i) {
      this.usages.splice(i, 1)
    },
    reset() {
      this.qty = 1;
      this.width = 12;
      this.height = 12;
      this.sides = 1;
      this.bleed = 0;
      this.spacing = 0;
      this.usages = [];
    },
    fetchMedia() {
      //console.log(import.meta.env.VITE_MEDIA_URL);
      fetch(import.meta.env.VITE_MEDIA_URL, {
        method: "GET",
        headers: {
          //"X-RapidAPI-Key": 'your-api-key',
          //"X-RapidAPI-Host": 'facts-by-api-ninjas.p.rapidapi.com',
        },
      })
        .then((response) => {
          response.text().then((text) => {
            this.media = csvToJson(text);
            this.media = this.media.filter(item => item.name != "None");
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    fetchSubstrates() {
      fetch(import.meta.env.VITE_SUBSTRATES_URL, {
        method: "GET",
        headers: {
          //"X-RapidAPI-Key": 'your-api-key',
          //"X-RapidAPI-Host": 'facts-by-api-ninjas.p.rapidapi.com',
        },
      })
        .then((response) => {
          response.text().then((text) => {
            this.substrates = csvToJson(text);
            this.substrates = this.substrates.filter(item => item.name != "None");
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    fetchLaminates() {
      fetch(import.meta.env.VITE_LAMINATES_URL, {
        method: "GET",
        headers: {
          //"X-RapidAPI-Key": 'your-api-key',
          //"X-RapidAPI-Host": 'facts-by-api-ninjas.p.rapidapi.com',
        },
      })
        .then((response) => {
          response.text().then((text) => {
            this.laminates = csvToJson(text);
            this.laminates = this.laminates.filter(item => item.name != "None");
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  components: {
    Usage
  },
  provide() {
    return {
      qty: computed(() => this.qty),
      width: computed(() => this.width),
      height: computed(() => this.height),
      sides: computed(() => this.sides),
      bleed: computed(() => this.bleed),
      spacing: computed(() => this.spacing),
    }
  }
}


</script>