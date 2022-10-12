/**
 * get all post
 */

const API_BASE_URL = "https://nf-api.onrender.com/api/v1";
const allPostsEndpoint = "/social/posts/?_author=true&_reactions=true&_comments=true"; // GET
const getAllPostsURL = `${API_BASE_URL}${allPostsEndpoint}`;
const aPostEndPoint = "/social/posts/${id}";

const allPosts = document.getElementById('allPosts');
let collection=[];

export async function getAllPosts(url) {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    }
    console.log(url, options);

    const response = await fetch(url, options);
    console.log(response);
    const data = await response.json();
    console.warn(data);
    collection = data;
    listPosts(data, allPosts);
  } catch (error) {
    console.warn(error);
  }
}
getAllPosts(getAllPostsURL);




/**
 * list post
 */



export function listPosts(posts) {

  allPosts.innerHTML = "";
  let newPost = "";

  for (let post of posts) {
    const date = new Date(post.created);
    const postedDate = date.toLocaleString();
    console.log(post);
    newPost += ` <div class="card p-2">

    <div class="d-flex">
      <img class="rounded-circle profile-img" src="/images/mark.png" alt="profile" />
      <h5 class="card-title py-3">${post.author.name}</h5>
    </div>
    <a href="/apost.html?id=${post.id}">
    <h5> ${post.title}</h5>  </a>
    <p class="card-body">
    ${post.body}
    </p>
    <div class="card-img-top">
   
    </div>
  
  
    <div class="card-bottom">
      <i class="far fa-thumbs-up">${post._count.reactions}</i>
      <i class="far fa-comment">${post._count.comments}</i>
    </div>
    <p class="card-text">
      <small class="text-muted">Created:${postedDate}</small>
    </p>
    <hr>
    <div class="form-floating">
      <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"
        style="height: 70px"></textarea>
      <label for="floatingTextarea2">Write a comment</label>
    </div>
  </div>  
     `;
  }
  allPosts.innerHTML = newPost;

}
//filter posts
const searchInput = document.getElementById("search-input");

searchInput.addEventListener("keyup",filterPosts);

function filterPosts(){
 
  const filterQuery = searchInput.value;
  console.log(filterQuery);
  const filteredPost = collection.filter((post) => {
    const t = post.title.toLowerCase();
    const b = post.body.toLowerCase();
    if (t.indexOf(filterQuery) > -1) return true;
    if (b.indexOf(filterQuery) > -1) return true;

    return false;
    console.log(t, b);
  })
  listPosts(filteredPost);
}

/**
 * listing own posts
 */
 const postUrl = `${API_BASE_URL}${allPostsEndpoint}`;
 
const userName = localStorage.getItem('username');
const accessToken = localStorage.getItem('accessToken');
const ownPosts = document.getElementById('ownPosts');


export async function getOwnPosts(postUrl) {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    }
    console.log(postUrl, options);

    const response = await fetch(postUrl, options);
    console.log(response);
    const data = await response.json();
    console.log(data);
    listOwnPosts(data);
    listManagePosts(data);

  } catch (error) {
    console.warn(error);
  }
}

export function listOwnPosts(posts) {
  const userPosts = posts.filter(post => post.author.name === userName);
  console.log(userPosts.length);
  if (userPosts.length == 0) {
    console.log("hello");
    ownPosts.innerHTML = `<div class="p-1 m-2"><h4>Hello! ${userName},</h4><br></h5>There is no post to display!</></div>
<div class="p-3"> <p>Start posting now.</p></div>`;
  } else {
    ownPosts.innerHTML = "";
    let newPost = "";
    for (let post of userPosts) {
      const date = new Date(post.created);
      const postedDate = date.toLocaleString();
      console.log(post);
      newPost += `<div class="card">
          <div class="d-flex">
            <img class="rounded-circle profile-img" src="/images/mark.png" alt="profile" />
            <h5 class="card-title py-3">${post.author.name}</h5>
          </div>
          <a href="/apost.html?id=${post.id}">
          <h5> ${post.title}</h5>  </a>
          <p class="card-body">
          ${post.body}
          </p>
        
          <div class="card-bottom">
            <i class="far fa-thumbs-up">${post._count.reactions}</i>
            <i class="far fa-comment">${post._count.comments}</i>
          </div>
          <p class="card-text">
            <small class="text-muted">Created:${postedDate}</small>
          </p>
          <hr>
          <div class="form-floating">
            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"
              style="height: 70px"></textarea>
            <label for="floatingTextarea2">Write a comment</label>
          </div>
        </div>
     `;
    }
    ownPosts.innerHTML = newPost;
  }
}






/**
 * manage post
 */
const managePost = document.getElementById('managePost');
const filterPost = document.getElementById('filterPost');

export async function getManagePosts(postUrl) {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    }
    console.log(postUrl, options);

    const response = await fetch(postUrl, options);
    console.log(response);
    const data = await response.json();
    console.log(data);
    listManagePosts(data);
  } catch (error) {
    console.warn(error);
  }
}
export function listManagePosts(posts) {
  const userPosts = posts.filter(post => post.author.name === userName);
  managePost.innerHTML = "";
  let newPost = "";
  for (let post of userPosts) {
    console.log(post);
    newPost += `<div class="card d-flex flex-row flex-lg-nowrap">
      <div class="card-body">
          
          <h5> ${post.title}</h5>  </div>
          <div class="card-footer d-flex flex-lg-nowrap">
          <a href="/apost.html?id=${post.id}">
          <button class="btn btn-light"  data-toggle="tooltip" title="Click here to modify post" data-placement="left" id="edit" type="submit"> <i class="fa fa-eye"></i></button>
          </a>
          </div>
        </div>
     `;
  }
  managePost.innerHTML = newPost;
  filterPost.innerHTML = newPost;
}


/**
 * list a post
 */
const out=document.getElementById('aPost');
const editBtn=document.getElementById('editBtn');
const deleteBtn=document.getElementById('deleteBtn');

export function listAPost(post, out) {
  const date = new Date(post.created);
  const postedDate = date.toLocaleString();
  document.title = post.title;

  if(post.author.name===userName){
  const editButton = document.createElement('button');
  editButton.classList.add('btn');
  editButton.classList.add('btn-primary');
  editButton.classList.add('btn-md');
  editButton.classList.add('m-2');
  editButton.innerText = 'Edit';
  editButton.innerHTML = '<i class="fa fa-pen"></i>';
  editBtn.appendChild(editButton);
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('btn');
  deleteButton.classList.add('btn-secondary');
  deleteButton.classList.add('btn-md');
  deleteButton.classList.add('m-2');
  deleteButton.innerText = 'Delete';
  deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
  deleteBtn.appendChild(deleteButton);
  }
    
  let newDiv = `<div class="card-body" id="">
  <div class="d-flex">
    <img class="rounded-circle profile-img" src="/images/mark.png" alt="profile" />
    <h5 class="card-title py-3">${post.author.name}</h5>
  </div>
 
  <h5> ${post.title}</h5> 
  <p class="card-body">
  ${post.body}
  </p>

  <div class="card-bottom">
    <i class="far fa-thumbs-up">${post._count.reactions}</i>
    <i class="far fa-comment">${post._count.comments}</i>
  </div>
  <p class="card-text">
    <small class="text-muted">Created:${postedDate}</small>
  </p>
  <hr>
  <div class="form-floating">
    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"
      style="height: 70px"></textarea>
    <label for="floatingTextarea2">Write a comment</label>
  </div>
</div>
`;

  out.innerHTML = newDiv;

}

/**
 * get profile
 */



export async function getAllProfiles(url) {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    }
    console.log(url, options);

    const response = await fetch(url, options);
    console.log(response);
    const data = await response.json();
    console.log(data);
    listProfiles(data);

  } catch (error) {
    console.warn(error);
  }
}


const connections = document.getElementById('contacts');

export function listProfiles(profiles) {
  connections.innerHTML = "";
  let newConnection = "";
  for (let profile of profiles) {
    console.log(profile);
    newConnection += `<ul><li class="list-unstyled py-2">
                ${profile.name} 
              </li></ul>`;
  }
  connections.innerHTML = newConnection;
}

/**
 * delete post
 */

 const manageBtn=document.getElementById('manage-button');
export async function deletePost(url) {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    }
    console.log(url, options);

    const response = await fetch(url, options);
    console.log(response);
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      aPost.innerHTML = `<div class="text-danger fw-bold p-4">Your post is deleted!</div>`;
      manageBtn.innerHTML=""; 

      setTimeout(() => {
        window.location.href = '/profile.html';
      }, 2000);

    };
  } catch (error) {
    console.warn(error);
  }
}

/**
 * Edit post
 */

 export async function editPost(url) {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const options = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    }
    console.log(url, options);

    const response = await fetch(url, options);
    console.log(response);
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      aPost.innerHTML = `<div class="text-danger fw-bold p-4">Your post !</div>`;

      setTimeout(() => {
        window.location.href = '';
      }, 2000);

    };
  } catch (error) {
    console.warn(error);
  }
}
//list editable post
const beEdited = document.getElementById('edit-post');
export function listEditPost(posts) {
  for (let post of posts) {
    console.log(post);
  let editable = ` <div class="">
  <div class="form-group py-2">
    <input class="form-control status-head" id="post-title" placeholder="${post.title}">
  </div>

<div class="form-group p-3">
  <textarea class="form-control status-box" id="post-body" rows="5" name="statusData"
    placeholder=" ${post.body}"></textarea>
</div>
</div>
`;

  beEdited.innerHTML = editable;

}
}