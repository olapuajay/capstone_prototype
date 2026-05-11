import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "te", name: "తెలుగు", flag: "🇮🇳" },
  ];

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem("language", langCode);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 rounded-lg border border-white/20 bg-white/5 p-1">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`flex items-center gap-1 rounded px-2 py-1 text-xs font-medium transition ${
              i18n.language === lang.code
                ? "bg-accent text-slate-950"
                : "hover:bg-white/10 text-slate-300"
            }`}
            title={lang.name}
          >
            <span>{lang.flag}</span>
            <span>{lang.code.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
