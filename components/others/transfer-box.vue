<template>
  <div class="transfer-box">
    <div class="transfer-box-content">
      <label class="transfer-box-content-header" v-t="'general.available'" />
      <ul>
        <li v-for="item in getAvailableItems" :key="item[target]">
          <div class="checkbox-wrapper">
            <div class="checkbox">
              <input type="checkbox" :id="'available-' + item[target]" :checked="isSelected(item[target])" @change="selectItem(item[target])">
            </div>
            <div class="checkbox-label">
              <label :for="'available-' + item[target]">
                <slot v-bind:item="item" />
              </label>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="flex items-center justify-center flex-col">
      <button type="button" class="button mb-2 button-primary" @click.prevent="addToChosen" :disabled="getAvailableItems <= 0" :aria-label="$t('general.add')">&gt;</button>
      <button type="button" class="button button-primary" @click.prevent="deleteFromChosen" :disabled="chosen.length <= 0" :aria-label="$t('general.delete')">&lt;</button>
    </div>
    <div class="transfer-box-content">
      <label class="transfer-box-content-header" v-t="'general.chosen'" />
      <ul>
        <li v-for="item in getChosenItems" :key="item[target]">
          <div class="checkbox-wrapper">
            <div class="checkbox">
              <input type="checkbox" :id="'chosen-' + item[target]" :checked="isSelected(item[target], true)" @change="selectItem(item[target], true)">
            </div>
            <div class="checkbox-label">
              <label :for="'chosen-' + item[target]">
                <slot v-bind:item="item" />
              </label>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "components-others-transferbox",
  data () {
    return {
      selected: {
        'avail': [],
        'chosen': []
      },
      chosen: [],
    }
  },
  props: {
    data: {
      type: Array,
      required: true,
      default: () => {
        return [];
      }
    },
    target: {
      type: String,
      required: true,
    },
    value: {
      type: Array,
      required: false,
      default: () => {
        return [];
      }
    },
  },
  methods: {
    selectItem(target, chosen = false) {
      // The chosen stuff and array in object is pretty terrible, but I am lazy and this works
      const col = chosen ? 'chosen' : 'avail';

      // Remove if exists
      if (this.isSelected(target, chosen)) {
        this.$delete(this.selected[col], this.selected[col].indexOf(target));
        return;
      }

      // Add
      this.selected[col].push(target);
    },
    addToChosen() {
      this.chosen.push(...this.selected['avail']);
      this.$emit("input", this.chosen);
    },
    deleteFromChosen() {
      const indexes = [];
      this.selected['chosen'].forEach(i => indexes.push(this.chosen.indexOf(i)));
      this.chosen = this.chosen.filter((item, index) => {
          return indexes.indexOf(index) === -1;
      });

      this.$emit("input", this.chosen);
    },
    isSelected(target, chosen = false) {
      return this.selected[chosen ? 'chosen' : 'avail'].includes(target);
    }
  },
  computed: {
    getChosenItems() {
      return this.data.filter(item => this.chosen.includes(item[this.target]));
    },
    getAvailableItems() {
      return this.data.filter(item => !this.chosen.includes(item[this.target]));
    }
  },
  created () {
    // Set initial value
    if (typeof this.value !== "undefined" && this.value.length > 0) {
      this.chosen = this.value;
    }
  }
}
</script>

<style lang="scss" scoped>
.transfer-box {
  @apply grid grid-cols-5;

  .transfer-box-content {
    @apply col-span-2 border-gray-100 border rounded-lg;

    .transfer-box-content-header {
      @apply px-4 py-3 text-base bg-gray-100 block;
    }

    ul {
      li {
        @apply px-4 py-2 hover:bg-gray-100;

        label {
          @apply text-gray-800 cursor-pointer block;
        }
      }
    }
  }
}
</style>
