

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



signup.addEventListener('click', (e) => {   
    e.preventDefault();
    //console.log('form is submitted!');
    
    const name = userName.value.trim();
    const email = userEmail.value.trim();
    const password = userPassword.value.trim();
    const confirmPassword = userConfirmPassword.value.trim();
    const avatar = userAvatar.value.trim();
    const banner = userBanner.value.trim();
    const userMessage = document.getElementById('userMessage');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    
    if (name === "" || name.length < 5) {
        nameError.innerHTML = "Please enter your name.";
    } else {
        nameError.innerHTML = "";
    }
    
    if (email === "" || email.includes != "noroff.no") {
        emailError.innerHTML = "Please enter a valid email address.";
    } else {
        emailError.innerHTML = "";
    }
    
    if (password === "" || password.length < 8) {
        passwordError.innerHTML = "Please enter a valid password.(8 characters)";
    } else {
        passwordError.innerHTML = "";
    }
    
    if (confirmPassword === "" || confirmPassword.length < 6) {
        confirmPasswordError.innerHTML = "Please enter a valid password.";
    } else {
        confirmPasswordError.innerHTML = "";
    }
    
    if (password !== confirmPassword) {
        confirmPasswordError.innerHTML = "Passwords do not match.";
    } else {
        confirmPasswordError.innerHTML = "";
    }
    
    const registerData = {
        name,
        email,
        password
    }
    //console.log(registerData); 
    
    async function registerUser(url, data) {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };
            //console.log(url, data, options);
    
            const response = await fetch(url, options);
            //console.log(response);
            const answer = await response.json();
            //console.log(answer);
            if (response.ok) {
                userMessage.innerHTML = `
                <div class="alert alert-success" role="alert">
                You are registered now! Please login!
              </div>`;
    
                setTimeout(() => {
                    window.location.href = '/index.html';
                }, 5000);
    
            };
        } catch (error) {
            //console.warn(error);
        }
    }
    registerUser(registerURL, registerData);

})


