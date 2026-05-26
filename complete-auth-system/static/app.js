let authMode = 'login'; // 'login' or 'signup'
let pendingVerifyEmail = ''; // Stores active email during OTP states
let pendingVerifyType = ''; // 'activation' or '2fa'
let otpTimerInterval = null;

const API_BASE = '/api';

// =====================================================================
// UTILS & TOASTS
// =====================================================================

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
  `;

  container.appendChild(toast);

  // Auto remove after 4 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// =====================================================================
// TABS & AUTH SWITCHER
// =====================================================================

function toggleAuthMode(mode) {
  authMode = mode;
  const tabLogin = document.getElementById('tab-login');
  const tabSignup = document.getElementById('tab-signup');
  const formLogin = document.getElementById('login-form');
  const formSignup = document.getElementById('signup-form');
  
  // Hide OTP container if active
  document.getElementById('otp-container').style.display = 'none';
  document.getElementById('credentials-box').style.display = 'block';

  if (mode === 'login') {
    tabLogin.classList.add('active');
    tabSignup.classList.remove('active');
    formLogin.style.display = 'flex';
    formSignup.style.display = 'none';
  } else {
    tabSignup.classList.add('active');
    tabLogin.classList.remove('active');
    formSignup.style.display = 'flex';
    formLogin.style.display = 'none';
  }
}

// =====================================================================
// OTP TIMER COUNTDOWN
// =====================================================================

function startOtpTimer(durationSeconds) {
  clearInterval(otpTimerInterval);
  const timerText = document.getElementById('timer-text');
  let remaining = durationSeconds;

  function updateTimer() {
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    const paddedSeconds = seconds < 10 ? '0' + seconds : seconds;
    timerText.textContent = `Code expires in ${minutes}:${paddedSeconds}`;
    
    if (remaining <= 0) {
      clearInterval(otpTimerInterval);
      timerText.textContent = "Code expired. Please request a new one.";
      timerText.style.color = "var(--red)";
      showToast("Verification code has expired. Please try again.", "danger");
    }
    remaining--;
  }

  timerText.style.color = "var(--text-dim)";
  updateTimer();
  otpTimerInterval = setInterval(updateTimer, 1000);
}

function cancelOtpFlow() {
  clearInterval(otpTimerInterval);
  document.getElementById('otp-container').style.display = 'none';
  document.getElementById('otp-code').value = '';
  
  if (authMode === 'login') {
    document.getElementById('login-form').style.display = 'flex';
  } else {
    document.getElementById('signup-form').style.display = 'flex';
  }
  document.getElementById('credentials-box').style.display = 'block';
  document.getElementById('auth-tabs').style.display = 'flex';
}

// =====================================================================
// API COMMUNICATION HANDLERS
// =====================================================================

// Step 1: User Registration
async function handleSignup(event) {
  event.preventDefault();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const btn = document.getElementById('btn-signup-submit');

  if (!email || !password) {
    showToast("Please enter email and password.", "warning");
    return;
  }

  btn.disabled = true;
  btn.textContent = "REGISTERING...";

  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to register.");
    }

    showToast(data.message, "success");
    
    // Switch signup view to OTP step
    pendingVerifyEmail = email;
    pendingVerifyType = 'activation';
    
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('auth-tabs').style.display = 'none';
    document.getElementById('credentials-box').style.display = 'none';
    
    document.getElementById('otp-container').style.display = 'block';
    document.getElementById('otp-title').textContent = "Confirm Registration";
    document.getElementById('otp-subtitle').innerHTML = `We sent an activation code to <strong>${email}</strong>. Check your console logs if SMTP is offline.`;
    document.getElementById('otp-code').value = '';
    
    startOtpTimer(600); // 10 minutes
  } catch (error) {
    showToast(error.message, "danger");
  } finally {
    btn.disabled = false;
    btn.textContent = "CREATE ACCOUNT";
  }
}

// Step 2: Login Credentials verification
async function handleLoginStep1(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const btn = document.getElementById('btn-login-submit');

  if (!email || !password) {
    showToast("Please enter email and password.", "warning");
    return;
  }

  btn.disabled = true;
  btn.textContent = "VERIFYING...";

  try {
    const response = await fetch(`${API_BASE}/auth/login-step1`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Login credentials failed.");
    }

    showToast(data.message, "success");
    
    // Load 2FA OTP prompt overlay
    pendingVerifyEmail = email;
    pendingVerifyType = '2fa';
    
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('auth-tabs').style.display = 'none';
    document.getElementById('credentials-box').style.display = 'none';
    
    document.getElementById('otp-container').style.display = 'block';
    document.getElementById('otp-title').textContent = "Two-Factor Verification (2FA)";
    document.getElementById('otp-subtitle').innerHTML = `A security code has been sent to <strong>${email}</strong>. Check your console logs if SMTP is offline.`;
    document.getElementById('otp-code').value = '';
    
    startOtpTimer(600); // 10 minutes
  } catch (error) {
    showToast(error.message, "danger");
  } finally {
    btn.disabled = false;
    btn.textContent = "CONTINUE ACCESS";
  }
}

// Step 3: OTP Code Validation (Activation or Login 2FA)
async function handleOtpVerification(event) {
  event.preventDefault();
  const code = document.getElementById('otp-code').value.trim();
  const btn = document.getElementById('btn-otp-submit');

  if (!code || code.length !== 6) {
    showToast("Please enter the 6-digit verification code.", "warning");
    return;
  }

  btn.disabled = true;
  btn.textContent = "VERIFYING...";

  const endpoint = pendingVerifyType === 'activation' 
    ? `${API_BASE}/auth/verify-registration` 
    : `${API_BASE}/auth/login-step2`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: pendingVerifyEmail, code })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "OTP verification failed.");
    }

    showToast(data.message, "success");
    clearInterval(otpTimerInterval);
    
    if (pendingVerifyType === 'activation') {
      // Activation complete, redirect to login tab
      toggleAuthMode('login');
      document.getElementById('login-email').value = pendingVerifyEmail;
      document.getElementById('login-password').value = '';
    } else {
      // Login complete, load session dashboard
      checkSessionState();
    }
  } catch (error) {
    showToast(error.message, "danger");
  } finally {
    btn.disabled = false;
    btn.textContent = "CONFIRM";
  }
}

// =====================================================================
// SESSION STATE CHECK & PROTECTED DATA ACQUISITION
// =====================================================================

async function checkSessionState() {
  try {
    const response = await fetch(`${API_BASE}/user/profile`);
    if (!response.ok) {
      throw new Error("Unauthorized session.");
    }

    const data = await response.json();
    const user = data.user;

    // Show Dashboard, Hide Auth Card
    document.getElementById('auth-card').style.display = 'none';
    document.getElementById('workspace').style.display = 'block';
    
    // Populate header details
    document.getElementById('user-email-display').textContent = user.email;
    const roleBadge = document.getElementById('user-role-badge');
    roleBadge.textContent = user.role;
    roleBadge.className = 'badge ' + (user.role === 'admin' ? 'badge-bis' : '');

    // If role is admin, trigger admin data acquisition
    if (user.role === 'admin') {
      loadAdminDashboard();
    } else {
      document.getElementById('admin-panel').style.display = 'none';
    }
  } catch (error) {
    // Show login panel
    document.getElementById('auth-card').style.display = 'block';
    document.getElementById('workspace').style.display = 'none';
  }
}

async function loadAdminDashboard() {
  try {
    const response = await fetch(`${API_BASE}/admin/dashboard`);
    if (!response.ok) {
      throw new Error("Failed to load admin workspace stats.");
    }

    const data = await response.json();
    const stats = data.stats;

    document.getElementById('admin-panel').style.display = 'block';
    document.getElementById('stat-total-users').textContent = stats.total_users;
    document.getElementById('stat-active-users').textContent = stats.active_users;
    document.getElementById('stat-admin-users').textContent = stats.admin_users;
  } catch (error) {
    showToast(error.message, "danger");
    document.getElementById('admin-panel').style.display = 'none';
  }
}

async function handleLogout() {
  try {
    const response = await fetch(`${API_BASE}/auth/logout`, { method: 'POST' });
    const data = await response.json();
    showToast(data.message, "success");
    
    // Reload page to purge memories and clear auth card states
    window.location.reload();
  } catch (error) {
    showToast("Logout failed.", "danger");
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  checkSessionState();
});
