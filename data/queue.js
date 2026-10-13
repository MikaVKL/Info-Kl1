// Quelle: Arbeitsblatt "Queue Methoden", Exit-Ticket "Queue", Sicherung "Vom Tisch zum Blatt" (Ch. Pothmann, cpothmann.de, CC BY-NC-SA 4.0).
// Abschnitte mit "Zusatz" und die Lösungen hat Claude ergänzt. Das Bild des Exit-Tickets war nicht lesbar, siehe Hinweis in der Aufgabe.
(function () {
const uml = (name, attrs, meths, obj) => `<div class="uml${obj ? ' obj' : ''}"><div>${name}</div><div>${attrs.join('<br>') || '&nbsp;'}</div>${meths ? `<div>${meths.join('<br>') || '&nbsp;'}</div>` : ''}</div>`;
// Zeichnet eine Warteschlange als Kette von Knoten: Kopf ganz links, Ende ganz rechts
const chain = names => {
  if (!names.length) return '<div class="diag"><div class="uml obj"><div>q : Queue</div><div>head = null<br>tail = null</div></div></div>';
  const boxes = names.map((n, i) => `<div style="display:inline-block;vertical-align:top;text-align:center;margin:4px 2px">
    <div class="muted" style="font-size:.8rem;min-height:1.3em">${i === 0 ? 'head ↓' : ''}${i === 0 && i === names.length - 1 ? ' ' : ''}${i === names.length - 1 ? (i === 0 ? '' : '') + 'tail ↓' : ''}</div>
    <div class="uml obj" style="min-width:0;margin:0"><div>k${i + 1} : QueueNode</div><div>content → ${n}<br>next → ${i < names.length - 1 ? 'k' + (i + 2) : 'null'}</div></div></div>`);
  return '<div class="diag" style="white-space:nowrap">' + boxes.join('<span style="display:inline-block;vertical-align:top;margin-top:56px">→</span>') + '</div>';
};
window.TOPICS.push({
  id: 'queue', week: 5, title: 'Queue (Warteschlange)',
  summary: 'Warteschlange mit head, tail und Knoten: enqueue, dequeue, front, isEmpty und das Objektdiagramm dazu.',
  sections: [
    { title: 'Die Idee', html: `<p>Eine <b>Queue</b> (Warteschlange) funktioniert wie eine Schlange vor der Kasse oder im Wartezimmer: <b>Wer zuerst kommt, wird zuerst bedient.</b> Das Prinzip heißt <b>FIFO</b> (<i>First In, First Out</i>).</p>
      <ul><li>Neue Elemente stellen sich <b>hinten</b> an.</li><li>Bearbeitet und entfernt wird <b>vorne</b>.</li></ul>
      <p>Das Schulministerium stellt dafür fertige Java-Klassen bereit (auch für Stack, Liste usw.). Du benutzt sie nur und musst sie nicht selbst programmieren.</p>` },
    { title: 'Aufbau: Queue, QueueNode, head, tail, next, content', html: `<p>Beispiel: eine Warteschlange für Patienten im Wartezimmer.</p>
      <div class="diag">${uml('Wartezimmer', [], ['+ Wartezimmer()', '+ main()'])} → <span class="muted">- queue</span> → ${uml('Queue&lt;Patient&gt;', [], [])} → <span class="muted">- head, - tail</span> → ${uml('QueueNode&lt;Patient&gt;', [], [])}</div>
      <div class="diag">${uml('QueueNode', [], [])} → <span class="muted">- content</span> → ${uml('Patient', ['- name: String', '- ankunft: int'], ['+ Patient(pn: String, pa: int)', '+ getName(): String', '+ getAnkunft(): int'])}</div>
      <ul><li>Das <b>Queue</b>-Objekt verwaltet die Schlange. Es hat zwei Referenzen: <b><code>head</code></b> (Kopf, Anfang) und <b><code>tail</code></b> (Schwanz, Ende).</li>
      <li>Jedes Objekt in der Schlange hängt an einem eigenen <b>QueueNode</b> (Knoten).</li>
      <li>Der Knoten kennt seinen <b>Nachfolger</b> über die Referenz <b><code>next</code></b> (zeigt auf den nächsten QueueNode; beim letzten ist sie <code>null</code>).</li>
      <li>Der Knoten kennt seinen <b>Inhalt</b> über die Referenz <b><code>content</code></b> (hier ein Patient). Weil man Queues auch für andere Dinge nutzt (Vokabelkarten, Netzwerkpakete …), heißt sie allgemein „content".</li></ul>
      <div class="tip"><b>Merke:</b> Ein Knoten kennt seinen Nachfolger, aber <u>nicht</u> seinen Vorgänger. Die Queue kennt nur Anfang und Ende. Alles dazwischen findet man nur, indem man von Knoten zu Knoten über <code>next</code> wandert.</div>
      <p><b>Zustand mit zwei Patienten:</b></p>${chain(['Löw', 'Klinsmann'])}` },
    { title: 'Generisch: Queue&lt;Patient&gt;', html: `<p>Die Klasse Queue ist <b>generisch</b>: Der Platzhalter <code>ContentType</code> wird bei der Deklaration ersetzt. <code>Queue&lt;Patient&gt; q1;</code> nimmt nur Patienten auf. Dann steht überall <code>Patient</code>, wo vorher <code>ContentType</code> stand (<code>enqueue(Patient pContent)</code>, <code>Patient front()</code>).</p>
      <p>Mehr dazu im Grundlagen-Thema „Generische Klassen".</p>` },
    { title: 'Die Methoden der Klasse Queue', html: `<p>In eigenen Projekten brauchst du <b>nur die Methoden der Klasse Queue</b>. Die Methoden von QueueNode sind nur für die Implementierung der Queue nötig und für dich nicht relevant.</p>
      <table><tr><th>Methode</th><th>Wirkung</th></tr>
      <tr><td><code>Queue()</code></td><td>Konstruktor: erzeugt eine <b>leere</b> Warteschlange. <code>head</code> und <code>tail</code> sind <code>null</code>.</td></tr>
      <tr><td><code>boolean isEmpty()</code></td><td><code>true</code>, wenn die Queue leer ist (kein Inhaltsobjekt).</td></tr>
      <tr><td><code>void enqueue(Patient pContent)</code></td><td>(„anstellen") Fügt ein Objekt <b>am Ende</b> ein. Es wird ein neuer QueueNode erzeugt und an den bisher letzten gehängt; <code>tail</code> zeigt jetzt auf den neuen Knoten. War die Queue leer, zeigen <code>head</code> <u>und</u> <code>tail</code> auf den neuen Knoten.</td></tr>
      <tr><td><code>void dequeue()</code></td><td>Entfernt das Objekt <b>am Anfang</b>. <code>head</code> wird auf den nächsten Knoten verschoben. War es das einzige Element, sind <code>head</code> und <code>tail</code> danach <code>null</code>. (Gibt es keine Referenz mehr auf den Patienten, wird das Objekt gelöscht.)</td></tr>
      <tr><td><code>Patient front()</code></td><td>Liefert eine Referenz auf das Objekt <b>am Anfang</b>, <u>ohne es zu entfernen</u>. Bei leerer Queue: <code>null</code>.</td></tr></table>
      <div class="warn"><b>Wichtig:</b> <code>dequeue()</code> entfernt nur und gibt <u>nichts</u> zurück (void). Wer wissen will, wer vorne steht, ruft erst <code>front()</code> auf und danach <code>dequeue()</code>.</div>
      <pre><code>if (!queue.isEmpty())
{
    p = queue.front();     // erst nachsehen ...
    queue.dequeue();       // ... dann entfernen
}</code></pre>` },
    { title: 'Was passiert bei enqueue und dequeue?', html: `<p>Start: leere Queue. Patient <i>A</i> kommt, dann <i>B</i>, dann <i>C</i>:</p>
      <p><b>leer</b> (<code>new Queue()</code>):</p>${chain([])}
      <p><b>enqueue(A)</b>: neuer Knoten, <code>head</code> und <code>tail</code> zeigen auf ihn:</p>${chain(['A'])}
      <p><b>enqueue(B)</b>: neuer Knoten hinten, <code>next</code> des alten letzten Knotens zeigt auf ihn, <code>tail</code> wandert:</p>${chain(['A', 'B'])}
      <p><b>enqueue(C)</b>:</p>${chain(['A', 'B', 'C'])}
      <p><b>dequeue()</b>: <code>head</code> wandert auf den nächsten Knoten. Knoten k1 und Patient A haben dann (je nach weiteren Referenzen) keine Zuordnung mehr:</p>${chain(['B', 'C'])}
      <table><tr><th></th><th>Diese Referenzen ändern sich</th></tr>
      <tr><td><b>enqueue</b></td><td><code>next</code> des bisher letzten Knotens (neu: zeigt auf neuen Knoten), <code>tail</code> der Queue. Bei leerer Queue auch <code>head</code>.</td></tr>
      <tr><td><b>dequeue</b></td><td>Nur <code>head</code> der Queue. Bei letztem Element auch <code>tail</code> (→ null).</td></tr></table>
      <div class="tip"><b>Warum hilft ein Verweis auf das Ende (tail)?</b> Ohne <code>tail</code> müsste man für <code>enqueue</code> die ganze Schlange von head aus über <code>next</code> durchlaufen, bis man hinten ankommt. Mit <code>tail</code> geht das Anstellen sofort.</div>` },
    { title: 'Löschen durch Referenzverlust', html: `<p>Nach <code>dequeue()</code> hängt kein Knoten mehr am entfernten Patienten und kein <code>head</code> zeigt mehr darauf. Gibt es <b>keine Referenz mehr</b>, löscht der Garbage Collector das Objekt (siehe Thema „Referenzen"). Hat aber eine <b>andere Variable</b> den Patienten noch im Zugriff (z. B. <code>p = queue.front()</code> vor dem dequeue), bleibt das Patientenobjekt erhalten.</p>` },
    { title: 'Offizielle Dokumentation (Zentralabitur)', html: `<p>Die Klasse <code>Queue&lt;ContentType&gt;</code> ist auch im Zentralabitur dokumentiert. Das steht dort zusätzlich:</p>
      <ul><li>Alle Methoden haben eine <b>konstante Laufzeit</b>, unabhängig davon, wie viele Objekte in der Queue sind.</li>
      <li><code>enqueue(null)</code>: Die Schlange bleibt <b>unverändert</b>.</li>
      <li><code>dequeue()</code> bei leerer Schlange: bleibt unverändert (kein Fehler).</li>
      <li><code>front()</code> verändert die Schlange <b>nicht</b>; bei leerer Schlange kommt <code>null</code> zurück.</li>
      <li><code>Queue()</code>: „Eine leere Schlange wird erzeugt. Objekte müssen vom Typ ContentType sein."</li></ul>` },
    { title: 'Zusatz: Queue und Array im Vergleich', html: `<p><i>Aus der Aufgabe „Für Schnelle".</i></p>
      <table><tr><th></th><th>Array</th><th>Queue (verkettet)</th></tr>
      <tr><td>Größe</td><td>fest bei der Erzeugung</td><td>wächst und schrumpft dynamisch</td></tr>
      <tr><td>Zugriff</td><td>direkt über Index (<code>a[7]</code>)</td><td>nur am Anfang (<code>front</code>), Rest nur durch Durchwandern</td></tr>
      <tr><td>Einfügen/Entfernen</td><td>Elemente müssen verschoben werden bzw. Platz muss reserviert sein</td><td>schnell: nur wenige Referenzen ändern sich</td></tr>
      <tr><td>Reihenfolge</td><td>beliebig</td><td>FIFO: erst der Älteste</td></tr>
      <tr><td>Speicher</td><td>reserviert alle Plätze sofort</td><td>pro Element ein Knoten (etwas mehr Platz pro Element)</td></tr></table>` },
    { title: 'Zusatz: Ausblick Stack', html: '<p>Der <b>Stack</b> (Stapel) ist die Gegenstück-Datenstruktur: <b>LIFO</b> (<i>Last In, First Out</i>), wie ein Tellerstapel. Wird in den nächsten Themen wichtig; die Idee mit Knoten und Referenzen ist dieselbe.</p>' }
  ],
  keyPoints: ['Queue = FIFO: hinten anstellen (enqueue), vorne entfernen (dequeue)', 'Queue hat head und tail; jeder Knoten hat next und content', 'Knoten kennt Nachfolger, nicht Vorgänger', 'dequeue() ändert nur head; enqueue() ändert next des letzten Knotens und tail', 'front() schaut nur nach (null bei leerer Queue), dequeue() ist void', 'Leere Queue: head = tail = null', 'Erst isEmpty prüfen, dann front und dequeue'],
  glossary: [
    { term: 'Queue (Warteschlange)', def: 'Datenstruktur nach dem FIFO-Prinzip: hinten einfügen, vorne entfernen.' },
    { term: 'FIFO', def: 'First In, First Out: Das zuerst eingefügte Element wird zuerst entfernt.' },
    { term: 'head', def: 'Referenz der Queue auf den ersten Knoten (Kopf, Anfang).' },
    { term: 'tail', def: 'Referenz der Queue auf den letzten Knoten (Schwanz, Ende).' },
    { term: 'QueueNode', def: 'Knoten der Queue: hält Inhalt (content) und kennt den Nachfolger (next).' },
    { term: 'next', def: 'Referenz eines Knotens auf den nächsten Knoten (beim letzten null).' },
    { term: 'content', def: 'Referenz eines Knotens auf das gespeicherte Objekt (z. B. Patient).' },
    { term: 'enqueue', def: 'Fügt ein Objekt am Ende der Queue ein („anstellen").' },
    { term: 'dequeue', def: 'Entfernt das Objekt am Anfang der Queue (gibt nichts zurück).' },
    { term: 'front', def: 'Liefert das Objekt am Anfang, ohne es zu entfernen (null, wenn leer).' },
    { term: 'isEmpty', def: 'Gibt true zurück, wenn die Queue leer ist.' },
    { term: 'Datenstruktur', def: 'Organisierte Art, Daten zu speichern und darauf zuzugreifen (Array, Queue, Stack, Liste …).' }
  ],
  cards: [
    { q: 'Was ändert sich bei dequeue()?', a: 'Nur head (zeigt auf den nächsten Knoten). Bei nur einem Element auch tail (→ null).' },
    { q: 'Was ändert sich bei enqueue()?', a: 'Der bisher letzte Knoten zeigt mit next auf den neuen Knoten, und tail zeigt auf den neuen Knoten. (Bei leerer Queue auch head.)' },
    { q: 'Wie sehe ich, wer vorne steht, ohne ihn zu entfernen?', a: 'front() – gibt null zurück, wenn die Queue leer ist.' }
  ],
  quiz: [
    { q: 'Nach welchem Prinzip arbeitet eine Queue?', options: ['LIFO', 'FIFO', 'Zufall', 'Sortiert'], answer: 1, explain: 'First In, First Out.' },
    { q: 'Was sind head und tail?', options: ['Zwei Methoden', 'Referenzen auf den ersten und letzten Knoten', 'Zwei Patienten', 'Zahlen'], answer: 1, explain: 'head = Anfang, tail = Ende der Schlange.' },
    { q: 'Was ist im Zustand „leere Queue" der Wert von head und tail?', options: ['0', 'null', 'leer ("")', 'unbestimmt'], answer: 1, explain: 'Beide Referenzen zeigen auf nichts: null.' },
    { q: 'Worauf zeigt <code>next</code> beim letzten Knoten?', options: ['Auf head', 'Auf den ersten Knoten', 'null', 'Auf sich selbst'], answer: 2, explain: 'Es gibt keinen Nachfolger mehr.' },
    { q: 'Welche Referenzen ändern sich bei <code>dequeue()</code> (Queue mit ≥ 2 Elementen)?', options: ['Nur head', 'Nur tail', 'head und tail', 'Alle next-Referenzen'], answer: 0, explain: 'head wandert auf den nächsten Knoten.' },
    { q: 'Welche Referenzen ändern sich bei <code>enqueue()</code> (nicht leere Queue)?', options: ['head', 'tail und next des bisher letzten Knotens', 'Nur head', 'Alle content-Referenzen'], answer: 1, explain: 'Alter letzter Knoten hängt den neuen an; tail wandert.' },
    { q: 'Was gibt <code>dequeue()</code> zurück?', options: ['Das entfernte Objekt', 'Nichts (void)', 'true/false', 'Die neue Länge'], answer: 1, explain: 'Wer das Objekt braucht, holt es vorher mit front().' },
    { q: 'Was liefert <code>front()</code> bei leerer Queue?', options: ['Einen Fehler', 'null', 'Einen leeren Patienten', 'Das letzte Objekt'], answer: 1, explain: 'null (deshalb vorher isEmpty prüfen).' },
    { q: 'Was passiert, wenn man <code>p = queue.front(); queue.dequeue();</code> ausführt?', options: ['p zeigt weiter auf den Patienten, obwohl er nicht mehr in der Queue ist', 'Der Patient wird sofort gelöscht, p ist null', 'Fehler', 'Der Patient steht hinten in der Queue'], answer: 0, explain: 'p ist eine Referenz, so bleibt das Objekt erhalten.' },
    { q: 'Warum hat die Queue eine Referenz tail?', options: ['Aus Platzgründen', 'Damit enqueue direkt hinten anhängen kann, ohne die Kette zu durchlaufen', 'Damit dequeue schneller geht', 'Damit der Queue nie null wird'], answer: 1, explain: 'Sonst müsste man von head aus jedes Mal bis zum Ende wandern.' },
    { q: 'Welche Methoden der Klasse QueueNode brauchst du in deinem Programm?', options: ['getNext()', 'setNext()', 'Keine, nur die Methoden der Klasse Queue', 'Alle'], answer: 2, explain: 'QueueNode ist nur für die Implementierung der Queue gedacht.' },
    { q: 'Wie sieht die richtige Reihenfolge aus, wenn du wissen willst, wer vorne steht und ihn dann entfernst?', options: ['dequeue(); front();', 'front(); dequeue();', 'isEmpty(); enqueue();', 'enqueue(); front();'], answer: 1, explain: 'Erst front(), dann dequeue(); davor mit isEmpty() prüfen.' }
  ],
  exercises: [
    { task: `<p><b>Aufgabe a) (Arbeitsblatt):</b> Jogi Löw, Jürgen Klinsmann und Franz Beckenbauer gehen (in dieser Reihenfolge) zum Arzt. Wartezimmer-Programm:</p><pre><code>01  public class Wartezimmer
02  {
03     private Queue&lt;Patient&gt; queue;
04
05     public Wartezimmer()
06     {
07        queue = new Queue();                     // 1. Diagramm
08     }
09
10     public void main()
11     {
12        Patient p;
13
14        // Zwei neue Patienten stellen sich an
15        p = new Patient("Jogi Löw", 1);
16        queue.enqueue(p);
17        p = new Patient("Jürgen Klinsmann", 2);
18        queue.enqueue(p);                        // 2. Diagramm
19
20        // Der Patient am Anfang wird behandelt
21        if (!queue.isEmpty())
22        {
23           p = queue.front();
24           queue.dequeue();
25           Console.println(p.getName() + " wird jetzt behandelt!");
26        }
27
28        // Ein weiterer Patient stellt sich an
29        p = new Patient("Franz Beckenbauer", 3);
30        queue.enqueue(p);
31
32        // Der Patient am Anfang wird behandelt
33        if (!queue.isEmpty())
34        {
35           p = queue.front();
36           queue.dequeue();                        // 3. Diagramm
37           Console.println(p.getName() + " wird jetzt behandelt!");
38        }
39     }
40  }</code></pre><p>Zeichne je ein Objektdiagramm (insgesamt 3) aller Objekte zu den Zeitpunkten: 1. nach Zeile 07, 2. nach Zeile 18, 3. nach Zeile 36.</p>`,
      hint: 'Verfolge, wohin head, tail, next und content zeigen. Vergiss das Wartezimmer-Objekt nicht (Attribut queue). Achtung: p ist eine lokale Variable, die auch ein Patient-Objekt am Leben halten kann.',
      solution: `<p><b>1. nach Zeile 07</b> (nur der Konstruktor ist gelaufen, main noch nicht):</p>
      <div class="diag">${uml('w : Wartezimmer', ['queue → q'], null, true)}${uml('q : Queue', ['head = null', 'tail = null'], null, true)}</div>
      <p><b>2. nach Zeile 18</b> (Löw und Klinsmann stehen in der Schlange):</p>
      <div class="diag">${uml('w : Wartezimmer', ['queue → q'], null, true)}${uml('q : Queue', ['head → k1', 'tail → k2'], null, true)}</div>${chain(['löw', 'klinsmann'])}
      <div class="diag">${uml('löw : Patient', ['name = "Jogi Löw"', 'ankunft = 1'], null, true)}${uml('klinsmann : Patient', ['name = "Jürgen Klinsmann"', 'ankunft = 2'], null, true)}</div>
      <p class="muted">(Die lokale Variable p zeigt hier auf klinsmann; sie gehört zur Methode, nicht zu einem Objekt, und wird oft nur als extra Pfeil eingetragen.)</p>
      <p><b>3. nach Zeile 36:</b> Löw ist behandelt (Zeile 24), dann hat sich Beckenbauer angestellt, dann wurde Klinsmann behandelt (Zeile 36). In der Queue steht nur noch Beckenbauer:</p>
      <div class="diag">${uml('w : Wartezimmer', ['queue → q'], null, true)}${uml('q : Queue', ['head → k3', 'tail → k3'], null, true)}</div>${chain(['beckenbauer'])}
      <div class="diag">${uml('beckenbauer : Patient', ['name = "Franz Beckenbauer"', 'ankunft = 3'], null, true)}${uml('klinsmann : Patient', ['name = "Jürgen Klinsmann"', 'ankunft = 2'], null, true)}</div>
      <p>Was am Ende <b>nicht mehr</b> da ist: die Knoten k1 und k2 und das Patientenobjekt Löw (kein Verweis mehr darauf). Das Objekt klinsmann ist noch da, weil <code>p</code> darauf zeigt. Der Knoten k3 hat <code>content → beckenbauer</code>, <code>next → null</code>; <code>head</code> und <code>tail</code> zeigen beide auf k3 (ein einziges Element). <small>Die Knotennummern (k1, k2, k3) sind meine Bezeichnung.</small></p>` },
    { task: '<p><b>Aufgabe b):</b> Nach dem Aufruf von <code>dequeue()</code> in Zeile 24 wird das Objekt für den ersten Patienten (Jogi Löw) nicht gleich gelöscht. Warum?</p>', hint: 'Wann löscht der Garbage Collector? Wer zeigt noch auf das Objekt?', solution: '<p>Die lokale Variable <code>p</code> zeigt noch auf das Patient-Objekt (<code>p = queue.front();</code> in Zeile 23). Es gibt also noch eine Referenz darauf. Außerdem wird es in Zeile 25 für <code>p.getName()</code> gebraucht. Erst wenn <code>p</code> in Zeile 29 auf einen anderen Patienten zeigt, ist es unerreichbar und kann gelöscht werden.</p>' },
    { task: '<p><b>Aufgabe c):</b> Welche Ausgabe macht die <code>main</code>-Methode auf der Konsole?</p>', hint: 'FIFO: Wer wird in Zeile 23–25 und 35–37 behandelt?', solution: '<pre><code>Jogi Löw wird jetzt behandelt!\nJürgen Klinsmann wird jetzt behandelt!</code></pre><p>Beckenbauer stand zuletzt in der Schlange und wird in diesem Programm gar nicht mehr behandelt (er steht am Ende noch in der Queue).</p>' },
    { task: `<p><b>Exit-Ticket:</b> Das Diagramm zeigt die Warteschlange q. Zuerst wird einmal aufgerufen (dequeue), danach meldet sich Frau Nowak an (enqueue, Objekt N). Zeichne den Zustand danach als Objektdiagramm.<br><small>Das Diagramm auf dem Zettel konnte ich nicht lesen. Hier das Vorgehen und ein Beispiel mit drei Wartenden A, B, C.</small></p>`,
      hint: 'Zuerst dequeue (nur head ändert sich), dann enqueue (letzter Knoten bekommt next, tail wandert).',
      solution: `<p><b>Vorher</b> (Beispiel): A, B, C stehen in der Schlange.</p>${chain(['A', 'B', 'C'])}
      <p><b>Nach dequeue</b>: head zeigt auf k2 (B). Knoten k1 und A fallen weg.</p>${chain(['B', 'C'])}
      <p><b>Nach enqueue(N)</b>: neuer Knoten k4 für Frau Nowak, <code>next</code> von k3 (C) zeigt auf k4, <code>tail</code> zeigt auf k4. <code>head</code> bleibt unverändert.</p>${chain(['B', 'C', 'N (Nowak)'])}
      <p><b>Allgemein:</b> dequeue ändert nur <code>head</code>; enqueue ändert <code>tail</code> und das <code>next</code> des bisher letzten Knotens.</p>` },
    { task: `<p><b>„Vom Tisch zum Blatt" (Sicherung):</b> 1) Zeichne ein reduziertes Objektdiagramm einer Queue mit nur 3 Knoten, alle Referenzen als Pfeile. 2) Welche Referenzen ändern sich bei dequeue, welche bei enqueue? 3) Vervollständige: „Eine Schlange (Queue) besteht aus …", „Jeder Knoten (Node) kennt …, aber nicht …", „Der Schlange hilft ein Verweis auf das Ende, weil …".</p>`,
      hint: 'Jedes Objekt: Name : Klasse. Jede Referenz (head, tail, next, content) ist ein Attribut, aus dem ein Pfeil zum Zielobjekt führt.',
      solution: `<p><b>1)</b> Beispiel mit drei Knoten:</p><div class="diag">${uml('q : Queue', ['head → k1', 'tail → k3'], null, true)}</div>${chain(['p1', 'p2', 'p3'])}
      <p><b>2)</b> dequeue: nur <code>head</code> (springt auf <code>next</code> des alten head). enqueue: <code>next</code> des alten letzten Knotens und <code>tail</code>.</p>
      <p><b>3)</b> Eine Schlange (Queue) besteht aus <b>einem Queue-Objekt mit head und tail und einer Kette von Knoten (QueueNode), die über next verbunden sind und über content je ein Objekt halten.</b> Jeder Knoten kennt <b>seinen Nachfolger und seinen Inhalt</b>, aber nicht <b>seinen Vorgänger</b>. Der Schlange hilft ein Verweis auf das Ende, weil <b>man beim Anstellen sofort hinten anhängen kann, ohne die ganze Kette zu durchlaufen</b>.</p>
      <p><b>Für Schnelle (a):</b> Klassendiagramm: Queue → QueueNode (head, tail), QueueNode → QueueNode (next), QueueNode → Patient (content). Siehe Abschnitt „Aufbau". <b>(b)</b> Siehe Abschnitt „Queue und Array im Vergleich".</p>` },
    { task: '<p>Schreibe eine Methode <code>behandleAlle()</code> für das Wartezimmer, die alle Patienten der Reihe nach „behandelt" (Name ausgeben) und aus der Queue entfernt, bis sie leer ist.</p>', hint: 'Schleife mit der Bedingung !queue.isEmpty().', solution: `<pre><code>public void behandleAlle()
{
    Patient p;
    while (!queue.isEmpty())
    {
        p = queue.front();       // wer ist dran?
        queue.dequeue();         // aus der Schlange nehmen
        Console.println(p.getName() + " wird jetzt behandelt!");
    }
}</code></pre><p>Die while-Schleife (nicht for), weil man nicht vorher weiß, wie viele Patienten es sind. Am Ende gilt <code>isEmpty() == true</code>, <code>head</code> und <code>tail</code> sind <code>null</code>.</p>` },
    { task: '<p>Eine leere Queue q. Es werden nacheinander ausgeführt: <code>enqueue(X); enqueue(Y); dequeue(); enqueue(Z); dequeue();</code> Wer steht am Ende vorne (front)? Wer ist hinten (tail)?</p>', hint: 'Verfolge die Schlange Schritt für Schritt.', solution: '<p>[X] → [X, Y] → dequeue entfernt X: [Y] → [Y, Z] → dequeue entfernt Y: <b>[Z]</b>. Vorne (<code>front()</code>) und hinten (<code>tail</code>): <b>Z</b>. <code>head</code> und <code>tail</code> zeigen auf denselben Knoten.</p>' }
  ]
});
})();
