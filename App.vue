<template>
  <router-view/>
  <PageDash label="Primary" @clicked="onPrimaryClick" />
</template>

<script>
//import {PageDash} from './components/PageDash.vue';



export default {
  name: 'App',
 // components:{PageDash},
  methods: {
    onPrimaryClick() {
      alert('Primary button clicked!');
    },
  }
  
};
</script>

<style>
/* Global styles can go here */
#app{
  height: 100vh;
  margin-top: 0px;
  overflow: hidden;
}
</style>
