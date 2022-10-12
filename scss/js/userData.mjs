const API_BASE_URL = "https://nf-api.onrender.com/api/v1";
const registerEndpoint = "/social/auth/register"; // POST
const profilesEndpoint = "/social/profiles/"; // POST
const allPostsEndpoint = "/social/posts"; // GET
const userName=localStorage.getItem('username');
const accessToken=localStorage.getItem('accessToken');

const aProfileEndpoint=`${API_BASE_URL}${profilesEndpoint}${userName}`;
const homeURL = `${API_BASE_URL}${profilesEndpoint}`;

const profileName= document.getElementById('user-name');
const email = document.getElementById('email');
const banner=document.getElementById('banner');
const avatar=document.getElementById('avatar');


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

export function userData(user){
    console.log(user.name);
    profileName.innerHTML = user.name;
    email.innerHTML=user.email;
    avatar.src=user.avatar;
   }