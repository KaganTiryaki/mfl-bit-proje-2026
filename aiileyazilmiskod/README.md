# 🔐 Password Generator

> Cryptographically diverse, locally-generated passwords with adjustable length, character options, and live strength evaluation — built with React Native + Expo.

---

## ✨ Overview

**Password Generator** is a polished Expo (managed workflow) application that helps users create strong, customisable passwords on the fly. It is fully offline-capable — no network calls, no telemetry, no third-party services — and runs on iOS, Android, and the Web through a single codebase.

The project deliberately uses **only `useState` and `useEffect`** for state management. No Redux, no Zustand, no Context API: every piece of state is lifted to the most appropriate component and threaded through explicit props, keeping data flow trivially traceable.

---

## 🚀 Features

- ⚙️ **Length control (8–32)** via a `−` / `+` stepper.
- 🎛️ **Four character toggles**: uppercase, lowercase, numbers, symbols.
- 🔑 **Guaranteed character-class coverage** — when a character class is enabled, at least one such character is guaranteed in every output.
- 🌡️ **Live strength meter** (Weak / Medium / Strong / Very Strong) backed by a Shannon-entropy calculation.
- 📋 **One-tap clipboard copy** powered by `expo-clipboard`.
- 🕒 **Last-5 history** with dedicated copy buttons per entry.
- 🌗 **Dark / Light theme** with a single toggle.
- 🧱 **Strict modular architecture** — every screen, hook, util, and component lives in its own file.

---

## 📦 Tech Stack

| Layer            | Tooling                                           |
| ---------------- | ------------------------------------------------- |
| Framework        | React Native + Expo (managed workflow)            |
| Navigation       | `@react-navigation/native`, native-stack          |
| State management | `useState` + `useEffect` (no context, no globals) |
| Clipboard        | `expo-clipboard`                                  |
| Styling          | `StyleSheet.create` only (no inline styles)       |
| Language         | JavaScript (ES2022, JSDoc type annotations)       |

---

## 🛠️ Installation

```bash
# 1. Install dependencies
npm install

# 2. Start the Expo dev server
npm run start

# 3. Run on a target platform
npm run android   # Android emulator / device
npm run ios       # iOS simulator (macOS only)
npm run web       # Browser
```

> Requires Node 18+, npm 9+, and Expo CLI. iOS targets require Xcode; Android targets require a working JDK + Android SDK or an emulator.

---

## 🎨 Usage

1. Launch the app — you land on the **Home** screen.
2. Tap **Open Generator** to navigate to the generator surface.
3. Adjust **Password length** using the `−` / `+` stepper.
4. Toggle the **character options** you wish to include.
5. Tap **Generate Password** — your password appears at the top with a strength score.
6. Tap **Copy** to put the password on your clipboard.
7. Past passwords appear under **Recent passwords**; tap any row to copy it.
8. Use the toggle on the Home screen to switch between **light** and **dark** modes.

---

## 🗂️ Project Structure

```
aiileyazilmiskod/
├── App.js                          # Root component — theme + nav container
├── app.json                        # Expo manifest
├── babel.config.js                 # Babel preset
├── package.json                    # Dependencies + scripts
├── README.md                       # You are here
└── src/
    ├── navigation/
    │   └── AppNavigator.js         # Native-stack: Home → Generator
    ├── screens/
    │   ├── HomeScreen.js           # Welcome surface
    │   └── GeneratorScreen.js      # Full generator UX
    ├── components/
    │   ├── PrimaryButton.js        # Themed CTA button
    │   ├── ToggleSwitch.js         # Themed switch row
    │   ├── Card.js                 # Section container
    │   ├── LengthSelector.js       # `−` / `+` stepper
    │   ├── StrengthIndicator.js    # Strength bar + label
    │   ├── PasswordDisplay.js      # Generated-password block
    │   └── HistoryList.js          # Recent-passwords list
    ├── hooks/
    │   ├── usePasswordGenerator.js # Generator workflow state
    │   └── useThemeState.js        # Theme state + palette resolver
    └── utils/
        ├── constants.js            # Single source of truth for constants
        ├── passwordGenerator.js    # Pure password-assembly utilities
        ├── strengthCalculator.js   # Entropy + strength-tier mapping
        └── clipboardHelper.js      # `expo-clipboard` adapter
```

---

## 📚 API Reference

### `src/utils/passwordGenerator.js`

| Function                          | Description                                                                                                                              |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `validatePasswordLength(n)`       | Returns `true` when `n` is an integer within `[MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH]`.                                              |
| `collectEnabledSetKeys(options)`  | Returns the array of enabled character-set keys.                                                                                         |
| `buildCharacterPool(keys)`        | Concatenates the alphabets associated with the given keys into a single pool string.                                                     |
| `generateRandomIntegerInRange(n)` | Uniformly distributed integer in `[0, n)`.                                                                                               |
| `pickRandomCharacter(alphabet)`   | Single-character random pick from `alphabet`.                                                                                            |
| `shuffleString(s)`                | Fisher–Yates shuffle.                                                                                                                    |
| `generatePassword(length, opts)`  | The primary entry point — produces a password matching the requested length while guaranteeing at least one character per enabled class. |

### `src/utils/strengthCalculator.js`

| Function                            | Description                                                                |
| ----------------------------------- | -------------------------------------------------------------------------- |
| `calculateEffectivePoolSize(pwd)`   | Derives the effective alphabet size by probing which classes appear.       |
| `calculatePasswordEntropy(pwd)`     | Shannon entropy in bits: `length × log2(poolSize)`.                        |
| `mapEntropyToStrengthLevel(bits)`   | Maps an entropy value to one of `STRENGTH_LEVELS`.                         |
| `evaluatePasswordStrength(pwd)`     | Convenience — returns `{ entropyInBits, strengthLevel }` in one call.      |

### `src/utils/clipboardHelper.js`

| Function                       | Description                                                                  |
| ------------------------------ | ---------------------------------------------------------------------------- |
| `copyTextToClipboard(payload)` | Wraps `Clipboard.setStringAsync` and returns `true`/`false` for success.    |

### `src/hooks/usePasswordGenerator.js`

Returns an object with:

- `passwordLength`, `incrementPasswordLength`, `decrementPasswordLength`, `setPasswordLengthSafely`
- `characterOptions`, `toggleCharacterOption`
- `generatedPassword`, `strengthEvaluation`
- `passwordHistory`, `wasJustCopied`
- `handleGeneratePassword`, `handleCopyPassword(overridePayload?)`

### `src/hooks/useThemeState.js`

Returns `{ themeMode, palette, isDarkMode, toggleThemeMode }`.

---

## 🧩 Component Documentation

| Component             | Purpose                                                                       |
| --------------------- | ----------------------------------------------------------------------------- |
| **PrimaryButton**     | Themed press-target with `primary` / `secondary` variants and disabled state. |
| **ToggleSwitch**      | Themed row exposing a label + native `Switch`.                                |
| **Card**              | Section container with optional uppercase title.                              |
| **LengthSelector**    | Stepper-style `−` / `+` length control with central numeric display.          |
| **StrengthIndicator** | Coloured progress bar + tier label + entropy readout.                         |
| **PasswordDisplay**   | Monospace render of the current password + copy affordance.                   |
| **HistoryList**       | Renders the bounded password history with per-row copy.                       |

Every component receives its `palette` via props so it stays trivially testable.

---

## 🧪 Code Conventions

- ✅ All functions are **arrow functions** assigned with `const`.
- ✅ All components use **default exports**.
- ✅ Imports follow the order: **third-party → internal → relative**.
- ✅ Props are **destructured** at the function signature.
- ✅ No magic numbers — every value originates in `src/utils/constants.js`.
- ✅ JSDoc on every exported function (with `@param` / `@returns` / `@description`).
- ✅ `StyleSheet.create` only — no inline styles.

---

## 🤝 Contributing

Pull requests are welcome. Please follow the code conventions above and keep the central `constants.js` updated whenever you introduce new strings, numbers, or colours.

1. Fork the repo.
2. Create your feature branch (`git checkout -b feat/amazing-thing`).
3. Commit your changes (`git commit -m 'feat: add amazing thing'`).
4. Push to the branch (`git push origin feat/amazing-thing`).
5. Open a Pull Request.

---

## 📜 License

[MIT](./LICENSE) — free to use, modify, and redistribute. No warranty is provided.

---

## 🙏 Acknowledgments

- The [Expo](https://expo.dev) team for the world-class managed workflow.
- [React Navigation](https://reactnavigation.org) for the navigator that powers this app.
- The [`expo-clipboard`](https://docs.expo.dev/versions/latest/sdk/clipboard/) module maintainers.
- Everyone who has written about Shannon entropy and password strength estimation.

Stay safe, generate strong. 🔐
