document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('toggle-theme');
    const loginForm = document.getElementById('login-form');
    
    const applyTheme = (theme) => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    };

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.className;
        const newTheme = currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
        applyTheme(newTheme);
    });

    if (localStorage.getItem('theme')) {
        applyTheme(localStorage.getItem('theme'));
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            localStorage.setItem('loggedIn', true);
            window.location.href = 'index.html';
        });
    }

    if (localStorage.getItem('loggedIn')) {
        if (window.location.pathname.includes('login.html')) {
            window.location.href = 'index.html';
        }
    }

    const loadSurahs = () => {
        fetch('https://api.alquran.cloud/v1/surah')
            .then(response => response.json())
            .then(data => {
                const surahList = document.getElementById('surah-list');
                surahList.innerHTML = '';
                data.data.forEach(surah => {
                    const li = document.createElement('li');
                    li.innerText = `${surah.number}. ${surah.englishName} - ${surah.name}`;
                    const favBtn = document.createElement('button');
                    favBtn.innerText = 'إضافة للمفضلة';
                    favBtn.onclick = () => addToFavorites(surah);
                    li.appendChild(favBtn);
                    surahList.appendChild(li);
                });
            });
    };

    const addToFavorites = (surah) => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites.push(surah);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    };

    const loadFavorites = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const favList = document.getElementById('favorites-list');
        favList.innerHTML = '';
        favorites.forEach(surah => {
            const li = document.createElement('li');
            li.innerText = `${surah.number}. ${surah.englishName} - ${surah.name}`;
            favList.appendChild(li);
        });
    };

    if (document.getElementById('surah-list')) {
        loadSurahs();
    }

    if (document.getElementById('favorites-list')) {
        loadFavorites();
    }
});

function goBack() {
    window.history.back();
}
