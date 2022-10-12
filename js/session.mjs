export function getSession(){
    const token=localStorage.setItem("accessToken");
}
export function clearSession(){
    const token=localStorage.removeItem("accessToken");
    if(token==undefined){
            window.location.href='./index.html'
        };
}

