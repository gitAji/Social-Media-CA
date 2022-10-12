import { listAPost,deletePost, editPost, listEditPost} from "./utils.mjs";


const params = new URLSearchParams(document.location.search);
const id = params.get("id");
const API_BASE_URL = "https://nf-api.onrender.com/api/v1";
const aPostEndPoint="/social/posts/"; // GET
const moreDataPoint="?_author=true&_reactions=true&_comments=true";
const aSinglePostURL=`${API_BASE_URL}${aPostEndPoint}${id}${moreDataPoint}`;
const out=document.getElementById('aPost');



async function getAPost (url) {
    try {
        const accessToken = localStorage.getItem('accessToken'); 
        const options = {
            method: 'GET', 
            headers : {
                Authorization: `Bearer ${accessToken}`,
            }
        }
        console.log(url);
        console.log(accessToken);

        const response = await fetch(url,options); 
        console.log(response);
        const posts = await response.json();
        console.log(posts);
        listAPost(posts,out);
       

    } catch(error) {
        console.warn(error);
    }
}
getAPost(aSinglePostURL);


async function getEditPost (url) {
    try {
        const accessToken = localStorage.getItem('accessToken'); 
        const options = {
            method: 'GET', 
            headers : {
                Authorization: `Bearer ${accessToken}`,
            }
        }
        console.log(url);
        console.log(accessToken);

        const response = await fetch(url,options); 
        console.log(response);
        const posts = await response.json();
        console.log(posts);
        listEditPost(posts)

    } catch(error) {
        console.warn(error);
    }
}
getEditPost(aSinglePostURL);


//delete a post

const deletePostUrl=`${API_BASE_URL}${aPostEndPoint}${id}`;

const deleteBtn=document.getElementById('deleteBtn');


localStorage.getItem('userName');
deleteBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log("delete btn clicked");
    
    deletePost(deletePostUrl);
})


//edit a post
const editBtn=document.getElementById('editBtn');

editBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log("edit btn clicked");
    
    listEditPost(posts);
   

})



