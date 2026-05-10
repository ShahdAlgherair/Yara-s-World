
document.addEventListener('DOMContentLoaded', function() {
    const quizOptions = document.querySelectorAll('.quiz-option');
    const quizFeedback = document.getElementById('quiz-feedback');
    
    quizOptions.forEach(button => {
        button.addEventListener('click', function() {
            const isCorrect = this.getAttribute('data-correct') === 'true';
            
            if (isCorrect) {
                quizFeedback.textContent = 'Correct, Great job!';
                quizFeedback.className = 'feedback correct';
                
            
                quizOptions.forEach(btn => {
                    btn.disabled = true;
                    btn.style.opacity = '0.6';
                });
            } else {
                quizFeedback.textContent = ' Not quite. Try again!';
                quizFeedback.className = 'feedback incorrect';
                
                
                this.style.transform = 'shake 0.3s ease';
                setTimeout(() => {
                    this.style.transform = '';
                }, 300);
            }
        });
    });
    
    
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const formSuccess = document.getElementById('form-success');
    
    
    nameInput.addEventListener('input', function() {
        validateName();
    });
    
    emailInput.addEventListener('input', function() {
        validateEmail();
    });
    
    function validateName() {
        const name = nameInput.value.trim();
        if (name === '') {
            nameError.textContent = '⚠️ Name is required';
            nameInput.classList.add('error');
            return false;
        } else if (name.length < 2) {
            nameError.textContent = '⚠️ Name must be at least 2 characters';
            nameInput.classList.add('error');
            return false;
        } else {
            nameError.textContent = '';
            nameInput.classList.remove('error');
            return true;
        }
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        
        if (email === '') {
            emailError.textContent = '⚠️ Email is required';
            emailInput.classList.add('error');
            return false;
        } else if (!emailPattern.test(email)) {
            emailError.textContent = '⚠️ Please enter a valid email (must contain @ and .)';
            emailInput.classList.add('error');
            return false;
        } else {
            emailError.textContent = '';
            emailInput.classList.remove('error');
            return true;
        }
    }
    
    
    form.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        
        if (isNameValid && isEmailValid) {
            formSuccess.textContent = '✨ Thank you! Your message has been sent. Yara will get back to you soon! ✨';
            formSuccess.style.color = '#41816c';
            form.reset(); 
            
            
            nameError.textContent = '';
            emailError.textContent = '';
            nameInput.classList.remove('error');
            emailInput.classList.remove('error');
            
            setTimeout(() => {
                formSuccess.textContent = '';
            }, 5000);
        } else {
            formSuccess.textContent = '⚠️ Please fix the errors above before submitting.';
            formSuccess.style.color = '#e79897';
            
            setTimeout(() => {
                if (formSuccess.textContent === '⚠️ Please fix the errors above before submitting.') {
                    formSuccess.textContent = '';
                }
            }, 3000);
        }
    });
});

const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);