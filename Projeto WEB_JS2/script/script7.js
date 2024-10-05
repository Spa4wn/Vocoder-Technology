document.addEventListener("DOMContentLoaded", function() {
    const editProfileButton = document.getElementById("editProfileButton");
    const editProfileModal = document.getElementById("editProfileModal");
    const closeButton = document.querySelector(".close-button");
    const editProfileForm = document.getElementById("editProfileForm");

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
            };
            reader.readAsDataURL(profilePictureInput.files[0]);
        }

        closeModal();
    });

    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", function() {
        alert("Você saiu da sua conta.");
        window.location.href = "index.html";
    });
});
