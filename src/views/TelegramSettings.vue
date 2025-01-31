<template>
  <div class="settings">
    <h1>Telegram Bot Settings</h1>
    <form @submit.prevent="saveSettings">
      <div>
        <label for="botToken">Bot Token:</label>
        <input id="botToken" v-model="botToken" type="text" required />
      </div>
      <div>
        <label for="chatId">Chat ID:</label>
        <input id="chatId" v-model="chatId" type="text" required />
      </div>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      botToken: '',  // We don't load any values here, so user must input them every time
      chatId: ''     // No values loaded, force user input
    };
  },
  methods: {
saveSettings() {
  if (!this.botToken.trim() || !this.chatId.trim()) {
    alert('Both Bot Token and Chat ID are required.');
    return;
  }
  
  // Save settings to localStorage
  localStorage.setItem('botToken', this.botToken.trim());
  localStorage.setItem('chatId', this.chatId.trim());

  // Redirect to Home Products page
  this.$router.push('/home');  
}
}

};
</script>
 <style scoped>
 .settings {
   padding: 20px;
   max-width: 400px;
   margin: 50px auto;
   background-color: #f9f9f9;
   border-radius: 8px;
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
 }
 
 h1 {
   font-size: 24px;
   margin-bottom: 20px;
   text-align: center;
 }
 
 label {
   display: block;
   margin: 10px 0 5px;
 }
 
 input {
   width: 100%;
   padding: 10px;
   margin-bottom: 20px;
   border: 1px solid #ccc;
   border-radius: 4px;
 }
 
 button {
   width: 100%;
   background-color: #007bff;
   color: white;
   border: none;
   padding: 10px 20px;
   border-radius: 4px;
   cursor: pointer;
   font-size: 16px;
 }
 
 button:hover {
   background-color: #0056b3;
 }
 </style>