const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "data", "content.json");

app.use(express.json());
app.use(express.static(__dirname));

function readContent() {
  const raw = fs.readFileSync(DATA_FILE, "utf8");
  return JSON.parse(raw);
}

function writeContent(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "portfolio-api" });
});

app.get("/api/profile", (_req, res) => {
  const content = readContent();
  res.json(content.profile);
});

app.get("/api/projects", (_req, res) => {
  const content = readContent();
  res.json(content.projects);
});

app.post("/api/messages", (req, res) => {
  const { name, subject, email, phone, message } = req.body;

  if (!name || !subject || !email || !message) {
    return res.status(400).json({
      error: "Campos obrigatorios: name, subject, email e message"
    });
  }

  const content = readContent();
  const newMessage = {
    id: Date.now(),
    name: String(name).trim(),
    subject: String(subject).trim(),
    email: String(email).trim(),
    phone: phone ? String(phone).trim() : "",
    message: String(message).trim(),
    createdAt: new Date().toISOString()
  };

  content.messages.push(newMessage);
  writeContent(content);

  return res.status(201).json({
    ok: true,
    message: "Mensagem recebida com sucesso",
    data: newMessage
  });
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Portfolio rodando em http://localhost:${PORT}`);
});
