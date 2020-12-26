<template>
  <div class="form_wrapper">
    <form
      @keyup.enter.prevent="validate()"
      @keyup.esc.prevent="$emit('close-form')"
    >
      <!-- emit-function ( $emit('arg') ) pushing argument to parent
           component -->
      <div class="errors" v-if="errors.length > 0">
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </div>
      <div class="close">
        <span @click="$emit('close-form')">&#10060;</span>
      </div>
      <div class="input_wrapper">
        <div class="input">
          <label for="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            v-model="event.name"
          >
        </div>
        <div class="input">
          <label for="details">Details:</label>
          <input
            type="text"
            name="details"
            id="details"
            placeholder="Details"
            v-model="event.details"
          >
        </div>
        <div class="input">
          <label for="date">Date:</label>
          <input type="date" name="date" id="date" v-model="event.date">
        </div>
        <div class="input">
          <label for="background">Background:</label>
          <select id="background" v-model="event.background">
            <option value="#F34949">Red</option>
            <option value="#FFE2A0">Beige</option>
            <option value="#7AD3F0">Blue</option>
            <option value="#F07AEC">Pink</option>
            <option value="#EB9A0F">Orange</option>
            <option value="#68EE94">Green</option>
            <option value="#F3A449">Brown</option>
          </select>
        </div>
      </div>
      <div class="">
        <!-- @click.prevent ≙ type="button": ø automatischen events -->
        <!-- 1. checking if currentEvent already exist by searching for
             currentEvent.id
             2. calling up validate-function type 'update' if currentEvent
             allready exists or else type 'add' -->
        <button
          v-if="currentEvent.id"
          @click.prevent="validate('update')"
        >
            UPDATE
        </button>
        <button v-else @click.prevent="validate('add')">ADD</button>
      </div>
    </form>
  </div>
</template>

<script>
// EVERY EMIT-ARGUMENT MUST BE SET UP AS
// ARRAY-ELEMENT OF EMITS-SETTING
export default {
  // props: ['currentEvent'],
  props: {
    currentEvent: {
      type: Object,
    },
  },
  emits: ['close-form', 'add-new-event', 'update-event'],
  mounted() {
    //equating this.event with this.currentEvent after mounting
    // => Form will now display input-value currentEvent
    this.event = this.currentEvent;
  },
  data() {
    return {
      event: {},
      errors: [],
    };
  },
  methods: {
    // new event adding handler
    addEvent() {
      this.$emit('add-new-event', this.event);
      this.$emit('close-form');
    },

    // existing event updating handler
    updateEvent() {
      this.$emit('update-event', this.event);
      this.$emit('close-form');
    },

    // data validation handler
    validate(type) {
      this.errors = []
      if(!this.event.name) this.errors.push('Event name is required')
      if(!this.event.details) this.errors.push('Event details are required')
      if(!this.event.date) this.errors.push('Event date is required')
      if(!this.event.background) this.errors.push('Event background is required')
      // outcome 1: form has errors => don't add event
      if (this.errors.length > 0) return;
      // outcome 2: form has no errors
      // => if type 'add' add event to array
      // else update event[index]
      if (type === 'add') this.addEvent();
      else this.updateEvent();
    },
  },
};
</script>

<style scoped>
  .errors {
    color: lightpink;
    font-size: 12px;
    font-weight: bold;
  }

  .close {
    align-self: flex-end;
    cursor: pointer;
    font-size: 1rem;
  }

  .form_wrapper {
    background: rgba(0,0,0,0.7);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  form {
    display: flex;
    flex-direction: column;
    background: lightslategray;
    min-width: 60vw;
    min-height: 40vw;
    border-radius: 0.3rem;
    color: whitesmoke;
  }

  form > div {
    display: flex;
    flex-direction: column;
    margin: 1rem;
  }

  .input_wrapper {
    margin: 0.5em;
    text-align: center;
  }

  .input {
    display: flex;
    flex-direction: column;
    padding: 0 0.5rem;
    margin: 0.5rem 0;
  }

  form button {
    background: #68B5B9;
    width: 70%;
    border: none;
    padding: 0.6rem;
    margin: 0 auto;
    border-radius: 0.3rem;
    font-size: 16px;
    color: whitesmoke;
  }

  button:focus {
    outline: 0;
  }

  input {
    border-radius: 0.3rem;
    border: 1px solid whitesmoke;
    text-align: center;
    padding: 0.2rem 0;
    margin-top: 0.2rem;
  }

  label {
    font-weight: bold;
  }

  @media (min-width: 800px) {
    form {
      height: 40vw;
      padding: 2rem;
      margin: 3rem;
    }

    .input_wrapper {
      text-align: left;
    }

    .input {
      display: block;
    }

    label, input {
      display: inline-flex;
      padding: 0.5rem;
      margin: 0.5rem 0;
    }

    label {
      width: 20%;
      font-size: 1.1rem;
      font-weight: normal;
    }

    input {
      width: 50%;
      text-align: left;
    }

    form button {
      width: 100px;
      margin: 0 0.5rem;
    }
  }
</style>
