document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    const icon = document.getElementById('theme-toggle').querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
});

// جلب أسماء السور
const surahListUrl = 'https://api.alquran.cloud/v1/surah';
const surahListContainer = document.getElementById('surah-list');

fetch(surahListUrl)
    .then(response => response.json())
    .then(data => {
        const surahs = data.data;
        surahListContainer.innerHTML = '<h2>فهرس السور</h2>';
        surahs.forEach(surah => {
            const surahItem = document.createElement('div');
            surahItem.classList.add('surah-item');
            surahItem.innerHTML = `
                <h3>${surah.name}</h3>
                <button onclick="showAyahs(${surah.number})">عرض الآيات</button>
            `;
            surahListContainer.appendChild(surahItem);
        });
    })
    .catch(error => console.error('Error fetching Surahs:', error));

// عرض الآيات بناءً على رقم السورة
function showAyahs(surahNumber) {
    const apiUrl = `https://api.alquran.cloud/v1/surah/${surahNumber}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const surah = data.data;
            const ayahs = surah.ayahs;
            const ayahContent = document.getElementById('ayah-content');
            ayahContent.innerHTML = `<h2>${surah.name}</h2>`;
            ayahs.forEach(ayah => {
                const ayahItem = document.createElement('p');
                ayahItem.innerHTML = `${ayah.text} <button onclick="addToFavorites(${surahNumber}, ${ayah.number})">إضافة للمفضلة</button>`;
                ayahContent.appendChild(ayahItem);
            });
        })
        .catch(error => console.error('Error fetching Ayahs:', error));
}

// إضافة آية إلى المفضلة
function addToFavorites(surahNumber, ayahNumber) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.find(fav => fav.surahNumber === surahNumber && fav.ayahNumber === ayahNumber)) {
        favorites.push({ surahNumber, ayahNumber });
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('تمت إضافة الآية إلى المفضلة');
    } else {
        alert('هذه الآية موجودة بالفعل في المفضلة');
    }
}

// عرض المفضلة
document.getElementById('favorites-link').addEventListener('click', () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesContainer = document.getElementById('quran-content');
    favoritesContainer.innerHTML = '<h1>المفضلة</h1>';
    
    favorites.forEach(fav => {
        const apiUrl = `https://api.alquran.cloud/v1/ayah/${fav.surahNumber}:${fav.ayahNumber}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const ayah = data.data;
                const favoriteItem = document.createElement('div');
                favoriteItem.innerHTML = `<p>${ayah.text} (سورة ${fav.surahNumber}, آية ${fav.ayahNumber})</p>`;
                favoritesContainer.appendChild(favoriteItem);
            })
            .catch(error => console.error('Error fetching Favorite Ayahs:', error));
    });
});
