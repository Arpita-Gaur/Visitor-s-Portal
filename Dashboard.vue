<template>
  <div class="Dashboard">
    <div class="left4">
      <div class="image">
        <img :src="imageSrc" alt="image" />
      </div>
      <a class="text">Hi, DS Group</a>
      <h2 class="text">Visitor's</h2>
      <nav class="navigation">
        <ul>
          <li>
            <router-link to="/DashPage" class="nav-link">
              <i class="fa-solid fa-bars"></i>
              <a>DashBoard</a>
            </router-link>
          </li>
          <li>
            <router-link to="/CheckIn" class="nav-link">
              <i class="fa-solid fa-file"></i>
              <a>Check In</a>
            </router-link>
          </li>
          <li>
            <router-link to="/CheckOut" class="nav-link">
              <i class="fa-solid fa-file"></i>
              <a>Check Out</a>
            </router-link>
          </li>
          <li>
            <router-link to="/BookIng" class="nav-link">
              <i class="fa-solid fa-file"></i>
              <a>Booking</a>
            </router-link>
          </li>
          <li>
            <router-link to="/UpdateData" class="nav-link">
              <i class="fa-solid fa-file"></i>
              <a>Update</a>
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="out">
        <a-button type="primary" @click="handleClick">Logout</a-button>
      </div>
    </div>
  </div>
</template>

<script>
//import PageDash from "./PageDash.vue";
export default {
  name: "DashboardIng",
  data() {
    return {
      imageSrc: require("@/assets/image.png"),
      //PageDash,
    };
  },

  methods: {
    handleClick() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
}
.left4 {
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
  background-color: #489c49;
}
.right4 {
  flex: 8;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
}
.Dashboard {
  display: flex;
  height: 100vh; /* Full height of the viewport */
  overflow: hidden;
}
.box {
  display: flex;
  flex-direction: column;
  color: white;
  padding: 10%;
  padding-left: 0%;
}
.text1 {
  color: white;
  padding: auto;
  align: center;
  font-size: medium;
}
.text {
  color: white;
  padding-left: 30%;
  padding: auto;
}
.image {
  padding: auto;
}
.button {
  background-color: transparent; /* Green background */
  border: none; /* Remove borders */
  color: white; /* White text */
  padding: 15px 32px; /* Some padding */
  text-align: center; /* Center the text */
  text-decoration: none; /* Remove underline */
  display: inline-block; /* Inline-block for layout */
  font-size: 16px; /* Increase font size */
  margin: 4px 2px; /* Small margin */
  cursor: pointer; /* Pointer/hand icon */
  border-radius: 8px; /* Rounded corners */
}
.out {
  padding: auto;
  padding-left: 25%;
}
.Dash {
  padding: 50px;
  color: white;
}
.navigation ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.navigation li {
  /* margin-left: 20px; */
  padding: 5%;
  font-size: large;
}

.navigation li a {
  color: white;
  text-decoration: none;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}
.navigation li a:hover {
  background-color: #3e8e41;
}
@media (min-width: 768px) {
  .dashboard-container {
    flex-direction: row; /* Side by side on larger screens */
  }

  .left4 {
    width: 250px;
    padding: 20px;
    align-items: flex-start;
    text-align: left;
  }

  .navigation ul {
    align-items: flex-start;
  }

  .navigation li a {
    justify-content: flex-start;
  }

  .right4 {
    flex: 1;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;
  }
}

@media (min-width: 1024px) {
  .left4 {
    width: 300px; /* Increases sidebar width on larger screens */
  }
}
</style>
