// BEISPIEL-THEMA (Platzhalter) – wird durch dein echtes Thema ersetzt, sobald du Präsentation + Arbeitsblatt hochlädst.
window.TOPICS.push({
  id: 'zahlensysteme',
  week: 1,
  title: 'Zahlensysteme (Beispiel)',
  summary: 'Dezimal, Binär, Hexadezimal – und wie man umrechnet.',
  sections: [
    { title: 'Worum geht es?', html: `<p>Computer speichern alles mit nur zwei Zuständen: <b>an (1)</b> und <b>aus (0)</b>. Deshalb rechnen sie im <b>Binärsystem</b>. Wir Menschen nutzen das <b>Dezimalsystem</b> (10 Ziffern).</p>
      <div class="tip"><b>Merke:</b> Ein Zahlensystem mit Basis <i>b</i> nutzt die Ziffern 0 bis <i>b</i>−1. Jede Stelle ist eine Potenz von <i>b</i>.</div>` },
    { title: 'Binär → Dezimal', html: `<p>Jede Stelle hat den Wert einer Zweierpotenz: 1, 2, 4, 8, 16 … (von rechts).</p>
      <pre><code>1 0 1 1  (binär)
8 4 2 1  (Stellenwerte)
= 8 + 0 + 2 + 1 = 11</code></pre>` },
    { title: 'Dezimal → Binär', html: `<p>Teile die Zahl immer durch 2 und notiere den Rest. Lies die Reste von <b>unten nach oben</b>.</p>
      <pre><code>13 : 2 = 6 Rest 1
 6 : 2 = 3 Rest 0
 3 : 2 = 1 Rest 1
 1 : 2 = 0 Rest 1   → 1101</code></pre>` },
    { title: 'Hexadezimal', html: `<p>Basis 16, Ziffern 0–9 und A–F (A=10 … F=15). Vier Bits ergeben genau eine Hex-Ziffer – darum ist Hex eine kurze Schreibweise für Binärzahlen.</p>
      <table><tr><th>Binär</th><td>1111</td><td>1010</td></tr><tr><th>Hex</th><td>F</td><td>A</td></tr></table>` }
  ],
  keyPoints: ['Binär hat Basis 2, Hex Basis 16', 'Umrechnung dezimal→binär: fortlaufend durch 2 teilen', '4 Bit = 1 Hex-Ziffer'],
  glossary: [
    { term: 'Bit', def: 'Kleinste Informationseinheit: 0 oder 1.' },
    { term: 'Byte', def: '8 Bit zusammen (256 mögliche Werte).' },
    { term: 'Basis eines Zahlensystems', def: 'Anzahl der verfügbaren Ziffern, z. B. 2 bei Binär.' }
  ],
  cards: [{ q: 'Wie viel ist 1010 binär dezimal?', a: '10' }],
  quiz: [
    { q: 'Welchen Wert hat 1011 (binär)?', options: ['9', '11', '13', '15'], answer: 1, explain: '8 + 0 + 2 + 1 = 11.' },
    { q: 'Wie viele Bits hat ein Byte?', options: ['4', '8', '16', '10'], answer: 1, explain: '1 Byte = 8 Bit.' },
    { q: 'Wofür steht F im Hexadezimalsystem?', options: ['10', '14', '15', '16'], answer: 2, explain: 'A=10, B=11, C=12, D=13, E=14, F=15.' }
  ],
  exercises: [
    { task: '<p>Wandle die Dezimalzahl <b>13</b> ins Binärsystem um.</p>', hint: 'Teile fortlaufend durch 2.', solution: '<p><b>1101</b>. Reste von unten nach oben gelesen: 1, 1, 0, 1. Probe: 8+4+0+1 = 13 ✔</p>' }
  ]
});
