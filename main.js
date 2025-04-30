// DOM Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initForms();
    initSearch();
    initObservationCards();
});

// Form Handling
function initForms() {
    // Registration Form
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateRegistrationForm();
        });
    }

    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateLoginForm();
        });
    }

    // Observation Form
    const observationForm = document.getElementById('observationForm');
    if (observationForm) {
        observationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateObservationForm();
        });

        // Image upload validation
        const imageInput = document.getElementById('birdImage');
        if (imageInput) {
            imageInput.addEventListener('change', validateImageUpload);
        }
    }
}

// Form Validation Functions
function validateRegistrationForm() {
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Simple validation - in a real app, this would be more comprehensive
    if (username.length < 3) {
        alert('Username must be at least 3 characters long');
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address');
        return;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters long');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // In a real app, this would send data to the server
    alert('Registration successful! You can now login.');
    window.location.href = 'login.html';
}

function validateLoginForm() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (username === '' || password === '') {
        alert('Please enter both username and password');
        return;
    }

    // In a real app, this would send data to the server
    alert('Login successful!');
    window.location.href = 'new-post.html';
}

function validateObservationForm() {
    const requiredFields = [
        'observerName', 'location', 'observationDate', 
        'observationTime', 'birdSpecies', 'activity', 'duration'
    ];

    for (const fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field.value) {
            alert(`Please fill in the ${field.labels[0].textContent} field`);
            field.focus();
            return;
        }
    }

    // In a real app, this would send data to the server
    alert('Observation submitted successfully!');
    window.location.href = 'posts.html';
}

function validateImageUpload() {
    const fileInput = this;
    const maxSize = 1.2 * 1024 * 1024; // 1.2MB in bytes
    const allowedTypes = ['image/jpeg', 'image/png'];

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        
        if (!allowedTypes.includes(file.type)) {
            alert('Only JPG and PNG images are allowed');
            fileInput.value = ''; // Clear the input
            return;
        }

        if (file.size > maxSize) {
            alert('Image size must be less than 1.2MB');
            fileInput.value = ''; // Clear the input
            return;
        }
    }
}

// Search Functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    if (searchInput && searchButton) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    const observationCards = document.querySelectorAll('.observation-card');

    if (searchTerm === '') {
        observationCards.forEach(card => card.style.display = '');
        return;
    }

    observationCards.forEach(card => {
        const cardText = card.textContent.toLowerCase();
        if (cardText.includes(searchTerm)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// Observation Card Actions
function initObservationCards() {
    // Edit buttons
    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            // In a real app, this would fetch the post data and populate a form
            alert('Edit functionality will be implemented in the server-side version');
        });
    });

    // Delete buttons
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this observation?')) {
                // In a real app, this would send a delete request to the server
                const card = this.closest('.observation-card');
                card.style.display = 'none';
                alert('Observation deleted (will be fully implemented in server-side version)');
            }
        });
    });
}

// Utility function to simulate logged in state
function simulateLogin(username) {
    localStorage.setItem('ctoLoggedInUser', username);
    updateNavForLoggedInUser();
}

// Update navigation based on login state
function updateNavForLoggedInUser() {
    const loggedInUser = localStorage.getItem('ctoLoggedInUser');
    const navItems = document.querySelectorAll('nav ul li a');

    if (loggedInUser) {
        navItems.forEach(item => {
            if (item.textContent === 'Login') {
                item.textContent = 'Logout';
                item.href = '#';
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    localStorage.removeItem('ctoLoggedInUser');
                    window.location.href = 'index.html';
                });
            } else if (item.textContent === 'Register') {
                item.textContent = `Hello, ${loggedInUser}`;
                item.style.fontWeight = 'bold';
            }
        });
    }
}

// Initialize navigation based on login state when page loads
updateNavForLoggedInUser();