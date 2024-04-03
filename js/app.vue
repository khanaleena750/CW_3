<template>
  <div>
    <!-- Cart button showing the number of lessons in cart -->
    <button @click="toggleComponent" class="cart-button">
      Cart ({{ cart.length }})
    </button>

    <!-- Dynamic component switching between Lesson and Checkout -->
    <component :is="currentComponent" :lessons="lessons" @add-to-cart="addToCart" @remove-item-from-cart="removeFromCart"></component>
  </div>
</template>

<script>
import Lesson from '/Lesson.vue'; // Importing Lesson component
import Checkout from '/Checkout.vue'; // Importing Checkout component

export default {
  components: {
    Lesson,
    Checkout
  },
  data() {
    return {
      currentComponent: 'Lesson', // Initially displaying the Lesson component
      lessons: [], // Array to store lesson information
      cart: [] // Array to store items in cart
    }
  },
  methods: {
    // Method to toggle between Lesson and Checkout components
    toggleComponent() {
      this.currentComponent = this.currentComponent === 'Lesson' ? 'Checkout' : 'Lesson';
    },
    // Method to add lesson to cart
    addToCart(lesson) {
      this.cart.push(lesson);
    },
    // Method to remove lesson from cart
    removeFromCart(index) {
      this.cart.splice(index, 1);
    }
  },
  mounted() {
    // Simulating fetching lesson information from MongoDB Atlas through a REST API
    // Replace this with actual API call in your application
    fetch('https://api.example.com/lessons')
      .then(response => response.json())
      .then(data => {
        this.lessons = data;
      })
      .catch(error => {
        console.error('Error fetching lesson information:', error);
      });
  }
}
</script>

<style scoped>
.cart-button {
  /* Add styles for the cart button */
}
</style>
