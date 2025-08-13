

document.getElementById("loginform").addEventListener('submit',async function(e){
    e.preventDefault();

 const username = document.getElementById("username").value;
 const password = document.getElementById("password").value;

 const result = await fetch ("/login",{
   
    method: "POST",
    headers : {"Content-Type" : "application/json"},
    body : JSON.stringify({username,password})
 })



  const data = await result.json();

  document.getElementById('message').innerHTML=data.message;

  if(data.success){
     location="/dashboard"
  }
  else{
    location="/"
  }

})



