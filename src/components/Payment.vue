<template>
  <div>
    <div class="paymentBox">
      <div class="credit">
        <div class="creditCard" :class="creditCartActive">
          <div class="front">
            <div class="top">
              <div class="creditCardText">Credit<i>Card</i></div>
              <div class="creditCardLogo"></div>
            </div>
            <div class="creditCardNumber">
              <input
                type="text"
                :placeholder="card_number_mask"
                v-model="card_number"
                disabled
              />
            </div>
            <div class="creditCardName">
              <input
                type="text"
                placeholder="##### #######"
                v-model="card_name"
                disabled
              />
            </div>
            <div class="bottom">
              <input
                type="text"
                placeholder="##"
                v-model="card_date_month"
                disabled
              />
              <span>/</span>
              <input
                type="text"
                placeholder="####"
                v-model="card_date_year"
                disabled
              />
            </div>
          </div>
          <div class="back">
            <div class="top"></div>
            <div class="center">
              <input
                type="text"
                :placeholder="card_cvv_mask"
                v-model="card_cvv"
                disabled
              />
            </div>
            <div class="bottom">
              <div class="creditCardLogo"></div>
            </div>
          </div>
        </div>
        <div class="creditCardForm">
          <div class="formTitle">Kredi Kartı Bilgileri</div>
          <ul>
            <li>
              <div class="title">Kart Üzerindeki İsim</div>
              <input
                type="text"
                name="cardName"
                id="cardName"
                class="cardName"
                minlength="30"
                maxlength="30"
                v-model="card_name"
                placeholder="Kartın Üzerindeki İsim Giriniz"
                autocomplete="off"
              />
            </li>
            <li>
              <div class="title">Kart Numarası</div>
              <input
                type="tel"
                name="cardNumber"
                id="cardNumber"
                class="cardNumber"
                minlength="19"
                maxlength="19"
                v-model="card_number"
                v-mask="card_number_mask"
                placeholder="Kartın Numarasını Giriniz"
                autocomplete="off"
              />
            </li>
            <li class="flexRow">
              <div class="box">
                <div class="title">Kart Son Kullanma Tarihi</div>
                <select
                  name="month"
                  class="month"
                  id="month"
                  v-model="card_date_month"
                >
                  <option value="">Ay</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="06">06</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
                <select
                  name="year"
                  class="year"
                  id="year"
                  v-model="card_date_year"
                >
                  <option value="">Yıl</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                </select>
              </div>
              <div class="box boxCvv">
                <div class="title">CVV</div>
                <input
                  type="tel"
                  name="cardCvv"
                  id="cardCvv"
                  class="cardCvv"
                  v-model="card_cvv"
                  placeholder="CVV Giriniz"
                  minlength="3"
                  maxlength="3"
                  autocomplete="off"
                  v-mask="card_cvv_mask"
                  @focusin="creditBack"
                  @focusout="creditFront"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <PaymentSummary />
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
            class="finishButton blueButton"
            @click="finishStep()"
          >
            <span>Ödeme Yap ve Bitir</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import VueMask from "v-mask";

Vue.use(VueMask);

import PaymentSummary from "@/components/PaymentSummary.vue";

export default {
  name: "Payment",
  components: {
    PaymentSummary,
  },
  data() {
    return {
      card_number_mask: "#### #### #### ####",
      card_cvv_mask: "####",
      creditCartActive: "",
      card_name: "",
      card_number: "",
      card_date_month: "",
      card_date_year: "",
      card_cvv: "",
      postId: this.$store.getters.getPostId,
      postIdStatus: this.$store.getters.getPostIdStatus,
    };
  },
  methods: {
    creditFront() {
      this.creditCartActive = "";
    },
    creditBack() {
      this.creditCartActive = "active";
    },
    finishStep() {
      if (
        this.card_name != "" &&
        this.card_number != "" &&
        this.card_number.length == "19" &&
        this.card_date_month != "" &&
        this.card_date_year != "" &&
        this.card_cvv != "" &&
        this.card_cvv.length == "3"
      ) {
        let paymentPost = {
          hotel_id: this.$store.getters.getHotelSelected,
          start_date: this.$store.getters.getEntryReleaseDateSelected[0],
          end_date: this.$store.getters.getEntryReleaseDateSelected[1],
          adult: this.$store.getters.getAdultSelected,
          child: this.$store.getters.getChildrenSelected,
          room_type: this.$store.getters.getRoomTypeSelected,
          room_scenic: this.$store.getters.getRoomScenicSelected,
          price: this.$store.getters.getTotalPrice,
          coupon_code: this.$store.getters.getCouponCodeTitle,
          card_name: this.card_name,
          card_number: this.card_number.replace(/ /g, ""),
          card_date_month: this.card_date_month,
          card_date_year: this.card_date_year,
          card_cvv: this.card_cvv,
        };
        if (!this.postIdStatus) {
          axios
            .post(
              "https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-bookings",
              paymentPost
            )
            .then((res) => {
              this.postId = res.data.id;
              this.$store.commit("setPostId", this.postId);
              this.$router.push("/reservation-successful");
            });
        } else {
          axios
            .put(
              `https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-bookings/${this.postId}`,
              paymentPost
            )
            .then(() => {
              this.$router.push("/reservation-successful");
            });
        }
      } else {
        alert("Kredi Kartı alanını Eksiksiz Doldurunuz.");
      }
    },
    backStep() {
      this.$router.push("/room-type-view-selection");
    },
  },
};
</script>