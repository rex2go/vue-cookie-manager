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
        if(categoryRequiredMapping[service.category]) {
          service.active = true;
        } else if(!service.active) {
          continue;
        }

        if (!service.script) {
          console.warn(`Service ${service.name} has no script attribute.`);
          continue;
        }

        const script = document.createElement("script");

        script.type = "text/javascript";
        script.src = service.script;

        document.body.append(script);
      }

      this.hide = true;
    },
  },
};
</script>

<style lang="scss">
@import "./scss/consentmanager.scss";
</style>
