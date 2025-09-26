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
            startPageAnimations();
        }
    }
    showWelcome();
    if (welcomeContinue) welcomeContinue.addEventListener('click', hideWelcome);
    document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') hideWelcome(); });

    function startPageAnimations() {
        const countdownContainer = document.getElementById('countdown-container');
        if (countdownContainer) {
            countdownContainer.classList.remove('opacity-0');
        }

        const cards = [
            document.getElementById('card-main'),
            document.getElementById('card-youth'),
            document.getElementById('card-partner')
        ].filter(Boolean);

        cards.forEach((card, i) => {
            card.style.transitionDelay = `${100 * (i + 1)}ms`;
            card.classList.add('opacity-100', 'translate-y-0');
        });
    }

    const cards = [
        document.getElementById('card-main'),
        document.getElementById('card-youth'),
        document.getElementById('card-partner')
    ].filter(Boolean);

    cards.forEach((card, i) => {
        card.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-500', 'ease-out');
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

    const redirectMessages = {
        'link-main': {
            title: 'You are invited!',
            message: 'We welcome you to join us in worship and fellowship at The Living Saviour Christian Fellowship.'
        },
        'link-youth': {
            title: 'Hey there!',
            message: 'Looking for a place to belong? Our Youth Ministry invites you to connect, worship, and grow together in Christ.'
        }
    };

    const redirectModal = document.getElementById('redirect-modal');
    const redirectModalContent = document.getElementById('redirect-modal-content');
    const redirectTitle = document.getElementById('redirect-title');
    const redirectMessage = document.getElementById('redirect-message');
    const redirectContinue = document.getElementById('redirect-continue');
    const redirectCancel = document.getElementById('redirect-cancel');

    function showRedirectModal(title, message, url) {
        redirectTitle.textContent = title;
        redirectMessage.textContent = message;
        redirectContinue.href = url;
        redirectModal.classList.remove('opacity-0', 'pointer-events-none');
        redirectModalContent.classList.remove('scale-95', 'opacity-0');
    }

    function hideRedirectModal() {
        redirectModal.classList.add('opacity-0', 'pointer-events-none');
        redirectModalContent.classList.add('scale-95', 'opacity-0');
    }

    redirectCancel.addEventListener('click', hideRedirectModal);
    redirectContinue.addEventListener('click', hideRedirectModal);

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
                const customMessage = redirectMessages[id];

                if (customMessage && url && url !== '#') {
                    showRedirectModal(customMessage.title, customMessage.message, url);
                } else if (url && url !== '#') {
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

    const countdownTimerEl = document.getElementById('countdown-timer');

    function getNextSunday() {
        const now = new Date();
        const nextSunday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 30, 0); // Today at 9:30 AM
        
        nextSunday.setDate(nextSunday.getDate() + (7 - nextSunday.getDay()) % 7);

        if (now.getDay() === 0 && now.getTime() > nextSunday.getTime()) {
            nextSunday.setDate(nextSunday.getDate() + 7);
        }

        return nextSunday;
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const nextServiceTime = getNextSunday().getTime();
        const distance = nextServiceTime - now;

        if (distance < 0) {
            countdownTimerEl.innerHTML = "Service is ongoing!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const format = (value, label) => `<div class="text-center"><div class="bg-black/20 rounded-md px-2 py-1">${String(value).padStart(2, '0')}</div><div class="text-xs mt-1 opacity-70">${label}</div></div>`;

        countdownTimerEl.innerHTML = `
            ${format(days, 'Days')}
            ${format(hours, 'Hours')}
            ${format(minutes, 'Min')}
            ${format(seconds, 'Sec')}
        `;
    }

    if (countdownTimerEl) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

});
