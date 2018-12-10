const pool=require('./mysql_pool');
const express=require('express');
const router=express.Router();

router.get('/api/getblogs',(req,res)=>{
  pool.query('select * from blogs',(err,result)=>{
    if (err) throw err;
    let blogs=[];
    for(let i=0;i<result.length;i++){
      let blog={
        title:result[i].name,
        info:result[i].info,
        category:result[i].category,
        path:result[i].path
      }
      blogs.push(blog);
    }
    res.send(JSON.stringify(blogs));
  });
});

module.exports = router;

