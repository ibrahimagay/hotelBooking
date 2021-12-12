<template>
  <div class="paymentSucces">
    <PaymentSuccesMessage />
    <PaymentSummary />
  </div>
</template>

<script>
import PaymentSuccesMessage from "@/components/PaymentSuccesMessage.vue";
import PaymentSummary from "@/components/PaymentSummary.vue";
export default {
  name: "ReservationSuccessful",
  components: {
    PaymentSuccesMessage,
    PaymentSummary,
  },
};
</script>