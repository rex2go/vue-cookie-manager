<template>
  <div v-if="showConsentManager" class="consentmanager">
    <div class="consentmanager__dialogue">
      <Consent v-if="viewId == 0" />
      <Settings v-if="viewId == 1" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Consent from "./components/views/Consent.vue";
import Settings from "./components/views/Settings.vue";

export default {
  name: "ConsentManager",
  components: {
    Consent,
    Settings,
  },
  mounted() {
    if (this.showConsentManager) return;

    this.apply();
  },
  computed: {
    ...mapState({
      viewId: "viewId",
      showConsentManager: "showConsentManager",
      services: "services",
      categories: "categories",
    }),
  },
  methods: {
    acceptAll() {
      this.services.forEach((service) => (service.active = true));
    },
    denyAll() {
      this.services.forEach((service) => (service.active = false));
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

          if (
            typeof script === "object" &&
            !Array.isArray(script) &&
            script !== null
          ) {
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

      this.$store.commit("setShowConsentManager", false);
    },
  },
};
</script>

<style lang="scss">
@import "./scss/consentmanager.scss";
</style>
