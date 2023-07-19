import React, { useState, useEffect } from 'react';
import '../estilos/Reloj.css'

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="ClockContainer">
      <p className="ClockTime">{time.toLocaleTimeString()}</p>
    </div>
  );
};

export default Clock;

