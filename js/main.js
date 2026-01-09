const quizItems = [
      {
        id: "q1",
        title: "بنك المثال - صفحة تسجيل الدخول",
        url: "https://secure-example-bank.com/login",
        language: "ar",
        imageText: "صفحة تسجيل دخول بنكي - شعار متكرر\n(معاينة تعليمية)",
        isPhishing: true,
        explanation: "علامات تحذير: النطاق لا يتطابق مع نطاق انستجرام الرسمي، وجود ضغط لإدخال معلومات حساسة فورًا. تحقق دائمًا من النطاق الرسمي وتواصل مع الدعم إن شككت."
      },
      {
        id: "q2",
        title: "متجر إلكتروني شهير - صفحة رئيسية",
        url: "https://www.shop-example.com",
        language: "en",
        imageText: "صفحة متجر - عروض وتخفيضات\n(معاينة تعليمية)",
        isPhishing: false,
        explanation: "هذه صفحة تبدو حقيقية: نطاق معروف، واجهة متوافقة، ولا تطلب معلومات حساسة مباشرة."
      },
      {
        id: "q3",
        title: "خدمات البريد - رسالة تفعيل حساب",
        url: "http://mail.example-verify.com/activate",
        language: "ar",
        imageText: "صفحة تفعيل حساب بريدية\n(معاينة تعليمية)",
        isPhishing: true,
        explanation: "يستخدم HTTP بدلاً من HTTPS، والنطاق لا يبدو رسميًا. الأخطاء الإملائية شائعة في صفحات الاحتيال."
      },
      {
        id: "q4",
        title: "موقع حكومي - بوابة خدمات المواطنين",
        url: "https://gov.example.gov.eg",
        language: "ar",
        imageText: "بوابة حكومية - خدمات المواطنين\n(معاينة تعليمية)",
        isPhishing: false,
        explanation: "نطاق حكومي واضح ووجود تشفير https. مع ذلك، راجع دومًا الشهادة الرقمية إذا لزم."
      },
      {
        id: "q5",
        title: "عرض وظيفة عاجل - استمارة بيانات",
        url: "https://apply-now-jobs.example",
        language: "en",
        imageText: "نموذج طلب وظيفة - يطلب معلومات بنكية\n(معاينة تعليمية)",
        isPhishing: true,
        explanation: "طلب بيانات بنكية مبكرًا هو إشارة تحذيرية. قابل للشبهة إن طُلب رقم حساب أو تفاصيل بطاقة قبل مقابلة رسمية."
      }
    ];

    // =======State=======
    let currentIndex = 0;
    let score = 0;
    let answered = new Array(quizItems.length).fill(false);
    let corrects = new Array(quizItems.length).fill(false);

    // =======DOM elements=======
    const btnStart = document.getElementById('btnStart');
    const btnShowRules = document.getElementById('btnShowRules');
    const rulesDiv = document.getElementById('rules');

    const qCard = document.getElementById('question-card');
    const intro = document.getElementById('intro');
    const qIndexText = document.getElementById('qIndex');
    const scoreBadge = document.getElementById('scoreBadge');
    const scoreShort = document.getElementById('scoreShort');
    const qCount = document.getElementById('qCount');

    const screenshot = document.getElementById('screenshot');
    const screenshotText = document.getElementById('screenshotText');
    const siteTitle = document.getElementById('siteTitle');
    const urlText = document.getElementById('urlText');
    const btnPhish = document.getElementById('btnPhish');
    const btnLegit = document.getElementById('btnLegit');
    const btnExplain = document.getElementById('btnExplain');
    const feedback = document.getElementById('feedback');
    const noteArea = document.getElementById('noteArea');

    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    const btnSkip = document.getElementById('btnSkip');
    const btnRestart = document.getElementById('btnRestart');

    const finalCard = document.getElementById('final-card');
    const finalScore = document.getElementById('finalScore');
    const finalText = document.getElementById('finalText');

    // =======Functions=======
    function updateOverview() {
      qCount.innerText = (currentIndex+1) + " / " + quizItems.length;
      scoreShort.innerText = score;
      scoreBadge.innerText = "النتيجة: " + score;
    }

    function showQuestion(index) {
      if (index < 0) index = 0;
      if (index >= quizItems.length) index = quizItems.length - 1;
      currentIndex = index;
      const item = quizItems[index];
      intro.style.display = 'none';
      finalCard.style.display = 'none';
      qCard.style.display = 'block';

      const iframeSrc = `sites/${item.id}/${item.id}.html`;
      let iframe = screenshot.querySelector('iframe.quiz-site-iframe');
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.className = 'quiz-site-iframe';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = '0';
        iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
        screenshot.insertBefore(iframe, screenshot.firstChild);
      }
      iframe.src = iframeSrc;
      screenshotText.innerText = item.imageText;

      siteTitle.innerText = item.title;
      urlText.innerText = item.url;
      feedback.style.display = 'none';
      noteArea.innerText = "";
      updateOverview();
      btnPrev.disabled = (index === 0);
      btnNext.disabled = (index === quizItems.length - 1);
    }

    function showFinal() {
      qCard.style.display = 'none';
      finalCard.style.display = 'block';
      finalScore.innerText = `نتيجتك: ${score} من ${quizItems.length}`;
      const percent = Math.round((score / quizItems.length) * 100);
      finalText.innerText = (percent >= 70) ? "ممتاز — لديك فهم جيد لعلامات التصيّد." : (percent >= 40 ? "مقبول — حاول المراجعة أكثر." : "بحاجة لتحسين — راجع إشارات التحذير بعناية.");
      updateOverview();
    }

    function giveFeedback(isCorrect, explanation) {
      feedback.style.display = 'block';
      feedback.className = isCorrect ? 'alert alert-success' : 'alert alert-danger';
      feedback.innerHTML = (isCorrect ? '<strong>إجابة صحيحة</strong> — ' : '<strong>إجابة خاطئة</strong> — ') + `<div class="mt-2">${explanation}</div>`;
      noteArea.innerText = explanation;
    }

    function answer(selectedPhishing) {
      const item = quizItems[currentIndex];
      if (answered[currentIndex]) {
        return;
      }
      answered[currentIndex] = true;
      const correct = (selectedPhishing === item.isPhishing);
      corrects[currentIndex] = correct;
      if (correct) { score += 1; }
      giveFeedback(correct, item.explanation);
      updateOverview();

      setTimeout(() => {
        if (currentIndex < quizItems.length - 1) {
          showQuestion(currentIndex + 1);
        } else {
          showFinal();
        }
      }, 1200);
    }

    btnStart.addEventListener('click', () => {
      currentIndex = 0; score = 0;
      answered.fill(false); corrects.fill(false);
      updateOverview();
      showQuestion(0);
    });

    btnShowRules.addEventListener('click', () => {
      rulesDiv.style.display = (rulesDiv.style.display === 'none') ? 'block' : 'none';
    });

    btnPhish.addEventListener('click', () => answer(true));
    btnLegit.addEventListener('click', () => answer(false));

    btnExplain.addEventListener('click', () => {
      const item = quizItems[currentIndex];
      alert("شرح:\\n\\n" + item.explanation);
    });

    btnPrev.addEventListener('click', () => {
      if (currentIndex > 0) showQuestion(currentIndex - 1);
    });
    btnNext.addEventListener('click', () => {
      if (currentIndex < quizItems.length - 1) showQuestion(currentIndex + 1);
      else showFinal();
    });
    btnSkip.addEventListener('click', () => {
      answered[currentIndex] = true;
      showQuestion(Math.min(currentIndex + 1, quizItems.length - 1));
    });

    btnRestart.addEventListener('click', () => {
      currentIndex = 0; score = 0; answered.fill(false); corrects.fill(false);
      updateOverview();
      intro.style.display = 'block';
      finalCard.style.display = 'none';
      qCard.style.display = 'none';
    });

    updateOverview();