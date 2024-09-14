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

      <div class="dashboard">
        <h1>Dashboard</h1>
        <div class="dashboard-stats">
          <div class="stat-box">
            <h3>Total Check-in</h3>
            <p>{{ totalCheckIn }}</p>
          </div>
          <div class="stat-box">
            <h3>Total Check-out</h3>
            <p>{{ totalCheckOut }}</p>
          </div>
          <div class="stat-box">
            <h3>Total Number</h3>
            <p>{{ totalNumber }}</p>
          </div>
          <div class="stat-box">
            <h3>Remaining Check-in</h3>
            <p>{{ remainingCheckIn }}</p>
          </div>
          <div class="stat-box">
            <h3>Remaining Check-out</h3>
            <p>{{ remainingCheckOut }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardIng from './Dashboard.vue';

export default {
  name: 'DashPage',
  components: { DashboardIng },
  data() {
    return {
      totalCheckIn: 0,
      totalCheckOut: 0,
      totalNumber: 0,
      remainingCheckIn: 0,
      remainingCheckOut: 0,
      isSidebarVisible: false,
      screenWidth: window.innerWidth,
    };
  },
  methods: {
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
.appy {
  display: flex;
  height: 100vh; 
  overflow: hidden;
  flex-direction: row; 
} 

.left {
  background-color: #489c49;
  
  box-sizing: border-box;
  flex: 1;
  
  
  
}

.left.hidden {
   
  display: none; }

.right {
  flex: 3;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
  color: black;
  display: flex;
  flex-direction: column;
  width: calc(100% - 250px);  }
  

.top-bar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 10px;
}

.dashboard {
  flex-grow: 1;
  padding: 20px;
  background-color: #f0f0f0;
}

.dashboard-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.stat-box {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  flex: 1;
}

.stat-box h3 {
  color: #666;
  font-size: 16px;
  margin: 0 0 10px 0;
}

.stat-box p {
  color: #333;
  font-size: 24px;
  font-weight: bold;
  margin: 0;
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

@media (max-width: 768px) {
  .appy {
    flex-direction: column;
  }

  .left {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 1000;
    flex: none;
    width: 250px; /* Fixed width for the sidebar */
  }

  .right {
    width: 100%; /* Full width when sidebar is hidden */
    padding-left: 0; /* Adjust padding when sidebar is hidden */
  }

  .dashboard-stats {
    justify-content: space-between;
  }

  .toggle-btn {
    display: block;
  }

  .back-btn {
    display: block;
  }
}

@media (min-width: 768px) {
  .appy {
    flex-direction: row;
  }

  .left {
    flex: 1;
  }

  .right {
    flex: 3;
    width: calc(100% - 250px); /* Adjust content width based on sidebar */
  }

  .dashboard-stats {
    justify-content: space-between;
  }
}

</style>
