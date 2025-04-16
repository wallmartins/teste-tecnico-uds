import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:5173/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/api/data", async (req, res) => {
  try {
    const response = await fetch(
      "https://akabab.github.io/starwars-api/api/all.json"
    );

    const data = await response.json();

    const formattedDate = data.slice(0, 10).map((character) => {
      return {
        id: character.id,
        name: character.name,
        image: character.image,
        homeworld: character.homeworld,
      };
    });

    res.json(formattedDate);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar ou carregar os dados da API" });
  }
});

app.get("/api/data/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await fetch(
      `https://akabab.github.io/starwars-api/api/all.json`
    );

    const data = await response.json();

    const formattedDate = data.slice(0, 10).map((character) => {
      return {
        id: character.id,
        name: character.name,
        gender: character.gender,
        bornLocation: character.bornLocation,
        cybernetics: character.cybernetics,
        affiliations: character.affiliations,
        masters: character.masters,
        apprentices: character.apprentices,
      };
    });

    res.json(formattedDate);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar ou carregar os dados da API" });
  }
});

app.listen(PORT, () =>
  console.log(`Servidor backend rodando em http://localhost:${PORT}`)
);
