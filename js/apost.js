import { listAPost,deletePost,donePost} from "./utils.mjs";


const params = new URLSearchParams(document.location.search);
const id = params.get("id");
const API_BASE_URL = "https://nf-api.onrender.com/api/v1";
const aPostEndPoint="/social/posts/"; // GET
const moreDataPoint="?_author=true&_reactions=true&_comments=true";
const aSinglePostURL=`${API_BASE_URL}${aPostEndPoint}${id}${moreDataPoint}`;
const out=document.getElementById('aPost');
const editURL=`${API_BASE_URL}${aPostEndPoint}${id}`;


/**
 * @param {*} url 
 * @returns single post
 */
async function getAPost (url) {
    try {
        const accessToken = localStorage.getItem('accessToken'); 
        const options = {
            method: 'GET', 
            headers : {
                Authorization: `Bearer ${accessToken}`,
            }
        }
        //console.log(url);
        //console.log(accessToken);

        const response = await fetch(url,options); 
        //console.log(response);
        const posts = await response.json();
        //console.log(posts);
        listAPost(posts,out);
       

    } catch(error) {
        //console.warn(error);
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
        //console.log(url);
        //console.log(accessToken);

        const response = await fetch(url,options); 
        //console.log(response);
        const posts = await response.json();
        //console.log(posts);
        listEditPost(posts)

    } catch(error) {
        console.warn(error);
    }
}
getEditPost(editURL);


/**
 * delete post
 * @param {*} url
 * @returns status code
 */

const deletePostUrl=`${API_BASE_URL}${aPostEndPoint}${id}`;

const deleteBtn=document.getElementById('deleteBtn');


localStorage.getItem('userName');
deleteBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log("delete btn clicked");
    
    deletePost(deletePostUrl);
})


/**
 * edit post
 * @param {*} url
 * @returns a post
 */

const editTitle=document.getElementById('posted-title');
const editBody=document.getElementById('posted-body');
const editBtn=document.getElementById('editBtn');
const saveBtn=document.getElementById('edit-save-btn');
const message= document.getElementById('user-message');


function listEditPost(posts){
    editTitle.value=posts.title;
    editBody.value=posts.body;
}



editBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    //console.log("edit btn clicked");
    
    listEditPost();
   

})

saveBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    //console.log("save btn clicked");
    const editedTitle=editTitle.value;
    const editedBody=editBody.value;
    const editedPost={
        title:editedTitle,
        body:editedBody
    }
    if(editedPost.title===""||editedPost.body===""){
        //console.log("please fill all the fields");
        message.innerHTML=`<div class="text-warning">Please fill all the fields!<div>`;
        return false;
    }
console.log(editedPost);
   donePost(editURL,editedPost);
})






