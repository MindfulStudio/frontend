# gemischteGefühle - Mental Health Application


<details>
<summary>🇬🇧 English</summary>

## 📖 Description

This project is a mental health application that allows users to record their current emotional states. Users can log when, where, and with whom they felt a certain way and add a personal note if desired. Additionally, users can choose to track optional parameters like sleep, physical activity, and weather. After a certain number of emotional entries, users can view statistics showing:

1. How often certain emotions were recorded with specific contextual data (when, where, with whom).
2. Detailed insights into where, when, and with whom certain emotions occurred.

A diary feature provides a weekly view of recorded emotions, allowing users to click on any entry to see personal notes and other associated information. The application aims to help users better understand and reflect on their emotions. It does not provide conclusive links between emotions and the recorded parameters but instead encourages self-reflection.

This project is a collaboration between [Barış Balcı](https://github.com/barisbalcimusic), [hannahnier](https://github.com/hannahnier), [luisePkt](https://github.com/luisePkt), [Nadja Probst](https://github.com/nadjascodejourney). The development team does not have a professional background in psychology or related fields, and the application is not intended to replace medical or psychological treatment or advice. For mental health issues, users are encouraged to seek professional help.

## 🛠 Technologies Used

- **Framework:** React.js
- **Build Tool & Development Server:** Vite
- **Design:** Figma
- **UI (Library):** Tailwind CSS
- **UI:** Shadcn UI ([shadcn UI](https://ui.shadcn.com/)), Recharts
- **Security:** Google re-Captcha

## ✨ Features

- Record emotions along with contextual details (when, where, with whom), add personal notes, and optionally track sleep, physical activity, and weather
- View statistics of recorded emotions
- Diary view with a weekly overview of recorded emotions (in the planning - coming soon)

## 🚀 Installation

1. Clone the repository and run `npm install`
2. Copy the `.env.example` file, fill it with your data, and rename it to `.env`

## 📱 Usage

The project is primarily intended for mobile use but can also be used on other screens (PC, Laptop, Tablet).

## 📑 API Documentation

<details>
  <summary>Authentication Requests</summary>
  
### Authentication Requests
  | **Request**  | **Endpoint**           | **HTTP Method** | **Body**                          | **Status** | **Error Message**                    |
|----------|--------------------|-------------|-------------------------------|--------|-----------------------------------|
| Create User  | /auth/register     | POST        | username, email, password     | 201    | missingRegData, passValidation, hashError, verTokenError, alreadyRegistered                    |
| Login User | /auth/login        | POST        | email, password, stayLoggedIn | 200    | missingCredentials, userNotFound, invalidPassword, userNotVerified, envError, accTokenError               |
| Logout User| /auth/logout       | POST        |                               | 200    |                                   |
</details>

<details>
  <summary>Requests After Successful Authentication</summary>
  
  ### Requests After Successful Authentication
  | **Request**                  | **Endpoint**                   | **HTTP Method** | **Body**                    | **Status** | **Error Message**                  |
|-------------------------|----------------------------|-------------|-------------------------|--------|---------------------------------|
| Verify User             | /users/verify              | GET         |                         | 200    | verificationTokenMissing, userNotFoundByToken       |
| Get User Data           | /users                     | GET         |                         | 200    | userNotFound                   |
| Update User Data        | /users                     | PATCH       | username                | 200    | userNotFound                   |
| Delete User             | /users                     | DELETE      |                         | 200    | userNotFound                   |
| Get All Check-ins       | /users/checkins            | GET         |                         | 200    | userNotFound                   |
| Get Check-ins from Today| /users/checkins/today      | GET         |                         | 200    | userNotFound                   |
| Get Single Check-in     | /users/checkins/:checkinId | GET         |                         | 200    | userNotFound, checkinNotFound                   |
| Create Check-in         | /users/checkins            | POST        | emotion, tags, comment, config | 201    | userNotFound                   |
| Get All Custom Items    | /users/customs             | GET         |                         | 200    | userNotFound                   |
| Deactivate Custom Item   | /users/customs             | PATCH       | type, name              | 200    | userNotFound, missingInfo, customNotFound                   |
| Get Stats by Emotion Family | /users/stats/family      | GET         | family                  | 200    | userNotFound, familyNotFound                   |
| Get Stats by Tag        | /users/stats/tag           | GET         | tag                     | 200    | userNotFound, tagNotFound                   |
</details>

<details>
  <summary>Error Messages</summary>
  
  ### Error Messages
  | **Status** | **Error Message**                       |
|--------|-------------------------------------|
| 400    | missingRegData                     |
| 400    | passValidation                     |
| 500    | hashError                          |
| 500    | verTokenError                      |
| 409    | alreadyRegistered                   |
| 400    | missingCredentials                 |
| 404    | userNotFound                       |
| 401    | invalidPassword                    |
| 401    | userNotVerified                    |
| 500    | envError                           |
| 500    | accTokenError                      |
| 401    | verificationTokenMissing           |
| 404    | userNotFoundByToken               |
</details>

## 🌐 Environment Variables

Make sure to set the following environment variables before running the application:

| Variable                     | Description                                      |
|------------------------------|--------------------------------------------------|
| `VITE_RECAPTCHA_SITE_KEY`    | Your reCAPTCHA site key                          |
| `VITE_baseURL`               | Base URL for the application (default: `http://localhost:3000/`) |
| `VITE_basePathOne`           | Base path for authentication routes (default: `auth/`) |
| `VITE_basePathTwo`           | Base path for user-related routes (default: `users/`) |
| `VITE_basePathThree`         | Base path for individual user routes (default: `user/`) |

### Note

- **.env.example File:** A `.env.example` file is included in the project, which already contains the prepared variables for your reference.
- **Security:** Ensure your `.env` file is not included in your version control system (e.g., Git) to protect sensitive data.


## 🤝 Contributing

For feedback and suggestions, please contact us directly here on GitHub.

## 📜 License

To be added.

## 📧 Contact

[Barış Balcı](https://github.com/barisbalcimusic), [hannahnier](https://github.com/hannahnier), [luisePkt](https://github.com/luisePkt), [Nadja Probst](https://github.com/nadjascodejourney)


</details>


<details>
<summary>🇩🇪 Deutsch</summary>


## 📖 Beschreibung

Dieses Projekt ist eine Mental-Health-Anwendung, die es den Nutzern ermöglicht, ihre aktuellen Gefühlszustände zu erfassen. Der/die Nutzer*in kann dabei angeben, wann, wo und mit wem er/sie sich entsprechend gefühlt hat, sowie eine eigene Notiz hinzufügen. Zusätzlich können freiwillig Parameter wie Schlaf, körperliche Aktivität und Wetter erfasst werden. Nach einer bestimmten Anzahl von Gefühleinträgen können Nutzer*innen Statistiken einsehen:

1. Wie oft ein bestimmtes Gefühl in Verbindung mit anderen Informationen (Wann, Wo, Mit wem) erfasst wurde.
2. Detaillierte Übersicht, zu welchen Zeitpunkten und in welchen Kontexten bestimmte Gefühle registriert wurden.

Die Anwendung bietet außerdem eine Tagebuchfunktion, die eine Wochenübersicht der erfassten Gefühle anzeigt. Beim Anklicken eines Gefühls können Notizen und andere Informationen eingesehen werden. Ziel der Anwendung ist es, die eigenen Gefühle besser zu verstehen und einzuordnen, ohne eindeutige Zusammenhänge zu den erfassten Parametern darzustellen.

Das Projekt ist eine Gemeinschaftsarbeit von [Barış Balcı](https://github.com/barisbalcimusic), [hannahnier](https://github.com/hannahnier), [luisePkt](https://github.com/luisePkt), [Nadja Probst](https://github.com/nadjascodejourney). Das Entwicklerteam hat keinen fachlichen Hintergrund im Bereich Psychologie oder verwandten Wissenschaften, und die Anwendung ersetzt keine medizinische oder psychologische Beratung. Bei psychischen Problemen raten die Entwickler\*innen, sich professionelle Hilfe zu suchen.

## 🛠 Verwendete Technologien

- **Framework:** React.js
- **Build Tool & Entwicklungsserver:** Vite
- **Design:** Figma
- **UI (Library):** Tailwind CSS
- **UI:** Shadcn UI ([shadcn UI](https://ui.shadcn.com/)), Recharts
- **Sicherheit:** Google re-Captcha

## ✨ Funktionen

- Erfassen von Gefühlen mit den Kontextinformationen (wann, wo, mit wem), hinzufügen einer persönlichen Notiz und optionales Tracking von Schlaf, körperlicher Aktivität und Wetter
- Anzeige von Statistiken zu den erfassten Gefühlen
- Tagebuchansicht mit einer Wochenübersicht der erfassten Gefühle (in der Planung - kommt bald)

## 🚀 Installation

1. Klone das Repository und führe `npm install` aus
2. Kopiere die `.env.example` Datei, fülle sie mit deinen Daten und benenne sie in `.env` um

## 📱 Verwendung

Das Projekt ist hauptsächlich für die Nutzung auf Mobilgeräten gedacht, kann aber auch auf anderen Bildschirmen (PC, Laptop, Tablet) genutzt werden.

## 📑 API-Dokumentation

<details>
  <summary>Anfragen zur Authentifizierung</summary>
  
### Anfragen zur Authentifizierung
  | **Request**  | **Endpoint**           | **HTTP Method** | **Body**                          | **Status** | **Fehlermeldung**                    |
|----------|--------------------|-------------|-------------------------------|--------|-----------------------------------|
| Create User  | /auth/register     | POST        | username, email, password     | 201    | missingRegData, passValidation, hashError, verTokenError, alreadyRegistered                    |
| Login User | /auth/login        | POST        | email, password, stayLoggedIn | 200    | missingCredentials, userNotFound, invalidPassword, userNotVerified, envError, accTokenError               |
| Logout User| /auth/logout       | POST        |                               | 200    |                                   |
</details>

<details>
  <summary>Anfragen nach erfolgreicher Authentifizierung</summary>
  
  ### Anfragen nach erfolgreicher Authentifizierung
  | **Request**                  | **Endpoint**                   | **HTTP Method** | **Body**                    | **Status** | **Fehlermeldung**                  |
|-------------------------|----------------------------|-------------|-------------------------|--------|---------------------------------|
| Verify User             | /users/verify              | GET         |                         | 200    | verificationTokenMissing, userNotFoundByToken       |
| Get User Data           | /users                     | GET         |                         | 200    | userNotFound                   |
| Update User Data        | /users                     | PATCH       | username                | 200    | userNotFound                   |
| Delete User             | /users                     | DELETE      |                         | 200    | userNotFound                   |
| Get All Check-ins       | /users/checkins            | GET         |                         | 200    | userNotFound                   |
| Get Check-ins from Today| /users/checkins/today      | GET         |                         | 200    | userNotFound                   |
| Get Single Check-in     | /users/checkins/:checkinId | GET         |                         | 200    | userNotFound, checkinNotFound                   |
| Create Check-in         | /users/checkins            | POST        | emotion, tags, comment, config | 201    | userNotFound                   |
| Get All Custom Items    | /users/customs             | GET         |                         | 200    | userNotFound                   |
| Deactivate Custom Item   | /users/customs             | PATCH       | type, name              | 200    | userNotFound, missingInfo, customNotFound                   |
| Get Stats by Emotion Family | /users/stats/family      | GET         | family                  | 200    | userNotFound, familyNotFound                   |
| Get Stats by Tag        | /users/stats/tag           | GET         | tag                     | 200    | userNotFound, tagNotFound                   |
</details>

<details>
  <summary>Fehlermeldungen</summary>
  
  ### Fehlermeldungen
  | **Status** | **Fehlermeldung**                       |
|--------|-------------------------------------|
| 400    | missingRegData                     |
| 400    | passValidation                     |
| 500    | hashError                          |
| 500    | verTokenError                      |
| 409    | alreadyRegistered                   |
| 400    | missingCredentials                 |
| 404    | userNotFound                       |
| 401    | invalidPassword                    |
| 401    | userNotVerified                    |
| 500    | envError                           |
| 500    | accTokenError                      |
| 401    | verificationTokenMissing           |
| 404    | userNotFoundByToken               |
</details>


## 🌐 Umgebungsvariablen

Stelle sicher, dass die folgenden Umgebungsvariablen gesetzt sind, bevor du die Anwendung ausführst:

| Variable                     | Beschreibung                                      |
|------------------------------|--------------------------------------------------|
| `VITE_RECAPTCHA_SITE_KEY`    | Dein reCAPTCHA-Website-Schlüssel                  |
| `VITE_baseURL`               | Basis-URL für die Anwendung (Standard: `http://localhost:3000/`) |
| `VITE_basePathOne`           | Basis-Pfad für Authentifizierungsrouten (Standard: `auth/`) |
| `VITE_basePathTwo`           | Basis-Pfad für benutzerspezifische Routen (Standard: `users/`) |
| `VITE_basePathThree`         | Basis-Pfad für individuelle Benutzerrouten (Standard: `user/`) |

### Hinweise

- **.env.example Datei:** Im Projekt ist eine `.env.example`-Datei enthalten, die bereits die vorbereiteten Variablen zu deiner Referenz enthält.
- **Sicherheit:** Achte darauf, deine `.env`-Datei nicht in das Versionskontrollsystem (z.B. Git) einzuschließen, um sensible Daten zu schützen.

## 🤝 Beitragende

Für Anregungen und Feedback gerne direkt hier über GitHub melden.

## 📜 Lizenz

Wird noch ergänzt.


## 📧 Kontakt

[Barış Balcı](https://github.com/barisbalcimusic), [hannahnier](https://github.com/hannahnier), [luisePkt](https://github.com/luisePkt), [Nadja Probst](https://github.com/nadjascodejourney)
</details>
