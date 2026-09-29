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

Struktur eines Themas: siehe `data/woche-01-zahlensysteme.js` (das ist nur ein Platzhalter-Beispiel).
