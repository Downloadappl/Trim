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
                <a href="surah.html?number=${surah.number}" class="view-ayahs"><i class="fas fa-book-open"></i> عرض الآيات</a>
            `;
            surahListContainer.appendChild(surahItem);
        });
    })
    .catch(error => console.error('Error fetching Surahs:', error));
