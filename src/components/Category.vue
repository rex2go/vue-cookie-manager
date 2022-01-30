<template>
  <div class="consentmanager__selection__item">
    <div class="consentmanager__selection__item__head">
      {{ category.name }}
    </div>
    <div class="consentmanager__selection__item__info">
      {{ category.description }}
    </div>
    <div class="consentmanager__selection__item__consent">
      <span @click="detailsOpen = !detailsOpen">{{
        detailsOpen ? detailsShowLess : detailsShowMore
      }}</span>
      <label class="consentmanager-slider">
        <input
          :disabled="category.required"
          :checked="category.required"
					v-model="category.active"
          @change="toggleCategory(category)"
          type="checkbox"
        />
        <div></div>
      </label>
    </div>

    <div class="consentmanager__selection__item__details" v-show="detailsOpen">
      <div
        class="consentmanager__selection__item__detail"
        v-for="service in services"
        :key="service.name"
      >
        <div class="consentmanager__selection__item__detail__head">
          <div class="consentmanager__selection__item__details__name">
            {{ service.name }}
          </div>
          <label class="consentmanager-slider">
            <input
              type="checkbox"
              :disabled="category.required"
              :checked="category.required || service.active"
							v-model="service.active"
            />
            <div></div>
          </label>
        </div>
        <div class="consentmanager__selection__item__detail__body">
          <div
            class="consentmanager__selection__item__detail__description"
            v-if="service.description"
          >
            <span
              class="
                consentmanager__selection__item__detail__description__label
              "
              >Beschreibung des Services</span
            >
            {{ service.description }}
          </div>

          <div
            class="consentmanager__selection__item__detail__description"
            v-if="service.dataCollected"
          >
            <span
              class="
                consentmanager__selection__item__detail__description__label
              "
              >Welche Daten werden gesammelt?</span
            >
            {{ service.dataCollected }}
          </div>

          <div
            class="consentmanager__selection__item__detail__description"
            v-if="service.cookies"
          >
            <span
              class="
                consentmanager__selection__item__detail__description__label
              "
              >Welche Daten werden gesammelt?</span
            >
            <table class="consentmanager__selection__item__detail__cookies">
              <tr>
                <th>Name</th>
                <th>Dauer</th>
                <th>Beschreibung</th>
              </tr>
              <tr v-for="cookie in service.cookies" :key="cookie.name">
                <td>{{ cookie.name }}</td>
                <td>{{ cookie.duration }}</td>
                <td>{{ cookie.description }}</td>
              </tr>
            </table>
          </div>

          <div
            class="consentmanager__selection__item__detail__description"
            v-if="service.privacyPolicy"
          >
            <a
              class="
                consentmanager__selection__item__detail__description__label
              "
              :href="service.privacyPolicy"
              >Link zur Datenschutzerklärung</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Consent",
  props: {
    category: Object,
  },
  data() {
    return {
      detailsOpen: false,
      detailsShowMore: "Mehr anzeigen",
      detailsShowLess: "Weniger anzeigen",
    };
  },
  computed: {
    services() {
      return this.$store.getters.getServicesByCategoryId(this.category.id);
    },
  },
  methods: {
    toggleCategory(category) {
      this.services.forEach(service => service.active = category.active);
    },
  },
};
</script>