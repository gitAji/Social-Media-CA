
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
    })


export async function loginUser(url,data){
    try {
        const options = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(data),
        };
        console.log(url, data, options);

        const response = await fetch(url, options); 
        console.log(response);
        const answer = await response.json();
        console.log(answer);

        localStorage.setItem('username', answer.name);
        localStorage.setItem('accessToken', answer.accessToken);


    } catch(error) {
        console.warn(error);
    }
}
loginUser(loginURL, loginData);




