<template>
  <div>
    <h2>Checkout</h2>
    <!-- Display the items in the shopping cart -->
    <ul>
      <li v-for="item in cart" :key="item.id">
        {{ item.name }} - ${{ item.price }}
        <!-- Button to remove item from the cart -->
        <button @click="removeItem(item.id)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['cart'], // Declare the 'cart' prop to receive shopping cart data
  methods: {
    // Method to remove an item from the cart and emit custom event
    removeItem(itemId) {
      // Emit custom event with the item ID as payload
      this.$emit('remove-item-from-cart', itemId);
    }
  }
};
</script>
