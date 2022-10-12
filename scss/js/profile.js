
/*
import { userData } from "./userData.mjs";
const profileName=document.getElementById('user-name');
const profileImage= document.getElementById('avatar');

profileName.addEventListener('click',(e) =>{
    e.preventDefault();
    console.log('hello profile');
    window.location.href='./profile.html';
    localStorage.getItem(uerName,accessToken);
    console.log(userName);
userData();
})

*/
import { getSession } from './modules/session.mjs';

const API_BASE_URL = "https://nf-api.onrender.com/api/v1";
const registerEndpoint = "/social/auth/register"; // POST
const profilesEndpoint = "/social/profiles/"; // POST
const allPostsEndpoint = "/social/posts"; // GET
const userName=localStorage.getItem('username');
const accessToken=localStorage.getItem('accessToken');

const aProfileEndpoint=`${API_BASE_URL}${profilesEndpoint}${userName}`;
const homeURL = `${API_BASE_URL}${profilesEndpoint}`;

console.log(aProfileEndpoint);
const profileName= document.getElementById('user-name');
const email = document.getElementById('email');
const banner=document.getElementById('cover');
const avatar=document.getElementById('avatar');
const logOutBtn=document.getElementById('logout');
const filterBtn=document.getElementById('filter-modal');
const modalBox= document.getElementsByClassName('.modal');


  fetch(`${aProfileEndpoint}`,{
    method: 'GET',
    headers:{
      Authorization: `Bearer ${accessToken}`,
      mode: 'no-cors',
      cache: 'default',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(),
})
.then((response) => response.json())
.then((data) => {
userData(data);
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});

function userData(user){
  console.log(user.name);
  profileName.innerHTML = user.name;
  avatar.src=user.avatar;
  //banner.src=user.banner;
  //console.log(user.banner);

  
}

