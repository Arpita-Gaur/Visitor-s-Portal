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
  
        <div class="check-in-container">
          <h1>Check Out</h1>
          <div class="search-form">
            <input v-model="Id" type="text" placeholder="EUIN ID">
            <input v-model="Name" type="text" placeholder="Employee Name">
            <input v-model="Phone" type="text" placeholder="Employee Phone no">
            <input v-model="ticketId" type="text" placeholder="Ticket Id">
          </div>
          <div class="button">
            <button @click="search" class="search-btn">Search</button>
          </div>
        </div>
        <div class="tableh" v-if="userlist.length>0">
          <table >
            <thead>
              
              <tr>
          <th>ID</th>
          <th>Employee ID</th>
          <th>Name</th>
          <th>Person Name</th>
          <th>Person Phone No</th>
          <th>Employee Phone No</th>
          <th>Ticket ID</th>
          <th>Check-Out Status</th>
          
        </tr>
            </thead>
            <tbody>
              <tr v-for="i in userlist" :key="i.id">
              <td>{{i.id}}</td>
              <td>{{i.Emp_name}}</td>
              <td>{{ i.Emp_name }}</td>
              <td>{{ i.Person_name }}</td>
              <td>{{ i.Person_phone_no }}</td>
              <td>{{ i.Employee_phone_no }}</td>
              <td>{{ i.Ticket_id }}</td>
              <td>
            <input
              type="checkbox"
              v-model="i.Check_out_status"
              @change="updateCheckOutStatus(i,$event)"
            />
          </td>
        </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import DashboardIng from './Dashboard.vue';
  import axios from 'axios';
  
  export default {
    name: 'CheckOut',
    components: { DashboardIng },
    data() {
      return {
        Id: '',
        Name: '',
        Phone: '',
        ticketId: '',
        userlist:'',
        isSidebarVisible: false,
        screenWidth: window.innerWidth,
      };
    },
    methods: {
      async search() {
        console.log("id", this.Id);
        console.log("ticketId", this.ticketId);
        try {
        const response = await axios.post('http://localhost:5000/api/checkout', {
          Id: this.Id,
          Name: this.Name,
          Phone: this.Phone,
          ticketId: this.ticketId,
        });
        console.log('Response:', response.data);
        this.userlist=response.data.data;
        console.log(response.data.data[0].Emp_name);
        this.Id=response.data.data[0].id;
        this.Name=response.data.data[0].Emp_name;
        this.ticketId=response.data.data[0].Ticket_id;
        this.Phone=response.data.data[0].Employee_phone_no;
        console.log("USER LIST: "+JSON.stringify(this.userlist));
        alert('Check-out data successfully inserted');
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to insert check-in data');
      }
    },
    async updateCheckOutStatus(i) {
      try {
        // Send updated status to the backend
        await axios.post('http://localhost:5000/api/updateCheckOutStatus', {
          id: i.id,
          Check_out_status: i.Check_out_status
        });
        console.log('Check-out status updated for:', i);
        alert('Check-out status successfully updated');
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to update check-out status');
      }
    },
      // try {
        // check if the data exists in the 'checkin' table
        // const checkinResponse = await axios.get('http://localhost:5000/api/checkin', {
        //   params: {
        //     Id: this.Id,
        //     ticketId: this.ticketId,
        //   },
        // });

    //     if (checkinResponse.data.exists) {
    //       // If data exists
    //       const checkoutResponse = await axios.post('http://localhost:5000/api/checkout', {
    //         Id: this.Id,
    //         Name: this.Name,
    //         Phone: this.Phone,
    //         ticketId: this.ticketId,
    //       });
    //       console.log('Check-out data successfully inserted:', checkoutResponse.data);
    //       alert('Check-out successfully done ');
    //     } else {
    //       alert('Check-in data not found, cannot proceed with check-out');
    //     }
    //   } catch (error) {
    //     console.error('Error during check-out:', error);
    //     alert('Failed to process check-out');
    //   }
    // },

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
  .check-in-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f0f0f0;
  }
  
  .button {
    padding-left: 40%;
    padding-top: 3%;
  }
  
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
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .search-form {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  
  input {
    flex: 1;
    min-width: 150px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
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
  
    .button {
      margin-top: 0;
      text-align: left;
      padding-left: 0;
    }
  
    .toggle-btn {
      display: block;
    }
  
    .back-btn {
      display: block;
    }
  }
  table {
    padding-top: 10%;
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}

input[type="checkbox"] {
  margin: 0;
}
.tableh{
    padding-top: 10%;
  }
  </style>
  