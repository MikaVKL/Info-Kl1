// Grundlagen-Thema – von Claude ergänzt: Vorwissen für "Suchen und Sortieren auf linearen Datenstrukturen" (Unterrichtsvorhaben I).
window.TOPICS.push({
  id: 'arrays-schleifen', week: 0, title: 'Arrays, Schleifen & Bedingungen',
  summary: 'Werkzeug für Suchen und Sortieren: Felder, for-/while-Schleifen, if, Vergleiche.',
  sections: [
    { title: 'Warum das wichtig ist', html: '<p>Das erste große Unterrichtsvorhaben heißt <b>„Suchen und Sortieren auf linearen Datenstrukturen"</b>. Eine lineare Datenstruktur ist z. B. ein <b>Array</b> (Feld): viele gleichartige Werte hintereinander. Um darin zu suchen oder zu sortieren, brauchst du <b>Schleifen</b>, <b>Bedingungen</b> und <b>Indizes</b>.</p>' },
    { title: 'Arrays', html: `<pre><code>int[] zahlen = new int[5];        // 5 Plätze, alle 0
zahlen[0] = 7;                     // erster Platz hat Index 0!
zahlen[4] = 3;                     // letzter Platz hat Index 4
int[] daten = {4, 8, 15, 16, 23};  // direkt füllen
int n = daten.length;              // Länge = 5 (ohne Klammern!)</code></pre>
      <table><tr><th>Index</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td></tr><tr><th>Wert</th><td>4</td><td>8</td><td>15</td><td>16</td><td>23</td></tr></table>
      <div class="warn"><b>Klassiker:</b> Der Index läuft von <code>0</code> bis <code>length - 1</code>. Zugriff auf <code>daten[5]</code> gibt eine <i>ArrayIndexOutOfBoundsException</i>.</div>` },
    { title: 'Bedingungen (if)', html: `<pre><code>if (x &gt; 10) {
    ...
} else if (x == 10) {
    ...
} else {
    ...
}</code></pre>
      <p>Vergleiche: <code>==</code> gleich, <code>!=</code> ungleich, <code>&lt;</code> <code>&gt;</code> <code>&lt;=</code> <code>&gt;=</code>. Verknüpfen mit <code>&amp;&amp;</code> (und), <code>||</code> (oder), <code>!</code> (nicht).</p>
      <div class="warn"><code>=</code> ist Zuweisung, <code>==</code> ist Vergleich! Texte vergleicht man mit <code>text.equals("abc")</code>, nicht mit ==.</div>` },
    { title: 'Schleifen', html: `<p><b>for-Schleife</b> – wenn du weißt, wie oft:</p>
      <pre><code>for (int i = 0; i &lt; daten.length; i++) {
    System.out.println(daten[i]);
}</code></pre>
      <p>Ablauf: Start (<code>i = 0</code>) → Bedingung prüfen → Rumpf ausführen → <code>i++</code> → wieder prüfen …</p>
      <p><b>while-Schleife</b> – solange eine Bedingung gilt:</p>
      <pre><code>int i = 0;
while (i &lt; daten.length &amp;&amp; daten[i] != 16) {
    i++;
}</code></pre>` },
    { title: 'Typisches Muster: Maximum suchen', html: `<pre><code>int max = daten[0];
for (int i = 1; i &lt; daten.length; i++) {
    if (daten[i] &gt; max) {
        max = daten[i];
    }
}</code></pre><p>Genau solche „Durchlaufen und vergleichen"-Muster sind die Grundlage von <b>linearer Suche</b> und allen Sortierverfahren. Eine Vertauschung braucht immer eine <b>Hilfsvariable</b>:</p>
      <pre><code>int hilf = daten[i];
daten[i] = daten[j];
daten[j] = hilf;</code></pre>` }
  ],
  keyPoints: ['Index startet bei 0, letzter Index = length - 1', 'daten.length ohne Klammern', '= zuweisen, == vergleichen', 'Vertauschen nur mit Hilfsvariable', 'Muster: for-Schleife über alle Indizes + if zum Vergleichen'],
  glossary: [
    { term: 'Array (Feld)', def: 'Datenstruktur fester Größe mit gleichartigen Elementen, angesprochen über einen Index.' },
    { term: 'Index', def: 'Position eines Elements im Array; beginnt bei 0.' },
    { term: 'for-Schleife', def: 'Wiederholung mit Zählvariable; sinnvoll, wenn die Anzahl der Durchläufe bekannt ist.' },
    { term: 'while-Schleife', def: 'Wiederholt, solange eine Bedingung wahr ist.' },
    { term: 'Hilfsvariable', def: 'Zwischenspeicher, um zwei Werte zu vertauschen ohne einen zu überschreiben.' },
    { term: 'Lineare Datenstruktur', def: 'Elemente sind der Reihe nach angeordnet (z. B. Array, Liste).' }
  ],
  quiz: [
    { q: 'Ein Array hat 6 Elemente. Welcher ist der letzte gültige Index?', options: ['6', '5', '7', '0'], answer: 1, explain: 'Indizes 0 bis 5.' },
    { q: 'Wie erhält man die Länge von <code>int[] a</code>?', options: ['a.length()', 'a.size', 'a.length', 'length(a)'], answer: 2, explain: 'Bei Arrays ohne Klammern: a.length.' },
    { q: 'Was gibt <code>int[] a = {2,4,6}; a[1]</code> zurück?', options: ['2', '4', '6', 'Fehler'], answer: 1, explain: 'Index 1 ist das zweite Element.' },
    { q: 'Wie tauscht man <code>a[i]</code> und <code>a[j]</code> korrekt?', options: ['a[i]=a[j]; a[j]=a[i];', 'Mit einer Hilfsvariable', 'a[i]<->a[j]', 'a.swap(i,j)'], answer: 1, explain: 'Sonst geht ein Wert verloren.' },
    { q: 'Wie oft läuft <code>for (int i=0; i&lt;5; i++)</code>?', options: ['4', '5', '6', 'unendlich'], answer: 1, explain: 'i = 0,1,2,3,4.' },
    { q: 'Was vergleicht <code>==</code>?', options: ['weist zu', 'prüft auf Gleichheit', 'prüft auf Ungleichheit', 'addiert'], answer: 1, explain: '= ist Zuweisung, == Vergleich.' }
  ],
  exercises: [
    { task: '<p>Schreibe eine Methode <code>int summe(int[] a)</code>, die die Summe aller Elemente berechnet.</p>', hint: 'Startwert 0, dann alle Indizes durchlaufen.', solution: `<pre><code>public int summe(int[] a) {
    int s = 0;
    for (int i = 0; i &lt; a.length; i++) {
        s = s + a[i];
    }
    return s;
}</code></pre>` },
    { task: '<p>Gib den Index der ersten 16 in <code>{4, 8, 15, 16, 23}</code> an und beschreibe, wie man ihn per Schleife findet.</p>', hint: 'Von links nach rechts vergleichen.', solution: '<p><b>Index 3.</b> Schleife von i = 0 aufwärts; sobald <code>daten[i] == 16</code>, Index i zurückgeben (das ist die <b>lineare Suche</b>). Wird nichts gefunden, z. B. −1 zurückgeben.</p>' }
  ]
});
