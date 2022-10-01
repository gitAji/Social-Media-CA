
/*
  import{default as calculate,addNumbers as add}from './modules/module.mjs';
  const result=add(30,30);
  console.log(result);
*/
import {userLogOut} from'./logout.mjs';
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
const banner=document.getElementById('banner');
const avatar=document.getElementById('avatar');
const logOutBtn=document.getElementById('logout');


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
  profileData(data);
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});
function profileData(user){
  console.log(user.name);
  profileName.innerHTML = user.name;
  email.innerHTML=user.email;
  avatar.src=user.avatar;

  
}

logOutBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  console.log(e.target);
  getSession();
})
userLogOut();
