function userLogOut(){
const logout=document.getElementById('logout');
 logout.onclick=function(){
    console.log('logout');
    localStorage.clear();
    window.location.href='./index.html';
}
}
