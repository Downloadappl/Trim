// لتبديل الوضع بين الليلي والنهاري
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
});

// جلب آية باستخدام API
const surahNumber = 1; // رقم السورة (يمكن تغييره)
const ayahNumber = 1;  // رقم الآية (يمكن تغييره)

const apiUrl = `https://api.alquran.cloud/v1/ayah/${surahNumber}:${ayahNumber}/ar.alafasy`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const ayahText = data.data.text;
        document.getElementById('ayah').textContent = ayahText;
    })
    .catch(error => console.error('حدث خطأ أثناء جلب البيانات القرآنية:', error));
