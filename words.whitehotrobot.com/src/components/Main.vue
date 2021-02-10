<template>
  <div class="main" :class="{'footerPadding': state.mode=='post'}">
    <div v-if="state.search.string==''">
      <div v-if="state.mode=='post'" class="postDiv" :class="{'highTop':state.showControls}">
        <div v-if="state.posts.length" class="flex">
          <Post v-for="post in state.posts" :key="post.id" :post="post" :state="state"/>
        </div>
        <div v-else-if="state.loaded" style="font-size: 1.5em;">
          <br><br><br><br><br>OOPS!
          <br><br><br>this post could not be found!
        </div>
      </div>
      <div v-if="state.mode=='default'" class="postDiv" :class="{'highTop':state.showControls}">
        <div v-if="filteredLandingPagePosts.length" class="flex">
          <Post v-for="post in filteredLandingPagePosts" :key="post.id" :post="post" :state="state"/>
        </div>
        <div v-else-if="state.loaded" style="font-size: 1.5em;">
          <br><br><br>OOPS!
          <br>we seem to be missing some posts!
          <br><br>
          :(<br><br>
          maybe try a different search?
        </div>
      </div>
      <div v-if="state.mode=='u'" class="postDiv" :class="{'highTop':state.showControls}">
        <div v-if="state.loaded && state.user.name">
          <div v-if="filteredUserPosts.length" class="flex">
            <Post v-for="post in filteredUserPosts" :key="post.id" :post="post" :state="state"/>
          </div>
          <div v-else-if="state.loaded" style="font-size: 1.5em;">
            <br><br><br><br>OOPS!
            <br><br>{{state.user.name}} has not<br>uploaded any posts yet!
            <br><br><br>
            :(
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="postDiv" :class="{'highTop':state.showControls}">
        <div v-if="state.search.posts.length" class="flex">
          <Post v-for="post in state.search.posts" :key="post.id" :post="post" :state="state"/>
        </div>
        <div v-if="state.search.inProgress" style="font-size: 2em;" >
          <br><br><br>
          <div style="width: 300px;padding-left: 50px;margin-left: auto; margin-right: auto; text-align: left;">{{searchingText}}</div>
        </div>
        <div v-else-if="!state.search.posts.length && state.loaded" style="font-size: 1.5em;">
          <br>DRAT!
          <br><br>your search did not return anything!
          <br><br>
          maybe try something more general,<br>like &quot;whitehot robot&quot;
          <br><br><br>
          :(
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Post from './Post'
export default {
  name: 'Main',
  components:{
    Post
  },
  props: [ 'state' ],
  methods:{
  },
  computed:{
    filteredLandingPagePosts(){
      return this.state.landingPage.posts
    },
    filteredUserPosts(){
      if(this.state.user != null && typeof this.state.user.posts !== 'undefined'){
        return this.state.user.posts.filter(v=>!v.private || this.state.loggedinUserName.toUpperCase() == this.state.user.name.toUpperCase() || this.state.isAdmin)
      } else {
        return []
      }
    },
    searchingText(){
      return 'Searching' + ('.'.repeat((this.state.globalT*20|0)%8))
    }
  },
  mounted(){
  }
}
</script>

<style scoped>
.main{
  text-align: center;
  margin-top: 60px;
  padding-bottom: 60px;
}
.flex{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: 0;
}
.postDiv{
  background: transparent;
  padding-top:0px;
  transition: 0.5s padding-top;
}
</style>
<style>
.highTop{
  padding-top: 160px!important;
}
.footerPadding{
  min-height: calc(100vh + 200px);
}
</style>
