import {
  getOwnPosts
} from "./utils.mjs";
import {
  listOwnPosts
} from "./utils.mjs";



const API_BASE_URL = "https://nf-api.onrender.com/api/v1";
const allPostsEndpoint = "/social/posts/?_author=true&_reactions=true&_comments=true"; // GET
const postUrl = `${API_BASE_URL}${allPostsEndpoint}`;



getOwnPosts(postUrl);
listOwnPosts();