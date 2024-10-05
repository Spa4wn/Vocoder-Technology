
function openEditProfileModal() {
    const modal = document.getElementById("editProfileModal");
    modal.style.display = "block";
}


function closeEditProfileModal() {
    const modal = document.getElementById("editProfileModal");
    modal.style.display = "none";
}


function updateProfile() {
    const username = document.getElementById("editUsername").value;
    const email = document.getElementById("editEmail").value;
    const bio = document.getElementById("editBio").value;

    
    document.getElementById("usernameDisplay").innerText = username;
    document.getElementById("emailDisplay").innerText = email;
    document.getElementById("bioDisplay").innerText = bio;

    
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("bio", bio);

    
    closeEditProfileModal();
}


function loadProfile() {
    const username = localStorage.getItem("username") || "Usuário";
    const email = localStorage.getItem("email") || "usuario@exemplo.com";
    const bio = localStorage.getItem("bio") || "Esta é a sua biografia.";

    document.getElementById("usernameDisplay").innerText = username;
    document.getElementById("emailDisplay").innerText = email;
    document.getElementById("bioDisplay").innerText = bio;
}


document.addEventListener("DOMContentLoaded", loadProfile);

document.getElementById("editProfileButton").addEventListener("click", openEditProfileModal);
document.querySelector(".close-button").addEventListener("click", closeEditProfileModal);
document.getElementById("editProfileForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    updateProfile();
});
