// Quelle: Folien "PR Vererbung" + "AB Vererbung" (Ch. Pothmann, cpothmann.de, CC BY-NC-SA 4.0). Abschnitte mit "Zusatz" hat Claude ergänzt.
(function () {
const uml = (name, attrs, meths, obj) => `<div class="uml${obj ? ' obj' : ''}"><div>${name}</div><div>${attrs.join('<br>') || '&nbsp;'}</div>${meths ? `<div>${meths.join('<br>') || '&nbsp;'}</div>` : ''}</div>`;
const up = '<div class="arrow">△</div>';
window.TOPICS.push({
  id: 'vererbung', week: 1, title: 'Vererbung',
  summary: 'Gemeinsamkeiten in eine Oberklasse auslagern, Unterklassen erben – ist-Beziehung vs. hat-Beziehung.',
  sections: [
    { title: 'Das Problem: Rollenspiel', html: `<p>Im Rollenspiel gibt es <b>Krieger</b> und <b>Zauberer</b>. Schau dir beide Klassen an:</p>
      <div class="diag">${uml('Krieger', ['- name: String', '- lebensenergie: int', '- <b>kraft: int</b>'], ['+ setName(String pn)', '+ getName(): String', '+ verwundet(pl: int)', '+ heilen(pl: int)', '+ <b>angreifen()</b>'])}${uml('Zauberer', ['- name: String', '- lebensenergie: int', '- <b>mana: int</b>'], ['+ setName(String pn)', '+ getName(): String', '+ verwundet(pl: int)', '+ heilen(pl: int)', '+ <b>zaubern()</b>'])}</div>
      <p><b>Gemeinsamkeiten:</b> <code>name</code>, <code>lebensenergie</code>, <code>setName</code>, <code>getName</code>, <code>verwundet</code>, <code>heilen</code>.<br><b>Unterschiede</b> (fett): Krieger hat <code>kraft</code> + <code>angreifen()</code>, Zauberer hat <code>mana</code> + <code>zaubern()</code>.</p>
      <p>Alles Gemeinsame doppelt aufzuschreiben ist Verschwendung – und bei einer Änderung müsste man beide Klassen anpassen. Lösung: <b>Vererbung</b>.</p>` },
    { title: 'Die Idee der Vererbung', html: `<p>Das Gemeinsame kommt in eine <b>Oberklasse</b> (hier <code>Charakter</code>). Die <b>Unterklassen</b> <code>Krieger</code> und <code>Zauberer</code>:</p>
      <ul><li><b>erben</b> alle Attribute und Methoden der Oberklasse,</li><li>haben <b>zusätzlich</b> eigene Attribute und Methoden.</li></ul>
      <div class="diag">${uml('Charakter', ['- name: String', '- lebensenergie: int'], ['+ setName(String pn)', '+ getName(): String', '+ verwundet(pl: int)', '+ heilen(pl: int)'])}${up}
      ${uml('Krieger', ['- kraft: int'], ['+ angreifen()'])}${uml('Zauberer', ['- mana: int'], ['+ zaubern()'])}</div>
      <div class="tip"><b>Merke:</b> Der Pfeil zeigt von der <u>Unterklasse</u> zur <u>Oberklasse</u> – mit <b>hohler, geschlossener Dreiecksspitze</b>.</div>` },
    { title: 'Objekte von Unterklassen', html: `<p>Ein Objekt einer Unterklasse hat die Attribute der <b>Oberklasse UND der Unterklasse</b>. Ein Krieger-Objekt besitzt also <code>name</code>, <code>lebensenergie</code> <i>und</i> <code>kraft</code>:</p>
      <div class="diag">${uml('conan : Krieger', ['name = "Conan"', 'lebensenergie = 100', 'kraft = 12'], null, true)}</div>
      <p>Im Objektdiagramm steht immer die <b>tatsächliche Klasse</b> (Krieger), nicht die Oberklasse.</p>` },
    { title: 'ist-Beziehung vs. hat-Beziehung', html: `<table><tr><th>Beziehung</th><th>Beispiel</th><th>UML</th></tr>
      <tr><td><b>ist-ein</b> = Vererbung</td><td>Ein Krieger <i>ist ein</i> Charakter</td><td>Pfeil mit <b>hohler, geschlossener</b> Spitze</td></tr>
      <tr><td><b>hat-ein</b> = Assoziation</td><td>Ein Krieger <i>hat ein</i> Schwert</td><td>Pfeil mit <b>offener</b> Spitze</td></tr></table>
      <div class="tip"><b>Testfrage:</b> Sage „A ist ein B". Klingt es richtig (Krieger ist ein Charakter) → Vererbung. Klingt es falsch (Krieger ist ein Schwert) → Assoziation („Krieger hat ein Schwert").</div>
      <p><b>Objektdiagramm dazu:</b> Das Krieger-Objekt enthält die Attribute von Ober- und Unterklasse. Für das <code>Schwert</code> braucht es ein <b>eigenes Objekt</b>, das mit dem Krieger-Objekt verbunden ist – es steht nicht „im" Krieger.</p>` },
    { title: 'Begriffe (Synonyme)', html: `<table><tr><th>Oberklasse</th><th>Unterklasse</th></tr>
      <tr><td>Superklasse, Basisklasse, Elternklasse, Generalisierung</td><td>Subklasse, abgeleitete Klasse, Kindklasse, Spezialisierung</td></tr></table>
      <p>Diese Wörter kommen in Aufgaben und Klausuren alle vor – lerne sie als Paare.</p>` },
    { title: 'Spielregeln', html: `<ul><li>Eine Oberklasse kann <b>beliebig viele Unterklassen</b> haben.</li>
      <li>Eine Unterklasse kann selbst wieder <b>weitere Unterklassen</b> haben (Vererbungshierarchie, mehrstufig).</li>
      <li>Eine Klasse darf nur <b>eine einzige Oberklasse</b> haben → <b>Mehrfachvererbung ist nicht erlaubt</b>.</li></ul>
      <div class="diag">${uml('Charakter', [], null)}${up}${uml('Krieger', [], null)}${uml('Zauberer', [], null)}<br>${up}<br>${uml('Ritter', [], null)}</div>` },
    { title: 'Zusatz: So sieht das in Java aus', html: `<p><i>Nicht in den Folien, aber der nächste logische Schritt („OOP mit Java").</i></p>
      <pre><code>public class Charakter {
    protected String name;
    protected int lebensenergie;
    public Charakter(String pName) { name = pName; lebensenergie = 100; }
    public void verwundet(int pl) { lebensenergie = lebensenergie - pl; }
}

public class Krieger extends Charakter {   // "extends" = erbt von
    private int kraft;
    public Krieger(String pName, int pKraft) {
        super(pName);                       // Konstruktor der Oberklasse aufrufen
        kraft = pKraft;
    }
    public void angreifen() { ... }
}</code></pre>
      <ul><li><code>extends</code> schreibt die Vererbung.</li><li><code>super(...)</code> ruft den Konstruktor der Oberklasse auf (muss die erste Zeile sein).</li>
      <li><code>private</code> Attribute der Oberklasse sind in der Unterklasse nicht direkt sichtbar → <code>protected</code> oder Getter/Setter nutzen.</li></ul>` }
  ],
  keyPoints: ['Oberklasse = Gemeinsames; Unterklassen erben + haben Zusätzliches', 'Vererbung = ist-Beziehung = hohles Dreieck; Assoziation = hat-Beziehung = offener Pfeil', 'Objekte von Unterklassen haben Attribute von Ober- UND Unterklasse', 'Beliebig viele Unterklassen, aber nur EINE Oberklasse (keine Mehrfachvererbung)', 'Synonyme: Super-/Basis-/Elternklasse ↔ Sub-/abgeleitete/Kindklasse'],
  glossary: [
    { term: 'Vererbung', def: 'Unterklassen übernehmen (erben) Attribute und Methoden einer Oberklasse und können eigene ergänzen.' },
    { term: 'Oberklasse', def: 'Klasse mit den gemeinsamen Attributen/Methoden. Synonyme: Superklasse, Basisklasse, Elternklasse, Generalisierung.' },
    { term: 'Unterklasse', def: 'Klasse, die von einer Oberklasse erbt. Synonyme: Subklasse, abgeleitete Klasse, Kindklasse, Spezialisierung.' },
    { term: 'ist-Beziehung', def: 'Vererbung: „Ein Krieger ist ein Charakter". Pfeil mit hohler, geschlossener Spitze.' },
    { term: 'hat-Beziehung', def: 'Assoziation: „Ein Krieger hat ein Schwert". Pfeil mit offener Spitze.' },
    { term: 'Generalisierung', def: 'Gemeinsamkeiten mehrerer Klassen in eine Oberklasse zusammenfassen.' },
    { term: 'Spezialisierung', def: 'Eine Klasse durch Unterklassen mit zusätzlichen Eigenschaften genauer ausformen.' },
    { term: 'Mehrfachvererbung', def: 'Eine Klasse hat mehrere Oberklassen – in Java nicht erlaubt.' },
    { term: 'extends', def: 'Java-Schlüsselwort für Vererbung: class Krieger extends Charakter.' },
    { term: 'super(...)', def: 'Aufruf des Konstruktors der Oberklasse aus der Unterklasse.' }
  ],
  cards: [
    { q: 'Wie viele Oberklassen darf eine Klasse haben?', a: 'Genau eine (höchstens eine). Mehrfachvererbung ist nicht erlaubt.' },
    { q: 'Wie viele Unterklassen darf eine Oberklasse haben?', a: 'Beliebig viele – und diese dürfen wieder Unterklassen haben.' },
    { q: 'Welche Attribute hat ein Objekt einer Unterklasse?', a: 'Die der Oberklasse und die der Unterklasse.' }
  ],
  quiz: [
    { q: 'Welche Beziehung beschreibt „Ein Krieger ist ein Charakter"?', options: ['Assoziation (hat-Beziehung)', 'Vererbung (ist-Beziehung)', 'Konstruktor', 'Kapselung'], answer: 1, explain: '„ist ein" → Vererbung.' },
    { q: 'Welche Beziehung beschreibt „Ein Krieger hat ein Schwert"?', options: ['Vererbung', 'Assoziation (hat-Beziehung)', 'Mehrfachvererbung', 'Überschreiben'], answer: 1, explain: '„hat ein" → Assoziation, eigenes Schwert-Objekt.' },
    { q: 'Wie sieht der Pfeil bei Vererbung aus?', options: ['Offene Spitze', 'Hohle, geschlossene Dreiecksspitze', 'Gestrichelt ohne Spitze', 'Raute'], answer: 1, explain: 'Vererbung: hohles Dreieck, Assoziation: offener Pfeil.' },
    { q: 'Wohin zeigt der Vererbungspfeil?', options: ['Von der Oberklasse zur Unterklasse', 'Von der Unterklasse zur Oberklasse', 'Von Objekt zu Objekt', 'Es gibt keine feste Richtung'], answer: 1, explain: 'Die Unterklasse „zeigt auf" ihre Oberklasse.' },
    { q: 'Was ist KEIN Synonym für Oberklasse?', options: ['Basisklasse', 'Elternklasse', 'Superklasse', 'Kindklasse'], answer: 3, explain: 'Kindklasse = Unterklasse.' },
    { q: 'Welche Aussage ist falsch?', options: ['Eine Oberklasse kann mehrere Unterklassen haben', 'Eine Unterklasse kann selbst Oberklasse sein', 'Eine Klasse kann zwei Oberklassen haben', 'Unterklassen erben Attribute und Methoden'], answer: 2, explain: 'Mehrfachvererbung ist nicht erlaubt.' },
    { q: 'Ein Krieger-Objekt: Was enthält es?', options: ['Nur die Attribute von Krieger', 'Nur die von Charakter', 'Die von Charakter und Krieger', 'Zusätzlich das gesamte Schwert-Objekt'], answer: 2, explain: 'Ober- und Unterklassenattribute; das Schwert ist ein eigenes Objekt.' },
    { q: 'Wozu dient Vererbung hauptsächlich?', options: ['Programme langsamer machen', 'Doppelten Code vermeiden, Gemeinsames zentral halten', 'Attribute verstecken', 'Objekte löschen'], answer: 1, explain: 'Gemeinsamkeiten stehen nur einmal in der Oberklasse.' },
    { q: 'Wie sagt man in Java, dass Krieger von Charakter erbt?', options: ['class Krieger inherits Charakter', 'class Krieger extends Charakter', 'class Krieger : Charakter', 'class Krieger super Charakter'], answer: 1, explain: 'extends (Zusatzstoff).' }
  ],
  exercises: [
    { task: `<p><b>Aufgabe 1 (AB):</b> Das Klassendiagramm zeigt die Artikel einer Speisekarte: Oberklasse <b>Artikel</b> (name: String, preis: double, kalorien: int; bestellen(), servieren()); Unterklassen <b>Hauptspeise</b> (tellersorte: String, vegetarisch: boolean, salzgehalt: double; zubereiten()), <b>Dessert</b> (dekoration: String, zuckergehalt: double; zubereiten()) und <b>Getränk</b> (gefäß: String, kohlensäure: boolean, alkoholgehalt: double; einschenken()).<br>Gib zu jeder Unterklasse ein Objekt in einem Objektdiagramm mit Beispielwerten an.</p>`,
      hint: 'Jedes Objekt braucht die Attribute der Oberklasse (name, preis, kalorien) UND der eigenen Unterklasse. Keine Methoden, Kopf unterstrichen.',
      solution: `<div class="diag">${uml('lasagne : Hauptspeise', ['name = "Gemüselasagne"', 'preis = 12.50', 'kalorien = 620', 'tellersorte = "flach"', 'vegetarisch = true', 'salzgehalt = 1.8'], null, true)}${uml('obstsalat : Dessert', ['name = "Obstsalat"', 'preis = 5.90', 'kalorien = 180', 'dekoration = "Minzblatt"', 'zuckergehalt = 14.0'], null, true)}${uml('schorle : Getränk', ['name = "Apfelschorle"', 'preis = 3.20', 'kalorien = 90', 'gefäß = "Glas"', 'kohlensäure = true', 'alkoholgehalt = 0.0'], null, true)}</div>
      <p><b>Wichtig:</b> Jedes Objekt enthält 3 geerbte Attribute + die eigenen. Datentypen beachten: Text in Anführungszeichen, <code>true/false</code> für boolean, Kommazahlen für double. Keine Methoden im Objektdiagramm.</p>` },
    { task: `<p><b>Aufgabe 2 (AB):</b> Eine Bibliothek verwaltet Leihartikel. Jeder Artikel hat eine eindeutige ID und einen Namen; er kann ausgeliehen und zurückgegeben werden. Festgehalten werden: wann ausgeliehen, wann Rückgabe fällig, wer ausgeliehen hat.<br>Es gibt <b>Bücher</b> (zusätzlich Autor, ISBN), <b>DVDs</b> (Regisseur, Genre, Altersbeschränkung FSK; man kann sie <i>abspielen</i>) und <b>Spiele</b> (max. Anzahl Mitspieler, Altersempfehlung; Aktionen <i>auspacken</i>, <i>einpacken</i>).<br>Entwirf ein Klassendiagramm mit Vererbung und gib zu jeder Unterklasse ein Beispielobjekt an.</p>`,
      hint: 'Was haben alle drei gemeinsam? Das gehört in die Oberklasse „Leihartikel". Nur das Besondere kommt in Buch, DVD, Spiel. Pfeile mit hohler Spitze zur Oberklasse!',
      solution: `<p><b>Klassendiagramm:</b></p><div class="diag">${uml('Leihartikel', ['- id: int', '- name: String', '- ausleihdatum: String', '- rueckgabedatum: String', '- entleiher: String'], ['+ ausleihen()', '+ zurueckgeben()'])}${up}
      ${uml('Buch', ['- autor: String', '- isbn: String'], [])}${uml('DVD', ['- regisseur: String', '- genre: String', '- fsk: int'], ['+ abspielen()'])}${uml('Spiel', ['- maxSpieler: int', '- altersempfehlung: int'], ['+ auspacken()', '+ einpacken()'])}</div>
      <p><b>Beispielobjekte:</b></p><div class="diag">${uml('b1 : Buch', ['id = 101', 'name = "Momo"', 'ausleihdatum = "02.10.2026"', 'rueckgabedatum = "30.10.2026"', 'entleiher = "Lena Kraus"', 'autor = "Michael Ende"', 'isbn = "978-3522202152"'], null, true)}${uml('d1 : DVD', ['id = 205', 'name = "Der Hobbit"', 'ausleihdatum = "05.10.2026"', 'rueckgabedatum = "12.10.2026"', 'entleiher = "Tom Berg"', 'regisseur = "Peter Jackson"', 'genre = "Fantasy"', 'fsk = 12'], null, true)}${uml('s1 : Spiel', ['id = 310', 'name = "Catan"', 'ausleihdatum = "01.10.2026"', 'rueckgabedatum = "15.10.2026"', 'entleiher = "Mia Roth"', 'maxSpieler = 4', 'altersempfehlung = 10'], null, true)}</div>
      <p><b>Begründung:</b> ID, Name, Ausleih-/Rückgabedatum, Entleiher und die Aktionen ausleihen/zurückgeben gelten für <i>alle</i> Artikel → Oberklasse. Alles andere ist spezifisch → Unterklassen. Alternativ (auch gut): eine eigene Klasse <code>Kunde</code> und eine <b>Assoziation</b> „Leihartikel → Kunde" (hat-Beziehung) statt <code>entleiher: String</code>.</p>` },
    { task: '<p>Zeichne Klassendiagramme (nur Klassennamen) für: <i>Tier</i>, <i>Hund</i>, <i>Katze</i>, <i>Pudel</i> mit korrekten Pfeilen. Ist „Pudel" eine Unterklasse von „Katze"?</p>', hint: 'Pudel ist ein Hund. Prüfe jeweils mit „ist ein".', solution: '<p>Tier ← Hund, Tier ← Katze (je hohler Pfeil zur Oberklasse), Hund ← Pudel. Pudel ist <b>keine</b> Unterklasse von Katze („Ein Pudel ist eine Katze" stimmt nicht). Pudel hat als einzige Oberklasse Hund (Tier erbt er mittelbar).</p>' },
    { task: '<p>Entscheide jeweils: Vererbung oder Assoziation? a) Auto – Motor  b) Lehrer – Person  c) Haus – Zimmer  d) Rechteck – Vieleck</p>', hint: '„ist ein" oder „hat ein"?', solution: '<p>a) Assoziation (Auto hat einen Motor). b) Vererbung (Lehrer ist eine Person). c) Assoziation (Haus hat Zimmer). d) Vererbung (Rechteck ist ein Vieleck).</p>' }
  ]
});
})();
