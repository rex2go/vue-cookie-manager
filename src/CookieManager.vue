<template>
  <div v-if="showCookieManager" class="cookie-manager">
    <div class="cookie-manager__dialogue">
      <select class="cookie-manager__language-switch" @change="changeLanguage">
        <option v-for="locale of Object.keys(messages)" :value="locale">{{ locale }}</option>
      </select>
      <Consent v-if="viewId === 0"/>
      <Settings v-if="viewId === 1"/>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {isObject} from './util';
import Consent from "./views/Consent.vue";
import Settings from "./views/Settings.vue";

export default {
  name: "CookieManager",
  components: {
    Consent,
    Settings,
  },
  props: {
    config: {
      type: Object,
      required: false,
    },
    locale: {
      type: String,
      required: false,
    },
    locales: {
      type: Object,
      required: false,
    }
  },
  mounted() {
    if (this.showCookieManager) return;

    this.apply();
  },
  created() {
    const locale = (navigator.language || navigator.userLanguage)?.split('-')[0] || this.locale || 'en';
    this.$store.commit('vcm/setLocale', locale);

    if (this.config) {
      this.$store.commit('vcm/setConfig', this.config);
    }

    if (this.locales) {
      for (const locale of Object.keys(this.locales)) {
        this.$vcm_td.messages[locale] = {
          ...(this.$vcm_td.messages[locale] ?? {}),
          ...this.locales[this.locale],
        };
      }
    }
  },
  computed: {
    ...mapState('vcm', {
      viewId: 'viewId',
      showCookieManager: 'showCookieManager',
      services: 'services',
      categories: 'categories',
      messages: 'messages',
    }),
  },
  methods: {
    acceptAll() {
      this.services.forEach((service) => (service.active = true));
    },
    denyAll() {
      this.services.forEach((service) => (service.active = false));
    },
    changeLanguage($event) {
      this.changeLocale($event.target.value);
    },
    changeLocale(locale) {
      this.$store.commit('vcm/setLocale', locale);
    },
    apply() {
      const categoryRequiredMapping = {};

      this.categories.forEach((category) => {
        categoryRequiredMapping[category.id] = category.required ?? false;
      });

      for (const service of this.services) {
        if (categoryRequiredMapping[service.category]) {
          service.active = true;
        } else if (!service.active) {
          continue;
        }

        if (!service.scripts || !service.scripts.length) {
          console.warn(`Service ${service.name} has no scripts attribute.`);
          continue;
        }

        for (let script of service.scripts) {
          const scriptElement = document.createElement("script");
          scriptElement.type = "text/javascript";

          let inline = false;

          if (isObject(script)) {
            inline = script.inline ?? false;
            script = script.script;
          }

          if (inline) {
            try {
              scriptElement.appendChild(document.createTextNode(script));
            } catch (e) {
              scriptElement.text = script;
            }
          } else {
            scriptElement.src = script;
          }

          document.body.append(scriptElement);
        }
      }

      const services = {};

      this.services.forEach((service) => {
        services[service.name] = service.active ?? false;
      });

      window.localStorage.setItem(
          "cm_consent",
          JSON.stringify({
            services,
          })
      );

      this.$store.commit("vcm/setShowCookieManager", false);
    },
  },
};
</script>

<style lang="scss">
@import "./scss/style.scss";
</style>
