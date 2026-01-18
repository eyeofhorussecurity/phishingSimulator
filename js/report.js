document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('reportForm');
    const maxFiles = 5;
    const maxSize = 10 * 1024 * 1024; // 10 MB

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const threatTypeElem = document.getElementById('threatType');
            const descriptionElem = document.getElementById('reportDescription');
            const consentElem = document.getElementById('consentCheck');
            const reportSuccessElem = document.getElementById('reportSuccess');

            const threatType = threatTypeElem ? threatTypeElem.value.trim() : '';
            const description = descriptionElem ? descriptionElem.value.trim() : '';
            const consent = consentElem ? consentElem.checked : false;

            if (threatType && description && consent) {
                if (reportSuccessElem) reportSuccessElem.style.display = 'block';

                this.reset();

                if (reportSuccessElem) {
                    reportSuccessElem.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });

                    setTimeout(() => {
                        reportSuccessElem.style.display = 'none';
                    }, 10000);
                }
            } else {
                // Provide simple feedback if required fields are missing
                if (!threatType || !description) {
                    alert('يرجى ملء نوع التهديد والوصف قبل الإرسال.');
                } else if (!consentElem || !consent) {
                    alert('يرجى الموافقة على الشروط للمتابعة.');
                }
            }
        });
    }

    const evidenceInput = document.getElementById('evidenceFiles');
    if (evidenceInput) {
        evidenceInput.addEventListener('change', function (e) {
            const files = e.target.files || [];

            if (files.length > maxFiles) {
                alert(`يمكنك إرفاق حتى ${maxFiles} ملفات فقط`);
                this.value = '';
                return;
            }

            for (let file of files) {
                if (file.size > maxSize) {
                    alert(`حجم الملف ${file.name} كبير جداً. الحد الأقصى 10 ميجا`);
                    this.value = '';
                    return;
                }
            }
        });
    }

    const threatTypeElem = document.getElementById('threatType');
    if (threatTypeElem) {
        threatTypeElem.addEventListener('change', function () {
            const impactLevel = document.getElementById('impactLevel');
            const value = this.value;

            if (!impactLevel) return;

            if (value === 'phishing-website' || value === 'fake-app') {
                impactLevel.value = 'high';
            } else if (value === 'fake-email' || value === 'sms-scam') {
                impactLevel.value = 'medium';
            } else if (value === 'social-scam') {
                impactLevel.value = 'low';
            } else {
                impactLevel.value = '';
            }
        });
    }
});