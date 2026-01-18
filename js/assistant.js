let selectedFiles = [];

const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const chatMessages = document.getElementById('chatMessages');
const fileInput = document.getElementById('fileInput');
const filePreview = document.getElementById('filePreview');
const typingIndicator = document.getElementById('typingIndicator');
typingIndicator.style.display = 'none';
messageInput.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 100) + 'px';
});

messageInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

sendBtn.addEventListener('click', sendMessage);

fileInput.addEventListener('change', function (e) {
    const files = Array.from(e.target.files);
    files.forEach(file => {
        if (selectedFiles.length < 5 && file.size <= 10 * 1024 * 1024) {
            selectedFiles.push(file);
            addFilePreview(file);
        }
    });
});

function addFilePreview(file) {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.innerHTML = `
                <i class="fas fa-file"></i>
                <span>${file.name}</span>
                <span class="file-remove" onclick="removeFile('${file.name}')">&times;</span>
            `;
    filePreview.appendChild(fileItem);
}

function removeFile(fileName) {
    selectedFiles = selectedFiles.filter(file => file.name !== fileName);
    updateFilePreview();
}

function updateFilePreview() {
    filePreview.innerHTML = '';
    selectedFiles.forEach(file => addFilePreview(file));
}

function sendQuickMessage(message) {
    messageInput.value = message;
    sendMessage();
}
function showTypingIndicator() {
    typingIndicator.style.display = 'flex';
}

function hideTypingIndicator() {
    typingIndicator.style.display = 'none';
}

function sendAnimation() {
  const btn = document.querySelector('.send-btn');
  const icon = btn.querySelector('i');

  btn.classList.add('fly');

  // particles
  for (let i = 0; i < 8; i++) {
    const p = document.createElement('span');
    p.classList.add('particle');

    p.style.setProperty('--x', `${Math.random() * 60 - 30}px`);
    p.style.setProperty('--y', `${Math.random() * 60 - 30}px`);

    btn.appendChild(p);

    setTimeout(() => p.remove(), 600);
  }

  setTimeout(() => {
    btn.classList.remove('fly');
    icon.style.opacity = 1;
    icon.style.transform = 'none';
  }, 900);
}
function sendMessage() {
    const message = messageInput.value.trim();
    const contentType = document.getElementById('contentType').value;

    if (!message && selectedFiles.length === 0) return;

    addMessage('user', message, selectedFiles);

    messageInput.value = '';
    messageInput.style.height = 'auto';
    selectedFiles = [];
    updateFilePreview();

    showTypingIndicator();

    setTimeout(() => {
        hideTypingIndicator();
        const response = generateBotResponse(message, contentType);
        addMessage('bot', response);
        addToRecentAnalyses(contentType, response);
    }, 2000);
}

function addMessage(sender, text, files = []) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    let filesHtml = '';
    if (files.length > 0) {
        filesHtml = `<div class="mt-2">
                    ${files.map(file => `<small class="d-block"><i class="fas fa-file"></i> ${file.name}</small>`).join('')}
                </div>`;
    }

    messageDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-${sender === 'user' ? 'user' : 'robot'}"></i>
                </div>
                <div class="message-content">
                    ${text}
                    ${filesHtml}
                </div>
            `;

    chatMessages.insertBefore(messageDiv, typingIndicator);
    scrollToBottom();
}

function showTypingIndicator() {
    typingIndicator.style.display = 'flex';
    scrollToBottom();
}

function hideTypingIndicator() {
    typingIndicator.style.display = 'none';
}

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateBotResponse(message, contentType) {
    const phishingIndicators = [
        'urgent', 'عاجل', 'فوري', 'click here', 'اضغط هنا', 'limited time', 'وقت محدود',
        'verify account', 'تأكيد الحساب', 'suspended', 'معلق', 'winner', 'فائز',
        'congratulations', 'مبروك', 'free money', 'فلوس مجانية', 'bitcoin', 'بيتكوين'
    ];

    const suspiciousDomains = [
        '.tk', '.ml', '.ga', '.cf', 'bit.ly', 'tinyurl', 'ngrok.com'
    ];

    let indicatorCount = 0;

    phishingIndicators.forEach(indicator => {
        if (message.toLowerCase().includes(indicator.toLowerCase())) {
            indicatorCount++;
        }
    });

    suspiciousDomains.forEach(domain => {
        if (message.toLowerCase().includes(domain)) {
            indicatorCount += 2;
        }
    });

    let response = '';

    if (message.includes('نصائح') || message.includes('حماية')) {
        response = `إليك أهم النصائح للحماية من التصيد الإلكتروني:

🔒 تحقق دائماً من عنوان URL قبل إدخال معلوماتك
📧 لا تثق في الرسائل التي تطلب معلومات حساسة
🔍 ابحث عن الأخطاء الإملائية والنحوية
🛡️ استخدم المصادقة الثنائية عند الإمكان
📱 حدث برامجك ومتصفحك باستمرار`;
    } else if (indicatorCount >= 4) {
        response = `⚠️ تحذير: مستوى الخطر عالي!

تم اكتشاف عدة علامات تحذيرية في المحتوى الذي أرسلته. هذا المحتوى يحتوي على مؤشرات قوية لكونه محاولة تصيد إلكتروني.

التوصيات:
❌ لا تضغط على أي روابط
❌ لا تدخل أي معلومات شخصية
🗑️ احذف هذه الرسالة فوراً
📞 أبلغ عن هذا المحتوى للجهات المختصة`;
    } else if (indicatorCount >= 2) {
        response = `⚠️ تحذير: مستوى الخطر متوسط

تم اكتشاف بعض العلامات المشبوهة في المحتوى. يُنصح بالحذر الشديد.

التوصيات:
🔍 تحقق من مصدر الرسالة بعناية
❌ لا تدخل معلومات حساسة
📞 تواصل مع الجهة المرسلة مباشرة للتأكد
🔄 استخدم طرق تواصل بديلة للتحقق`;
    } else {
        response = `✅ مستوى الخطر منخفض

لم يتم اكتشاف علامات تحذيرية واضحة، لكن يُنصح دائماً بالحذر.

التوصيات:
🔍 تحقق من صحة المعلومات من مصادر موثوقة
⚠️ كن حذراً عند إدخال معلومات شخصية
🔒 تأكد من أمان الموقع قبل التفاعل معه`;
    }

    return response;
}

function addToRecentAnalyses(type, analysis) {
    const recentDiv = document.getElementById('recentAnalyses');
    const now = new Date().toLocaleString('ar-EG');

    let riskLevel = 'منخفض';
    let riskColor = 'success';

    if (analysis.includes('عالي')) {
        riskLevel = 'عالي';
        riskColor = 'danger';
    } else if (analysis.includes('متوسط')) {
        riskLevel = 'متوسط';
        riskColor = 'warning';
    }

    const analysisItem = `
        <div class="border-bottom pb-2 mb-2 recent-item">
            <span class="badge bg-${riskColor}">${riskLevel}</span>
            <small class="d-block text-muted">${type} - ${now}</small>
        </div>
    `;

    // Insert at top
    if (recentDiv.innerHTML.includes('لا توجد تحليلات سابقة')) {
        recentDiv.innerHTML = analysisItem;
    } else {
        recentDiv.innerHTML = analysisItem + recentDiv.innerHTML;
    }

    // Keep only last 3
    const items = recentDiv.querySelectorAll('.recent-item');
    if (items.length > 3) {
        for (let i = 3; i < items.length; i++) {
            items[i].remove();
        }
    }
}


document.addEventListener('DOMContentLoaded', function () {
    scrollToBottom();
});