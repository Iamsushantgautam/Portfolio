// SuperProfile Scripts
window.addEventListener('DOMContentLoaded', () => {
    // 1. Image Cache Busting
    const img = document.getElementById('profile-img');
    if (img) {
        const currentSrc = img.src;
        const separator = currentSrc.includes('?') ? '&' : '?';
        img.src = `${currentSrc}${separator}v=${Date.now()}`;
    }

    // 2. Contact Modal Logic
    const modal = document.getElementById('contact-modal');
    const trigger = document.getElementById('email-modal-trigger');
    const closeBtn = document.querySelector('.close-modal');
    const form = document.getElementById('profile-contact-form');
    const status = document.getElementById('form-status');

    if (trigger && modal) {
        trigger.onclick = () => {
            modal.style.display = "block";
            document.body.style.overflow = "hidden"; // Prevent scrolling
        }
    }

    if (closeBtn && modal) {
        closeBtn.onclick = () => {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }

    // 3. Form Submission via FormSubmit.co
    if (form) {
        form.onsubmit = async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button');
            const originalBtnContent = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            status.textContent = "";

            const formData = new FormData(form);
            
            try {
                const response = await fetch('https://formsubmit.co/ajax/iamsushantgautam@gmail.com', {
                    method: 'POST',
                    body: formData
                });
                
                if (response.ok) {
                    status.style.color = "#10b981";
                    status.textContent = "Message sent successfully! ✨";
                    form.reset();
                    setTimeout(() => {
                        modal.style.display = "none";
                        document.body.style.overflow = "auto";
                        status.textContent = "";
                    }, 2500);
                } else {
                    throw new Error();
                }
            } catch (err) {
                status.style.color = "#ef4444";
                status.textContent = "Failed to send message. Please try again.";
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
            }
        };
    }
});
