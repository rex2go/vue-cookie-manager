<template>
  <div class="consentmanager__consent">
    <div class="consentmanager__consent__heading">
      {{ $t('consentView.title') }}
    </div>
    <div class="consentmanager__consent__text">
      {{ $t('consentView.description') }}
    </div>
    <div class="consentmanager__consent__actions">
      <button
        @click="goToSettings"
        class="consentmanager-button consentmanager__consent__settings"
      >
        {{ $t('settings') }}
      </button>
      <button class="consentmanager-button" @click="$parent.apply()">
        {{ $t('decline') }}
      </button>
      <button
        class="consentmanager-button primary"
        @click="$parent.acceptAll() || $parent.apply()"
      >
        {{ $t('acceptAll') }}
      </button>
    </div>
    <div class="consentmanager__consent__links">
      <a v-if="privacyPolicy" :href="privacyPolicy">{{ $t('privacyPolicy') }}</a>
      <a v-if="imprint" :href="imprint">{{ $t('imprint') }}</a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "Consent",
  computed: {
    ...mapState({
      privacyPolicy: "privacyPolicy",
      imprint: "imprint",
    }),
  },
  methods: {
    goToSettings() {
      this.$store.commit("setViewId", 1);
    },
  },
};
</script>