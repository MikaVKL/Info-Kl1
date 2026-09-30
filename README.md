# Info-Lernapp

Lern-App für die Informatik-Klassenarbeit. Läuft ohne Installation: einfach `index.html` im Browser öffnen
(oder per GitHub Pages veröffentlichen).

## Funktionen
- **Erklärung** – Thema Schritt für Schritt erklärt
- **Karteikarten** – aus Glossar + Zusatzkarten, mit Lernfortschritt
- **Quiz** – Multiple Choice mit Erklärung zu jeder Antwort
- **Arbeitsblatt** – Aufgaben mit Tipp und Musterlösung
- **Klassenarbeit-Training** – Quiz aus allen gewählten Themen gemischt
- Fortschritt wird lokal im Browser gespeichert

## Wöchentlicher Ablauf
1. Präsentation + Arbeitsblatt der Woche an Claude schicken (PDF/PPTX/Fotos).
2. Claude legt `data/woche-XX-thema.js` an und trägt die Datei in `index.html` ein.
3. Committen/pushen – fertig.

Struktur eines Themas: siehe `data/vererbung.js`. Themen mit `week: 0` erscheinen als „Grundlagen" (Vorwissen).

## Auf dem Handy nutzen
Die App ist eine installierbare Web-App (PWA) und funktioniert nach dem ersten Öffnen auch **offline**.

1. Einmalig: Repo-Einstellungen → **Pages** → Source: **GitHub Actions**.
2. Änderungen in den Branch `main` mergen – `.github/workflows/pages.yml` veröffentlicht die App automatisch unter
   `https://mikavkl.github.io/Info-Kl1/`.
3. Link auf dem Handy öffnen → Android/Chrome: Menü → „Zur Startseite hinzufügen" · iPhone/Safari: Teilen → „Zum Home-Bildschirm".

Lokal testen: `python3 -m http.server` im Projektordner, dann http://localhost:8000 öffnen.
