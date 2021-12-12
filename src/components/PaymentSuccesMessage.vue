<template>
  <div class="paymentMessage">
    <i class="date_icon"></i>
    <div class="succesTitle">Rezervasyon kaydınız alınmıştır.</div>
    <div class="succesDesc">
      Rezervasyon özetiniz aşağıdaki gibidir. Rezervasyon kaydınızda değişiklik
      veya yeni rezervasyon yapmak için aşağıdaki linkleri kullanabilirsiniz.
    </div>
    <div class="linkBox">
      <a href="javascript:;" class="blueButton" @click="newReservation()">
        <span>Yeni Rezervasyon Yap</span>
      </a>
      <a href="javascript:;" class="blueButton" @click="updateReservation()">
        <span>Rezervasyonu Güncelle</span>
      </a>
      <a href="javascript:;" class="blueButton" @click="cancelReservation()">
        <span>Rezervasyonu İptal Et</span>
      </a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      postId: this.$store.getters.getPostId,
      postIdStatus: this.$store.getters.getPostIdStatus,
    };
  },
  methods: {
    newReservation() {
      this.$store.commit("clearStore");
      this.$router.push("/");
    },
    updateReservation() {
      this.postIdStatus = true;
      this.$store.commit("setPostIdStatus", this.postIdStatus);
      this.$router.push("/");
    },
    cancelReservation() {
      var confirmData = confirm(
        "Rezervasyon kaydınızı iptal etmek istediğinize emin misiniz?"
      );
      if (confirmData == true) {
        axios
          .delete(
            `https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-bookings/${this.postId}`
          )
          .then(() => {
            this.$router.push("/reservation-cancel");
            this.$store.commit("clearStore");
          });
      }else{
        console.log(confirmData);
      }
    },
  },
};
</script>