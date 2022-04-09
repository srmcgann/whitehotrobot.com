<template>
  <div class="main">
  </div>
</template>

<script>
export default {
  name: 'main',
  props: [ 'state' ],
  data(){
    return {
    }
  },
  methods:{
    
  }
}
</script>

<style scoped>
.main{
  width: 200px;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  top: 50%;
  transform: translate(0,-50%);
  height: 200px;
  background: #ace;
}
</style>
