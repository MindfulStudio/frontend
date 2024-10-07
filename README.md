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

## 📑 Project Structure

<details>
  <summary>Main folder and files of the project 
</summary>
  
### Overview of the main folders and their purposes:

| Folder           | Description                                                         |
|------------------|---------------------------------------------------------------------|
| **/components**   | Contains UI components, e.g., navigation menu, dashboard elements   |
| **/pages**        | Different pages like HomePage, JournalPage, MetricsPage, etc.       |
| **/services**     | Contains API functions for backend communication                    |
| **/helpers**     | Contains helper functions                                            |
| **/utils**        | Context providers and utility functions                             |
| **/styles**       | Contains all CSS files (e.g., TailwindCSS configurations)           |
</details>

<details>
  <summary>Key Components</summary>
  
  ### App.jsx
  The main `App.jsx` component loads the core layout and navigation. It uses React Router to switch between various pages like the Dashboard, Metrics Page, and Journal.
  
  ### Pages
  The page components are located in /src/pages and represent the main views of the application:

- HomePage.jsx: The homepage of the application, allows the user to login or register.
- LoginPage.jsx: Login page for users.
- RegisterPage.jsx: Register page for users.
- ConfigPage.jsx: Page that queries parameters to be recorded in the future. Only displayed once, after the first login.
- DashboardPage.jsx: Dashboard for displaying previously checked-in feelings of a day and start for check-in process of the current feeling.
- MetricsPage.jsx: Page for displaying metrics and statistical analysis.
- RecordPage.jsx: Page for checking in the current feeling.
- UserDataPage.jsx: Page for displaying and editing user data.
- InfoPage.jsx: Page that informs users in more detail about application.
- JournalPagejsx: Page that is currently being planned and is intended to give users a diary-like overview of recorded feelings, notes etc.
- ErrorPage: Displays error message in the event of an error.

### Custom Components
In /src/components/ownComponents you will find custom components that have been built for different pages. Examples:

- navMenu: Contains the navigation elements.
- dashboardPage: Provides UI components for the dashboard, such as graphs or widgets.
- metricsPage: Includes UI components for displaying statistical data and analytics.

  ### State Management and Contexts
The project uses React contexts to manage the global state of the application. These contexts can be found in /src/utils/contexts.

### Backend API Interaction
All API calls for interacting with the backend are handled via the /src/services folder. It contains functions to load, store, or update data. The API interactions are handled via fetch requests.

</details>

<details>
  <summary>API Documentation</summary>
  The <a href="https://github.com/MindfulStudio/backend/blob/main/README.md#-api-documentation">API documentation</a> can be found in the readme.md of the backend repository.
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

## 🎓 Project Context

This frontend project is part of a collaborative final project completed by [luisePkt](https://github.com/luisePkt), [Nadja Probst](https://github.com/nadjascodejourney), [Barış Balcı](https://github.com/barisbalcimusic), and [hannahnier](https://github.com/hannahnier) at the end of a one-year full-time course in Fullstack Web Development. It operates alongside a [Backend repository](https://github.com/MindfulStudio/backend) to create a comprehensive Browser Application on the subject of Mental Health.

## 📜 License

This project is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International Public Licence. You may share and adapt the material as long as you give credit, do not use it for commercial purposes, and distribute your modifications under the same terms. Further information can be found in the [licence file](https://github.com/MindfulStudio/frontend/blob/main/LICENSE.md).

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

## 📑 Projektstruktur

<details>
  <summary>Hauptordner und -dateien des Projekts </summary>
  
### Übersicht der Hauptordner und deren Funktionen:

| Ordner            | Beschreibung                                                         |
|-------------------|----------------------------------------------------------------------|
| **/components**    | Enthält UI-Komponenten, z.B. Navigationsmenü, Dashboard-Elemente      |
| **/pages**         | Verschiedene Seiten wie HomePage, JournalPage, MetricsPage, etc.      |
| **/services**      | Beinhaltet API-Funktionen zur Kommunikation mit dem Backend          |
| **/helpers**       | Enthält Hilfsfunktionen                                              |
| **/utils**         | Kontext-Provider und Utility-Funktionen                              |
| **/styles**        | Enthält alle CSS-Dateien (z.B. TailwindCSS-Konfigurationen)          |
</details>

<details>
  <summary>Wichtige Komponenten</summary>
  
  ### App.jsx
  Die Hauptkomponente `App.jsx` lädt das Kernlayout und die Navigation. Sie verwendet React Router, um zwischen verschiedenen Seiten wie dem Dashboard, der Metrics-Seite und dem Journal zu wechseln.
  
  ### Seiten
  Die Seitenkomponenten befinden sich im Ordner /src/pages und repräsentieren die Hauptansichten der Anwendung:

- **HomePage.jsx**: Startseite der Anwendung, auf der sich Benutzer anmelden oder registrieren können.
- **LoginPage.jsx**: Anmeldeseite für Benutzer.
- **RegisterPage.jsx**: Registrierungsseite für neue Benutzer.
- **ConfigPage.jsx**: Seite, die Parameter für zukünftige Aufzeichnungen abfragt. Wird nur einmal nach der ersten Anmeldung angezeigt.
- **DashboardPage.jsx**: Dashboard zur Anzeige der bereits erfassten Gefühle eines Tages und Start des aktuellen Check-in-Prozesses.
- **MetricsPage.jsx**: Seite zur Anzeige von Metriken und statistischen Analysen.
- **RecordPage.jsx**: Seite für das Erfassen des aktuellen Gefühls.
- **UserDataPage.jsx**: Seite zur Anzeige und Bearbeitung von Benutzerdaten.
- **InfoPage.jsx**: Seite, die Benutzer detaillierter über die Anwendung informiert.
- **JournalPage.jsx**: Seite, die derzeit geplant ist und Benutzern eine tagebuchähnliche Übersicht über erfasste Gefühle, Notizen etc. bieten soll.
- **ErrorPage.jsx**: Zeigt eine Fehlermeldung im Falle eines Fehlers an.

### Eigene Komponenten
Im Ordner /src/components/ownComponents findest du benutzerdefinierte Komponenten, die für verschiedene Seiten erstellt wurden. Beispiele:

- **navMenu**: Enthält die Navigationselemente.
- **dashboardPage**: Bietet UI-Komponenten für das Dashboard, wie z.B. Diagramme oder Widgets.
- **metricsPage**: Beinhaltet UI-Komponenten zur Anzeige statistischer Daten und Analysen.

  ### State Management und Kontexte
Das Projekt verwendet React-Kontexte zur Verwaltung des globalen Zustands der Anwendung. Diese Kontexte befinden sich im Ordner /src/utils/contexts.

### Backend API-Interaktion
Alle API-Aufrufe zur Interaktion mit dem Backend werden über den Ordner /src/services abgewickelt. Er enthält Funktionen zum Laden, Speichern oder Aktualisieren von Daten. Die API-Interaktionen erfolgen über Fetch-Anfragen.

</details>

<details>
  <summary>API-Dokumentation</summary>
  Die <a href="https://github.com/MindfulStudio/backend/blob/main/README.md#-api-dokumentation">API-Dokumentation</a> befindet sich im readme.md des backend Repositorys.
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

## 🎓 Projektrahmen

Dieses Frontendprojekt ist Teil eines Abschlussprojekts, das von [luisePkt](https://github.com/luisePkt), [Nadja Probst](https://github.com/nadjascodejourney), [Barış Balcı](https://github.com/barisbalcimusic) & [hannahnier](https://github.com/hannahnier) zum Ende einer einjährigen Vollzeit-Weiterbildung im Bereich Fullstack-Webdevelopment entwickelt wurde. Zusammen mit dem dazugehörigen [Backend-Repository](https://github.com/MindfulStudio/backend) ist dabei eine umfassende Browser-App für Mentale Gesundheit entstanden.

## 📜 Lizenz

Dieses Projekt ist lizenziert unter der Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International Public License. Du darfst das Material teilen und anpassen, solange du die Urheberrechte nennst, es nicht für kommerzielle Zwecke nutzt und deine Abänderungen unter den gleichen Bedingungen weitergibst. Weitere Informationen findest du in der [Lizenzdatei](https://github.com/MindfulStudio/frontend/blob/main/LICENSE.md).



## 📧 Kontakt

[Barış Balcı](https://github.com/barisbalcimusic), [hannahnier](https://github.com/hannahnier), [luisePkt](https://github.com/luisePkt), [Nadja Probst](https://github.com/nadjascodejourney)
</details>
