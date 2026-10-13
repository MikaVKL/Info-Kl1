// Quelle: Folien "PR Referenz" (Ch. Pothmann, cpothmann.de, CC BY-NC-SA 4.0). Abschnitte mit "Zusatz" hat Claude ergänzt.
(function () {
const uml = (name, attrs, meths, obj) => `<div class="uml${obj ? ' obj' : ''}"><div>${name}</div><div>${attrs.join('<br>') || '&nbsp;'}</div>${meths ? `<div>${meths.join('<br>') || '&nbsp;'}</div>` : ''}</div>`;
window.TOPICS.push({
  id: 'referenzen', week: 3, title: 'Referenzen',
  summary: 'Variablen, die auf Objekte zeigen: null, new, mehrere Pfeile auf ein Objekt, == gegen equals().',
  sections: [
    { title: 'Einfache Attribute vs. Referenzen', html: `<p>Beispiel Weltraumsimulation: Die Klasse <code>WeltraumSim</code> hat zwei Attribute:</p>
      <pre><code>public class WeltraumSim
{
    private int anzahl;          // einfacher Datentyp
    private Raumschiff rs;       // komplexer Datentyp = Klasse
    ...
}</code></pre>
      <table><tr><th>Datentyp</th><th>Bedeutung</th></tr><tr><td><code>int</code></td><td>ganze Zahl</td></tr><tr><td><code>long</code></td><td>ganze Zahl (doppelte Bitgröße)</td></tr><tr><td><code>float</code></td><td>Dezimalzahl</td></tr><tr><td><code>double</code></td><td>Dezimalzahl (doppelte Bitgröße)</td></tr><tr><td><code>char</code></td><td>einzelner Buchstabe</td></tr><tr><td><code>boolean</code></td><td>Wahrheitswert (true/false)</td></tr></table>
      <ul><li><code>anzahl</code>: speichert den <b>Wert</b> direkt, wird automatisch auf <b>0</b> gesetzt.</li>
      <li><code>rs</code>: ist eine <b>Referenz</b> (Pfeil/Zeiger) auf ein Objekt. Sie zeigt zunächst auf nichts: <b><code>null</code></b>. Es gibt noch gar kein Raumschiff-Objekt!</li></ul>
      <div class="tip"><b>Merke:</b> Alles, was <u>nicht</u> in der Liste der einfachen Datentypen steht (Raumschiff, Sprite, String, Arrays …), ist eine Referenz.</div>` },
    { title: 'Attribute verändern', html: `<pre><code>anzahl = 1;              // einfaches Attribut: Zuweisung
rs.setGröße(200.0);      // Objekt über die Referenz: Methode aufrufen</code></pre>
      <p>Aber: Läuft <code>rs.setGröße(200.0)</code> bevor ein Objekt existiert, <b>stürzt das Programm ab</b> (<i>NullPointerException</i>), weil <code>rs</code> auf kein Objekt zeigt.</p>
      <div class="warn"><b>Klassiker:</b> Referenz deklariert, aber nie <code>new</code> aufgerufen → Absturz bei der ersten Benutzung.</div>` },
    { title: 'Objekt erzeugen mit new', html: `<pre><code>public class WeltraumSim
{
    private int anzahl;
    private Raumschiff rs;

    public WeltraumSim()
    {
        rs = new Raumschiff();    // Objekt erzeugen, rs zeigt darauf
    }

    public void main()
    {
        anzahl = 1;
        rs.setGröße(200.0);       // jetzt OK
    }
}</code></pre>
      <p><code>new Raumschiff()</code> erzeugt das Objekt und liefert die Referenz darauf; die Zuweisung <code>rs = ...</code> lässt <code>rs</code> darauf zeigen. Üblicherweise geschieht das im <b>Konstruktor</b>.</p>` },
    { title: 'Mehrere Referenzen auf dasselbe Objekt', html: `<p>Der Nutzen von Referenzen: Mehrere Pfeile können auf das <b>gleiche Objekt</b> zeigen.</p>
      <pre><code>private Raumschiff rs1, rs2;
private Raumschiff aktuell;

public WeltraumSim()
{
    rs1 = new Raumschiff();   // Objekt A
    rs2 = new Raumschiff();   // Objekt B
}

public void main()
{
    aktuell = rs1;            // aktuell zeigt jetzt auf Objekt A (wie rs1)
    aktuell.setGröße(200.0);  // verändert Objekt A
    aktuell = rs2;            // aktuell zeigt jetzt auf Objekt B
    aktuell.setGröße(350.0);  // verändert Objekt B
}</code></pre>
      <div class="tip"><code>aktuell = rs1;</code> kopiert <b>nicht das Objekt</b>, sondern nur den Pfeil. Danach kannst du Objekt A über <code>rs1</code> <i>oder</i> <code>aktuell</code> bearbeiten.</div>
      <p><b>Anwendung:</b> Der Benutzer wählt ein Objekt:</p>
      <pre><code>int wahl = Console.readInt();
if (wahl == 1) { aktuell = rs1; }
else           { aktuell = rs2; }
aktuell.ladeSchiff();    // egal welches – der Code danach ist derselbe
aktuell.fliege();</code></pre>` },
    { title: 'Objekte löschen & Garbage Collector', html: `<pre><code>aktuell = rs1;
rs2 = null;      // rs2 zeigt auf nichts mehr</code></pre>
      <p>Zeigt <b>keine Referenz</b> mehr auf ein Objekt, ist es nicht mehr erreichbar und wird „gelöscht". Das übernimmt der <b>Garbage Collector</b>: Er sucht im Hintergrund nach Objekten ohne Referenzen und gibt deren Speicher frei.</p>
      <p>Früher musste man das selbst programmieren und vergaß es oft → Programme brauchten immer mehr Speicher (<b>Memory Leak</b>).</p>` },
    { title: 'Referenzen vergleichen: == und equals()', html: `<pre><code>String strA = new String("Heute");
String strB = new String("Heute");
strA == strB          // false
strA.equals(strB)     // true</code></pre>
      <ul><li><code>==</code> vergleicht die <b>Referenzen</b>: zeigen beide auf <i>dasselbe Objekt</i>? Hier nein, es sind zwei verschiedene Objekte → <code>false</code>.</li>
      <li><code>equals()</code> vergleicht den <b>Inhalt</b> (alle Attribute einzeln) → <code>true</code>.</li></ul>
      <div class="warn">Texte und Objekte nie mit <code>==</code> auf Inhalt vergleichen – dafür immer <code>equals()</code>.</div>` },
    { title: 'Zusammenfassung', html: `<table><tr><th>Code</th><th>Bedeutung</th></tr>
      <tr><td><code>Raumschiff rs1, rs2;</code></td><td>deklariert zwei Referenzen (noch keine Objekte)</td></tr>
      <tr><td><code>rs1 = new Raumschiff();</code></td><td>erzeugt ein Objekt, rs1 zeigt darauf</td></tr>
      <tr><td><code>rs2 = rs1;</code></td><td>rs2 zeigt auf dasselbe Objekt wie rs1</td></tr>
      <tr><td><code>rs2.methode();</code></td><td>bearbeitet das Objekt, auf das rs2 gerade zeigt</td></tr>
      <tr><td><code>rs1 == rs2</code></td><td>zeigen beide auf dasselbe Objekt?</td></tr>
      <tr><td><code>rs1.equals(rs2)</code></td><td>haben die Objekte gleichen Inhalt?</td></tr></table>` },
    { title: 'Beispielaufgabe mit Lösung', html: `<pre><code>String s1, s2, s3, s4;
s1 = new String("ABC");
s1 = new String("XYZ");
s2 = new String("ABC");
s3 = s1;
s4 = new String("XYZ");</code></pre>
      <p><b>Objekte am Ende:</b> drei Objekte. Das erste „ABC" ist weg (keine Referenz mehr, wurde von s1 „verlassen").</p>
      <div class="diag">${uml('Objekt A: "XYZ"', ['s1 und s3 zeigen darauf'], null, true)}${uml('Objekt B: "ABC"', ['s2 zeigt darauf'], null, true)}${uml('Objekt C: "XYZ"', ['s4 zeigt darauf'], null, true)}</div>
      <table><tr><th>Ausdruck</th><th>Ergebnis</th><th>Grund</th></tr>
      <tr><td>s1 == s2</td><td>false</td><td>A ≠ B</td></tr><tr><td>s1 == s3</td><td>true</td><td>beide zeigen auf A</td></tr><tr><td>s1 == s4</td><td>false</td><td>A ≠ C (verschiedene Objekte)</td></tr>
      <tr><td>s1.equals(s2)</td><td>false</td><td>"XYZ" ≠ "ABC"</td></tr><tr><td>s1.equals(s3)</td><td>true</td><td>gleiches Objekt</td></tr><tr><td>s1.equals(s4)</td><td>true</td><td>gleicher Inhalt "XYZ"</td></tr></table>` }
  ],
  keyPoints: ['Einfache Datentypen speichern den Wert, Klassen-Variablen sind Referenzen (Pfeile)', 'Referenz ohne Objekt = null → Methodenaufruf stürzt ab', 'new erzeugt das Objekt; a = b kopiert nur den Pfeil', 'Ohne Referenz → Garbage Collector löscht das Objekt', '== vergleicht Referenzen, equals() vergleicht Inhalte'],
  glossary: [
    { term: 'Referenz', def: 'Variable, die auf ein Objekt zeigt (Pfeil/Zeiger), statt den Wert selbst zu speichern.' },
    { term: 'null', def: 'Wert einer Referenz, die auf kein Objekt zeigt.' },
    { term: 'NullPointerException', def: 'Absturz, wenn man über eine null-Referenz eine Methode aufruft.' },
    { term: 'Einfacher Datentyp', def: 'int, long, float, double, char, boolean – speichern den Wert direkt.' },
    { term: 'Garbage Collector', def: 'Java-Hintergrundprozess, der Objekte ohne Referenzen löscht und Speicher freigibt.' },
    { term: 'Memory Leak', def: 'Speicherleck: nicht mehr benötigte Objekte werden nicht freigegeben, das Programm braucht immer mehr Speicher.' },
    { term: 'equals()', def: 'Methode zum Vergleich des Inhalts zweier Objekte.' },
    { term: '== bei Referenzen', def: 'Prüft, ob beide Referenzen auf dasselbe Objekt zeigen.' }
  ],
  cards: [
    { q: 'Wozu zeigt eine frisch deklarierte Referenz (Raumschiff rs;) ?', a: 'Auf null – es existiert noch kein Objekt.' },
    { q: 'Was bewirkt aktuell = rs1; ?', a: 'aktuell zeigt auf dasselbe Objekt wie rs1. Das Objekt wird nicht kopiert.' },
    { q: 'Wann wird ein Objekt gelöscht?', a: 'Wenn keine Referenz mehr darauf zeigt – der Garbage Collector gibt den Speicher frei.' }
  ],
  quiz: [
    { q: 'Welcher dieser Typen ist eine Referenz?', options: ['int', 'boolean', 'Raumschiff', 'double'], answer: 2, explain: 'Klassen sind komplexe Datentypen → Referenzen.' },
    { q: 'Worauf zeigt <code>private Raumschiff rs;</code> direkt nach dem Erzeugen der Klasse?', options: ['Auf ein leeres Raumschiff', 'Auf null', 'Auf 0', 'Auf das letzte Raumschiff'], answer: 1, explain: 'Ohne new existiert kein Objekt; die Referenz ist null.' },
    { q: 'Was passiert bei <code>rs.setGröße(200.0)</code>, wenn rs null ist?', options: ['Es wird ein Objekt erzeugt', 'Nichts', 'Programmabsturz (NullPointerException)', 'Compilerfehler'], answer: 2, explain: 'Das Programm läuft, bis der Aufruf auf kein Objekt trifft.' },
    { q: 'Was macht <code>aktuell = rs1;</code>?', options: ['Kopiert das Objekt', 'Lässt aktuell auf das gleiche Objekt wie rs1 zeigen', 'Löscht rs1', 'Erzeugt ein neues Objekt'], answer: 1, explain: 'Nur der Pfeil wird kopiert.' },
    { q: 'rs1 und aktuell zeigen auf dasselbe Raumschiff. Du rufst <code>aktuell.setGröße(5)</code> auf. Was gilt für rs1?', options: ['Nichts, es ist ein anderes Objekt', 'rs1 hat dieselbe Größe 5, es ist das gleiche Objekt', 'rs1 wird null', 'Fehler'], answer: 1, explain: 'Beide Pfeile führen zum selben Objekt.' },
    { q: 'Wann löscht der Garbage Collector ein Objekt?', options: ['Sofort nach new', 'Wenn keine Referenz mehr darauf zeigt', 'Wenn es zu groß ist', 'Nie'], answer: 1, explain: 'Unerreichbare Objekte werden freigegeben.' },
    { q: 'Was liefert <code>strA == strB</code> bei zwei getrennt erzeugten Strings "Heute"?', options: ['true', 'false', 'Fehler', 'null'], answer: 1, explain: '== vergleicht Referenzen, und es sind zwei verschiedene Objekte.' },
    { q: 'Wie prüfst du, ob zwei Objekte den gleichen Inhalt haben?', options: ['a == b', 'a.equals(b)', 'a = b', 'a.same(b)'], answer: 1, explain: 'equals() vergleicht den Inhalt.' },
    { q: 'Was bewirkt <code>rs2 = null;</code>?', options: ['Das Objekt wird sofort gelöscht', 'rs2 zeigt auf nichts; das Objekt wird frei, wenn sonst niemand darauf zeigt', 'Fehler', 'rs2 wird 0'], answer: 1, explain: 'Gelöscht wird erst, wenn keine Referenz mehr übrig ist.' }
  ],
  exercises: [
    { task: `<p><b>Aufgabe (Folien):</b></p><pre><code>String s1, s2, s3, s4;
s1 = new String("ABC");
s1 = new String("XYZ");
s2 = new String("ABC");
s3 = s1;
s4 = new String("XYZ");</code></pre><p>a) Zeichne Objekte und Referenzen am Ende der Methode. b) Welche boolean-Werte ergeben <code>s1 == s2</code>, <code>s1 == s3</code>, <code>s1 == s4</code>, <code>s1.equals(s2)</code>, <code>s1.equals(s3)</code>, <code>s1.equals(s4)</code>?</p>`,
      hint: 'Verfolge Zeile für Zeile, wohin jede Referenz zeigt. Ein Objekt ohne Referenz verschwindet.',
      solution: `<p><b>a)</b> Drei Objekte (das erste "ABC" ist durch die Neuzuweisung von s1 unerreichbar):</p><div class="diag">${uml('"XYZ" (Objekt A)', ['← s1, s3'], null, true)}${uml('"ABC" (Objekt B)', ['← s2'], null, true)}${uml('"XYZ" (Objekt C)', ['← s4'], null, true)}</div>
      <p><b>b)</b> <code>s1 == s2</code> false · <code>s1 == s3</code> true · <code>s1 == s4</code> false · <code>s1.equals(s2)</code> false · <code>s1.equals(s3)</code> true · <code>s1.equals(s4)</code> true.</p>` },
    { task: '<p>Was gibt dieser Code aus? Zeichne die Referenzen.<pre><code>Raumschiff a = new Raumschiff();\nRaumschiff b = a;\nb.setGröße(10.0);\nConsole.println(a.getGröße());</code></pre></p>', hint: 'Wie viele Raumschiff-Objekte gibt es?', solution: '<p>Es gibt nur <b>ein</b> Objekt, auf das <code>a</code> und <code>b</code> zeigen. Ausgabe: <b>10.0</b>. Durch <code>b = a</code> wird nur der Pfeil kopiert.</p>' },
    { task: '<p>Finde den Fehler und korrigiere ihn:<pre><code>public class Test {\n    private Raumschiff rs;\n    public void main() {\n        rs.setGröße(100.0);\n    }\n}</code></pre></p>', hint: 'Wo wird rs erzeugt?', solution: '<p><code>rs</code> ist <code>null</code> → NullPointerException. Korrektur: Konstruktor ergänzen:<pre><code>public Test() {\n    rs = new Raumschiff();\n}</code></pre></p>' },
    { task: '<p>Gegeben: <code>Raumschiff x = new Raumschiff(); Raumschiff y = new Raumschiff();</code> beide mit Größe 5. Was ergeben <code>x == y</code> und <code>x.equals(y)</code>, wenn equals die Attribute vergleicht?</p>', hint: 'Zwei verschiedene Objekte mit gleichem Inhalt.', solution: '<p><code>x == y</code> → <b>false</b> (zwei Objekte), <code>x.equals(y)</code> → <b>true</b> (gleicher Inhalt).</p>' }
  ]
});
})();
