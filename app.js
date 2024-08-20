document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
});

// جلب أسماء السور (استبدل `API_URL` بالرابط الحقيقي للـ API)
fetch('API_URL_FOR_SURAH_NAMES')
    .then(response => response.json())
    .then(data => {
        const surahList = document.getElementById('surah-list');
        data.forEach(surah => {
            const surahItem = document.createElement('div');
            surahItem.classList.add('surah-item');
            surahItem.innerHTML = `
                <h3>${surah.name}</h3>
                <button class="favorite-btn"><i class="fas fa-star"></i></button>
            `;
            surahList.appendChild(surahItem);
        });
    });

// التحقق إذا كان المستخدم مسجل دخوله
if (!localStorage.getItem('loggedIn')) {
    window.location.href = "login.html";
}
