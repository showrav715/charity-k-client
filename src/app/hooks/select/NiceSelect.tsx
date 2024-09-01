// Importing necessary modules and styles
import React, { useEffect, useRef, useState, KeyboardEvent } from 'react';
import './nice-select.css';

interface NiceSelectProps {
  options: { id: number; label: string; value: string }[];
  defaultValue?: string;
  onChange: (option: string) => void;
  wrapperClass?: string;
}

/**
 * NiceSelect Component
 * @param {NiceSelectProps} props - The props for the NiceSelect component
 * @returns {JSX.Element} - The NiceSelect component
 */
const NiceSelect: React.FC<NiceSelectProps> = ({
  options,
  defaultValue,
  onChange,
  wrapperClass,
}) => {
  // State to manage the dropdown visibility
  const [isOpen, setIsOpen] = useState(false);

  // State to manage the currently selected option
  const [selectedOption, setSelectedOption] = useState(
    defaultValue || (options.length > 0 ? options[0].value : '')
  );

  // Ref to reference the dropdown element
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Effect to handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  // Function to handle option selection
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option);
  };

  // Function to handle keyboard events
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleDropdown();
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    } else if (event.key === 'ArrowDown') {
      const currentIndex = options.findIndex((opt) => opt.value === selectedOption);
      const nextIndex = Math.min(currentIndex + 1, options.length - 1);
      setSelectedOption(options[nextIndex].value);
    } else if (event.key === 'ArrowUp') {
      const currentIndex = options.findIndex((opt) => opt.value === selectedOption);
      const prevIndex = Math.max(currentIndex - 1, 0);
      setSelectedOption(options[prevIndex].value);
    }
  };

  // Render the NiceSelect component
  return (
    <div
      className={`nice-select${isOpen ? ' open' : ''} ${wrapperClass || ''}`}
      onClick={toggleDropdown}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      ref={dropdownRef}
    >
      <span className="current">{selectedOption}</span>
      <ul className={`list${isOpen ? ' open' : ''}`}>
        {options.map((option) => (
          <li
            key={option.id}
            className={`option${option.value === selectedOption ? ' selected' : ''}`}
            onClick={() => handleOptionClick(option.value)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NiceSelect;
