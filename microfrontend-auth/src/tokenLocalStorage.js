import React, { useState, useEffect } from "react";

function getLocalStorage(key, defaultValue) {
    const value = localStorage.getItem(key);

    const existing = JSON.parse(value);

    return existing || defaultValue;
  }

  export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
      return getLocalStorage(key, defaultValue);
    });

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
  };
