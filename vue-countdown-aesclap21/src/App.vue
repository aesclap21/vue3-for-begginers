<template>
  <teleport to="#modal">
    <!-- @close-form -> .close-handler in AddUpdateForm component.
         Listening to emit-function ( $emit() ) in child component -->
    <AddUpdateForm
      v-if="showForm"
      @close-form="closeForm()"
      @add-new-event="add($event)"
      @update-event="update($event)"
      :currentEvent="currentEvent"
    />
  </teleport>
  <div class="options">
    <div class="">
      <button
        type="button"
        class="options_btn"
        @click="showPastEvents = !showPastEvents"
      >
          {{ showPastEvents ? "hide past events" : "show past events" }}
      </button>
      <button
        type="button"
        class="options_btn"
        @click="grayModeSet = !grayModeSet"
      >
          {{ grayModeSet ? "&#9788;" : "&#9789;" }}
      </button>
    </div>
    <button
      type="button"
      class="addNew"
      @click="showForm = !showForm"
    >
      {{ showForm ? "&minus;" : "&plus;" }}
    </button>
  </div>
  <ul>
    <!-- setForm() is the event update handler
         1. listening to click-event
         2. triggering setForm-function ( setForm() )
         specified in the scripts methods section
         and parsing on the data of event
         3. calling this.data property called currentEvent
         ( -> this.currentEvent )
         equating it to data of this.event or
         if n/a to empty object ( '{}' ) and then activating showForm
         4. data of currentEvent is parsed on to
         dynamic property ( -> :currentEvent ) of AddUpdateForm replacing the
         placeholders of each input in AddUpdateForm with the respective value
         of currentEvent.input -->
    <li
      v-for="event in orderEvents"
      :key="event.id"
      @click="setForm(event)"
    >
      <Event
        :style="grayModeSet ? grayMode : '' "
        :event="event"
        :daysLeft="daysLeft(event)"
        :showPastEvents="showPastEvents"
        @remove-event="remove($event)"
      />
    </li>
  </ul>
</template>

<script>
const eventData = [
  {
    id: 1,
    name: "Graduation",
    details: "wooohoo!!!",
    date: "2020-09-25",
    background: "#F34949",
  },
  {
    id: 2,
    name: "Holidays",
    details: "wooohoo!!!",
    date: "2021-12-30",
    background: "#FFE2A0",
  },
  {
    id: 3,
    name: "HolidayYYYY",
    details: "Get me outta here!",
    date: "2020-12-20",
    background: "#7AD3F0",
  },
  {
    id: 4,
    name: "Birthday",
    details: "My birthday party",
    date: "2020-12-21",
    background: "#F07AEC",
  },
  {
    id: 5,
    name: "Christmas",
    details: "ho ho ho",
    date: "2020-12-25",
    background: "#EB9A0F",
  },
  {
    id: 6,
    name: "Conference Talk",
    details: "dont flop",
    date: "2021-02-28",
    background: "#68EE94",
  },
  {
    id: 7,
    name: "Last Christmas",
    details: "I gave you my heart",
    date: "2019-12-25",
    background: "#F3A449",
  },
];

import Event from "./components/Event.vue";
import AddUpdateForm from "./components/AddUpdateForm.vue";

export default {
  name: "App",
  components: {
    Event,
    AddUpdateForm,
  },
  data() {
    return {
      grayModeSet: false,
      grayMode: {
        background: "aliceblue",
        color: "#454444"
      },
      events: eventData,
      showPastEvents: true,
      showForm: false,
      currentEvent: {},
    };
  },

  methods: {
    findEventIndex(id) {
      // searching index position of event
      // by looping through all existing elements in $events,
      // calling up their id (-> el.id)
      // and comparing them to the requested event.id
      // then returning event.id
      return this.events.findIndex((el) => el.id === id);
    },
    //removing event handler
    remove(event) {
      this.events.splice(this.findEventIndex(event.id), 1);
    },
    // resetting to empty showForm once close_form is clicked
    closeForm() {
      this.showForm = false;
      this.currentEvent = {};
    },
    // updating existing events
    update(event) {
      this.events[this.findEventIndex(event.id)] = event;
    },
    setForm(event) {
      this.currentEvent = event || {};
      this.showForm = true;
    },

    // adding events
    add(event) {
      event.id = this.events.length + 1;
      this.events.push(event);
    },

    // calculating the days left until event
    daysLeft(event) {
      const Time = Date.parse(event.date) - Date.now();
      const Days = Math.ceil(Time / (1000 * 3600 * 24));
      return Days;
    },
  },
  // ordering events chronologically
  computed: {
    orderEvents () {
      const eventsToOrder = this.events;
      return eventsToOrder.sort((a, b) => a.date > b.date ? 1 : -1);
    },
  },
};
</script>

<style >
  body {
      background: linear-gradient(to bottom, darkslategray -10%, lightgrey 110%);
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
  }

  ul {
    padding: 0;
  }

  li {
    list-style: none;
    cursor: pointer;
  }

  .options {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .addNew {
    font-size: 3rem;
    color: rgb(220, 200, 200);
    cursor: pointer;
    background: none;
    border: none;
    opacity: 0.6;
    transition: 0.3s;
  }

  .options_btn {
    border: 1px solid;
    background: transparent;
    border-radius: 0.3rem;
    color: whitesmoke;
    padding: 0.5rem 1rem;
    margin-right: 10px;
    font-weight: bold;
    opacity: 0.6;
    transition: 0.3s;
    cursor: pointer;
  }

  button:focus {
    outline: 0;
  }

  button:hover {
    opacity: 1;
  }

</style>
