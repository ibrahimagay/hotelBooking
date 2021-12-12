<template>
  <div id="app">
    <Header />
    <section class="content">
      <div class="container">
        <NavProgress />
        <router-view/>
      </div>
    </section>
  </div>
</template>


<script>
import Header from "@/components/Header.vue";
import NavProgress from "@/components/NavProgress.vue";
export default {
  name: "Home",
  components: {
    Header,
    NavProgress,
  }
};
</script>