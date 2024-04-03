<template>
  <div>
    <!-- Displaying lessons -->
    <div v-for="lesson in lessons" :key="lesson.id">
      <figure>
        <img :src="lesson.image" alt="" width="100" height="90">
      </figure>
      <h2>{{ lesson.title }}</h2>
      <p>Subject: {{ lesson.subject }}</p>
      <p>Location: {{ lesson.location }}</p>
      <p>Price: {{ lesson.price }}</p>
      <p>Spaces: {{ lesson.spaces }}</p>
      <!-- Button to add lesson to cart -->
      <button @click="addToCart(lesson)" :disabled="!canAddToCart(lesson)">Add To Cart</button>
      <span v-if="lesson.availableInventory === 0">All out!</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['lessons'],
  methods: {
    addToCart(lesson) {
      // Emit an event to notify the parent component to add the lesson to the cart
      this.$emit('add-to-cart', lesson);
    },
    canAddToCart(lesson) {
      // Implement the logic to determine if the lesson can be added to the cart
      return lesson.availableInventory > 0;
    }
  }
}
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
