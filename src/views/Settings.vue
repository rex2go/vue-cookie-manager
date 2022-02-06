<template>
  <div class="cookie-manager__selection">
    <div class="cookie-manager__selection__heading">
      {{ $t('settingsView.title') }}
    </div>
    <div class="cookie-manager__selection__list">
      <Category
          v-for="category of categories"
          :key="category.name"
          :category="category"
      />
    </div>

    <div class="cookie-manager__selection__actions">
      <button class="cookie-manager-button" @click="$parent.apply()">
        {{ $t('saveSelected') }}
      </button>
      <button
          class="cookie-manager-button primary"
          @click="$parent.acceptAll() || $parent.apply()"
      >
        {{ $t('acceptAll') }}
      </button>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import Category from "../components/Category.vue";

export default {
  components: {Category},
  name: "Settings",
  computed: {
    ...mapState('vcm', {
      categories: 'categories',
    }),
  },
};
</script>