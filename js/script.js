const cardContent = document.getElementById("card-content");
const pokeNew = document.getElementById("poke-new");
const pokeForm = document.getElementById("poke-form");
const pokeSubmit = document.getElementById("poke-submit");

pokeSubmit.addEventListener("click", async (e) => {
  e.preventDefault();
  cardContent.style.display = "flex";
  pokeForm.style.display = "none";
  sprite.style.display = "block";
  displayData();
});

async function getData() {
  try {
    const pokeInput = document.getElementById("input").value.toLowerCase();
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeInput}`);

    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

async function displayData() {
  const data = await getData();
  const sprite = document.getElementById("sprite");
  const pokeTitle = document.getElementById("poke-title");
  const stats = document.getElementById("stats");

  const pokeSprite = data.sprites.front_default;
  const title = data.name;

  stats.innerHTML = "";

  data.stats.forEach((s) => {
    const li = document.createElement("li");
    li.textContent = `${s.stat.name}: ${s.base_stat}`;

    stats.appendChild(li);
  });

  pokeTitle.textContent = title;
  sprite.src = pokeSprite;
}

pokeNew.addEventListener("click", () => {
  cardContent.style.display = "none";
  pokeForm.style.display = "flex";
});
