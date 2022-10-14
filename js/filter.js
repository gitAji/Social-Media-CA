import {
    getOwnPosts
} from "./utils.mjs";


/**
 * filter post by ID in the manage post modal
 * @param {*} posts
 * @param {*} query
 * @returns
 */
/*
 let collection=[];
 collection=getOwnPosts(posts);
 const searchInput = document.getElementById("filter-search");

 searchInput.addEventListener("keyup",filterPosts);
 
 function filterPosts(){
  
   const filterQuery = searchInput.value;
   //console.log(filterQuery);
   const filteredPost = collection.filter((post) => {
     const t = post.title.toLowerCase();
     const b = post.body.toLowerCase();
     if (t.indexOf(filterQuery) > -1) return true;
     if (b.indexOf(filterQuery) > -1) return true;
 
     return false;
     //console.log(t, b);
   })
   listPosts(filteredPost);
 }

*/