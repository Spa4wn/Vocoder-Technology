document.addEventListener("DOMContentLoaded", function() {
    const editProfileButton = document.getElementById("editProfileButton");
    const editProfileModal = document.getElementById("editProfileModal");
    const closeButton = document.querySelector(".close-button");
    const editProfileForm = document.getElementById("editProfileForm");

    
    function loadProfileData() {
        const username = localStorage.getItem("username");
        const email = localStorage.getItem("email");
        const bio = localStorage.getItem("bio");
        const profilePicture = localStorage.getItem("profilePicture");

        if (username) document.getElementById("usernameDisplay").textContent = username;
        if (email) document.getElementById("emailDisplay").textContent = email;
        if (bio) document.getElementById("bioDisplay").textContent = bio;
        if (profilePicture) document.getElementById("profilePicture").src = profilePicture;
    }

    
    function saveProfileData(username, email, bio, profilePicture) {
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("bio", bio);
        if (profilePicture) {
            localStorage.setItem("profilePicture", profilePicture);
        }
    }

    function openModal() {
        editProfileModal.style.display = "block";
    }

    function closeModal() {
        editProfileModal.style.display = "none";
    }

    editProfileButton.addEventListener("click", openModal);
    closeButton.addEventListener("click", closeModal);

    window.addEventListener("click", function(event) {
        if (event.target === editProfileModal) {
            closeModal();
        }
    });

    editProfileForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("editUsername").value;
        const email = document.getElementById("editEmail").value;
        const bio = document.getElementById("editBio").value;
        const profilePictureInput = document.getElementById("editProfilePicture");

        document.getElementById("usernameDisplay").textContent = username;
        document.getElementById("emailDisplay").textContent = email;
        document.getElementById("bioDisplay").textContent = bio;

        if (profilePictureInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById("profilePicture").src = e.target.result;
                saveProfileData(username, email, bio, e.target.result);
            };
            reader.readAsDataURL(profilePictureInput.files[0]);
        } else {
            saveProfileData(username, email, bio);
        }

        closeModal();
    });

    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", function() {
        alert("Você saiu da sua conta.");
        window.location.href = "index.html";
    });

    
    loadProfileData();
});
