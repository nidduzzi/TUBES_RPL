<template>
  <div class="report container p-5">
    <h3 class="mb-4 text-left">Laporan</h3>
    <hr />
    <table class="text-left" cellpadding="9">
      <tr>
        <td>
          <h4>Event</h4>
        </td>
        <td>
          <button
            @click="reportEvent"
            name=""
            id=""
            class="btn btn-secondary btn-sm"
            href="#"
            role="button"
          >
            <i class="fa fa-download" aria-hidden="true"></i> Unduh
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import EventService from "../../../services/event.service";
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

export default {
  name: "report",
  data() {
    return {
      eventData: []
    };
  },
  methods: {
    reportEvent() {
      const p = {
        q: {},
        h: {}
      };
      EventService.getEvents(p)
        .then((res) => {
          if (res.status === 200) {
            this.eventData = res.data.events;
          }
        })
        .then(() => {
          const doc = new jsPDF();
          const data = this.eventData.map((el) => {
            const date = moment(el.rsvpDeadline).format(
              "ddd, DD-MM-YYYY hh:mm"
            );
            return [el.name, el.maxTickets, el.description, el.tagline, date, el.status];
          });

          doc.autoTable({
            head: [
              [
                "Acara",
                "Maksimum Tiket",
                "Tagline",
                "Deskripsi",
                "Deadline Konfirmasi",
                "Status"
              ]
            ],
            body: data
          });

          doc.save("event-report.pdf");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>