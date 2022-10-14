/**
 * @param {url} allPostsEndpoint
 * @param {Array} allPosts
 * @returns

 */

const API_BASE_URL = "https://nf-api.onrender.com/api/v1";
const allPostsEndpoint = "/social/posts/?_author=true&_reactions=true&_comments=true"; // GET
const getAllPostsURL = `${API_BASE_URL}${allPostsEndpoint}`;
const aPostEndPoint = "/social/posts/${id}";

const allPosts = document.getElementById('allPosts');
let collection = [];

export async function getAllPosts(url) {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    }
    //console.log(url, options);

    const response = await fetch(url, options);
    //console.log(response);
    const data = await response.json();
    //console.warn(data);
    collection = data;
    listPosts(data, allPosts);
  } catch (error) {
    console.warn(error);
  }
}
getAllPosts(getAllPostsURL);




/**
 * 
 * @param {*} posts 
 * @param {*} allPosts
 * @returns
 */



export function listPosts(posts) {

  allPosts.innerHTML = "";
  let newPost = "";

  for (let post of posts) {
    const date = new Date(post.created);
    const postedDate = date.toLocaleString();
    //console.log(post);
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
      <i class="far fa-thumbs-up" data-id="like">${post._count.reactions}</i>
      <i class="far fa-comment" data-id="comment">${post._count.comments}</i>
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
/**
 * filter post by title and body
 * @param {*} posts
 * @param {*} query
 */
const searchInput = document.getElementById("search-input");

searchInput.addEventListener("keyup", filterPosts);

function filterPosts() {

  const filterQuery = searchInput.value;
  const query = localStorage.setItem("filterQuery", filterQuery); // session storage doesn't work
  //console.log(filterQuery);
  const filteredPost = collection.filter((post) => {
    const id = post.id.toLocaleString();
    const t = post.title.toLowerCase();
    const b = post.body.toLowerCase();
    const q = filterQuery.toLowerCase();
    return t.includes(q) || b.includes(q) || id.includes(q);
  });
  //console.log(filteredPost);
  listPosts(filteredPost);

  if (filteredPost.length === 0) {
    allPosts.innerHTML = `<div=class="text-primary"> No result found for "${filterQuery}" </div><div class="text-warning">Use back key to clear!</div>`;
  }

}

/**
 * 
 * @param {*} posts
 * @returns 
 */
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
    //console.log(postUrl, options);

    const response = await fetch(postUrl, options);
    //console.log(response);
    const data = await response.json();
    //console.log(data);
    listOwnPosts(data);
    listManagePosts(data);
    listEditPost(data);

  } catch (error) {
    console.warn(error);
  }
}
/**
 * @param {*} posts 
 */

export function listOwnPosts(posts) {
  const userPosts = posts.filter(post => post.author.name === userName);
  //console.log(userPosts.length);
  if (userPosts.length == 0) {
    //console.log("hello");
    ownPosts.innerHTML = `<div class="p-1 m-2"><h4>Hello! ${userName},</h4><br></h5>There is no post to display!</></div>
<div class="p-3"> <p>Start posting now.</p></div>`;
  } else {
    ownPosts.innerHTML = "";
    let newPost = "";
    for (let post of userPosts) {
      const date = new Date(post.created);
      const postedDate = date.toLocaleString();
      //console.log(post);
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
            <i class="far fa-thumbs-up" id="like">${post._count.reactions}</i>
            <i class="far fa-comment" id="comment">${post._count.comments}</i>
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
 * @param {*} posts
 * @returns
 */
const managePost = document.getElementById('managePost');
const filterPost = document.getElementById('filterPost');

export function listManagePosts(posts) {
  const userPosts = posts.filter(post => post.author.name === userName);
  managePost.innerHTML = "";
  let newPost = "";
  for (let post of userPosts) {
    //console.log(post);
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
 * @param {*} posts
 * @returns
 */
const out = document.getElementById('aPost');
const editBtn = document.getElementById('editBtn');
const deleteBtn = document.getElementById('deleteBtn');

export function listAPost(post, out) {
  const date = new Date(post.created);
  const postedDate = date.toLocaleString();
  document.title = post.title;

  if (post.author.name === userName) {
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
    <i class="far fa-thumbs-up" id="like">${post._count.reactions}</i>
    <i class="far fa-comment" id="comment">${post._count.comments}</i>
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
 * get profiles
 * @param {*} user
 * @returns
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
    //console.log(url, options);

    const response = await fetch(url, options);
    //console.log(response);
    const data = await response.json();
    //console.log(data);
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
    //console.log(profile);
    newConnection += `<ul><li class="list-unstyled py-2">
                ${profile.name} 
              </li></ul>`;
  }
  connections.innerHTML = newConnection;
}

/**
 * delete post
 * @param {*} post

 */

const manageBtn = document.getElementById('manage-button');
export async function deletePost(url) {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    }
    //console.log(url, options);

    const response = await fetch(url, options);
    //console.log(response);
    const data = await response.json();
    //console.log(data);

    if (response.ok) {
      aPost.innerHTML = `<div class="text-danger fw-bold p-4">Your post is deleted!</div>`;
      manageBtn.innerHTML = "";

      setTimeout(() => {
        window.location.href = '/profile.html';
      }, 2000);

    };
  } catch (error) {
    console.warn(error);
  }
}

/**
 * edit post
 * @param {*} post
 * @returns
 */
const message = document.getElementById('user-message');
const saveBtn=document.getElementById('edit-save-btn');
const manageBtnX = document.getElementById('manage-button');

export async function donePost(url, data) {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const options = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, options);
    //console.log(response);
    const json = await response.json();
    
    if (response.ok) {
     setTimeout(() => {
      message.innerHTML = `<div class="text-success fw-bold p-4">Your post is updated!</div>`;
     }, 500);
     setTimeout(() => {
      window.location.reload();
    }, 1000);
     
      
    };
    //console.log(json);
    return json;

  } catch (error) {
    console.log(error);
  }
}





/*

export async function likePost(url) {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const options = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    //console.log(response);
    const json = await response.json();
    console.log(json);
    if (response.ok) {
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}
*/