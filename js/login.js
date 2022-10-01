   /*
const token=localStorage.getItem("accessToken");
if(token!=null){
        window.location.href='./home.html'
    };

*/


const login=document.getElementById('login');

const API_BASE_URL = "https://nf-api.onrender.com/api/v1";
const registerEndpoint = "/social/auth/register"; // POST
const loginEndpoint = "/social/auth/login"; // POST
const allPostsEndpoint = "/social/posts"; // GET

const loginURL = `${API_BASE_URL}${loginEndpoint}`;
//form on submit
login.addEventListener('click',(event)=>{
    event.preventDefault();
    console.log('form is submitted!');
    
    const email=document.getElementById('email').value.trim();
    const password=document.getElementById('password').value.trim();
    console.log(email,password);
    const loginData={
   email,
   password
}
console.log(loginData);
//fetch using post & send the login data to the server
async function loginUser(url,data){
try{
    const options = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data),
    };
    console.log(url,data,options);

    const response = await fetch(url, options); 
    console.log(response);
    const answer = await response.json();
    console.log(answer);
    if(response.ok){
        const userName=localStorage.setItem('username', answer.name);
        const accessToken=localStorage.setItem('accessToken', answer.accessToken);
        window.location.href='/home.html'
    }
} catch(error) {
    console.warn(error);
}
}
loginUser(loginURL, loginData);
})

