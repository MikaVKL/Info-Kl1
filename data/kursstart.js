// Quelle: Folien "Q1 Informatik Kursstart" + Arbeitsblatt "Installation Software" (Ch. Pothmann, CC BY-NC-SA 4.0)
window.TOPICS.push({
  id: 'kursstart', week: 1, title: 'Kursstart & Software einrichten',
  summary: 'Aufbau der Q1, Bewertung, BlueJ, UMLet und die Bibliotheken.',
  sections: [
    { title: 'Der Weg durch die Q1', html: `<p>Im Grundkurs Q1 gibt es <b>fünf Unterrichtsvorhaben</b> mit insgesamt ca. 100 Stunden:</p>
      <table><tr><th>Nr.</th><th>Thema</th><th>Stunden</th></tr>
      <tr><td>I</td><td><b>Suchen und Sortieren auf linearen Datenstrukturen</b> ← Start</td><td>~16</td></tr>
      <tr><td>II</td><td>Sicherheit / Kryptographie</td><td>~20</td></tr>
      <tr><td>III</td><td>Dynamische lineare Datenstrukturen</td><td>~20</td></tr>
      <tr><td>IV</td><td>Dynamische nichtlineare Datenstrukturen</td><td>~24</td></tr>
      <tr><td>V</td><td>Endliche Automaten / formale Sprachen</td><td>~20</td></tr></table>
      <div class="tip">Die Vererbung (nächstes Thema hier) ist Grundlage für die Datenstrukturen in III und IV.</div>` },
    { title: 'Leistungsbewertung', html: `<ul><li><b>Klausuren:</b> 2 pro Halbjahr, je 2 Unterrichtsstunden (90 Minuten). In Q1.2 kann eine Klausur durch eine <b>Facharbeit</b> ersetzt werden.</li>
      <li><b>Ausreichend (5 Punkte)</b> ab <b>45 %</b> der Hilfspunkte. Die Note richtet sich nach dem Zuordnungsschema des Zentralabiturs.</li>
      <li><b>Sonstige Mitarbeit:</b> mündliche Beteiligung, praktische Arbeit am Rechner (Implementieren, Testen), Kleingruppen-Softwareprojekt (entwickeln, dokumentieren, präsentieren), ggf. kurze schriftliche Übungen (ca. 20 Min.).</li></ul>
      <div class="tip">Die „Sonstige Mitarbeit" zählt genauso wichtig – regelmäßig mitarbeiten und am Rechner ausprobieren lohnt sich.</div>` },
    { title: 'BlueJ – die Entwicklungsumgebung', html: '<p><b>BlueJ</b> ist die kostenlose Java-Entwicklungsumgebung (IDE) des Kurses: <a href="https://bluej.org" target="_blank" rel="noopener">bluej.org</a>. Klassen erscheinen als Kästchen; per Rechtsklick kannst du Objekte erzeugen (<i>new</i>) und Methoden aufrufen – ideal zum Ausprobieren. „Übersetzen" (Compile) prüft den Code auf Fehler.</p>' },
    { title: 'Bibliotheken (console.jar & gamewindow.jar)', html: `<p>Eine <b>Bibliothek</b> enthält fertig programmierte Klassen, deren Methoden du benutzen kannst. Für die Datenstrukturen brauchst du <b>Console</b> und <b>GameWindow</b> (<code>console.jar</code>, <code>gamewindow.jar</code>, gibt es von der Lehrkraft).</p>
      <p>Kopiere die Dateien in den Ordner <code>userlib</code> im BlueJ-Programmordner, z. B. <code>C:\\Programme\\BlueJ\\lib\\userlib\\</code>. Danach BlueJ neu starten.</p>` },
    { title: 'UMLet – Diagramme zeichnen', html: '<p>Mit <b>UMLet</b> zeichnest du Klassen- und Objektdiagramme (<a href="https://www.umlet.com" target="_blank" rel="noopener">umlet.com</a>). Ohne Installation geht es im Browser: <a href="http://www.umletino.com" target="_blank" rel="noopener">umletino.com</a>.</p>' }
  ],
  keyPoints: ['5 Unterrichtsvorhaben in Q1, Start mit Suchen & Sortieren', 'Klausur: 90 Minuten, 2 pro Halbjahr, 5 Punkte ab 45 %', 'BlueJ = IDE, UMLet = Diagramme, Bibliotheken in den userlib-Ordner'],
  glossary: [
    { term: 'BlueJ', def: 'Kostenlose Java-Entwicklungsumgebung für den Unterricht.' },
    { term: 'UMLet', def: 'Programm zum Zeichnen von Klassen- und Objektdiagrammen (auch im Browser: umletino).' },
    { term: 'Bibliothek', def: 'Sammlung fertig programmierter Klassen, die man in eigenen Programmen nutzt.' },
    { term: 'userlib', def: 'Ordner im BlueJ-Verzeichnis, in den zusätzliche .jar-Bibliotheken kopiert werden.' },
    { term: 'IDE', def: 'Entwicklungsumgebung: Editor, Compiler und Testwerkzeuge in einem Programm.' }
  ],
  cards: [
    { q: 'Ab wie viel Prozent der Hilfspunkte ist eine Klausur „ausreichend"?', a: 'Ab 45 % (= 5 Punkte).' },
    { q: 'Wie lange dauert eine Klausur in Q1?', a: '90 Minuten (2 Unterrichtsstunden), 2 pro Halbjahr.' },
    { q: 'Welches Unterrichtsvorhaben kommt zuerst?', a: 'I: Suchen und Sortieren auf linearen Datenstrukturen.' }
  ],
  quiz: [
    { q: 'Mit welchem Thema startet Q1?', options: ['Kryptographie', 'Suchen und Sortieren auf linearen Datenstrukturen', 'Endliche Automaten', 'Dynamische nichtlineare Datenstrukturen'], answer: 1, explain: 'Unterrichtsvorhaben I.' },
    { q: 'Wie viele Klausuren gibt es pro Halbjahr?', options: ['1', '2', '3', '4'], answer: 1, explain: '2 Klausuren à 90 Minuten.' },
    { q: 'Wo kommen console.jar und gamewindow.jar hin?', options: ['Desktop', 'Ordner userlib im BlueJ-Verzeichnis', 'In das Projekt-Passwort', 'Ins Downloads-Verzeichnis'], answer: 1, explain: 'BlueJ findet zusätzliche Bibliotheken im Ordner lib/userlib.' },
    { q: 'Wozu dient UMLet?', options: ['Java kompilieren', 'Klassen- und Objektdiagramme zeichnen', 'Tabellen berechnen', 'Bibliotheken herunterladen'], answer: 1, explain: 'Diagramme, auch als Browserversion (umletino).' },
    { q: 'Was gehört zur „Sonstigen Mitarbeit"?', options: ['Nur Klausuren', 'Mündliche Beteiligung, Rechnerarbeit, Projekt, kurze Übungen', 'Nur Hausaufgaben abgeben', 'Nur das Softwareprojekt'], answer: 1, explain: 'Mehrere Bausteine zählen zusammen.' },
    { q: 'Was ist eine Bibliothek in Java?', options: ['Ein Ordner mit Bildern', 'Fertig programmierte Klassen, die man benutzen kann', 'Ein Fehler beim Kompilieren', 'Eine Art Objekt'], answer: 1, explain: 'Du musst den Code nicht selbst schreiben.' }
  ],
  exercises: [
    { task: '<p><b>Aufgabe a–c des Arbeitsblatts (zu Hause):</b> BlueJ und UMLet installieren, Bibliotheken in <code>userlib</code> kopieren, ein BlueJ-Projekt öffnen und übersetzen, UMLet starten. Bei Problemen: Screenshot aller Fehlermeldungen mitbringen.</p>', hint: 'Abhaken, sobald es geht.', solution: `<ol><li>BlueJ von <b>bluej.org</b> laden und installieren (Java ist im Installer dabei).</li><li>UMLet von <b>umlet.com</b> laden – oder <b>umletino.com</b> im Browser nutzen.</li><li><code>console.jar</code> und <code>gamewindow.jar</code> nach <code>…\\BlueJ\\lib\\userlib\\</code> kopieren, BlueJ neu starten.</li><li>Projekt öffnen (<i>Projekt → Öffnen</i>) und auf <b>Übersetzen</b> klicken. Wenn keine Fehler kommen: fertig. Sonst Screenshot machen.</li></ol>` }
  ]
});
