import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [characterData, setCharacterData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/data");

      if (!response.ok) {
        throw new Error("Ocorreu um erro na resposta da API!");
      }

      const data = await response.json();

      console.log(data);
      setData(data);
    } catch (error) {
      throw new Error("Erro ao buscar dados: " + error.message);
    }
  };

  const getCharacterInfo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/data/${id}`);

      if (!response.ok) {
        throw new Error("Ocorreu um erro na resposta da API!");
      }

      const data = await response.json();

      const charData = data.filter((character) => character.id === id);
      console.log(charData);

      setCharacterData(charData);
    } catch (error) {
      throw new Error("Erro ao buscar dados: " + error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      {!data.length ? (
        <h1>Nenhuma informação encontrada!</h1>
      ) : (
        <div className="container">
          {!characterData.length ? (
            data.map(({ id, name, image, homeworld }) => (
              <div
                onClick={() => getCharacterInfo(id)}
                className="card"
                key={id}
              >
                <h1 className="titleCard">{name}</h1>
                <img className="imageCard" src={image} alt={name} />
                <p className="homeCard">Homeworld: {homeworld}</p>
              </div>
            ))
          ) : (
            <div>
              {characterData.map(
                ({
                  id,
                  name,
                  gender,
                  bornLocation,
                  cybernetics,
                  affiliations,
                  masters,
                  apprentices,
                }) => (
                  <div key={id} className="characterInfo">
                    <h1>{name}</h1>
                    <div className="henderCharacterInfo">
                      <p>{gender}</p>
                      <p>{bornLocation}</p>
                      <p>{cybernetics}</p>
                    </div>
                    <div>
                      {affiliations.map((affiliation, index) => {
                        <div key={`affiliantion-${index}`}>
                          <h4>Afiliações</h4>
                          <span>{affiliation}</span>
                        </div>;
                      })}
                    </div>
                    <div>
                      {masters &&
                        masters.map((masters, index) => {
                          <div key={`masters-${index}`}>
                            <h4>Mestres</h4>
                            <span>{masters}</span>
                          </div>;
                        })}
                    </div>
                    <div>
                      {apprentices &&
                        apprentices.map((apprentices, index) => {
                          <div key={`apprentices-${index}`}>
                            <h4>Aprendizes</h4>
                            <span>{apprentices}</span>
                          </div>;
                        })}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default App;
