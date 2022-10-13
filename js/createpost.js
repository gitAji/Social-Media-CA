
const API_BASE_URL = "https://nf-api.onrender.com/api/v1";
const createPost = "/social/posts"; // POST
const createPostsURL = `${API_BASE_URL}${createPost}`;
const postButton=document.getElementById('post-btn');
const userMessage=document.getElementById('validation-message');

postButton.addEventListener('click',(e) =>{
e.preventDefault();
//console.log('btn clicked');


const body=document.getElementById('post-body').value.trim();
const title=document.getElementById('post-title').value.trim();

if(title===""|| body==="")
{   
userMessage.innerHTML=`<div class="text-warning">Please fill all the fields!<div>`;
return false;
}

const postData={
    title,
    body
};
//console.log(postData);


createPost(createPostsURL,postData);


async function createPost(url, data) {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, options);
    //console.log(response);
    const json = await response.json();
    setTimeout(() => {
        window.location.reload();
        }, 1000);
    if (response.ok){
       userMessage.innerHTML=`<div class="spinner-border text-primary" role="status">
       <span class="sr-only">Loading...</span>
     </div>`;
    };
    //console.log(json);
    return json;
    
  } catch (error) {
    console.log(error);
  }
}

})