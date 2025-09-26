document.addEventListener('DOMContentLoaded', () => {

    const params = new URLSearchParams(window.location.search);
    let cardId = params.get('id');

    if (!cardId) {
        cardId = "0097491721"; 
    }

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
    showWelcome();
    if (welcomeContinue) welcomeContinue.addEventListener('click', hideWelcome);
    document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') hideWelcome(); });

    const cards = [
        document.getElementById('card-main'),
        document.getElementById('card-youth'),
        document.getElementById('card-partner')
    ].filter(Boolean);

    cards.forEach((card, i) => {
        card.classList.add('opacity-0', 'translate-y-3');
        setTimeout(() => {
            card.classList.remove('opacity-0', 'translate-y-3');
            card.classList.add('opacity-100', 'translate-y-0', 'transition-all', 'duration-300', 'ease-out');
        }, 140 * (i + 1));
    });

    function createRipple(container, x, y) {
        const r = document.createElement('span');
        r.className = 'ripple';
        const rect = container.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 0.15;
        r.style.width = r.style.height = size + 'px';
        r.style.left = (x - rect.left - size / 2) + 'px';
        r.style.top = (y - rect.top - size / 2) + 'px';
        container.appendChild(r);
        r.addEventListener('animationend', () => r.remove());
    }

    const links = {
        'link-main': 'https://www.facebook.com/livingsaviourcf',
        'link-youth': 'https://www.facebook.com/livingsaviour.youth',
        'link-partner': 'https://www.facebook.com/TheLivingSaviourChildrenMinistry'
    };

    cards.forEach(card => {
        card.style.cursor = 'pointer';

        const button = card.querySelector('a');

        card.addEventListener('pointerdown', (ev) => {
            createRipple(card, ev.clientX, ev.clientY);
        });

        card.addEventListener('click', (ev) => {
            if (button) {
                ev.preventDefault(); 
                const id = button.id;
                const url = links[id] || button.href;
                if (url && url !== '#') {
                    window.open(url, '_blank');
                }
            }
        });

        card.tabIndex = 0;
        card.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter' || ev.key === ' ') {
                ev.preventDefault();
                card.click();
            }
        });
    });

});
