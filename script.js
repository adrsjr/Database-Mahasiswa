let students = JSON.parse(localStorage.getItem("students")) || {};
let isAdmin = localStorage.getItem("admin") === "true";

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
    updateUI();
    renderTable();
});

/* LOGIN */
function openLogin() {
    loginModal.style.display = "flex";
}
function closeLogin() {
    loginModal.style.display = "none";
}
function login() {
    if (adminUser.value === "admin" && adminPass.value === "admin") {
        localStorage.setItem("admin", "true");
        isAdmin = true;
        closeLogin();
        updateUI();
        renderTable();
    } else {
        alert("Login gagal!");
    }
}
function logout() {
    localStorage.removeItem("admin");
    location.reload();
}

/* UI */
function updateUI() {
    adminForm.style.display = isAdmin ? "block" : "none";
    loginBtn.style.display = isAdmin ? "none" : "inline-block";
    logoutBtn.style.display = isAdmin ? "inline-block" : "none";
}

/* TABLE */
function renderTable(filter = "") {
    studentTable.innerHTML = "";
    for (let npm in students) {
        const s = students[npm];
        if (
            npm.includes(filter) ||
            s.name.toLowerCase().includes(filter.toLowerCase())
        ) {
            studentTable.innerHTML += `
                <tr>
                    <td>${npm}</td>
                    <td>${s.name}</td>
                    <td>${s.major}</td>
                    <td>
                        <button class="btn-detail" onclick="showDetail('${npm}')">Detail</button>
                        ${isAdmin ? `
                        <button class="btn-edit" onclick="editStudent('${npm}')">Edit</button>
                        <button class="btn-delete" onclick="deleteStudent('${npm}')">Hapus</button>
                        ` : ""}
                    </td>
                </tr>
            `;
        }
    }
}

/* SEARCH */
function searchStudent() {
    renderTable(searchInput.value);
}

/* DETAIL */
function showDetail(npm) {
    const s = students[npm];

    detailContent.innerHTML = `
        <div class="detail-item">
            <span>Nama</span>
            <strong>: ${s.name}</strong>
        </div>

        <div class="detail-item">
            <span>NPM</span>
            <strong>: ${npm}</strong>
        </div>

        <div class="detail-item">
            <span>Jenis Kelamin</span>
            <strong>: ${s.gender}</strong>
        </div>

        <div class="detail-item">
            <span>Tanggal Masuk</span>
            <strong>: ${s.entryDate}</strong>
        </div>

        <div class="detail-item">
            <span>Program Studi</span>
            <strong>: ${s.major}</strong>
        </div>

        <div class="detail-item">
            <span>Status Mahasiswa</span>
            <strong>: ${s.status}</strong>
        </div>
    `;

    detailModal.style.display = "flex";
}

function closeDetail() {
    detailModal.style.display = "none";
}

/* CRUD — FIXED */
function saveStudent() {
    if (!isAdmin) return;

    const npm = document.getElementById("npm").value.trim();
    const name = document.getElementById("name").value.trim();
    const gender = document.getElementById("gender").value;
    const major = document.getElementById("major").value.trim();
    const entryDate = document.getElementById("entryDate").value;
    const status = document.getElementById("status").value;

    if (!npm || !name || !gender || !major || !entryDate || !status) {
        alert("Semua field wajib diisi!");
        return;
    }

    students[npm] = { name, gender, major, entryDate, status };
    localStorage.setItem("students", JSON.stringify(students));

    renderTable();
    clearForm();
}

/* EDIT */
function editStudent(npm) {
    const s = students[npm];
    document.getElementById("npm").value = npm;
    document.getElementById("name").value = s.name;
    document.getElementById("gender").value = s.gender;
    document.getElementById("major").value = s.major;
    document.getElementById("entryDate").value = s.entryDate;
    document.getElementById("status").value = s.status;
}

/* DELETE */
function deleteStudent(npm) {
    if (confirm("Hapus data mahasiswa?")) {
        delete students[npm];
        localStorage.setItem("students", JSON.stringify(students));
        renderTable();
    }
}

/* RESET */
function clearForm() {
    document.querySelectorAll("#adminForm input, #adminForm select")
        .forEach(el => el.value = "");
}
