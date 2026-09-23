import React, { useState } from 'react';

export const Calculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);

  // Limpiar todo (AC)
  const clearAll = () => {
    setDisplayValue('0');
    setPrevValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  // Insertar número o punto decimal
  const inputDigit = (digit: string) => {
    if (digit === '.') {
      if (waitingForOperand) {
        setDisplayValue('0.');
        setWaitingForOperand(false);
      } else if (!displayValue.includes('.')) {
        setDisplayValue(displayValue + '.');
      }
      return;
    }

    if (waitingForOperand) {
      setDisplayValue(digit);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  // Alternar signo (+/-)
  const toggleSign = () => {
    const value = parseFloat(displayValue);
    if (value !== 0) {
      setDisplayValue(String(-value));
    }
  };

  // Calcular porcentaje (%)
  const inputPercent = () => {
    const currentValue = parseFloat(displayValue);
    if (currentValue === 0) return;
    const fixedValue = currentValue / 100;
    setDisplayValue(String(fixedValue));
  };

  // Realizar operaciones
  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(displayValue);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operation) {
      const currentValue = prevValue || 0;
      let newValue = currentValue;

      switch (operation) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '×':
          newValue = currentValue * inputValue;
          break;
        case '÷':
          newValue = inputValue !== 0 ? currentValue / inputValue : 0;
          break;
        default:
          break;
      }

      setPrevValue(newValue);
      setDisplayValue(String(newValue));
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  // Formatear el número mostrado en pantalla para usar comas según estilo iOS
  const formatDisplay = (val: string) => {
    if (val === '0') return '0';
    const [integer, decimal] = val.split('.');
    const formattedInteger = Number(integer).toLocaleString('en-US');
    return decimal !== undefined ? `${formattedInteger}.${decimal}` : formattedInteger;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4 font-sans select-none">
      {/* Contenedor Principal (Cuerpo del iPhone / Calculadora) */}
      <div className="w-full max-w-[340px] bg-neutral-900/80 backdrop-blur-2xl border border-white/10 rounded-[45px] p-6 shadow-2xl space-y-4">
        
        {/* PANTALLA DE RESULTADOS */}
        <div className="flex flex-col items-end justify-end h-32 px-2 pb-2 text-white">
          <span className="text-[10px] text-gray-400 font-mono tracking-widest h-4">
            {prevValue !== null && operation ? `${prevValue} ${operation}` : ''}
          </span>
          <div className="text-5xl font-light tracking-tight truncate w-full text-right">
            {formatDisplay(displayValue)}
          </div>
        </div>

        {/* TECLADO */}
        <div className="grid grid-cols-4 gap-3">
          {/* Fila 1 */}
          <button
            onClick={clearAll}
            className="w-16 h-16 rounded-full bg-neutral-400 text-black text-xl font-medium active:bg-neutral-200 transition-colors flex items-center justify-center mx-auto"
          >
            {displayValue !== '0' ? 'C' : 'AC'}
          </button>
          <button
            onClick={toggleSign}
            className="w-16 h-16 rounded-full bg-neutral-400 text-black text-xl font-medium active:bg-neutral-200 transition-colors flex items-center justify-center mx-auto"
          >
            ±
          </button>
          <button
            onClick={inputPercent}
            className="w-16 h-16 rounded-full bg-neutral-400 text-black text-xl font-medium active:bg-neutral-200 transition-colors flex items-center justify-center mx-auto"
          >
            %
          </button>
          <button
            onClick={() => performOperation('÷')}
            className={`w-16 h-16 rounded-full text-2xl font-medium transition-colors flex items-center justify-center mx-auto ${
              operation === '÷' && waitingForOperand
                ? 'bg-white text-amber-500'
                : 'bg-amber-500 text-white active:bg-amber-400'
            }`}
          >
            ÷
          </button>

          {/* Fila 2 */}
          <button
            onClick={() => inputDigit('7')}
            className="w-16 h-16 rounded-full bg-neutral-800 text-white text-2xl font-light active:bg-neutral-700 transition-colors flex items-center justify-center mx-auto"
          >
            7
          </button>
          <button
            onClick={() => inputDigit('8')}
            className="w-16 h-16 rounded-full bg-neutral-800 text-white text-2xl font-light active:bg-neutral-700 transition-colors flex items-center justify-center mx-auto"
          >
            8
          </button>
          <button
            onClick={() => inputDigit('9')}
            className="w-16 h-16 rounded-full bg-neutral-800 text-white text-2xl font-light active:bg-neutral-700 transition-colors flex items-center justify-center mx-auto"
          >
            9
          </button>
          <button
            onClick={() => performOperation('×')}
            className={`w-16 h-16 rounded-full text-2xl font-medium transition-colors flex items-center justify-center mx-auto ${
              operation === '×' && waitingForOperand
                ? 'bg-white text-amber-500'
                : 'bg-amber-500 text-white active:bg-amber-400'
            }`}
          >
            ×
          </button>

          {/* Fila 3 */}
          <button
            onClick={() => inputDigit('4')}
            className="w-16 h-16 rounded-full bg-neutral-800 text-white text-2xl font-light active:bg-neutral-700 transition-colors flex items-center justify-center mx-auto"
          >
            4
          </button>
          <button
            onClick={() => inputDigit('5')}
            className="w-16 h-16 rounded-full bg-neutral-800 text-white text-2xl font-light active:bg-neutral-700 transition-colors flex items-center justify-center mx-auto"
          >
            5
          </button>
          <button
            onClick={() => inputDigit('6')}
            className="w-16 h-16 rounded-full bg-neutral-800 text-white text-2xl font-light active:bg-neutral-700 transition-colors flex items-center justify-center mx-auto"
          >
            6
          </button>
          <button
            onClick={() => performOperation('-')}
            className={`w-16 h-16 rounded-full text-2xl font-medium transition-colors flex items-center justify-center mx-auto ${
              operation === '-' && waitingForOperand
                ? 'bg-white text-amber-500'
                : 'bg-amber-500 text-white active:bg-amber-400'
            }`}
          >
            −
          </button>

          {/* Fila 4 */}
          <button
            onClick={() => inputDigit('1')}
            className="w-16 h-16 rounded-full bg-neutral-800 text-white text-2xl font-light active:bg-neutral-700 transition-colors flex items-center justify-center mx-auto"
          >
            1
          </button>
          <button
            onClick={() => inputDigit('2')}
            className="w-16 h-16 rounded-full bg-neutral-800 text-white text-2xl font-light active:bg-neutral-700 transition-colors flex items-center justify-center mx-auto"
          >
            2
          </button>
          <button
            onClick={() => inputDigit('3')}
            className="w-16 h-16 rounded-full bg-neutral-800 text-white text-2xl font-light active:bg-neutral-700 transition-colors flex items-center justify-center mx-auto"
          >
            3
          </button>
          <button
            onClick={() => performOperation('+')}
            className={`w-16 h-16 rounded-full text-2xl font-medium transition-colors flex items-center justify-center mx-auto ${
              operation === '+' && waitingForOperand
                ? 'bg-white text-amber-500'
                : 'bg-amber-500 text-white active:bg-amber-400'
            }`}
          >
            +
          </button>

          {/* Fila 5 */}
          <button
            onClick={() => inputDigit('0')}
            className="col-span-2 h-16 rounded-full bg-neutral-800 text-white text-2xl font-light active:bg-neutral-700 transition-colors flex items-center justify-start pl-7"
          >
            0
          </button>
          <button
            onClick={() => inputDigit('.')}
            className="w-16 h-16 rounded-full bg-neutral-800 text-white text-2xl font-light active:bg-neutral-700 transition-colors flex items-center justify-center mx-auto"
          >
            .
          </button>
          <button
            onClick={() => performOperation('=')}
            className="w-16 h-16 rounded-full bg-amber-500 text-white text-2xl font-medium active:bg-amber-400 transition-colors flex items-center justify-center mx-auto"
          >
            =
          </button>
        </div>

      </div>
    </div>
  );
};

export default Calculator;