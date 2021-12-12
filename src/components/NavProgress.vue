<template>
  <div class="navProgress" v-show="navBarNone">
    <ul>
      <li :class="{ active: dateSelect }">
        <div class="iconBox">
          <i class="date_icon"></i>
        </div>
        <div class="iconTitle">
          Otel ve Tarih <br />
          Seçimi
        </div>
      </li>
      <li :class="{ active: roomSelect }">
        <div class="iconBox">
          <i class="room_icon"></i>
        </div>
        <div class="iconTitle">
          Oda Tipi ve Manzara <br />
          Seçimi
        </div>
      </li>
      <li :class="{ active: paymentSelect }">
        <div class="iconBox">
          <i class="credit_icon"></i>
        </div>
        <div class="iconTitle">
          Önizleme ve Ödeme <br />
          İşlemleri
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dateSelect: false,
      roomSelect: false,
      paymentSelect: false,
      navBarNone: true,
    };
  },
  computed: {
    queryPath() {
      return this.$route.name;
    },
  },
  watch: {
    queryPath: function (val) {
      switch (val) {
        case "HotelDateSelection":
          this.dateSelect = true;
          this.roomSelect = false;
          this.paymentSelect = false;
          this.navBarNone = true;
          break;

        case "RoomTypeViewSelection":
          this.dateSelect = false;
          this.roomSelect = true;
          this.paymentSelect = false;
          this.navBarNone = true;
          break;

        case "PreviewPaymentTransactions":
          this.dateSelect = false;
          this.roomSelect = false;
          this.paymentSelect = true;
          this.navBarNone = true;
          break;
        case "ReservationSuccessful":
          this.navBarNone = false;
          break;

        case "ReservationCancel":
          this.navBarNone = false;
          break;
        default:
          break;
      }
    },
  },
};
</script>