// Quelle: Folien "PR Vererbung im Quellcode" + "AB Vererbung im Quellcode" (Ch. Pothmann, cpothmann.de, CC BY-NC-SA 4.0). Abschnitte mit "Zusatz" hat Claude ergänzt.
(function () {
const uml = (name, attrs, meths, obj) => `<div class="uml${obj ? ' obj' : ''}"><div>${name}</div><div>${attrs.join('<br>') || '&nbsp;'}</div>${meths ? `<div>${meths.join('<br>') || '&nbsp;'}</div>` : ''}</div>`;
window.TOPICS.push({
  id: 'vererbung-quellcode', week: 2, title: 'Vererbung im Quellcode',
  summary: 'extends, Unterklassen programmieren, Objekte erzeugen und Methoden aus Ober- und Unterklasse aufrufen.',
  sections: [
    { title: 'Was du vorher wissen musst', html: `<p>Dieses Thema setzt das Thema <b>Vererbung</b> (Konzept) voraus: Oberklasse, Unterklasse, ist-Beziehung, Klassendiagramm. Neu ist jetzt: <b>Wie schreibt man das in Java?</b></p>
      <div class="tip">Wichtig aus den Grundlagen: Attribute sind <code>private</code>, gelesen und geändert wird über <b>Getter/Setter</b>. Ein Objekt erzeugt man mit <code>new</code>, Methoden ruft man mit <code>objekt.methode()</code> auf.</div>` },
    { title: 'Die Oberklasse: keine Änderung', html: `<p>Die Oberklasse wird ganz normal programmiert – sie „weiß" nicht, dass jemand von ihr erbt.</p>
      <pre><code>public class Charakter
{
    private String name;
    private int lebensenergie;

    public void setName(String pn)
    {
        name = pn;
    }
    ...
}</code></pre>` },
    { title: 'Die Unterklasse: Schlüsselwort extends', html: `<pre><code>public class Krieger extends Charakter
{
    private int kraft;

    public void angreifen()
    {
        ...
    }
}

public class Zauberer extends Charakter
{
    private int mana;

    public void zaubern()
    {
        ...
    }
}</code></pre>
      <p><code>Krieger extends Charakter</code> bedeutet: Krieger <b>„erweitert"</b> Charakter um neue Attribute (<code>kraft</code>) und Methoden (<code>angreifen</code>). Alles aus <code>Charakter</code> (name, lebensenergie, setName …) ist automatisch mit dabei – es wird <u>nicht</u> nochmal hingeschrieben.</p>
      <div class="warn"><b>Häufiger Fehler:</b> Attribute und Methoden der Oberklasse in der Unterklasse noch einmal schreiben. Das ist doppelter Code und genau das, was Vererbung vermeiden soll!</div>` },
    { title: 'Die Hauptklasse: „hat" Objekte', html: `<p>Eine Hauptklasse (hier <code>Rollenspiel</code>) <b>hat</b> ein Krieger- und ein Zauberer-Objekt. Das ist eine <b>Assoziation</b> (hat-Beziehung, offener Pfeil) – kein Vererbungspfeil!</p>
      <pre><code>public class Rollenspiel
{
    private Krieger kr;       // Attribut vom Typ Krieger
    private Zauberer zb;

    public Rollenspiel()      // Konstruktor erzeugt die Objekte
    {
        kr = new Krieger();
        zb = new Zauberer();
    }
    ...
}</code></pre>
      <p>Objekte von Unterklassen werden <b>genauso deklariert und erzeugt</b> wie alle anderen: Typ, Name, <code>new Klassenname()</code>.</p>` },
    { title: 'Methoden aufrufen', html: `<pre><code>public void main()
{
    kr.setName("Angor");     // aus Charakter (Oberklasse)
    kr.verwunden(10);        // aus Charakter (Oberklasse)
    kr.angreifen();          // aus Krieger (Unterklasse)

    zb.setName("Belsatar");  // aus Charakter (Oberklasse)
    zb.zaubern();            // aus Zauberer (Unterklasse)
}</code></pre>
      <p>Auf einem Krieger-Objekt können Methoden der <b>Oberklasse UND der Unterklasse</b> aufgerufen werden. Umgekehrt gilt: Ein Charakter-Objekt kennt <code>angreifen()</code> nicht!</p>
      <div class="tip">Merksatz: <b>Vererbung geht nur nach unten.</b> Die Unterklasse bekommt alles von oben, die Oberklasse weiß nichts von ihren Unterklassen.</div>` },
    { title: 'Zusatz: private Attribute der Oberklasse', html: `<p><i>Nicht auf den Folien, aber wichtig für die Aufgabe:</i> Ein <code>private</code> Attribut der Oberklasse wird zwar vererbt, aber die Unterklasse darf nicht direkt darauf zugreifen.</p>
      <pre><code>// in Krieger:
name = "Angor";          // FEHLER: name ist private in Charakter
setName("Angor");        // richtig: über die öffentliche Methode</code></pre>
      <p>Deshalb gibt es in der Oberklasse die Getter/Setter. Von außen und auch aus der Unterklasse nutzt du sie.</p>
      <p>Konstruktor: Schreibst du keinen, hat jede Klasse automatisch einen leeren Standardkonstruktor – deshalb reicht <code>new Krieger()</code>.</p>` },
    { title: 'Beispiel: Zoo (Arbeitsblatt)', html: `<p>Klassendiagramm des Arbeitsblatts: <code>LandTier</code> und <code>WasserTier</code> erben von <code>Tier</code>; die <code>ZooVerwaltung</code> <i>hat</i> ein LandTier (<code>lati</code>) und ein WasserTier (<code>wati</code>).</p>
      <div class="diag">${uml('Tier', ['- art: String', '- name: String'], ['+ setArt(pa: String)', '+ getArt(): String', '+ setName(pn: String)', '+ getName(): String'])}<div class="arrow">△</div>
      ${uml('LandTier', ['- auslauf: double'], ['+ setAuslauf(pa: double)', '+ getAuslauf(): double'])}${uml('WasserTier', ['- beckenVol: double'], ['+ setBeckenVol(pv: double)', '+ getBeckenVol(): double'])}<br>
      ${uml('ZooVerwaltung', [], ['+ ZooVerwaltung()', '+ main()'])}<p class="muted">ZooVerwaltung → LandTier (lati), ZooVerwaltung → WasserTier (wati): offene Pfeile = hat-Beziehung</p></div>` }
  ],
  keyPoints: ['Unterklasse: public class Krieger extends Charakter', 'Geerbtes NICHT nochmal schreiben – nur das Neue', 'Objekte von Unterklassen deklarieren/erzeugen wie alle anderen (new Krieger())', 'Auf dem Objekt sind Methoden von Ober- UND Unterklasse aufrufbar', 'Hauptklasse hat Objekte als Attribute → Assoziation (offener Pfeil)', 'Private Oberklassen-Attribute nur über Getter/Setter ansprechen'],
  glossary: [
    { term: 'extends', def: 'Schlüsselwort, mit dem eine Klasse von einer anderen erbt: class Krieger extends Charakter.' },
    { term: 'Hauptklasse', def: 'Klasse, die die anderen Objekte besitzt, erzeugt und benutzt (z. B. Rollenspiel, ZooVerwaltung).' },
    { term: 'main-Methode', def: 'Methode, in der das Programm abläuft: Objekte werden benutzt, Methoden aufgerufen.' },
    { term: 'Standardkonstruktor', def: 'Leerer Konstruktor, den Java automatisch anlegt, wenn du keinen schreibst.' },
    { term: 'Punktnotation', def: 'Methodenaufruf über das Objekt: objekt.methode(parameter).' },
    { term: 'erweitern', def: 'Die Unterklasse „erweitert" die Oberklasse um neue Attribute und Methoden.' }
  ],
  cards: [
    { q: 'Wie sagt man in Java: Zauberer erbt von Charakter?', a: 'public class Zauberer extends Charakter' },
    { q: 'Darf die Unterklasse direkt auf ein private-Attribut der Oberklasse zugreifen?', a: 'Nein – nur über die öffentlichen Methoden (Getter/Setter) der Oberklasse.' },
    { q: 'Wie erzeugst du ein Objekt der Unterklasse Krieger?', a: 'Krieger kr = new Krieger();  (genau wie bei jeder anderen Klasse)' }
  ],
  quiz: [
    { q: 'Welches Schlüsselwort verwendet man für Vererbung in Java?', options: ['inherits', 'extends', 'implements', 'super'], answer: 1, explain: 'class Unterklasse extends Oberklasse.' },
    { q: 'Was muss in der Unterklasse <code>Krieger</code> stehen?', options: ['Alle Attribute und Methoden von Charakter nochmal', 'Nur die neuen Attribute und Methoden', 'Nichts', 'Nur die Konstruktoren'], answer: 1, explain: 'Geerbtes gilt automatisch, es steht nur das Neue in der Unterklasse.' },
    { q: 'Ist <code>kr.setName("Angor")</code> erlaubt, wenn setName in Charakter steht und kr ein Krieger ist?', options: ['Ja, geerbt', 'Nein, setName gehört nicht zu Krieger', 'Nur in der Oberklasse', 'Nur mit super'], answer: 0, explain: 'Krieger erbt setName von Charakter.' },
    { q: 'Kann ein Charakter-Objekt <code>angreifen()</code> ausführen?', options: ['Ja', 'Nein, angreifen() gehört nur zu Krieger', 'Ja, wenn es private ist', 'Nur in main'], answer: 1, explain: 'Vererbung geht nur nach unten.' },
    { q: 'Was zeigt die Beziehung Rollenspiel → Krieger?', options: ['Vererbung', 'Assoziation (hat-Beziehung)', 'Kapselung', 'Überschreiben'], answer: 1, explain: 'Rollenspiel hat ein Krieger-Objekt als Attribut.' },
    { q: 'Wie erzeugst du ein Zauberer-Objekt zb?', options: ['zb = new Zauberer();', 'zb = Zauberer();', 'Zauberer zb extends Charakter;', 'new zb Zauberer;'], answer: 0, explain: 'Genau wie bei anderen Klassen: new Klassenname().' },
    { q: 'Wo werden die Objekte der Unterklassen in den Folien erzeugt?', options: ['In Krieger', 'Im Konstruktor der Hauptklasse Rollenspiel', 'In Charakter', 'In BlueJ automatisch'], answer: 1, explain: 'Der Konstruktor von Rollenspiel ruft new Krieger() und new Zauberer() auf.' },
    { q: 'In LandTier steht <code>art = "Eisbär";</code>. Was passiert (art ist private in Tier)?', options: ['Es funktioniert', 'Compilerfehler: kein Zugriff auf private Attribut der Oberklasse', 'Art wird neu angelegt', 'Laufzeitfehler beim Start'], answer: 1, explain: 'Stattdessen setArt("Eisbär") benutzen.' }
  ],
  exercises: [
    { task: `<p><b>Arbeitsblatt a) i.</b> Implementiere in BlueJ die Klassen <code>LandTier</code> und <code>WasserTier</code> (Attribute und Methoden laut Diagramm; <code>Tier</code> ist als Vorlage schon da).</p>`,
      hint: 'Beide Klassen nutzen extends Tier. Nur auslauf bzw. beckenVol samt Setter/Getter hinschreiben. name und art gehören zu Tier!',
      solution: `<pre><code>public class LandTier extends Tier
{
    private double auslauf;

    public void setAuslauf(double pa)
    {
        auslauf = pa;
    }

    public double getAuslauf()
    {
        return auslauf;
    }
}

public class WasserTier extends Tier
{
    private double beckenVol;

    public void setBeckenVol(double pv)
    {
        beckenVol = pv;
    }

    public double getBeckenVol()
    {
        return beckenVol;
    }
}</code></pre><p>Nicht nochmal <code>art</code> und <code>name</code> schreiben – die kommen von <code>Tier</code>.</p>` },
    { task: `<p><b>Arbeitsblatt a) ii. + iii.</b> Implementiere <code>ZooVerwaltung</code>: Der Konstruktor erzeugt die beiden Tier-Objekte (<code>lati</code>, <code>wati</code>); die <code>main</code>-Methode setzt für beide alle Attribute mit den Set-Methoden. Werte darfst du dir ausdenken.</p>`,
      hint: 'Zwei Attribute in der Klasse (private LandTier lati; private WasserTier wati;), im Konstruktor new. In main: 3 Setter pro Objekt (art, name und das Spezielle).',
      solution: `<pre><code>public class ZooVerwaltung
{
    private LandTier lati;
    private WasserTier wati;

    public ZooVerwaltung()
    {
        lati = new LandTier();
        wati = new WasserTier();
    }

    public void main()
    {
        lati.setArt("Eisbär");      // aus Tier
        lati.setName("Fridolin");   // aus Tier
        lati.setAuslauf(500.0);     // aus LandTier

        wati.setArt("Delfin");      // aus Tier
        wati.setName("Flipper");    // aus Tier
        wati.setBeckenVol(300.0);   // aus WasserTier
    }
}</code></pre><p>Test in BlueJ: Rechtsklick auf ZooVerwaltung → <i>new ZooVerwaltung()</i>, dann Rechtsklick auf das Objekt → <i>main()</i>, danach Objekte inspizieren.</p>` },
    { task: `<p><b>Arbeitsblatt b)</b> Zeichne ein Objektdiagramm des Programms am Ende der Ausführung von <code>main</code>.</p>`,
      hint: 'Drei Objekte: ZooVerwaltung, LandTier, WasserTier. Die Tier-Objekte enthalten die geerbten Attribute + eigenes. Die Verwaltung ist mit beiden verbunden (Namen lati und wati).',
      solution: `<div class="diag">${uml('zoo : ZooVerwaltung', [], null, true)}<p class="muted">lati ↓ &nbsp;&nbsp;&nbsp; wati ↓ (Verbindungslinien vom Zoo-Objekt zu den Tieren)</p>
      ${uml('lati : LandTier', ['art = "Eisbär"', 'name = "Fridolin"', 'auslauf = 500.0'], null, true)}${uml('wati : WasserTier', ['art = "Delfin"', 'name = "Flipper"', 'beckenVol = 300.0'], null, true)}</div>
      <p>Wichtig: Die Tier-Objekte haben <b>alle</b> Attribute (art und name aus <code>Tier</code>, dazu das eigene). Das Objekt <code>zoo</code> hat keine Datenattribute, nur die Referenzen <code>lati</code> und <code>wati</code> (Linien zu den anderen Objekten). Keine Methoden.</p>` },
    { task: '<p>Finde den Fehler: <pre><code>public class Krieger extends Charakter {\n    private String name;\n    private int kraft;\n    ...\n}</code></pre></p>', hint: 'Steht name schon in Charakter?', solution: '<p><code>name</code> ist bereits in <code>Charakter</code> – es darf in Krieger <b>nicht</b> nochmal deklariert werden (doppelter Code; das Objekt hätte sonst zwei verschiedene name-Variablen). Nur <code>kraft</code> bleibt.</p>' }
  ]
});
})();
