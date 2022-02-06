<template>
  <div class="consentmanager__selection__item">
    <div class="consentmanager__selection__item__head">
      {{ translate(category.name) }}
    </div>
    <div class="consentmanager__selection__item__info">
      {{ translate(category.description) }}
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
                @change="toggleService($event)"
            />
          </label>
        </div>
        <div class="consentmanager__selection__item__detail__body">
          <div
              class="consentmanager__selection__item__detail__description"
              v-if="service.vendor"
          >
            <span
                class="
                consentmanager__selection__item__detail__description__label
              "
            >{{ $t("vendor") }}</span
            >
            {{ translate(service.vendor) }}
          </div>
          <div
              class="consentmanager__selection__item__detail__description"
              v-if="service.description"
          >
            <span
                class="
                consentmanager__selection__item__detail__description__label
              "
            >{{ $t("description") }}</span
            >
            {{ translate(service.description) }}
          </div>

          <div
              class="consentmanager__selection__item__detail__description"
              v-if="service.dataCollected"
          >
            <span
                class="
                consentmanager__selection__item__detail__description__label
              "
            >{{ $t("dataCollected") }}</span
            >
            {{ translate(service.dataCollected) }}
          </div>

          <div
              class="consentmanager__selection__item__detail__description"
              v-if="service.cookies"
          >
            <table class="consentmanager__selection__item__detail__cookies">
              <tr>
                <th>{{ $t("name") }}</th>
                <th>{{ $t("duration") }}</th>
                <th>{{ $t("description") }}</th>
              </tr>
              <tr v-for="cookie in service.cookies" :key="cookie.name">
                <td>{{ translate(cookie.name) }}</td>
                <td>{{ translate(cookie.duration) }}</td>
                <td>{{ translate(cookie.description) }}</td>
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
            >{{ $t("linkToPrivacyPolicy") }}</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {isObject} from "@/util";

export default {
  name: "Consent",
  props: {
    category: Object,
  },
  data() {
    return {
      detailsOpen: false,
      detailsShowMore: this.$t("showMore"),
      detailsShowLess: this.$t("showLess"),
    };
  },
  computed: {
    services() {
      return this.$store.getters.getServicesByCategoryId(this.category.id);
    },
  },
  methods: {
    toggleCategory(category) {
      this.services.forEach((service) => (service.active = category.active));
    },
    toggleService(event) {
      if (event.target.checked && !this.category.active) {
        this.category.active = true;
      } else if (!this.services.filter((service) => service.active).length) {
        this.category.active = false;
      }
    },
    translate(obj) {
      if (isObject(obj)) {
        return obj[this.$i18n.locale] ?? obj;
      }

      return obj;
    }
  },
};
</script>