<template>
  <div class="ticketTypeTable">
    <table class="table table-striped text-center">
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Jenis Tiket</th>
          <th scope="col">Harga</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ticketType, i) in ticketTypes" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ ticketType.name }}</td>
          <td>{{ currencyFormat(ticketType.price) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "ticketTypeTable",
  props: ["ticketTypes", "currency"],
  methods: {
    currencyFormat(n) {
      n = parseInt(n);
      return Intl.NumberFormat("en-US", {
        style: "currency",
        currency: this.currency
      }).format(n);
    }
  }
};
</script>

<style lang="scss" scoped></style>
