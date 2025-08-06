// --- 1. تحديد كل العناصر التي سنتعامل معها ---
const loginBox = document.getElementById('login-box');
const loginForm = document.getElementById('login-form');
const studentNameInput = document.getElementById('student-name');
const studentIdInput = document.getElementById('student-id');
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
const feedbackForm = document.getElementById('feedback-form');

// --- 2. متغيرات لتخزين البيانات مؤقتًا ---
let studentName = '';
let firestoreDocId = null; // سيحتفظ بمعرّف الطالب في قاعدة البيانات

// --- 3. ربط الأزرار بالأحداث ---
loginForm.addEventListener('submit', handleLogin);
startQuizBtn.addEventListener('click', startQuiz);
feedbackForm.addEventListener('submit', handleFeedback);

// --- 4. الدوال والوظائف ---

// دالة تسجيل الدخول وحفظ بيانات الطالب
function handleLogin(e) {
    e.preventDefault();
    studentName = studentNameInput.value;
    const studentId = studentIdInput.value;

    if (studentName.trim() === '' || studentId.trim() === '') {
        alert('من فضلك أدخل الاسم والرقم السري');
        return;
    }

    // إرسال البيانات إلى Firebase
    db.collection("students").add({
        name: studentName,
        secretId: studentId,
        loginTimestamp: new Date()
    })
    .then((docRef) => {
        firestoreDocId = docRef.id; // نحفظ المعرّف لنستخدمه لاحقًا
        loginBox.classList.add('hide');
        welcomeMessage.innerText = `أهلاً بك يا ${studentName}!`;
        introBox.classList.remove('hide');
    })
    .catch((error) => {
        console.error("خطأ في إضافة البيانات: ", error);
        alert("حدث خطأ، يرجى المحاولة مرة أخرى.");
    });
}

// دالة بدء الاختبار
function startQuiz() {
    introBox.classList.add('hide');
    quizBox.classList.remove('hide');
    currentQuestionIndex = 0;
    scores = { V: 0, A: 0, R: 0, K: 0 };
    showQuestion();
}

// دالة عرض سؤال جديد
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

// دالة اختيار إجابة
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

// دالة عرض النتيجة النهائية
function showResult() {
    quizBox.classList.add('hide');
    resultBox.classList.remove('hide');
    
    const totalQuestions = questions.length;
    const percentages = {
        V: Math.round((scores.V / totalQuestions) * 100),
        A: Math.round((scores.A / totalQuestions) * 100),
        R: Math.round((scores.R / totalQuestions) * 100),
        K: Math.round((scores.K / totalQuestions) * 100)
    };

    const sortedStyles = Object.entries(percentages).sort((a, b) => b[1] - a[1]);
    const primaryStyleCode = sortedStyles[0][0];
    const primaryStyleName = getStyleName(primaryStyleCode);
    
    // تحديث بيانات الطالب بنتيجة الاختبار في Firebase
    const studentDocRef = db.collection("students").doc(firestoreDocId);
    studentDocRef.update({
        learningStyle: primaryStyleName,
        resultTimestamp: new Date(),
        allScores: scores
    });

    resultTitle.innerText = `✨ تحليل شامل لأسلوب تعلمك يا ${studentName} ✨`;
    displayResultContent(primaryStyleCode);
    displayAnalysisChart(percentages);
}

// دالة عرض المحتوى التعليمي (كما هي من قبل)
function displayResultContent(type) {
    // ... (هنا يكون الكود الطويل الخاص بالمحتوى التعليمي لكل نمط)
    // ... (لا حاجة لتغييره، فقط تأكد من وجوده)
}

// دالة عرض الرسم البياني (كما هي من قبل)
function displayAnalysisChart(percentages) {
    // ... (هنا يكون كود إنشاء الرسم البياني)
    // ... (لا حاجة لتغييره، فقط تأكد من وجوده)
}

// دالة الحصول على اسم النمط (كما هي من قبل)
function getStyleName(code) {
    // ... (هنا يكون كود تحويل الرمز إلى اسم)
    // ... (لا حاجة لتغييره، فقط تأكد من وجوده)
}


// دالة إرسال الآراء والمقترحات
function handleFeedback(e) {
    e.preventDefault();
    const feedbackText = e.target.elements.feedback.value;

    if (feedbackText.trim() === '') {
        alert('من فضلك اكتب رأيك قبل الإرسال.');
        return;
    }

    // إرسال الرأي إلى Firebase
    db.collection("feedback").add({
        studentDocId: firestoreDocId,
        studentName: studentName,
        feedback: feedbackText,
        timestamp: new Date()
    })
    .then(() => {
        alert("شكرًا لك! تم إرسال رأيك بنجاح.");
        e.target.elements.feedback.value = ''; // تفريغ الخانة
    })
    .catch((error) => {
        console.error("خطأ في إرسال الرأي: ", error);
        alert("حدث خطأ أثناء إرسال رأيك.");
    });
}