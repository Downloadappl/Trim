// تبديل الوضع الليلي والنهاري
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    const icon = document.getElementById('theme-toggle').querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-sun', 'fa-moon');
    } else {
        icon.classList.replace('fa-moon', 'fa-sun');
    }
});

// التعامل مع قائمة التنقل الجانبية
document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
});

document.getElementById('close-btn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('open');
});

// التعامل مع تسجيل الدخول
document.getElementById('login-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // تحقق من بيانات تسجيل الدخول هنا
    if (username && password) {
        localStorage.setItem('loggedIn', 'true');
        document.getElementById('login-btn').style.display = 'none';
        window.location.href = 'index.html';
    }
});

// التعامل مع تسجيل الخروج
document.getElementById('register-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password === confirmPassword) {
        // أضف هنا منطق تسجيل المستخدم الجديد
        alert('تم تسجيل الحساب بنجاح!');
        window.location.href = 'login.html';
    } else {
        alert('كلمات المرور غير متطابقة.');
    }
});

// إضافة إلى المفضلة
function addToFavorites(surahNumber, ayahNumber) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const newFavorite = { surahNumber, ayahNumber };

    if (!favorites.some(fav => fav.surahNumber === surahNumber && fav.ayahNumber === ayahNumber)) {
        favorites.push(newFavorite);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('تم إضافة الآية إلى المفضلة.');
    } else {
        alert('الآية موجودة بالفعل في المفضلة.');
    }
}

// إزالة من المفضلة
function removeFromFavorites(surahNumber, ayahNumber) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(fav => !(fav.surahNumber === surahNumber && fav.ayahNumber === ayahNumber));
    localStorage.setItem('favorites', JSON.stringify(favorites));
    location.reload(); // إعادة تحميل الصفحة لتحديث العرض
}

// التحقق من تسجيل الدخول وتوجيه المستخدم
window.addEventListener('load', () => {
    if (document.getElementById('login-form')) {
        if (localStorage.getItem('loggedIn') === 'true') {
            document.getElementById('login-btn').style.display = 'none';
            window.location.href = 'index.html';
        }
    }
});
