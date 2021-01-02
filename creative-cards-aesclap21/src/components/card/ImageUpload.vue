<template lang="html">
  <div class="image_upload_wrapper">
    <h4>Image: (recommended 450x600px)</h4>
    <input type="file" @change="uploadFile">
    <img
      :src="state.imagePreview"
      class="preview_image"
      :alt="state.message"
    >
    <div class="image_buttons">
      <!-- <div>
        <button @click="repositionImage('top')">
          <img src="@/assets/icons/top.svg" alt="image top selector">
        </button>
        <button @click="repositionImage('middle')">
          <img src="@/assets/icons/middle.svg" alt="image middle selector">
        </button>
        <button @click="repositionImage('bottom')">
          <img src="@/assets/icons/bottom.svg" alt="image bottom selector">
        </button>
      </div> -->
      <button class="remove_btn" @click="remove()">x</button>
    </div>
  </div>
</template>

<script>
// u9dbxlsa
// ar_3:4,c_crop,g_center/
// http://res.cloudinary.com/lets-travel/image/upload/v1609548439/
//  cards/izt10xxnyku5wj3idmau.png
import { reactive } from 'vue';
import axios from 'axios';
import useCurrentCard from '@/composables/useCurrentCard';

export default {

  setup() {
    const {
      updateImage,
      // repositionImage,
      removeImage
    } = useCurrentCard();
    const state = reactive({
      imagePreview: '',
      message: '',
      formData: null
    });

    function remove() {
      state.imagePreview = "";
      removeImage()
    }

    async function uploadFile(event) {
      const reader = new FileReader();
      reader.onload = function() {
        state.imagePreview = reader.result
      };
      reader.onerror = function() {
        state.message = 'An error has occured, please try again'
      };
      reader.readAsDataURL(event.target.files[0]);
      try {
        state.formData = new FormData();
        state.formData.append('upload_preset', 'u9dbxlsa');
        state.formData.append('file', event.target.files[0]);
        const imageReqData = {
          url: 'https://api.cloudinary.com/v1_1/lets-travel/image/upload',
          method: 'POST',
          data: state.formData
        };
        const res = await axios(imageReqData);
        const str = res.data.url.split("upload/");
        const urlNew = str[0] + 'upload/ar_3:4,c_crop,g_center/' + str[1];
        updateImage(urlNew)
      } catch(error) {
        throw new Error(error);
      }
    }
    return {
      uploadFile,
      state,
      // repositionImage,
      remove
    }
  }
};
</script>

<style lang="css" scoped>
.image_upload_wrapper {
  text-align: left;
}

.image_buttons {
  display: flex;
  flex-direction: row-reverse;
}

.image_buttons img {
  width: 30px;
}

h4 {
  font-weight: 300;
  margin: 10px 0;
}

.remove_btn {
  font-size: 15px;
  font-weight: bold;
}

.remove_btn:hover {
  color: #68b5b9;
}

input[type="file"] {
  margin: 0 0 10px 0;
}

button {
  margin-right: 5px;
}

.preview_image {
  width: 300px;
}
</style>
