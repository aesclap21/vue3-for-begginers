<template lang="html">
  <ImageUpload />
  <div class="add_section_wrapper">
    <button v-if="selectedPage.sections?.length < 4" @click="addSection()">
      Add Section
    </button>
  </div>
  <div v-for="(section, index) in selectedPage.sections" :key="section.id">
    <TextInput :section="section" :sectionIndex="index"/>
  </div>
</template>

<script>
import TextInput from './TextInput';
import useCurrentCard from '@/composables/useCurrentCard';
import ImageUpload from './ImageUpload';

export default {
  components: {
    TextInput,
    ImageUpload
  },
  props: {
    selectedPage: {
      type: Object
    }
  },
  setup() {
    const { addSection } = useCurrentCard();
    return {
      addSection
    }
  }
};
</script>

<style lang="css" scoped>
.add_section_wrapper {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
</style>
