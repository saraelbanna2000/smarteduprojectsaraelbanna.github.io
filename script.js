// --- Element Selections ---
const loginBox = document.getElementById('login-box');
const loginForm = document.getElementById('login-form');
const studentNameInput = document.getElementById('student-name');
const introBox = document.getElementById('intro-box');
const welcomeMessage = document.getElementById('welcome-message');
const startQuizBtn = document.getElementById('start-quiz-btn');
const quizBox = document.getElementById('quiz-box');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const resultBox = document.getElementById('result-box');
const resultTitle = document.getElementById('result-title');
const resultStyle = document.getElementById('result-style');
const resultDescription = document.getElementById('result-description');
const resultRecommendations = document.getElementById('result-recommendations');
const chartContainer = document.getElementById('chart-container');

let studentName = '';
let currentQuestionIndex = 0;
let scores = { V: 0, A: 0, R: 0, K: 0 };

// --- Event Listeners ---
loginForm.addEventListener('submit', handleLogin);
startQuizBtn.addEventListener('click', startQuiz);

// --- Functions ---
function handleLogin(e) {
    e.preventDefault(); // Prevent form from submitting traditionally
    studentName = studentNameInput.value;
    if (studentName.trim() === '') {
        alert('من فضلك أدخل اسمك');
        return;
    }
    loginBox.classList.add('hide');
    welcomeMessage.innerText = `أهلاً بك يا ${studentName}!`;
    introBox.classList.remove('hide');
}

function startQuiz() {
    introBox.classList.add('hide');
    quizBox.classList.remove('hide');
    // Reset quiz state
    currentQuestionIndex = 0;
    scores = { V: 0, A: 0, R: 0, K: 0 };
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.dataset.type = answer.type;
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const type = e.target.dataset.type;
    scores[type]++;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizBox.classList.add('hide');
    resultBox.classList.remove('hide');
    
    // Calculate percentages
    const totalQuestions = questions.length;
    const percentages = {
        V: Math.round((scores.V / totalQuestions) * 100),
        A: Math.round((scores.A / totalQuestions) * 100),
        R: Math.round((scores.R / totalQuestions) * 100),
        K: Math.round((scores.K / totalQuestions) * 100)
    };

    const sortedStyles = Object.entries(percentages).sort((a, b) => b[1] - a[1]);
    const primaryStyleCode = sortedStyles[0][0];

    resultTitle.innerText = `✨ تحليل شامل لأسلوب تعلمك يا ${studentName} ✨`;
    displayResultContent(primaryStyleCode);
    displayAnalysisChart(percentages);
}

function displayAnalysisChart(percentages) {
    chartContainer.innerHTML = ''; // Clear previous chart
    const styles = [
        { code: 'V', name: 'بصري', color: '#007bff' },
        { code: 'A', name: 'سمعي', color: '#28a745' },
        { code: 'R', name: 'قرائي', color: '#ffc107' },
        { code: 'K', name: 'حسي', color: '#dc3545' }
    ];

    styles.forEach(style => {
        const percentage = percentages[style.code];
        const barHtml = `
            <div class="chart-bar-container">
                <div class="chart-label">${style.name}</div>
                <div class="chart-bar" style="width: ${percentage}%; background-color: ${style.color};">
                    ${percentage}%
                </div>
            </div>
        `;
        chartContainer.innerHTML += barHtml;
    });
}

function displayResultContent(type) {
    let styleName, description, recommendations;
    // The content for each style remains the same as the previous step...
    // To keep it brief, I'm omitting the large text block here,
    // but you should use the detailed content from our last conversation.
    switch (type) {
        case 'V':
            styleName = 'بصري (Visual) 🎨';
            description = 'أنت تعتمد بشكل كبير على حاسة البصر لفهم واستيعاب العالم.';
            recommendations = `<h3>المحتوى التعليمي المقترح (بصري)</h3><ul class="content-list"><li><a href="https://youtu.be/1nRZTtR4Hs0" target="_blank"><strong>شاهد فيديو المحاضرة.</strong></a></li><li><strong>خريطة ذهنية للمحاضرة...</strong></li></ul>`;
            break;
        case 'A':
            styleName = 'سمعي (Auditory) 🎧';
            description = 'أنت تستقبل المعلومات بعمق من خلال السمع والنقاش.';
            recommendations = `<h3>المحتوى التعليمي المقترح (سمعي)</h3><ul class="content-list"><li><a href="#" target="_blank"><strong>استمع للبودكاست (قريباً).</strong></a></li><li><strong>تحدي المناقشة...</strong></li></ul>`;
            break;
        case 'R':
            styleName = 'قرائي/كتابي (Read/Write) ✍️';
            description = 'الكلمة المكتوبة هي أداتك الأقوى.';
            recommendations = `<h3>المحتوى التعليمي المقترح (قرائي)</h3><h4>ملخص المحاضرة بنظام س & ج...</h4>`;
            break;
        case 'K':
            styleName = 'حسي/حركي (Kinesthetic) 🏃‍♂️';
            description = 'أنت تتعلم "بالفعل" وليس فقط بالنظر أو السمع.';
            recommendations = `<h3>المحتوى التعليمي المقترح (حسي)</h3><h4>مشروع صغير: "مدير في محيطك"...</h4>`;
            break;
    }

    resultStyle.innerHTML = `<p>نمطك الأساسي هو <strong>${styleName}</strong>.</p>`;
    resultDescription.innerHTML = `<p>${description}</p>`;
    resultRecommendations.innerHTML = recommendations;
}