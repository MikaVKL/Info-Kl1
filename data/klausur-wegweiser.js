// Quellen: "Übersicht über die Operatoren Informatik" (abitur.nrw), "Korrektur von Klausuren / Korrekturzeichen" (abitur.nrw),
// "Zentralabitur 2028 Informatik, Vorgaben" (abitur.nrw). Zusammenstellung und Merkhilfen von Claude.
window.TOPICS.push({
  id: 'klausur-wegweiser', week: 0, title: 'Klausur-Wegweiser: Operatoren & Korrekturzeichen',
  summary: 'Was „angeben", „beschreiben", „begründen" … in der Aufgabe verlangen, was die Korrekturzeichen bedeuten und was bis zum Abitur dran kommt.',
  sections: [
    { title: 'Warum Operatoren wichtig sind', html: `<p>In jeder Klausuraufgabe steht ein <b>Operator</b>, also das Verb, das sagt, <i>wie viel</i> und <i>wie</i> du antworten sollst. Wer „beschreibe" mit einem Wort beantwortet oder bei „begründe" nur eine Behauptung hinschreibt, verschenkt Punkte, auch wenn er das Thema kann.</p>
      <p>Die Anforderungsbereiche (<b>AFB</b>) zeigen die Schwierigkeit: <b>I</b> = Wiedergeben, <b>II</b> = Anwenden, <b>III</b> = Beurteilen/Entwickeln. Je höher, desto mehr Eigenleistung.</p>` },
    { title: 'Die wichtigsten Operatoren (AFB I)', html: `<table><tr><th>Operator</th><th>Das musst du tun</th><th>AFB</th></tr>
      <tr><td><b>angeben</b></td><td>Ohne Erläuterung und Begründung <b>aufzählen/nennen</b>. Kurz.</td><td>I</td></tr>
      <tr><td><b>beschreiben</b></td><td>Sachverhalte mit <b>Fachsprache in eigenen Worten</b> verständlich wiedergeben.</td><td>I</td></tr>
      <tr><td><b>erläutern</b></td><td>Einen Sachverhalt auf Grundlage von Vorkenntnissen so darlegen, dass er <b>verständlich</b> wird (mit Beispiel/Zusammenhang).</td><td>I–II</td></tr>
      <tr><td><b>darstellen</b></td><td>Zusammenhänge in <b>strukturierter Form</b> grafisch oder sprachlich wiedergeben (z. B. Diagramm zeichnen).</td><td>II–I</td></tr>
      <tr><td><b>dokumentieren</b></td><td>Ergebnisse/Verfahren in strukturierter Form wiedergeben.</td><td>I–II</td></tr>
      <tr><td><b>überführen</b></td><td>Eine Darstellung in eine <b>andere Darstellungsform</b> bringen (z. B. Code → Diagramm).</td><td>I–II</td></tr></table>` },
    { title: 'Operatoren mit Anwendung (AFB II)', html: `<table><tr><th>Operator</th><th>Das musst du tun</th><th>AFB</th></tr>
      <tr><td><b>anwenden</b></td><td>Ein <b>bekanntes Verfahren in einer neuen Situation</b> verwenden.</td><td>II</td></tr>
      <tr><td><b>bestimmen / ermitteln</b></td><td>Mit charakteristischen Merkmalen einen Sachverhalt <b>genau feststellen</b> und beschreiben.</td><td>II</td></tr>
      <tr><td><b>entscheiden</b></td><td>Sich <b>begründet</b> bei vorgegebenen Alternativen auf eine festlegen.</td><td>II</td></tr>
      <tr><td><b>erweitern</b></td><td>Eine gegebene Struktur nach Vorgaben <b>ergänzen</b>.</td><td>II</td></tr>
      <tr><td><b>modifizieren</b></td><td>Eine gegebene Struktur nach Vorgaben <b>verändern</b>.</td><td>II</td></tr>
      <tr><td><b>vervollständigen</b></td><td>Eine gegebene Struktur nach Vorgaben erweitern oder verändern.</td><td>II</td></tr>
      <tr><td><b>vergleichen</b></td><td>Nach Kriterien <b>Gemeinsamkeiten und Unterschiede</b> ermitteln und darstellen.</td><td>II</td></tr>
      <tr><td><b>zeigen</b></td><td>Eine Aussage nach Berechnung/Herleitung/logischer Begründung <b>bestätigen</b>.</td><td>II</td></tr></table>` },
    { title: 'Operatoren mit Eigenleistung (AFB II–III)', html: `<table><tr><th>Operator</th><th>Das musst du tun</th><th>AFB</th></tr>
      <tr><td><b>analysieren</b></td><td>Eine Materialgrundlage untersuchen, Elemente und ihre <b>Beziehungen</b> erfassen. Steht immer mit einem weiteren Operator.</td><td>II–III</td></tr>
      <tr><td><b>begründen</b></td><td>Einen Sachverhalt/Entwurf durch <b>Angabe von Gründen</b> erklären.</td><td>III–II</td></tr>
      <tr><td><b>beurteilen</b></td><td>Ein <b>selbstständiges Urteil</b> mit Fachwissen formulieren und begründen.</td><td>III</td></tr>
      <tr><td><b>Stellung nehmen</b></td><td>Die eigene Meinung mit relevanten Sachverhalten <b>argumentativ</b> entwickeln.</td><td>III</td></tr>
      <tr><td><b>entwerfen / entwickeln</b></td><td>Ein System von Elementen unter vorgegebener Zielsetzung <b>herstellen und gestalten</b>.</td><td>II–III</td></tr>
      <tr><td><b>modellieren</b></td><td>Zu einem Ausschnitt der Realität ein <b>informatisches Modell</b> anfertigen (z. B. Klassendiagramm).</td><td>II–III</td></tr>
      <tr><td><b>implementieren</b></td><td>Ein Modell/einen Algorithmus in eine <b>Programmiersprache umsetzen</b> (Java-Code).</td><td>II–III</td></tr>
      <tr><td><b>interpretieren</b></td><td>Sinnzusammenhänge aus Materialien erschließen.</td><td>II–III</td></tr></table>
      <div class="tip">Aus dem Unterricht kennst du schon: „Entwirf ein Klassendiagramm" (Vererbung, Bibliothek), „Zeichne ein Objektdiagramm" (<i>darstellen</i>) und „Implementiere die Klassen" (<i>implementieren</i>).</div>` },
    { title: 'Typische Fehler', html: `<ul><li><b>beschreiben</b> ist kein <b>begründen</b>: erst sagen, <i>was</i> passiert, dann (nur wenn verlangt) <i>warum</i>.</li>
      <li><b>angeben</b> bedeutet kurz. Hier keine Aufsätze schreiben.</li>
      <li><b>vergleichen</b>: Immer Kriterien nennen (Größe, Zugriff, …), Gemeinsamkeiten <u>und</u> Unterschiede. Zum Beispiel Array gegen Queue.</li>
      <li><b>begründen</b>: Ein „weil" ist Pflicht. Beispiel: <i>„Das Patientenobjekt wird nicht gelöscht, <b>weil</b> p noch darauf zeigt."</i></li>
      <li><b>implementieren</b> / <b>entwickeln</b>: Fachbegriffe und Syntax genau verwenden, auch wenn der Code nicht ausgeführt wird.</li></ul>` },
    { title: 'Korrekturzeichen', html: `<p>So kennzeichnen Lehrkräfte Fehler (für alle in deutscher Sprache geschriebenen Texte):</p>
      <table><tr><th>Zeichen</th><th>Bedeutung</th></tr>
      <tr><td><b>R</b></td><td>Rechtschreibung</td></tr><tr><td><b>Z</b></td><td>Zeichensetzung</td></tr>
      <tr><td><b>G</b></td><td>Grammatik (wenn nicht weiter angegeben, auch Syntax)</td></tr>
      <tr><td><b>W</b></td><td>Wortschatz</td></tr></table>
      <p><b>Feiner bei Grammatik (G):</b> T = Tempus, M = Modus, N = Numerus, Sb = Satzbau, St = Wortstellung, Bz = Bezug.<br>
      <b>Feiner bei Wortschatz (W):</b> A = Ausdruck/unpassende Stilebene, <b>FS = Fachsprache (fehlend/falsch)</b>.</p>
      <p><b>Inhaltliche Zeichen:</b></p>
      <table><tr><th>Zeichen</th><th>Bedeutung</th></tr>
      <tr><td>Haken ✓</td><td>richtig</td></tr><tr><td><b>f</b></td><td>falsch</td></tr>
      <tr><td><b>( )</b> (Klammer um den Haken)</td><td>folgerichtig: richtige Lösung auf Grundlage einer fehlerhaften Annahme oder eines falschen Zwischenergebnisses</td></tr>
      <tr><td>Schlangenlinie</td><td>ungenau</td></tr>
      <tr><td>[ — ]</td><td>Streichung (überflüssiges Wort/Passage)</td></tr>
      <tr><td>Γ bzw. #</td><td>Auslassung</td></tr><tr><td><b>Wdh</b></td><td>Wiederholung, wenn vermeidbar</td></tr></table>
      <div class="tip"><b>Gut zu wissen:</b> Wiederholte Fehler werden mit „s.o." markiert und in der Regel <u>nicht</u> mehrfach gewertet. Gehäufte Verstöße gegen die sprachliche Richtigkeit können die Note um eine Stufe (Einführungsphase) bzw. bis zu zwei Notenpunkte (Qualifikationsphase) senken. Dein Tipp: Fachbegriffe richtig schreiben (FS) und ganze Sätze nutzen.</div>
      <p><b>Folgerichtig ( ) ist wichtig für dich:</b> Wenn du am Anfang einen Fehler machst (z. B. falsches Objektdiagramm) und darauf <i>richtig</i> weiterarbeitest, bekommst du für die Folgeschritte trotzdem Punkte. Also immer weiterrechnen, nie leer lassen.</p>` },
    { title: 'Bewertung in der Q1 (Erinnerung)', html: '<p>Klausuren dauern 90 Minuten. <b>Ausreichend (5 Punkte) ab 45 %</b> der Hilfspunkte. Die Note richtet sich nach dem Zuordnungsschema des Zentralabiturs.</p>' },
    { title: 'Zentralabitur 2028: Was bis dahin kommt (Grundkurs)', html: `<p>Das Zentralabitur gibt vor, was in der Prüfung vorkommen kann. Für den <b>Grundkurs</b> 2028 sind unter „Daten und ihre Strukturierung" vorgesehen:</p>
      <ul><li><b>Objekte und Klassen</b>, <b>Implementationsdiagramme</b></li>
      <li><b>Lineare Strukturen:</b> Array (bis zweidimensional), <b>Stapel</b> (Klasse <code>Stack</code>), <b>Schlange</b> (Klasse <code>Queue</code>), <b>lineare Liste</b> (Klasse <code>List</code>)</li>
      <li><b>Nicht-lineare Strukturen:</b> Binärbaum (Klasse <code>BinaryTree</code>)</li></ul>
      <p>Weitere Bereiche: <b>Algorithmen</b> (Entwurf, Struktogramme, Java, SQL), <b>Endliche Automaten</b> (deterministisch und nichtdeterministisch, Grammatiken regulärer Sprachen), <b>Informatiksysteme</b> (Rechnernetze), <b>Datenbanken</b> (SQL, Klassen <code>DatabaseConnector</code>, <code>QueryResult</code>), <b>Informatik, Mensch und Gesellschaft</b> (z. B. Datenschutz) und <b>Sicherheit</b>.</p>
      <p><b>Abiturprüfung GK:</b> 225 Minuten, 4 Aufgaben zur Auswahl (die Lehrkraft wählt 2 aus). Erlaubt: Wörterbuch zur deutschen Rechtschreibung und wissenschaftlicher Taschenrechner. <b>Kein Computer.</b></p>
      <div class="tip">Dein Q1-Plan (Suchen/Sortieren, Kryptographie, dynamische lineare Datenstrukturen, nichtlineare Datenstrukturen, Automaten) deckt genau diese Bereiche ab. Queue, Stack und List kommen also auch in der Abiturprüfung vor.</div>` }
  ],
  keyPoints: ['Operator zuerst lesen: angeben = kurz nennen, beschreiben = Fachsprache in eigenen Worten, begründen = mit „weil", vergleichen = Kriterien + Gemeinsamkeiten + Unterschiede', 'AFB I wiedergeben, II anwenden, III beurteilen/entwickeln', 'Folgerichtig ( ): Folgeschritte werden auf Basis eines Fehlers trotzdem gewertet', 'R Z G W = Rechtschreibung, Zeichensetzung, Grammatik, Wortschatz; FS = Fachsprache falsch/fehlend', 'Ausreichend ab 45 %; GK-Klausur 90 Minuten', 'Abitur-GK: Array bis 2D, Stack, Queue, List, BinaryTree, Java, SQL, Automaten'],
  glossary: [
    { term: 'Operator', def: 'Das Verb in der Aufgabenstellung, das vorgibt, wie du antworten sollst (z. B. angeben, beschreiben).' },
    { term: 'AFB (Anforderungsbereich)', def: 'Schwierigkeitsstufe I (Wiedergeben), II (Anwenden), III (Beurteilen/Entwickeln).' },
    { term: 'angeben', def: 'Ohne Erläuterung und Begründung nennen oder aufzählen.' },
    { term: 'beschreiben', def: 'Sachverhalte mit Fachsprache in eigenen Worten verständlich wiedergeben.' },
    { term: 'begründen', def: 'Einen Sachverhalt oder eine Entwurfsentscheidung durch Angabe von Gründen erklären.' },
    { term: 'erläutern', def: 'Einen Sachverhalt auf Grundlage von Vorkenntnissen so darlegen, dass er verständlich wird.' },
    { term: 'darstellen', def: 'Zusammenhänge in strukturierter Form grafisch oder sprachlich wiedergeben.' },
    { term: 'implementieren', def: 'Ein Modell oder einen Algorithmus in eine Programmiersprache umsetzen.' },
    { term: 'modellieren', def: 'Zu einem Ausschnitt der Realität ein informatisches Modell anfertigen.' },
    { term: 'vergleichen', def: 'Nach Kriterien Gemeinsamkeiten, Ähnlichkeiten und Unterschiede ermitteln und darstellen.' },
    { term: 'beurteilen', def: 'Ein selbstständiges, begründetes Urteil mit Fachwissen und Fachmethoden formulieren.' },
    { term: 'Folgerichtig ( )', def: 'Korrekturzeichen: Richtige Lösung auf Grundlage einer fehlerhaften Annahme oder Zwischenlösung.' },
    { term: 'FS (Korrekturzeichen)', def: 'Fachsprache fehlend oder falsch.' }
  ],
  cards: [
    { q: 'Was verlangt der Operator „angeben"?', a: 'Kurz nennen/aufzählen, ohne Erläuterung und Begründung (AFB I).' },
    { q: 'Was verlangt „begründen"?', a: 'Einen Sachverhalt durch Angabe von Gründen erklären – mit „weil" (AFB III–II).' },
    { q: 'Was heißt „folgerichtig" ( ) am Rand?', a: 'Die Lösung ist auf Basis eines früheren Fehlers korrekt weitergeführt und wird deshalb gewertet.' }
  ],
  quiz: [
    { q: 'Du sollst eine Warteschlange <b>beschreiben</b>. Was ist richtig?', options: ['Ein Wort nennen', 'Mit Fachsprache in eigenen Worten verständlich wiedergeben', 'Code schreiben', 'Eine Meinung abgeben'], answer: 1, explain: 'beschreiben = Fachsprache, eigene Worte, verständlich (AFB I).' },
    { q: 'Bei <b>angeben</b> schreibst du…', options: ['Eine lange Begründung', 'Nur die Antwort, ohne Erläuterung', 'Einen Vergleich', 'Ein Diagramm'], answer: 1, explain: 'Kurz nennen, nichts erläutern.' },
    { q: 'Was brauchst du bei <b>begründen</b> unbedingt?', options: ['Eine Skizze', 'Gründe („weil …")', 'Ein Beispiel-Programm', 'Eine Tabelle'], answer: 1, explain: 'Ohne Begründung fehlt der Kern der Aufgabe.' },
    { q: 'Welcher Operator verlangt Gemeinsamkeiten <u>und</u> Unterschiede nach Kriterien?', options: ['bestimmen', 'vergleichen', 'darstellen', 'zeigen'], answer: 1, explain: 'vergleichen.' },
    { q: 'Welcher Operator hat den höchsten Anspruch (AFB III) und verlangt ein eigenes Urteil?', options: ['angeben', 'beschreiben', 'beurteilen', 'überführen'], answer: 2, explain: 'beurteilen = selbstständiges, begründetes Urteil.' },
    { q: 'Was bedeutet das Korrekturzeichen „FS"?', options: ['Falsche Satzstellung', 'Fachsprache fehlt oder ist falsch', 'Folgefehler s.o.', 'Fehler im Struktogramm'], answer: 1, explain: 'FS = Fachsprache (fehlend/falsch), gehört zum Wortschatz W.' },
    { q: 'Du hast am Anfang einen Fehler gemacht, aber danach richtig weitergerechnet. Was kennzeichnet die Lehrkraft?', options: ['f', 'Folgerichtig ( )', 'Wdh', 'Gar nichts'], answer: 1, explain: 'Folgerichtig bedeutet: auf einer fehlerhaften Grundlage korrekt gearbeitet.' },
    { q: 'Wofür steht „R" am Rand?', options: ['Richtig', 'Rechtschreibung', 'Referenz', 'Rückgabe'], answer: 1, explain: 'R, Z, G, W: Rechtschreibung, Zeichensetzung, Grammatik, Wortschatz.' },
    { q: 'Ab wie viel Prozent der Hilfspunkte gibt es „ausreichend" (5 Punkte)?', options: ['33 %', '40 %', '45 %', '50 %'], answer: 2, explain: 'Ab 45 %.' },
    { q: 'Welche lineare Struktur kommt im Zentralabitur Grundkurs 2028 NICHT vor?', options: ['Queue', 'Stack', 'List', 'Graph'], answer: 3, explain: 'Graphen (Graph, Vertex, Edge) stehen nur im Leistungskurs.' },
    { q: 'Hilfsmittel in der Abiturprüfung?', options: ['Computer', 'Wörterbuch und wissenschaftlicher Taschenrechner', 'Handy', 'Java-Buch'], answer: 1, explain: 'Der Einsatz eines Computers ist nicht vorgesehen.' }
  ],
  exercises: [
    { task: '<p>Ordne zu: Was verlangen diese Aufgaben? a) „Gib die Ausgabe der main-Methode an." b) „Beschreibe, was bei dequeue() passiert." c) „Begründe, warum das Objekt nicht gleich gelöscht wird." d) „Vergleiche Array und Queue."</p>', hint: 'Achte auf Länge und Tiefe der Antwort.', solution: '<p>a) <b>angeben</b>: nur die Ausgabe nennen (z. B. „Jogi Löw wird jetzt behandelt!"). b) <b>beschreiben</b>: in eigenen Worten mit Fachsprache: „head wird auf den nächsten Knoten verschoben …". c) <b>begründen</b>: Grund mit „weil": „… weil p noch auf das Patientenobjekt zeigt." d) <b>vergleichen</b>: Kriterien wie Größe/Zugriff/Einfügen nennen, Gemeinsamkeiten und Unterschiede.</p>' },
    { task: '<p>Formuliere eine Antwort mit korrekter Fachsprache auf: „Erläutere den Unterschied zwischen == und equals() bei Referenzen." (2–3 Sätze)</p>', hint: 'Fachbegriffe: Referenz, Objekt, Inhalt, Attribute.', solution: '<p><i>Beispiel:</i> „Der Operator == vergleicht Referenzen, also ob beide Variablen auf <b>dasselbe Objekt</b> zeigen. Die Methode equals() vergleicht dagegen den <b>Inhalt</b>, indem sie die Attribute der Objekte vergleicht. Zwei verschiedene Objekte mit gleichem Inhalt ergeben daher bei == false, bei equals() aber true."</p>' }
  ]
});
