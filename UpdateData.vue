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
  
        <div class="update-form">
          <h1>Update</h1>
          <form class="form" @submit.prevent="fetchAndAutoFill">
            <div class="form-group">
              <input type="text" v-model="Id" placeholder="Employee Id" />
            </div>
            <div class="form-group">
              <input type="text" v-model="Phone" placeholder="Employee Phone no" />
            </div>
            <div class="form-group">
              <input type="text" v-model="ticketId" placeholder="Ticket Id" />
            </div>
            <div class="button"> 
              <button type="submit" class="search-btn">Search</button>
            </div>
          </form>
          <!-- Checkbox to choose which field to update -->
          <div v-if="dataFetched">
        <div class="checkboxes">
          <label>
            <input type="checkbox" v-model="updatePersonNameSelected" /> Update Person Name
          </label>
          <label>
            <input type="checkbox" v-model="updatePersonPhoneNoSelected" /> Update Person Phone No
          </label>
        </div>

        <!-- Conditionally show input based on the checkbox selection -->
        <div v-if="updatePersonNameSelected">
          <input type="text" v-model="updatePersonName" placeholder="New Person Name" />
        </div>
        <div v-if="updatePersonPhoneNoSelected">
          <input type="text" v-model="updatePersonPhoneNo" placeholder="New Person Phone No" />
        </div>

        <button @click="submitUpdate" class="submit-btn">Submit</button>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import DashboardIng from './Dashboard.vue';
  import axios from 'axios';
  
  export default {
    name: 'UpdateData',
    components: { DashboardIng },
    data() {
      return {
        isSidebarVisible: false,
        screenWidth: window.innerWidth,
        Id: '',
        Phone: '',
        ticketId: '',
        updatePersonName: '',
        updatePersonPhoneNo: '',
        updatePersonNameSelected: false,
        updatePersonPhoneNoSelected: false,
        dataFetched: false,
      };
    },
    methods: {
      toggleSidebar() {
        this.isSidebarVisible = !this.isSidebarVisible;
      },
      async fetchAndAutoFill() {
        
      try {
        const response = await axios.post('http://localhost:5000/api/fetch', {
          Id: this.Id,
          Phone: this.Phone,
          ticketId: this.ticketId,
          
        });
        if (response.data) {
          this.Id = response.data.Emp_id;
          this.Phone = response.data.Employee_phone_no;
          this.ticketId = response.data.Ticket_id;
          this.dataFetched = true;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data');
      }
    },
    async submitUpdate() {
      try {
        const updateFields = {};
        if (this.updatePersonNameSelected) updateFields.Person_name = this.updatePersonName;
        if (this.updatePersonPhoneNoSelected) updateFields.Person_phone_no = this.updatePersonPhoneNo;

        const response = await axios.post('http://localhost:5000/api/update', {
          Id: this.Id,
          Phone: this.Phone,
          ticketId: this.ticketId,
          updateFields,
        });
        console.log('Update successful', response.data);
        alert('Update successful');
      } catch (error) {
        console.error('Error updating employee data:', error);
        alert('Failed to update employee data');
      }
    },
      handleResize() {
        this.screenWidth = window.innerWidth;
        if (this.screenWidth >= 768) {
          this.isSidebarVisible = true; // Auto-show sidebar on larger screens
        }
      }
    },
    mounted() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize(); // Initialize sidebar visibility based on initial screen width
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.handleResize);
    }
  };
  </script>
  
  <style scoped>
  .appy {
    display: flex;
    flex-direction: row;
    height: 100vh; /* Full height of the viewport */
    overflow: hidden;
  }
  
  .left {
    background-color: #489c49;
    /* padding: 20px; */
    box-sizing: border-box;
    flex: 2;
  }
  
  .left.hidden {
    display: none;
  }
  
  .right {
    flex: 1;
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  
  .top-bar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 10px;
  }
  
  .update-form {
    padding: 20px;
    max-width: 100%;
    margin: 0 auto;
    background-color: #f0f0f0;
    border-radius: 8px;
    /* flex-grow: 1; */
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  
  .form-group {
    display: flex;
    flex-direction: row;
  }
  
  input {
    width: auto;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .button {
    padding-left: 40%;
    padding-top: 2%;
  }
  
  .search-btn {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .search-btn:hover {
    background-color: #45a049;
  }
  .submit-btn{
    padding-top: 20%;
    background-color: hsl(240, 81%, 59%);
    color: white;
    padding:8px;
    border: 1px;
    margin-bottom: 15px;
    cursor: pointer;
    width: 15%;
    border-radius: 4px;;

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
  
    .form {
      flex-direction: row;
      flex-wrap: wrap;
    }
  
    .form-group {
      flex: 1;
      min-width: calc(33.33% - 10px);
    }
  
    .search-btn {
      width: auto;
      align-self: flex-start;
      
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
      flex-direction: column;
    }
  
    .left {
      flex: 2;
      
    }
  
    .right {
      flex: 8;
    }
  
    .form {
      flex-direction: column;
      flex-wrap: wrap;
    }
  
    .form-group {
      flex: 1;
      min-width: calc(33.33% - 10px);
    }
  
    .search-btn {
      width: auto;
      align-self: flex-start;
    }
  
    .toggle-btn {
      display: block;
      width: 100%;
    }
  
    .back-btn {
      display: block;
    }
  }
  </style>
  
  