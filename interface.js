document.addEventListener('DOMContentLoaded', function() {
var savedUsername = localStorage.getItem('savedUsername');
// console.log(savedUsername)
document.getElementById('name_of_user').innerText =  savedUsername;
});
function navigateToNewPage() {
// Change the URL to the desired page
window.location.href = 'quiz.html';
}
