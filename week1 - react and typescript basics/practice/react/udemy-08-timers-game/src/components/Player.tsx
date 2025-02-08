import { useState, useRef } from "react";

export default function Player() {

  const [name, setName] = useState<string>("");
  const input = useRef<HTMLInputElement>(null);

  return (
    <section id="player">
      <h2>Welcome {name ? name : "unknown entity"}</h2>
      <p>
        <input type="text" ref={input} />
        <button onClick={() => setName(input.current!.value)}>Set Name</button>
      </p>
    </section>
  );
}
