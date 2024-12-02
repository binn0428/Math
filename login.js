// 添加在文件開頭
let lastLoginCheck = 0;
const CHECK_INTERVAL = 1000; // 每秒檢查一次

// 模擬用戶數據庫
const defaultUsers = {
    'binn0428': { password: '122232', activeLogins: 0 },
    'vic': { password: '1070320', activeLogins: 0 },
    'yoyo': { password: '1031004', activeLogins: 0 },
    'newuser': { password: 'newpass', activeLogins: 0 }
};

// 初始化用戶數據
function initUsers() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
}

// 檢查登入狀態
function checkLoginStatus() {
    initUsers();
    const currentTime = Date.now();
    
    // 如果距離上次檢查不到 1 秒，則跳過
    if (currentTime - lastLoginCheck < CHECK_INTERVAL) {
        return;
    }
    lastLoginCheck = currentTime;

    const currentPage = window.location.pathname.split('/').pop();
    const loginStatus = sessionStorage.getItem('loginStatus');
    const username = sessionStorage.getItem('username');
    
    // 如果已登入，檢查 activeLogins 狀態
    if (loginStatus === 'true' && username) {
        const users = JSON.parse(localStorage.getItem('users'));
        if (!users[username] || users[username].activeLogins === 0) {
            // 如果登入狀態已被其他視窗清除，則登出
            sessionStorage.removeItem('loginStatus');
            sessionStorage.removeItem('username');
            window.location.href = 'login.html';
            return;
        }
    }
    
    // 原有的頁面跳轉邏輯
    if (currentPage === 'login.html' && loginStatus === 'true') {
        window.location.href = 'index.html';
        return;
    }
    
    if (currentPage !== 'login.html' && loginStatus !== 'true') {
        window.location.href = 'login.html';
        return;
    }
}

// 添加定期檢查
setInterval(checkLoginStatus, CHECK_INTERVAL);

// 登入函數
function login() {
    initUsers(); // 確保用戶數據已初始化
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // 從 localStorage 獲取最新的用戶數據
    const users = JSON.parse(localStorage.getItem('users'));
    
    // 檢查用戶是否存在
    if (users[username]) {
        // 檢查密碼是否正確
        if (users[username].password === password) {
            // 檢查登入人數限制
            if (users[username].activeLogins < 1) {
                users[username].activeLogins = 1;
                localStorage.setItem('users', JSON.stringify(users));
                sessionStorage.setItem('loginStatus', 'true');
                sessionStorage.setItem('username', username);
                lastLoginCheck = Date.now(); // 更新最後檢查時間
                window.location.href = 'index.html';
            } else {
                showError('此帳號已達到同時登入人數上限');
            }
        } else {
            showError('密碼錯誤');
        }
    } else {
        showError('帳號不存在');
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
    sessionStorage.removeItem('loginStatus');
    sessionStorage.removeItem('username');
    window.location.href = 'login.html';
}

// 在頁面載入時初始化
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