document.addEventListener('DOMContentLoaded', () => {
    console.log('Événement DOMContentLoaded déclenché');

    // Gestion du menu burger
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (!burgerMenu || !navLinks) {
        console.error('Erreur : .burger-menu ou .nav-links non trouvé dans le DOM');
    } else {
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
    }

    // Gestion du menu déroulant
    const navSelect = document.querySelector('.nav-select');
    if (navSelect) {
        navSelect.addEventListener('change', () => {
            const value = navSelect.value;
            if (value) {
                document.getElementById(value).scrollIntoView({ behavior: 'smooth' });
                navSelect.value = '';
            }
        });
    } else {
        console.error('Erreur : .nav-select non trouvé dans le DOM');
    }

    // Gestion du thème sombre/clair
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const body = document.body;
            const currentTheme = body.getAttribute('data-theme');
            body.setAttribute('data-theme', currentTheme === 'light' ? 'dark' : 'light');
        });
    } else {
        console.error('Erreur : .theme-toggle non trouvé dans le DOM');
    }

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
        console.log('Program-grid trouvé, vidage du contenu existant');
        programGrid.innerHTML = '';
        const programs = [
            { title: 'Sciences', description: 'Explorez les merveilles de la science.' },
            { title: 'Littérature', description: 'Plongez dans le monde des mots.' },
            { title: 'Technologie', description: 'Maîtrisez les outils du futur.' }
        ];
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
        console.log('Vérification du contenu de program-grid:', programGrid.innerHTML);
    }

    try {
        loadPrograms();
    } catch (error) {
        console.error('Erreur lors de l\'exécution de loadPrograms():', error);
    }

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
        },
        {
            question: "Quelle planète est connue comme la planète rouge ?",
            options: ["Vénus", "Mars", "Jupiter", "Mercure"],
            answer: "Mars"
        },
        {
            question: "Quel est l'auteur de 'Roméo et Juliette' ?",
            options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Victor Hugo"],
            answer: "William Shakespeare"
        },
        {
            question: "Quel est le plus haut sommet du monde ?",
            options: ["Mont Kilimandjaro", "Mont Blanc", "Everest", "K2"],
            answer: "Everest"
        },
        {
            question: "Quel gaz est le plus abondant dans l'atmosphère terrestre ?",
            options: ["Oxygène", "Azote", "Dioxyde de carbone", "Argon"],
            answer: "Azote"
        },
        {
            question: "Quel est l'inventeur de la théorie de la relativité ?",
            options: ["Isaac Newton", "Galilée", "Albert Einstein", "Nikola Tesla"],
            answer: "Albert Einstein"
        },
        {
            question: "Quelle est la capitale du Japon ?",
            options: ["Pékin", "Séoul", "Tokyo", "Bangkok"],
            answer: "Tokyo"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const quizContent = document.getElementById('quiz-content');
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const scoreElement = document.getElementById('score');
    const resultElement = document.getElementById('result');
    const nextButton = document.getElementById('next-question');
    const restartButton = document.getElementById('restart-quiz');

    function loadQuestion() {
        if (!quizContent || !questionElement || !optionsElement || !scoreElement || !resultElement || !nextButton || !restartButton) {
            console.error('Erreur : éléments du quiz non trouvés dans le DOM');
            return;
        }

        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            questionElement.textContent = currentQuestion.question;
            optionsElement.innerHTML = '';
            scoreElement.style.display = 'none';
            resultElement.style.display = 'none';
            nextButton.style.display = 'block';
            restartButton.style.display = 'none';

            currentQuestion.options.forEach(option => {
                const button = document.createElement('button');
                button.classList.add('option');
                button.textContent = option;
                button.addEventListener('click', () => checkAnswer(option, currentQuestion.answer));
                optionsElement.appendChild(button);
            });
        } else {
            showResult();
        }
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
        if (selected === correct) {
            score++;
        }
        nextButton.disabled = false;
    }

    function showResult() {
        questionElement.textContent = '';
        optionsElement.innerHTML = '';
        nextButton.style.display = 'none';
        scoreElement.style.display = 'block';
        resultElement.style.display = 'block';
        restartButton.style.display = 'block';

        scoreElement.textContent = `Votre score : ${score} / ${questions.length}`;
        let mention = '';
        if (score >= 8) {
            mention = 'Excellent !';
        } else if (score >= 5) {
            mention = 'Bien joué !';
        } else {
            mention = 'À améliorer.';
        }
        resultElement.textContent = mention;
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        loadQuestion();
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentQuestionIndex++;
            loadQuestion();
        });
    } else {
        console.error('Erreur : #next-question non trouvé dans le DOM');
    }

    if (restartButton) {
        restartButton.addEventListener('click', restartQuiz);
    } else {
        console.error('Erreur : #restart-quiz non trouvé dans le DOM');
    }

    try {
        loadQuestion();
    } catch (error) {
        console.error('Erreur lors de l\'exécution de loadQuestion():', error);
    }

    // Gestion de la FAQ
    const faqItems = document.querySelectorAll('.faq-item h3');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const parent = item.parentElement;
            parent.classList.toggle('active');
        });
    });
});