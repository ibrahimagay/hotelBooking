<template>
  <div>
    <div class="reservationBox">
      <div class="top">
        <select
          name="hotel_select"
          id="hotel_select"
          v-model="hotelSelected"
          @change="hotelListSelected()"
        >
          <option
            value="Rezervasyon Yapmak İstediğiniz Oteli Seçiniz."
            disabled
          >
            Rezervasyon Yapmak İstediğiniz Oteli Seçiniz.
          </option>
          <option v-for="hotel in hotelList" :key="hotel.id" :value="hotel.id">
            {{ hotel.hotel_name }}
          </option>
        </select>
      </div>
      <div class="bottom">
        <ul>
          <li>
            <div class="title">Giriş Tarihi - Çıkış Tarihi</div>
            <date-picker
              v-model="entryReleaseDateSelected"
              value-type="DD-MM-YYYY"
              format="DD-MM-YYYY"
              type="date"
              :disabled-date="dateRange"
              range
              class="entryReleaseDate"
              placeholder="Giriş Tarihi - Çıkış Tarihi"
              @change="reservationSelected()"
            ></date-picker>
          </li>
          <li>
            <div class="title">Yetişkin Sayısı</div>
            <select
              name="adults_select"
              id="adults_select"
              v-model="adultSelected"
              @change="reservationSelected()"
            >
              <option value="0">0</option>
              <option v-for="adults in adultSize" :key="adults" :value="adults">
                {{ adults }}
              </option>
            </select>
          </li>
          <li>
            <div class="title">Çocuk Sayısı</div>
            <select
              name="children_select2"
              id="children_select"
              v-model="childrenSelected"
              :disabled="childrenStatus"
              @change="reservationSelected()"
            >
              <option value="0">0</option>
              <option
                v-for="children in childrenSize"
                :key="children"
                :value="children"
              >
                {{ children }}
              </option>
            </select>
            <div class="message" :class="{ active: childrenStatus == true }">
              Çocuk ziyaretçi kabul edilmiyor!
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="stepNavBox">
      <div class="left"></div>
      <div class="right">
        <div class="linkBox">
          <a
            href="javascript:;"
            class="savaNextButton blueButton"
            @click="nextStep()"
          >
            <span>Kaydet ve Devam Et</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getHotelList } from "@/service/";
import { getHotelDetail } from "@/service/";
import { getHotelSelectedName } from "@/service/";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  name: "ReservationSelection",
  components: {
    DatePicker,
  },
  data() {
    return {
      hotelList: [],
      hotelDetail: this.$store.getters.getHotelDetail,
      hotelSelected: this.$store.getters.getHotelSelected,
      hotelSelectedName: this.$store.getters.getHotelSelectedName,
      entryReleaseDateSelected: this.$store.getters.getEntryReleaseDateSelected,
      adultSize: this.$store.getters.getAdultSize,
      adultSelected: this.$store.getters.getAdultSelected,
      childrenSize: 5,
      childrenSelected: this.$store.getters.getChildrenSelected,
      childrenStatus: this.$store.getters.childrenStatus,
    };
  },
  created() {
    this.getHotelList();
  },
  methods: {
    dateRange(date) {
      var today = new Date().getTime() - 1 * 24 * 3600 * 1000;
      return date <= today;
    },
    async getHotelList() {
      let hotelList = await getHotelList();
      this.hotelList = hotelList.data;
    },
    async getHotelDetail() {
      let hotelDetail = await getHotelDetail();
      this.adultSelected = 0;
      this.childrenSelected = 0;
      this.hotelDetail = hotelDetail.data;
      this.adultSize = hotelDetail.data.max_adult_size;
      this.childrenStatus = !hotelDetail.data.child_status;
      this.$store.commit("setAdultSelected", this.adultSelected);
      this.$store.commit("setChildrenSelected", this.childrenSelected);
      this.$store.commit("setHotelDetail", this.hotelDetail);
      this.$store.commit("setAdultSize", this.adultSize);
      this.$store.commit("setChildrenStatus", this.childrenStatus);
      this.$store.commit("setHotelSelected", this.hotelSelected);
      this.$store.commit("setHotelSelectedName", this.hotelSelectedName);
    },
    async getHotelSelectedName() {
      let hotelSelectedName = await getHotelSelectedName();
      this.hotelSelectedName = hotelSelectedName.data.hotel_name;
      this.$store.commit("setHotelSelectedName", this.hotelSelectedName);
    },
    reservationSelected() {
      this.$store.commit(
        "setEntryReleaseDateSelected",
        this.entryReleaseDateSelected
      );
      this.$store.commit("setAdultSelected", this.adultSelected);
      this.$store.commit("setChildrenSelected", this.childrenSelected);
    },
    hotelListSelected() {
      let hotelSelected = this.hotelSelected;
      this.hotelSelected = hotelSelected;
      this.$store.commit("setHotelSelected", this.hotelSelected);
      this.getHotelDetail();
      this.getHotelSelectedName();
    },
    nextStep() {
      if (
        this.hotelSelected != "Rezervasyon Yapmak İstediğiniz Oteli Seçiniz." &&
        this.entryReleaseDateSelected != "" &&
        this.adultSelected != 0
      ) {
        this.$router.push("/room-type-view-selection");
      } else {
        alert("Hotel, Giriş ve Çıkış Tarihi ve Yetişkin Seçimi Zorunludur.");
      }
    },
  },
};
</script>
