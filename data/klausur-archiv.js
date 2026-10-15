// Quelle: Aufgaben der vier alten Klausuren (EF 1: 19.12.2025 + Nachschreibtermin; EF 2: 12.06.2026 + Nachschreibtermin 19.06.2026), Fach Informatik EF Hov.
// Aufgaben sinngemäß wiedergegeben; die Musterlösungen sind von Claude erstellt (Rover-Abläufe per Simulation nachvollzogen, Annahme: Rover startet auf (0,1) und blickt nach Osten).
(function () {
const uml = (name, attrs, meths, obj) => `<div class="uml${obj ? ' obj' : ''}"><div>${name}</div><div>${attrs.join('<br>') || '&nbsp;'}</div>${meths ? `<div>${meths.join('<br>') || '&nbsp;'}</div>` : ''}</div>`;
const S = t => `<div class="s">${t}</div>`;
const Wh = (c, inner) => `<div class="w"><div class="h">${c}</div><div class="b">${inner}</div></div>`;
const If = (c, y, n) => `<div class="i"><div class="h">${c}</div><div class="br"><div><div class="lab">Wahr</div>${y}</div><div><div class="lab">Falsch</div>${n}</div></div></div>`;
const NSD = h => `<div class="nsd">${h}</div>`;
const num = t => t.split('\n').map((l, i) => String(i + 1).padStart(2, ' ') + '  ' + l).join('\n');
const code = t => `<pre><code>${num(t)}</code></pre>`;
const ef2Class = `<div class="diag">${uml('Schulfest', [], ['+ Schulfest()', '+ berechneMaxBesucher(): int', '+ berechneEinnahmen(): double', '+ fuegeStandHinzu(st: Stand)'])}<span style="display:inline-block;vertical-align:top;margin-top:40px"> - st1, - st2,<br>- st3, - st4 &rarr; </span>${uml('Stand', ['- name: String', '- einnahmen: double', '- maxBesucher: int'], ['+ Stand(pName: String, pMaxBesucher: int)', '+ gibName(): String', '+ verkaufen(pAnzahl: int)', '+ gibEinnahmen(): double', '+ setzeMaxBesucher(pMaxBesucher: int)', '+ gibMaxBesucher(): int'])}</div>`;
const doku = `<details><summary>Dokumentation aus dem Anhang (Rover)</summary><ul><li><code>void fahre()</code> ein Feld vor (nicht über Hügel oder Weltgrenze)</li><li><code>void drehe(String richtung)</code> um 90° ("links" oder "rechts")</li><li><code>void setzeMarke()</code>, <code>void entferneMarke()</code>, <code>boolean markeVorhanden()</code></li><li><code>boolean gesteinVorhanden()</code>, <code>void nimmGestein()</code></li><li><code>boolean huegelVorhanden(String richtung)</code> ("links", "rechts", "vorne")</li></ul></details>`;
const roverWorld = `<p class="muted">Welt der Aufgabe (14 Felder breit, 3 Reihen; Koordinaten (Spalte, Reihe) von links oben): Rover bei (0,1) mit Blick nach rechts. Hügel in der mittleren Reihe bei x = 1, 3, 5, 7, 9, 13. Marken bei (8,1) und (12,1). Gesteine über und unter jedem ungeraden Feld (x = 1 bis 13), je in Reihe 0 und Reihe 2.</p>`;
window.TOPICS.push({
  id: 'klausur-archiv', week: 0, tag: 'tipps', title: 'Alte Klausuren mit Lösungen',
  summary: 'Aufgaben der vier alten Klausuren zum Üben, mit ausführlichen Musterlösungen.',
  sections: [
    { title: 'Worum geht es?', html: `<p>Hier sind die Aufgaben der vier alten Klausuren (EF 1 und EF 2, jeweils Haupt- und Nachschreibtermin). Du findest sie im Reiter <b>Arbeitsblatt</b>: Lösung <b>erst selbst auf Papier</b> versuchen, dann die Musterlösung ansehen.</p>
      <table><tr><th>Klausur</th><th>Thema</th><th>Aufgaben hier</th></tr>
      <tr><td>EF 1 (19.12.2025)</td><td>Algorithmen und Grundstrukturen (Rover)</td><td>1 bis 4</td></tr>
      <tr><td>EF 1 Nachschreiben</td><td>wie oben, andere Aufgaben</td><td>5 bis 7</td></tr>
      <tr><td>EF 2 (12.06.2026)</td><td>Objektorientierte Programmierung (Schulfest)</td><td>8 bis 10</td></tr>
      <tr><td>EF 2 Nachschreiben (19.06.2026)</td><td>wie oben, andere Aufgaben</td><td>11 bis 13</td></tr></table>
      <div class="warn"><b>Wichtig:</b> Die Musterlösungen sind von mir, nicht von der Lehrkraft. Bei den Rover-Aufgaben habe ich die Abläufe nachsimuliert. Dabei nehme ich an, dass der Rover bei (0,1) mit Blick nach rechts startet. Frag bei Abweichungen deinen Lehrer.</div>
      <div class="tip"><b>Warum EF-Klausuren?</b> Sie zeigen den Stil deines Lehrers: Operatoren, Aufgabentypen und Punkte. Der Stoff (Rover, Schulfest) baut auf Q1 auf. Beispielsweise ist Aufgabe 10 schon ein Bubblesort, der im Unterrichtsvorhaben „Suchen und Sortieren" wiederkommt.</div>` }
  ],
  keyPoints: ['Aufgaben erst selbst lösen, dann Musterlösung vergleichen', 'Reihenfolge: Aufgaben 8 bis 13 (OOP, Klassendiagramm, Array) sind für Q1 am nächsten dran', 'Aufgabe 10 und 13 = Bubblesort', 'Musterlösungen sind von Claude, nicht von der Lehrkraft'],
  glossary: [],
  quiz: [],
  exercises: [
    { task: `<p><b>1. EF 1 (19.12.2025), a) Grundlagen der Objektorientierung (8 Punkte):</b> (i) <b>Beschreibe</b> in einem kurzen, zusammenhängenden Text den Zusammenhang zwischen Klasse und Objekt: Was ist eine Klasse? Was ist ein Objekt? Was wird codiert? Nutze Beispiele aus der Marslandschaft. (ii) <b>Stelle</b> eine Objektkarte zu einem Objekt auf der skizzierten Marslandschaft als Zeichnung <b>dar</b>. Das oberste linke Feld hat die Koordinaten (0,0).</p><p class="muted">Die Skizze zeigt (Spalte, Reihe): einen Hügel bei (6,2), einen Hügel bei (5,3), ein Gestein bei (5,4) und eine Marke bei (6,4).</p>`,
      hint: 'Klasse = Bauplan, Objekt = einzelnes Exemplar. Codiert wird die Klasse. Objektkarte: name : Klasse und Attribute mit Werten.',
      solution: `<p><b>(i)</b> Eine <b>Klasse</b> ist der Bauplan für gleichartige Dinge. Sie legt fest, welche Attribute (zum Beispiel die Koordinaten x und y) und Methoden (zum Beispiel <code>fahre()</code>) ihre Objekte haben. Die Klasse <code>Huegel</code> beschreibt alle Hügel der Marslandschaft. Ein <b>Objekt</b> ist ein konkretes Exemplar einer Klasse mit eigenen Attributwerten: Der Hügel bei (6,2) und der Hügel bei (5,3) sind zwei verschiedene Objekte derselben Klasse. <b>Codiert</b> wird die Klasse (der Bauplan). Aus ihr werden bei der Ausführung mit <code>new</code> die Objekte erzeugt.</p>
      <p><b>(ii)</b> Zum Beispiel für den Hügel oben:</p><div class="diag">${uml('huegel1 : Huegel', ['x = 6', 'y = 2'], null, true)}</div>
      <p>Auch möglich: <code>gestein1 : Gestein</code> mit <code>x = 5, y = 4</code> oder <code>marke1 : Marke</code> mit <code>x = 6, y = 4</code>. Wichtig: Name und Klasse unterstrichen, Attribute mit <b>Werten</b>, keine Methoden. Der Hinweis „jedes Objekt speichert auch die eigenen Koordinaten" in der Aufgabe sagt dir, dass x und y die Attribute sind.</p>` },
    { task: `<p><b>2. EF 1 (19.12.2025), b) Behebung von Syntaxfehlern (9 Punkte):</b> Der Compiler kann diese Methode nicht übersetzen. <b>Modifiziere</b> sie, indem du alle <b>9 Syntaxfehler</b> behebst. Schreibe die korrigierte Zeile neu und gib die Zeilennummer an. Hinweis: In einer Zeile können mehrere Fehler auftauchen.</p>${doku}${code(`public foo {\n  while(!markeVorhanden("vorne") {\n    falls (huegelVorhanden("vorne")) {\n      drehe(links);\n    else{\n      fahre()\n      analysiereGestein();\n    }\n  }\n}`)}`,
      hint: 'Rückgabetyp und Klammern, Klammer der while-Bedingung, Parameter der Doku, deutsches Wort, Anführungszeichen, } vor else, Semikolon, Methodenname laut Doku.',
      solution: `<table><tr><th>Zeile</th><th>Korrigiert</th><th>Fehler</th></tr>
      <tr><td>1</td><td><code>public void foo() {</code></td><td>Rückgabetyp <code>void</code> fehlt; Klammern <code>()</code> fehlen (2)</td></tr>
      <tr><td>2</td><td><code>while (!markeVorhanden()) {</code></td><td><code>markeVorhanden</code> hat laut Doku keinen Parameter; schließende Klammer fehlt (2)</td></tr>
      <tr><td>3</td><td><code>if (huegelVorhanden("vorne")) {</code></td><td><code>falls</code> ist kein Java-Wort (1)</td></tr>
      <tr><td>4</td><td><code>drehe("links");</code></td><td>String braucht Anführungszeichen (1)</td></tr>
      <tr><td>5</td><td><code>} else {</code></td><td>die <code>}</code> für den if-Block fehlt (1)</td></tr>
      <tr><td>6</td><td><code>fahre();</code></td><td>Semikolon fehlt (1)</td></tr>
      <tr><td>7</td><td><code>nimmGestein();</code></td><td>Die Methode <code>analysiereGestein</code> gibt es nicht; laut Doku <code>nimmGestein</code> (1)</td></tr></table>
      <p>Das sind 2 + 2 + 1 + 1 + 1 + 1 + 1 = <b>9</b> Fehler. Fertiger Code:</p><pre><code>public void foo() {
  while (!markeVorhanden()) {
    if (huegelVorhanden("vorne")) {
      drehe("links");
    } else {
      fahre();
      nimmGestein();
    }
  }
}</code></pre>` },
    { task: `<p><b>3. EF 1 (19.12.2025), c) Implementierung eines Struktogramms (10 Punkte):</b> Der Algorithmus soll den Rover aus einem Labyrinth führen (das Ende ist mit einer Marke markiert).</p>${NSD(Wh('solange keine Marke vorhanden', Wh('solange kein Hügel vorne', S('fahre geradeaus')) + If('falls Hügel rechts', S('drehe nach links'), S('drehe nach rechts'))))}<p>(i) <b>Implementiere</b> das Struktogramm in ausführbarem Java-Code (gültige Methodendeklaration, Methodenname <code>labyrinth</code>). (ii) <b>Analysiere</b> den Algorithmus: <b>Beschreibe</b>, wie sich der Rover verhält, wenn sich vor ihm ein Hügel befindet.</p>`,
      hint: 'Zwei verschachtelte Schleifen und danach eine Verzweigung innerhalb der äußeren Schleife.',
      solution: `<p><b>(i)</b></p><pre><code>public void labyrinth() {
  while (!markeVorhanden()) {
    while (!huegelVorhanden("vorne")) {
      fahre();
    }
    if (huegelVorhanden("rechts")) {
      drehe("links");
    } else {
      drehe("rechts");
    }
  }
}</code></pre>
      <p><b>(ii)</b> Ist ein Hügel vor dem Rover, bricht die innere Schleife ab: Er fährt nicht weiter, sondern bleibt stehen. Dann prüft die Verzweigung die Seite rechts. Ist dort auch ein Hügel, dreht er sich um 90° nach links, sonst um 90° nach rechts. Danach wird die äußere Schleife wiederholt: Ist keine Marke da, fährt der Rover in der neuen Richtung weiter, bis wieder ein Hügel kommt. Der Rover umgeht Hügel also durch Abbiegen und sucht so die Marke am Ausgang. Die äußere Schleife prüft auf die Marke und beendet das Programm, wenn der Rover dort ankommt.</p>` },
    { task: `<p><b>4. EF 1 (19.12.2025), d) Analyse eines Algorithmus (9 Punkte):</b> Die Methode ist nicht dokumentiert.</p>${roverWorld}${code(`public void wasTueIch() {\n  while (!markeVorhanden()) {\n    if (huegelVorhanden("vorne")) {\n      drehe("links");\n      fahre();\n      drehe("rechts");\n      fahre();\n      nimmGestein();\n      fahre();\n      drehe("rechts");\n      fahre();\n    }\n    if (huegelVorhanden("links")) {\n      fahre();\n      drehe("links");\n      fahre();\n      nimmGestein();\n      fahre();\n      drehe("links");\n      fahre();\n      drehe("rechts");\n    }\n  }\n}`)}<p>(i) <b>Analysiere</b> den Quellcode: <b>Beschreibe</b>, wie sich die Marswelt nach einer Ausführung verändert. Gehe besonders auf die Funktion der Schleifen und Verzweigungen ein. (ii) <b>Beurteile</b>, ob der Rover bei zweifacher Ausführung der Methode die Marke ganz rechts erreicht. <b>Erläutere</b> gegebenenfalls, wie der Code verändert werden könnte, damit sie erreicht wird.</p>`,
      hint: 'Spiele die ersten beiden Durchläufe der Schleife auf der Skizze durch. Wo steht der Rover und in welche Richtung blickt er jeweils?',
      solution: `<p><b>(i)</b> Der Rover läuft die mittlere Reihe entlang und umgeht die Hügel abwechselnd oben und unten, wobei er je ein Gestein aufnimmt.</p>
      <ul><li><b>Die while-Schleife</b> wiederholt den Ablauf, bis der Rover auf einer Marke steht.</li>
      <li><b>Erste Verzweigung</b> (Hügel vorne): Der Rover weicht nach oben aus (links, fahren), fährt nach vorn über den Hügel hinweg und nimmt das Gestein oberhalb des Hügels auf, fährt weiter, biegt rechts ab und steht wieder in der Mitte hinter dem Hügel. Er blickt dann nach unten.</li>
      <li><b>Zweite Verzweigung</b> (Hügel links, also nach dem Abbiegen der nächste Hügel in Fahrtrichtung Osten): Er weicht nach unten aus, nimmt das Gestein unterhalb des Hügels auf, kommt zurück in die mittlere Reihe und blickt wieder nach rechts.</li></ul>
      <p>Pro Durchlauf kommt der Rover so um 4 Felder weiter und nimmt zwei Gesteine auf. <b>Ergebnis nach einer Ausführung:</b> Der Rover steht auf der ersten Marke bei (8,1). Aufgenommen sind die Gesteine bei (1,0), (3,2), (5,0) und (7,2).</p>
      <p><b>(ii)</b> <b>Nein.</b> Nach der ersten Ausführung steht der Rover auf der Marke bei (8,1). Beim zweiten Aufruf ist <code>markeVorhanden()</code> von Anfang an wahr, die Schleife wird gar nicht betreten, der Rover bewegt sich nicht. <b>Änderung 1:</b> Am Ende der Methode die Marke mit <code>entferneMarke();</code> entfernen (oder die Schleife als do-while schreiben, damit sie mindestens einmal läuft).</p>
      <p>Das allein reicht aber nicht: Bei meiner Simulation bleibt der Rover dann bei (10,1) stehen und läuft in eine <b>Endlosschleife</b>, weil bei x = 11 kein Hügel steht und deshalb keine der beiden Verzweigungen mehr greift. <b>Änderung 2:</b> Einen Fall für „weder vorne noch links ein Hügel" ergänzen (zum Beispiel <code>else</code>-Zweig mit <code>fahre();</code> und sauberer Ausrichtung), damit der Rover auch Lücken in der Hügelreihe überwindet.</p>` },
    { task: `<p><b>5. EF 1 Nachschreibtermin, b) Syntaxfehler (9 Punkte):</b> Behebe alle <b>9 Syntaxfehler</b>. Schreibe die korrigierte Zeile neu und gib die Zeilennummer an.</p>${code(`public woo () {\n  solange (!markeVorhanden("vorne") {\n    if(huegelVorhanden(vorne)) {\n      drehe("links")\n    }\n    else{\n      fahre ;\n      sammelGestein();\n    }\n  }`)}`,
      hint: 'Rückgabetyp, deutsches Wort, Parameter der Doku, Klammer der while-Bedingung, Anführungszeichen, zwei Semikolons/Klammern, Methodenname laut Doku, fehlende } am Ende.',
      solution: `<table><tr><th>Zeile</th><th>Korrigiert</th><th>Fehler</th></tr>
      <tr><td>1</td><td><code>public void woo() {</code></td><td>Rückgabetyp <code>void</code> fehlt (1)</td></tr>
      <tr><td>2</td><td><code>while (!markeVorhanden()) {</code></td><td><code>solange</code> ist kein Java-Wort; kein Parameter bei <code>markeVorhanden</code>; schließende Klammer fehlt (3)</td></tr>
      <tr><td>3</td><td><code>if (huegelVorhanden("vorne")) {</code></td><td>String braucht Anführungszeichen (1)</td></tr>
      <tr><td>4</td><td><code>drehe("links");</code></td><td>Semikolon fehlt (1)</td></tr>
      <tr><td>7</td><td><code>fahre();</code></td><td>Klammern fehlen (1)</td></tr>
      <tr><td>8</td><td><code>nimmGestein();</code></td><td><code>sammelGestein</code> gibt es nicht (1)</td></tr>
      <tr><td>11</td><td><code>}</code></td><td>Die schließende Klammer der Methode fehlt (1)</td></tr></table><p>Das sind 1 + 3 + 1 + 1 + 1 + 1 + 1 = <b>9</b> Fehler.</p>` },
    { task: `<p><b>6. EF 1 Nachschreibtermin, c) Analyse (10 Punkte):</b></p>${roverWorld}${code(`public void wasTueIch() {\n  while (!markeVorhanden()) {\n    setzeMarke();\n    if (huegelVorhanden("vorne")) {\n      drehe("rechts");\n      fahre();\n      drehe("links");\n      fahre();\n      nimmGestein();\n      fahre();\n      drehe("links");\n      fahre();\n    } else {\n      fahre();\n      drehe("rechts");\n      fahre();\n      nimmGestein();\n      fahre();\n      drehe("rechts");\n      fahre();\n      drehe("rechts");\n    }\n  }\n  entferneMarke();\n}`)}<p>(i) <b>Analysiere</b> den Quellcode: <b>Beschreibe</b>, wie sich die Marswelt nach einer Ausführung verändert (Funktion der Schleife und Verzweigung). (ii) <b>Beurteile</b>, ob der Rover bei zweifacher Ausführung die Marke ganz rechts erreicht. <b>Erläutere</b> gegebenenfalls eine Änderung.</p>`,
      hint: 'Beachte setzeMarke() in jedem Durchlauf. Verfolge Position und Blickrichtung. Der Rover stoppt, sobald er auf einem Feld steht, auf dem schon eine Marke liegt.',
      solution: `<p><b>(i)</b> Die Schleife wiederholt den Ablauf, bis der Rover auf einer Marke steht. Zu Beginn jedes Durchlaufs setzt er <b>eine Marke an seiner Position</b> (er legt eine Spur). Die Verzweigung entscheidet je nach Hügel vorne:</p>
      <ul><li><b>Hügel vorne (if):</b> Der Rover weicht nach rechts aus, umgeht den Hügel, nimmt ein Gestein auf und geht in neuer Richtung weiter.</li>
      <li><b>Kein Hügel vorne (else):</b> Er fährt ein Feld vor, biegt rechts ab, nimmt ein Gestein auf, fährt weiter und biegt dabei insgesamt dreimal nach rechts ab (das entspricht einmal links).</li></ul>
      <p>Mein Nachvollziehen (Start (0,1) nach Osten): Durchlauf 1 (Hügel vorne): Der Rover endet bei (2,1) mit Blick nach Norden und hat das Gestein bei (1,2) aufgenommen. Durchlauf 2 (kein Hügel): endet bei (4,1) mit Blick nach Westen, Gestein bei (3,0). Durchlauf 3 (Hügel vorne): kommt wieder bei (2,1) heraus, wo er im Durchlauf 2 selbst eine Marke gesetzt hatte. Dort bricht die Schleife ab, <code>entferneMarke()</code> löscht die Marke bei (2,1). <b>Veränderung der Welt:</b> Marken bei (0,1) und (4,1) wurden zusätzlich gesetzt, eine Marke wurde wieder entfernt, einzelne Gesteine sind weg. Der Rover erreicht die Marke bei (8,1) nicht.</p>
      <p><b>(ii)</b> <b>Nein.</b> Der Rover läuft im linken Teil der Welt in einer kleinen Schleife und stoppt an seiner <b>eigenen</b> Marke. Auch bei einer zweiten Ausführung bleibt er in diesem Bereich (laut meiner Simulation landet er danach bei (0,1)). Änderung: <code>setzeMarke()</code> aus der Schleife herausnehmen, sodass er nur auf echten Marken anhält, und die Ausrichtung nach dem else-Zweig so ändern, dass der Rover immer wieder nach rechts (Osten) blickt.</p>
      <p class="muted">Dieses Ergebnis hängt davon ab, wie ich die Welt aus dem Bild gelesen habe. Deine Lehrkraft kann dir die offizielle Lösung zeigen.</p>` },
    { task: `<p><b>7. EF 1 Nachschreibtermin, d) Algorithmen entwickeln (10 Punkte):</b> Der Algorithmus soll die abgebildete Veränderung der Marswelt umsetzen (Ausgangssituation → Endsituation).</p><p class="muted">Welt (12 Spalten, 5 Reihen): Hügel in Reihe 1 bei x = 2, 3, 4, 6, 8, 9 und in Reihe 3 bei x = 3, 6, 7. Der Rover steht bei (1,2) mit Blick nach rechts. Gesteine in Reihe 2 bei x = 2, 3, 5, 7. Marke bei (10,2). Endsituation: Gesteine bei x = 3 und x = 7 sind weg, der Rover steht bei (10,2).</p><p>(i) <b>Beschreibe</b>, welche Bedingung erfüllt sein muss, damit ein Gestein entfernt wird. (ii) <b>Entwickle</b> einen Algorithmus für die Veränderung und <b>stelle</b> ihn als Struktogramm <b>dar</b>.</p>`,
      hint: 'Schau, bei welchen Gesteinen ein Hügel unterhalb (rechts vom Rover, wenn er nach Osten blickt) liegt. Vergleiche mit den entfernten und den bleibenden Gesteinen.',
      solution: `<p><b>(i)</b> Ein Gestein wird genau dann aufgenommen, wenn <b>direkt unter ihm (auf der rechten Seite des Rovers, der nach rechts blickt) ein Hügel steht</b>. Bei x = 3 und x = 7 ist unten ein Hügel (die Gesteine werden entfernt). Bei x = 2 und x = 5 ist unten keiner (beide Gesteine bleiben). Hügel oben spielen keine Rolle: Bei x = 2 liegt oben einer, und das Gestein bleibt trotzdem.</p>
      <p><b>(ii)</b> Der Rover läuft bis zur Marke nach rechts. Auf jedem Feld prüft er die Bedingung:</p>
      ${NSD(Wh('solange keine Marke vorhanden', If('falls Gestein vorhanden UND Hügel rechts', S('nimm Gestein'), S('(nichts)')) + S('fahre')))}
      <pre><code>public void aufraeumen() {
  while (!markeVorhanden()) {
    if (gesteinVorhanden() &amp;&amp; huegelVorhanden("rechts")) {
      nimmGestein();
    }
    fahre();
  }
}</code></pre><p>Ergebnis (nachsimuliert): Der Rover endet bei (10,2), übrig bleiben die Gesteine bei x = 2 und x = 5.</p>` },
    { task: `<p><b>8. EF 2 (12.06.2026), a) Klassendiagramme (7 + 7 + 9 + 3 Punkte):</b> Das FRG veranstaltet ein Sommerfest mit Ständen. <b>Jeder Stand bietet genau ein Produkt an</b>. Ein Produkt hat einen Namen und einen Preis. Das Klassendiagramm zeigt den ersten Entwurf:</p>${ef2Class}<p>(i) <b>Beschreibe</b> den Aufbau des Programms anhand des Diagramms (alle Attribute und die Beziehung der Klassen). (ii) <b>Modifiziere</b> das Diagramm: Ergänze die Klasse <code>Produkt</code> mit den privaten Attributen <code>name</code> und <code>preis</code> (passende Datentypen und Methoden). Die Klasse <code>Stand</code> verwaltet genau ein Produkt mit dem Bezeichner <code>produkt</code>. (iii) <b>Implementiere</b> die Klasse <code>Schulfest</code> in Java (Methodenrümpfe dürfen leer bleiben). (iv) <b>Erläutere</b>, wie man weitere Stände innerhalb von <code>Schulfest</code> verwalten könnte (Änderungen im Diagramm und im Quellcode).</p>`,
      hint: '(iv) Wenn st1 bis st4 nicht reichen: Array. (ii) Neuer Pfeil von Stand zu Produkt mit dem Bezeichner „- produkt".',
      solution: `<p><b>(i)</b> Das Programm besteht aus den Klassen <code>Schulfest</code> und <code>Stand</code>. Ein Schulfest-Objekt <b>verwaltet vier Stand-Objekte</b> über die Attribute <code>st1</code>, <code>st2</code>, <code>st3</code> und <code>st4</code> (gerichtete Assoziation, hat-Beziehung, Pfeil von Schulfest zu Stand). Schulfest hat keine eigenen Attribute, nur den Konstruktor und die Methoden <code>berechneMaxBesucher(): int</code>, <code>berechneEinnahmen(): double</code> und <code>fuegeStandHinzu(st: Stand)</code>. Ein Stand hat die privaten Attribute <code>name</code> (String), <code>einnahmen</code> (double) und <code>maxBesucher</code> (int). Der Konstruktor <code>Stand(pName, pMaxBesucher)</code> setzt Name und maximale Besucherzahl. Dazu gibt es Methoden zum Verkaufen, Abfragen (<code>gibName</code>, <code>gibEinnahmen</code>, <code>gibMaxBesucher</code>) und Setzen (<code>setzeMaxBesucher</code>).</p>
      <p><b>(ii)</b></p><div class="diag">${uml('Stand', ['- name: String', '- einnahmen: double', '- maxBesucher: int', '- produkt: Produkt'], ['...'])}<span style="display:inline-block;vertical-align:top;margin-top:20px"> - produkt &rarr; </span>${uml('Produkt', ['- name: String', '- preis: double'], ['+ Produkt(pName: String, pPreis: double)', '+ gibName(): String', '+ gibPreis(): double', '+ setzePreis(pPreis: double)'])}</div><p>Der Pfeil <code>- produkt</code> zeigt von <code>Stand</code> zu <code>Produkt</code>. Im Diagramm kann das Attribut <code>produkt</code> im Stand auch weggelassen werden, wenn der Pfeil mit dem Bezeichner beschriftet ist.</p>
      <p><b>(iii)</b></p><pre><code>public class Schulfest
{
  private Stand st1, st2, st3, st4;

  public Schulfest() { }
  public int berechneMaxBesucher() { }
  public double berechneEinnahmen() { }
  public void fuegeStandHinzu(Stand st) { }
}</code></pre>
      <p><b>(iv)</b> Statt vier einzelner Attribute braucht man ein <b>Array von Stand-Referenzen</b>. <i>Diagramm:</i> Aus den Beschriftungen <code>st1</code> bis <code>st4</code> wird ein Attribut <code>- staende: Stand[ ]</code>. <i>Code:</i> <code>private Stand[] staende;</code>, im Konstruktor <code>staende = new Stand[20];</code> (Platz für 20 Stände). In <code>fuegeStandHinzu</code> wird der Stand in den ersten freien Platz eingetragen (mit einem Zähler, zum Beispiel <code>staende[anzahl] = st; anzahl++;</code>). Bei den Berechnungen läuft eine <code>for</code>-Schleife über alle belegten Plätze. So kann man beliebig viele Stände ohne neue Attribute verwalten.</p>` },
    { task: `<p><b>9. EF 2 (12.06.2026), b) Syntaxfehler (16 Punkte):</b> Die Methode <code>verkaufen</code> der Klasse <code>Stand</code> (siehe Diagramm in Aufgabe 8) soll implementiert werden. Behebe alle <b>8 Syntaxfehler</b> (Zeile neu schreiben, Zeilennummer angeben). Beachte die Modellierung im Diagramm und die Console-Dokumentation (<code>readInt()</code>, <code>readDouble()</code>, <code>println(String)</code>). Der Stand verwaltet ein <code>produkt</code> mit der Methode <code>gibPreis()</code>.</p>${code(`public verkaufen(pAnzahl) {\n  int anzahl = Console.readint();\n  if (pAnzahl <= 0 ODER anzahl <= 0) {\n    Console.println("Die Verkaufsanzahl muss positiv sein!")\n  } else {\n    double verkaufspreis = produkt.gibPreis;\n    erloes = verkaufspreis * pAnzahl;\n    return einnahmen += erloes;\n  }\n}`)}`,
      hint: 'Rückgabetyp und Parametertyp fehlen. Console-Methode laut Doku. ODER gibt es nicht. Semikolon. Getter braucht (). Variable deklarieren. void-Methode darf nichts zurückgeben.',
      solution: `<table><tr><th>Zeile</th><th>Korrigiert</th><th>Fehler</th></tr>
      <tr><td>1</td><td><code>public void verkaufen(int pAnzahl) {</code></td><td><code>void</code> fehlt; Datentyp <code>int</code> beim Parameter fehlt (2)</td></tr>
      <tr><td>2</td><td><code>int anzahl = Console.readInt();</code></td><td>Es heißt <code>readInt</code> mit großem I (1)</td></tr>
      <tr><td>3</td><td><code>if (pAnzahl &lt;= 0 || anzahl &lt;= 0) {</code></td><td><code>ODER</code> gibt es nicht, in Java <code>||</code> (1)</td></tr>
      <tr><td>4</td><td><code>Console.println("...");</code></td><td>Semikolon fehlt (1)</td></tr>
      <tr><td>6</td><td><code>double verkaufspreis = produkt.gibPreis();</code></td><td>Klammern beim Methodenaufruf fehlen (1)</td></tr>
      <tr><td>7</td><td><code>double erloes = verkaufspreis * pAnzahl;</code></td><td><code>erloes</code> ist nicht deklariert (1)</td></tr>
      <tr><td>8</td><td><code>einnahmen += erloes;</code></td><td>Eine <code>void</code>-Methode darf nichts zurückgeben, das <code>return</code> muss weg (1)</td></tr></table><p>Das sind 2 + 1 + 1 + 1 + 1 + 1 + 1 = <b>8</b> Fehler.</p>` },
    { task: `<p><b>10. EF 2 (12.06.2026), c) Analyse eines Algorithmus (7 + 8 + 4 Punkte):</b> Methode der Klasse <code>Schulfest</code> (Kommentare fehlen):</p>${code(`public void wasTueIch() {\n  boolean getauscht = true;\n  while (getauscht) {\n    getauscht = false;\n    if (st1.gibEinnahmen() > st2.gibEinnahmen()) {\n      Stand tmp = st1;\n      st1 = st2;\n      st2 = tmp;\n      getauscht = true;\n    }\n    if (st2.gibEinnahmen() > st3.gibEinnahmen()) {\n      Stand tmp = st2;\n      st2 = st3;\n      st3 = tmp;\n      getauscht = true;\n    }\n    if (st3.gibEinnahmen() > st4.gibEinnahmen()) {\n      Stand tmp = st3;\n      st3 = st4;\n      st4 = tmp;\n      getauscht = true;\n    }\n  }\n  Console.println("1.:" + st1.getName() + "; 2.:" + st2.getName() + "; 3.:" + st3.getName() + "; 4.:" + st4.getName());\n}`)}<p>(i) <b>Analysiere</b> die if-Verzweigung (Zeilen 5 bis 10): <b>Beschreibe</b> die Funktion jeder Zeile. (ii) Fülle die Tabelle mit den Attributwerten nach jedem Schleifendurchgang aus, <b>gib</b> die Konsolenausgabe <b>an</b> und <b>erläutere</b> die Bedeutung der Methode. Startwerte: st1 = Kuchen 20.5, st2 = Getraenke 44.5, st3 = Fussball 10.0, st4 = Pizza 18.0. (iii) <b>Erläutere</b> die Bedeutung der Variable <code>getauscht</code>.</p>`,
      hint: 'Vertauschen mit tmp: Wer steht danach wo? Die Tabelle zeigt nach jedem Durchgang der while-Schleife (alle drei if-Abfragen), welcher Stand in st1 bis st4 steht.',
      solution: `<p><b>(i)</b> Zeile 5: Es wird geprüft, ob st1 mehr Einnahmen hat als st2. Wenn ja, wird getauscht: Zeile 6 merkt sich die Referenz auf st1 in der Hilfsreferenz <code>tmp</code>. Zeile 7: st1 zeigt jetzt auf das Objekt von st2. Zeile 8: st2 zeigt auf das alte st1 (über tmp). Zeile 9: <code>getauscht</code> wird auf true gesetzt, weil sich etwas verändert hat. Es werden nur die <b>Referenzen</b> vertauscht, die Objekte selbst bleiben unverändert.</p>
      <p><b>(ii)</b> Tabelle (name, einnahmen):</p><table><tr><th>Durchgang</th><th>st1</th><th>st2</th><th>st3</th><th>st4</th></tr>
      <tr><td>0</td><td>Kuchen 20.5</td><td>Getraenke 44.5</td><td>Fussball 10.0</td><td>Pizza 18.0</td></tr>
      <tr><td>1</td><td>Kuchen 20.5</td><td>Fussball 10.0</td><td>Pizza 18.0</td><td>Getraenke 44.5</td></tr>
      <tr><td>2</td><td>Fussball 10.0</td><td>Pizza 18.0</td><td>Kuchen 20.5</td><td>Getraenke 44.5</td></tr>
      <tr><td>3</td><td>Fussball 10.0</td><td>Pizza 18.0</td><td>Kuchen 20.5</td><td>Getraenke 44.5</td></tr></table>
      <p>Durchgang 1: Getraenke (44.5) wandert über Fussball und Pizza nach hinten. Durchgang 2: Kuchen (20.5) rutscht an die Stelle hinter Pizza. Durchgang 3: Es wird nichts mehr getauscht, <code>getauscht</code> bleibt false, die Schleife endet. <b>Konsolenausgabe:</b> <code>1.:Fussball; 2.:Pizza; 3.:Kuchen; 4.:Getraenke</code>. <b>Bedeutung:</b> Die Methode <b>sortiert die Stände nach ihren Einnahmen aufsteigend</b> (kleinste Einnahmen zuerst, größte zuletzt) und gibt die Rangliste aus (Bubblesort).</p>
      <p><b>(iii)</b> <code>getauscht</code> merkt sich, ob in einem Durchgang getauscht wurde. Bleibt sie false, ist alles sortiert, und die while-Schleife endet. Solange sie true ist, könnte noch etwas falsch stehen und ein weiterer Durchgang ist nötig.</p>` },
    { task: `<p><b>11. EF 2 Nachschreibtermin (19.06.2026), a) Klassendiagramme (7 + 7 + 9 + 3 Punkte):</b> Gleiche Situation wie Aufgabe 8, aber: <b>Jeder Stand wird von genau einer Schulklasse organisiert</b>. Eine Schulklasse hat einen eindeutigen Bezeichner (zum Beispiel „6A": Jahrgang und Buchstabe) und es ist bekannt, wie viele Schüler zu ihr gehören. Das Klassendiagramm (Schulfest, Stand) ist dasselbe wie in Aufgabe 8.</p><p>(i) <b>Beschreibe</b> den Aufbau. (ii) <b>Modifiziere</b> das Diagramm: Ergänze eine Klasse <code>Schulklasse</code> mit privaten Attributen <code>bezeichner</code> und <code>anzahlSchueler</code>. Die Klasse <code>Schulklasse</code> verwaltet <b>genau ein Objekt</b> vom Typ <code>Stand</code> mit dem Bezeichner <code>stand</code>. (iii) <b>Implementiere</b> <code>Schulfest</code>. (iv) <b>Erläutere</b>, wie man weitere Stände verwalten kann.</p>`,
      hint: 'Der Unterschied zu Aufgabe 8: Der Pfeil geht von Schulklasse zu Stand (nicht von Stand zu Produkt). (i), (iii) und (iv) sind wie bei Aufgabe 8.',
      solution: `<p><b>(i), (iii), (iv):</b> wie bei Aufgabe 8.</p>
      <p><b>(ii)</b></p><div class="diag">${uml('Schulklasse', ['- bezeichner: String', '- anzahlSchueler: int', '- stand: Stand'], ['+ Schulklasse(pBezeichner: String, pAnzahl: int)', '+ gibBezeichner(): String', '+ gibAnzahlSchueler(): int', '+ setzeAnzahlSchueler(pAnzahl: int)'])}<span style="display:inline-block;vertical-align:top;margin-top:20px"> - stand &rarr; </span>${uml('Stand', ['- name: String', '- einnahmen: double', '- maxBesucher: int'], ['...'])}</div>
      <p>Der Bezeichner ist ein <b>String</b> (wegen des Buchstabens, zum Beispiel "6A"), die Schülerzahl ein <b>int</b>. Der Pfeil <code>- stand</code> geht von Schulklasse zu Stand. Dabei gilt: Eine Schulklasse <i>hat</i> genau einen Stand (hat-Beziehung, offener Pfeil, keine Vererbung).</p>` },
    { task: `<p><b>12. EF 2 Nachschreibtermin, b) Syntaxfehler (16 Punkte):</b> Methode <code>fuegeStandHinzu</code> der Klasse <code>Schulfest</code> (siehe Diagramm). Behebe alle <b>8 Syntaxfehler</b>.</p>${code(`public void fuegeStandHinzu(Stand st) {\n  Console.println(Wurde bisher etwas verkauft? Und zu welchem Preis?);\n  int anzahl = Console.readInt;\n  double preis = Console.readdouble();\n  if (anzahl > 0 UND preis > 0) {\n    double einnahmen = anzahl * preis\n    st.verkaufen(einnahmen);\n  }\n  Stand st1 = st;`)}`,
      hint: 'String ohne Anführungszeichen, Methoden ohne () oder falsch geschrieben, UND, Semikolon, falscher Datentyp bei verkaufen (laut Diagramm: int), Attribut neu deklariert, Methode nicht geschlossen.',
      solution: `<table><tr><th>Zeile</th><th>Korrigiert</th><th>Fehler</th></tr>
      <tr><td>2</td><td><code>Console.println("Wurde bisher etwas verkauft? Und zu welchem Preis?");</code></td><td>Text braucht Anführungszeichen (1)</td></tr>
      <tr><td>3</td><td><code>int anzahl = Console.readInt();</code></td><td>Klammern fehlen (1)</td></tr>
      <tr><td>4</td><td><code>double preis = Console.readDouble();</code></td><td>Es heißt <code>readDouble</code> (1)</td></tr>
      <tr><td>5</td><td><code>if (anzahl &gt; 0 &amp;&amp; preis &gt; 0) {</code></td><td><code>UND</code> gibt es in Java nicht (1)</td></tr>
      <tr><td>6</td><td><code>double einnahmen = anzahl * preis;</code></td><td>Semikolon fehlt (1)</td></tr>
      <tr><td>7</td><td><code>st.verkaufen(anzahl);</code></td><td>Laut Diagramm hat <code>verkaufen</code> einen <b>int</b>-Parameter (Anzahl), kein double (1)</td></tr>
      <tr><td>9</td><td><code>st1 = st;</code></td><td><code>st1</code> ist ein Attribut laut Diagramm und darf nicht als lokale Variable neu deklariert werden (1)</td></tr>
      <tr><td>10</td><td><code>}</code></td><td>Schließende Klammer der Methode fehlt (1)</td></tr></table><p>Das sind <b>8</b> Fehler.</p>` },
    { task: `<p><b>13. EF 2 Nachschreibtermin, c) Analyse (7 + 8 + 4 Punkte):</b> Die Methode <code>wasTueIch</code> ist wie in Aufgabe 10, aber mit <code>&lt;</code> statt <code>&gt;</code> in den drei Vergleichen. Startwerte: st1 = Kuchen 20.5, st2 = Getraenke 10.0, st3 = Fussball 18.0, st4 = Pizza 44.5. Lösungsschritte (i) bis (iii) wie in Aufgabe 10.</p>`,
      hint: 'Jetzt wird getauscht, wenn der linke Stand weniger Einnahmen hat als der rechte. Wie ist am Ende sortiert?',
      solution: `<table><tr><th>Durchgang</th><th>st1</th><th>st2</th><th>st3</th><th>st4</th></tr>
      <tr><td>0</td><td>Kuchen 20.5</td><td>Getraenke 10.0</td><td>Fussball 18.0</td><td>Pizza 44.5</td></tr>
      <tr><td>1</td><td>Kuchen 20.5</td><td>Fussball 18.0</td><td>Pizza 44.5</td><td>Getraenke 10.0</td></tr>
      <tr><td>2</td><td>Kuchen 20.5</td><td>Pizza 44.5</td><td>Fussball 18.0</td><td>Getraenke 10.0</td></tr>
      <tr><td>3</td><td>Pizza 44.5</td><td>Kuchen 20.5</td><td>Fussball 18.0</td><td>Getraenke 10.0</td></tr></table>
      <p>Nach Durchgang 3 steht schon alles richtig. Weil in diesem Durchgang aber noch getauscht wurde (<code>getauscht = true</code>), folgt ein <b>4. Durchgang ohne Tausch</b>. Erst dann endet die Schleife. Die Tabelle in der Klausur hat nur 3 Zeilen. Schreib den 4. Durchgang deshalb in der Begründung dazu. <b>Konsolenausgabe:</b> <code>1.:Pizza; 2.:Kuchen; 3.:Fussball; 4.:Getraenke</code>. <b>Bedeutung:</b> Die Stände werden nach Einnahmen <b>absteigend</b> sortiert (größte zuerst). (iii) wie bei Aufgabe 10.</p>` }
  ]
});
})();
