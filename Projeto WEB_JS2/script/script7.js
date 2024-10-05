
document.addEventListener('DOMContentLoaded', () => {
    const editProfileButton = document.getElementById('editProfileButton');
    const editProfileModal = document.getElementById('editProfileModal');
    const closeButton = document.querySelector('.close-button');
    const editProfileForm = document.getElementById('editProfileForm');

    const profilePicture = document.getElementById('profilePicture');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const emailDisplay = document.getElementById('emailDisplay');
    const bioDisplay = document.getElementById('bioDisplay');

    
    function loadProfileData() {
        const savedProfilePicture = localStorage.getItem('profilePicture');
        const savedUsername = localStorage.getItem('username');
        const savedEmail = localStorage.getItem('email');
        const savedBio = localStorage.getItem('bio');

        if (savedProfilePicture) profilePicture.src = savedProfilePicture;
        if (savedUsername) usernameDisplay.textContent = savedUsername;
        if (savedEmail) emailDisplay.textContent = savedEmail;
        if (savedBio) bioDisplay.textContent = savedBio;
    }

  
    function saveProfileData() {
        const editProfilePicture = document.getElementById('editProfilePicture').files[0];
        const editUsername = document.getElementById('editUsername').value;
        const editEmail = document.getElementById('editEmail').value;
        const editBio = document.getElementById('editBio').value;

        if (editProfilePicture) {
            const reader = new FileReader();
            reader.onload = function () {
                localStorage.setItem('profilePicture', reader.result);
                profilePicture.src = reader.result;
            };
            reader.readAsDataURL(editProfilePicture);
        }

        localStorage.setItem('username', editUsername);
        localStorage.setItem('email', editEmail);
        localStorage.setItem('bio', editBio);

        usernameDisplay.textContent = editUsername;
        emailDisplay.textContent = editEmail;
        bioDisplay.textContent = editBio;
    }

    editProfileButton.addEventListener('click', () => {
        editProfileModal.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        editProfileModal.style.display = 'none';
    });

    editProfileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveProfileData();
        editProfileModal.style.display = 'none';
    });

    
    loadProfileData();
});
