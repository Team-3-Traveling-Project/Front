import { useState, ChangeEvent } from 'react';

const useInput = (initialValue: string) => {
  const [input, setInput] = useState<string>(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return [input, handleChange] as const;
};

export default useInput;
