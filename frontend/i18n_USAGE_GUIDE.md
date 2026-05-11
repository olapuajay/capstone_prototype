# Multi-Language Support (i18n) Guide

## Overview

SmartBus Tracker now supports 3 languages:

- **English (en)** - Default
- **Hindi (hi)** - हिंदी
- **Telugu (te)** - తెలుగు

## How to Use Translations in Components

### 1. Import useTranslation Hook

```javascript
import { useTranslation } from "react-i18next";

const MyComponent = () => {
  const { t } = useTranslation();

  return <h1>{t("common.appName")}</h1>;
};
```

### 2. Access Nested Translations

```javascript
// Access nested keys using dot notation
t("landing.hero.title");
t("auth.passenger.loginBtn");
t("admin.dashboard.complaints");
```

### 3. Using Interpolation (Dynamic Values)

```javascript
// In en.json:
// "welcome": "Welcome, {{name}}!"

const { t } = useTranslation();
<h1>{t("passenger.dashboard.welcome", { name: user.name })}</h1>;
```

### 4. Change Language Programmatically

```javascript
import { useTranslation } from "react-i18next";

const { i18n } = useTranslation();

// Change language
i18n.changeLanguage("hi"); // Switch to Hindi
i18n.changeLanguage("te"); // Switch to Telugu
i18n.changeLanguage("en"); // Switch to English
```

### 5. Get Current Language

```javascript
const { i18n } = useTranslation();
console.log(i18n.language); // Returns: 'en', 'hi', or 'te'
```

## Component Update Examples

### Landing Page

```javascript
import { useTranslation } from 'react-i18next';

const Landing = () => {
  const { t } = useTranslation();

  return (
    <h1>{t('landing.hero.title', { keyword: 'Simplified' })}</h1>
    <p>{t('landing.hero.subtitle')}</p>
    <button>{t('landing.hero.cta1')}</button>
  );
};
```

### Authentication Pages

```javascript
import { useTranslation } from 'react-i18next';

const PassengerAuth = () => {
  const { t } = useTranslation();

  return (
    <h2>{t('auth.passenger.title')}</h2>
    <input placeholder={t('auth.passenger.email')} />
    <input placeholder={t('auth.passenger.password')} />
    <button>{t('auth.passenger.loginBtn')}</button>
  );
};
```

### Dashboard Pages

```javascript
import { useTranslation } from 'react-i18next';

const PassengerDashboard = () => {
  const { t } = useTranslation();

  return (
    <h1>{t('passenger.dashboard.welcome', { name: user?.name })}</h1>
    <h2>{t('passenger.dashboard.complaints')}</h2>
    <select>
      <option value="bus_late">{t('passenger.dashboard.categories.bus_late')}</option>
      <option value="overcrowding">{t('passenger.dashboard.categories.overcrowding')}</option>
    </select>
  );
};
```

## Language Persistence

Languages are automatically saved to localStorage. When users revisit the site, their language preference is restored.

```javascript
// Manually save language preference
localStorage.setItem("language", "hi");

// Manually retrieve language preference
const savedLanguage = localStorage.getItem("language") || "en";
```

## LanguageSwitcher Component

The LanguageSwitcher is automatically included in the Navbar and allows users to switch between languages:

- Shows 3 buttons: EN (🇬🇧), HI (हि), TE (త)
- Highlights current language with green accent
- Persists selection to localStorage

## Translation Keys Structure

```
common.*                    // General/shared translations
nav.*                       // Navigation labels
landing.*                   // Landing page
auth.*                      // Authentication
passenger.dashboard.*       // Passenger features
driver.panel.*              // Driver features
admin.dashboard.*           // Admin features
tracker.*                   // Tracker page
```

## Adding New Translations

1. Add the key-value pair to all three language files:
   - `frontend/src/i18n/locales/en.json`
   - `frontend/src/i18n/locales/hi.json`
   - `frontend/src/i18n/locales/te.json`

2. Use in components:

```javascript
const { t } = useTranslation();
<element>{t("new.translation.key")}</element>;
```

## Complete Translation Files

- **English**: `frontend/src/i18n/locales/en.json` (570+ keys)
- **Hindi**: `frontend/src/i18n/locales/hi.json` (570+ keys)
- **Telugu**: `frontend/src/i18n/locales/te.json` (570+ keys)

## Benefits

✅ Multi-language support for Indian users
✅ Easy to add more languages
✅ Automatic language persistence
✅ Interpolation support for dynamic values
✅ Clean, organized translation structure
✅ Seamless UI language switching with LanguageSwitcher
