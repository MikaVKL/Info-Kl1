// Grundlagen-Thema – von Claude ergänzt: Vorwissen für Queue, Stack und Liste (Dynamische lineare Datenstrukturen).
window.TOPICS.push({
  id: 'generische-klassen', week: 0, title: 'Generische Klassen (Queue<Patient>)',
  summary: 'Was die spitzen Klammern bedeuten: ein Platzhalter für den Inhaltstyp, den Queue, Stack und Liste brauchen.',
  sections: [
    { title: 'Das Problem', html: `<p>Eine Warteschlange kann für ganz verschiedene Dinge nützlich sein: Patienten in der Arztpraxis, Anrufe im Callcenter, Netzwerkpakete, Vokabelkarten. Die Funktionsweise ist immer gleich. Man möchte die Klasse also <b>nur einmal</b> schreiben, nicht für jeden Inhalt neu.</p>` },
    { title: 'Die Lösung: Platzhalter ContentType', html: `<p>Eine <b>generische Klasse</b> hat einen <b>Platzhalter</b> für den Typ des Inhalts. Im Klassendiagramm steht er als gestricheltes Kästchen in der Ecke der Klasse; bei der Schulklasse heißt er <code>ContentType</code> („Inhaltstyp").</p>
      <pre><code>public void enqueue(ContentType pContent)   // in der Klasse Queue
public ContentType front()</code></pre>
      <p>Bei der Verwendung ersetzt du den Platzhalter in spitzen Klammern durch eine echte Klasse:</p>
      <pre><code>Queue&lt;Patient&gt; q1;            // ContentType = Patient
Queue&lt;Netzwerkpaket&gt; q2;      // ContentType = Netzwerkpaket</code></pre>
      <p>Jetzt gilt überall, wo <code>ContentType</code> stand, <code>Patient</code>: <code>q1.enqueue(Patient pContent)</code> und <code>Patient front()</code>.</p>` },
    { title: 'Warum ist das praktisch?', html: `<ul><li><b>Eine Klasse für alles:</b> Queue, Stack und Liste müssen nur einmal programmiert werden.</li>
      <li><b>Typsicherheit:</b> Eine <code>Queue&lt;Patient&gt;</code> nimmt <u>nur</u> Patienten auf. <code>q1.enqueue("Hallo")</code> gibt einen Compilerfehler. Und <code>front()</code> liefert direkt einen <code>Patient</code>, ohne dass du umwandeln musst.</li></ul>
      <div class="tip"><b>Lesehilfe:</b> <code>Queue&lt;Patient&gt;</code> spricht man „Queue <i>von</i> Patient" oder „Queue für Patienten".</div>` },
    { title: 'Erzeugen im Code', html: `<pre><code>private Queue&lt;Patient&gt; queue;     // Deklaration mit Typ in &lt; &gt;

public Wartezimmer()
{
    queue = new Queue();             // so steht es in den Arbeitsblättern
}</code></pre>
      <p>Sauberer ist <code>new Queue&lt;Patient&gt;()</code>. In der Schule reicht <code>new Queue()</code>, wie in der Vorlage. Wichtig ist, dass die <b>Deklaration</b> den Typ in den spitzen Klammern enthält.</p>` }
  ],
  keyPoints: ['Generische Klasse = Klasse mit Platzhalter für den Inhaltstyp (ContentType)', 'Queue<Patient>: Platzhalter wird durch Patient ersetzt', 'Typsicher: nur Objekte dieser Klasse passen hinein', 'Eine Klasse für beliebige Inhalte'],
  glossary: [
    { term: 'Generische Klasse', def: 'Klasse mit einem Platzhalter für einen Typ, der erst bei der Benutzung festgelegt wird (z. B. Queue&lt;Patient&gt;).' },
    { term: 'ContentType', def: 'Name des Platzhalters für den Inhaltstyp in der Klasse Queue.' },
    { term: 'Typsicherheit', def: 'Der Compiler lässt nur Objekte des festgelegten Typs zu.' }
  ],
  quiz: [
    { q: 'Was bedeutet <code>Queue&lt;Patient&gt; q1;</code>?', options: ['q1 ist ein Patient', 'q1 ist eine Warteschlange, die Patienten aufnimmt', 'q1 hat zwei Patienten', 'Compilerfehler'], answer: 1, explain: 'Der Platzhalter ContentType wird durch Patient ersetzt.' },
    { q: 'Wofür steht <code>ContentType</code> in der Klasse Queue?', options: ['Für einen festen Datentyp int', 'Für einen Platzhalter, den man durch eine Klasse ersetzt', 'Für den Namen der Warteschlange', 'Für die Länge'], answer: 1, explain: 'Platzhalter für den Inhaltstyp.' },
    { q: 'Was liefert <code>front()</code> bei <code>Queue&lt;Patient&gt;</code>?', options: ['Einen int', 'Einen String', 'Einen Patient', 'Eine Queue'], answer: 2, explain: 'ContentType wird durch Patient ersetzt: Patient front().' },
    { q: 'Warum schreibt man Queue nur einmal als generische Klasse?', options: ['Spart Platz im Heft', 'Sie funktioniert für beliebige Inhalte gleich', 'Java erlaubt nur eine Queue', 'Weil sie sonst langsam ist'], answer: 1, explain: 'Wiederverwendung für Patienten, Anrufe, Pakete …' }
  ],
  exercises: [
    { task: '<p>Wie deklarierst du eine Warteschlange für Netzwerkpakete (Klasse <code>Netzwerkpaket</code>) mit dem Namen <code>paketQueue</code>? Welchen Parametertyp hat dann <code>enqueue</code>?</p>', hint: 'Platzhalter in spitzen Klammern ersetzen.', solution: '<p><code>Queue&lt;Netzwerkpaket&gt; paketQueue;</code> – <code>enqueue(Netzwerkpaket pContent)</code>, <code>front()</code> liefert ein <code>Netzwerkpaket</code>.</p>' }
  ]
});
