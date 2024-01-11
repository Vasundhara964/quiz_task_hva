document.addEventListener('DOMContentLoaded', function() {
var savedUsername = localStorage.getItem('savedUsername');
// console.log(savedUsername)
document.getElementById('name_of_user').innerText =  savedUsername;
});