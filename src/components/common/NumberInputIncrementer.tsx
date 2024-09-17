import { ChangeEvent, InputHTMLAttributes, useState } from "react";

interface INumberInputIncrementer
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  helpText?: string;
  defaultValue?: number;
  value?: number;
  onChange?: (num: number) => void;
}

export function NumberInputIncremeneter(props: INumberInputIncrementer) {
  const [value, setValue] = useState<number>(props.defaultValue || 0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const num = parseFloat(e.target.value);
    if (typeof num !== "number") return;
    setValue(num);
    props.onChange?.(num);
  };

  const increment = () => {
    const incrementedValue = value + 1;
    setValue(incrementedValue);
    props.onChange?.(incrementedValue);
  };

  const decrement = () => {
    const decrementedValue = value - 1;
    setValue(decrementedValue);
    props.onChange?.(decrementedValue);
  };

  return (
    <div className="containter p-2">
      <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
        {props.label}
      </label>
      <div className="relative flex max-w-[8rem] items-center">
        <button
          type="button"
          className="h-8 rounded-s-lg border border-gray-300 bg-gray-100 p-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
          onClick={decrement}
        >
          <svg
            className="h-3 w-3 text-gray-900 dark:text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          type="number"
          aria-describedby="helper-text-explanation"
          className="block h-8 w-full border-x-0 border-gray-300 bg-gray-50 py-2.5 text-center text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder={props.placeholder}
          min={props.min}
          max={props.max}
          step={props.step}
          value={value}
          onChange={handleChange}
        />
        <button
          type="button"
          className="h-8 rounded-e-lg border border-gray-300 bg-gray-100 p-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
          onClick={increment}
        >
          <svg
            className="h-3 w-3 text-gray-900 dark:text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
      {!!props.helpText && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{props.helpText}</p>
      )}
    </div>
  );
}
