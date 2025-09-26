// Wait for DOM ready then run animations and attach interactions
document.addEventListener('DOMContentLoaded', () => {
    // --- URL Parameter Handling ---
    // This section checks if an 'id' is present in the URL, like ?id=12345
    // If no ID is found, it uses a default one.
    const params = new URLSearchParams(window.location.search);
    let cardId = params.get('id');

    if (!cardId) {
        cardId = "0097491721"; // Set a default ID if none is in the URL
    }

    // Welcome modal behavior
    const welcomeModal = document.getElementById('welcome-modal');
    const welcomeModalContent = document.getElementById('welcome-modal-content');
    const welcomeContinue = document.getElementById('welcome-continue');

    function showWelcome() {
        if (welcomeModal && welcomeModalContent) {
            welcomeModal.classList.remove('opacity-0', 'pointer-events-none');
            welcomeModalContent.classList.remove('scale-95', 'opacity-0');
        }
    }
    function hideWelcome() {
        if (welcomeModal && welcomeModalContent) {
            welcomeModal.classList.add('opacity-0', 'pointer-events-none');
        }
    }
    // Show welcome on each page load
    showWelcome();
    // Close handlers
    if (welcomeContinue) welcomeContinue.addEventListener('click', hideWelcome);
    document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') hideWelcome(); });

    const cards = [
        document.getElementById('card-main'),
        document.getElementById('card-youth'),
        document.getElementById('card-partner')
    ].filter(Boolean);

    // Stagger reveal using Tailwind utility classes (opacity and translate)
    cards.forEach((card, i) => {
        // start hidden
        card.classList.add('opacity-0', 'translate-y-3');
        setTimeout(() => {
            card.classList.remove('opacity-0', 'translate-y-3');
            card.classList.add('opacity-100', 'translate-y-0', 'transition-all', 'duration-300', 'ease-out');
        }, 140 * (i + 1));
    });

    // Helper: create ripple effect at pointer location
    function createRipple(container, x, y) {
        const r = document.createElement('span');
        r.className = 'ripple';
        const rect = container.getBoundingClientRect();
        // make ripple larger based on container size
        const size = Math.max(rect.width, rect.height) * 0.15;
        r.style.width = r.style.height = size + 'px';
        r.style.left = (x - rect.left - size / 2) + 'px';
        r.style.top = (y - rect.top - size / 2) + 'px';
        container.appendChild(r);
        r.addEventListener('animationend', () => r.remove());
    }

    // Map links to real FB pages (placeholder - update URLs as needed)
    const links = {
        'link-main': 'https://www.facebook.com/livingsaviourcf',
        'link-youth': 'https://www.facebook.com/livingsaviour.youth',
        'link-partner': 'https://www.facebook.com/TheLivingSaviourChildrenMinistry'
    };

    // Attach handlers to each card: click/tap ripple and open link
    cards.forEach(card => {
        card.style.cursor = 'pointer';

        const button = card.querySelector('a');

        // Click or tap on card
        card.addEventListener('pointerdown', (ev) => {
            createRipple(card, ev.clientX, ev.clientY);
        });

        // On click navigate to the associated link (if present)
        card.addEventListener('click', (ev) => {
            if (button) {
                ev.preventDefault(); // Prevent default link behavior only if we are handling it
                const id = button.id;
                const url = links[id] || button.href;
                // Ensure we have a valid URL before opening
                if (url && url !== '#') {
                    window.open(url, '_blank');
                }
            }
        });

        // keyboard accessibility
        card.tabIndex = 0;
        card.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter' || ev.key === ' ') {
                ev.preventDefault();
                card.click();
            }
        });
    });

});
