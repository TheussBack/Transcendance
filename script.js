document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('nav ul li a');

    const pages = {
        home: `
            <section id="home">
                <h2>Bienvenue au Pong Game</h2>
                <p>Profitez d'une expérience unique !</p>
                <div class="gif-border">
                    <img src="Utils/Homer.gif" alt="Pong Game GIF">
                </div>
            </section>
        `,
        register: `
            <section id="register">
                <h2>Inscription</h2>
                <form id="registration-form">
                    <label for="alias">Alias :</label>
                    <input type="text" id="alias" name="alias" required>
                    <button class="button-54" type="submit">S'inscrire</button>
                </form>
            </section>
        `,
        tournament: `
            <section id="tournament">
                <h2>Tournoi</h2>
                <div id="tournament-info">
                    <p>Aucun tournoi en cours.</p>
                </div>
            </section>
        `,
        game: `
            <section id="game">
                <h2>Jeu Pong</h2>
                <canvas id="pongCanvas" width="800" height="600"></canvas>
            </section>
        `
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const page = link.dataset.page;
            mainContent.innerHTML = pages[page] || pages.home;
            history.pushState({}, '', `#${page}`);
            setupPageEvents();
        });
    });

    window.addEventListener('popstate', () => {
        const page = location.hash.substring(1);
        mainContent.innerHTML = pages[page] || pages.home;
        setupPageEvents();
    });

    const initialPage = location.hash.substring(1) || 'home';
    mainContent.innerHTML = pages[initialPage];
    setupPageEvents();

    function setupPageEvents() {
        const registrationForm = document.getElementById('registration-form');
        if (registrationForm) {
            registrationForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const alias = document.getElementById('alias').value;
                if (alias) {
                    alert(`Inscription réussie avec l'alias : ${alias}`);
                }
            });
        }

        const pongCanvas = document.getElementById('pongCanvas');
        if (pongCanvas) {
            const ctx = pongCanvas.getContext('2d');
            // Code pour dessiner le jeu Pong ici
        }

        generateStars(50);
    }

    function generateStars(numberOfStars) {
        let starsContainer = document.getElementById('stars-container');
        if (!starsContainer) {
            starsContainer = document.createElement('div');
            starsContainer.id = 'stars-container';
            document.body.appendChild(starsContainer);
        }

        starsContainer.innerHTML = ''; // Nettoyer avant de recréer les étoiles

        for (let i = 0; i < numberOfStars; i++) {
            const star = document.createElement('div');
            star.classList.add('star');

            const posX = Math.random() * window.innerWidth;
            const posY = Math.random() * window.innerHeight;

            star.style.left = `${posX}px`;
            star.style.top = `${posY}px`;

            starsContainer.appendChild(star);
        }
    }
});
