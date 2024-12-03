// 添加在文件開頭
let lastLoginCheck = 0;
const CHECK_INTERVAL = 1000; // 每5秒檢查一次

// 模擬用戶數據庫
const defaultUsers = {
    'binn0428': { password: '122232', activeLogins: 0, maxLogins: 1 },
    'vic': { password: '1070320', activeLogins: 0, maxLogins: 1 },
    'yoyo': { password: '1031004', activeLogins: 0, maxLogins: 1 },
    'newuser': { password: 'newpass', activeLogins: 0, maxLogins: 1 }
};

// 初始化用戶數據
function initUsers() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
}

// 檢查登入狀態
function checkLoginStatus() {
    const currentPage = window.location.pathname.split('/').pop();
    const loginStatus = sessionStorage.getItem('loginStatus');
    const username = sessionStorage.getItem('username');
    
    if (username) {
        const users = JSON.parse(localStorage.getItem('users'));
        if (users && users[username]) {
            if (loginStatus === 'true' && users[username].activeLogins === 0) {
                users[username].activeLogins = 1;
                localStorage.setItem('users', JSON.stringify(users));
            }
        }
    }
    
    if (currentPage === 'login.html' && loginStatus === 'true') {
        window.location.href = 'index.html';
    } else if (currentPage !== 'login.html' && loginStatus !== 'true') {
        window.location.href = 'login.html';
    }
}

// 登入函數
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users')) || defaultUsers;
    
    if (!username || !password) {
        showError('請輸入帳號和密碼');
        return;
    }
    
    if (users[username] && users[username].password === password) {
        if (users[username].activeLogins < users[username].maxLogins) {
            users[username].activeLogins += 1;
            localStorage.setItem('users', JSON.stringify(users));
            sessionStorage.setItem('loginStatus', 'true');
            sessionStorage.setItem('username', username);
            window.location.href = 'index.html';
        } else {
            showError('此帳號已在其他裝置登入中');
        }
    } else {
        showError('帳號或密碼錯誤');
    }
}

// 顯示錯誤訊息
function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// 登出函數
function logout() {
    const username = sessionStorage.getItem('username');
    if (username) {
        const users = JSON.parse(localStorage.getItem('users'));
        if (users[username]) {
            users[username].activeLogins = 0;
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
    sessionStorage.clear();
    window.location.href = 'login.html';
}

// 頁面載入時初始化
window.onload = function() {
    initUsers();
    checkLoginStatus();
};

// 監聽視窗關閉事件
window.onbeforeunload = function() {
    const username = sessionStorage.getItem('username');
    if (username) {
        const users = JSON.parse(localStorage.getItem('users'));
        if (users[username]) {
            users[username].activeLogins = 0;
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
}; 