// Bust image cache like the original React Date.now() logic
window.addEventListener('DOMContentLoaded', () => {
    const img = document.getElementById('profile-img');
    if (img) {
        const currentSrc = img.src;
        // Check if there is already a query string
        const separator = currentSrc.includes('?') ? '&' : '?';
        img.src = `${currentSrc}${separator}v=${Date.now()}`;
    }

    // Modal Logic
    const modal = document.getElementById('contact-modal');
    const openModalBtn = document.getElementById('open-contact-btn');
    const openModalIcon = document.getElementById('open-modal-icon');
    const closeModalBtn = document.querySelector('.close-modal');

    const openModal = () => {
        if (modal) modal.style.display = 'block';
    };

    const closeModal = () => {
        if (modal) modal.style.display = 'none';
    };

    if (openModalBtn) openModalBtn.addEventListener('click', openModal);
    if (openModalIcon) openModalIcon.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

    // Close when clicking outside content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
});
