// Quelle: "Dokumentation zur Verwendung im Zentralabitur Informatik (GK/LK)", Oktober 2021, QUA-LiS NRW. Zusammenfassung von Claude.
// Zeigt, was in Klausuren als bekannt vorausgesetzt wird. Stack und List kommen im Unterricht erst noch.
(function () {
const uml = (name, attrs, meths, obj) => `<div class="uml${obj ? ' obj' : ''}"><div>${name}</div><div>${attrs.join('<br>') || '&nbsp;'}</div>${meths ? `<div>${meths.join('<br>') || '&nbsp;'}</div>` : ''}</div>`;
window.TOPICS.push({
  id: 'abi-nachschlagewerk', week: 0, title: 'Nachschlagewerk: Diagramme, Java, Stack & List',
  summary: 'Kurzfassung der offiziellen Zentralabitur-Dokumentation: Diagrammarten, Java-Elemente, Klassen Stack und List.',
  sections: [
    { title: 'Klassendiagramm: zwei Arten', html: `<table><tr><th></th><th>Entwurfsdiagramm</th><th>Implementationsdiagramm</th></tr>
      <tr><td>Wann?</td><td>Erster grober Entwurf</td><td>Präzisierung, orientiert an Java</td></tr>
      <tr><td>Inhalt</td><td>Klassen + Beziehungen mit <b>Multiplizitäten</b>; Vererbung und gerichtete Assoziation; ggf. wesentliche Attribute/Methoden</td><td>Konkrete <b>Java-Datentypen</b> bei Attributen, Methoden mit Parametern und Typen; konkrete Datenstrukturen mit Typparameter</td></tr>
      <tr><td>Datentypen</td><td>programmiersprachenunabhängig: Zahl, Text, Wahrheitswert, Datensammlung&lt;…&gt;</td><td>int, double, String, boolean, Queue&lt;Patient&gt; …</td></tr>
      <tr><td>Multiplizitäten</td><td>ja (1, 0..1, 0..*, 1..*)</td><td>nein, stattdessen konkrete Bezeichner und Datenstrukturen</td></tr>
      <tr><td>Abitur-Klassen (List, BinaryTree …)</td><td>–</td><td>ohne Attribute und Methoden angegeben</td></tr></table>
      <p>Die Bezeichner der Attribute, durch die Assoziationen realisiert werden, stehen im Implementationsdiagramm <b>an den Pfeilen</b> (so wie bei dir <code>- queue</code>, <code>- head, - tail</code>, <code>- content</code>).</p>` },
    { title: 'Notation im Klassendiagramm', html: `<ul><li><b>Sichtbarkeit:</b> <code>+</code> public, <code>-</code> private.</li>
      <li><b>Abstrakte Klasse</b> (kein Objekt erzeugbar): <code>{abstract}</code> rechtsbündig unter dem Klassennamen. <b>Abstrakte Methoden</b> (ohne Implementierung): <i>kursiv</i>, handschriftlich mit <u>Wellenlinie</u>.</li>
      <li><b>Generische Klasse:</b> Typparameter und seine Belegung in einem <b>gestrichelt umrandeten Feld</b> oben rechts an der Klasse (bei dir: <code>Patient</code> an Queue).</li>
      <li><b>Interface (Schnittstelle):</b> enthält nur Methodendeklarationen. Die <b>Implementierung</b> zeigt eine <b>gestrichelte Linie mit geschlossener, nicht ausgefüllter Pfeilspitze</b>.</li>
      <li><b>Vererbung:</b> Pfeil mit geschlossener, hohler Spitze zur Oberklasse. Die Unterklasse hat alle <b>public</b>-Attribute und -Methoden der Oberklasse, kann ergänzen oder Methoden <b>überschreiben</b>.</li>
      <li><b>Gerichtete Assoziation A → B:</b> Objekte der Klasse A können Objekte der Klasse B verwalten; mit <b>Multiplizität</b>: 1 genau ein Objekt, 0..1 kein oder ein, 0..* beliebig viele, 1..* mindestens ein.</li></ul>
      <div class="diag">${uml('Wurm', [], [])}<span style="display:inline-block;vertical-align:top;margin-top:20px"> 1 → 1..* </span>${uml('Wurmglied', [], [])}</div>
      <p class="muted">Beispiel aus dem Dokument: Ein Wurm steht zu mindestens einem und beliebig vielen Wurmgliedern in Beziehung.</p>` },
    { title: 'Java-Elemente, die vorausgesetzt werden', html: `<p><b>Sprachelemente:</b> Klasse, Assoziation, Vererbung, Schnittstelle (Interface), Attribute und Methoden (mit Parametern und Rückgabewerten), Wertzuweisung, Verzweigungen (<code>if</code>, <code>if … else</code>, <code>switch</code>), Schleifen (<code>while</code>, <code>for</code>, <code>do … while</code>).</p>
      <table><tr><th>Typ</th><th>Operationen</th><th>Methoden</th></tr>
      <tr><td><code>int</code></td><td><code>+ - * / %</code>, <code>&lt; &gt; &lt;= &gt;= == !=</code></td><td><code>Math.abs, Math.min, Math.max</code>; <code>Integer.MIN_VALUE/MAX_VALUE</code>; <code>Integer.toString(i)</code>, <code>Integer.parseInt(s)</code></td></tr>
      <tr><td><code>double</code></td><td><code>+ - * /</code>, Vergleiche</td><td><code>Math.abs/min/max/sqrt/pow/round/random</code>; <code>Double.parseDouble(s)</code>, <code>Double.isNaN(a)</code></td></tr>
      <tr><td><code>boolean</code></td><td><code>&amp;&amp; || !</code>, <code>== !=</code></td><td><code>Boolean.parseBoolean(s)</code></td></tr>
      <tr><td><code>char</code></td><td>Vergleiche</td><td><code>Character.toString(c)</code></td></tr>
      <tr><td><code>String</code></td><td>–</td><td><code>length()</code>, <code>indexOf(String)</code>, <code>substring(begin)</code>, <code>substring(begin, end)</code>, <code>charAt(index)</code>, <code>equals(Object)</code>, <code>compareTo(String)</code>, <code>startsWith(String)</code></td></tr></table>
      <p><b>Statische Strukturen:</b> ein- und zweidimensionale Felder (Arrays) von einfachen Datentypen und von Objekten.</p>
      <div class="tip"><code>Math.random()</code> liefert eine Zufallszahl (double) von 0 bis unter 1 – kennst du aus dem Sprite-Arbeitsblatt.</div>` },
    { title: 'Klasse Queue (kurz)', html: `<p>FIFO. Alle Methoden haben konstante Laufzeit. Siehe Thema „Queue".</p>
      <table><tr><th>Methode</th><th>Wirkung</th></tr><tr><td><code>Queue()</code></td><td>leere Schlange</td></tr><tr><td><code>boolean isEmpty()</code></td><td>true, wenn leer</td></tr><tr><td><code>void enqueue(ContentType)</code></td><td>hinten anhängen (null: keine Änderung)</td></tr><tr><td><code>void dequeue()</code></td><td>erstes Objekt entfernen (leer: keine Änderung)</td></tr><tr><td><code>ContentType front()</code></td><td>erstes Objekt, unverändert (leer: null)</td></tr></table>` },
    { title: 'Klasse Stack (Stapel) – kommt noch', html: `<p>Nach dem <b>LIFO</b>-Prinzip (<i>Last In, First Out</i>): das zuletzt abgelegte Objekt wird zuerst wieder entnommen. Alle Methoden mit konstanter Laufzeit. Denk an einen Tellerstapel.</p>
      <table><tr><th>Methode</th><th>Wirkung</th></tr><tr><td><code>Stack()</code></td><td>leerer Stapel</td></tr><tr><td><code>boolean isEmpty()</code></td><td>true, wenn leer</td></tr><tr><td><code>void push(ContentType)</code></td><td>Objekt oben auflegen (null: keine Änderung)</td></tr><tr><td><code>void pop()</code></td><td>oberstes Objekt entfernen (leer: keine Änderung)</td></tr><tr><td><code>ContentType top()</code></td><td>oberstes Objekt, unverändert (leer: null)</td></tr></table>
      <div class="tip"><b>Vergleich Queue ↔ Stack:</b> enqueue ↔ push, dequeue ↔ pop, front ↔ top. Queue: erst raus, was zuerst kam (FIFO). Stack: erst raus, was zuletzt kam (LIFO).</div>` },
    { title: 'Klasse List (lineare Liste) – kommt noch', html: `<p>Verwaltet beliebig viele, linear angeordnete Objekte. Es gibt höchstens ein <b>aktuelles Objekt</b>, nur darauf kann zugegriffen werden. Leere Liste, vollständig durchlaufene Liste oder am Ende gelöschtes aktuelles Objekt: <b>kein aktuelles Objekt</b>.</p>
      <table><tr><th>Methode</th><th>Wirkung</th></tr>
      <tr><td><code>List()</code></td><td>leere Liste</td></tr>
      <tr><td><code>boolean isEmpty()</code></td><td>true, wenn keine Objekte</td></tr>
      <tr><td><code>boolean hasAccess()</code></td><td>true, wenn es ein aktuelles Objekt gibt</td></tr>
      <tr><td><code>void toFirst()</code> / <code>toLast()</code></td><td>erstes/letztes Objekt wird aktuell (leere Liste: nichts)</td></tr>
      <tr><td><code>void next()</code></td><td>Nachfolger wird aktuell; war es das letzte, gibt es danach kein aktuelles Objekt</td></tr>
      <tr><td><code>ContentType getContent()</code></td><td>aktuelles Objekt (kein aktuelles: null)</td></tr>
      <tr><td><code>void setContent(ContentType)</code></td><td>aktuelles Objekt ersetzen (nur wenn aktuell vorhanden und Parameter ungleich null)</td></tr>
      <tr><td><code>void append(ContentType)</code></td><td>am Ende einfügen; aktuelles Objekt bleibt</td></tr>
      <tr><td><code>void insert(ContentType)</code></td><td>vor dem aktuellen Objekt einfügen (leere Liste: einfügen, weiter kein aktuelles)</td></tr>
      <tr><td><code>void concat(List&lt;ContentType&gt;)</code></td><td>andere Liste anhängen, diese wird danach leer</td></tr>
      <tr><td><code>void remove()</code></td><td>aktuelles Objekt löschen, Nachfolger wird aktuell; am Ende gelöscht: kein aktuelles Objekt</td></tr></table>
      <pre><code>// alle Objekte einer Liste durchlaufen
liste.toFirst();
while (liste.hasAccess())
{
    Patient p = liste.getContent();
    ...
    liste.next();
}</code></pre>` }
  ],
  keyPoints: ['Entwurfsdiagramm: Multiplizitäten, sprachunabhängig. Implementationsdiagramm: Java-Typen, konkrete Datenstrukturen, Bezeichner an Pfeilen', 'Generische Klasse: gestricheltes Feld oben rechts', 'Interface-Implementierung: gestrichelt mit hohler Spitze', 'Queue: enqueue/dequeue/front/isEmpty (FIFO); Stack: push/pop/top/isEmpty (LIFO)', 'List: aktuelles Objekt, hasAccess, toFirst, next, getContent …', 'Leere Struktur → front()/top()/getContent() liefern null'],
  glossary: [
    { term: 'Entwurfsdiagramm', def: 'Grobes Klassendiagramm mit Klassen, Vererbung, Assoziationen und Multiplizitäten, unabhängig von der Programmiersprache.' },
    { term: 'Implementationsdiagramm', def: 'Klassendiagramm, das sich an Java orientiert (Datentypen, Parameter, konkrete Datenstrukturen).' },
    { term: 'Multiplizität', def: 'Anzahl der assoziierten Objekte: 1, 0..1, 0..*, 1..*.' },
    { term: 'Interface (Schnittstelle)', def: 'Deklariert nur Methoden, ohne Implementierung; Klassen implementieren es.' },
    { term: 'Abstrakte Klasse', def: 'Klasse, von der kein Objekt erzeugt werden kann; im Diagramm mit {abstract}.' },
    { term: 'Stack (Stapel)', def: 'Datenstruktur nach LIFO: push legt oben ab, pop entfernt oben, top zeigt oben.' },
    { term: 'LIFO', def: 'Last In, First Out: Das zuletzt eingefügte Element kommt zuerst wieder heraus.' },
    { term: 'List (lineare Liste)', def: 'Linear angeordnete Objekte mit einem aktuellen Objekt, durch das man zugreift und das man weiterschiebt.' },
    { term: 'Aktuelles Objekt', def: 'Das eine Listenobjekt, auf das gerade zugegriffen werden kann (hasAccess() == true).' }
  ],
  cards: [
    { q: 'Was bedeutet 0..* als Multiplizität?', a: 'Beliebig viele assoziierte Objekte (auch keines).' },
    { q: 'Wie zeigt man eine generische Klasse im Diagramm?', a: 'Typparameter und Belegung in einem gestrichelt umrandeten Feld oben rechts an der Klasse.' },
    { q: 'Queue-Methoden und ihre Stack-Gegenstücke?', a: 'enqueue ↔ push, dequeue ↔ pop, front ↔ top.' },
    { q: 'Wie durchläuft man eine List komplett?', a: 'toFirst(); while (hasAccess()) { getContent() … next(); }' }
  ],
  quiz: [
    { q: 'Welches Diagramm enthält Multiplizitäten, aber noch keine Java-Datentypen?', options: ['Implementationsdiagramm', 'Entwurfsdiagramm', 'Objektdiagramm', 'Struktogramm'], answer: 1, explain: 'Das Entwurfsdiagramm ist der grobe, sprachunabhängige Entwurf.' },
    { q: 'Was bedeutet die Multiplizität 1..*?', options: ['Genau ein Objekt', 'Kein oder ein Objekt', 'Beliebig viele, auch keines', 'Mindestens eins, beliebig viele'], answer: 3, explain: '1..* = mindestens ein Objekt.' },
    { q: 'Wo stehen im Implementationsdiagramm die Namen der Attribute, die Assoziationen realisieren?', options: ['In der Klasse unten', 'An den Pfeilen', 'Gar nicht', 'In Klammern hinter dem Klassennamen'], answer: 1, explain: 'Z. B. - queue oder - head, - tail am Pfeil.' },
    { q: 'Wie wird die Implementierung eines Interface gezeichnet?', options: ['Durchgezogener offener Pfeil', 'Gestrichelte Linie mit geschlossener, nicht ausgefüllter Spitze', 'Raute', 'Gar nicht'], answer: 1, explain: 'Gestrichelt mit hohler, geschlossener Pfeilspitze.' },
    { q: 'Was liefert <code>stack.top()</code> bei einem leeren Stack?', options: ['Fehler', 'null', 'Das letzte entfernte Objekt', '0'], answer: 1, explain: 'null; der Stapel bleibt unverändert.' },
    { q: 'Auf einem Stack wurden nacheinander A, B, C gepusht. Dann ein <code>pop()</code>. Was liefert <code>top()</code>?', options: ['A', 'B', 'C', 'null'], answer: 1, explain: 'LIFO: C wurde entfernt, B liegt jetzt oben.' },
    { q: 'Eine Queue: A, B, C wurden nacheinander eingefügt, dann ein <code>dequeue()</code>. Was liefert <code>front()</code>?', options: ['A', 'B', 'C', 'null'], answer: 1, explain: 'FIFO: A wurde entfernt, B steht vorne.' },
    { q: 'Welche Methode zeigt bei der List, ob es ein aktuelles Objekt gibt?', options: ['isEmpty()', 'hasAccess()', 'getContent()', 'toFirst()'], answer: 1, explain: 'hasAccess() == true: Es gibt ein aktuelles Objekt.' },
    { q: 'Was passiert bei <code>next()</code>, wenn das aktuelle Objekt das letzte der Liste ist?', options: ['Fehler', 'Es geht wieder zum ersten', 'Es gibt danach kein aktuelles Objekt', 'Nichts'], answer: 2, explain: 'Danach liefert hasAccess() false.' },
    { q: 'Was bedeutet <code>{abstract}</code> unter dem Klassennamen?', options: ['Klasse ist generisch', 'Es kann kein Objekt dieser Klasse erzeugt werden', 'Klasse ist private', 'Klasse erbt von mehreren'], answer: 1, explain: 'Abstrakte Klasse.' }
  ],
  exercises: [
    { task: '<p>Auf einem Stack<String> werden ausgeführt: <code>push("a"); push("b"); pop(); push("c"); push("d"); pop();</code> Was liefert danach <code>top()</code>? Welche Elemente liegen (von oben nach unten) auf dem Stack?</p>', hint: 'Zeichne den Stapel nach jedem Schritt.', solution: '<p>[a] → [b,a] → pop → [a] → [c,a] → [d,c,a] → pop → [c,a] (oben links). <code>top()</code> liefert <b>"c"</b>. Von oben nach unten: <b>c, a</b>.</p>' },
    { task: '<p>Vergleiche Queue und Stack in einer Tabelle mit mindestens drei Kriterien.</p>', hint: 'Prinzip, einfügen, entfernen, Anwendungsbeispiel.', solution: '<table><tr><th>Kriterium</th><th>Queue</th><th>Stack</th></tr><tr><td>Prinzip</td><td>FIFO</td><td>LIFO</td></tr><tr><td>Einfügen</td><td>enqueue: hinten</td><td>push: oben</td></tr><tr><td>Entfernen</td><td>dequeue: vorne (ältestes)</td><td>pop: oben (neuestes)</td></tr><tr><td>Hinsehen</td><td>front()</td><td>top()</td></tr><tr><td>Beispiel</td><td>Warteschlange beim Arzt</td><td>Tellerstapel, Rückgängig-Funktion</td></tr></table>' },
    { task: '<p>Schreibe Code, der eine <code>List&lt;Patient&gt; liste</code> komplett durchläuft und von jedem Patienten den Namen ausgibt.</p>', hint: 'toFirst, while hasAccess, getContent, next.', solution: '<pre><code>liste.toFirst();\nwhile (liste.hasAccess())\n{\n    Patient p = liste.getContent();\n    Console.println(p.getName());\n    liste.next();      // nicht vergessen, sonst Endlosschleife!\n}</code></pre>' }
  ]
});
})();
