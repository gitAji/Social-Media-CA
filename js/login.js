const API_BASE_URL = "https://nf-api.onrender.com/api/v1";
const registerEndpoint = "/social/auth/register"; // POST
const loginEndpoint = "/social/auth/login"; // POST
const allPostsEndpoint = "/social/posts"; // GET

const loginURL = `${API_BASE_URL}${loginEndpoint}`;


//form on submit
login.addEventListener('click', (event) => {
    event.preventDefault();
    //console.log('form is submitted!');


    const login = document.getElementById('login');
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const userMessage = document.getElementById('userMessage');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    //console.log(email, password);
    /**
     * Validation limitations
     * if email is already in use this validation showing the same email error message because there is no function to check duplicate email in the DB
     */
    var validation = true;
    
     if(email === ""){
        emailError.innerHTML = 'Email is required';
        validation = false;
    } else if(email.includes != "noroff.no || student.noroff.no"){
        emailError.innerHTML = "Please enter your student email address.";
        validation = false;
        
    } else {
        emailError.innerHTML = "";
        validation = true;
    }
    if(password === ""){
        passwordError.innerHTML = 'Password is required';
        validation = false;
    }
    else if(password.length < 8){
        passwordError.innerHTML = "Password is too short.";
        validation = false;
    } else {
        passwordError.innerHTML = "";
        validation = true;
    }

    const loginData = {
        email,
        password
    }
    //console.log(loginData);
    //fetch using post & send the login data to the server
    async function loginUser(url, data) {
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
                const userName = localStorage.setItem('username', answer.name);
                const accessToken = localStorage.setItem('accessToken', answer.accessToken);
                window.location.href = '/home.html'
            }
        } catch (error) {
            console.warn(error);
        }
    }
    loginUser(loginURL, loginData);
})
