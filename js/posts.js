import { getAllPosts } from "./utils.mjs";
import{listPosts} from "./utils.mjs";
 
 const API_BASE_URL = "https://nf-api.onrender.com/api/v1";
 const allPostsEndpoint = "/social/posts/?_author=true&_reactions=true&_comments=true"; // GET
 const getAllPostsURL = `${API_BASE_URL}${allPostsEndpoint}`;
 const aPostEndPoint = "/social/posts/${id}";
 const likeEndpoint = 'react/👍';
 const likeURL=`${API_BASE_URL}${aPostEndPoint}${likeEndpoint}`;

 /*
 const likeBtn=document.getElementById('like'); // this is not possible because the like button does not have an unique id 

 likeBtn.addEventListener('click',(e) => {
  e.preventDefault();
  console.log('like');
 });

getAllPosts(getAllPostsURL);

listPosts(data);


likePost(likeURL);
*/