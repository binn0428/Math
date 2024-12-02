// 模擬用戶數據庫
const users = {
    'binn0428': { password: '122232', activeLogins: 0 },
    'vic': { password: '1070320', activeLogins: 0 },
    'yoyo': { password: '1031004', activeLogins: 0 }
};

// 檢查登入狀態
function checkLoginStatus() {
    const currentPage = window.location.pathname.split('/').pop();
    const loginStatus = sessionStorage.getItem('loginStatus');
    
    // 如果在登入頁面且已登入，跳轉到主頁
    if (currentPage === 'login.html' && loginStatus === 'true') {
        window.location.href = 'index.html';
        return;
    }
    
    // 如果不在登入頁面且未登入，跳轉到登入頁
    if (currentPage !== 'login.html' && loginStatus !== 'true') {
        window.location.href = 'login.html';
        return;
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

// 在每個頁面載入時檢查登入狀態
window.onload = function() {
    checkLoginStatus();
    // 如果有其他 onload 事件，也要在這裡調用
};

// 監聽視窗關閉事件
window.onbeforeunload = function() {
    const username = sessionStorage.getItem('username');
    if (username && users[username]) {
        users[username].activeLogins--;
    }
}; 