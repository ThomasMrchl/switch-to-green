document.addEventListener('DOMContentLoaded', function () {
    const startQuizBtn = document.getElementById('startQuizBtn');
    const quizContainer = document.getElementById('quizContainer');
    const resultsContainer = document.getElementById('resultsContainer');
    const restartQuizBtn = document.getElementById('restartQuizBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentQuestionNumber = document.getElementById('currentQuestionNumber');
    const progressPercentage = document.getElementById('progressPercentage');
    const progressBar = document.getElementById('progressBar');
    const questionsContainer = document.getElementById('questionsContainer');
    const recommendationContainer = document.getElementById('recommendation');

    let currentQuestion = 1;
    const totalQuestions = 8;
    const userAnswers = {};

    // Start quiz
    startQuizBtn.addEventListener('click', function () {
        quizContainer.classList.remove('hidden');
        startQuizBtn.classList.add('hidden');
        updateProgress();
    });

    // Restart quiz
    restartQuizBtn.addEventListener('click', function () {
        currentQuestion = 1;
        Object.keys(userAnswers).forEach(key => delete userAnswers[key]);
        resultsContainer.classList.add('hidden');
        quizContainer.classList.remove('hidden');

        // Reset all questions to inactive except first
        document.querySelectorAll('.question-card').forEach((card, index) => {
            card.classList.toggle('active', index === 0);
        });

        updateProgress();
        prevBtn.disabled = true;
        nextBtn.textContent = 'Suivant';
    });

    // Option selection
    questionsContainer.addEventListener('click', function (event) {
        const btn = event.target.closest('.option-btn');
        if (!btn) return;

        const questionId = btn.closest('.question-card').id;
        const answer = btn.dataset.value;
        userAnswers[questionId] = answer;

        // Remove active class from all options in this question
        btn.closest('.question-card').querySelectorAll('.option-btn').forEach(opt => {
            opt.classList.remove('bg-green-200', 'border-green-400');
        });

        // Add active class to selected option
        btn.classList.add('bg-green-200', 'border-green-400');
    });

    // Next question
    nextBtn.addEventListener('click', function () {
        if (currentQuestion < totalQuestions) {
            const currentQuestionId = `question${currentQuestion}`;
            if (!userAnswers[currentQuestionId]) {
                alert('Veuillez sélectionner une réponse avant de continuer.');
                return;
            }

            // Hide current question
            document.getElementById(currentQuestionId).classList.remove('active');

            // Show next question
            currentQuestion++;
            document.getElementById(`question${currentQuestion}`).classList.add('active');

            // Update navigation buttons
            prevBtn.disabled = false;
            if (currentQuestion === totalQuestions) {
                nextBtn.innerHTML = 'Voir les résultats <i class="fas fa-check ml-2"></i>';
            }

            updateProgress();
        } else {
            showResults();
        }
    });

    // Previous question
    prevBtn.addEventListener('click', function () {
        if (currentQuestion > 1) {
            // Hide current question
            document.getElementById(`question${currentQuestion}`).classList.remove('active');

            // Show previous question
            currentQuestion--;
            document.getElementById(`question${currentQuestion}`).classList.add('active');

            // Update navigation buttons
            if (currentQuestion === 1) {
                prevBtn.disabled = true;
            }
            nextBtn.innerHTML = 'Suivant <i class="fas fa-arrow-right ml-2"></i>';

            updateProgress();
        }
    });

    // Update progress bar and question number
    function updateProgress() {
        const progress = (currentQuestion / totalQuestions) * 100;
        progressBar.style.width = `${progress}%`;
        progressPercentage.textContent = `${Math.round(progress)}%`;
        currentQuestionNumber.textContent = `Question ${currentQuestion}/${totalQuestions}`;
    }

    // Show results
    function showResults() {
        quizContainer.classList.add('hidden');
        resultsContainer.classList.remove('hidden');

        // Determine best vehicle based on answers
        const recommendedVehicle = findBestVehicle();

        // Display recommended vehicle
        displayVehicle(recommendedVehicle, recommendationContainer, true);
    }

    // Find the best vehicle based on user answers
    function findBestVehicle() {
        // Example logic for finding the best vehicle
        return vehicles[0]; // Replace with your logic
    }

    // Display a vehicle card
    function displayVehicle(vehicle, container, isMain) {
        container.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-2xl font-bold">${vehicle.name}</h3>
                <p>${vehicle.description}</p>
            </div>
        `;
    }
});