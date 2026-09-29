// Grundlagen-Thema (Vorwissen für Vererbung & alle späteren Themen) – von Claude ergänzt, nicht aus den Unterrichtsfolien.
window.TOPICS.push({
  id: 'oop-grundlagen', week: 0, title: 'OOP-Grundlagen: Klasse, Objekt, Methode',
  summary: 'Das Fundament für Vererbung und alle Datenstrukturen: Klassen, Objekte, Attribute, Methoden, Konstruktor.',
  sections: [
    { title: 'Die Grundidee', html: `<p>Bei der <b>objektorientierten Programmierung (OOP)</b> modellieren wir Dinge aus der Welt (einen Krieger, ein Buch, ein Konto) als <b>Objekte</b> im Programm. Jedes Objekt <i>hat Eigenschaften</i> und <i>kann etwas tun</i>.</p>
      <div class="tip"><b>Merke:</b> Die <b>Klasse</b> ist der <i>Bauplan</i>, das <b>Objekt</b> ist das <i>gebaute Ding</i>. Aus einem Bauplan kann man beliebig viele Objekte bauen.</div>
      <p>Beispiel: Die Klasse <code>Krieger</code> beschreibt, was jeder Krieger hat und kann. „Conan" und „Xena" sind zwei Objekte dieser Klasse.</p>` },
    { title: 'Attribute und Methoden', html: `<ul>
      <li><b>Attribute</b> = Eigenschaften (Daten). Beispiel: <code>name</code>, <code>lebensenergie</code>, <code>kraft</code>. Jedes Attribut hat einen <b>Datentyp</b> (<code>int</code> ganze Zahl, <code>double</code> Kommazahl, <code>boolean</code> wahr/falsch, <code>String</code> Text).</li>
      <li><b>Methoden</b> = Fähigkeiten (Aktionen). Beispiel: <code>angreifen()</code>, <code>heilen(int pl)</code>.</li></ul>
      <p>Die Werte der Attribute zusammen nennt man den <b>Zustand</b> eines Objekts. Zwei Objekte derselben Klasse haben dieselben Attribute, aber meist andere Werte.</p>` },
    { title: 'Java-Beispiel', html: `<pre><code>public class Krieger {
    private String name;          // Attribute
    private int lebensenergie;
    private int kraft;

    public Krieger(String pName, int pKraft) {   // Konstruktor
        name = pName;
        lebensenergie = 100;
        kraft = pKraft;
    }

    public String getName() {                     // Methode mit Rückgabe
        return name;
    }

    public void verwundet(int pl) {               // Methode ohne Rückgabe
        lebensenergie = lebensenergie - pl;
    }
}</code></pre>
      <p>Objekt erzeugen (in BlueJ: Rechtsklick auf die Klasse → <i>new Krieger(...)</i>, oder im Code):</p>
      <pre><code>Krieger k = new Krieger("Conan", 12);
k.verwundet(30);      // lebensenergie ist jetzt 70</code></pre>` },
    { title: 'Konstruktor, Kapselung, Getter/Setter', html: `<ul>
      <li>Der <b>Konstruktor</b> heißt wie die Klasse, hat <u>keinen Rückgabetyp</u> und setzt beim Erzeugen (<code>new</code>) die Startwerte.</li>
      <li><b>Kapselung / Geheimnisprinzip:</b> Attribute sind <code>private</code> (von außen nicht zugreifbar), Methoden meist <code>public</code>. So kann niemand ungewollt Daten kaputt machen.</li>
      <li>Zugriff von außen über <b>Getter</b> (<code>getName()</code> liest) und <b>Setter</b> (<code>setName(String pn)</code> ändert).</li></ul>
      <div class="tip">Sichtbarkeit in UML: <code>-</code> = private, <code>+</code> = public.</div>` },
    { title: 'Methoden: Parameter & Rückgabewert', html: `<table><tr><th>Typ</th><th>Beispiel</th><th>Bedeutung</th></tr>
      <tr><td><code>void</code></td><td><code>void heilen(int pl)</code></td><td>tut etwas, gibt nichts zurück</td></tr>
      <tr><td>mit Rückgabe</td><td><code>int getKraft()</code></td><td>liefert einen Wert (mit <code>return</code>)</td></tr></table>
      <p><b>Parameter</b> stehen in der Klammer und sind „Eingaben" der Methode (hier <code>pl</code> = Punkte).</p>` }
  ],
  keyPoints: ['Klasse = Bauplan, Objekt = Exemplar davon', 'Attribute = Daten, Methoden = Fähigkeiten', 'Konstruktor: heißt wie die Klasse, kein Rückgabetyp, setzt Startwerte', 'Attribute private, Zugriff über Getter/Setter (Kapselung)'],
  glossary: [
    { term: 'Klasse', def: 'Bauplan für Objekte: legt fest, welche Attribute und Methoden sie haben.' },
    { term: 'Objekt', def: 'Konkretes Exemplar einer Klasse mit eigenen Attributwerten.' },
    { term: 'Attribut', def: 'Eigenschaft eines Objekts (Variable in der Klasse).' },
    { term: 'Methode', def: 'Fähigkeit/Aktion eines Objekts (Funktion in der Klasse).' },
    { term: 'Konstruktor', def: 'Spezielle Methode, die beim Erzeugen eines Objekts (new) aufgerufen wird und Startwerte setzt.' },
    { term: 'Kapselung (Geheimnisprinzip)', def: 'Attribute sind private; Zugriff nur über öffentliche Methoden.' },
    { term: 'Zustand eines Objekts', def: 'Die aktuellen Werte aller seiner Attribute.' },
    { term: 'Getter / Setter', def: 'Methoden zum Lesen bzw. Ändern eines privaten Attributs.' }
  ],
  quiz: [
    { q: 'Was ist der Unterschied zwischen Klasse und Objekt?', options: ['Kein Unterschied', 'Klasse = Bauplan, Objekt = konkretes Exemplar', 'Klasse = konkretes Exemplar, Objekt = Bauplan', 'Objekte sind Methoden'], answer: 1, explain: 'Aus einer Klasse (Bauplan) erzeugt man beliebig viele Objekte.' },
    { q: 'Was macht <code>new Krieger("Conan", 12)</code>?', options: ['Löscht die Klasse', 'Erzeugt ein neues Objekt und ruft den Konstruktor auf', 'Ruft eine Methode namens new auf', 'Deklariert ein Attribut'], answer: 1, explain: 'new erzeugt das Objekt, der Konstruktor setzt die Startwerte.' },
    { q: 'Welche Aussage über den Konstruktor stimmt?', options: ['Er hat den Rückgabetyp void', 'Er heißt wie die Klasse und hat keinen Rückgabetyp', 'Er muss private sein', 'Er darf nur einen Parameter haben'], answer: 1, explain: 'Der Konstruktor trägt den Klassennamen und hat gar keinen Rückgabetyp (nicht mal void).' },
    { q: 'Warum sind Attribute meist <code>private</code>?', options: ['Damit das Programm schneller läuft', 'Kapselung: Zugriff nur kontrolliert über Methoden', 'Weil Java es verlangt', 'Damit sie nicht gespeichert werden'], answer: 1, explain: 'Geheimnisprinzip: Daten werden geschützt.' },
    { q: 'Welchen Datentyp nimmst du für „vegetarisch: ja/nein"?', options: ['int', 'String', 'boolean', 'double'], answer: 2, explain: 'boolean kennt nur true/false.' },
    { q: 'Was bedeutet das Zeichen <code>-</code> vor einem Attribut im Klassendiagramm?', options: ['public', 'private', 'protected', 'static'], answer: 1, explain: '- = private, + = public.' },
    { q: 'Was liefert eine Methode mit Rückgabetyp <code>String</code>?', options: ['Nichts', 'Einen Text, per return', 'Eine Zahl', 'Ein Objekt der Klasse Main'], answer: 1, explain: 'Der Rückgabetyp gibt an, was return liefert.' }
  ],
  exercises: [
    { task: '<p>Schreibe die Java-Klasse <code>Buch</code> mit den privaten Attributen <code>titel</code> (String) und <code>seiten</code> (int), einem Konstruktor und Gettern für beide Attribute.</p>', hint: 'Orientiere dich am Beispiel Krieger. Konstruktor: public Buch(String pTitel, int pSeiten).',
      solution: `<pre><code>public class Buch {
    private String titel;
    private int seiten;

    public Buch(String pTitel, int pSeiten) {
        titel = pTitel;
        seiten = pSeiten;
    }
    public String getTitel() { return titel; }
    public int getSeiten()   { return seiten; }
}</code></pre><p>Attribute private, Konstruktor ohne Rückgabetyp, Getter mit passendem Rückgabetyp.</p>` },
    { task: '<p>Ein Krieger hat 100 Lebensenergie und wird zweimal mit <code>verwundet(30)</code> getroffen, danach einmal <code>heilen(10)</code>. Wie viel Lebensenergie hat er? (<code>heilen</code> addiert.)</p>', hint: 'Rechne Schritt für Schritt.', solution: '<p>100 − 30 = 70, 70 − 30 = 40, 40 + 10 = <b>50</b>.</p>' }
  ]
});
