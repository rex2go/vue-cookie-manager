<template>
  <div class="consentmanager__consent">
    <div class="consentmanager__consent__heading">
      Wir benötigen Ihre Zustimmung
    </div>
    <div class="consentmanager__consent__text">
      Diese Website nutzt Cookies und vergleichbare Funktionen zur Verarbeitung
      von Endgeräteinformationen und personenbezogenen Daten.
    </div>
    <div class="consentmanager__consent__actions">
      <button
        @click="goToSettings"
        class="consentmanager-button consentmanager__consent__settings"
      >
        Einstellungen
      </button>
      <button class="consentmanager-button" @click="$parent.apply()">Ablehnen</button>
      <button class="consentmanager-button primary" @click="$parent.acceptAll() || $parent.apply()">Alle akzeptieren</button>
    </div>
    <div class="consentmanager__consent__links">
      <a v-if="privacyPolicy" :href="privacyPolicy">Datenschutzerklärung</a>
      <a v-if="imprint" :href="imprint">Impressum</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Consent",
  computed: {
    privacyPolicy() {
      return this.$store.state.privacyPolicy;
    },
    imprint() {
      return this.$store.state.imprint;
    },
  },
  methods: {
    goToSettings() {
      this.$store.commit('setViewId', 1);
    },
  },
};
</script>