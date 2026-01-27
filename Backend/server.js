const express = require("express");
const cors = require("cors");
const db = require("./db"); // Certifique-se de que db.js usa mysql2/promise
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// --- Inicialização do Banco de Dados ---
const initDatabase = async () => {
    try {
        // 1. Cria o banco de dados caso ele não exista
        await db.query(`CREATE DATABASE IF NOT EXISTS db_tasks`);
        
        // 2. Cria as tabelas usando o prefixo db_tasks. para evitar erro de seleção
        await db.query(`
            CREATE TABLE IF NOT EXISTS db_tasks.usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            )
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS db_tasks.notas (
                id INT AUTO_INCREMENT PRIMARY KEY,
                titulo VARCHAR(255),
                conteudo TEXT,
                usuario_email VARCHAR(100),
                data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (usuario_email) REFERENCES db_tasks.usuarios(email) ON DELETE CASCADE
            )
        `);
        console.log("✅ Banco de dados 'db_tasks' e tabelas prontos.");
    } catch (err) {
        console.error("❌ Erro ao inicializar banco:", err.message);
    }
};

// --- Rotas de Autenticação ---

app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        await db.execute(
            "INSERT INTO db_tasks.usuarios (username, email, password) VALUES (?, ?, ?)",
            [username, email, password]
        );
        res.status(201).json({ mensagem: "Conta criada com sucesso!" });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ mensagem: "E-mail já cadastrado." });
        res.status(500).json({ mensagem: "Erro no servidor ao registrar." });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await db.execute(
            "SELECT * FROM db_tasks.usuarios WHERE email = ? AND password = ?",
            [email, password]
        );

        if (rows.length > 0) {
            res.json({ email: rows[0].email, username: rows[0].username });
        } else {
            res.status(401).json({ mensagem: "E-mail ou senha incorretos." });
        }
    } catch (err) {
        res.status(500).json({ mensagem: "Erro ao realizar login." });
    }
});

// --- Rotas de Anotações (CRUD) ---

app.get("/notes/:email", async (req, res) => {
    try {
        const [rows] = await db.execute(
            "SELECT * FROM db_tasks.notas WHERE usuario_email = ? ORDER BY data_criacao DESC",
            [req.params.email]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ mensagem: "Erro ao buscar notas." });
    }
});

app.post("/notes", async (req, res) => {
    const { emailUsuario, titulo, conteudo, id } = req.body;
    try {
        if (id) {
            await db.execute(
                "UPDATE db_tasks.notas SET titulo = ?, conteudo = ? WHERE id = ? AND usuario_email = ?",
                [titulo, conteudo, id, emailUsuario]
            );
            return res.json({ id, titulo, conteudo });
        }
        
        const [result] = await db.execute(
            "INSERT INTO db_tasks.notas (titulo, conteudo, usuario_email) VALUES (?, ?, ?)",
            [titulo || "Sem título", conteudo || "", emailUsuario]
        );
        res.status(201).json({ id: result.insertId, titulo, conteudo });
    } catch (err) {
        res.status(500).json({ mensagem: "Erro ao salvar nota." });
    }
});

app.delete("/notes/:id", async (req, res) => {
    try {
        await db.execute("DELETE FROM db_tasks.notas WHERE id = ?", [req.params.id]);
        res.json({ mensagem: "Nota excluída com sucesso!" });
    } catch (err) {
        res.status(500).json({ mensagem: "Erro ao excluir nota." });
    }
});

// --- Start ---
initDatabase().then(() => {
    app.listen(PORT, () => console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`));
});