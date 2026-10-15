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

  const wk = t => t.week === 0 ? (t.tag === 'tipps' ? 'Klausur' : 'Grundlagen') : 'Woche ' + t.week;
  const cardsOf = t => [...(t.glossary || []).map(g => ({ q: esc(g.term), a: g.def })), ...(t.cards || [])];

  function pct(t) {
    const p = prog(t.id), c = cardsOf(t).length, e = (t.exercises || []).length, q = (t.quiz || []).length;
    const avail = (c ? 1 : 0) + (e ? 1 : 0) + (q ? 1 : 0);
    if (!avail) return 0;
    const sum = (c ? p.known.length / c : 0) + (e ? p.done.length / e : 0) + (q && p.best !== null ? p.best : 0);
    return Math.round(100 * sum / avail);
  }

  // ---- Router ----
  let cur = location.hash;
  function route() {
    const [, kind, id, tab] = cur.split('/');
    window.scrollTo(0, 0);
    if (kind === 't') {
      const t = T.find(x => x.id === id);
      if (t) return topic(t, tab || 'lesson');
    }
    if (kind === 'exam') return exam();
    home();
  }
  // Navigation im Speicher (funktioniert auch in eingebetteten Seiten); der Hash wird nur mitgeführt.
  document.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('a[href^="#/"]');
    if (!a) return;
    e.preventDefault();
    cur = a.getAttribute('href');
    try { history.replaceState(null, '', cur); } catch (err) {}
    route();
  });
  window.addEventListener('hashchange', () => { cur = location.hash; route(); });

  const stat = (label, done) => `<span class="stat${done ? ' done' : ''}">${label}</span>`;
  function stats(t) {
    const p = prog(t.id), c = cardsOf(t).length, e = (t.exercises || []).length, out = [];
    if (c) out.push(stat(`Karten ${p.known.length}/${c}`, p.known.length >= c));
    if ((t.quiz || []).length) out.push(stat(`Quiz ${p.best === null ? '–' : Math.round(p.best * 100) + '%'}`, p.best === 1));
    if (e) out.push(stat(`Aufgaben ${p.done.length}/${e}`, p.done.length >= e));
    return `<div class="stats">${out.join('')}</div>`;
  }
  const topicCard = (t, badge) => `<a class="card topic" href="#/t/${t.id}/lesson"><div class="week">${wk(t)}${badge ? '<span class="tag">' + badge + '</span>' : ''}</div><h2>${esc(t.title)}</h2><div class="desc">${esc(t.summary || '')}</div>${stats(t)}<div class="bar"><i style="width:${pct(t)}%"></i></div></a>`;
  const isTip = t => t.tag === 'tipps';
  const isBasic = t => t.week === 0 && !isTip(t);
  function home() {
    document.getElementById('nav').innerHTML = '';
    const lessons = T.filter(t => t.week > 0), tips = T.filter(isTip), basics = T.filter(isBasic);
    const next = lessons.find(t => pct(t) < 100);
    app.innerHTML = '<div class="hero"><h1>Klassenarbeit schaffen</h1><p class="muted">Geh die Unterrichtsthemen der Reihe nach durch: Erklärung lesen, Karteikarten üben, Quiz machen, Arbeitsblatt lösen.</p></div>' +
      (T.length > 1 ? '<a class="card topic train" href="#/exam"><div class="week">Üben</div><h2>Klassenarbeit-Training</h2><div class="desc">Quizfragen aus den Unterrichtsthemen gemischt, wie ein Probedurchlauf.</div></a>' : '') +
      (lessons.length ? '<div class="section-title"><h2>Unterrichtsthemen</h2></div><div class="grid">' + lessons.map(t => topicCard(t, t === next ? 'Weiter hier' : '')).join('') + '</div>' : '') +
      (tips.length ? '<div class="section-title"><h2>Klausur-Vorbereitung</h2></div><div class="grid">' + tips.map(t => topicCard(t)).join('') + '</div>' : '') +
      (basics.length ? '<details class="more"><summary>Grundlagen und Nachschlagen (nur bei Bedarf)</summary><p class="muted">Vorwissen, falls dir in einem Unterrichtsthema etwas fehlt.</p><div class="grid">' + basics.map(t => topicCard(t)).join('') + '</div></details>' : '') +
      (T.length ? '' : '<div class="card">Noch keine Themen.</div>');
  }

  function topic(t, tab) {
    document.getElementById('nav').innerHTML = '<a href="#/">← Alle Themen</a>';
    const tabs = [['lesson', 'Erklärung'], ['cards', 'Karteikarten'], ['quiz', 'Quiz'], ['exercises', 'Arbeitsblatt']].filter(([k]) => k === 'lesson' || (k === 'cards' && cardsOf(t).length) || (k === 'quiz' && (t.quiz || []).length) || (k === 'exercises' && (t.exercises || []).length));
    app.innerHTML = `<div class="week">${wk(t)}</div><h1 style="margin:4px 0 0">${esc(t.title)}</h1>
      <div class="tabs">${tabs.map(([k, l]) => `<a href="#/t/${t.id}/${k}" class="${k === tab ? 'on' : ''}">${l}</a>`).join('')}</div><div id="body"></div>`;
    const body = document.getElementById('body');
    ({ lesson, cards, quiz, exercises }[tab] || lesson)(t, body);
  }

  // ---- Erklärung ----
  function lesson(t, el) {
    const secs = t.sections || [];
    el.innerHTML = (t.keyPoints ? `<div class="must"><h2><span>Das musst du für die Arbeit wissen</span></h2><ul>${t.keyPoints.map(k => `<li>${k}</li>`).join('')}</ul></div>` : '') +
      (secs.length > 2 ? `<div class="toc" aria-label="Inhalt">${secs.map((x, i) => `<button class="ghost" data-i="${i}">${i + 1}. ${esc(x.title)}</button>`).join('')}</div>` : '') +
      secs.map((x, i) => `<section class="card sec" id="sec${i}"><h2><span class="n">${i + 1}</span>${esc(x.title)}</h2>${x.html}</section>`).join('');
    el.querySelectorAll('.toc button').forEach(b => b.onclick = () => document.getElementById('sec' + b.dataset.i).scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }

  // ---- Karteikarten ----
  function cards(t, el) {
    const all = cardsOf(t);
    if (!all.length) return el.innerHTML = '<div class="card">Keine Karten.</div>';
    let deck = shuffle(all.map((c, i) => ({ ...c, i }))), pos = 0, shown = false;
    const draw = () => {
      const p = prog(t.id);
      if (pos >= deck.length) {
        el.innerHTML = `<div class="card"><h2>Geschafft</h2><p>${p.known.length} von ${all.length} Karten sitzen.</p><button id="again">Nochmal (nur unsichere)</button> <button class="ghost" id="reset">Alles zurücksetzen</button></div>`;
        document.getElementById('again').onclick = () => { deck = shuffle(all.map((c, i) => ({ ...c, i })).filter(c => !p.known.includes(c.i))); if (!deck.length) deck = shuffle(all.map((c, i) => ({ ...c, i }))); pos = 0; shown = false; draw(); };
        document.getElementById('reset').onclick = () => { setProg(t.id, x => x.known = []); deck = shuffle(all.map((c, i) => ({ ...c, i }))); pos = 0; shown = false; draw(); };
        return;
      }
      const c = deck[pos];
      el.innerHTML = `<div class="qhead"><span>Karte ${pos + 1} von ${deck.length}</span><span>gewusst: ${p.known.length}/${all.length}</span></div>
        <div class="bar"><i style="width:${100 * pos / deck.length}%"></i></div>
        <div class="card flash${shown ? ' back' : ''}" id="card"><small>${shown ? 'Antwort' : 'Frage'}</small><div>${shown ? c.a : c.q}</div></div>
        <div class="row">${shown ? '<button id="yes">Gewusst</button><button class="ghost" id="no">Nochmal üben</button>' : '<button id="show">Antwort zeigen</button>'}</div>`;
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
      if (n >= qs.length) { el.innerHTML = `<div class="card"><h2>Ergebnis</h2><div class="score">${score} von ${qs.length}</div><div class="bar"><i style="width:${100 * score / qs.length}%"></i></div><p><button id="r">Nochmal</button></p></div>`; onDone && onDone(score / qs.length); document.getElementById('r').onclick = () => runQuiz(questions, el, onDone); return; }
      const q = qs[n], opts = shuffle(q.options.map((o, i) => ({ o, ok: i === q.answer })));
      el.innerHTML = `<div class="qhead"><span>Frage ${n + 1} von ${qs.length}</span><span>${q.topic ? esc(q.topic) : ''}</span></div><div class="bar"><i style="width:${100 * n / qs.length}%"></i></div><div class="card" style="margin-top:12px"><h3 style="margin-top:0">${q.q}</h3>${opts.map((o, i) => `<button class="opt" data-i="${i}"><span class="ltr">${'ABCD'[i]}</span><span>${o.o}</span></button>`).join('')}<div id="fb"></div></div>`;
      el.querySelectorAll('.opt').forEach(b => b.onclick = () => {
        const o = opts[+b.dataset.i]; if (o.ok) score++;
        el.querySelectorAll('.opt').forEach((x, i) => { x.disabled = true; if (opts[i].ok) x.classList.add('right'); });
        if (!o.ok) b.classList.add('wrong');
        document.getElementById('fb').innerHTML = `<div class="${o.ok ? 'tip' : 'warn'}"><b>${o.ok ? 'Richtig.' : 'Nicht ganz.'}</b> ${q.explain || ''}</div><button id="nx">${n + 1 < qs.length ? 'Weiter' : 'Ergebnis'}</button>`;
        document.getElementById('nx').onclick = () => { n++; step(); };
      });
    };
    step();
  }
  function quiz(t, el) {
    if (!(t.quiz || []).length) return el.innerHTML = '<div class="card">Kein Quiz.</div>';
    const p = prog(t.id);
    el.innerHTML = `<p class="muted">Bestes Ergebnis: ${p.best === null ? 'noch keins' : Math.round(p.best * 100) + '%'}</p><div id="qz"></div>`;
    runQuiz(t.quiz, document.getElementById('qz'), r => setProg(t.id, x => { if (x.best === null || r > x.best) x.best = r; }));
  }

  // ---- Arbeitsblatt ----
  function exercises(t, el) {
    const ex = t.exercises || [], p = prog(t.id);
    if (!ex.length) return el.innerHTML = '<div class="card">Keine Aufgaben.</div>';
    el.innerHTML = ex.map((e, i) => `<div class="card task"><h3><span class="n">${i + 1}</span>Aufgabe</h3>${e.task}
      <textarea class="note" data-i="${i}" placeholder="Deine Lösung hier aufschreiben …">${esc((p.notes || {})[i] || '')}</textarea>
      ${e.hint ? `<details><summary>Tipp anzeigen</summary>${e.hint}</details>` : ''}
      <details><summary>Musterlösung mit Erklärung</summary>${e.solution}</details>
      <div class="done-row"><label><input type="checkbox" data-i="${i}" ${p.done.includes(i) ? 'checked' : ''}> Erledigt und verstanden</label></div></div>`).join('');
    el.querySelectorAll('textarea.note').forEach(a => a.oninput = () => setProg(t.id, x => { x.notes = x.notes || {}; x.notes[a.dataset.i] = a.value; }));
    el.querySelectorAll('input[type=checkbox]').forEach(c => c.onchange = () => setProg(t.id, x => { const i = +c.dataset.i; x.done = x.done.filter(d => d !== i); if (c.checked) x.done.push(i); }));
  }

  // ---- Klassenarbeit-Training (alle Themen gemischt) ----
  function exam() {
    document.getElementById('nav').innerHTML = '<a href="#/">← Alle Themen</a>';
    const row = (t, on) => `<label style="display:block"><input type="checkbox" class="sel" value="${t.id}" ${on ? 'checked' : ''}> ${wk(t)}: ${esc(t.title)}</label>`;
    const main = T.filter(t => !isBasic(t)), basics = T.filter(isBasic);
    app.innerHTML = `<h1>Klassenarbeit-Training</h1><p class="muted">Wähle die Themen, die drankommen:</p>
      <div class="card">${main.map(t => row(t, true)).join('')}${basics.length ? '<details><summary>Grundlagen (optional)</summary>' + basics.map(t => row(t, false)).join('') + '</details>' : ''}</div>
      <p><button id="go">Training starten</button></p><div id="qz"></div>`;
    document.getElementById('go').onclick = () => {
      const ids = [...document.querySelectorAll('.sel:checked')].map(x => x.value);
      const qs = T.filter(t => ids.includes(t.id)).flatMap(t => (t.quiz || []).map(q => ({ ...q, topic: t.title })));
      if (qs.length) runQuiz(qs, document.getElementById('qz'));
    };
  }

  route();
})();
