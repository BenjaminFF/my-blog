<template>
  <div id="app">
    <div class="app-container">
      <svg class="svg" viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" @click="toggleSidebar">
        <path d="M20 90L60 50 M60 50L100 90M20 10L100 90M20 90L100 10" class="menu-icon" :style="{stroke:menu.iconColor}"></path>
      </svg>
        <div class="sidebar">
          <div class="sidebar-container">
            <div class="sidebar-header">
              <div class="sh-photo-container">
                <img src="./assets/imgs/headphoto2.jpg" class="sh-photo"/>
              </div>
            </div>
            <div class="sidebar-flags">
              <router-link class="sf-item" v-for="flag in flags" :to="flag.link" :class="{'category-active':flag.active}"
              @click.native="toggleFlag(flag)">{{flag.title}}</router-link>
            </div>
          </div>
        </div>
      <div class="content-container">
        <div class="content-inner-container">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import anime from 'animejs'
export default {
  name: 'App',
  data(){
    return{
      menu:{},
      content:{},
      flags:[],
      text:""
    }
  },
  created(){
    this.init();
  },
  methods:{
    init(){
      let menuPathD="M10 50 L60 50 M60 50L110 50M10 10 L110 10 M10 90 L110 90";
      let crossPathD="M20 90L60 50 M60 50L100 90M20 10L100 90M20 90L100 10";
      this.menu={
        hide:false,
        menuPathD:menuPathD,
        crossPathD:crossPathD,
        iconColor:'white'
      }
      this.flags=[
        {title:"安卓",link:'/blogCategory/Android',active:false},
        {title:"web前端",link:'/blogCategory/WebFront',active:false},
        {title:"NodeJs",link:'/blogCategory/NodeJs',active:false},
        {title:"JavaScript",link:'/blogCategory/JavaScript',active:false},
        {title:"Vue",link:'/blogCategory/Vue'}
      ]
      let curRouteName=this.$router.currentRoute.name;
      if(curRouteName=="blogCategory"){
        let curRoutePath=this.$router.currentRoute.path;
        console.log(curRoutePath);
        for(let i=0;i<this.flags.length;i++){
          if(curRoutePath==this.flags[i].link){
            this.flags[i].active=true;
            break;
          }
        }
      }
    },
    toggleSidebar(){
      if(!this.menu.hide) {
        this.menu.hide=true;
        anime({
          targets:'.sidebar',
          translateX:{
            value:'-100%',
            duration:500,
          },
          easing:'linear'
        });
        anime({
          targets:'.content-inner-container',
          translateX:{
            value:'-10rem',
            duration:500,
          },
          easing:'linear'
        });
        document.getElementsByClassName("menu-icon")[0].setAttribute('d',this.menu.menuPathD);
        setTimeout(()=>{
          this.menu.iconColor="#4c8bb1";
        },500);
      }else if(this.menu.hide){
        this.menu.hide=false;
        anime({
          targets:'.sidebar',
          translateX:'0',
          duration:500,
          easing:'linear'
        });
        anime({
          targets:'.content-inner-container',
          translateX:'0',
          duration:500,
          easing:'linear'
        });
        document.getElementsByClassName("menu-icon")[0].setAttribute('d',this.menu.crossPathD);
        this.menu.iconColor="white";
      }
    },
    toggleFlag(flag){
      for(let i=0;i<this.flags.length;i++){
        this.flags[i].active=false;
      }
      flag.active=true;
    }
  }
}
</script>

<style>
  @import  '../node_modules/animate.css/animate.css';
  @import  '../node_modules/spinkit/css/spinkit.css';
  body,html,div{
    margin: 0;
    padding: 0;
  }
  body,html{
    width: 100%;
    height: 100%;
    font-size: 16px !important;
  }
  #app{
    width: 100%;
    height: 100%;
  }
  .app-container{
    width: 100%;
    height: 100%;
    display: flex;
    background-color: #f4f4f4;
    position: relative;
  }
  .sidebar{
    width: 20rem;
    height: 100%;
    user-select: none;
    box-shadow: 0px 0px 5px 5px rgba(238, 238, 238, 0.7);
    z-index: 1000;
  }
  .sidebar-container{
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
  }
  .sidebar-header{
    width: 100%;
    height: 40%;
    background-color: #4c8bb1;
    position: relative;
  }
  .sidebar-flags{
    margin-top: 10rem;
    width: 80%;
    height: fit-content;
    display: flex;
    justify-content: center;
    flex-flow: row wrap;
    overflow: hidden;
  }
  .sf-item{
     color: #4c8bb1;
     border: 1px solid #4c8bb1 !important;
     padding: 0.5rem 0.7rem !important;
     border-radius: 2rem;
     margin-top: 1rem;
     margin-left: 0.2rem;
     margin-right: 0.2rem;
     text-decoration: none;
   }
  .sf-item:hover{
    cursor: pointer;
    color: white;
    background-color: #4c8bb1;
    text-decoration: none !important;
  }
  .sh-photo-container{
    position: absolute;
    width: 6rem;
    height: 6rem;
    border-radius: 5rem;
    bottom: 0;
    left: 50%;
    transform: translate(-50%,50%);
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .sh-photo{
    width: 5rem;
    height: 5rem;
    border-radius: 5rem;
    overflow: hidden;
  }
  .svg{
    width: 1.8rem;
    height: 1.8rem;
    position: absolute;
    left: 1rem;
    top: 1rem;
    cursor: pointer;
    z-index: 10000;
    user-select: none;
  }
  .menu-icon{
    fill:  transparent;
    stroke: white;
    stroke-width: 12px;
    transition: .5s all ease-in-out;
    stroke-linecap: round;
  }

  .category-active{
    color: white;
    background-color: #4c8bb1;
  }

  .content-container{
    height: 100%;
    background-color: #f4f4f4;
    overflow-y: auto;
    display: flex;
    justify-content: center;
    width: 100%;
    left: 0;
    position: absolute;
  }
  .content-container::-webkit-scrollbar {
    width: 10px;
    background-color: #eee;
  }
  .content-container::-webkit-scrollbar-track {
    background-color: #eee;
  }
  .content-container::-webkit-scrollbar-thumb {
    background: #4c8bb1;
  }

  .content-inner-container{
    width: calc(100% - 30rem);
    position: absolute;
    left: 25rem;
    z-index: 1000;
   }

   .particle{
     position: fixed;
     left: 0;
     top: 0;
     width: 100%;
     height: 100%;
   }

  @media all and (max-width:600px) {
    .content-inner-container{
      position: absolute;
      width: 100%;
      transform: translateX(10rem);
      left: 10rem;
    }
    .content-container::-webkit-scrollbar {
      width: 3px;
      background-color: #eee;
    }
    .content-container::-webkit-scrollbar-track {
      background-color: #eee;
    }
    .content-container::-webkit-scrollbar-thumb {
      background: #4c8bb1;
    }
  }
</style>
