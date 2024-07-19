import { FC, useEffect, useState, useRef } from "react";
import SelectStyles from "./select.module.scss";

interface SelectProps {
  name: string;
  options: string[];
  label?: string;
  source?: string;
  placeholder: string;
  setSelectValue?: (value: string) => void;
  handleSelectValue?: (name: string, value: string) => void;
}

export const Select: FC<SelectProps> = ({
  name,
  options,
  label,
  source,
  placeholder,
  setSelectValue,
  handleSelectValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectValue && setSelectValue(value);
  }, [value]);

  const handleListItemValue = (itemValue: string) => {
    setValue(itemValue);
    if (handleSelectValue) {
      handleSelectValue(name, itemValue);
    }
    setIsOpen(false);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={SelectStyles.select_container}>
      <label>{label}</label>
      <div
        className={SelectStyles.name_input}
        onClick={() => setIsOpen(!isOpen)}
      >
        {source && <img src={source} />}
        <div
          className={SelectStyles.select_value}
          id={value ? "" : SelectStyles.select_active}
        >
          {value ? value : placeholder}
        </div>
        <img
          src="/png/cross.png"
          alt="cross icon"
          className={
            isOpen ? SelectStyles.cross_active : SelectStyles.cross_inactive
          }
        />
      </div>
      <ul
        className={`${SelectStyles.dropdown_item} ${
          isOpen ? SelectStyles.dropdown_active : SelectStyles.dropdown_inactive
        }`}
      >
        {options.map((listValue, index) => (
          <div key={index}>
            <li
              className={SelectStyles.list_item}
              onClick={() => handleListItemValue(listValue)}
            >
              {listValue}
            </li>
            {index !== options.length - 1 && (
              <div className={SelectStyles.grey_line}></div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};
