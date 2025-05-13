document.addEventListener('DOMContentLoaded', function() {
    // ========== Event Handling ========== //
    
    // Button Click Event
    const clickButton = document.getElementById('click-button');
    const clickOutput = document.getElementById('click-output');
    
    clickButton.addEventListener('click', function() {
        clickOutput.textContent = 'Button was clicked! 🎉';
        clickOutput.style.color = '#27ae60';
    });
    
    // Hover Event
    const hoverBox = document.querySelector('.hover-box');
    const hoverOutput = document.getElementById('hover-output');
    
    hoverBox.addEventListener('mouseenter', function() {
        hoverOutput.textContent = 'You hovered over me! ✨';
        hoverOutput.style.color = '#3498db';
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        hoverOutput.textContent = 'Waiting for hover...';
        hoverOutput.style.color = '';
    });
    
    // Keypress Event
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    
    keypressInput.addEventListener('keypress', function(e) {
        keypressOutput.textContent = `You pressed: ${e.key}`;
        keypressOutput.style.color = '#e67e22';
    });
    
    // Secret Event (Double click or long press)
    const secretBox = document.querySelector('.secret-box');
    const secretOutput = document.getElementById('secret-output');
    let pressTimer;
    
    // Double click
    secretBox.addEventListener('dblclick', function() {
        secretOutput.textContent = 'You discovered the double click secret! 🎊';
    });
    
    // Long press
    secretBox.addEventListener('mousedown', function() {
        pressTimer = setTimeout(function() {
            secretOutput.textContent = 'You discovered the long press secret! 🎁';
        }, 1000); // 1 second press
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretBox.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
    
    // ========== Interactive Elements ========== //
    
    // Color Changing Button
    const colorChanger = document.getElementById('color-changer');
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
    let colorIndex = 0;
    
    colorChanger.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.textContent = `Color Changed to ${colors[colorIndex]}`;
    });
    
    // Image Gallery
    const galleryImages = document.querySelectorAll('.gallery-container img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryImages[index].classList.add('active');
        currentImageIndex = index;
    }
    
    prevBtn.addEventListener('click', function() {
        let newIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(newIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        let newIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(newIndex);
    });
    
    // Auto-advance gallery every 3 seconds
    setInterval(() => {
        let newIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(newIndex);
    }, 3000);
    
    // Tab Component
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update panels
            tabPanels.forEach(panel => panel.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // ========== Form Validation ========== //
    const form = document.getElementById('validation-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const strengthMeter = document.querySelector('.strength-meter');
    const strengthText = document.querySelector('.strength-text');
    const formStatus = document.getElementById('form-status');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            formStatus.textContent = 'Form submitted successfully! 🎉';
            formStatus.style.color = '#27ae60';
            // Here you would typically send the data to a server
            form.reset();
            strengthMeter.style.width = '0';
            strengthText.textContent = '';
        } else {
            formStatus.textContent = 'Please fix the errors above.';
            formStatus.style.color = '#e74c3c';
        }
    });
    
    // Validation functions
    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            return false;
        } else {
            nameError.textContent = '';
            return true;
        }
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput.value.trim() === '') {
            emailError.textContent = '';
            return true; // Email is optional in this example
        } else if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }
    
    function validatePassword() {
        const password = passwordInput.value;
        
        if (password.length === 0) {
            passwordError.textContent = '';
            strengthMeter.style.width = '0';
            strengthText.textContent = '';
            return false;
        } else if (password.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            updatePasswordStrength(password, false);
            return false;
        } else {
            passwordError.textContent = '';
            updatePasswordStrength(password, true);
            return true;
        }
    }
    
    function updatePasswordStrength(password, isValid) {
        // Calculate strength (simple version)
        let strength = 0;
        let width = '0%';
        let color = '#e74c3c';
        let text = 'Weak';
        
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        if (strength > 4) {
            width = '100%';
            color = '#2ecc71';
            text = 'Very Strong';
        } else if (strength > 3) {
            width = '75%';
            color = '#27ae60';
            text = 'Strong';
        } else if (strength > 2) {
            width = '50%';
            color = '#f39c12';
            text = 'Medium';
        } else if (strength > 0) {
            width = '25%';
            color = '#e67e22';
            text = 'Weak';
        }
        
        strengthMeter.style.width = width;
        strengthMeter.style.backgroundColor = color;
        strengthText.textContent = isValid ? `Strength: ${text}` : '';
        strengthText.style.color = color;
    }
});