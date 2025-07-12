// Données des programmes
const programs = [
    { name: "Sciences", description: "Explorez les merveilles de la science." },
    { name: "Littérature", description: "Plongez dans le monde des lettres." },
    { name: "Technologie", description: "Maîtrisez les outils du futur." }
];

// Fonction pour remplir la liste des programmes
function loadPrograms() {
    const programList = document.getElementById('program-list');
    const fallback = document.getElementById('program-fallback');
    if (!programList) {
        console.error("L'élément #program-list n'a pas été trouvé dans le DOM.");
        return;
    }
    if (programs.length === 0) {
        console.warn("Aucun programme disponible.");
        fallback.style.display = 'block';
        return;
    }
    programList.innerHTML = ''; // Nettoyer le contenu existant
    programs.forEach((program, index) => {
        const programCard = document.createElement('div');
        programCard.classList.add('program-card', 'slide-in');
        programCard.style.transitionDelay = `${index * 0.1}s`;
        programCard.innerHTML = `
            <h3>${program.name}</h3>
            <p>${program.description}</p>
        `;
        programList.appendChild(programCard);
    });
}

// Gestion du menu burger
const burgerMenu = document.querySelector('.burger-menu');
const navLinks = document.querySelector('.nav-links');

if (burgerMenu && navLinks) {
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
} else {
    console.error("Menu burger ou nav-links non trouvé(s).");
}

// Bascule du thème clair/sombre
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.dataset.theme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
    });
} else {
    console.error("Bouton de bascule de thème non trouvé.");
}

// Gestion du menu déroulant
const navSelect = document.querySelector('.nav-select');
if (navSelect) {
    navSelect.addEventListener('change', () => {
        if (navSelect.value) {
            window.location.hash = navSelect.value;
            navSelect.value = ''; // Réinitialiser à l'option par défaut
        }
    });
} else {
    console.error("Menu déroulant non trouvé.");
}

// Animation des sections et éléments
const elements = document.querySelectorAll('.fade-in, .slide-in');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

elements.forEach(element => observer.observe(element));

// Animation des statistiques
const statNumbers = document.querySelectorAll('.stat-number');
statNumbers.forEach(stat => {
    const updateCount = () => {
        const target = +stat.dataset.target;
        const count = +stat.innerText;
        const increment = target / 50;
        if (count < target) {
            stat.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 50);
        } else {
            stat.innerText = target;
        }
    };
    observer.observe(stat);
    stat.addEventListener('animationstart', updateCount, { once: true });
});

// Gestion de la FAQ
const faqItems = document.querySelectorAll('.faq-item h3');
faqItems.forEach(item => {
    item.addEventListener('click', () => {
        const parent = item.parentElement;
        parent.classList.toggle('active');
    });
});

// Gestion du quiz
const quizData = [
    {
        question: "Quel est l'élément chimique avec le symbole O ?",
        options: ["Or", "Oxygène", "Osmium", "Oganesson"],
        answer: "Oxygène"
    },
    {
        question: "Qui a écrit 'Les Misérables' ?",
        options: ["Victor Hugo", "Molière", "Voltaire", "Balzac"],
        answer: "Victor Hugo"
    },
    {
        question: "Quelle est la capitale de la France ?",
        options: ["Lyon", "Marseille", "Paris", "Nice"],
        answer: "Paris"
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuiz() {
    const quiz = document.getElementById('quiz');
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const resultEl = document.getElementById('result');
    const scoreEl = document.getElementById('score');
    const nextButton = document.getElementById('next-question');

    if (!quiz || !questionEl || !optionsEl || !resultEl || !scoreEl || !nextButton) {
        console.error("Un ou plusieurs éléments du quiz sont introuvables.");
        return;
    }

    questionEl.innerText = quizData[currentQuestion].question;
    optionsEl.innerHTML = '';
    resultEl.innerText = '';

    quizData[currentQuestion].options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.innerText = option;
        button.addEventListener('click', () => {
            if (option === quizData[currentQuestion].answer) {
                button.classList.add('correct');
                resultEl.innerText = 'Correct !';
                score++;
                scoreEl.innerText = score;
            } else {
                button.classList.add('incorrect');
                resultEl.innerText = `Faux ! La bonne réponse est ${quizData[currentQuestion].answer}.`;
            }
            optionsEl.querySelectorAll('.option').forEach(btn => btn.disabled = true);
            nextButton.style.display = 'block';
        });
        optionsEl.appendChild(button);
    });

    nextButton.style.display = currentQuestion < quizData.length - 1 ? 'block' : 'none';
}

document.getElementById('next-question').addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuiz();
    } else {
        const quiz = document.getElementById('quiz');
        quiz.innerHTML = `<h3>Quiz terminé ! Votre score : ${score}/${quizData.length}</h3>`;
    }
});

// Charger les programmes et le quiz au démarrage
document.addEventListener('DOMContentLoaded', () => {
    try {
        loadPrograms();
        loadQuiz();
    } catch (error) {
        console.error("Erreur lors du chargement initial :", error);
    }
});