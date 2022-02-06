<template>
  <div class="cookie-manager__selection__item">
    <div class="cookie-manager__selection__item__head">
      {{ translate(category.name) }}
    </div>
    <div class="cookie-manager__selection__item__info">
      {{ translate(category.description) }}
    </div>
    <div class="cookie-manager__selection__item__consent">
      <span @click="detailsOpen = !detailsOpen">{{
          detailsOpen ? detailsShowLess : detailsShowMore
        }}</span>
      <label class="cookie-manager-slider">
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

    <div class="cookie-manager__selection__item__details" v-show="detailsOpen">
      <div
          class="cookie-manager__selection__item__detail"
          v-for="service in getServicesByCategoryId(category.id)"
          :key="service.name"
      >
        <div class="cookie-manager__selection__item__detail__head">
          <div class="cookie-manager__selection__item__details__name">
            {{ service.name }}
          </div>
          <label class="cookie-manager-slider">
            <input
                type="checkbox"
                :disabled="category.required"
                :checked="category.required || service.active"
                v-model="service.active"
                @change="toggleService($event)"
            />
            <div></div>
          </label>
        </div>
        <div class="cookie-manager__selection__item__detail__body">
          <div
              class="cookie-manager__selection__item__detail__description"
              v-if="service.vendor"
          >
            <span
                class="
                cookie-manager__selection__item__detail__description__label
              "
            >{{ $vcm_t("vendor") }}</span
            >
            {{ translate(service.vendor) }}
          </div>
          <div
              class="cookie-manager__selection__item__detail__description"
              v-if="service.description"
          >
            <span
                class="
                cookie-manager__selection__item__detail__description__label
              "
            >{{ $vcm_t("description") }}</span
            >
            {{ translate(service.description) }}
          </div>

          <div
              class="cookie-manager__selection__item__detail__description"
              v-if="service.dataCollected"
          >
            <span
                class="
                cookie-manager__selection__item__detail__description__label
              "
            >{{ $vcm_t("dataCollected") }}</span
            >
            {{ translate(service.dataCollected) }}
          </div>

          <div
              class="cookie-manager__selection__item__detail__description"
              v-if="service.cookies"
          >
            <table class="cookie-manager__selection__item__detail__cookies">
              <tr>
                <th>{{ $vcm_t("name") }}</th>
                <th>{{ $vcm_t("duration") }}</th>
                <th>{{ $vcm_t("description") }}</th>
              </tr>
              <tr v-for="cookie in service.cookies" :key="cookie.name">
                <td>{{ translate(cookie.name) }}</td>
                <td>{{ translate(cookie.duration) }}</td>
                <td>{{ translate(cookie.description) }}</td>
              </tr>
            </table>
          </div>

          <div
              class="cookie-manager__selection__item__detail__description"
              v-if="service.privacyPolicy"
          >
            <a
                class="
                cookie-manager__selection__item__detail__description__label
              "
                :href="service.privacyPolicy"
                target="_blank"
                rel="noopener noreferrer"
            >{{ $vcm_t("linkToPrivacyPolicy") }}</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {isObject} from "../util";
import {mapGetters} from "vuex";

export default {
  name: "Category",
  props: {
    category: Object,
  },
  data() {
    return {
      detailsOpen: false,
      detailsShowMore: this.$vcm_t("showMore"),
      detailsShowLess: this.$vcm_t("showLess"),
    };
  },
  computed: {
    ...mapGetters('vcm', {
      getServicesByCategoryId: 'getServicesByCategoryId'
    }),
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
        return obj[this.$vcm_td.locale] ?? obj;
      }

      return obj;
    }
  },
};
</script>