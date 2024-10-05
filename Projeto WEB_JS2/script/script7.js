  const editProfileButton = document.getElementById('editProfileButton');
    const editProfileModal = document.getElementById('editProfileModal');
    const closeButton = document.querySelector('.close-button');
    const editProfileForm = document.getElementById('editProfileForm');
    const profilePicture = document.getElementById('profilePicture');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const emailDisplay = document.getElementById('emailDisplay');
    const bioDisplay = document.getElementById('bioDisplay');

    if (editProfileButton) {
        editProfileButton.addEventListener('click', () => {
            editProfileModal.style.display = 'block';
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            editProfileModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === editProfileModal) {
            editProfileModal.style.display = 'none';
        }
    });

    if (editProfileForm) {
        editProfileForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const newUsername = document.getElementById('editUsername').value;
            const newEmail = document.getElementById('editEmail').value;
            const newBio = document.getElementById('editBio').value;
            const newProfilePicture = document.getElementById('editProfilePicture').files[0];

            if (newProfilePicture) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profilePicture.src = e.target.result;
                };
                reader.readAsDataURL(newProfilePicture);
            }

            usernameDisplay.textContent = newUsername;
            emailDisplay.textContent = newEmail;
            bioDisplay.textContent = newBio;

            editProfileModal.style.display = 'none';
            alert('Perfil atualizado com sucesso!');
        });
    }
});
