<template>
  <div>
    <h1>Shopping Cart</h1>
    <!-- Render the Checkout Component and pass down the shopping cart data -->
    <Checkout :cart="cart" @remove-item-from-cart="removeFromCart" />
  </div>
</template>

<script>
import Checkout from '/checkout.vue'; // Import the Checkout Component

export default {
  components: {
    Checkout
  },
  data() {
    return {
      cart: [
        { id: 1, name: 'Lesson 1', price: 10 },
        { id: 2, name: 'Lesson 2', price: 15 },
        // Add more items to the cart as needed
      ]
    };
  },
  methods: {
    // Method to remove an item from the cart
    removeFromCart(itemId) {
      // Find the index of the item in the cart array
      const index = this.cart.findIndex(item => item.id === itemId);
      // Remove the item from the cart if found
      if (index !== -1) {
        this.cart.splice(index, 1);
      }
    }
  }
};
</script>
