<template>
  <article
    class=""
    v-show="Math.sign(daysLeft) !== -1 || showPastEvents"
    :style="{
      background: event.background,
      color: changeContrast ? '#454444' : 'whitesmoke'
    }"
  >
    <div class="data">
      <h3 class="name">{{ event.name }}</h3>
      <p class="details">{{ event.details }}</p>
    </div>
    <div class="countdown">
      <div class="remove_btn_wrapper">
          <button
            type="button"
            class="remove_btn"
            @click.stop="remove()"
          >
              &#10060;
          </button>
      </div>
      <p v-if="daysLeft === 0">Today!</p>
      <p v-else>
        {{ Math.abs(daysLeft) }}
        <br>
        <small>{{ daysLeftString }}</small>
      </p>
    </div>
  </article>
</template>

<script>
export default {
  name: "Event",
  // inheritAttrs controles,
  // whether to inherit attributes from parent component or not
  // Attributes accessable via $attr
  // and can be bound to individual components within child component
  inheritAttrs: true,
  props: {
    event: { type: Object, required: true },
    daysLeft: { type: Number, required: true },
    showPastEvents: Boolean,
  },
  emits: ['remove-event'],
  methods: {
    remove() {
      this.$emit("remove-event", this.event);
    },
  },
  computed: {
    daysLeftString() {
      const dayOrDays = Math.abs(this.daysLeft) === 1? "day" : "days";
      const leftOrAgo = Math.sign(this.daysLeft) === -1? " ago" : " left";
      return dayOrDays + leftOrAgo;
    },
    changeContrast() {
      const lowContrastBackgrounds = ["#F7F790", "#68EE94", "#FFE2A0", "#F3F949"];
      return lowContrastBackgrounds.includes(this.event.background);
    },
  },
};
</script>

<style scoped>
  article {
    background: lightslategray;
    display: flex;
    align-items: center;
    border-radius: 1rem;
    margin: 1rem 0;
    padding: 0.2rem 1rem;
    color: whitesmoke;
    font-weight: 300px;
  }

  .data {
    flex: 3;
  }

  .countdown {
    flex: 1;
    text-align: 1.6rem;
    border-left: 1px solid;
  }

  .name {
    font-size: 1.8rem;
  }

  .details {
    font-size: 1.6rem;
  }

  .remove_btn {
    background: transparent;
    border: none;
    cursor: pointer;
  }

  .remove_btn_wrapper {
    text-align: right;
  }

  button:focus {
    outline: 0;
  }
</style>
