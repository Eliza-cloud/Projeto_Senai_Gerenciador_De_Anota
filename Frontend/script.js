/* --- Configurações de Estado --- */
let currentUser = null;
let currentNote = null;
let allNotes = [];

const API_URL = "http://localhost:3000";

/* --- Inicialização --- */
window.addEventListener("DOMContentLoaded", () => {
    initApp();
});

// Verifica se o usuário já está logado ao abrir a página
async function initApp() {
    try {
        const res = await fetch(`${API_URL}/me`);
        const data = await res.json();

        if (data.loggedIn) {
            currentUser = data.user;
            showNotesScreen();
        } else {
            showLoginScreen();
        }
    } catch (error) {
        showLoginScreen();
    }
    document.getElementById("loadingScreen").style.display = "none";
}

/* --- Controle de Interface (Telas) --- */

function showLoginScreen() {
    document.getElementById("authScreen").style.display = "flex";
    document.getElementById("notesScreen").style.display = "none";
    switchToLogin();
}

function showNotesScreen() {
    document.getElementById("authScreen").style.display = "none";
    document.getElementById("notesScreen").style.display = "block";
    
    if (currentUser) {
        document.getElementById("userEmail").textContent = currentUser.email;
        loadNotes(); // Busca as notas do banco assim que entra
    }
}

function switchToRegister() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
    document.getElementById("authTitle").textContent = "Criar Conta";
    hideError();
}

function switchToLogin() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("authTitle").textContent = "Entrar";
    hideError();
}

/* --- Autenticação --- */

// Login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            currentUser = data;
            showNotesScreen();
        } else {
            showError(data.mensagem);
        }
    } catch (error) {
        showError("Erro ao conectar com o servidor.");
    }
});

// Registro
document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("registerUsername").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirm = document.getElementById("registerConfirmPassword").value;

    if (password !== confirm) {
        showError("As senhas não coincidem");
        return;
    }

    try {
        const res = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });

        const data = await res.json();

        if (res.ok) {
            alert("Conta criada com sucesso! Agora faça login.");
            switchToLogin();
        } else {
            showError(data.mensagem);
        }
    } catch (error) {
        showError("Erro ao conectar com o servidor.");
    }
});

function logout() {
    currentUser = null;
    currentNote = null;
    allNotes = [];
    showLoginScreen();
}

/* --- Gerenciamento de Anotações (CRUD) --- */

// 1. Carregar notas do banco
async function loadNotes() {
    try {
        const res = await fetch(`${API_URL}/notes/${currentUser.email}`);
        allNotes = await res.json();
        renderNotesList();
    } catch (error) {
        console.error("Erro ao carregar notas:", error);
    }
}

// 2. Renderizar lista na barra lateral
function renderNotesList() {
    const listElement = document.getElementById("notesList");
    listElement.innerHTML = "";

    if (allNotes.length === 0) {
        listElement.innerHTML = '<div class="empty-notes-message">Nenhuma anotação ainda</div>';
        return;
    }

    allNotes.forEach(note => {
        const div = document.createElement("div");
        div.className = "note-item";
        div.innerHTML = `<strong>${note.titulo || "Sem título"}</strong>`;
        div.onclick = () => selectNote(note);
        listElement.appendChild(div);
    });
}

// 3. Preparar editor para nova nota
function createNote() {
    currentNote = null;
    document.getElementById("noteTitle").value = "";
    document.getElementById("noteContent").value = "";
    
    document.getElementById("emptyState").style.display = "none";
    document.getElementById("editorContent").style.display = "flex";
}

// 4. Selecionar nota existente para editar
function selectNote(note) {
    currentNote = note;
    document.getElementById("noteTitle").value = note.titulo;
    document.getElementById("noteContent").value = note.conteudo;
    
    document.getElementById("emptyState").style.display = "none";
    document.getElementById("editorContent").style.display = "flex";
}

// 5. Salvar (Criar ou Atualizar)
async function saveNote() {
    const titulo = document.getElementById("noteTitle").value;
    const conteudo = document.getElementById("noteContent").value;

    if (!titulo && !conteudo) return alert("A nota está vazia!");

    const noteData = {
        emailUsuario: currentUser.email,
        titulo: titulo,
        conteudo: conteudo,
        id: currentNote ? currentNote.id : null
    };

    try {
        const res = await fetch(`${API_URL}/notes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(noteData)
        });

        if (res.ok) {
            loadNotes();
            alert("Nota salva com sucesso!");
        }
    } catch (error) {
        alert("Erro ao salvar nota.");
    }
}

// 6. Deletar nota
async function deleteNote() {
    if (!currentNote) return;
    if (!confirm("Tem certeza que deseja excluir esta nota?")) return;

    try {
        const res = await fetch(`${API_URL}/notes/${currentNote.id}`, {
            method: "DELETE"
        });

        if (res.ok) {
            currentNote = null;
            document.getElementById("editorContent").style.display = "none";
            document.getElementById("emptyState").style.display = "block";
            loadNotes();
        }
    } catch (error) {
        alert("Erro ao excluir nota.");
    }
}

/* --- Helpers --- */
function showError(message) {
    const box = document.getElementById("errorMessage");
    box.textContent = message;
    box.style.display = "block";
}

function hideError() {
    document.getElementById("errorMessage").style.display = "none";
}