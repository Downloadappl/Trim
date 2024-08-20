document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // مثال بسيط للتحقق من تسجيل الدخول (يجب استبداله بمصادقة حقيقية)
    localStorage.setItem('loggedIn', true);
    window.location.href = "index.html";
});

// التوجيه إذا كان المستخدم مسجل دخوله بالفعل
if (localStorage.getItem('loggedIn')) {
    window.location.href = "index.html";
}
