const startButton = document.getElementById('start-btn');
const quizBox = document.getElementById('quiz-box');
const introBox = document.getElementById('intro-box');
const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const resultBox = document.getElementById('result-box');
const resultTitle = document.getElementById('result-title');
const resultStyle = document.getElementById('result-style');
const resultDescription = document.getElementById('result-description');
const resultRecommendations = document.getElementById('result-recommendations');

let currentQuestionIndex = 0;
let scores = { V: 0, A: 0, R: 0, K: 0 };

startButton.addEventListener('click', startQuiz);

function startQuiz() {
    introBox.classList.add('hide');
    resultBox.classList.add('hide');
    quizBox.classList.remove('hide');
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
    const selectedButton = e.target;
    const type = selectedButton.dataset.type;
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
    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const finalType = sortedScores[0][0];
    displayResult(finalType);
}

function displayResult(type) {
    let styleName, description, recommendations;

    // ================== المحتوى التعليمي للمحاضرة الأولى ==================
    
    switch (type) {
        case 'V':
            styleName = 'بصري (Visual) 🎨';
            description = 'أنت تفهم العالم من حولك من خلال الصور والأشكال. عقلك يعالج المعلومات المرئية بكفاءة عالية.';
            recommendations = `
                <h3>المحاضرة الأولى: وظائف الإدارة في المشروعات القومية</h3>
                <p>هنا المحتوى الذي يناسب طريقتك في التعلم:</p>
                <ul>
                    <li><a href="https://youtu.be/1nRZTtR4Hs0" target="_blank"><strong>شاهد الفيديو الكامل للمحاضرة على يوتيوب.</strong></a></li>
                    <li><strong>خريطة ذهنية للمحاضرة:</strong>
                        <ul style="text-align: right; margin-right: 20px;">
                            <li><strong>الفكرة الرئيسية:</strong> المشروعات القومية كتطبيق لوظائف الإدارة.</li>
                            <li><strong>الفروع الرئيسية:</strong>
                                <ul>
                                    <li>المدن الجديدة (العاصمة الإدارية، العلمين...).</li>
                                    <li>مشروعات الطرق والكهرباء.</li>
                                    <li>مشروع التحول الرقمي.</li>
                                    <li>مشروع بناء الإنسان.</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>`;
            break;
        case 'A':
            styleName = 'سمعي (Auditory) 🎧';
            description = 'أنت تتعلم بشكل أفضل عبر أذنيك. النقاشات، الشرح الصوتي، والموسيقى التصويرية للأفكار هي أدواتك.';
            recommendations = `
                <h3>المحاضرة الأولى: وظائف الإدارة في المشروعات القومية</h3>
                <p>هنا المحتوى الذي يناسب طريقتك في التعلم:</p>
                <ul>
                    <li><a href="#" target="_blank"><strong>استمع للمحاضرة كحلقة بودكاست (الرابط سيتوفر قريبًا).</strong></a></li>
                    <li><strong>مناقشة صوتية:</strong> فكر في هذا السؤال: "كيف ساهم المشروع القومي للطرق في تسهيل حياة المواطنين من وجهة نظرك؟". حاول تسجيل إجابتك صوتيًا.</li>
                </ul>`;
            break;
        case 'R':
            styleName = 'قرائي/كتابي (Read/Write) ✍️';
            description = 'الكلمة المكتوبة هي بوابتك للمعرفة. أنت تبدع في استيعاب المعلومات من النصوص وإعادة صياغتها.';
            recommendations = `
                <h3>المحاضرة الأولى: وظائف الإدارة في المشروعات القومية</h3>
                <p>هنا المحتوى الذي يناسب طريقتك في التعلم:</p>
                <h4>ملخص نصي لنقاط المحاضرة الرئيسية:</h4>
                <ul style="text-align: right; margin-right: 20px;">
                    <li><strong>الفكرة المحورية:</strong> المشروعات القومية منذ 2015 هي تطبيق عملي لوظائف الإدارة (تخطيط، تنظيم، توجيه، رقابة).</li>
                    <li><strong>المدن الجديدة:</strong> تم إنشاء مدن مثل العاصمة الإدارية والعلمين الجديدة بهدف حل مشاكل الإسكان والبطالة وزيادة المساحة المعمورة.</li>
                    <li><strong>البنية التحتية:</strong> تشمل مشروعات الطرق والكهرباء، وهي أساس جذب الاستثمارات وتوفير الطاقة اللازمة للتنمية.</li>
                    <li><strong>بناء الإنسان:</strong> يتم من خلال مشروعات التحول الرقمي وزيادة عدد الجامعات لتنمية وعي ومهارات المواطنين.</li>
                </ul>`;
            break;
        case 'K':
            styleName = 'حسي/حركي (Kinesthetic) 🏃‍♂️';
            description = 'شعارك هو "التعلم بالفعل والتجربة". أنت تحتاج لربط الأفكار المجردة بتطبيقات من العالم الحقيقي.';
            recommendations = `
                <h3>المحاضرة الأولى: وظائف الإدارة في المشروعات القومية</h3>
                <p>هنا المحتوى الذي يناسب طريقتك في التعلم:</p>
                <h4>تحدي عملي:</h4>
                <p>اختر واحدًا من المشروعات القومية التي ذُكرت في الفيديو (مثلاً: العاصمة الإدارية الجديدة).</p>
                <p>ابحث على الإنترنت عن 3 فوائد مباشرة عادت على المواطنين من هذا المشروع، واكتبها في نقاط. هذا سيربط المفهوم النظري للمشروع القومي بنتيجة ملموسة على أرض الواقع.</p>`;
            break;
    }
    // ================== نهاية المحتوى التعليمي ==================

    resultTitle.innerText = '✨ اكتمل الاختبار! هذه هي نتيجتك:';
    resultStyle.innerText = `نمط تعلمك الأساسي هو: ${styleName}`;
    resultDescription.innerHTML = `<p>${description}</p>`;
    resultRecommendations.innerHTML = recommendations;
}