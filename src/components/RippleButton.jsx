// RippleButton.jsx
import React, { useState } from "react";

function RippleButton({ children, onClick, className }) {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(
      () => setRipples((prev) => prev.filter((r) => r.id !== newRipple.id)),
      600
    );
    onClick?.(e);
  };

  return (
    <button className={className} onClick={handleClick}>
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="ripple"
          style={{ top: r.y, left: r.x }}
        ></span>
      ))}
    </button>
  );
}

export default RippleButton;
