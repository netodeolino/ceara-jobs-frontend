<template>
  <img :src="srcImage" @error="imageLoadOnError"/>
</template>
<script>
export default {
  name: "base-image",
  data() {
    return {
      srcImage: this.src,
    };
  },
  props: {
    src: {
      type: String,
    },
    errorImage: {
      type: String
    },
  },
  methods: {
    imageLoadOnError () {
      this.srcImage = this.errorImage;
    }
  },
};
</script>
