// login function
const API_URL = "https://script.google.com/macros/s/AKfycby1b1tNb0uYXzlVytxiSPdvhj_AsX9xZhodbJg3f45CQs_oSR7Yv4XM4D7U_FKkotDU/exec";

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const url = `${API_URL}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log("DATA:", data);

      if (data.success) {
        localStorage.setItem("users", JSON.stringify(data));
        window.location.href = "pages/dashboard.html";
      } else {
        document.getElementById("msg").innerText = data.message;
      }
    })
    .catch(err => {
      console.error(err);
      document.getElementById("msg").innerText = "Gagal koneksi API";
    });
}