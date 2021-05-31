<template>
  <div class="create-event px-5">
    <FormulateForm
      v-model="values"
      #default="{ hasErrors }"
      @submit="submissionHandler"
    >
      <div class="d-flex flex-row flex-wrap">
        <div class="d-flex flex-column flex-wrap mx-4 my-2">
          <FormulateInput
            type="text"
            name="name"
            placeholder="The Amazing Event"
            label="Event Name"
            validation="bail|required"
          />
          <FormulateInput
            type="text"
            name="tagline"
            placeholder="Event of the century"
            label="TagLine"
          />
          <FormulateInput
            type="text"
            name="description"
            placeholder="This event is where you want to be"
            label="Description"
            validation="bail|required"
          />
          <FormulateInput
            type="text"
            name="currency"
            placeholder="IDR"
            label="Currency"
            validation="bail|required"
          />
          <FormulateInput
            type="image"
            name="logo"
            label="Your Logo"
            :uploader="uploadFile"
            validation="mime:image/jpeg,image/png,image/gif"
          />
          <FormulateInput
            type="number"
            name="maxTickets"
            label="Max. Tickets"
            validation="optional|number|min:1,value"
            @change="
              (e) => $set(values, 'unlimitedTickets', !(e.target.value > 0))
            "
          />
          <FormulateInput
            type="datetime-local"
            name="rsvpDeadline"
            label="RSVP Deadline"
            :validation="'^optional|after:' + new Date()"
            @change="
              (e) =>
                $set(values, 'hasRsvp', new Date(e.target.value) >= new Date())
            "
          />
          <FormulateInput type="hidden" name="unlimitedTickets" :value="true" />
          <FormulateInput type="hidden" name="hasRsvp" :value="false" />
        </div>
        <div class="d-flex flex-column flex-wrap mx-3 my-2">
          <FormulateInput
            type="group"
            name="schedule"
            validation="min:1,length"
            :repeatable="true"
            label="Schedule"
            add-label="+ Add sechedule"
            #default="{ index }"
          >
            <FormulateInput
              type="text"
              name="name"
              label="Name"
              validation="required"
            />
            <FormulateInput
              type="text"
              name="description"
              label="Description"
              validation="required"
            />
            <FormulateInput
              type="datetime-local"
              name="startTime"
              label="Start Time"
              :validation="'^required|after:' + new Date()"
              @submit="
                (e) => {
                  $set(
                    values.schedule[index],
                    'startTime',
                    new Date(e.target.value)
                  );
                }
              "
            />
            <FormulateInput
              type="datetime-local"
              name="endTime"
              :validation="
                '^optional|after:' +
                (values &&
                values.schedule &&
                values.schedule[index] &&
                values.schedule[index].startTime
                  ? values.schedule[index].startTime
                  : new Date())
              "
              label="End Time"
              @change="
                (e) =>
                  $set(
                    values.schedule[index],
                    'allDay',
                    !(new Date(e.target.value) >= new Date())
                  )
              "
              @submit="
                (e) => {
                  $set(
                    values.schedule[index],
                    'endTime',
                    new Date(e.target.value)
                  );
                }
              "
            />
            <FormulateInput
              type="text"
              name="place"
              label="Place"
              validation="required"
            />
            <FormulateInput type="hidden" name="allDay" :value="true" />
          </FormulateInput>
        </div>
        <div class="d-flex flex-column flex-wrap mx-3 my-2">
          <FormulateInput
            type="group"
            name="ticketTypes"
            validation="min:1,length"
            :repeatable="true"
            label="Ticket Type"
            add-label="+ Add ticket type"
          >
            <FormulateInput
              type="text"
              name="name"
              label="Name"
              validation="required"
            />
            <FormulateInput
              type="number"
              name="price"
              label="Price"
              validation="^required|number"
            />
            <FormulateInput
              type="group"
              name="attributes"
              :repeatable="true"
              label="Ticket Type Attributes"
              add-label="+ Add attribute"
            >
              <FormulateInput type="text" name="name" label="Name" />
              <FormulateInput
                type="group"
                name="values"
                label="Ticket Type Attribute Values"
                :repeatable="true"
                add-label="+ Add value"
              >
                <FormulateInput type="text" name="value" label="Value" />
              </FormulateInput>
            </FormulateInput>
          </FormulateInput>
        </div>
        <div class="d-flex flex-column flex-wrap mx-3 my-2">
          <label class="typo__label">Tags</label>
          <multiselect
            v-model="values.tags"
            tag-placeholder="Add this as new tag"
            placeholder="Search or add a tag"
            label="name"
            track-by="name"
            :options="availableTags"
            :multiple="true"
            :taggable="true"
            @tag="addTag"
          ></multiselect>
        </div>
        <div class="d-flex justify-content-center mx-auto my-2 w-100">
          <FormulateInput
            type="submit"
            label="Submit New Event"
            :disabled="hasErrors"
          />
        </div>
      </div>
    </FormulateForm>
  </div>
</template>

<script>
import EventService from "../../../services/event.service";
import Multiselect from "vue-multiselect";

export default {
  name: "create-event",
  components: {
    Multiselect
  },
  data() {
    return {
      values: { tags: [] }
    };
  },
  computed: {
    availableTags() {
      return this.tags instanceof Array
        ? this.tags.map((t) => ({ name: t.name }))
        : [];
    }
  },
  asyncComputed: {
    async tags() {
      try {
        let res = await EventService.getAllTags();
        return res.data.tags;
      } catch (err) {
        console.warn(err);
      }
    }
  },
  methods: {
    log(v) {
      console.log(v);
    },
    async uploadFile(file, progress) {
      console.log(file);
      progress(100);
      return Promise.resolve({});
    },
    submissionHandler() {
      const formData = new FormData();
      let hasLogo = false;
      this.values.schedule.forEach((s) => {
        s.startTime = new Date(s.startTime).toISOString();
        if (s.endTime) s.endTime = new Date(s.endTime).toISOString();
      });
      this.values.ticketTypes.forEach((t) => {
        t.price = Number.parseInt(t.price);
      });
      if (this.values.logo) {
        formData.append("logo", this.values.logo.files[0].file);
        hasLogo = true;
        this.values.logo = undefined;
        delete this.values.logo;
      }
      if (this.values.maxTickets && this.values.maxTickets > 0) {
        this.values.maxTickets = Number.parseInt(this.values.maxTickets);
        this.values.unlimitedTickets = false;
      } else {
        this.values.unlimitedTickets = true;
      }
      if (this.values.rsvpDeadline) {
        this.values.rsvpDeadline = new Date(
          this.values.rsvpDeadline
        ).toISOString();
        this.values.hasRsvp = false;
      } else {
        this.values.hasRsvp = true;
      }
      EventService.createEvent(this.values)
        .then((res) => {
          if (
            res &&
            res.data &&
            res.data.event &&
            res.data.event.id &&
            hasLogo
          ) {
            EventService.newLogo(res.data.event.id, formData, {
              "Content-Type": "multipart/form-data"
            })
              .then((r) => console.log(r))
              .catch((e) => console.warn(e));
          }
        })
        .catch((e) => console.warn(e));
    },
    addTag(newTag) {
      this.values.tags.push(newTag);
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped>
.create-event {
  text-align: initial;
}

@media (min-width: 420px) {
  .double-wide {
    display: flex;
  }
  .double-wide .formulate-input {
    flex-grow: 1;
    width: calc(50% - 0.5em);
  }
  .double-wide .formulate-input:first-child {
    margin-right: 0.5em;
  }
  .double-wide .formulate-input:last-child {
    margin-left: 0.5em;
  }
}

.tag-item {
  border: 1px solid black;
  font-size: 0.8em;
  font-weight: 400;
  padding: {
    top: 0.2em;
    bottom: 0.2em;
    left: 0.6em;
    right: 0.6em;
  }
}

.row-data {
  background-color: #efefef;
  border-radius: 0.4em;
  padding: {
    left: 1.2em;
    right: 1.2em;
    top: 0.5em;
    bottom: 0.5em;
  }
  box-shadow: 0 2px 2px rgba($color: #000000, $alpha: 0.2);
}

.jtiket .row-data:nth-child(odd) {
  background-color: #fff;
}
</style>