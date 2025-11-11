// ... existing code for phishing templates ...

const phishingTemplates = {
  "google-login": {
    title: "جوجل - صفحة تسجيل الدخول",
    url: "https://g00gle.com/login",
    scenario: "دخلت على جوجل عشان تسجل دخول لحسابك، لقيت الصفحة دي قدامك وطالبة منك الإيميل والباسورد",
    isPhishing: true,
    explanation:
      "علامات تحذير: النطاق لا يتطابق مع نطاق جوجل الرسمي (google.com)، وجود ضغط لإدخال معلومات حساسة فورًا. تحقق دائمًا من النطاق الرسمي.",
    isSecure: false,
  },
  // ... rest of templates ...
}

let currentLanguage = localStorage.getItem("language") || "ar"
let currentTheme = localStorage.getItem("theme") || "light"

// Initialize theme on load
document.addEventListener("DOMContentLoaded", () => {
  initializeTheme()
  initializeLanguage()
  setupThemeToggle()
  setupLanguageToggle()
})

function initializeTheme() {
  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode")
    document.getElementById("themeToggle")?.setAttribute("checked", "checked")
    document.getElementById("themeToggleMobile")?.setAttribute("checked", "checked")
  }
}

function initializeLanguage() {
  if (currentLanguage === "en") {
    switchToEnglish()
  }
}

function setupThemeToggle() {
  const themeToggle = document.getElementById("themeToggle")
  const themeToggleMobile = document.getElementById("themeToggleMobile")

  themeToggle?.addEventListener("change", () => {
    toggleTheme()
  })

  themeToggleMobile?.addEventListener("change", () => {
    toggleTheme()
  })
}

function setupLanguageToggle() {
  const langButtons = document.querySelectorAll(".lang-btn")

  langButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault()
      const lang = btn.getAttribute("data-lang")
      if (lang === "en") {
        switchToEnglish()
      } else {
        switchToArabic()
      }
    })
  })
}

function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light"
  localStorage.setItem("theme", currentTheme)

  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode")
  } else {
    document.body.classList.remove("dark-mode")
  }

  // Sync both toggles
  const themeToggle = document.getElementById("themeToggle")
  const themeToggleMobile = document.getElementById("themeToggleMobile")
  if (themeToggle) {
    themeToggle.checked = currentTheme === "dark"
  }
  if (themeToggleMobile) {
    themeToggleMobile.checked = currentTheme === "dark"
  }
}

function switchToEnglish() {
  currentLanguage = "en"
  localStorage.setItem("language", "en")
  document.documentElement.setAttribute("lang", "en")
  document.documentElement.setAttribute("dir", "ltr")
  updatePageContent("en")
  updateLanguageButtons("en")
}

function switchToArabic() {
  currentLanguage = "ar"
  localStorage.setItem("language", "ar")
  document.documentElement.setAttribute("lang", "ar")
  document.documentElement.setAttribute("dir", "rtl")
  updatePageContent("ar")
  updateLanguageButtons("ar")
}

function updatePageContent(lang) {
  const elements = document.querySelectorAll("[data-ar][data-en]")

  elements.forEach((el) => {
    if (lang === "en") {
      el.textContent = el.getAttribute("data-en")
    } else {
      el.textContent = el.getAttribute("data-ar")
    }
  })

  // Special handling for html/body attributes
  if (lang === "en") {
    document.body.style.direction = "ltr"
  } else {
    document.body.style.direction = "rtl"
  }
}

function updateLanguageButtons(lang) {
  const buttons = document.querySelectorAll(".lang-btn")
  buttons.forEach((btn) => {
    btn.classList.remove("active")
    if (btn.getAttribute("data-lang") === lang) {
      btn.classList.add("active")
    }
  })
}

const toggle = document.getElementById("nav-toggle");
const menu = document.getElementById("nav-menu");

toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  menu.classList.toggle("active");
});
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggle.classList.toggle("active");
    menu.classList.toggle("active");
  });

  // Close the mobile menu when clicking outside it
  document.addEventListener("click", (e) => {
    if (
      menu.classList.contains("active") &&
      !menu.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      menu.classList.remove("active");
      toggle.classList.remove("active");
    }
  });
});

let currentQuizQuestions = []
let currentIndex = 0
let score = 0
const answered = new Array(20).fill(false)
const corrects = new Array(20).fill(false)

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
const scenarioText = document.getElementById("scenario")
const urlDisplay = document.getElementById("url-display")
const securityIcon = document.getElementById("security-icon")
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

const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    navToggle.classList.toggle("active")
  })

  document.querySelectorAll(".nav-link, .dropdown-item").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      navToggle.classList.remove("active")
    })
  })
}

function selectRandomQuestions() {
  const templateKeys = Object.keys(phishingTemplates)
  const shuffled = templateKeys.sort(() => 0.5 - Math.random())
  const selected = shuffled.slice(0, 20)

  currentQuizQuestions = selected.map((key) => ({
    templateName: key,
    ...phishingTemplates[key],
  }))
}

function updateOverview() {
  if (qCount) qCount.innerText = currentIndex + 1 + " / 20"
  if (scoreShort) scoreShort.innerText = score
  if (scoreBadge) scoreBadge.innerText = (currentLanguage === "en" ? "Score: " : "النتيجة: ") + score
}

function updateUrlBar(item) {
  if (urlDisplay) urlDisplay.innerText = item.url

  if (securityIcon) {
    if (item.isSecure) {
      securityIcon.innerText = "🔒"
    } else {
      securityIcon.innerText = "⚠️"
    }
  }
}

function showQuestion(index) {
  if (index < 0) index = 0
  if (index >= 20) index = 19
  currentIndex = index
  const item = currentQuizQuestions[index]

  if (intro) intro.style.display = "none"
  if (finalCard) finalCard.style.display = "none"
  if (qCard) qCard.style.display = "block"

  if (screenshot) {
    screenshot.innerHTML = `
<iframe 
src="../sites/${item.templateName}/index.html"
class="quiz-iframe"
sandbox="allow-scripts allow-same-origin"
loading="lazy">
</iframe>
`
  }

  if (siteTitle) siteTitle.innerText = item.title
  if (scenarioText) scenarioText.innerText = item.scenario
  updateUrlBar(item)
  if (qIndexText) qIndexText.innerText = currentLanguage === "en" ? `Question ${index + 1}` : `السؤال ${index + 1}`
  if (feedback) feedback.style.display = "none"
  if (noteArea) noteArea.innerHTML = ""

  resetButtonStates()
  updateOverview()

  if (btnPrev) btnPrev.disabled = index === 0
  if (btnNext) {
    btnNext.disabled = index === 19
    if (index < 19) {
      btnNext.disabled = !answered[index]
    }
  }
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

  const scoreText = currentLanguage === "en" ? `Your Score: ${score} out of 20` : `نتيجتك: ${score} من 20`
  if (finalScore) finalScore.innerText = scoreText

  const percent = Math.round((score / 20) * 100)
  let message = ""
  let alertClass = ""

  if (percent >= 80) {
    message =
      currentLanguage === "en"
        ? "🎉 Excellent! You have a great understanding of phishing signs. Keep applying this knowledge."
        : "🎉 ممتاز! لديك فهم ممتاز لعلامات التصيّد الإلكتروني. استمر في تطبيق هذه المعرفة."
    alertClass = "alert-success"
  } else if (percent >= 60) {
    message =
      currentLanguage === "en"
        ? "⚠️ Good! You have a good understanding but can improve more. Review the tips below."
        : "⚠️ جيد! لديك فهم جيد ولكن يمكنك التحسن أكثر. راجع النصائح أدناه."
    alertClass = "alert-warning"
  } else {
    message =
      currentLanguage === "en"
        ? "❌ Needs Improvement! Review warning signs carefully and try again."
        : "❌ بحاجة لتحسين! راجع إشارات التحذير بعناية وأعد المحاولة."
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
    const title =
      currentLanguage === "en"
        ? isCorrect
          ? "Correct Answer!"
          : "Wrong Answer!"
        : isCorrect
          ? "إجابة صحيحة!"
          : "إجابة خاطئة!"

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
    const label = currentLanguage === "en" ? (isCorrect ? "Correct" : "Wrong") : isCorrect ? "صحيح" : "خطأ"
    noteArea.innerHTML = `
<div class="alert ${alertClass} small">
<strong>${label}:</strong> ${explanation}
</div>
`
  }
}

function answer(selectedPhishing) {
  const item = currentQuizQuestions[currentIndex]
  if (answered[currentIndex]) {
    return
  }
  answered[currentIndex] = true
  const correct = selectedPhishing === item.isPhishing
  corrects[currentIndex] = correct
  if (correct) {
    score += 1
  }

  if (btnPhish) btnPhish.disabled = true
  if (btnLegit) btnLegit.disabled = true

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

  if (currentIndex === 19) {
    setTimeout(() => {
      showFinal()
    }, 3000)
  }

  if (btnNext && currentIndex < 19) {
    btnNext.disabled = false
  }
}

if (btnStart) {
  btnStart.addEventListener("click", () => {
    selectRandomQuestions()
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
    const item = currentQuizQuestions[currentIndex]
    alert(currentLanguage === "en" ? "Explanation:\n\n" + item.explanation : "شرح:\n\n" + item.explanation)
  })
}

if (btnPrev) {
  btnPrev.addEventListener("click", () => {
    if (currentIndex > 0) showQuestion(currentIndex - 1)
  })
}

if (btnNext) {
  btnNext.addEventListener("click", () => {
    if (!answered[currentIndex]) {
      const msg =
        currentLanguage === "en"
          ? "You must answer the question first or press 'Skip' to move to the next question"
          : "يجب الإجابة على السؤال أولاً أو اضغط 'تخطي' للانتقال للسؤال التالي"
      alert(msg)
      return
    }

    if (currentIndex < 19) {
      showQuestion(currentIndex + 1)
    } else {
      showFinal()
    }
  })
}

if (btnSkip) {
  btnSkip.addEventListener("click", () => {
    answered[currentIndex] = true
    if (currentIndex < 19) {
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

document.addEventListener("DOMContentLoaded", () => {
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

  document.querySelectorAll(".tip-card").forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(card)
  })

  updateOverview()
})

document.addEventListener("keydown", (e) => {
  if (qCard && qCard.style.display !== "none") {
    if (e.key === "1" || e.key === "ArrowLeft") {
      if (btnPhish && !btnPhish.disabled) answer(true)
    } else if (e.key === "2" || e.key === "ArrowRight") {
      if (btnLegit && !btnLegit.disabled) answer(false)
    } else if (e.key === "Enter" || e.key === " ") {
      if (btnNext && !btnNext.disabled) {
        if (currentIndex < 19) {
          showQuestion(currentIndex + 1)
        } else {
          showFinal()
        }
      }
    }
  }
})

document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".tips-grid .tip-card"))
  if (!cards.length) return
  cards.forEach((card, i) => {
    card.classList.remove("in-from-right", "in-from-left", "fade-in", "offset-right", "offset-left", "offset-scale")
    card.classList.add("offset-bottom")
    card.classList.add(`stagger-${i % 6}`)
  })
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -10% 0px",
    threshold: 0.15,
  }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      const card = entry.target
      card.classList.remove("fade-in")
      void card.offsetWidth
      card.classList.add("fade-in")
      obs.unobserve(card)
    })
  }, observerOptions)
  cards.forEach((c) => io.observe(c))
})
