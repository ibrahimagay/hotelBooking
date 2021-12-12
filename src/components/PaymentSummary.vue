<template>
  <div class="paymentSummary" :class="{ w100: paymentSummaryFull }">
    <div class="reservationTitle">
      {{ hotelSelectedName }} <span>({{ hotelDetail.city }})</span>
    </div>
    <ul class="reservationSummary">
      <li>
        <strong>Giriş Tarihi:</strong>
        <span>{{ entryReleaseDateSelected[0] }}</span>
      </li>
      <li>
        <strong>Çıkış Tarihi:</strong>
        <span>{{ entryReleaseDateSelected[1] }}</span>
      </li>
      <li>
        <strong>Yetişkin:</strong>
        <span>{{ adultSelected }}</span>
      </li>
      <li>
        <strong>Çocuk:</strong>
        <span>{{ childrenSelected }}</span>
      </li>
      <li>
        <strong>Oda Tipi:</strong>
        <span>{{ roomTypeName }}</span>
      </li>
      <li>
        <strong>Manzara:</strong>
        <span>{{ roomScenicTypeName }}</span>
      </li>
    </ul>
    <div class="couponBox" v-show="!paymentSummaryFull">
      <input
        type="tel"
        name="couponCode"
        id="couponCode"
        class="couponCode"
        v-model="couponCode"
        placeholder="Kupon Kodu"
        maxlength="7"
        autocomplete="off"
      />
      <div class="linkBox">
        <a href="javascript:;" class="blueButton" @click="couponCodeFunc()">
          <span>Kodu Kullan</span>
        </a>
      </div>
    </div>
    <div class="priceBox">
      <div class="generalList roomPrice">
        <strong>Oda Fiyatı</strong>
        <span>{{ roomPriceShow }} TL</span>
      </div>
      <div class="generalList priceImpactRatio">
        <strong>Fiyat Etki Oranı</strong>
        <span>%{{ roomScenicPriceRate }}</span>
      </div>
      <div class="generalList accomodation">
        <strong
          >Konaklama <label>({{ dateDifference }} Gün)</label></strong
        >
        <span>{{ accommodationPriceShow }} TL</span>
      </div>
      <div class="generalList" v-show="discountStatus">
        <strong
          >İndirim <label>({{ couponCodeTitle }})</label></strong
        >
        <span>-{{ couponDiscountAmmount }} TL</span>
      </div>
      <div class="totalPrice">
        <span>TOPLAM TUTAR</span>
        <strong>{{ totalPriceShow }} TL</strong>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      hotelDetail: this.$store.getters.getHotelDetail,
      hotelSelectedName: this.$store.getters.getHotelSelectedName,
      entryReleaseDateSelected: this.$store.getters.getEntryReleaseDateSelected,
      adultSelected: this.$store.getters.getAdultSelected,
      childrenSelected: this.$store.getters.getChildrenSelected,
      roomTypeName: this.$store.getters.getRoomTypeName,
      roomPrice: this.$store.getters.getRoomPrice,
      roomScenicTypeName: this.$store.getters.getRoomScenicTypeName,
      roomScenicPriceRate: this.$store.getters.getRoomScenicPriceRate,
      couponCode: "",
      couponCodeTitle: this.$store.getters.getCouponCodeTitle,
      couponDiscountAmmount: this.$store.getters.getCouponDiscountAmmount,
      discountStatus: this.$store.getters.getDiscountStatus,
      dateDifference: 0,
      totalPrice: this.$store.getters.getTotalPrice,
      accommodationPrice: 0,
      paymentSummaryFull: false,
    };
  },
  created() {
    this.dateDifferenceFunc();
    this.totalPriceFunc();
    switch (this.$route.name) {
      case "ReservationSuccessful":
        this.paymentSummaryFull = true;
        break;
      default:
        break;
    }
  },
  methods: {
    couponCodeFunc() {
      if (this.couponCode != "") {
        axios
          .get(
            `https://5f6d939160cf97001641b049.mockapi.io/tkn/coupons?code=${this.couponCode}`
          )
          .then((response) => {
            if (response.data.length > 0) {
              let liveDate = moment(new Date(), "YYYY-MM-DD");
              let couponExpirationAt = response.data[0].expiration_at;
              let couponDifference = liveDate.diff(couponExpirationAt, "days");
              if (couponDifference < 0) {
                this.couponCodeTitle = response.data[0].code;
                this.couponDiscountAmmount = response.data[0].discount_ammount;
                this.discountStatus = true;
                this.totalPriceFunc();
                this.$store.commit("setCouponCodeTitle", this.couponCodeTitle);
                this.$store.commit(
                  "setCouponDiscountAmmount",
                  this.couponDiscountAmmount
                );
                this.$store.commit("setDiscountStatus", this.discountStatus);
              } else {
                alert("Kupon Kodunun Son Kullanılma Tarihi Geçmiştir.");
                this.couponCodeTitle = "";
                this.couponDiscountAmmount = 0;
                this.discountStatus = false;
                this.totalPriceFunc();
                this.$store.commit("setCouponCodeTitle", this.couponCodeTitle);
                this.$store.commit(
                  "setCouponDiscountAmmount",
                  this.couponDiscountAmmount
                );
                this.$store.commit("setDiscountStatus", this.discountStatus);
              }
            } else {
              alert("Karşılığı Olmayan Kupon Kodu Girildi.");
              this.couponCodeTitle = "";
              this.couponDiscountAmmount = 0;
              this.discountStatus = false;
              this.totalPriceFunc();
              this.$store.commit("setCouponCodeTitle", this.couponCodeTitle);
              this.$store.commit(
                "setCouponDiscountAmmount",
                this.couponDiscountAmmount
              );
              this.$store.commit("setDiscountStatus", this.discountStatus);
            }
          });
      } else {
        alert("Kupon Kodu Boş Bırakılamaz");
        this.couponCodeTitle = "";
        this.couponDiscountAmmount = 0;
        this.discountStatus = false;
        this.totalPriceFunc();
        this.$store.commit("setCouponCodeTitle", this.couponCodeTitle);
      }
    },
    dateDifferenceFunc() {
      let exitDate = moment(this.entryReleaseDateSelected[1], "DD-MM-YYYY");
      let entryDate = moment(this.entryReleaseDateSelected[0], "DD-MM-YYYY");
      this.dateDifference = exitDate.diff(entryDate, "days");
    },
    totalPriceFunc() {
      let accommodationPrice =
        this.roomPrice * this.dateDifference * this.adultSelected;
      this.accommodationPrice = accommodationPrice;
      let totalPriceBefore =
        accommodationPrice * (1 + "." + this.roomScenicPriceRate);
      this.totalPrice = totalPriceBefore - this.couponDiscountAmmount;
      this.$store.commit(
        "setTotalPrice",
        parseFloat(this.totalPrice).toFixed()
      );
    },
  },
  computed: {
    roomPriceShow() {
      return parseFloat(this.roomPrice)
        .toFixed()
        .replace(".", ",")
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    accommodationPriceShow() {
      return parseFloat(this.accommodationPrice)
        .toFixed()
        .replace(".", ",")
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    totalPriceShow() {
      return parseFloat(this.totalPrice)
        .toFixed()
        .replace(".", ",")
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>