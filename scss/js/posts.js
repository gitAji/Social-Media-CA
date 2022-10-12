import { getAllPosts } from "./utils.mjs";
import{listPosts} from "./utils.mjs";
 
 const API_BASE_URL = "https://nf-api.onrender.com/api/v1";
 const allPostsEndpoint = "/social/posts/?_author=true&_reactions=true&_comments=true"; // GET
 const getAllPostsURL = `${API_BASE_URL}${allPostsEndpoint}`;

getAllPosts(getAllPostsURL);

listPosts(data);



