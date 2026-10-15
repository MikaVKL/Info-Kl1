// Quelle: vier alte Informatik-Klausuren der Einführungsphase (EF 1 und EF 2, je Haupt- und Nachschreibtermin) von Herrn/Frau Hov.
// Auswertung der Aufgabentypen und Lerntipps von Claude. Die EF-Klausuren behandeln Stoff der Einführungsphase (Algorithmen, Rover, OOP-Grundlagen),
// die Q1-Klausuren werden sehr wahrscheinlich im selben Stil gestellt.
window.TOPICS.push({
  id: 'klausur-aufgabentypen', week: 0, tag: 'tipps', title: 'So laufen die Klausuren: Aufgabentypen',
  summary: 'Aufbau und typische Aufgaben der alten Klausuren: Syntaxfehler, Algorithmus analysieren, Diagramme, Struktogramme.',
  sections: [
    { title: 'Der Rahmen', html: `<ul><li><b>90 Minuten</b>, erlaubtes Hilfsmittel: <b>Duden</b>.</li>
      <li>Die Lösungen schreibst du auf einen <b>separaten Klausurbogen</b>. Nebenrechnungen und Notizen klar als solche markieren. Auf allen Blättern <b>Namen</b> eintragen und alle Blätter abgeben.</li>
      <li>Es gibt <b>4 Teilaufgaben a) bis d)</b> mit Punkten (zum Beispiel 8, 9, 10, 9 oder 21, 16, 19). Die Punkte pro Teilaufgabe stehen dabei.</li>
      <li>Am Ende gibt es einen <b>Anhang mit der Dokumentation der Methoden/Klassen</b> (Rover, Console). Nur diese Methoden darfst du in Aufgaben benutzen. Andere stehen nicht zur Verfügung.</li>
      <li>Jede Aufgabe hat ein <b>Thema und eine kleine Geschichte</b> (Rover auf dem Mars, Schulfest mit Ständen). Die Geschichte und das Diagramm im Text gehören zur Aufgabe: Nutze ihre Namen und Beispiele in deinen Antworten.</li></ul>
      <div class="tip">Das Wichtigste vorneweg: Es werden vor allem <b>Methoden- und Attributnamen aus der Doku</b> verlangt. Wer im Anhang genau nachliest, spart viele Fehler.</div>` },
    { title: 'Die wiederkehrenden Aufgabentypen', html: `<table><tr><th>Typ</th><th>Operator</th><th>Was du tun musst</th></tr>
      <tr><td><b>Klasse und Objekt erklären</b></td><td>beschreiben</td><td>Kurzer, zusammenhängender Text: Was ist eine Klasse, was ein Objekt, was wird codiert? Mit Beispielen aus der Aufgabe.</td></tr>
      <tr><td><b>Objektkarte / Objektdiagramm</b></td><td>darstellen</td><td>Ein Objekt mit konkreten Attributwerten zeichnen (<u>name : Klasse</u>, Attribut = Wert).</td></tr>
      <tr><td><b>Klassendiagramm lesen, ändern, umsetzen</b></td><td>beschreiben, modifizieren, implementieren</td><td>Aufbau beschreiben (alle Attribute, Beziehungen), neue Klasse ergänzen, Klasse als Java-Quellcode schreiben (Rümpfe dürfen leer bleiben).</td></tr>
      <tr><td><b>Mehr Objekte verwalten</b></td><td>erläutern</td><td>Wie kann man viele Stände/Objekte statt vier einzelner Attribute verwalten? Antwort: <b>Array</b> von Referenzen (Diagramm und Code ändern).</td></tr>
      <tr><td><b>Syntaxfehler beheben</b></td><td>modifizieren</td><td>8 bis 9 Fehler in ca. 10 Zeilen finden, jede Zeile korrigiert neu schreiben und die Zeilennummer angeben.</td></tr>
      <tr><td><b>Struktogramm → Java</b></td><td>implementieren</td><td>Ein Struktogramm in lauffähigen Code mit gültiger Methodendeklaration umsetzen.</td></tr>
      <tr><td><b>Algorithmus analysieren</b></td><td>analysieren, beschreiben, beurteilen</td><td>Code Zeile für Zeile verstehen, Tabelle der Attributwerte ausfüllen, Ausgabe angeben, Bedeutung erläutern.</td></tr>
      <tr><td><b>Algorithmus entwickeln</b></td><td>entwickeln, darstellen</td><td>Aus „Vorher/Nachher"-Bildern einen Algorithmus als Struktogramm entwerfen.</td></tr></table>` },
    { title: 'Syntaxfehler finden: die Checkliste', html: `<p>In allen vier Klausuren gibt es eine Aufgabe „Behebe <b>alle 8/9 Syntaxfehler</b>". Die Fehler sind fast immer aus dieser Liste. Geh den Code <b>Zeile für Zeile</b> durch (auch in einer Zeile können mehrere sein).</p>
      <table><tr><th>Fehlerart</th><th>Beispiel falsch</th><th>richtig</th></tr>
      <tr><td>Rückgabetyp fehlt</td><td><code>public foo() {</code></td><td><code>public void foo() {</code></td></tr>
      <tr><td>Klammern () bei Methode fehlen</td><td><code>public foo {</code>, <code>fahre;</code>, <code>readInt</code></td><td><code>public void foo() {</code>, <code>fahre();</code>, <code>Console.readInt()</code></td></tr>
      <tr><td>Datentyp des Parameters fehlt</td><td><code>verkaufen(pAnzahl)</code></td><td><code>verkaufen(int pAnzahl)</code></td></tr>
      <tr><td>Semikolon fehlt</td><td><code>fahre()</code></td><td><code>fahre();</code></td></tr>
      <tr><td>Klammer ( ) oder Klammer { } fehlt</td><td><code>while(!markeVorhanden()</code>, <code>else{</code> ohne <code>}</code> davor</td><td><code>while (!markeVorhanden()) {</code>, <code>} else {</code></td></tr>
      <tr><td>Falsches Schlüsselwort / deutsches Wort</td><td><code>falls</code>, <code>solange</code>, <code>ODER</code>, <code>UND</code></td><td><code>if</code>, <code>while</code>, <code>||</code>, <code>&amp;&amp;</code></td></tr>
      <tr><td>Text ohne Anführungszeichen</td><td><code>drehe(links)</code>, <code>println(Hallo)</code></td><td><code>drehe("links")</code>, <code>println("Hallo")</code></td></tr>
      <tr><td>Methode gibt es nicht / falsch geschrieben (laut Doku!)</td><td><code>analysiereGestein()</code>, <code>readint()</code>, <code>readdouble()</code></td><td><code>nimmGestein()</code>, <code>readInt()</code>, <code>readDouble()</code></td></tr>
      <tr><td>Parameter, den die Methode nicht hat</td><td><code>markeVorhanden("vorne")</code></td><td><code>markeVorhanden()</code></td></tr>
      <tr><td>Variable nicht deklariert</td><td><code>erloes = preis * anzahl;</code></td><td><code>double erloes = preis * anzahl;</code></td></tr>
      <tr><td>Getter ohne ()</td><td><code>produkt.gibPreis</code></td><td><code>produkt.gibPreis()</code></td></tr>
      <tr><td>Rückgabe in <code>void</code>-Methode</td><td><code>return einnahmen += erloes;</code></td><td><code>einnahmen += erloes;</code></td></tr>
      <tr><td>Falscher Datentyp bei Aufruf</td><td><code>st.verkaufen(einnahmen)</code> (double statt int)</td><td><code>st.verkaufen(anzahl)</code></td></tr>
      <tr><td>Attribut neu deklariert statt benutzt</td><td><code>Stand st1 = st;</code> (st1 ist Attribut)</td><td><code>st1 = st;</code></td></tr>
      <tr><td>Schließende } am Ende fehlt</td><td>Methode nicht zu</td><td>letzte Zeile <code>}</code></td></tr></table>
      <div class="warn"><b>Schreibe auf:</b> Zeilennummer und die <b>ganze korrigierte Zeile</b>. Nur „Semikolon fehlt" reicht oft nicht.</div>
      <div class="tip"><b>Tipp:</b> Zähle am Ende die Fehler: Die Aufgabe nennt die Zahl (8 oder 9). Fehlen noch welche, such besonders bei Klammern und Methodennamen.</div>` },
    { title: 'Algorithmus analysieren: Spurtabelle', html: `<p>Bei „Analysiere den Quellcode" gibt es zwei Teile: <b>erst</b> jede Zeile in Worten erklären, <b>dann</b> den Ablauf nachvollziehen.</p>
      <ol><li><b>Startwerte</b> aufschreiben (Tabelle oder Weltbild).</li>
      <li>Jede Schleife/Verzweigung einzeln erklären: <i>Was prüft die Bedingung? Was passiert, wenn sie wahr/falsch ist?</i></li>
      <li>Die Schleife <b>Durchgang für Durchgang</b> durchspielen und nach jedem Durchgang die neuen Werte eintragen (nicht alles im Kopf).</li>
      <li>Ausgabe aufschreiben, danach die <b>Bedeutung im Sachzusammenhang</b> (zum Beispiel: „Die Stände werden nach Einnahmen sortiert").</li></ol>
      <div class="tip"><b>Beispiel aus der EF-2-Klausur (Schulfest):</b> Der Code vertauscht benachbarte Stände mit einer Hilfsreferenz <code>tmp</code>, solange noch getauscht wurde. Das ist das Verfahren <b>Bubblesort</b>, das du im Unterrichtsvorhaben „Suchen und Sortieren" kennenlernst.</div>
      <p><b>Die Variable „getauscht":</b> ein Wahrheitswert („Flagge"). Zu Beginn jedes Durchgangs wird sie auf <code>false</code> gesetzt und auf <code>true</code>, sobald getauscht wird. Bleibt sie <code>false</code>, war nichts mehr zu tauschen: Die Sortierung ist fertig und die Schleife endet.</p>` },
    { title: 'Klassendiagramm → Java und mehr Objekte verwalten', html: `<p><b>Klasse aus dem Diagramm schreiben:</b> Jede Zeile des Diagramms wird eine Zeile Code. <code>- name: String</code> wird <code>private String name;</code>. <code>+ gibName(): String</code> wird <code>public String gibName() { }</code>. Ein Pfeil mit Bezeichner (<code>- st1, - st2</code>) wird ein Attribut mit diesem Namen und dem Typ der Zielklasse: <code>private Stand st1, st2, st3, st4;</code>.</p>
      <pre><code>public class Schulfest
{
    private Stand st1, st2, st3, st4;

    public Schulfest() { }
    public int berechneMaxBesucher() { }
    public double berechneEinnahmen() { }
    public void fuegeStandHinzu(Stand st) { }
}</code></pre>
      <p><b>Viele Objekte verwalten:</b> statt <code>st1, st2, st3, st4</code> ein <b>Array von Referenzen</b>: im Diagramm <code>- staende: Stand[ ]</code> (aus den 4 Pfeilen wird einer), im Code <code>private Stand[] staende;</code>, im Konstruktor <code>staende = new Stand[20];</code>, und mit <code>fuegeStandHinzu</code> wird ein Stand in den nächsten freien Platz eingetragen. Das ist genau das Thema „Array von Referenzen".</p>` }
  ],
  keyPoints: ['Aufbau: 90 min, Duden, Lösungen auf Extrabogen, Doku im Anhang, 4 Teilaufgaben', 'Syntaxfehler: Zeile für Zeile, Doku prüfen (Methodennamen, Parameter), ganze Zeile neu schreiben', 'Algorithmus analysieren: Zeilen erklären, Tabelle Durchgang für Durchgang, Ausgabe, Bedeutung', 'Bubblesort-Muster: tmp-Tausch + Variable getauscht', 'Viele Objekte verwalten = Array von Referenzen', 'Objektkarte: name : Klasse, Attribut = Wert'],
  glossary: [
    { term: 'Syntaxfehler', def: 'Verstoß gegen die Schreibregeln der Programmiersprache; der Compiler kann den Code nicht übersetzen.' },
    { term: 'Compiler', def: 'Programm, das den Quelltext in ausführbaren Code übersetzt und Syntaxfehler meldet.' },
    { term: 'Struktogramm', def: 'Grafische Darstellung eines Algorithmus aus Kästen für Anweisung, Schleife und Verzweigung.' },
    { term: 'Hilfsreferenz (tmp)', def: 'Zwischenspeicher, damit beim Vertauschen von Referenzen keine verloren geht.' },
    { term: 'Bubblesort', def: 'Sortierverfahren: Benachbarte Elemente werden vertauscht, bis nichts mehr zu tauschen ist.' },
    { term: 'Auftrag / Anfrage', def: 'Auftrag: Methode, die etwas verändert (void). Anfrage: Methode, die einen Wert zurückgibt.' }
  ],
  cards: [
    { q: 'Was gehört zu einer korrigierten Syntaxfehler-Zeile in der Klausur?', a: 'Die Zeilennummer und die vollständige neu geschriebene Zeile.' },
    { q: 'Wie viele Methoden darfst du benutzen?', a: 'Nur die aus der Dokumentation im Anhang der Klausur.' },
    { q: 'Wozu dient die Variable „getauscht" im Sortieralgorithmus?', a: 'Sie zeigt, ob im Durchgang getauscht wurde. Bleibt sie false, ist sortiert und die Schleife endet.' }
  ],
  quiz: [
    { q: 'Was ist im Code <code>public foo { ... }</code> falsch?', options: ['Rückgabetyp und Klammern () fehlen', 'Nur das Semikolon', 'Der Name', 'Nichts'], answer: 0, explain: 'Richtig: public void foo() { ... }' },
    { q: 'Welches Wort ist in Java ein Fehler?', options: ['if', 'while', 'falls', 'else'], answer: 2, explain: 'falls ist deutsch, in Java heißt es if.' },
    { q: 'Was ist falsch an <code>drehe(links);</code>?', options: ['Es fehlt void', 'Der String braucht Anführungszeichen: drehe("links");', 'Es muss drehen() heißen', 'Nichts'], answer: 1, explain: 'Der Parameter ist ein String: "links".' },
    { q: 'Die Doku sagt <code>boolean markeVorhanden()</code>. Was ist falsch an <code>markeVorhanden("vorne")</code>?', options: ['Nichts', 'Die Methode hat keinen Parameter', 'Es fehlt void', 'Es muss großgeschrieben sein'], answer: 1, explain: 'Parameter nur, wenn die Doku einen angibt (wie bei huegelVorhanden("vorne")).' },
    { q: 'In einer <code>void</code>-Methode steht <code>return einnahmen += erloes;</code>. Was ist zu ändern?', options: ['Nichts', 'Das return entfernen (void gibt nichts zurück)', 'void durch int ersetzen', 'Das Semikolon entfernen'], answer: 1, explain: 'Die Methode soll nur die Einnahmen erhöhen.' },
    { q: '<code>int anzahl = Console.readint();</code>: Was ist falsch?', options: ['Console fehlt', 'readInt wird mit großem I geschrieben', 'int muss double sein', 'Es fehlt new'], answer: 1, explain: 'Laut Doku heißt die Methode readInt().' },
    { q: 'In <code>Schulfest</code> steht <code>Stand st1 = st;</code>, dabei ist st1 ein Attribut. Was ist falsch?', options: ['Nichts', 'st1 wird als lokale Variable neu deklariert, richtig wäre st1 = st;', 'st muss groß sein', 'Fehlendes new'], answer: 1, explain: 'Sonst bleibt das Attribut unverändert.' },
    { q: 'Woran erkennt man beim Bubblesort-Code, dass er fertig ist?', options: ['Nach genau 3 Durchläufen', 'Wenn „getauscht" in einem Durchgang false geblieben ist', 'Wenn alle Namen gleich sind', 'Wenn tmp = null'], answer: 1, explain: 'Kein Tausch mehr nötig = sortiert.' },
    { q: 'Wie verwaltet man statt st1 bis st4 beliebig viele Stände?', options: ['Mit noch mehr Attributen st5, st6, …', 'Mit einem Array von Referenzen: Stand[ ]', 'Mit einer Methode', 'Gar nicht'], answer: 1, explain: 'Das Array wird mit new Stand[n] erzeugt.' },
    { q: 'Was tun bei „Implementiere das Struktogramm … Vergiss nicht die Methodendeklaration"?', options: ['Nur die Schleife schreiben', 'Auch public void methodenname() { ... } um den Code schreiben', 'Nur Kommentare', 'Pseudo-Code'], answer: 1, explain: 'Der Code muss lauffähig sein: mit gültiger Methodendeklaration.' }
  ],
  exercises: [
    { task: '<p>Finde alle Fehler (6) und schreibe die korrigierten Zeilen auf:<pre><code>1 public lade(Rover r) {\n2   while (r.gesteinVorhanden() {\n3     falls (r.huegelVorhanden(rechts)) {\n4       r.fahre\n5     }\n6   }\n7 }</code></pre></p>', hint: 'Rückgabetyp, Klammer, deutsches Wort, Anführungszeichen, Klammern bei Methode, Strichpunkt.', solution: '<p>Zeile 1: <code>public void lade(Rover r) {</code> (Rückgabetyp fehlt). Zeile 2: <code>while (r.gesteinVorhanden()) {</code> (schließende Klammer). Zeile 3: <code>if (r.huegelVorhanden("rechts")) {</code> (<code>falls</code> wird <code>if</code> und der String braucht Anführungszeichen: 2 Fehler). Zeile 4: <code>r.fahre();</code> (Klammern und Semikolon fehlen: 2 Fehler). Das sind 6 Fehler. Wichtig ist das Vorgehen: Zeile für Zeile und alle Arten aus der Checkliste durchgehen.</p>' },
    { task: '<p>Spiele den Code durch und fülle die Spuren-Tabelle aus (Startwert: a = 5, b = 2, getauscht = true):<pre><code>while (getauscht) {\n  getauscht = false;\n  if (a &gt; b) {\n    int tmp = a; a = b; b = tmp;\n    getauscht = true;\n  }\n}\nConsole.println(a + " " + b);</code></pre></p>', hint: 'Erst der Durchgang mit Tausch, dann ein Durchgang ohne Tausch.', solution: '<table><tr><th>Durchgang</th><th>a</th><th>b</th><th>getauscht</th></tr><tr><td>0 (Start)</td><td>5</td><td>2</td><td>true</td></tr><tr><td>1</td><td>2</td><td>5</td><td>true (es wurde getauscht)</td></tr><tr><td>2</td><td>2</td><td>5</td><td>false (nichts mehr zu tauschen)</td></tr></table><p>Ausgabe: <code>2 5</code>. Bedeutung: Die kleinere Zahl steht in a (aufsteigend sortiert), ein Mini-Bubblesort. Beachte: Der 2. Durchgang ändert nichts mehr, wird aber trotzdem gebraucht, damit der Code erkennt, dass er fertig ist.</p>' }
  ]
});
