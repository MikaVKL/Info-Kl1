// Grundlagen-Thema – von Claude ergänzt (nötig für Vererbung & alle Diagrammaufgaben).
(function(){
const uml = (name, attrs, meths, obj) => `<div class="uml${obj ? ' obj' : ''}"><div>${name}</div><div>${attrs.join('<br>') || '&nbsp;'}</div>${meths ? `<div>${meths.join('<br>') || '&nbsp;'}</div>` : ''}</div>`;
window.TOPICS.push({
  id: 'uml-diagramme', week: 0, title: 'Klassen- und Objektdiagramme (UML)',
  summary: 'So zeichnest du Klassen und Objekte – Pflichtwissen für jede Diagrammaufgabe.',
  sections: [
    { title: 'Klassendiagramm: der Bauplan', html: `<p>Eine Klasse wird als Rechteck mit <b>3 Fächern</b> gezeichnet:</p>
      <div class="diag">${uml('Krieger', ['- name: String', '- lebensenergie: int', '- kraft: int'], ['+ setName(String pn)', '+ getName(): String', '+ angreifen()'])}</div>
      <ol><li><b>Oben:</b> Klassenname (Großbuchstabe, Einzahl)</li><li><b>Mitte:</b> Attribute <code>- name: Typ</code></li><li><b>Unten:</b> Methoden <code>+ name(Parameter): Rückgabetyp</code></li></ol>
      <div class="tip"><code>-</code> = private, <code>+</code> = public. Der Datentyp steht <u>hinter</u> dem Doppelpunkt.</div>` },
    { title: 'Objektdiagramm: ein konkretes Exemplar', html: `<p>Ein Objekt hat nur <b>2 Fächer</b>: oben <u>objektname : Klasse</u> (unterstrichen!), unten die Attribute mit <b>konkreten Werten</b>. Methoden stehen nicht drin, sie sind ja bei allen Objekten der Klasse gleich.</p>
      <div class="diag">${uml('conan : Krieger', ['name = "Conan"', 'lebensenergie = 100', 'kraft = 12'], null, true)}</div>
      <table><tr><th></th><th>Klassendiagramm</th><th>Objektdiagramm</th></tr>
      <tr><td>zeigt</td><td>Bauplan</td><td>konkretes Objekt zu einem Zeitpunkt</td></tr>
      <tr><td>Kopf</td><td>Klassenname</td><td><u>objekt : Klasse</u></td></tr>
      <tr><td>Attribute</td><td>Name: Typ</td><td>Name = Wert</td></tr>
      <tr><td>Methoden</td><td>ja</td><td>nein</td></tr></table>` },
    { title: 'Beziehungen: Vererbung und Assoziation', html: `<ul><li><b>Vererbung</b> („ist-ein"): Pfeil mit <b>geschlossener, hohler Spitze</b> △ von der Unterklasse zur Oberklasse.</li>
      <li><b>Assoziation</b> („hat-ein"): Pfeil/Linie mit <b>offener</b> Spitze, z. B. Krieger → Schwert.</li></ul>
      <div class="warn">Die Pfeilspitzen sind unterschiedlich – in der Arbeit wird genau darauf geachtet!</div>` },
    { title: 'Werkzeug: UMLet', html: '<p>Mit <b>UMLet</b> (oder im Browser: <a href="http://www.umletino.com" target="_blank" rel="noopener">umletino.com</a>) zeichnest du die Diagramme am Rechner. In der Klausur wird natürlich von Hand gezeichnet – Lineal benutzen und die drei Fächer sauber trennen.</p>' }
  ],
  keyPoints: ['Klassendiagramm: 3 Fächer (Name, Attribute, Methoden)', 'Objektdiagramm: 2 Fächer, Name unterstrichen (obj : Klasse), Attribute mit Werten', '- private, + public', 'Vererbung = hohles Dreieck, Assoziation = offener Pfeil'],
  glossary: [
    { term: 'UML', def: 'Unified Modeling Language – genormte Diagrammsprache zur Modellierung von Software.' },
    { term: 'Klassendiagramm', def: 'Zeigt Klassen mit Attributen, Methoden und Beziehungen (Bauplan-Sicht).' },
    { term: 'Objektdiagramm', def: 'Zeigt konkrete Objekte mit Attributwerten (Momentaufnahme).' },
    { term: 'Assoziation', def: '„hat-Beziehung" zwischen Klassen, z. B. Krieger hat ein Schwert.' }
  ],
  quiz: [
    { q: 'Wie viele Fächer hat ein Klassenkästchen?', options: ['1', '2', '3', '4'], answer: 2, explain: 'Name, Attribute, Methoden.' },
    { q: 'Wie wird der Kopf eines Objekts im Objektdiagramm geschrieben?', options: ['Klassenname', 'objektname : Klasse, unterstrichen', 'Klasse.objekt', 'nur der Wert'], answer: 1, explain: 'Beispiel: <u>conan : Krieger</u>' },
    { q: 'Was steht im Objektdiagramm bei den Attributen?', options: ['Name: Typ', 'Name = Wert', 'nur Namen', 'Methoden'], answer: 1, explain: 'Konkrete Werte, z. B. kraft = 12.' },
    { q: 'Welche Pfeilspitze bedeutet Vererbung?', options: ['offen', 'geschlossen, hohl (Dreieck)', 'Raute', 'keine'], answer: 1, explain: 'Vererbung: hohles Dreieck; Assoziation: offener Pfeil.' },
    { q: 'Was heißt <code>+ heilen(pl: int)</code>?', options: ['private Methode mit Parameter pl', 'öffentliche Methode mit int-Parameter pl', 'Attribut heilen', 'Konstruktor'], answer: 1, explain: '+ = public, in Klammern der Parameter.' }
  ],
  exercises: [
    { task: `<p>Zeichne das Klassendiagramm für <code>Buch</code> mit <code>titel: String</code>, <code>seiten: int</code> und der Methode <code>getTitel(): String</code>.</p>`, hint: 'Drei Fächer, Sichtbarkeitszeichen nicht vergessen.', solution: `<div class="diag">${uml('Buch', ['- titel: String', '- seiten: int'], ['+ getTitel(): String'])}</div>` },
    { task: '<p>Zeichne ein Objektdiagramm für ein Buch „Momo" mit 300 Seiten.</p>', hint: 'Kopf unterstrichen, Werte statt Typen.', solution: `<div class="diag">${uml('momo : Buch', ['titel = "Momo"', 'seiten = 300'], null, true)}</div><p>Kein Methodenfach, Name unterstrichen.</p>` }
  ]
});
})();
