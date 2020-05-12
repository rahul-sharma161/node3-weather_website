/*FORMS IN NODE JS
create form in index.hbs
default refresh of form page is avoideide by e.preventdefault()
 to grab the input from user use document.querySelector('element')
 to use the variable store the Element.value in a variable*/

//const request=require()
console.log("its the  client side js file's content");

//message-1,2 are ids in index.hbs;
const messageone = document.querySelector("#message-1");
const messagetwo = document.querySelector("#message-2");

const weatherForm = document.querySelector("form"); //within strings are the elemnets in index.hbs
const search = document.querySelector("input");

weatherForm.addEventListener("submit", (e) => {
    //in call back e is the event that is occuring
    e.preventDefault(); // to prevent the default refresh when submit is clicked
    const val = search.value;

    messageone.textContent = "loading.....";
    messagetwo.textContent = " ";

    fetch(`/weather?address=${val}`).then((response) => {
        response.json().then((data) => {
            //read the function in js notes
            if (data.error) {
                messageone.textContent = data.error;
            } else messageone.textContent = data.location;
            messagetwo.textContent = data.forecast;
        });
    });
});