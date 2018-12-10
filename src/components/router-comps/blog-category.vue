<template>
    <div class="bc-container">
      <div class="item" v-for="blog in curBlogs" @click="enterBlog(blog)">
        <div class="item-title">{{blog.title}}</div>
        <div class="item-info">{{blog.info}}</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "blog-category",
      data(){
          return{
            blogs:[],
            curBlogs:[]
          }
      },
      created(){
        this.init();
      },
      methods:{
        init(){
          this.axios.get('/api/getblogs').then((res)=>{
            this.blogs=res.data;
            let curCategory=this.$router.currentRoute.params.title;
            this.curBlogs=this.filterBlogs(curCategory,this.blogs);
            console.log(this.curBlogs);
          }).catch((err)=>{
            console.log(err);
          });
        },
        enterBlog(curBlog){
          this.setCookie("curBlog",JSON.stringify(curBlog),30);
          this.$router.push('/blog');
        },
        filterBlogs(curCategory,blogs){
          let curBlogs=[];
          for(let i=0;i<blogs.length;i++){
            if(blogs[i].category==curCategory){
              curBlogs.push(blogs[i]);
            }
          }
          return curBlogs;
        }
      },
      watch: {
        '$route' (to, from) {
          let curCategory=this.$router.currentRoute.params.title;
          this.curBlogs=this.filterBlogs(curCategory,this.blogs);
        }
      }
    }
</script>

<style scoped>
  .bc-container{
    width: 100%;
    height: fit-content;
  }
  .item{
    width: 100%;
    height: 10rem;
    background-color: white;
    margin-top: 2rem;
    cursor: pointer;
    box-shadow: 0px 0px 5px 5px rgba(238, 238, 238, 0.51);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    color: black;
  }
  .item:hover{
    transform: scale3d(1.05,1.05,1.05);
  }
  .item-title{
    font-size: 2rem;
    margin-left: 2rem;
  }
  .item-title:hover{
    transform: none;
  }
  .item-info{
    margin-left: 2rem;
  }
</style>
