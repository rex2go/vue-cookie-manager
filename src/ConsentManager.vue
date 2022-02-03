<template>
  <div v-if="!hide" class="consentmanager">
    <div class="consentmanager__dialogue">
      <Consent v-if="viewId == 0" />
      <Settings v-if="viewId == 1" />
    </div>
  </div>
</template>

<script>
import Consent from "./components/views/Consent.vue";
import Settings from "./components/views/Settings.vue";

export default {
  name: "ConsentManager",
  components: {
    Consent,
    Settings,
  },
  data() {
    return {
      hide: false,
    };
  },
  computed: {
    viewId() {
      return this.$store.state.viewId;
    },
    services() {
      return this.$store.state.services;
    },
    categories() {
      return this.$store.state.categories;
    },
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

      this.hide = true;
    },
  },
};
</script>

<style lang="scss">
@import "./scss/consentmanager.scss";
</style>
