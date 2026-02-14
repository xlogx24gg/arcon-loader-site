function logged(){
  return localStorage.getItem("auth") === "true";
}

function requireAuth(){
  if(!logged()){
    window.location.href = "login.html";
  }
}

function login(){
  localStorage.setItem("auth","true");
  window.location.href = "index.html";
}

function logout(){
  if(!logged()) return;
  localStorage.removeItem("auth");
  window.location.href = "login.html";
}
