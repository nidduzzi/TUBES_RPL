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
          <td>{{ i }}</td>
          <td>{{ ticketType.name }}</td>
          <td>{{ ticketType.price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "ticketTypeTable",
  props: ["ticketTypes"],
};
</script>

<style lang="scss" scoped></style>
