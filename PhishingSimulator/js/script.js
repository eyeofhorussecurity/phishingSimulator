const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    navToggle.classList.toggle("active")
  })

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      navToggle.classList.remove("active")
    })
  })
}

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
  "instagram-home": {
    title: "انستجرام - الصفحة الرئيسية",
    url: "https://www.home-instagram.com",
    scenario: "صاحبك بعتلك لينك قالك عليه إنه انستجرام جديد، لما دخلت لقيت الصفحة دي",
    isPhishing: true,
    explanation: "هذه صفحة مزيفة: النطاق خاطئ (instagram.com هو الصحيح)، تطلب معلومات حساسة مباشرة.",
    isSecure: false,
  },
  "linkedin-login": {
    title: "لينكد إن - صفحة تسجيل الدخول",
    url: "https://www.linkedin.com/login",
    scenario: "عايز تدخل على حسابك في لينكد إن عشان تشوف الرسايل، دخلت على الموقع ولقيت الصفحة دي",
    isPhishing: false,
    explanation: "هذا موقع LinkedIn الحقيقي. النطاق صحيح (linkedin.com) ووجود تشفير HTTPS.",
    isSecure: true,
  },
  "adobe-login": {
    title: "أدوبي - صفحة تسجيل الدخول",
    url: "http://photoshop.com",
    scenario: "عايز تحمل فوتوشوب، دورت على النت ولقيت الموقع ده، دخلت عليه ولقيت صفحة تسجيل دخول",
    isPhishing: true,
    explanation: "يستخدم HTTP بدلاً من HTTPS، والنطاق لا يبدو رسميًا. Adobe الحقيقية تستخدم adobe.com.",
    isSecure: false,
  },
  "pinterest-login": {
    title: "بنترست - صفحة تسجيل الدخول",
    url: "http://ngrok.com/3afw32a3yay3awy33/3dsf3/index.php",
    scenario: "جالك إيميل من بنترست بيقولك إن حسابك هيتقفل، واللينك ده هيخليك تأكد بياناتك",
    isPhishing: true,
    explanation:
      "الرابط تصيّد لأنه لا يستخدم نطاق Pinterest الرسمي (pinterest.com) بل نطاق ngrok.com، ويفتقد بروتوكول الحماية HTTPS.",
    isSecure: false,
  },
  "facebook-contest-post": {
    title: "فيسبوك - منشور مسابقة",
    url: "https://facebook.com/posts/123456",
    scenario: "شوفت منشور على فيسبوك بيقول مسابقة كبيرة وجوايز، والمنشور ده قدامك",
    isPhishing: true,
    explanation:
      "ده منشور تصيد! المسابقات اللي بتطلب معلومات شخصية أو فلوس عشان تشارك فيها غالباً بتكون نصب. الصفحات الحقيقية مش بتطلب كده.",
    isSecure: true,
  },
  "banque-misr-sms": {
    title: "رسالة نصية - بنك مصر",
    url: "https://messages.google.com",
    scenario: "جالك SMS على موبايلك من بنك مصر بيقولك إن فيه مشكلة في حسابك ولازم تأكد بياناتك",
    isPhishing: true,
    explanation:
      "الرسالة دي مزيفة! البنوك الحقيقية مش بتبعت رسايل تطلب فيها رقم البطاقة أو الرقم السري. لو شاكك، اتصل بالبنك مباشرة.",
    isSecure: true,
  },
  "uber-egypt": {
    title: "أوبر مصر - الصفحة الرئيسية",
    url: "https://www.uber.com/eg/",
    scenario: "عايز تطلب عربية أوبر، دخلت على الموقع من جوجل ولقيت الصفحة دي",
    isPhishing: false,
    explanation: "ده موقع أوبر الحقيقي في مصر. النطاق صحيح (uber.com) وفيه HTTPS. التطبيق آمن للاستخدام.",
    isSecure: true,
  },
  "vodafone-offer": {
    title: "فودافون مصر - صفحة عرض خاص",
    url: "http://vodafone-egypt-offer.net/win",
    scenario:
      "جالك SMS بيقولك: 'كسبت ٥٠٠ جنيه من فودافون، دوس هنا تستلمهم'، واللينك بيفتح صفحة تسجيل بيانات شبه موقع فودافون",
    isPhishing: true,
    explanation:
      "العرض ده مزيف! فودافون الحقيقية نطاقها vodafone.com.eg مش .net. العروض الحقيقية مش بتطلب معلومات بنكية.",
    isSecure: false,
  },
  "amazon-egypt-email": {
    title: "رسالة إيميل - أمازون مصر",
    url: "https://mail.google.com",
    scenario: "جالك إيميل من أمازون مصر بيقولك إن طلبك اتألغى ولازم تأكد بياناتك، فتحت الإيميل ولقيت المحتوى ده",
    isPhishing: true,
    explanation:
      "الإيميل ده مزيف! أمازون في مصر بتشتغل تحت اسم أمازون الإمارات، وأمازون الحقيقية بتبعت من amazon.com مش amazon-egypt.com.",
    isSecure: true,
  },
  "souq-home": {
    title: "سوق.كوم - الصفحة الرئيسية",
    url: "https://www.souq.com",
    scenario: "عايز تشتري حاجة أونلاين، فاكر موقع سوق.كوم القديم، دخلت عليه ولقيت الصفحة دي",
    isPhishing: false,
    explanation: "ده موقع سوق.كوم الحقيقي (اللي بقى أمازون الإمارات دلوقتي). النطاق صحيح وآمن للتسوق.",
    isSecure: true,
  },
  "whatsapp-gold-message": {
    title: "رسالة واتساب - واتساب جولد",
    url: "https://web.whatsapp.com",
    scenario:
      "جالك رسالة على الواتساب من صاحبك بيقولك على تطبيق واتساب جولد الجديد، ولما دخلت على اللينك شوفت الرسالة دي",
    isPhishing: true,
    explanation: "الرسالة دي نصب! مفيش حاجة اسمها 'واتساب جولد' أو عروض مجانية من واتساب. متضغطش على أي لينك مشبوه.",
    isSecure: true,
  },
  "nbe-update": {
    title: "البنك الأهلي المصري - صفحة تحديث البيانات",
    url: "http://nbe-egypt-update.com/verify",
    scenario: "جالك إيميل من البنك الأهلي بيقولك لازم تحدث بياناتك، دخلت على اللينك ولقيت الصفحة دي",
    isPhishing: true,
    explanation:
      "ده موقع مزيف! البنك الأهلي الحقيقي موقعه nbe.com.eg مش nbe-egypt-update.com. البنوك مش بتطلب تحديث البيانات عن طريق لينكات في الإيميل.",
    isSecure: false,
  },
  "careem-home": {
    title: "كريم مصر - الصفحة الرئيسية",
    url: "https://www.careem.com/egypt",
    scenario: "عايز تطلب عربية كريم، دخلت على الموقع من جوجل ولقيت الصفحة دي",
    isPhishing: false,
    explanation: "ده موقع كريم الحقيقي في مصر. النطاق صحيح (careem.com) وفيه HTTPS. الموقع آمن للاستخدام.",
    isSecure: true,
  },
  "telegram-gold": {
    title: "تليجرام جولد - صفحة التحميل",
    url: "https://telegram-gold-egypt.net/download",
    scenario: "صاحبك قالك على تطبيق تليجرام جولد الجديد اللي فيه مميزات أكتر، دخلت على اللينك ولقيت الصفحة دي",
    isPhishing: true,
    explanation:
      "ده موقع نصب! مفيش حاجة اسمها 'تليجرام جولد'. تليجرام الحقيقي موقعه telegram.org. أي موقع تاني بيدعي إنه تليجرام يبقى مشبوه.",
    isSecure: true,
  },
  "cib-alert": {
    title: "البنك التجاري الدولي - تنبيه أمني",
    url: "http://cib-bank-egypt.net/alert",
    scenario: "جالك إيميل من البنك التجاري الدولي بيقولك فيه نشاط مشبوه على حسابك، دخلت على اللينك ولقيت الصفحة دي",
    isPhishing: true,
    explanation:
      "ده موقع مزيف! البنك التجاري الدولي الحقيقي موقعه cibeg.com. البنوك مش بتبعت تنبيهات أمنية تطلب بيانات حساسة عبر الإيميل.",
    isSecure: false,
  },
  "orange-bill": {
    title: "أورانج مصر - فاتورة الشهر",
    url: "http://orange-egypt-bill.com/pay",
    scenario: "جالك إيميل من أورانج بفاتورة الشهر وطالب منك تدفع أونلاين، دخلت على اللينك ولقيت الصفحة دي",
    isPhishing: true,
    explanation: "الموقع ده مزيف! أورانج الحقيقية موقعها orange.eg. الشركات الحقيقية مش بتبعت فواتير من نطاقات مشبوهة.",
    isSecure: false,
  },
  "etisalat-home": {
    title: "اتصالات مصر - الصفحة الرئيسية",
    url: "https://www.etisalat.eg",
    scenario: "عايز تشوف فاتورة التليفون، دخلت على موقع اتصالات ولقيت الصفحة دي",
    isPhishing: false,
    explanation: "ده موقع اتصالات مصر الحقيقي. النطاق صحيح (etisalat.eg) وفيه HTTPS. الموقع آمن للاستخدام.",
    isSecure: true,
  },
  "jumia-sale": {
    title: "جوميا - عرض خاص",
    url: "http://jumia-egypt-sale.net/mega-sale",
    scenario: "شوفت إعلان على فيسبوك لعرض كبير في جوميا، دخلت على اللينك ولقيت الصفحة دي",
    isPhishing: true,
    explanation:
      "العرض ده مزيف! جوميا الحقيقية موقعها jumia.com.eg. العروض الحقيقية مش بتطلب دفع مقدم أو معلومات بنكية قبل الشراء.",
    isSecure: false,
  },
  "paypal-security": {
    title: "باي بال - تحذير أمني",
    url: "http://paypal-security-egypt.com/verify",
    scenario: "جالك إيميل من PayPal بيقولك إن حسابك في خطر ولازم تأكد بياناتك، دخلت على اللينك ولقيت الصفحة دي",
    isPhishing: true,
    explanation:
      "ده موقع مزيف! PayPal الحقيقي موقعه paypal.com. PayPal مش بيطلب تأكيد الحساب عن طريق لينكات في الإيميل.",
    isSecure: false,
  },
  "microsoft-office": {
    title: "مايكروسوفت أوفيس - صفحة التفعيل",
    url: "http://office-activation-egypt.net/activate",
    scenario: "اشتريت أوفيس جديد وعايز تفعله، دورت على النت على طريقة التفعيل ولقيت الموقع ده",
    isPhishing: true,
    explanation:
      "الموقع ده مزيف! Microsoft الحقيقية موقعها microsoft.com. تفعيل Office بيتم من خلال الموقع الرسمي أو التطبيق نفسه.",
    isSecure: false,
  },
  "netflix-payment": {
    title: "نتفليكس - مشكلة في الدفع",
    url: "https://mail.yahoo.com",
    scenario: "جالك إيميل من نتفليكس بيقولك إن فيه مشكلة في الدفع وحسابك هيتقفل، فتحت الإيميل ولقيت المحتوى ده",
    isPhishing: true,
    explanation:
      "الإيميل ده مزيف! Netflix الحقيقي موقعه netflix.com. Netflix مش بيطلب تحديث بيانات الدفع عن طريق لينكات في الإيميل.",
    isSecure: true,
  },
  "spotify-home": {
    title: "سبوتيفاي - الصفحة الرئيسية",
    url: "https://www.spotify.com",
    scenario: "عايز تسمع موسيقى، دخلت على سبوتيفاي ولقيت الصفحة دي",
    isPhishing: false,
    explanation: "ده موقع Spotify الحقيقي. النطاق صحيح (spotify.com) وفيه HTTPS. الموقع آمن للاستخدام.",
    isSecure: true,
  },
  "apple-icloud": {
    title: "آبل - تحذير iCloud",
    url: "http://icloud-security-alert.net/verify",
    scenario: "جالك إيميل من آبل بيقولك إن حد حاول يدخل على حسابك، دخلت على اللينك ولقيت الصفحة دي",
    isPhishing: true,
    explanation:
      "ده موقع مزيف! Apple الحقيقية موقعها apple.com أو icloud.com. Apple مش بتبعت تحذيرات أمنية تطلب كلمة المرور عبر الإيميل.",
    isSecure: false,
  },
  "amazon-home": {
    title: "أمازون - الصفحة الرئيسية",
    url: "https://www.amazon.com",
    scenario: "عايز تشتري حاجة من أمازون، دخلت على الموقع ولقيت الصفحة دي",
    isPhishing: false,
    explanation: "ده موقع Amazon الحقيقي. النطاق صحيح (amazon.com) وفيه HTTPS. الموقع آمن للتسوق.",
    isSecure: true,
  },
  "ebay-seller": {
    title: "إي باي - صفحة بائع",
    url: "http://ebay-egypt-deals.net/seller",
    scenario: "لقيت عرض حلو على إي باي، البائع بعتلك لينك خاص عشان تشتري منه بسعر أقل، دخلت ولقيت الصفحة دي",
    isPhishing: true,
    explanation:
      "الموقع ده مزيف! eBay الحقيقي موقعه ebay.com. البائعين الحقيقيين على eBay مش بيطلبوا دفع خارج المنصة الرسمية.",
    isSecure: false,
  },
  "gmail-storage": {
    title: "جيميل - تحذير امتلاء المساحة",
    url: "http://gmail-storage-full.net/upgrade",
    scenario: "جالك إيميل من جوجل بيقولك إن مساحة الجيميل بتاعك خلصت ولازم تزودها، دخلت على اللينك ولقيت الصفحة دي",
    isPhishing: true,
    explanation: "ده موقع مزيف! Gmail الحقيقي موقعه gmail.com. Google مش بتطلب ترقية المساحة عن طريق لينكات مشبوهة.",
    isSecure: false,
  },
  "yahoo-breach": {
    title: "ياهو - تحذير اختراق",
    url: "https://mail.yahoo.com",
    scenario: "جالك إيميل من ياهو بيقولك إن حسابك اتهكر ولازم تغير الباسورد، فتحت الإيميل ولقيت المحتوى ده",
    isPhishing: true,
    explanation:
      "الإيميل ده مزيف! Yahoo الحقيقي موقعه yahoo.com. Yahoo مش بتطلب تغيير كلمة المرور عن طريق لينكات في الإيميل.",
    isSecure: true,
  },
  "twitter-verification": {
    title: "تويتر - صفحة التوثيق",
    url: "http://twitter-verification-egypt.com/verify",
    scenario: "شوفت إعلان بيقولك إزاي تاخد علامة التوثيق الزرقا في تويتر، دخلت على اللينك ولقيت الصفحة دي",
    isPhishing: true,
    explanation:
      "الموقع ده مزيف! Twitter (X) الحقيقي موقعه x.com. التوثيق بيتم من خلال الموقع الرسمي مش من لينكات خارجية.",
    isSecure: false,
  },
  "tiktok-monetization": {
    title: "تيك توك - صفحة الربح",
    url: "http://tiktok-egypt-money.net/earn",
    scenario: "شوفت فيديو بيقولك إزاي تكسب فلوس من تيك توك، دخلت على اللينك اللي في الوصف ولقيت الصفحة دي",
    isPhishing: true,
    explanation:
      "العرض ده مزيف! TikTok الحقيقي موقعه tiktok.com. برامج الربح الحقيقية بتتم من خلال التطبيق الرسمي مش مواقع خارجية.",
    isSecure: false,
  },
  "youtube-monetization": {
    title: "يوتيوب - صفحة تفعيل الربح",
    url: "http://youtube-egypt-partner.com/monetize",
    scenario: "عايز تفعل الربح من قناتك على يوتيوب، دورت على النت ولقيت الموقع ده بيقولك هيساعدك",
    isPhishing: true,
    explanation: "الموقع ده مزيف! YouTube الحقيقي موقعه youtube.com. تفعيل الربح بيتم من خلال YouTube Studio الرسمي.",
    isSecure: false,
  },
  "google-homepage": {
    title: "جوجل - الصفحة الرئيسية",
    url: "https://www.google.com",
    scenario: "فتحت المتصفح عشان تدور على حاجة، دخلت على جوجل ولقيت الصفحة دي",
    isPhishing: false,
    explanation: "ده موقع Google الحقيقي. النطاق صحيح (google.com) وفيه HTTPS. الموقع آمن للاستخدام.",
    isSecure: true,
  },
  "facebook-homepage": {
    title: "فيسبوك - الصفحة الرئيسية",
    url: "https://www.facebook.com",
    scenario: "عايز تشوف آخر الأخبار من أصحابك، دخلت على فيسبوك ولقيت الصفحة دي",
    isPhishing: false,
    explanation: "ده موقع Facebook الحقيقي. النطاق صحيح (facebook.com) وفيه HTTPS. الموقع آمن للاستخدام.",
    isSecure: true,
  },
  "instagram-homepage": {
    title: "انستجرام - الصفحة الرئيسية",
    url: "https://www.instagram.com",
    scenario: "عايز تشوف الصور الجديدة، دخلت على انستجرام ولقيت الصفحة دي",
    isPhishing: false,
    explanation: "ده موقع Instagram الحقيقي. النطاق صحيح (instagram.com) وفيه HTTPS. الموقع آمن للاستخدام.",
    isSecure: true,
  },
  "whatsapp-home": {
    title: "واتساب - الصفحة الرئيسية",
    url: "https://www.whatsapp.com",
    scenario: "عايز تحمل واتساب على الكمبيوتر، دخلت على الموقع الرسمي ولقيت الص��حة دي",
    isPhishing: false,
    explanation: "ده موقع WhatsApp الحقيقي. النطاق صحيح (whatsapp.com) وفيه HTTPS. الموقع آمن للاستخدام.",
    isSecure: true,
  },
}

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
  if (scoreBadge) scoreBadge.innerText = "النتيجة: " + score
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
  if (qIndexText) qIndexText.innerText = `السؤال ${index + 1}`
  if (feedback) feedback.style.display = "none"
  if (noteArea) noteArea.innerHTML = ""

  resetButtonStates()
  updateOverview()

  if (btnPrev) btnPrev.disabled = index === 0
  if (btnNext) {
    btnNext.disabled = index === 19
    // Enable/disable Next button based on whether question is answered
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

  if (finalScore) finalScore.innerText = `نتيجتك: ${score} من 20`

  const percent = Math.round((score / 20) * 100)
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

  // Check if this is the last question and automatically show results
  if (currentIndex === 19) {
    setTimeout(() => {
      showFinal()
    }, 3000)
  }

  // Enable Next button after answering
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
    // Check if current question has been answered before allowing to proceed
    if (!answered[currentIndex]) {
      alert("يجب الإجابة على السؤال أولاً أو اضغط 'تخطي' للانتقال للسؤال التالي")
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
document.addEventListener("DOMContentLoaded", function () {
  const cards = Array.from(document.querySelectorAll(".tips-grid .tip-card"));
  if (!cards.length) return;
  cards.forEach((card, i) => {
    card.classList.remove("in-from-right","in-from-left","fade-in","offset-right","offset-left","offset-scale");
    card.classList.add("offset-bottom"); 
    card.classList.add(`stagger-${i % 6}`);
  });
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -10% 0px",
    threshold: 0.15
  };
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const card = entry.target;
      card.classList.remove("fade-in");
      void card.offsetWidth;
      card.classList.add("fade-in");
      obs.unobserve(card);
    });
  }, observerOptions);
  cards.forEach(c => io.observe(c));
});

