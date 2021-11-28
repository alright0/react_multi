import React, { useState } from "react";

let HookLearn = () => {
  // Объявляем новую переменную состояния "count"
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(9);

  return (
    <div>
      <p>Вы нажали {count} раз</p>
      <p>Вы нажали {num} раз</p>
      <button
        onClick={() => {
          setCount(count + 1);
          setNum(num + 3);
        }}
      >
        Нажми на меня
      </button>
      <button onClick={() => setNum(num - 2)}>Нажми на меня</button>
    </div>
  );
};

export default HookLearn;
