<template>
    <div class="appy">
      <!-- Sidebar (DashboardIng Component) -->
      <div class="left" :class="{ hidden: screenWidth < 768 && !isSidebarVisible }">
        <!-- Back Button inside the Sidebar to close it -->
        <button class="back-btn" @click="toggleSidebar" v-if="screenWidth < 768 && isSidebarVisible">
          ← Back
        </button>
        <DashboardIng />
      </div>
  
      <!-- Main Content -->
      <div class="right">
        <!-- Toggle Button horizontally at the top -->
        <div class="top-bar">
          <button class="toggle-btn" @click="toggleSidebar" v-if="screenWidth < 768">
            ☰ Menu
          </button>
        </div>
  
        <div class="select-date-form">
          <h2>Select Date</h2>
          <form @submit.prevent="submitDate">
            <div class="form-group">
              <input type="date" v-model="selectedDate" placeholder="Select date">
            </div>
            <button type="submit" class="submit-btn">SUBMIT</button>
          </form>
          <div v-if="bookingCount !== null" class="booking-info">
    <p>Number of bookings for {{ selectedDate }}: {{ bookingCount }}</p>
</div>

        </div>
      </div>
    </div>
  </template>
  
  <script>
  import DashboardIng from './Dashboard.vue';
  import axios from 'axios';
  export default {
    name: 'BookIng',
    components: { DashboardIng },
    data() {
      return {
        selectedDate: '',
        bookingCount: null,
        isSidebarVisible: false,
        screenWidth: window.innerWidth,
      };
    },
    methods: {
      fetchBookingCount() {
      if (this.selectedDate) {
        axios
          .get(`http://localhost:5000/api/data/count?date=${this.selectedDate}`)
          .then(response => {
            this.bookingCount = response.data.count;
          })
          .catch(error => {
            console.error('Error fetching booking count:', error);
          });
      }
    },
      submitDate() {
        const formData = {
         
        date: this.selectedDate,
      };
      
      axios.post('http://localhost:5000/api/data', formData)
        .then(response => {
          console.log('Selected date:', response.data.date);
          this.fetchBookingCount();
        })
        .catch(error => {
          console.error('Error submitting data:', error);
        });
    },
      toggleSidebar() {
        this.isSidebarVisible = !this.isSidebarVisible;
      },
      handleResize() {
        this.screenWidth = window.innerWidth;
        if (this.screenWidth >= 768) {
          this.isSidebarVisible = true; // Auto-show sidebar on larger screens
        }
      },
    },
    mounted() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize(); // Initialize sidebar visibility based on initial screen width
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.handleResize);
    },
  };
  </script>
  
  <style scoped>
  .left {
    flex: 2;
    box-sizing: border-box;
    background-color: #489c49;
  }
  
  .left.hidden {
    display: none;
  }
  
  .right {
    flex: 8;
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;
  }
  
  .appy {
    display: flex;
    height: 100vh;
    overflow: hidden;
    flex-direction: column;
  }
  
  .select-date-form {
    padding: 20px;
    background-color: #f0f0f0;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .form-group {
    margin-bottom: 15px;
    display: inline-block;
  }
  
  input[type="date"] {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .submit-btn {
    background-color: #4CAF50;
    color: white;
    padding: 8px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 10px;
  }
  
  .submit-btn:hover {
    background-color: #45a049;
  }
  
  /* Toggle Button */
  .toggle-btn {
    display: none;
    background-color: #489c49;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    font-size: 18px;
    border-radius: 4px;
    width: 100%;
  }
  
  /* Back Button inside Sidebar */
  .back-btn {
    display: none;
    background-color: #333;
    color: white;
    border: none;
    padding: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    font-size: 18px;
    border-radius: 4px;
  }
  
  @media (min-width: 768px) {
    .appy {
      flex-direction: row;
    }
  
    .left {
      flex: 2;
    }
  
    .right {
      flex: 8;
    }
  
    .toggle-btn {
      display: none;
    }
  
    .back-btn {
      display: none;
    }
  }
  
  @media (max-width: 768px) {
    .appy {
      flex-direction: row;
    }
  
    .left {
      flex: 1;
    }
  
    .right {
      flex: 3;
    }
  
    .toggle-btn {
      display: block;
    }
  
    .back-btn {
      display: block;
    }
  }
  </style>
  