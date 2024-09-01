import React, { useEffect, useRef, useState, KeyboardEvent } from "react";

export interface Option {
  id: any;
  name: string;
}

export interface INiceSelect {
  options: Option[];
  defaultValue?: any;
  onChange: (id: string | any) => void;
  wrapperClass?: string;
}

const NiceSelect: React.FC<INiceSelect> = ({
  options,
  defaultValue,
  onChange,
  wrapperClass,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option>(
    defaultValue !== null
      ? options?.find((option) => option.id === defaultValue)
      : defaultValue === 0
      ? options?.find((option) => option.id === 0)
      : null
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedOption(
      defaultValue !== null
        ? options?.find((option) => option.id === defaultValue)
        : defaultValue === 0
        ? options?.find((option) => option.id === 0)
        : null
    );

    const handleClickOutside = (event: any) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [defaultValue, options]);

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleOptionClick = (option: any) => {
    setIsOpen(false);
    onChange(option);
    toggleDropdown();
    setSelectedOption(option);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "Enter":
      case " ":
        toggleDropdown();
        break;
      case "Escape":
        setIsOpen(false);
        break;
      case "ArrowDown":
        handleArrowKey("down");
        break;
      case "ArrowUp":
        handleArrowKey("up");
        break;
      default:
        break;
    }
  };

  const handleArrowKey = (direction: "up" | "down") => {
    const currentIndex = options.indexOf(selectedOption as Option);
    const nextIndex =
      direction === "down"
        ? Math.min(currentIndex + 1, options.length - 1)
        : Math.max(currentIndex - 1, 0);
    setSelectedOption(options[nextIndex]);
  };

  return (
    <div
      className={`nice-select${isOpen ? " open" : ""} ${wrapperClass || ""}`}
      onClick={toggleDropdown}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      ref={dropdownRef}
    >
      <span className="current">
        {selectedOption ? selectedOption.name : "Select"}
      </span>
      <ul className={`list${isOpen ? " open" : ""}`}>
        
        {options?.map((option: Option) => (
          <li
            key={option.id}
            className={`option${option === selectedOption ? " selected" : ""}`}
            onClick={() => handleOptionClick(option)}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NiceSelect;
