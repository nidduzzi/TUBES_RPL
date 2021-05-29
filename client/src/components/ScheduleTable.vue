<template>
  <div class="scheduletable">
    <table class="table table-striped text-center">
      <thead>
        <tr>
          <th>No.</th>
          <th>Name</th>
          <th>Place</th>
          <th>Start Date</th>
          <th>End Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(schedule, i) in schedules" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ schedule.name }}</td>
          <td>{{ schedule.place }}</td>
          <td>{{ schedule.startDateTime }}</td>
          <td>{{ schedule.endDateTime }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "scheduletabel",
  props: { schedule: Array },
  data: function () {
    return {
      schedules: this.schedule,
    };
  },
  created() {
    this.schedules.forEach((s) => {
      s.startDateTime = new Date(s.startTime).toString();
      s.endDateTime = s.allDay ? "-" : new Date(s.endTime).toString();
      s.place = s.place ? s.place : "-";
    });
  },
};
</script>
