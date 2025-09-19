import React, { useState } from "react";

interface LangOption {
  code: string;
  label: string;
  flag: string; // flag-icons css class
}

const languages: LangOption[] = [
  { code: "la", label: "la", flag: "fi fi-la" },
  { code: "en", label: "en", flag: "fi fi-us" },
  { code: "zh", label: "ch", flag: "fi fi-cn" },
];

function DropdownLanguage() {
  const [selected, setSelected] = useState<LangOption>(languages[0]);

  const handleSelect = (lang: LangOption) => {
    setSelected(lang);
  };

  return (
    <div className="navbar-item dropdown">
      <div className="navbar-link dropdown-toggle text-white cursor-pointer" data-bs-toggle="dropdown">
        <span className={selected.flag} title={selected.code}></span>
        <b className="caret"></b>
      </div>
      <div className="dropdown-menu dropdown-menu-end">
        {languages.map((lang) => (
          <div key={lang.code} className="dropdown-item cursor-pointer"
            onClick={() => handleSelect(lang)}
          >
            <span className={`${lang.flag} me-2`} title={lang.code}></span>
            {lang.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DropdownLanguage;
