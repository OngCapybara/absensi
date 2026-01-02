// login function

const API_URL = "https://script.google.com/macros/s/AKfycbzDT86qsYj3cg9oiiFb1wjh2gOG8NcFVWol2YeZnA9PgPjA_4ysOujo7BM190PFZ2xT/exec";

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