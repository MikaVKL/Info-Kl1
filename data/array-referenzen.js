// Quelle: Folien "PR Array von Referenzen" + "AB Array von Referenzen" (Ch. Pothmann, cpothmann.de, CC BY-NC-SA 4.0).
// Die Lösungsvorschläge zu den Aufgaben sind von Claude geschrieben und NICHT mit BlueJ getestet (Bibliothek GameWindow lag nicht vor).
(function () {
const uml = (name, attrs, meths, obj) => `<div class="uml${obj ? ' obj' : ''}"><div>${name}</div><div>${attrs.join('<br>') || '&nbsp;'}</div>${meths ? `<div>${meths.join('<br>') || '&nbsp;'}</div>` : ''}</div>`;
const arr = n => '<table style="margin:6px auto;text-align:center"><tr>' + [...Array(n).keys()].map(i => `<th>${i}</th>`).join('') + '</tr><tr>' + [...Array(n).keys()].map(() => '<td>&rarr;</td>').join('') + '</tr></table>';
window.TOPICS.push({
  id: 'array-referenzen', week: 4, title: 'Array von Referenzen',
  summary: 'Listen von Objekten (z. B. Sprites) in Arrays verwalten: erzeugen, per Schleife bearbeiten, 2D-Arrays.',
  sections: [
    { title: 'Wiederholung: Array einfacher Werte', html: `<ul><li>Zugriff auf Elemente über den <b>Index</b> (beginnt bei 0).</li><li>Die Anzahl der Elemente wird bei der Erzeugung festgelegt: <b>statische Länge</b>.</li></ul>
      <pre><code>public class Beispiel
{
    private int[] liste;               // Deklaration mit [ ]

    public Beispiel()
    {
        liste = new int[10];           // Erzeugung mit Anzahl der Elemente
    }

    public void main()
    {
        liste[3] = 199;                // Element ändern
        Console.println(liste[3]);     // Element verwenden
    }
}</code></pre>` },
    { title: 'Warum Arrays von Objekten?', html: '<p>In der Praxis hat man meist <b>Listen von Objekten</b>: Produkte, Mitarbeiter, Bankkonten, Benutzeraccounts, Nachrichten … In unserem Beispiel: eine Liste von <b>Sprites</b> (bewegliche Bilder) in einem 2D-Spiel.</p>' },
    { title: 'Im Klassendiagramm', html: `<p>Arrays werden mit eckigen Klammern dargestellt, <code>- spriteListe: Sprite[ ]</code>. Die Klasse <code>Game</code> <b>hat</b> ein Array von Sprite-Objekten.</p>
      <div class="diag">${uml('Game', ['<b>- sprListe: Sprite[ ]</b>'], ['+ Game()', '+ main()'])}<span style="display:inline-block;vertical-align:top;margin-top:30px">- - - &rarr;</span>${uml('Sprite', ['- x, y: double', '- speed: double', '- richtung: double'], [])}</div>
      <div class="warn">Die hat-Beziehung Game → Sprite wird nicht immer als Pfeil gezeichnet (oft sieht man nur das Attribut <code>Sprite[ ]</code>). Man muss also <b>genau hinschauen</b>!</div>` },
    { title: 'Deklaration und Erzeugen', html: `<pre><code>public class Game
{
    private Sprite[] spListe;
    private GameImage img;

    public Game()
    {
        int i;
        img = new GameImage("images/bubble.jpg");
        spListe = new Sprite[10];
        for (i = 0; i &lt; 10; i++)
        {
            spListe[i] = new Sprite(img);
        }
    }
}</code></pre>
      <ol><li><code>Sprite[]</code> bei der Deklaration: ein Array von Sprite-Referenzen.</li>
      <li><code>new Sprite[10]</code> erzeugt <b>nur das Array</b> mit 10 Referenzen, <u>nicht die Sprite-Objekte</u>. Alle Referenzen zeigen zunächst auf <code>null</code>.</li>
      <li>Die 10 Objekte erzeugt man danach z. B. in einer for-Schleife (hier: alle mit demselben Bild).</li></ol>
      <div class="diag"><b>Nach <code>new Sprite[4]</code>:</b> Array vorhanden, alle Plätze null${arr(4).replace(/&rarr;/g, 'null')}<b>Nach den new Sprite(...):</b> jeder Platz zeigt auf ein eigenes Sprite-Objekt${arr(4)}</div>
      <div class="warn"><b>Klassiker:</b> Nur <code>new Sprite[10]</code> ohne die Schleife → <code>spListe[0].setSpeed(5)</code> stürzt ab (NullPointerException).</div>` },
    { title: 'Objektdiagramm', html: `<p>UML hat eigentlich keine Darstellung für Arrays. In der Schule zeichnet man das Array als Reihe von Kästchen mit Index, aus denen Pfeile zu den Objekten führen:</p>
      <div class="diag">${uml(': Game', [], null, true)}<div class="muted">sprListe ↓</div>${arr(4)}
      ${uml(': Sprite', ['x = 10.0', 'y = 20.0', 'speed = 5.0', 'richtung = 0.0'], null, true)}${uml(': Sprite', ['x = 85.3', 'y = 19.8', 'speed = 3.1', 'richtung = 0.0'], null, true)}${uml(': Sprite', ['x = 238.0', 'y = 125.0', 'speed = 5.0', 'richtung = 3.5'], null, true)}${uml(': Sprite', ['x = 9.0', 'y = -15.0', 'speed = 0.0', 'richtung = 4.0'], null, true)}</div>
      <p>Namenlose Objekte werden als <code>: Sprite</code> geschrieben (Doppelpunkt, ohne Objektname).</p>` },
    { title: 'Objekte im Array bearbeiten', html: `<p>Meist bearbeitet man <b>alle</b> Objekte gleich, also mit einer Schleife:</p>
      <pre><code>public void main()
{
    int i;
    double x, y;
    for (i = 0; i &lt; spListe.length; i++)
    {
        spListe[i].setSpeed(5.0);
        x = Math.random() * 800;
        y = Math.random() * 600;
        spListe[i].setPosition(x, y);
    }
}</code></pre>
      <p><code>spListe[i]</code> steht für das <b>i-te Objekt</b>. Darauf wendest du mit dem Punkt-Operator Methoden an: <code>spListe[i].methode();</code>. Einzelne Elemente: <code>spListe[0].setPosition(100, 200);</code></p>
      <p><code>Math.random()</code> liefert eine Zufallszahl zwischen 0 (inklusive) und 1 (exklusive). <code>Math.random() * 800</code> → Zufallszahl von 0 bis unter 800.</p>` },
    { title: 'Ein Bild für mehrere Sprites', html: `<p>Früher erzeugten die Sprites selbst ihre Bilder. Jetzt wird das <code>GameImage</code> vom <b>Hauptobjekt</b> erzeugt und dem Sprite beim Erzeugen übergeben:</p>
      <pre><code>img1 = new GameImage("./img/bild.png");
sp1 = new Sprite(img1);
sp2 = new Sprite(img1);     // beide benutzen dasselbe Bild</code></pre>
      <p>Vorteil: ein Bild ist für <b>mehrere Sprites</b> verwendbar (spart Speicher). Im Klassendiagramm: <code>Sprite(pImg: GameImage)</code>, Game hat Referenzen auf GameImage und Sprite.</p>
      <div class="diag">${uml('Game', [], ['+ Game()', '+ main()'])} &rarr; ${uml('Sprite', ['- x, y: double', '- speed: double', '- richtung: double'], ['<b>+ Sprite(pImg: GameImage)</b>', '...'])} &rarr; ${uml('GameImage', [], ['+ GameImage(pDatei: String)', '...'])}</div>` },
    { title: 'Zusatz: Array von Arrays (2D-Array)', html: `<p><i>Für Aufgabe 2 („7 mal 7 Sprites") nötig:</i> Ein 2D-Array ist ein Array, dessen Elemente selbst Arrays sind (wie ein Schachbrett aus Zeilen und Spalten).</p>
      <pre><code>private Sprite[][] feld;
...
feld = new Sprite[7][7];                  // 7 Zeilen, 7 Spalten
for (int z = 0; z &lt; 7; z++) {            // z = Zeile
    for (int s = 0; s &lt; 7; s++) {        // s = Spalte
        feld[z][s] = new Sprite(img);
    }
}
feld[2][5].setSpeed(3.0);                 // Zeile 2, Spalte 5</code></pre>
      <p>Zwei Schleifen ineinander (<b>geschachtelte Schleifen</b>) laufen alle Elemente durch.</p>` },
    { title: 'Doku der Klassen (Kurzfassung aus dem Arbeitsblatt)', html: `<p><b>GameWindow:</b> <code>new GameWindow(50, 50, 800, 600, "Titel")</code>, <code>clear()</code> (weiß übermalen), <code>getWidth()</code>, <code>getHeight()</code>, <code>drawImage(img, px, py)</code>, <code>paintFrame()</code> (zeigt Gezeichnetes), <code>getMouseX()</code>, <code>getMouseY()</code>.</p>
      <p><b>GameImage:</b> <code>new GameImage("./images/bild.png")</code>, <code>setScale(0.4)</code> (0 &lt; s &lt; 1 verkleinert), <code>getWidth()</code>, <code>getHeight()</code>.</p>
      <p><b>Sprite:</b> <code>new Sprite(img)</code>, <code>setPosition(x, y)</code>, <code>setSpeed(s)</code>, <code>setRichtung(grad)</code> (0° = x-Achse), <code>dreheZu(sprite)</code>, <code>bewege()</code>, <code>pralleAbHorizontal()</code> / <code>pralleAbVertikal()</code> (Richtung ändern wie beim Abprallen an waagerechter/senkrechter Kante), <code>draw(window)</code>, <code>getX()</code>, <code>getY()</code>, <code>berührtRechts(window)</code> / <code>berührtLinks(window)</code> / …, <code>berührt(sprite)</code>, <code>getAbstand(sprite)</code>.</p>` }
  ],
  keyPoints: ['Array von Objekten: Sprite[] liste = new Sprite[n] erzeugt nur n Referenzen (null)', 'Jedes Objekt einzeln mit new erzeugen (meist for-Schleife)', 'liste[i].methode() – Punkt-Operator auf dem i-ten Objekt', 'liste.length für die Anzahl; Index 0 bis length-1', 'Ein GameImage kann von mehreren Sprites genutzt werden (Hauptobjekt erzeugt es)', 'Objektdiagramm: Array als Kästchenreihe mit Pfeilen zu den Objekten'],
  glossary: [
    { term: 'Array von Referenzen', def: 'Array, dessen Elemente Referenzen auf Objekte sind (z. B. Sprite[ ]).' },
    { term: 'statische Länge', def: 'Die Anzahl der Array-Elemente wird bei der Erzeugung festgelegt und ändert sich nicht.' },
    { term: 'Sprite', def: 'Bewegliches Bild im 2D-Spiel mit Position, Geschwindigkeit und Richtung.' },
    { term: 'GameImage', def: 'Bilddatei, die einem Sprite zugeordnet wird; kann von mehreren Sprites genutzt werden.' },
    { term: 'GameWindow', def: 'Fenster, in das Sprites gezeichnet werden.' },
    { term: 'Punkt-Operator', def: 'Methodenaufruf auf einem Objekt: spListe[i].setSpeed(5.0).' },
    { term: '2D-Array', def: 'Array von Arrays (Zeilen und Spalten), Zugriff mit feld[zeile][spalte].' }
  ],
  cards: [
    { q: 'Was erzeugt <code>spListe = new Sprite[10];</code>?', a: 'Nur ein Array mit 10 Referenzen (alle null), noch keine Sprite-Objekte.' },
    { q: 'Wie bearbeitest du alle Objekte eines Arrays?', a: 'Mit einer for-Schleife über alle Indizes und spListe[i].methode().' },
    { q: 'Wie kommt man an die Anzahl der Elemente?', a: 'spListe.length (ohne Klammern).' }
  ],
  quiz: [
    { q: 'Was erzeugt <code>new Sprite[10]</code>?', options: ['10 Sprite-Objekte', 'Ein Array mit 10 null-Referenzen', 'Ein Sprite mit Größe 10', 'Ein Fenster'], answer: 1, explain: 'Die Objekte müssen noch einzeln erzeugt werden.' },
    { q: 'Was passiert bei <code>spListe[0].setSpeed(5.0)</code> direkt nach <code>spListe = new Sprite[10];</code>?', options: ['Es klappt', 'NullPointerException', 'Compilerfehler', 'Sprite wird automatisch erzeugt'], answer: 1, explain: 'spListe[0] ist null.' },
    { q: 'Welche Schleife erzeugt alle 10 Sprites?', options: ['for (i=0;i&lt;10;i++) spListe[i] = new Sprite(img);', 'new Sprite[10] (img);', 'while (spListe) {...}', 'spListe = new Sprite(10);'], answer: 0, explain: 'Pro Platz ein new Sprite(...).' },
    { q: 'Wie heißt das i-te Objekt?', options: ['spListe.i', 'spListe[i]', 'spListe(i)', 'spListe->i'], answer: 1, explain: 'Index in eckigen Klammern.' },
    { q: 'Wie viele Sprites hat ein Array mit <code>new Sprite[30]</code> höchstens?', options: ['29', '30', '31', 'unbegrenzt'], answer: 1, explain: 'Statische Länge: 30 Plätze, Indizes 0 bis 29.' },
    { q: 'Wie zeigt das Klassendiagramm ein Array von Sprites in Game?', options: ['Attribut <code>- spListe: Sprite[ ]</code>', 'Pfeil mit Dreieck', 'Gar nicht', 'Als Methode'], answer: 0, explain: 'Eckige Klammern beim Typ. Der Assoziationspfeil wird oft weggelassen.' },
    { q: 'Wer erzeugt das GameImage, wenn mehrere Sprites es teilen sollen?', options: ['Jeder Sprite selbst', 'Das Hauptobjekt (Game)', 'Der Garbage Collector', 'BlueJ'], answer: 1, explain: 'Das Hauptobjekt erzeugt es und übergibt es dem Sprite-Konstruktor.' },
    { q: 'Wie greift man bei <code>Sprite[][] feld</code> auf Zeile 2, Spalte 5 zu?', options: ['feld[5][2]', 'feld[2][5]', 'feld(2,5)', 'feld[2,5]'], answer: 1, explain: 'Erst Zeile, dann Spalte (Index jeweils ab 0).' }
  ],
  exercises: [
    { task: `<p><b>Aufgabe 1 (AB):</b> Klasse <code>Abprallen</code>: Ein Array von <b>30 Sprites</b> bewegt sich nach gleichem Muster (zufällige Startposition und Geschwindigkeit, Abprallen vom Fensterrand). Die ersten sechs Sprites bekommen das erste Bild, die nächsten sechs das zweite usw.<br><i>Zusatz:</i> Array von GameImages; jedem Sprite zufällig eines der sieben Bilder zuordnen.</p>`,
      hint: 'Bildnummer = i / 6 (ganzzahlige Division!). Das Bilder-Array füllst du einzeln, weil jeder Dateiname anders ist. Zufallszahl 0 bis n−1: (int)(Math.random() * n).',
      solution: `<p><i>Lösungsvorschlag (nicht in BlueJ getestet). Dateinamen und die Methoden berührtOben/Unten sind angenommen; Namen aus der Vorlage übernehmen.</i></p><pre><code>public class Abprallen
{
    private GameWindow window;
    private GameImage[] bilder;     // 5 Bilder
    private Sprite[] spListe;

    public Abprallen()
    {
        int i;
        window = new GameWindow(50, 50, 800, 600, "Abprallen");

        bilder = new GameImage[5];                  // Bilder einzeln erzeugen
        bilder[0] = new GameImage("./images/bild1.png");
        bilder[1] = new GameImage("./images/bild2.png");
        bilder[2] = new GameImage("./images/bild3.png");
        bilder[3] = new GameImage("./images/bild4.png");
        bilder[4] = new GameImage("./images/bild5.png");

        spListe = new Sprite[30];
        for (i = 0; i &lt; spListe.length; i++)
        {
            // 0-5 -> Bild 0, 6-11 -> Bild 1, ...
            spListe[i] = new Sprite(bilder[i / 6]);
            spListe[i].setPosition(Math.random() * 700, Math.random() * 500);
            spListe[i].setSpeed(1 + Math.random() * 4);
            spListe[i].setRichtung(Math.random() * 360);
        }
    }

    public void main()
    {
        int i;
        while (true)
        {
            window.clear();
            for (i = 0; i &lt; spListe.length; i++)
            {
                spListe[i].bewege();
                if (spListe[i].berührtLinks(window) || spListe[i].berührtRechts(window))
                {
                    spListe[i].pralleAbVertikal();      // senkrechte Kante
                }
                if (spListe[i].berührtOben(window) || spListe[i].berührtUnten(window))
                {
                    spListe[i].pralleAbHorizontal();    // waagerechte Kante
                }
                spListe[i].draw(window);
            }
            window.paintFrame();
        }
    }
}</code></pre>
      <p><b>Zusatz (zufälliges Bild):</b> <code>spListe[i] = new Sprite(bilder[(int)(Math.random() * 7)]);</code> mit einem Bilder-Array der Länge 7 (jedes GameImage einzeln erzeugt).</p>
      <p><b>Idee dahinter:</b> Eine Schleife behandelt alle 30 Sprites gleich. Das Muster steht nur einmal im Code.</p>` },
    { task: `<p><b>Aufgabe 2 (AB):</b> Klasse <code>Drehen</code>: 2D-Array von 7×7 Sprites, Bilder z. B. auf 40 % verkleinert. Die Sprites stehen schachbrettartig im Fenster verteilt. Dann bewegt sich jeder Sprite auf einer kleinen Kreisbahn, alle parallel.</p>`,
      hint: 'Zellgröße = Fensterbreite / 7 bzw. Höhe / 7. Kreisbahn: Richtung in jedem Durchlauf um einen kleinen Winkel erhöhen und bewege() mit konstanter Geschwindigkeit aufrufen.',
      solution: `<p><i>Lösungsvorschlag (nicht in BlueJ getestet).</i></p><pre><code>public class Drehen
{
    private GameWindow window;
    private GameImage img;
    private Sprite[][] feld;

    public Drehen()
    {
        int z, s;
        window = new GameWindow(50, 50, 800, 600, "Drehen");
        img = new GameImage("./images/bild1.png");
        img.setScale(0.4);

        feld = new Sprite[7][7];
        for (z = 0; z &lt; 7; z++)              // Zeile
        {
            for (s = 0; s &lt; 7; s++)          // Spalte
            {
                feld[z][s] = new Sprite(img);
                feld[z][s].setPosition(s * window.getWidth() / 7.0,
                                       z * window.getHeight() / 7.0);
                feld[z][s].setSpeed(2.0);
            }
        }
    }

    public void main()
    {
        int z, s;
        double winkel = 0;
        while (true)
        {
            window.clear();
            winkel = winkel + 5;                       // alle drehen gleich weit
            for (z = 0; z &lt; 7; z++)
            {
                for (s = 0; s &lt; 7; s++)
                {
                    feld[z][s].setRichtung(winkel);
                    feld[z][s].bewege();
                    feld[z][s].draw(window);
                }
            }
            window.paintFrame();
        }
    }
}</code></pre>
      <p><b>Warum Kreis?</b> Die Richtung ändert sich bei jedem Schritt um 5°, die Geschwindigkeit bleibt gleich. Nach 72 Schritten (360°) ist der Sprite wieder am Start. Alle haben dieselbe Richtung, bewegen sich also parallel.</p>` },
    { task: `<p><b>Aufgabe 3 (AB):</b> Klasse <code>Schlange</code>: 100 Sprites mit Seifenblasen-Bild beginnen in der Fenstermitte. Der Kopf folgt mit konstanter Geschwindigkeit (z. B. 5 Pixel) dem Mauszeiger. Jeder weitere Sprite folgt seinem Vorgänger mit 8 Pixeln Abstand. Ist er schon näher, bleibt er stehen.</p>`,
      hint: 'Für den Kopf: einen unsichtbaren Hilfs-Sprite an die Mausposition setzen und dreheZu() nutzen. Für Sprite i: Abstand zu Sprite i−1 mit getAbstand(); Geschwindigkeit = abstand − 8, wenn abstand > 8, sonst 0.',
      solution: `<p><i>Lösungsvorschlag (nicht in BlueJ getestet). Der Hilfs-Sprite „maus" wird nie gezeichnet.</i></p><pre><code>public class Schlange
{
    private GameWindow window;
    private GameImage img;
    private Sprite[] teile;
    private Sprite maus;

    public Schlange()
    {
        int i;
        window = new GameWindow(50, 50, 800, 600, "Schlange");
        img = new GameImage("./images/bubble.png");

        teile = new Sprite[100];
        for (i = 0; i &lt; teile.length; i++)
        {
            teile[i] = new Sprite(img);
            teile[i].setPosition(window.getWidth() / 2.0, window.getHeight() / 2.0);
        }
        maus = new Sprite(img);          // nur zum Berechnen, wird nicht gezeichnet
    }

    public void main()
    {
        int i;
        double abstand;
        while (true)
        {
            window.clear();

            // Kopf folgt der Maus
            maus.setPosition(window.getMouseX(), window.getMouseY());
            teile[0].dreheZu(maus);
            teile[0].setSpeed(5.0);
            teile[0].bewege();

            // alle anderen folgen ihrem Vorgänger
            for (i = 1; i &lt; teile.length; i++)
            {
                abstand = teile[i].getAbstand(teile[i - 1]);
                if (abstand &gt; 8)
                {
                    teile[i].dreheZu(teile[i - 1]);
                    teile[i].setSpeed(abstand - 8);   // genau bis auf 8 Pixel ran
                    teile[i].bewege();
                }
            }

            for (i = 0; i &lt; teile.length; i++)
            {
                teile[i].draw(window);
            }
            window.paintFrame();
        }
    }
}</code></pre>
      <p><b>Wichtig:</b> Schleife für die Bewegung beginnt bei <code>i = 1</code> (der Kopf ist Sonderfall), und jeder Sprite bezieht sich auf <code>teile[i - 1]</code>, seinen Vorgänger.</p>` },
    { task: '<p>Zeichne das Objektdiagramm für <code>sprListe = new Sprite[3];</code> unmittelbar nach dieser Zeile und danach, nachdem <code>sprListe[0]</code> und <code>sprListe[2]</code> mit <code>new Sprite(img)</code> belegt wurden.</p>', hint: 'Nicht belegte Plätze zeigen auf null.', solution: `<div class="diag"><b>Direkt nach new Sprite[3]:</b><br>${arr(3).replace(/&rarr;/g, 'null')}<b>Danach:</b><br><table style="margin:6px auto;text-align:center"><tr><th>0</th><th>1</th><th>2</th></tr><tr><td>→ : Sprite</td><td>null</td><td>→ : Sprite</td></tr></table></div><p>Platz 1 bleibt <code>null</code>. <code>sprListe[1].bewege()</code> würde abstürzen.</p>` },
    { task: '<p>Was ist falsch?<pre><code>Sprite[] liste = new Sprite[5];\nfor (int i = 0; i &lt;= liste.length; i++)\n{\n    liste[i] = new Sprite(img);\n}</code></pre></p>', hint: 'Letzter gültiger Index?', solution: '<p><code>i &lt;= liste.length</code> läuft bis i = 5, aber der letzte gültige Index ist 4 → <i>ArrayIndexOutOfBoundsException</i>. Richtig: <code>i &lt; liste.length</code>.</p>' }
  ]
});
})();
