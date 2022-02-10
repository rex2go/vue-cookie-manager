<template>
  <div class="cookie-manager__selection__item" :class="{'cookie-manager__selection__item--details-open': detailsOpen}" @click="detailsOpen = !detailsOpen">
    <div class="cookie-manager__selection__item__head">
      {{ translate(category.name) }}
    </div>
    <div class="cookie-manager__selection__item__info">
      {{ translate(category.description) }}
    </div>
    <div class="cookie-manager__selection__item__consent">
      <span>{{
          detailsOpen ? $vcm_t("showLess") : $vcm_t("showMore")
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
import {mapGetters, mapState} from "vuex";

export default {
  name: "Category",
  props: {
    category: Object,
  },
  data() {
    return {
      detailsOpen: false,
    };
  },
  computed: {
    ...mapState('vcm', {
      locale: 'locale',
    }),
    ...mapGetters('vcm', {
      getServicesByCategoryId: 'getServicesByCategoryId',
      $vcm_t: 'translate',
    }),
  },
  methods: {
    toggleCategory(category) {
      this.getServicesByCategoryId(category.id).forEach((service) => (service.active = category.active));
    },
    toggleService(event) {
      if (event.target.checked && !this.category.active) {
        this.category.active = true;
      } else if (!this.getServicesByCategoryId(this.category.id).filter((service) => service.active).length) {
        this.category.active = false;
      }
    },
    translate(obj) {
      if (isObject(obj)) {
        return obj[this.locale] ?? obj['en'] ?? obj;
      }

      return obj;
    }
  },
};
</script>