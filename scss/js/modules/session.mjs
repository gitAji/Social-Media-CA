export function getSession(){
    const token=localStorage.getItem("accessToken");
    if(token!=null){
            window.location.href='./index.html'
        };
}

