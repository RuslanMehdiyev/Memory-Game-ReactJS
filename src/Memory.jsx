import { useEffect, useState } from "react";

const TILE_COLORS = ["red", "green", "blue", "yellow"];

export default function Memory() {
  const [colors, setColors] = useState([]);
  const [tiles, setTiles] = useState([]);
  const [foundedColor, setFounded] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let addColor = TILE_COLORS.map((e) => e.toLocaleUpperCase());
    setColors(shuffle([...TILE_COLORS, ...addColor]));
  }, []);

  function handleColor(item) {
    setTiles([...tiles, item]);
    setCount((prev) => prev + 1);
    if (count === 1) {
      if (tiles[0].toLowerCase() == item.toLowerCase()) {
        setFounded([...foundedColor, tiles[0], item]);
      }
      setTimeout(() => {
        setTiles([]);
        setCount(0);
      }, 700);
    }
  }
  return (
    <>
      <h1>{foundedColor.length === colors.length ? "You win" : "Memory"}</h1>
      <div className="board">
        {colors &&
          colors.map((item, key) => {
            return (
              <div
                key={key}
                className={`tile ${
                  tiles.includes(item)
                    ? item
                    : foundedColor.includes(item)
                    ? item
                    : ""
                }`}
                style={{
                  background: tiles.includes(item)
                    ? item
                    : foundedColor.includes(item)
                    ? item
                    : "",
                }}
                onClick={() => handleColor(item)}
              ></div>
            );
          })}
      </div>
      {foundedColor.length === colors.length ? (
        <button
          onClick={() => {
            setFounded([]);
            shuffle(colors);
          }}
        >
          Reset
        </button>
      ) : (
        ""
      )}
    </>
  );
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}
