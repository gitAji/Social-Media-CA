

const API_BASE_URL = "https://nf-api.onrender.com/api/v1";
const registerEndpoint = "/social/auth/register"; // POST
const registerURL = `${API_BASE_URL}${registerEndpoint}`;

const userName = document.getElementById('name');
const userEmail = document.getElementById('email');
const userPassword = document.getElementById('password');
const userConfirmPassword = document.getElementById('confirm-password');
const userAvatar = document.getElementById('avatar');
const userBanner = document.getElementById('banner');
const userMessage=document.getElementById('userMessage');

const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const confirmPasswordError = document.getElementById('confirm-password-error');

const signup = document.getElementById('signup');


signup.addEventListener('click',(e) => {
    e.preventDefault();
    console.log('form is submitted!');
    

    const name=userName.value.trim();
    const email=userEmail.value.trim();
    const password=userPassword.value.trim();
    const avatar=userAvatar.value.trim();
    const banner=userBanner.value.trim();



    const registerData = {
        name,
        email,
        password
       

    }
    console.log(userName);
    console.log(registerData);
// just sending these three data, others have validation error

    async function registerUser(url, data) {
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
            if (response.ok){
                userMessage.innerHTML=`
                <div class="alert alert-success" role="alert">
                You are registered now! Please login!
              </div>`;
                
                setTimeout(() => {
                 window.location.href='/index.html';
                 }, 5000);
              
             };
        } catch (error) {
            console.warn(error);
        }
    }
    registerUser(registerURL,registerData);

})




signup.addEventListener('click', formValidation);

function formValidation(e) {
    e.preventDefault();

   if( email==="")
   {
   
    emailError.classList.add('text-danger');
    emailError.innerHTML='*Required';

   }
   
}