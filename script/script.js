// ================= AUTH CHECK =================
const user = JSON.parse(localStorage.getItem("users"));

if (!user || !user.success) {
  // belum login → balik ke halaman login
  window.location.href = "../index.html";
}

// ================= ON LOAD =================
document.addEventListener("DOMContentLoaded", () => {

  // ===== HEADER =====
  document.getElementById("username").innerText = user.nama;

  // ===== PROFILE =====
  document.getElementById("profileName").innerText = user.nama;
  document.getElementById("profileEmail").innerText = `Email: ${user.email}`;
  document.getElementById("profileRole").innerText = `Role: ${user.role}`;

  // ===== DATETIME (SEKALI SAJA) =====
  document.getElementById("datetime").innerText =
    new Date().toLocaleString();

  // default view
  showHome();
});

// ================= NAV =================
function showHome() {
  document.getElementById("homeSection").style.display = "flex";
  document.getElementById("profileSection").style.display = "none";

  document.querySelectorAll(".nav li").forEach(li => li.classList.remove("active"));
  document.querySelector(".nav li:nth-child(1)").classList.add("active");
}

function showProfile() {
  document.getElementById("homeSection").style.display = "none";
  document.getElementById("profileSection").style.display = "block";

  document.querySelectorAll(".nav li").forEach(li => li.classList.remove("active"));
  document.querySelector(".nav li:nth-child(2)").classList.add("active");
}

// ================= LOGOUT =================
function logout() {
  localStorage.removeItem("users");
  window.location.href = "../index.html";
}


const API_URL = "https://script.google.com/macros/s/AKfycbzDT86qsYj3cg9oiiFb1wjh2gOG8NcFVWol2YeZnA9PgPjA_4ysOujo7BM190PFZ2xT/exec";

const btnCheckIn = document.getElementById("btnCheckIn");
const btnCheckOut = document.getElementById("btnCheckOut");
const users = JSON.parse(localStorage.getItem("users"));

// pastikan user login
if (!users) {
  alert("Silahkan login dulu!");
  window.location.href = "../index.html";
}

// ================== Check In ==================
btnCheckIn.addEventListener("click", () => {
  if (!users) return;

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: users.email, nama: users.nama, action: "checkin" })
  })
    .then(res => res.json())
    .then(data => {
      console.log("Check-in response:", data);
      alert(data.message);
      if (data.success) btnCheckIn.disabled = true;
    })
    .catch(err => {
      console.error("Check-in error:", err);
      alert("Gagal koneksi API");
    });
});

// ================== Check Out ==================
btnCheckOut.addEventListener("click", () => {
  if (!users) return;

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: users.email, nama: users.nama, action: "checkout" })
  })
    .then(res => res.json())
    .then(data => {
      console.log("Check-out response:", data);
      alert(data.message);
      if (data.success) btnCheckOut.disabled = true;
    })
    .catch(err => {
      console.error("Check-out error:", err);
      alert("Gagal koneksi API");
    });
});
