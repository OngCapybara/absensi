// ================= AUTH CHECK =================
const user = JSON.parse(localStorage.getItem("users"));

if (!user || !user.success) {
  window.location.href = "../index.html";
}


// ================= ON LOAD =================
document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("username").innerText = user.nama;

  document.getElementById("profileName").innerText = user.nama;
  document.getElementById("profileEmail").innerText = `Email: ${user.email}`;
  document.getElementById("profileRole").innerText = `Role: ${user.role}`;

  document.getElementById("datetime").innerText =
    new Date().toLocaleString();

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


const API_URL = "https://script.google.com/macros/s/AKfycby1b1tNb0uYXzlVytxiSPdvhj_AsX9xZhodbJg3f45CQs_oSR7Yv4XM4D7U_FKkotDU/exec";

const btnCheckIn = document.getElementById("btnCheckIn");
const btnCheckOut = document.getElementById("btnCheckOut");
const users = JSON.parse(localStorage.getItem("users"));

if (!users) {
  alert("Silahkan login dulu!");
  window.location.href = "../index.html";
}


// ================== Check In ==================
btnCheckIn.addEventListener("click", () => {
    if (!users) return;
    processAttendance("checkin", btnCheckIn);
});


// ================== Check Out ==================
btnCheckOut.addEventListener("click", () => {
    if (!users) return;
    processAttendance("checkout", btnCheckOut);
});


// Fungsi Global untuk memproses API
function processAttendance(type, button) {
    const originalText = button.innerText;
    button.innerText = "Processing...";
    button.disabled = true;

    fetch(API_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            email: users.email,
            nama: users.nama,
            action: type
        })
    })
    .then(() => {
        alert(`${type.toUpperCase()} Berhasil terkirim!`);
        button.innerText = originalText;
        button.style.backgroundColor = "#ccc";
    })
    .catch(err => {
        console.error("Error:", err);
        alert("Terjadi kesalahan koneksi");
        button.disabled = false;
        button.innerText = originalText;
    });
}