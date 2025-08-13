

document.getElementById("home").addEventListener('click',async function (e){
    e.preventDefault();

    fetch("/logout")
  .then(() => {
    location = "/";
  });


    console.log("hello");
})