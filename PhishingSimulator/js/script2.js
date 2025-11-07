// شريط التنقل المتجاوب
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    navToggle.classList.toggle("active")
  })

  // إغلاق القائمة عند النقر على رابط
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      navToggle.classList.remove("active")
    })
  })
}

// استبدال بيانات الاختبار بالبيانات الجديدة التي تتضمن أمثلة مصرية إضافية:

const quizItems = [
  // الأسئلة الأصلية (محفوظة)
  {
    id: "q1",
    title: "جوجل - صفحة تسجيل الدخول",
    url: "https://g00gle/login",
    language: "ar",
    imageText: "صفحة تسجيل دخول حساب جوجل - شعار متكرر\n(معاينة تعليمية)",
    isPhishing: true,
    explanation:
      "علامات تحذير: النطاق لا يتطابق مع نطاق جوجل الرسمي، وجود ضغط لإدخال معلومات حساسة فورًا. تحقق دائمًا من النطاق الرسمي وتواصل مع الدعم إن شككت.",
  },
  {
    id: "q2",
    title: "انستجرام - صفحة رئيسية",
    url: "https://www.home-instagram.com",
    language: "en",
    imageText: "صفحة انستجرام - صور ومشاركات\n(معاينة تعليمية)",
    isPhishing: true,
    explanation: "هذه صفحة لا تبدو حقيقية: نطاق خاطئ, تطلب معلومات حساسة مباشرة.",
  },
  {
    id: "q3",
    title: "لينكد ان - صفحة تسجيل دخول",
    url: "https://www.linkedin.com/login",
    language: "ar",
    imageText: "صفحة تفعيل تسجيل دخول\n(معاينة تعليمية)",
    isPhishing: false,
    explanation: " نطاق لينكد ان واضح ووجود تشفير https. مع ذلك، راجع دومًا الشهادة الرقمية إذا لزم.",
  },
  {
    id: "q4",
    title: "فوتوشوب - صفحة تسجيل دخول",
    url: "https://photoshop.com",
    language: "ar",
    imageText: "صفحة تسجيل دخول فوتوشوب\n(معاينة تعليمية)",
    isPhishing: true,
    explanation: "يستخدم HTTP بدلاً من HTTPS، والنطاق لا يبدو رسميًا. الأخطاء الإملائية شائعة في صفحات الاحتيال.",
  },
  {
    id: "q5",
    title: "بنترست - صفحة تسجيل دخول",
    url: "http://ngrok.com/3afw32a3yay3awy33/3dsf3/index.php",
    language: "en",
    imageText: "صفحة تسجيل دخول بنترست\n(معاينة تعليمية)",
    isPhishing: true,
    explanation:
      "الرابط تصيّد لأنه لا يستخدم نطاق Pinterest الرسمي (pinterest.com) بل نطاق ngrok.com، ويفتقد بروتوكول الحماية HTTPS.يستهدف سرقة بيانات تسجيل الدخول عبر صفحة مزيفة تشبه الصفحة الأصلية",
  },
  {
    id: "q6",
    title: "فيسبوك - منشور مشبوه",
    url: "https://facebook.com/posts/123456",
    language: "ar-eg",
    imageText: "منشور فيسبوك - مسابقة مشبوهة\n(معاينة تعليمية)",
    isPhishing: true,
    explanation:
      "ده منشور تصيد! المسابقات اللي بتطلب معلومات شخصية أو فلوس عشان تشارك فيها غالباً بتكون نصب. الصفحات الحقيقية مش بتطلب كده.",
  },
  {
    id: "q7",
    title: "بنك مصر - رسالة نصية",
    url: "SMS من بنك مصر",
    language: "ar-eg",
    imageText: "رسالة نصية مزيفة من بنك مصر\n(معاينة تعليمية)",
    isPhishing: true,
    explanation:
      "الرسالة دي مزيفة! البنوك الحقيقية مش بتبعت رسايل تطلب فيها رقم البطاقة أو الرقم السري. لو شاكك، اتصل بالبنك مباشرة.",
  },
  {
    id: "q8",
    title: "أوبر مصر - تطبيق حقيقي",
    url: "https://www.uber.com/eg/",
    language: "ar-eg",
    imageText: "تطبيق أوبر مصر الرسمي\n(معاينة تعليمية)",
    isPhishing: false,
    explanation: "ده موقع أوبر الحقيقي في مصر. النطاق صحيح (uber.com) وفيه https. التطبيق آمن للاستخدام.",
  },
  {
    id: "q9",
    title: "فودافون مصر - عرض مزيف",
    url: "http://vodafone-egypt-offer.net/win",
    language: "ar-eg",
    imageText: "صفحة عرض مزيف من فودافون\n(معاينة تعليمية)",
    isPhishing: true,
    explanation:
      "العرض ده مزيف! فودافون الحقيقية نطاقها vodafone.com.eg مش .net. العروض الحقيقية مش بتطلب معلومات بنكية.",
  },
  {
    id: "q10",
    title: "إيميل من أمازون مصر",
    url: "noreply@amazon-egypt.com",
    language: "ar-eg",
    imageText: "إيميل مشبوه من أمازون\n(معاينة تعليمية)",
    isPhishing: true,
    explanation:
      "الإيميل ده مزيف! أمازون مصر مش موجودة رسمياً، وأمازون الحقيقية بتبعت من amazon.com مش amazon-egypt.com.",
  },
  {
    id: "q11",
    title: "سوق.كوم - موقع حقيقي",
    url: "https://www.souq.com",
    language: "ar-eg",
    imageText: "موقع سوق.كوم الرسمي\n(معاينة تعليمية)",
    isPhishing: false,
    explanation: "ده موقع سوق.كوم الحقيقي (اللي بقى أمازون مصر دلوقتي). النطاق صحيح وآمن للتسوق.",
  },
  {
    id: "q12",
    title: "واتساب - رسالة احتيال",
    url: "WhatsApp Message",
    language: "ar-eg",
    imageText: "رسالة واتساب مشبوهة\n(معاينة تعليمية)",
    isPhishing: true,
    explanation: "الرسالة دي نصب! مفيش حاجة اسمها 'واتساب جولد' أو عروض مجانية من واتساب. متضغطش على أي لينك مشبوه.",
  },
]

// متغيرات الحالة
let currentIndex = 0
let score = 0
const answered = new Array(quizItems.length).fill(false)
const corrects = new Array(quizItems.length).fill(false)

// عناصر DOM
const btnStart = document.getElementById("btnStart")
const btnShowRules = document.getElementById("btnShowRules")
const rulesDiv = document.getElementById("rules")

const qCard = document.getElementById("question-card")
const intro = document.getElementById("intro")
const qIndexText = document.getElementById("qIndex")
const scoreBadge = document.getElementById("scoreBadge")
const scoreShort = document.getElementById("scoreShort")
const qCount = document.getElementById("qCount")

const screenshot = document.getElementById("screenshot")
const siteTitle = document.getElementById("siteTitle")
const urlText = document.getElementById("urlText")
const btnPhish = document.getElementById("btnPhish")
const btnLegit = document.getElementById("btnLegit")
const btnExplain = document.getElementById("btnExplain")
const feedback = document.getElementById("feedback")
const noteArea = document.getElementById("noteArea")

const btnPrev = document.getElementById("btnPrev")
const btnNext = document.getElementById("btnNext")
const btnSkip = document.getElementById("btnSkip")
const btnRestart = document.getElementById("btnRestart")

const finalCard = document.getElementById("final-card")
const finalScore = document.getElementById("finalScore")
const finalText = document.getElementById("finalText")

// الوظائف الأساسية
function updateOverview() {
  if (qCount) qCount.innerText = currentIndex + 1 + " / " + quizItems.length
  if (scoreShort) scoreShort.innerText = score
  if (scoreBadge) scoreBadge.innerText = "النتيجة: " + score
}

function showQuestion(index) {
  if (index < 0) index = 0;
  if (index >= quizItems.length) index = quizItems.length - 1;
  currentIndex = index;
  const item = quizItems[index];

  if (intro) intro.style.display = "none";
  if (finalCard) finalCard.style.display = "none";
  if (qCard) qCard.style.display = "block";


  if (screenshot) {
    screenshot.innerHTML = `
      <iframe 
        src="sites/${index + 1}/index.html" 
        class="quiz-iframe"
        sandbox="allow-scripts allow-same-origin"
        loading="lazy">
      </iframe>
    `;
  }

  if (siteTitle) siteTitle.innerText = item.title
  if (urlText) urlText.innerText = item.url
  if (qIndexText) qIndexText.innerText = `السؤال ${index + 1}`
  if (feedback) feedback.style.display = "none"
  if (noteArea) noteArea.innerHTML = ""

  resetButtonStates()
  updateOverview()

  if (btnPrev) btnPrev.disabled = index === 0
  if (btnNext) btnNext.disabled = index === quizItems.length - 1
}

function resetButtonStates() {
  if (btnPhish) {
    btnPhish.disabled = false
    btnPhish.className = "btn btn-danger btn-quiz"
  }
  if (btnLegit) {
    btnLegit.disabled = false
    btnLegit.className = "btn btn-outline-primary btn-quiz"
  }
}

function showFinal() {
  if (qCard) qCard.style.display = "none"
  if (finalCard) finalCard.style.display = "block"

  if (finalScore) finalScore.innerText = `نتيجتك: ${score} من ${quizItems.length}`

  const percent = Math.round((score / quizItems.length) * 100)
  let message = ""
  let alertClass = ""

  if (percent >= 80) {
    message = "🎉 ممتاز! لديك فهم ممتاز لعلامات التصيّد الإلكتروني. استمر في تطبيق هذه المعرفة."
    alertClass = "alert-success"
  } else if (percent >= 60) {
    message = "⚠️ جيد! لديك فهم جيد ولكن يمكنك التحسن أكثر. راجع النصائح أدناه."
    alertClass = "alert-warning"
  } else {
    message = "❌ بحاجة لتحسين! راجع إشارات التحذير بعناية وأعد المحاولة."
    alertClass = "alert-danger"
  }

  if (finalText) {
    finalText.innerHTML = `<div class="alert ${alertClass}">${message}</div>`
  }
  updateOverview()
}

function giveFeedback(isCorrect, explanation) {
  if (feedback) {
    feedback.style.display = "block"
    const alertClass = isCorrect ? "alert-success" : "alert-danger"
    const icon = isCorrect ? "✅" : "❌"
    const title = isCorrect ? "إجابة صحيحة!" : "إجابة خاطئة!"

    feedback.innerHTML = `
      <div class="alert ${alertClass}">
        <div class="alert-header">
          <span class="alert-icon">${icon}</span>
          <strong>${title}</strong>
        </div>
        <div class="alert-body">${explanation}</div>
      </div>
    `
  }

  if (noteArea) {
    const alertClass = isCorrect ? "alert-success" : "alert-danger"
    noteArea.innerHTML = `
      <div class="alert ${alertClass} small">
        <strong>${isCorrect ? "صحيح" : "خطأ"}:</strong> ${explanation}
      </div>
    `
  }
}

function answer(selectedPhishing) {
  const item = quizItems[currentIndex]
  if (answered[currentIndex]) {
    return
  }
  answered[currentIndex] = true
  const correct = selectedPhishing === item.isPhishing
  corrects[currentIndex] = correct
  if (correct) {
    score += 1
  }

  // تحديث حالة الأزرار
  if (btnPhish) btnPhish.disabled = true
  if (btnLegit) btnLegit.disabled = true

  // تلوين الأزرار حسب الإجابة
  if (selectedPhishing) {
    if (btnPhish) {
      btnPhish.className = correct ? "btn btn-success btn-quiz" : "btn btn-danger btn-quiz"
    }
  } else {
    if (btnLegit) {
      btnLegit.className = correct ? "btn btn-success btn-quiz" : "btn btn-danger btn-quiz"
    }
  }

  giveFeedback(correct, item.explanation)
  updateOverview()

  setTimeout(() => {
    if (currentIndex < quizItems.length - 1) {
      showQuestion(currentIndex + 1)
    } else {
      showFinal()
    }
  }, 3000)
}

// ربط الأحداث
if (btnStart) {
  btnStart.addEventListener("click", () => {
    currentIndex = 0
    score = 0
    answered.fill(false)
    corrects.fill(false)
    updateOverview()
    showQuestion(0)
  })
}

if (btnShowRules) {
  btnShowRules.addEventListener("click", () => {
    if (rulesDiv) {
      rulesDiv.style.display = rulesDiv.style.display === "none" ? "block" : "none"
    }
  })
}

if (btnPhish) btnPhish.addEventListener("click", () => answer(true))
if (btnLegit) btnLegit.addEventListener("click", () => answer(false))

if (btnExplain) {
  btnExplain.addEventListener("click", () => {
    const item = quizItems[currentIndex]
    alert("شرح:\n\n" + item.explanation)
  })
}

if (btnPrev) {
  btnPrev.addEventListener("click", () => {
    if (currentIndex > 0) showQuestion(currentIndex - 1)
  })
}

if (btnNext) {
  btnNext.addEventListener("click", () => {
    if (currentIndex < quizItems.length - 1) showQuestion(currentIndex + 1)
    else showFinal()
  })
}

if (btnSkip) {
  btnSkip.addEventListener("click", () => {
    answered[currentIndex] = true
    if (currentIndex < quizItems.length - 1) {
      showQuestion(currentIndex + 1)
    } else {
      showFinal()
    }
  })
}

if (btnRestart) {
  btnRestart.addEventListener("click", () => {
    currentIndex = 0
    score = 0
    answered.fill(false)
    corrects.fill(false)
    updateOverview()
    if (intro) intro.style.display = "block"
    if (finalCard) finalCard.style.display = "none"
    if (qCard) qCard.style.display = "none"
  })
}

// تأثيرات إضافية للتفاعل
document.addEventListener("DOMContentLoaded", () => {
  // تأثير التمرير السلس
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // تأثير ظهور العناصر عند التمرير
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // مراقبة عناصر النصائح
  document.querySelectorAll(".tip-card").forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(card)
  })

  // تهيئة الاختبار
  updateOverview()
})

// دعم لوحة المفاتيح
document.addEventListener("keydown", (e) => {
  if (qCard && qCard.style.display !== "none") {
    if (e.key === "1" || e.key === "ArrowLeft") {
      if (btnPhish && !btnPhish.disabled) answer(true)
    } else if (e.key === "2" || e.key === "ArrowRight") {
      if (btnLegit && !btnLegit.disabled) answer(false)
    } else if (e.key === "Enter" || e.key === " ") {
      if (btnNext && !btnNext.disabled) {
        if (currentIndex < quizItems.length - 1) {
          showQuestion(currentIndex + 1)
        } else {
          showFinal()
        }
      }
    }
  }
})

console.log("🛡️ محاكي اختبارات التصيد الإلكتروني - تم التحديث")
console.log("تم تطوير هذا الموقع لأغراض تعليمية لتوعية المستخدمين بمخاطر التصيد الإلكتروني")
