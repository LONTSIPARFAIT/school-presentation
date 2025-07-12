document.addEventListener('DOMContentLoaded', () => {
    console.log('Événement DOMContentLoaded déclenché');

    // Gestion du menu burger
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burgerMenu.classList.toggle('active');
    });

    // Fermer le menu burger après un clic sur un lien
    const navLinksItems = document.querySelectorAll('.nav-links li a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burgerMenu.classList.remove('active');
        });
    });

    // Gestion du menu déroulant
    const navSelect = document.querySelector('.nav-select');
    navSelect.addEventListener('change', () => {
        const value = navSelect.value;
        if (value) {
            document.getElementById(value).scrollIntoView({ behavior: 'smooth' });
            navSelect.value = '';
        }
    });

    // Gestion du thème sombre/clair
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        const body = document.body;
        const currentTheme = body.getAttribute('data-theme');
        body.setAttribute('data-theme', currentTheme === 'light' ? 'dark' : 'light');
    });

    // Gestion des animations au défilement
    const fadeInElements = document.querySelectorAll('.fade-in, .slide-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeInElements.forEach(element => observer.observe(element));

    // Chargement dynamique des programmes
    function loadPrograms() {
        console.log('Exécution de loadPrograms()');
        const programGrid = document.querySelector('.program-grid');
        if (!programGrid) {
            console.error('Erreur : .program-grid non trouvé dans le DOM');
            return;
        }
        const programs = [
            { title: 'Sciences', description: 'Explorez les merveilles de la science.' },
            { title: 'Littérature', description: 'Plongez dans le monde des mots.' },
            { title: 'Technologie', description: 'Maîtrisez les outils du futur.' }
        ];

        programGrid.innerHTML = ''; // Vider la grille pour éviter les doublons
        programs.forEach((program, index) => {
            console.log(`Ajout du programme : ${program.title}`);
            const programCard = document.createElement('div');
            programCard.classList.add('program-card', 'slide-in');
            programCard.style.transitionDelay = `${(index + 1) * 0.1}s`;
            programCard.innerHTML = `
                <h3>${program.title}</h3>
                <p>${program.description}</p>
            `;
            programGrid.appendChild(programCard);
        });

        console.log(`Nombre total de programmes ajoutés : ${programs.length}`);
    }

    loadPrograms();

    // Gestion du quiz
    const questions = [
        {
            question: "Quelle est la capitale de la France ?",
            options: ["Paris", "Londres", "Berlin", "Madrid"],
            answer: "Paris"
        },
        {
            question: "Quel est le plus grand océan ?",
            options: ["Atlantique", "Indien", "Pacifique", "Arctique"],
            answer: "Pacifique"
        },
        {
            question: "Qui a peint la Joconde ?",
            options: ["Vincent van Gogh", "Pablo Picasso", "Léonard de Vinci", "Claude Monet"],
            answer: "Léonard de Vinci"
        },
        {
            question: "Quel est le symbole chimique de l'or ?",
            options: ["Au", "Ag", "Fe", "Cu"],
            answer: "Au"
        }
    ];

    let currentQuestionIndex = 0;

    function loadQuestion() {
        const quizContent = document.getElementById('quiz-content');
        const questionElement = document.getElementById('question');
        const optionsElement = document.getElementById('options');
        const currentQuestion = questions[currentQuestionIndex];

        questionElement.textContent = currentQuestion.question;
        optionsElement.innerHTML = '';

        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.classList.add('option');
            button.textContent = option;
            button.addEventListener('click', () => checkAnswer(option, currentQuestion.answer));
            optionsElement.appendChild(button);
        });
    }

    function checkAnswer(selected, correct) {
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.disabled = true;
            if (option.textContent === correct) {
                option.classList.add('correct');
            } else if (option.textContent === selected) {
                option.classList.add('incorrect');
            }
        });
    }

    document.getElementById('next-question').addEventListener('click', () => {
        currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
        loadQuestion();
    });

    loadQuestion();

    // Gestion de la FAQ
    const faqItems = document.querySelectorAll('.faq-item h3');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const parent = item.parentElement;
            parent.classList.toggle('active');
        });
    });
});