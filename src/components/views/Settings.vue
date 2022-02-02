<template>
  <div class="consentmanager__selection">
    <div class="consentmanager__selection__heading">
      {{ $t('settingsView.title') }}
    </div>
    <div class="consentmanager__selection__list">
      <Category
        v-for="category of categories"
        :key="category.name"
        :category="category"
      />
    </div>

    <div class="consentmanager__selection__actions">
      <button class="consentmanager-button" @click="$parent.apply()">
        {{ $t('saveSelected') }}
      </button>
      <button
        class="consentmanager-button primary"
        @click="$parent.acceptAll() || $parent.apply()"
      >
        {{ $t('acceptAll') }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Category from "../Category.vue";

export default {
  components: { Category },
  name: "Settings",
  computed: {
    ...mapState({
      categories: "categories",
    }),
  },
};
</script>