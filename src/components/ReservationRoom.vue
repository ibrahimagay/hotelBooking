<template>
  <div>
    <div class="reservationInformation">
      <div class="reservationTitle">
        {{ hotelSelectedName }} <span>({{ hotelDetail.city }})</span>
      </div>
      <div class="reservationHistory">
        <span>Giriş Tarihi:</span>
        {{ entryReleaseDateSelected[0] }} -
        <span>Çıkış Tarihi:</span>
        {{ entryReleaseDateSelected[1] }} - <span>Yetişkin:</span>
        {{ adultSelected }} - <span>Çocuk:</span> {{ childrenSelected }}
      </div>
    </div>

    <div class="hotelBox">
      <div class="hotelTitle">Oda Tipi Seçimi</div>
      <div class="row">
        <ul>
          <li
            v-for="roomType in hotelDetail.room_type"
            :key="roomType.id"
            :class="{ active: roomTypeSelected == roomType.id }"
            @click="roomSelected(roomType)"
          >
            <div class="hotelName">{{ roomType.title }}</div>
            <div
              class="bgImage"
              v-bind:style="{
                'background-image': 'url(' + roomType.photo + ')',
              }"
            ></div>
            <div class="hotelDesc">
              <div class="leftText">
                <span>{{ dateDifference }} Gün</span>
                <span>{{ adultSelected }} Yetişkin</span>
              </div>
              <div class="rightText">
                <span class="price"
                  >{{
                    parseFloat(roomType.price * dateDifference * adultSelected)
                      .toFixed()
                      .replace(".", ",")
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                  }}
                  TL</span
                >
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="hotelTitle">Manzara Seçimi</div>
      <div class="row">
        <ul>
          <li
            v-for="roomScenic in hotelDetail.room_scenic"
            :key="roomScenic.id"
            :class="{ active: roomScenicSelected == roomScenic.id }"
            @click="scenicSelected(roomScenic)"
          >
            <div class="hotelName">{{ roomScenic.title }}</div>
            <div
              class="bgImage"
              v-bind:style="{
                'background-image': 'url(' + roomScenic.photo + ')',
              }"
            ></div>
            <div class="hotelDesc">
              <div class="leftText">
                <span>Fiyat Etki Oranı</span>
              </div>
              <div class="rightText">
                <span class="price">{{ roomScenic.price_rate }}%</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="stepNavBox">
      <div class="left">
        <div class="linkBox">
          <a
            href="javascript:;"
            class="backButton blueButton"
            @click="backStep()"
          >
            <span>Geri</span>
          </a>
        </div>
      </div>
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
import moment from "moment";

export default {
  data() {
    return {
      hotelDetail: this.$store.getters.getHotelDetail,
      hotelSelected: this.$store.getters.getHotelSelected,
      hotelSelectedName: this.$store.getters.getHotelSelectedName,
      entryReleaseDateSelected: this.$store.getters.getEntryReleaseDateSelected,
      adultSelected: this.$store.getters.getAdultSelected,
      childrenSelected: this.$store.getters.getChildrenSelected,
      dateDifference: 0,
      roomTypeSelected: this.$store.getters.getRoomTypeSelected,
      roomTypeName: this.$store.getters.getRoomTypeName,
      roomPrice: this.$store.getters.getRoomPrice,
      roomScenicSelected: this.$store.getters.getRoomScenicSelected,
      roomScenicTypeName: this.$store.getters.getRoomScenicName,
      roomScenicPriceRate: this.$store.getters.getRoomScenicPriceRate,
    };
  },
  created() {
    this.dateDifferenceFunc();
  },
  methods: {
    dateDifferenceFunc() {
      let exitDate = moment(this.entryReleaseDateSelected[1], "DD-MM-YYYY");
      let entryDate = moment(this.entryReleaseDateSelected[0], "DD-MM-YYYY");
      this.dateDifference = exitDate.diff(entryDate, "days");
    },
    roomSelected(roomType) {
      this.roomTypeSelected = roomType.id;
      this.roomTypeName = roomType.title;
      this.roomPrice = roomType.price;
      this.$store.commit("setRoomTypeSelected", this.roomTypeSelected);
      this.$store.commit("setRoomTypeName", this.roomTypeName);
      this.$store.commit("setRoomPrice", this.roomPrice);
    },
    scenicSelected(roomScenic) {
      this.roomScenicSelected = roomScenic.id;
      this.roomScenicTypeName = roomScenic.title;
      this.roomScenicPriceRate = roomScenic.price_rate;
      this.$store.commit("setRoomScenicSelected", this.roomScenicSelected);
      this.$store.commit("setRoomScenicTypeName", this.roomScenicTypeName);
      this.$store.commit("setRoomScenicPriceRate", this.roomScenicPriceRate);
    },
    nextStep() {
      if (this.roomTypeSelected != 0 && this.roomScenicSelected != 0) {
        this.$router.push("/preview-payment-transactions");
      } else {
        alert("Oda Tipi ve Manzara Seçimi Zorunludur.");
      }
    },
    backStep() {
      this.$router.push("/");
    },
  },
};
</script>