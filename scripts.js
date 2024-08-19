// تبديل الوضع بين النهاري والليلي
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
});

// فتح وإغلاق الشريط الجانبي
document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
});

document.getElementById('close-btn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('open');
});

// جلب قائمة السور
const surahList = document.getElementById('surah-list');
fetch('https://api.alquran.cloud/v1/surah')
    .then(response => response.json())
    .then(data => {
        const surahs = data.data;
        surahList.innerHTML = ''; // مسح أي محتوى سابق
        surahs.forEach(surah => {
            const surahItem = document.createElement('div');
            surahItem.classList.add('surah-item');
            surahItem.innerHTML = `<a href="surah.html?number=${surah.number}">${surah.name}</a>`;
            surahList.appendChild(surahItem);
        });
    })
    .catch(error => console.error('Error fetching Surahs:', error));

// جلب الآيات عند زيارة صفحة السورة
const urlParams = new URLSearchParams(window.location.search);
const surahNumber = urlParams.get('number');
if (surahNumber) {
    const ayahContent = document.getElementById('ayah-content');
    const apiUrl = `https://api.alquran.cloud/v1/surah/${surahNumber}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const surah = data.data;
            const ayahs = surah.ayahs;
            ayahContent.innerHTML = `<h2>${surah.name}</h2>`;
            ayahs.forEach(ayah => {
                const ayahItem = document.createElement('div');
                ayahItem.classList.add('ayah-item');
                ayahItem.innerHTML = `
                    <p>${ayah.text}</p>
                    <button class="favorite-btn" onclick="addToFavorites(${surahNumber}, ${ayah.number})">
                        <i class="fas fa-star"></i> إضافة إلى المفضلة
                    </button>
                    <button class="remove-favorite-btn" onclick="removeFromFavorites(${surahNumber}, ${ayah.number})">
                        <i class="fas fa-trash"></i> إزالة من المفضلة
                    </button>
                `;
                ayahContent.appendChild(ayahItem);
            });
        })
        .catch(error => console.error('Error fetching Ayahs:', error));
}

// إضافة الآية إلى المفضلة
function addToFavorites(surahNumber, ayahNumber) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push({ surahNumber, ayahNumber });
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('تمت إضافة الآية إلى المفضلة');
}

// إزالة الآية من المفضلة
function removeFromFavorites(surahNumber, ayahNumber) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(fav => !(fav.surahNumber === surahNumber && fav.ayahNumber === ayahNumber));
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('تمت إزالة الآية من المفضلة');
}

// تسجيل الدخول
document.getElementById('login-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // تحقق من صحة بيانات تسجيل الدخول
    if (username && password) {
        // هنا يجب إضافة كود التحقق الفعلي من المستخدم
        alert('تم تسجيل الدخول بنجاح');
        window.location.href = 'index.html'; // الانتقال إلى الصفحة الرئيسية بعد تسجيل الدخول
    } else {
        alert('يرجى ملء جميع الحقول');
    }
});

// إنشاء حساب
document.getElementById('register-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    // تحقق من صحة بيانات التسجيل
    if (username && password) {
        // هنا يجب إضافة كود التسجيل الفعلي
        alert('تم إنشاء الحساب بنجاح');
        window.location.href = 'login.html'; // الانتقال إلى صفحة تسجيل الدخول بعد التسجيل
    } else {
        alert('يرجى ملء جميع الحقول');
    }
});
