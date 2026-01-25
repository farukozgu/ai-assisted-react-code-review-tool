# React Code Review Tool

A lightweight, rule-based React code review tool that analyzes React components and highlights common mistakes, anti-patterns, and refactor opportunities — without relying on paid AI APIs.

This project is designed as a **developer-focused utility** to improve React code quality using deterministic rules and best practices.

---

## 🚀 What This Project Does

- Reviews pasted **React component code**
- Detects **common React anti-patterns**
- Explains **why an issue is a problem**
- Provides **clear refactor suggestions**
- Works fully **offline / rule-based**
- No AI, no API keys, no external services

---

## 🔍 What Can Be Analyzed

The tool focuses on **high-impact React rules**, including:

### React Hooks
- Missing `useEffect` dependency arrays
- Incorrect or empty dependency arrays
- Async functions used directly inside `useEffect`
- Missing cleanup functions in side-effects

### Code Quality
- Inline function definitions inside JSX
- Inline object literals causing unnecessary re-renders
- Poor hook usage patterns

### Best Practices
- Side-effect isolation
- Predictable component behavior
- Maintainable and readable code structure

---

## ❌ What This Tool Does NOT Do

- ❌ No AI-generated responses
- ❌ No automatic code rewriting
- ❌ No backend-heavy analysis
- ❌ No lint replacement (this complements ESLint, not replaces it)

---

## 🧠 How It Works

1. You paste a React component into the editor
2. The code is parsed into an AST
3. Predefined rules analyze the AST
4. Issues are collected with:
   - Description
   - Why it’s a problem
   - Refactor suggestion
   - Severity level
5. Results are shown in a structured output panel

All analysis is **deterministic and transparent**.

---

## 🧱 Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **React**
- **AST-based static analysis**
- Tailwind CSS (UI)

---

## 🎯 Project Goal

This project aims to:

- Act as a **learning and review tool** for React developers
- Encourage **clean, predictable React patterns**
- Serve as a **portfolio-grade developer product**
- Demonstrate how far **rule-based static analysis** can go without AI

---

## 📌 Future Improvements (Optional)

- More React rules (memoization, keys, callbacks)
- File-based analysis instead of paste-only
- Exportable review reports
- ESLint rule mapping
- Code diff previews for refactors

---

## 🧑‍💻 Target Audience

- React developers
- Frontend engineers
- Learners improving hook usage
- Developers reviewing unfamiliar codebases

---

## 📄 License

MIT License
