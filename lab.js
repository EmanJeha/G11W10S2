/* Relationships Lab · Grade 11 · Week 10 · Session 2 · Database relationships
   Spot repeated data, split a big table, classify 1:1 / 1:M / M:M, link real tables with foreign keys,
   build a junction table and run a JOIN.
   Usage: const lab = mountLab(root, { fs: '18px', height: '640px', onChange() {} }) */
(function () {
  const CSS = `
.rl{--ink:#1B1F3B;font-size:var(--rlfs,18px);font-family:Nunito,system-ui,sans-serif;color:var(--ink);display:grid;grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);grid-template-rows:auto minmax(0,1fr);gap:.75em;height:var(--rlh,640px)}
.rl *{box-sizing:border-box}
.rl-next{grid-column:1/-1;display:flex;align-items:center;gap:.8em;background:linear-gradient(90deg,#fff2c4,#fff7e0);border:3px solid #FFB020;border-radius:1em;padding:.5em .9em;font-weight:800}
.rl-next .tag{background:#FFB020;color:#fff;border-radius:.6em;padding:.25em .6em;font:900 .8em Nunito;letter-spacing:.1em;flex:none}
.rl-next .txt{flex:1;line-height:1.3}
.rl-btn{border:0;border-radius:.65em;padding:.42em .75em;font:800 .85em Nunito;cursor:pointer;background:#fff;color:var(--ink);box-shadow:0 .2em 0 #dfe3f2;white-space:nowrap}
.rl-btn.p{background:#5B5BF0;color:#fff;box-shadow:0 .2em 0 #3b3bc0}.rl-btn.g{background:#12B886;color:#fff;box-shadow:0 .2em 0 #0b8a62}.rl-btn.o{background:#FFB020;color:#fff;box-shadow:0 .2em 0 #c98600}
.rl-main{background:#fff;border-radius:1em;box-shadow:0 .3em 0 #e4e1f5;display:flex;flex-direction:column;min-height:0;overflow:hidden}
.rl-tabs{display:flex;gap:.35em;padding:.5em .55em;background:#f6f7ff;flex-wrap:wrap}
.rl-tab{border:0;border-radius:.65em;padding:.4em .7em;font:800 .82em Nunito;cursor:pointer;background:#fff;color:#4a5078;box-shadow:0 .2em 0 #dfe3f2;display:flex;align-items:center;gap:.35em}
.rl-tab.on{background:#5B5BF0;color:#fff;box-shadow:0 .2em 0 #3b3bc0}
.rl-tab .d{width:.65em;height:.65em;border-radius:50%;background:#d9dcef}.rl-tab .d.ok{background:#16a34a}
.rl-body{flex:1;min-height:0;overflow:auto;padding:.7em .8em}
.rl-p{font:700 .88em/1.4 Nunito;color:#4a5078;margin:0 0 .5em}
.rl-p b{color:var(--ink)}
.rl-row{display:flex;gap:.7em;align-items:flex-start;flex-wrap:wrap}
.rl-tw{flex:1;min-width:12em}
.rl-tn{font:900 .72em Nunito;letter-spacing:.12em;text-transform:uppercase;color:#5B5BF0;margin:.2em 0 .25em;display:flex;align-items:center;gap:.4em}
.rl-t{width:100%;border-collapse:separate;border-spacing:0;font:600 .82em 'JetBrains Mono',monospace}
.rl-t th{background:#5B5BF0;color:#fff;padding:.32em .5em;text-align:left;font-weight:700;white-space:nowrap}
.rl-t th:first-child{border-radius:.5em 0 0 0}.rl-t th:last-child{border-radius:0 .5em 0 0}
.rl-t.j th{background:#FFB020}.rl-t.c th{background:#12B886}.rl-t.r th{background:#FF5D73}
.rl-t td{padding:.3em .5em;border-bottom:2px solid #f0f2f8;white-space:nowrap}
.rl-t tr.click{cursor:pointer}.rl-t tr.click:hover td{background:#f6f7ff}
.rl-t tr.bad td{background:#ffe3e3}.rl-t tr.good td{background:#dcfbee}.rl-t tr.hit td{background:#fff2d6}
.rl-t select{font:700 1em 'JetBrains Mono',monospace;padding:.15em .3em;border-radius:.4em;border:2px solid #d5e2fb;background:#fff}
.rl-t tr.new td{animation:rln 1.1s}
@keyframes rln{0%{background:#dcfbee}100%{background:transparent}}
.rl-x{border:0;background:#ffe3e3;color:#c0264a;border-radius:.4em;font-weight:900;cursor:pointer;padding:0 .45em}
.rl-cls{display:grid;grid-template-columns:1fr auto;gap:.45em;align-items:center}
.rl-cls .pair{font:800 .92em Nunito;background:#f6f7ff;border-radius:.6em;padding:.45em .6em}
.rl-cls .ch{display:flex;gap:.3em}
.rl-cls .ch button{border:3px solid #e4e1f5;background:#fff;border-radius:.55em;font:800 .85em 'JetBrains Mono';padding:.28em .5em;cursor:pointer}
.rl-cls .ch button.ok{border-color:#16a34a;background:#dcfbee}.rl-cls .ch button.no{border-color:#d92d2d;background:#ffe3e3}
.rl-msg{padding:.5em .8em;font:800 .85em/1.35 Nunito;background:#f4f6ff;min-height:2.3em}
.rl-msg.good{background:#dcfbee;color:#0b6a4a}.rl-msg.bad{background:#ffe3e3;color:#a31f1f}.rl-msg.info{background:#fff2d6;color:#8a5b00}
.rl-side{display:flex;flex-direction:column;gap:.65em;min-height:0}
.rl-card{background:#fff;border-radius:1em;padding:.55em .75em;box-shadow:0 .3em 0 #e4e1f5}
.rl-h{font:900 .74em Nunito;letter-spacing:.14em;text-transform:uppercase;color:#5B5BF0;margin-bottom:.35em}
.rl-dia{display:flex;align-items:center;justify-content:center;gap:.5em;padding:.4em 0;font:800 .9em Nunito}
.rl-dia .ent{background:#eef0ff;border:3px solid #5B5BF0;border-radius:.6em;padding:.35em .6em}
.rl-dia .ent.j{background:#fff7e0;border-color:#FFB020}
.rl-dia .lk{font:800 .95em 'JetBrains Mono';color:#5B5BF0;text-align:center;line-height:1.1}
.rl-dia .lk small{display:block;font:800 .65em Nunito;color:#7a80a6}
.rl-out{background:#151936;color:#e9ecff;border-radius:.7em;padding:.45em .65em;font:600 .78em/1.45 'JetBrains Mono',monospace;min-height:2.2em;white-space:pre-wrap}
.rl-out .k{color:#c4a7ff}.rl-out .ok{color:#7ee2b8}.rl-out .s{color:#ffd27a}
.rl-mis{flex:1;min-height:0;overflow:auto}
.rl-m{display:flex;gap:.45em;align-items:flex-start;padding:.22em 0;border-top:2px solid #f2f3fa;font:700 .78em/1.28 Nunito;color:#4a5078}
.rl-m:first-of-type{border-top:0}
.rl-m .ck{flex:none;width:1.35em;height:1.35em;border-radius:.4em;background:#e7e9f5;color:#fff;display:grid;place-items:center;font-size:.85em}
.rl-m.on{color:#12884f}.rl-m.on .ck{background:#16a34a}.rl-m.cur{color:var(--ink)}.rl-m.cur .ck{background:#FFB020}
.rl-m .sm{border:0;background:#EEF0FF;color:#3730a3;border-radius:.5em;font:800 .78em Nunito;padding:.12em .45em;cursor:pointer;margin-left:auto;flex:none}
@media (max-width:900px){.rl{grid-template-columns:minmax(0,1fr);height:auto}.rl-next{flex-wrap:wrap}.rl-body{max-height:26em}}
`;
  const MISSIONS = [
    { id: 'spot', tab: 0, t: 'One big table: tap the row with the inconsistent teacher email' },
    { id: 'split', tab: 0, t: 'Fix it: split the table into Teachers + Classes (linked by TeacherID)' },
    { id: 'cls', tab: 1, t: 'Classify 4 relationships as 1:1, 1:M or M:M' },
    { id: 'oneone', tab: 2, t: '1:1 · give each student exactly ONE ID card' },
    { id: 'onemany', tab: 3, t: '1:M · let ONE teacher teach MANY students' },
    { id: 'junction', tab: 4, t: 'M:M · fill the Enrollments junction table (a student in 2 courses, a course with 2 students)' },
    { id: 'join', tab: 4, t: 'JOIN · show which courses one student takes' },
  ];
  const TABS = ['🧾 One big table', '🧠 Classify', '🪪 1 : 1', '👩‍🏫 1 : M', '🔗 M : M'];
  const STU = [[1, 'Ali'], [2, 'Sara'], [3, 'Omar']];
  const TEA = [[1, 'Mr. Ahmed'], [2, 'Mr. Ali']];
  const STU2 = [[1, 'Mohamed'], [2, 'Mahmoud'], [3, 'Omar'], [4, 'Yusuf']];
  const CRS = [[101, 'Math'], [102, 'Science'], [103, 'Art']];
  const STU3 = [[1, 'Ali'], [2, 'Ahmed'], [3, 'Sara']];
  const BIG = [['Math', 'Mr. Ahmed', 'ahmed@mis.edu'], ['Physics', 'Mr. Ahmed', 'ahmed@mis.edu'], ['ICT', 'Mr. Ahmed', 'ahmad@mis.edu'], ['Chemistry', 'Ms. Huda', 'huda@mis.edu']];
  const PAIRS = [['🪪 Student ↔ Student ID card', '1:1', 'student', 'ID cards', 'ID card', 'students'], ['👩‍🏫 Teacher → Classes', '1:M', 'teacher', 'classes', 'class', 'teachers'], ['📚 Students ⇄ Courses', 'M:M', 'student', 'courses', 'course', 'students'], ['🛒 Customer → Orders', '1:M', 'customer', 'orders', 'order', 'customers']];
  window.mountLab = function (root, opts = {}) {
    if (!document.getElementById('rl-css')) { const st = document.createElement('style'); st.id = 'rl-css'; st.textContent = CSS; document.head.appendChild(st); }
    const el = document.createElement('div'); el.className = 'rl'; el.style.setProperty('--rlfs', opts.fs || '18px'); el.style.setProperty('--rlh', opts.height || '640px');
    el.innerHTML = `<div class="rl-next"><span class="tag">NEXT</span><span class="txt"></span><button class="rl-btn p" data-a="show">▶ Show me</button></div>
      <div class="rl-main"><div class="rl-tabs">${TABS.map((t, i) => `<button class="rl-tab" data-t="${i}"><span class="d"></span>${t}</button>`).join('')}</div><div class="rl-body"></div><div class="rl-msg">Start with the first tab: what is wrong with storing everything in ONE table?</div></div>
      <div class="rl-side"><div class="rl-card"><div class="rl-h">Relationship</div><div class="rl-dia"></div></div>
      <div class="rl-card"><div class="rl-h">SQL · output</div><div class="rl-out">Your queries and results appear here.</div></div>
      <div class="rl-card rl-mis"><div class="rl-h">Missions</div><div class="ml"></div></div></div>`;
    root.appendChild(el);
    const $ = (s) => el.querySelector(s), body = $('.rl-body');
    let tab = 0, flags = {}, sticky = new Set(), split = false, spotRow = -1, cls = {}, cards = { 101: null, 102: null, 103: null }, teach = { 1: null, 2: null, 3: null, 4: null }, enr = [], joinStu = 1, newRow = -1;
    const msg = (t, c = '') => { $('.rl-msg').className = 'rl-msg ' + c; $('.rl-msg').innerHTML = t; };
    const out = (h) => { $('.rl-out').innerHTML = h; };
    const nm = (arr, id) => (arr.find((x) => x[0] === id) || [, '?'])[1];
    const dia = (a, b, l, r, j) => { $('.rl-dia').innerHTML = j ? `<span class="ent">${a}</span><span class="lk">1 —— M<small>${l}</small></span><span class="ent j">${j}</span><span class="lk">M —— 1<small>${r}</small></span><span class="ent">${b}</span>` : `<span class="ent">${a}</span><span class="lk">${l} —— ${r}<small>${l === '1' && r === '1' ? 'one ↔ one' : l === '1' ? 'one → many' : 'many ⇄ many'}</small></span><span class="ent">${b}</span>`; };
    function render() {
      el.querySelectorAll('.rl-tab').forEach((b, i) => { b.classList.toggle('on', i === tab); const ok = MISSIONS.filter((m) => m.tab === i).every((m) => sticky.has(m.id)); b.querySelector('.d').classList.toggle('ok', ok); });
      if (tab === 0) {
        dia('Teachers', 'Classes', '1', 'M');
        body.innerHTML = `<p class="rl-p">The school stored <b>everything in one table</b>. The same teacher’s details repeat on every row… <b>tap the row that went wrong</b>.</p>
          <div class="rl-tn">🧾 Classes (one big table)</div><table class="rl-t r"><tr><th>Class</th><th>Teacher</th><th>Teacher Email</th></tr>${BIG.map((r, i) => `<tr class="click ${i === spotRow ? (i === 2 ? 'bad' : 'hit') : ''}" data-r="${i}"><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}${i === 2 && flags.spot ? ' ⚠' : ''}</td></tr>`).join('')}</table>
          <div style="margin:.6em 0"><button class="rl-btn ${split ? '' : 'g'}" data-a="split">${split ? '↺ Undo split' : '✂ Split into two tables'}</button></div>
          ${split ? `<div class="rl-row"><div class="rl-tw"><div class="rl-tn">👩‍🏫 Teachers</div><table class="rl-t"><tr><th>🔑 TeacherID</th><th>Name</th><th>Email</th></tr><tr class="new"><td>1</td><td>Mr. Ahmed</td><td>ahmed@mis.edu</td></tr><tr class="new"><td>2</td><td>Ms. Huda</td><td>huda@mis.edu</td></tr></table></div>
            <div class="rl-tw"><div class="rl-tn">🏫 Classes</div><table class="rl-t c"><tr><th>Class</th><th>🔗 TeacherID</th></tr>${BIG.map((r) => `<tr class="new"><td>${r[0]}</td><td>${r[1] === 'Mr. Ahmed' ? 1 : 2}</td></tr>`).join('')}</table></div></div>` : ''}`;
        body.querySelectorAll('[data-r]').forEach((tr) => tr.onclick = () => { spotRow = +tr.dataset.r; if (spotRow === 2) { flags.spot = true; msg('⚠ Found it! <b>ahmad@mis.edu</b> is a typo. Repeating the same data on many rows wastes space and creates <b>inconsistencies</b>.', 'bad'); } else msg('This row looks fine. Compare the teacher emails: is one of them different?', 'info'); paint(); });
        body.querySelector('[data-a="split"]').onclick = () => { split = !split; if (split) { flags.split = true; msg('✅ Each teacher is now stored <b>once</b> in Teachers. Classes just keeps the <b>TeacherID</b> as a foreign key. Change an email in ONE place!', 'good'); out(`<span class="k">CREATE TABLE</span> Classes (\n  Class <span class="k">VARCHAR</span>(50),\n  TeacherID <span class="k">INT</span>,\n  <span class="k">FOREIGN KEY</span> (TeacherID)\n  <span class="k">REFERENCES</span> Teachers(TeacherID));\n<span class="ok">✓ 1 teacher → many classes</span>`); } paint(); };
      }
      if (tab === 1) {
        $('.rl-dia').innerHTML = '<span style="font:800 .85em Nunito;color:#6b7096">1 : 1 · 1 : M · M : M</span>';
        body.innerHTML = `<p class="rl-p">For each pair, choose the relationship. Think: can one side have <b>many</b>? Can the other side have many too?</p><div class="rl-cls">${PAIRS.map(([p, a], i) => `<div class="pair">${p}</div><div class="ch">${['1:1', '1:M', 'M:M'].map((o) => `<button data-p="${i}" data-o="${o}" class="${cls[i] === o ? (o === a ? 'ok' : 'no') : ''}">${o}</button>`).join('')}</div>`).join('')}</div>`;
        body.querySelectorAll('[data-p]').forEach((b) => b.onclick = () => { const i = +b.dataset.p, o = b.dataset.o, a = PAIRS[i][1]; cls[i] = o; if (o === a) msg(`✅ ${PAIRS[i][0].replace(/^\S+ /, '')}: <b>${a}</b>. ${{ '1:1': 'Each side matches at most ONE on the other side.', '1:M': 'One parent record, many child records.', 'M:M': 'Many on BOTH sides: it needs a junction table.' }[a]}`, 'good'); else { const P = PAIRS[i]; msg(`Not quite. Can ONE ${P[2]} have many ${P[3]}? Can ONE ${P[4]} belong to many ${P[5]}?`, 'bad'); } if (PAIRS.every((p, k) => cls[k] === p[1])) flags.cls = true; paint(); });
      }
      if (tab === 2) {
        dia('Students', 'ID_Cards', '1', '1');
        body.innerHTML = `<p class="rl-p">Give every card to one student. In a <b>1 : 1</b> relationship, a student can own <b>only one</b> card (the foreign key must be <b>UNIQUE</b>).</p><div class="rl-row"><div class="rl-tw"><div class="rl-tn">👤 Students</div><table class="rl-t"><tr><th>🔑 StudentID</th><th>Name</th></tr>${STU.map(([i, n]) => `<tr><td>${i}</td><td>${n}</td></tr>`).join('')}</table></div>
          <div class="rl-tw"><div class="rl-tn">🪪 ID_Cards</div><table class="rl-t c"><tr><th>🔑 CardID</th><th>🔗 StudentID</th></tr>${Object.keys(cards).map((c) => `<tr><td>${c}</td><td><select data-c="${c}"><option value="">—</option>${STU.map(([i, n]) => `<option value="${i}" ${cards[c] === i ? 'selected' : ''}>${i} · ${n}</option>`).join('')}</select></td></tr>`).join('')}</table></div></div>`;
        body.querySelectorAll('[data-c]').forEach((s) => s.onchange = () => { const c = s.dataset.c, v = s.value ? +s.value : null; const other = Object.keys(cards).find((k) => k !== c && cards[k] === v && v != null); if (other) { s.value = cards[c] ?? ''; msg(`❌ ${nm(STU, v)} already has card <b>${other}</b>. In 1 : 1 each student owns <b>only one</b> card.`, 'bad'); flags.uniqueTried = true; return; } cards[c] = v; const all = Object.values(cards).every((x) => x != null); if (all) { flags.oneone = true; msg('✅ Each student has exactly one card, and each card belongs to one student: <b>1 : 1</b>.', 'good'); out(`<span class="k">SELECT</span> Name, CardID <span class="k">FROM</span> Students\n<span class="k">JOIN</span> ID_Cards <span class="k">USING</span> (StudentID);\n` + Object.entries(cards).map(([c, s]) => `<span class="ok">${nm(STU, s)} → card ${c}</span>`).join('\n')); } else msg(`🪪 Card ${c} → ${v ? nm(STU, v) : 'nobody'}`); paint(); });
      }
      if (tab === 3) {
        dia('Teachers', 'Students', '1', 'M');
        body.innerHTML = `<p class="rl-p">Choose each student’s teacher. In <b>1 : M</b>, one teacher can have <b>many</b> students, but each student has <b>one</b> teacher here.</p><div class="rl-row"><div class="rl-tw"><div class="rl-tn">👩‍🏫 Teachers (the 1 side)</div><table class="rl-t"><tr><th>🔑 TeacherID</th><th>Name</th><th>Students</th></tr>${TEA.map(([i, n]) => `<tr><td>${i}</td><td>${n}</td><td>${Object.values(teach).filter((x) => x === i).length}</td></tr>`).join('')}</table></div>
          <div class="rl-tw"><div class="rl-tn">🧑‍🎓 Students (the many side)</div><table class="rl-t c"><tr><th>🔑 StudentID</th><th>Name</th><th>🔗 TeacherID</th></tr>${STU2.map(([i, n]) => `<tr><td>${i}</td><td>${n}</td><td><select data-s="${i}"><option value="">—</option>${TEA.map(([t, tn]) => `<option value="${t}" ${teach[i] === t ? 'selected' : ''}>${t} · ${tn}</option>`).join('')}</select></td></tr>`).join('')}</table></div></div>`;
        body.querySelectorAll('[data-s]').forEach((s) => s.onchange = () => { teach[s.dataset.s] = s.value ? +s.value : null; const counts = TEA.map(([t]) => Object.values(teach).filter((x) => x === t).length); const best = Math.max(...counts); if (best >= 2) { flags.onemany = true; const t = TEA[counts.indexOf(best)]; msg(`✅ <b>${t[1]}</b> teaches ${best} students: <b>one</b> teacher → <b>many</b> students. The foreign key lives on the MANY side (Students).`, 'good'); out(`<span class="k">SELECT</span> Name <span class="k">FROM</span> Students\n<span class="k">WHERE</span> TeacherID = <span class="s">${t[0]}</span>;\n` + STU2.filter(([i]) => teach[i] === t[0]).map(([, n]) => `<span class="ok">${n}</span>`).join('\n')); } else msg('Give the same teacher to two or more students.', 'info'); paint(); });
      }
      if (tab === 4) {
        dia('Students', 'Courses', '', '', 'Enrollments');
        const opt = (arr, v) => arr.map(([i, n]) => `<option value="${i}" ${v === i ? 'selected' : ''}>${i} · ${n}</option>`).join('');
        body.innerHTML = `<p class="rl-p">Many students take many courses. <b>M : M</b> can’t be stored directly, so we add a <b>junction (bridge) table</b>: one row per student-course pair.</p>
          <div class="rl-row"><div class="rl-tw"><div class="rl-tn">👤 Students</div><table class="rl-t"><tr><th>🔑 StudentID</th><th>Name</th></tr>${STU3.map(([i, n]) => `<tr class="${flags.joinShown === i ? 'hit' : ''}"><td>${i}</td><td>${n}</td></tr>`).join('')}</table></div>
          <div class="rl-tw"><div class="rl-tn">📚 Courses</div><table class="rl-t c"><tr><th>🔑 CourseID</th><th>Course</th></tr>${CRS.map(([i, n]) => `<tr><td>${i}</td><td>${n}</td></tr>`).join('')}</table></div></div>
          <div class="rl-tn" style="margin-top:.6em">🔗 Enrollments · junction (bridge) table</div><table class="rl-t j"><tr><th>🔗 StudentID</th><th>🔗 CourseID</th><th></th></tr>${enr.length ? enr.map(([s, c], k) => `<tr class="${k === newRow ? 'new' : ''} ${flags.joinShown === s ? 'hit' : ''}"><td>${s} · ${nm(STU3, s)}</td><td>${c} · ${nm(CRS, c)}</td><td><button class="rl-x" data-del="${k}">×</button></td></tr>`).join('') : '<tr><td colspan="3" style="color:#b4b9d6;font-style:italic">empty: add a pair below</td></tr>'}
            <tr><td><select class="es">${opt(STU3, 1)}</select></td><td><select class="ec">${opt(CRS, 101)}</select></td><td><button class="rl-btn g" data-a="add">＋ Add</button></td></tr></table>
          <div style="margin-top:.6em;display:flex;gap:.5em;align-items:center;font:800 .88em Nunito">🔎 JOIN: courses of <select class="js">${opt(STU3, joinStu)}</select><button class="rl-btn o" data-a="join">Run JOIN</button></div>`;
        newRow = -1;
        body.querySelector('[data-a="add"]').onclick = () => addEnr(+body.querySelector('.es').value, +body.querySelector('.ec').value);
        body.querySelectorAll('[data-del]').forEach((b) => b.onclick = () => { enr.splice(+b.dataset.del, 1); msg('Row removed.'); paint(); });
        body.querySelector('.js').onchange = (e) => { joinStu = +e.target.value; };
        body.querySelector('[data-a="join"]').onclick = () => runJoin(+body.querySelector('.js').value);
      }
    }
    function addEnr(s, c) {
      if (enr.some(([a, b]) => a === s && b === c)) { msg(`❌ ${nm(STU3, s)} is already enrolled in ${nm(CRS, c)}. The pair (StudentID, CourseID) must be unique.`, 'bad'); return false; }
      enr.push([s, c]); newRow = enr.length - 1;
      const perS = {}, perC = {}; enr.forEach(([a, b]) => { perS[a] = (perS[a] || 0) + 1; perC[b] = (perC[b] || 0) + 1; });
      const many = Object.values(perS).some((x) => x >= 2) && Object.values(perC).some((x) => x >= 2);
      if (many) { flags.junction = true; msg('✅ A student is in several courses AND a course has several students: <b>many-to-many</b>, stored through the junction table.', 'good'); }
      else msg(`＋ ${nm(STU3, s)} → ${nm(CRS, c)}. ${Object.values(perS).some((x) => x >= 2) ? 'Now give one course a second student.' : 'Now give a student a second course.'}`);
      paint(); return true;
    }
    function runJoin(s) {
      const cs = enr.filter(([a]) => a === s).map(([, b]) => nm(CRS, b)); flags.joinShown = s;
      out(`<span class="k">SELECT</span> CourseName <span class="k">FROM</span> Enrollments\n<span class="k">JOIN</span> Courses <span class="k">USING</span> (CourseID)\n<span class="k">WHERE</span> StudentID = <span class="s">${s}</span>;\n` + (cs.length ? cs.map((c) => `<span class="ok">${c}</span>`).join('\n') : '→ 0 rows'));
      if (cs.length >= 2) { flags.join = true; msg(`🔎 <b>${nm(STU3, s)}</b> takes <b>${cs.join(' + ')}</b>. The JOIN followed the junction table to the Courses table.`, 'good'); }
      else msg(cs.length ? `${nm(STU3, s)} has only one course so far. Enroll them in a second course and JOIN again.` : `${nm(STU3, s)} has no enrollments yet.`, 'info');
      paint();
    }
    el.querySelectorAll('.rl-tab').forEach((b) => b.onclick = () => { tab = +b.dataset.t; render(); });
    const done = (id) => !!flags[id];
    const tasks = () => MISSIONS.map((m) => { if (done(m.id)) sticky.add(m.id); return [m.t, sticky.has(m.id)]; });
    let nextM = null;
    function paint() {
      render();
      const ts = tasks(); nextM = MISSIONS.find((m, i) => !ts[i][1]);
      $('.ml').innerHTML = MISSIONS.map((m, i) => `<div class="rl-m ${ts[i][1] ? 'on' : m === nextM ? 'cur' : ''}"><span class="ck">${ts[i][1] ? '✓' : i + 1}</span><span>${m.t}</span><button class="sm" data-m="${i}">show</button></div>`).join('');
      $('.rl-next .txt').innerHTML = nextM ? nextM.t : '🎉 All missions complete! Plan a Library database: Books ⇄ Members needs a Borrowings junction table.';
      el.querySelectorAll('.ml [data-m]').forEach((b) => b.onclick = () => playDemo(MISSIONS[+b.dataset.m]));
      el.querySelectorAll('.rl-tab').forEach((b, i) => { const ok = MISSIONS.filter((m) => m.tab === i).every((m) => sticky.has(m.id)); b.querySelector('.d').classList.toggle('ok', ok); });
      opts.onChange && opts.onChange();
    }
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    let busy = false;
    const setSel = async (sel, v) => { const s = body.querySelector(sel); if (!s) return; s.value = String(v); s.dispatchEvent(new Event('change')); await sleep(650); };
    async function playDemo(m) {
      if (busy) return; busy = true;
      try {
        if (tab !== m.tab) { tab = m.tab; render(); await sleep(450); }
        if (m.id === 'spot') { body.querySelector('[data-r="0"]').click(); await sleep(900); body.querySelector('[data-r="2"]').click(); await sleep(600); }
        if (m.id === 'split') { if (!split) body.querySelector('[data-a="split"]').click(); await sleep(500); }
        if (m.id === 'cls') { for (let i = 0; i < PAIRS.length; i++) { const b = body.querySelector(`[data-p="${i}"][data-o="${PAIRS[i][1]}"]`); b && b.click(); await sleep(800); } }
        if (m.id === 'oneone') { const ids = [1, 2, 3]; let k = 0; for (const c of Object.keys(cards)) { if (cards[c] == null) { let v = ids.find((x) => !Object.values(cards).includes(x)); await setSel(`[data-c="${c}"]`, v); } k++; } }
        if (m.id === 'onemany') { for (const [s, t] of [[1, 1], [2, 1], [3, 2], [4, 1]]) if (teach[s] == null) await setSel(`[data-s="${s}"]`, t); }
        if (m.id === 'junction') { for (const [s, c] of [[1, 101], [1, 102], [2, 101], [3, 103]]) { if (!enr.some(([a, b]) => a === s && b === c)) { body.querySelector('.es').value = s; body.querySelector('.ec').value = c; await sleep(350); addEnr(s, c); await sleep(550); } } }
        if (m.id === 'join') { if (!flags.junction) { busy = false; await playDemo(MISSIONS[5]); busy = true; } body.querySelector('.js').value = '1'; await sleep(400); runJoin(1); await sleep(400); }
      } finally { busy = false; }
    }
    $('[data-a="show"]').onclick = () => nextM && playDemo(nextM);
    paint();
    return {
      el, tasks,
      demoStep() { if (busy || !nextM) return false; playDemo(nextM); return true; },
      async demo() { for (const m of MISSIONS) if (!sticky.has(m.id)) { await playDemo(m); await sleep(800); } },
      reset() { flags = {}; sticky.clear(); split = false; spotRow = -1; cls = {}; cards = { 101: null, 102: null, 103: null }; teach = { 1: null, 2: null, 3: null, 4: null }; enr = []; tab = 0; out('Your queries and results appear here.'); msg('Fresh start: what is wrong with storing everything in ONE table?'); paint(); },
    };
  };
})();

