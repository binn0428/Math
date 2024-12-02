// 模擬用戶數據庫
const users = {
    'teacher1': { password: 'pass123', activeLogins: 0 },
    'teacher2': { password: 'pass456', activeLogins: 0 }
};

// 檢查登入狀態
function checkLoginStatus() {
    const loginStatus = sessionStorage.getItem('loginStatus');
    if (loginStatus === 'true') {
        window.location.href = 'index.html';
    }
}

// 登入函數
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    // 檢查用戶是否存在
    if (users[username]) {
        // 檢查密碼是否正確
        if (users[username].password === password) {
            // 檢查登入人數限制
            if (users[username].activeLogins < 2) {
                users[username].activeLogins++;
                sessionStorage.setItem('loginStatus', 'true');
                sessionStorage.setItem('username', username);
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
    if (username && users[username]) {
        users[username].activeLogins--;
    }
    sessionStorage.removeItem('loginStatus');
    sessionStorage.removeItem('username');
    window.location.href = 'login.html';
}

// 頁面載入時檢查登入狀態
window.onload = checkLoginStatus;

// 監聽視窗關閉事件
window.onbeforeunload = function() {
    const username = sessionStorage.getItem('username');
    if (username && users[username]) {
        users[username].activeLogins--;
    }
}; 