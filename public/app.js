const profileEls = {
  nome: document.getElementById("nome"),
  titulo: document.getElementById("titulo"),
  tagline: document.getElementById("tagline"),
  sobre: document.getElementById("sobre"),
  local: document.getElementById("local"),
  email: document.getElementById("email"),
  whatsapp: document.getElementById("whatsapp"),
  skills: document.getElementById("skills"),
  githubLink: document.getElementById("githubLink")
};

const projectsContainer = document.getElementById("projects");
const contactForm = document.getElementById("contactForm");
const feedback = document.getElementById("formFeedback");

async function loadPortfolioData() {
  try {
    const [profileRes, projectsRes] = await Promise.all([
      fetch("/api/profile"),
      fetch("/api/projects")
    ]);

    const profile = await profileRes.json();
    const projects = await projectsRes.json();

    fillProfile(profile);
    fillProjects(projects);
    startRevealAnimation();
  } catch (error) {
    console.error(error);
    feedback.textContent = "Nao foi possivel carregar os dados.";
  }
}

function fillProfile(profile) {
  profileEls.nome.textContent = profile.name;
  profileEls.titulo.textContent = profile.title;
  profileEls.tagline.textContent = profile.tagline;
  profileEls.sobre.textContent = profile.about;
  profileEls.local.textContent = profile.location;
  profileEls.email.textContent = profile.email;
  profileEls.whatsapp.textContent = profile.whatsapp;
  profileEls.githubLink.href = profile.social.github;

  const linkedinEl = document.getElementById("linkedinLink");
  if (linkedinEl && profile.social.linkedin) {
    linkedinEl.href = profile.social.linkedin;
  }

  profile.skills.forEach((skill) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = skill;
    profileEls.skills.appendChild(chip);
  });
}

function fillProjects(projects) {
  const cards = projects
    .map(
      (project) => `
      <article class="project-card reveal">
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <div class="project-stack">
          ${project.stack.map((tech) => `<span>${tech}</span>`).join("")}
        </div>
        <small>${project.highlight}</small>
      </article>
    `
    )
    .join("");

  projectsContainer.innerHTML = cards;
}

function startRevealAnimation() {
  const revealed = document.querySelectorAll(".reveal");
  revealed.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.08}s`;
    element.classList.add("visible");
  });
}

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  feedback.textContent = "Enviando...";

  const formData = new FormData(contactForm);
  const payload = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      feedback.textContent = data.error || "Erro ao enviar mensagem.";
      return;
    }

    feedback.textContent = "Mensagem enviada com sucesso.";
    contactForm.reset();
  } catch (error) {
    console.error(error);
    feedback.textContent = "Falha de rede ao enviar mensagem.";
  }
});

loadPortfolioData();
