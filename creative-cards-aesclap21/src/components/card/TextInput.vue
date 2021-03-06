<template lang="html">
  <div
    class="text_input_wrapper"
    @mouseover="showOptions = true"
    @mouseout="showOptions = false"
  >
    <section class="text_input_header">
      <div >
        <button @click="updateSectionOrder(sectionIndex, -1)">
          <img
            src="@/assets/icons/arrow-up.svg"
            alt="arrow up icon"
            class="header"
          >
        </button>
        <button @click="updateSectionOrder(sectionIndex, 1)">
          <img
            src="@/assets/icons/arrow-down.svg"
            alt="arrow down icon"
            class="header"
          >
        </button>
      </div>
      <button @click="removeSection(sectionIndex)">x</button>
    </section>
    <textarea v-model="currentSection.userInput" rows="4" cols="50"></textarea>
    <div class="menu" v-show="showOptions">
      <div class="menu_top" @mouseleave="showOptions = true">
        <select v-model="currentSection.fontFamily">
          <option value="Times New Roman">Times New Roman</option>
          <option value="Georgia">Georgia</option>
          <option value="Arial">Arial</option>
          <option value="Comic Sans MS">Comic Sans MS</option>
          <option value="Verdana">Verdana</option>
          <option value="Courier New">Courier New</option>
        </select>
        <select v-model="currentSection.fontSize">
          <option value="1rem">Small</option>
          <option value="1.6rem">Normal</option>
          <option value="2rem">Big</option>
          <option value="2.5rem">Bigger</option>
          <option value="3rem">Biggest</option>
        </select>
        <input type="color" v-model="currentSection.color">
        <label>
          <input type="checkbox" v-model="currentSection.isBold">
          <img src="@/assets/icons/bold.svg" alt="bold icon">
        </label>
        <label>
          <input type="checkbox" v-model="currentSection.isItalic">
          <img src="@/assets/icons/italic.svg" alt="italic icon">
        </label>
      </div>
      <div class="menu_bottom">
        <div>
          <button @click="changeHeight(100)">
            <img src="@/assets/icons/arrow-up.svg" alt="arrow up" id="middle_1">
          </button>
          <button @click="changeHeight(-100)" >
            <img
              src="@/assets/icons/arrow-down.svg"
              alt="arrow down"
              id="middle_2"
            >
          </button>
        </div>
        <div class="position">
        <label>
          <input
            type="radio"
            v-model="currentSection.justifyContent"
            value="flex-start"
            name="horizontal"
          >
          <img src="@/assets/icons/left.svg" alt="left icon">
        </label>
        <label>
          <input
            type="radio"
            v-model="currentSection.justifyContent"
            value="center"
            name="horizontal"
          >
          <img src="@/assets/icons/center.svg" alt="center icon">
        </label>
        <label>
          <input
            type="radio"
            v-model="currentSection.justifyContent"
            value="flex-end"
            name="horizontal"
          >
          <img src="@/assets/icons/right.svg" alt="right icon">
        </label>
        <label>
          <input
            type="radio"
            v-model="currentSection.alignItems"
            value="flex-start"
            name="vertical"
          >
          <img src="@/assets/icons/top.svg" alt="top icon">
        </label>
        <label>
          <input
            type="radio"
            v-model="currentSection.alignItems"
            value="center"
            name="vertical"
          >
          <img src="@/assets/icons/middle.svg" alt="middle icon">
        </label>
        <label>
          <input
            type="radio"
            v-model="currentSection.alignItems"
            value="flex-end"
            name="vertical"
          >
          <img src="@/assets/icons/bottom.svg" alt="bottom icon">
        </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import useCurrentCard from '@/composables/useCurrentCard';

export default {
  props: {
    section: Object,
    sectionIndex: Number
  },
  setup(props) {
    const currentSection = ref({...props.section});
    const showOptions = ref(false);
    const { updateCard, removeSection, updateSectionOrder } = useCurrentCard();

    watch(
      currentSection.value,
      update
    )

    function update() {
      updateCard(props.sectionIndex, currentSection.value)
    }

    function changeHeight(value) {
      let currentHeight = currentSection.value.height
      if(
        (currentHeight === 100 && value === -100) ||
        (currentHeight === 600 && value === 100)
      ) return;
      currentSection.value.height = currentHeight + value;
    }

    return {
      currentSection,
      showOptions,
      removeSection,
      updateSectionOrder,
      changeHeight
    }
  }
};
</script>

<style lang="css" scoped>
img {
  width: 30px;
}

.menu {
  position: absolute;
  background: linear-gradient(30deg, lightslategray, darkslategray);
  padding: 10px;
  border-radius: 0 0 3px 3px;
}

.menu_top,
.menu_bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.position {
  display: flex;
}

#middle_1,
#middle_2 {
  height: 10px;
  padding: 10px 10px 10px 0;
}

input[type='radio'],
input[type='checkbox'] {
  opacity: 0;
  width: 0;
  height: 0;
}

input[type='radio'] + img,
input[type='checkbox'] + img {
  cursor: pointer;
}

input[type='radio']:checked + img,
input[type='checkbox']:checked + img,
input[type='radio']:focus + img,
input[type='checkbox']:focus + img {
  outline: 2px solid rgb(119, 123, 125);
}

textarea {
  border: none;
  border-radius: 3px;
  width: 100%;
  font-weight: lighter;
  padding: 5px;
  box-sizing: border-box;
}

select {
  margin-right: 5px;
}

.text_input_header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
}

.text_input_header button {
  font-size: 15px;
  font-weight: bold;
  padding-right: 5px;
}

img.header {
  width: 15px;
}
</style>
