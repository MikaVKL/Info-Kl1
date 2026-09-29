(function () {
  const app = document.getElementById('app');
  const T = window.TOPICS.slice().sort((a, b) => a.week - b.week);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  // ---- Fortschritt (localStorage) ----
  const KEY = 'info-lernapp-v1';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
  const save = d => { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {} };
  const prog = id => { const d = load(); return d[id] || { known: [], best: null, done: [] }; };
  const setProg = (id, fn) => { const d = load(); d[id] = d[id] || { known: [], best: null, done: [] }; fn(d[id]); save(d); };

  const cardsOf = t => [...(t.glossary || []).map(g => ({ q: g.term, a: g.def })), ...(t.cards || [])];

  function pct(t) {
    const p = prog(t.id), c = cardsOf(t).length, e = (t.exercises || []).length;
    const parts = [];
    if (c) parts.push(p.known.length / c);
    if (e) parts.push(p.done.length / e);
    if (p.best !== null) parts.push(p.best);
    return parts.length ? Math.round(100 * parts.reduce((a, b) => a + b, 0) / 3) : 0;
  }

  // ---- Router ----
  function route() {
    const [, kind, id, tab] = location.hash.split('/');
    window.scrollTo(0, 0);
    if (kind === 't') {
      const t = T.find(x => x.id === id);
      if (t) return topic(t, tab || 'lesson');
    }
    if (kind === 'exam') return exam();
    home();
  }
  window.addEventListener('hashchange', route);

  function home() {
    document.getElementById('nav').innerHTML = T.length > 1 ? '<a href="#/exam">🎯 Klassenarbeit-Training</a>' : '';
    app.innerHTML = '<h1>Deine Themen</h1><p class="muted">Ein Thema pro Woche – lies die Erklärung, übe mit Karteikarten, teste dich im Quiz und löse das Arbeitsblatt.</p>' +
      (T.length ? T.map(t => `<a class="card topic" href="#/t/${t.id}/lesson"><div class="week">Woche ${t.week}</div><h2 style="margin:4px 0">${esc(t.title)}</h2><div class="muted">${esc(t.summary || '')}</div><div class="bar"><i style="width:${pct(t)}%"></i></div></a>`).join('') : '<div class="card">Noch keine Themen.</div>');
  }

  function topic(t, tab) {
    document.getElementById('nav').innerHTML = '<a href="#/">← Alle Themen</a>';
    const tabs = [['lesson', '📖 Erklärung'], ['cards', '🗂 Karteikarten'], ['quiz', '❓ Quiz'], ['exercises', '📝 Arbeitsblatt']];
    app.innerHTML = `<div class="week">Woche ${t.week}</div><h1 style="margin:2px 0">${esc(t.title)}</h1>
      <div class="tabs">${tabs.map(([k, l]) => `<a href="#/t/${t.id}/${k}" class="${k === tab ? 'on' : ''}">${l}</a>`).join('')}</div><div id="body"></div>`;
    const body = document.getElementById('body');
    ({ lesson, cards, quiz, exercises }[tab] || lesson)(t, body);
  }

  // ---- Erklärung ----
  function lesson(t, el) {
    el.innerHTML = (t.sections || []).map(s => `<div class="card"><h2 style="margin-top:0">${esc(s.title)}</h2>${s.html}</div>`).join('') +
      (t.keyPoints ? `<div class="card"><h2 style="margin-top:0">✅ Das musst du für die Arbeit wissen</h2><ul>${t.keyPoints.map(k => `<li>${k}</li>`).join('')}</ul></div>` : '');
  }

  // ---- Karteikarten ----
  function cards(t, el) {
    const all = cardsOf(t);
    if (!all.length) return el.innerHTML = '<div class="card">Keine Karten.</div>';
    let deck = shuffle(all.map((c, i) => ({ ...c, i }))), pos = 0, shown = false;
    const draw = () => {
      const p = prog(t.id);
      if (pos >= deck.length) {
        el.innerHTML = `<div class="card"><h2>Fertig! 🎉</h2><p>${p.known.length} von ${all.length} Karten sitzen.</p><button id="again">Nochmal (nur unsichere)</button> <button class="ghost" id="reset">Alles zurücksetzen</button></div>`;
        document.getElementById('again').onclick = () => { deck = shuffle(all.map((c, i) => ({ ...c, i })).filter(c => !p.known.includes(c.i))); if (!deck.length) deck = shuffle(all.map((c, i) => ({ ...c, i }))); pos = 0; shown = false; draw(); };
        document.getElementById('reset').onclick = () => { setProg(t.id, x => x.known = []); deck = shuffle(all.map((c, i) => ({ ...c, i }))); pos = 0; shown = false; draw(); };
        return;
      }
      const c = deck[pos];
      el.innerHTML = `<div class="muted">Karte ${pos + 1}/${deck.length} · gewusst: ${p.known.length}/${all.length}</div>
        <div class="card flash" id="card">${shown ? c.a : esc(c.q)}</div>
        <div class="row">${shown ? '<button id="yes">✅ Gewusst</button><button class="ghost" id="no">🔁 Nochmal</button>' : '<button id="show">Antwort zeigen</button>'}</div>`;
      const flip = () => { shown = true; draw(); };
      if (!shown) { document.getElementById('show').onclick = flip; document.getElementById('card').onclick = flip; }
      else {
        document.getElementById('yes').onclick = () => { setProg(t.id, x => { if (!x.known.includes(c.i)) x.known.push(c.i); }); pos++; shown = false; draw(); };
        document.getElementById('no').onclick = () => { setProg(t.id, x => x.known = x.known.filter(k => k !== c.i)); pos++; shown = false; draw(); };
      }
    };
    draw();
  }

  // ---- Quiz ----
  function runQuiz(questions, el, onDone) {
    const qs = shuffle(questions);
    let n = 0, score = 0;
    const step = () => {
      if (n >= qs.length) { el.innerHTML = `<div class="card"><h2>Ergebnis: ${score}/${qs.length}</h2><div class="bar"><i style="width:${100 * score / qs.length}%"></i></div><p><button id="r">Nochmal</button></p></div>`; onDone && onDone(score / qs.length); document.getElementById('r').onclick = () => runQuiz(questions, el, onDone); return; }
      const q = qs[n], opts = shuffle(q.options.map((o, i) => ({ o, ok: i === q.answer })));
      el.innerHTML = `<div class="muted">Frage ${n + 1}/${qs.length}${q.topic ? ' · ' + esc(q.topic) : ''}</div><div class="card"><h3 style="margin-top:0">${q.q}</h3>${opts.map((o, i) => `<button class="opt" data-i="${i}">${o.o}</button>`).join('')}<div id="fb"></div></div>`;
      el.querySelectorAll('.opt').forEach(b => b.onclick = () => {
        const o = opts[+b.dataset.i]; if (o.ok) score++;
        el.querySelectorAll('.opt').forEach((x, i) => { x.disabled = true; if (opts[i].ok) x.classList.add('right'); });
        if (!o.ok) b.classList.add('wrong');
        document.getElementById('fb').innerHTML = `<div class="${o.ok ? 'tip' : 'warn'}"><b>${o.ok ? 'Richtig!' : 'Leider falsch.'}</b> ${q.explain || ''}</div><button id="nx">${n + 1 < qs.length ? 'Weiter' : 'Ergebnis'}</button>`;
        document.getElementById('nx').onclick = () => { n++; step(); };
      });
    };
    step();
  }
  function quiz(t, el) {
    if (!(t.quiz || []).length) return el.innerHTML = '<div class="card">Kein Quiz.</div>';
    const p = prog(t.id);
    el.innerHTML = `<div class="muted">Bestes Ergebnis: ${p.best === null ? '–' : Math.round(p.best * 100) + '%'}</div><div id="qz"></div>`;
    runQuiz(t.quiz, document.getElementById('qz'), r => setProg(t.id, x => { if (x.best === null || r > x.best) x.best = r; }));
  }

  // ---- Arbeitsblatt ----
  function exercises(t, el) {
    const ex = t.exercises || [], p = prog(t.id);
    if (!ex.length) return el.innerHTML = '<div class="card">Keine Aufgaben.</div>';
    el.innerHTML = ex.map((e, i) => `<div class="card"><h3 style="margin-top:0">Aufgabe ${i + 1}</h3>${e.task}
      <textarea placeholder="Deine Lösung…"></textarea>
      ${e.hint ? `<details><summary>💡 Tipp</summary>${e.hint}</details>` : ''}
      <details><summary>Musterlösung mit Erklärung</summary>${e.solution}</details>
      <label><input type="checkbox" data-i="${i}" ${p.done.includes(i) ? 'checked' : ''}> Erledigt & verstanden</label></div>`).join('');
    el.querySelectorAll('input[type=checkbox]').forEach(c => c.onchange = () => setProg(t.id, x => { const i = +c.dataset.i; x.done = x.done.filter(d => d !== i); if (c.checked) x.done.push(i); }));
  }

  // ---- Klassenarbeit-Training (alle Themen gemischt) ----
  function exam() {
    document.getElementById('nav').innerHTML = '<a href="#/">← Alle Themen</a>';
    app.innerHTML = `<h1>🎯 Klassenarbeit-Training</h1><p class="muted">Wähle die Themen, die drankommen:</p>
      <div class="card">${T.map(t => `<label style="display:block"><input type="checkbox" class="sel" value="${t.id}" checked> Woche ${t.week}: ${esc(t.title)}</label>`).join('')}</div>
      <button id="go">Start</button><div id="qz"></div>`;
    document.getElementById('go').onclick = () => {
      const ids = [...document.querySelectorAll('.sel:checked')].map(x => x.value);
      const qs = T.filter(t => ids.includes(t.id)).flatMap(t => (t.quiz || []).map(q => ({ ...q, topic: t.title })));
      if (qs.length) runQuiz(qs, document.getElementById('qz'));
    };
  }

  route();
})();
