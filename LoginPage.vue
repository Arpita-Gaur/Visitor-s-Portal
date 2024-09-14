import default from 'dashboard';

<template>
  <div class="container">
    <!-- <div class="left-half">
      Content for the left half -->
      <div class="left2">
        <div class="login-container">
          <h2>Visitor's Login Portal</h2>
          <form @submit.prevent="login">
            <div class="form-group">
              <!-- <label for="username">Name</label> -->
               
              <br/>
              <input
                type="text"
                id="username"
                v-model="username"
                required
                placeholder="Enter name"
              />
            </div>

            <div class="form-group">
              <!-- <label for="password">Password</label> -->
              <input
                type="password"
                id="password"
                v-model="password"
                required
                placeholder="Enter password"
              />
            </div>

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    <!-- </div> -->
    <div class="right2">
      <div class="image">
        <img :src="imageSrc" alt="Right side image" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
      imageSrc: require("@/assets/image.png"),
    };
  },
  methods: {
    login() {
      // Simulate a login process
      if (this.username === "admin" && this.password === "password") {
       // alert("Login successful");
        
        this.$router.push('/DashPage');
        // Redirect to another page or perform some action
      } else {
        alert("Invalid credentials");
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh; /* Full height of the viewport */
  overflow: hidden;
}




.login-container {
  max-width: 400px; 
  margin: 2rem auto;
  margin-top: 25%; 
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  
  
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex: column;
}

label {
  display: block;
  margin-bottom: 5px auto;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #087453;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #38a079;
}
.left2 {
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
}
.right2 {
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
  background-color: #489c49; /* White background for the right pane */
}
.image {
  padding: auto;
  max-width: 35%; /* Ensure the image fits within the container */
  height: auto; /* Maintain the aspect ratio of the image */
  border-radius: 20px; /* Optional: Rounded corners for the image */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Optional: Add a shadow for better presentation */
  margin: 30%;
  align-content: center;
}
@media (max-width: 768px) {
  .container {
    flex-direction: row;
  }

  .left2 {
    flex: 1;
  }

  .right2 {
    flex: 1;
  }

  .image img {
    max-width: 80%; /* Limit the image width on larger screens */
    margin: 0 auto;
    display: block;
  }
}
</style>