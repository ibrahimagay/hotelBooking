<template>
  <div>
    <header class="header">
      <div class="container">
        <div class="left">
          <div class="logo">Otel</div>
          <div class="logoSubDesc">Rezervasyon Sistemi</div>
        </div>
        <div class="right">
          <div class="linkBox">
            <a href="javascript:;" @click="newReservation()">
              <span>Yeni Rezervasyon Yap</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  methods: {
    newReservation() {
      this.$store.commit("clearStore");
      this.$router.push("/")
    },
  },
};
</script>