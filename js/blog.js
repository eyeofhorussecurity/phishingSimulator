document.getElementById('newPostForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('postTitle').value;
    const category = document.getElementById('postCategory').value;
    const content = document.getElementById('postContent').value;
    const url = document.getElementById('postUrl').value;

    if (title && category && content) {
        addNewPost(title, category, content, url);
        this.reset();
        alert('تم نشر التحذير بنجاح! شكراً لك على مساعدة الآخرين.');
    }
});

function addNewPost(title, category, content, url) {
    const categoryNames = {
        'email': 'رسائل إيميل مزيفة',
        'sms': 'رسائل نصية احتيالية',
        'social': 'منشورات مواقع التواصل',
        'website': 'مواقع مزيفة',
        'app': 'تطبيقات مشبوهة',
        'other': 'أخرى'
    };

    const categoryColors = {
        'email': 'danger',
        'sms': 'warning',
        'social': 'info',
        'website': 'primary',
        'app': 'success',
        'other': 'secondary'
    };

    const postHtml = `
        <div class="card shadow-sm mb-4 post-item" data-category="${category}">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <div class="d-flex align-items-center gap-2">
                        <div class="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                            <i class="fas fa-user"></i>
                        </div>
                        <div>
                            <h6 class="mb-0">مستخدم جديد</h6>
                            <small class="text-muted">الآن</small>
                        </div>
                    </div>
                    <span class="badge bg-${categoryColors[category]}">${categoryNames[category]}</span>
                </div>
                
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${content}</p>
                
                ${url ? `
                    <div class="alert alert-warning small">
                        <i class="fas fa-exclamation-triangle"></i>
                        <strong>الرابط المشبوه:</strong> ${url.replace('https://', '').replace('http://', '')}
                    </div>
                ` : ''}
                
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-success">
                            <i class="fas fa-thumbs-up"></i> مفيد (0)
                        </button>
                        <button class="btn btn-outline-primary">
                            <i class="fas fa-share"></i> مشاركة
                        </button>
                    </div>
                    <small class="text-muted">
                        <i class="fas fa-eye"></i> 1 مشاهدة
                    </small>
                </div>
            </div>
        </div>
    `;

    const postsContainer = document.getElementById('postsContainer');
    postsContainer.insertAdjacentHTML('afterbegin', postHtml);
}

document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', function () {
        const filter = this.getAttribute('data-filter');

        document.querySelectorAll('[data-filter]').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const posts = document.querySelectorAll('.post-item');
        let visibleCount = 0;

        posts.forEach(post => {
            if (filter === 'all' || post.getAttribute('data-category') === filter) {
                post.style.display = 'block';
                visibleCount++;
            } else {
                post.style.display = 'none';
            }
        });

        const noPostsMessage = document.getElementById('noPostsMessage');
        if (visibleCount === 0) {
            noPostsMessage.style.display = 'block';
        } else {
            noPostsMessage.style.display = 'none';
        }
    });
});

document.addEventListener('click', function (e) {
    if (e.target.closest('.btn-outline-success')) {
        const button = e.target.closest('.btn-outline-success');
        const currentText = button.innerHTML;
        const currentCount = parseInt(currentText.match(/\d+/)[0]);
        const newCount = currentCount + 1;

        button.innerHTML = currentText.replace(/\d+/, newCount);
        button.classList.remove('btn-outline-success');
        button.classList.add('btn-success');
    }
});
