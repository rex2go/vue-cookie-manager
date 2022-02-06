<template>
  <div class="cookie-manager__consent">
    <div class="cookie-manager__consent__heading">
      {{ $t('consentView.title') }}
    </div>
    <div class="cookie-manager__consent__text">
      {{ $t('consentView.description') }}
    </div>
    <div class="cookie-manager__consent__actions">
      <button
          @click="goToSettings"
          class="cookie-manager-button cookie-manager__consent__settings"
      >
        {{ $t('settings') }}
      </button>
      <button class="cookie-manager-button" @click="$parent.denyAll() || $parent.apply()">
        {{ $t('decline') }}
      </button>
      <button
          class="cookie-manager-button primary"
          @click="$parent.acceptAll() || $parent.apply()"
      >
        {{ $t('acceptAll') }}
      </button>
    </div>
    <div class="cookie-manager__consent__links">
      <a v-if="privacyPolicy" :href="privacyPolicy">{{ $t('privacyPolicy') }}</a>
      <a v-if="imprint" :href="imprint">{{ $t('imprint') }}</a>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "Consent",
  computed: {
    ...mapState({
      privacyPolicy: state => state.vcm.privacyPolicy,
      imprint: state => state.vcm.imprint,
    }),
  },
  methods: {
    goToSettings() {
      this.$store.commit("vcm/setViewId", 1);
    },
  },
};
</script>