"use strict";

(() => {
  const D = window.ESP3_DATA;
  const app = document.getElementById("app");
  const STORE = "esp3-mastery-state-v1";
  const allTerms = D.units.flatMap(unit => unit.terms.map((term, index) => ({ unit, index, term: term[0], definition: term[1], vi: term[2], key: `${unit.id}:${index}` })));
  const allGaps = D.units.flatMap(unit => unit.gaps.map((item, index) => ({ unit, index, ...item, key: `${unit.id}:${index}` })));
  const allShort = D.units.flatMap(unit => unit.shortAnswers.map((item, index) => ({ unit, index, ...item, key: `${unit.id}:${index}` })));
  const allEssays = D.units.flatMap(unit => unit.essays.map((item, index) => ({ unit, index, ...item, key: `${unit.id}:${index}` })));
  const MASCOTS = window.ESP3_MASCOTS;
  const mascotCycle = [MASCOTS.flower, MASCOTS.neutral, MASCOTS.heart, MASCOTS.mustache, MASCOTS.sideeye];

  const defaults = {
    completedUnits: [],
    termStatus: {},
    flashUnit: "all",
    flashOrder: [],
    flashIndex: 0,
    flashFlipped: false,
    gapUnit: "all",
    gapIndex: 0,
    gapAnswer: "",
    gapChecked: false,
    gapCorrect: false,
    gapAttempted: 0,
    gapCorrectTotal: 0,
    practiceUnit: "all",
    practiceIndex: 0,
    exam: null,
    examHistory: []
  };

  let state = loadState();
  let timerHandle = null;

  function loadState() {
    try { return { ...defaults, ...JSON.parse(localStorage.getItem(STORE) || "{}") }; }
    catch { return { ...defaults }; }
  }
  function saveState() {
    localStorage.setItem(STORE, JSON.stringify(state));
    updateHeaderProgress();
  }
  function esc(value = "") {
    return String(value).replace(/[&<>"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char]));
  }
  function normalize(value = "") {
    return String(value).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
  }
  function wordCount(value = "") {
    return value.trim() ? value.trim().split(/\s+/).length : 0;
  }
  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
  function unitById(id) { return D.units.find(unit => unit.id === id) || D.units[0]; }
  function routeTo(route) { location.hash = route.startsWith("#") ? route : `#${route}`; }
  function currentRoute() { return location.hash.replace(/^#/, "") || "dashboard"; }
  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.handle);
    showToast.handle = setTimeout(() => toast.classList.remove("show"), 1800);
  }
  function mascotFor(title = "") {
    const value = normalize(title);
    if (/essay/.test(value)) return MASCOTS.mustache;
    if (/test|exam|midterm/.test(value)) return MASCOTS.sideeye;
    if (/result|progress|tien do/.test(value)) return MASCOTS.heart;
    if (/gap|flash|term/.test(value)) return MASCOTS.neutral;
    return MASCOTS.flower;
  }
  function mascotFloatLayer() {
    return `<div class="mascot-float-layer" aria-hidden="true">
      <img class="floating-fly fly-left-top" src="${MASCOTS.flower}" alt="">
      <img class="floating-fly fly-right-mid" src="${MASCOTS.heart}" alt="">
      <img class="floating-fly fly-left-bottom" src="${MASCOTS.sideeye}" alt="">
    </div>`;
  }
  function page({ eyebrow, title, lead = "", actions = "", body, className = "" }) {
    return `${mascotFloatLayer()}<section class="page ${className}">
      <header class="page-head">
        <div><span class="eyebrow">${esc(eyebrow)}</span><h1>${esc(title)}</h1>${lead ? `<p>${esc(lead)}</p>` : ""}</div>
        <div class="page-head-side"><img class="page-mascot" src="${mascotFor(title)}" alt="" aria-hidden="true">${actions ? `<div class="page-actions">${actions}</div>` : ""}</div>
      </header>
      ${body}
    </section>`;
  }
  function unitOptions(selected = "all", includeAll = true, midtermOnly = false) {
    const units = midtermOnly ? D.units.filter(unit => unit.midterm) : D.units;
    return `${includeAll ? `<option value="all" ${selected === "all" ? "selected" : ""}>Tất cả unit</option>` : ""}${units.map(unit => `<option value="${unit.id}" ${selected === unit.id ? "selected" : ""}>Unit ${unit.num} · ${esc(unit.title)}</option>`).join("")}`;
  }
  function progressPercent() {
    const unitPart = state.completedUnits.length / D.units.length;
    const mastered = Object.values(state.termStatus).filter(value => value === "mastered").length;
    const termPart = mastered / allTerms.length;
    return Math.round((unitPart * 0.65 + termPart * 0.35) * 100);
  }
  function updateHeaderProgress() {
    document.getElementById("headerProgress").textContent = `${progressPercent()}%`;
  }

  function dashboard() {
    const mastered = Object.values(state.termStatus).filter(value => value === "mastered").length;
    const lastResult = state.examHistory[0];
    const body = `
      <section class="dashboard-intro">
        <div class="dashboard-copy">
          <span class="kicker">FULL COURSE · 10 UNITS</span>
          <h2>Learn it clearly.<br><em>Answer it confidently.</em></h2>
          <p>Theory is taught in English, with Vietnamese translations beside key terms and specialist vocabulary. Model answers are ready for the exact exam format.</p>
          <img class="dashboard-mascot" src="${MASCOTS.flower}" alt="Cute fly holding a flower">
        </div>
        <div class="course-map" aria-label="Bản đồ khóa học">
          ${D.units.map(unit => `<button data-route="unit/${unit.id}/theory" class="map-node ${unit.midterm ? "core" : ""} ${state.completedUnits.includes(unit.id) ? "done" : ""}"><b>${String(unit.num).padStart(2,"0")}</b><span>${esc(unit.title)}</span>${unit.midterm ? "<small>MIDTERM</small>" : ""}</button>`).join("")}
        </div>
      </section>

      <div class="stat-row">
        <div><strong>${allTerms.length}</strong><span>key-term flashcards</span></div>
        <div><strong>${allGaps.length}</strong><span>gap-filling questions</span></div>
        <div><strong>${allShort.length}</strong><span>short answers ≤40 từ</span></div>
        <div><strong>${allEssays.length}</strong><span>essay topics + outlines</span></div>
      </div>

      <section class="three-spaces">
        <article class="space-card yellow">
          <span class="space-number">01</span><img class="space-mascot" src="${MASCOTS.flower}" alt="" aria-hidden="true"><div><small>STUDY LIBRARY</small><h3>Học từng unit</h3><p>Theory in English, Vietnamese support for specialist terms, short answers and essay outlines in one flow.</p></div>
          <button data-route="learn">Mở thư viện bài học <span>→</span></button>
        </article>
        <article class="space-card blue">
          <span class="space-number">02</span><img class="space-mascot" src="${MASCOTS.heart}" alt="" aria-hidden="true"><div><small>ACTIVE RECALL</small><h3>Flashcards & gap filling</h3><p>Lật thẻ để nhớ định nghĩa, sau đó nhập key term vào câu khuyết và kiểm tra ngay.</p></div>
          <button data-route="gaps">Luyện gap filling <span>→</span></button>
        </article>
        <article class="space-card dark">
          <span class="space-number">03</span><img class="space-mascot" src="${MASCOTS.sideeye}" alt="" aria-hidden="true"><div><small>EXAM SIMULATION</small><h3>Midterm 60 phút</h3><p>10 gap-filling key terms, 3 short answers và chọn 1 trong 2 essay — đúng cấu trúc 3 + 3 + 4 điểm.</p></div>
          <button data-route="mock-test">Vào phòng thi <span>→</span></button>
        </article>
      </section>

      <section class="resume-panel">
        <div><span class="eyebrow">TIẾN ĐỘ THỰC</span><h2>${state.completedUnits.length}/10 unit đã hoàn thành</h2><p>${mastered}/${allTerms.length} thuật ngữ được đánh dấu “Đã nhớ”.${lastResult ? ` Bài thi gần nhất: ${lastResult.termCorrect}/10 thuật ngữ đúng.` : ""}</p></div>
        <button class="outline-btn" data-route="progress">Xem tiến độ</button>
      </section>`;
    return page({ eyebrow: "ESP3 · INTERNATIONAL BUSINESS", title: "Course dashboard", lead: "Toàn bộ giáo trình, với Unit 1, 2, 3, 4 và 9 được đánh dấu là phạm vi midterm hiện tại.", body, className: "dashboard-page" });
  }

  function learnHome() {
    const body = `<div class="unit-grid">${D.units.map(unit => {
      const done = state.completedUnits.includes(unit.id);
      return `<article class="unit-card ${done ? "complete" : ""}">
        <div class="unit-card-top"><span>UNIT ${String(unit.num).padStart(2,"0")}</span>${unit.midterm ? "<b>MIDTERM CORE</b>" : "<b>FULL COURSE</b>"}</div><img class="unit-card-mascot" src="${mascotCycle[(unit.num - 1) % mascotCycle.length]}" alt="" aria-hidden="true">
        <h2>${esc(unit.title)}</h2><p>${esc(unit.summary)}</p>
        <div class="unit-counts"><span>${unit.theories.length} theory sections</span><span>${unit.terms.length} key terms</span><span>${unit.gaps.length} gap fillings</span><span>${unit.shortAnswers.length} short answers</span><span>${unit.essays.length} essays</span></div>
        <button data-route="unit/${unit.id}/theory">${done ? "Ôn lại unit" : "Bắt đầu unit"} <span>→</span></button>
      </article>`;
    }).join("")}</div>`;
    return page({ eyebrow: "STUDY LIBRARY", title: "Toàn bộ 10 unit", lead: "Mỗi unit đi theo thứ tự: theory in English → key terms → gap filling → short answers → essay preparation.", body });
  }

  function unitPage(unitId, tab = "theory") {
    const unit = unitById(unitId);
    const tabs = [
      ["theory","Theory in English"],["terms","Thuật ngữ"],["gaps","Gap filling"],["short","Short answers"],["essay","Essay & dàn ý"]
    ];
    let content = "";
    if (tab === "theory") content = theoryTab(unit);
    if (tab === "terms") content = termsTab(unit);
    if (tab === "gaps") content = gapTab(unit);
    if (tab === "short") content = shortTab(unit);
    if (tab === "essay") content = essayTab(unit);
    const body = `<div class="unit-layout">
      <aside class="unit-sidebar">
        <img class="sidebar-mascot" src="${mascotCycle[(unit.num - 1) % mascotCycle.length]}" alt="" aria-hidden="true">
        <label>Chuyển unit<select id="unitSwitcher">${unitOptions(unit.id, false)}</select></label>
        <div class="unit-mini-progress"><span>${state.completedUnits.includes(unit.id) ? "Đã hoàn thành" : "Đang học"}</span><i class="${state.completedUnits.includes(unit.id) ? "done" : ""}"></i></div>
        <p>${esc(unit.summary)}</p>
        <button class="complete-btn ${state.completedUnits.includes(unit.id) ? "done" : ""}" data-complete-unit="${unit.id}">${state.completedUnits.includes(unit.id) ? "✓ Đã hoàn thành unit" : "Đánh dấu hoàn thành"}</button>
      </aside>
      <div class="unit-main">
        <div class="tabs" role="tablist">${tabs.map(([key,label]) => `<button role="tab" aria-selected="${tab === key}" class="${tab === key ? "active" : ""}" data-route="unit/${unit.id}/${key}">${label}</button>`).join("")}</div>
        ${content}
      </div>
    </div>`;
    return page({ eyebrow: `UNIT ${String(unit.num).padStart(2,"0")}${unit.midterm ? " · MIDTERM CORE" : " · FULL COURSE"}`, title: unit.title, lead: unit.summary, body });
  }

  function theoryTab(unit) {
    return `<div class="section-intro theory-intro"><span>01</span><div><h2>Theory taught in English</h2><p>Key terms and specialist vocabulary include Vietnamese translations in parentheses.</p></div><img class="section-mascot" src="${MASCOTS.flower}" alt="" aria-hidden="true"></div>
      <section class="lesson-roadmap"><div><span>THIS LESSON COVERS</span><h3>Unit ${unit.num} learning map</h3></div><ol>${unit.theories.map((item,index) => `<li><b>${String(index + 1).padStart(2,"0")}</b>${esc(item.title)}</li>`).join("")}</ol><img src="${MASCOTS.sideeye}" alt="" aria-hidden="true"></section>
      <div class="theory-stack">${unit.theories.map((item,index) => `<article class="theory-card">
        <div class="theory-index">${String(index + 1).padStart(2,"0")}</div>
        <div lang="en"><h3>${esc(item.title)}</h3><p>${esc(item.body)}</p><ul>${item.points.map(point => `<li>${esc(point)}</li>`).join("")}</ul></div>
      </article>`).join("")}</div>
      <div class="next-step"><img src="${MASCOTS.heart}" alt="" aria-hidden="true"><span>NEXT STEP</span><strong>Check whether you can recognize and define the key terms from this lesson.</strong><button data-route="unit/${unit.id}/terms">Open key terms →</button></div>`;
  }

  function termsTab(unit) {
    return `<div class="section-intro"><span>02</span><div><h2>Thuật ngữ và định nghĩa bằng tiếng Anh</h2><p>Nhấn “Học bằng flashcard” để chuyển sang chế độ active recall của riêng Unit ${unit.num}.</p></div><button class="solid-btn" data-flash-unit="${unit.id}">Học bằng flashcard</button></div>
      <label class="inline-search"><span>⌕</span><input id="termFilter" type="search" placeholder="Tìm trong Unit ${unit.num}…"></label>
      <div class="term-table" id="termTable">${unit.terms.map((term,index) => `<article data-term-search="${esc(normalize(term.join(" ")))}"><span class="term-no">${String(index + 1).padStart(2,"0")}</span><div><h3>${esc(term[0])}</h3><p>${esc(term[1])}</p><small>${esc(term[2])}</small></div><span class="status-dot ${state.termStatus[`${unit.id}:${index}`] === "mastered" ? "mastered" : ""}" title="${state.termStatus[`${unit.id}:${index}`] === "mastered" ? "Đã nhớ" : "Chưa đánh dấu"}"></span></article>`).join("")}</div>`;
  }

  function gapTab(unit) {
    return `<div class="section-intro gap-intro"><span>03</span><div><h2>Gap filling — điền đúng key term</h2><p>Đọc toàn bộ định nghĩa, nhập thuật ngữ tiếng Anh rồi kiểm tra. Viết hoa và dấu gạch nối không ảnh hưởng kết quả.</p></div><button class="solid-btn" data-gap-unit="${unit.id}">Luyện từng câu</button></div>
      <div class="gap-list">${unit.gaps.map((item,index) => `<article class="gap-card" data-unit-gap-card="${index}">
        <div class="question-label"><span>GAP ${String(index + 1).padStart(2,"0")}</span><b>UNIT ${unit.num}</b></div>
        <h3>${esc(item.prompt)}</h3>
        <div class="gap-entry"><input type="text" data-unit-gap-input="${index}" placeholder="Type the missing term…" autocomplete="off"><button class="solid-btn" data-unit-gap-check="${index}" data-gap-unit-id="${unit.id}">Check</button></div>
        <div class="gap-feedback" data-unit-gap-feedback="${index}" hidden aria-live="polite"></div>
      </article>`).join("")}</div>`;
  }

  function shortTab(unit) {
    return `<div class="section-intro"><span>04</span><div><h2>Câu hỏi ngắn — tối đa 40 từ</h2><p>Hãy tự viết trước. Website đếm từ và chỉ hiển thị model answer khi bạn chủ động mở.</p></div></div>
      <div class="short-list">${unit.shortAnswers.map((item,index) => `<article class="short-card" data-short-card>
        <div class="question-label"><span>QUESTION ${index + 1}</span><b>≤ 40 WORDS</b></div>
        <h3>${esc(item.q)}</h3>
        <textarea rows="4" data-word-limit="40" placeholder="Write your answer in English…"></textarea>
        <div class="answer-controls"><span data-word-count>0 / 40 words</span><button class="outline-btn" data-reveal-answer>Reveal model answer</button></div>
        <div class="model-answer" hidden><img class="feedback-mascot" src="${MASCOTS.heart}" alt="" aria-hidden="true"><small>MODEL ANSWER · ${wordCount(item.a)} WORDS</small><p>${esc(item.a)}</p></div>
      </article>`).join("")}</div>`;
  }

  function essayTab(unit) {
    return `<div class="section-intro"><span>05</span><div><h2>Đề essay và dàn ý</h2><p>Mỗi dàn ý gồm thesis rõ lập trường và bốn bước phát triển lập luận. Yêu cầu mục tiêu: ít nhất 300 từ.</p></div></div>
      <div class="essay-list">${unit.essays.map((essay,index) => `<article class="essay-card">
        <div class="question-label"><span>ESSAY ${index + 1}</span><b>≥ 300 WORDS</b></div><h3>${esc(essay.prompt)}</h3>
        <button class="outline-btn" data-reveal-outline>Reveal thesis & outline</button>
        <div class="essay-outline" hidden><img class="feedback-mascot" src="${MASCOTS.mustache}" alt="" aria-hidden="true"><div class="thesis"><small>SUGGESTED THESIS</small><p>${esc(essay.thesis)}</p></div><ol>${essay.outline.map(step => `<li>${esc(step)}</li>`).join("")}</ol></div>
      </article>`).join("")}</div>`;
  }

  function flashcards() {
    let pool = state.flashUnit === "all" ? allTerms : allTerms.filter(item => item.unit.id === state.flashUnit);
    const validKeys = new Set(pool.map(item => item.key));
    let order = state.flashOrder.filter(key => validKeys.has(key));
    if (order.length !== pool.length) order = pool.map(item => item.key);
    state.flashOrder = order;
    state.flashIndex = Math.min(state.flashIndex, Math.max(0, order.length - 1));
    const item = allTerms.find(term => term.key === order[state.flashIndex]) || pool[0];
    if (!item) return page({eyebrow:"FLASHCARDS",title:"Không có thẻ",body:""});
    const status = state.termStatus[item.key] || "new";
    const mastered = pool.filter(term => state.termStatus[term.key] === "mastered").length;
    const body = `<div class="flash-toolbar">
        <label>Phạm vi<select id="flashUnit">${unitOptions(state.flashUnit)}</select></label>
        <div class="flash-count"><strong>${state.flashIndex + 1}</strong><span>/ ${pool.length}</span></div>
        <button class="outline-btn" id="shuffleFlash">Trộn thẻ</button>
      </div>
      <div class="flash-workspace">
        <div class="flash-progress"><span>${mastered}/${pool.length} đã nhớ</span><i><b style="width:${pool.length ? mastered / pool.length * 100 : 0}%"></b></i></div>
        <button class="flash-card ${state.flashFlipped ? "flipped" : ""}" id="flashCard" aria-label="Lật flashcard">
          <span class="flash-unit">UNIT ${item.unit.num} · ${esc(item.unit.title)}</span>
          <img class="flash-mascot" src="${state.flashFlipped ? MASCOTS.heart : MASCOTS.neutral}" alt="" aria-hidden="true">
          <span class="flash-side front"><small>KEY TERM</small><strong>${esc(item.term)}</strong><em>Nhấn để xem định nghĩa</em></span>
          <span class="flash-side back"><small>ENGLISH DEFINITION</small><strong>${esc(item.definition)}</strong><p>${esc(item.vi)}</p><em>Nhấn để xem thuật ngữ</em></span>
        </button>
        <div class="flash-actions">
          <button class="review-btn ${status === "review" ? "selected" : ""}" data-flash-status="review">↻ Cần ôn lại</button>
          <button class="prev-btn" id="prevFlash">←</button>
          <button class="next-btn" id="nextFlash">→</button>
          <button class="master-btn ${status === "mastered" ? "selected" : ""}" data-flash-status="mastered">✓ Đã nhớ</button>
        </div>
      </div>`;
    return page({eyebrow:"ACTIVE RECALL",title:"Key-term flashcards",lead:`${allTerms.length} thuật ngữ từ toàn bộ 10 unit.`,body});
  }

  function gapFilling() {
    const pool = state.gapUnit === "all" ? allGaps : allGaps.filter(item => item.unit.id === state.gapUnit);
    state.gapIndex = Math.min(state.gapIndex, Math.max(0, pool.length - 1));
    const item = pool[state.gapIndex] || pool[0];
    const distractors = shuffle([...new Set(item.unit.gaps.map(entry => entry.answer).filter(answer => normalize(answer) !== normalize(item.answer)))]);
    const wordBank = shuffle([item.answer, ...distractors.slice(0,5)]);
    const accuracy = state.gapAttempted ? Math.round(state.gapCorrectTotal / state.gapAttempted * 100) : 0;
    const feedback = state.gapChecked ? `<div class="gap-result ${state.gapCorrect ? "correct" : "wrong"}">
      <img class="feedback-mascot" src="${state.gapCorrect ? MASCOTS.heart : MASCOTS.angry}" alt="" aria-hidden="true">
      <small>${state.gapCorrect ? "CORRECT" : "CHECK THE KEY TERM"}</small>
      <strong>${esc(item.answer)}</strong>${item.accept?.length ? `<p>Also accepted: ${esc(item.accept.join(" · "))}</p>` : ""}
    </div>` : "";
    const body = `<div class="gap-toolbar practice-toolbar">
      <label>Phạm vi<select id="gapUnit">${unitOptions(state.gapUnit)}</select></label>
      <div class="gap-score"><strong>${state.gapCorrectTotal}/${state.gapAttempted}</strong><span>${state.gapAttempted ? `${accuracy}% correct` : "Chưa trả lời"}</span></div>
      <button class="outline-btn" id="randomGap">Câu ngẫu nhiên</button>
    </div>
    <article class="gap-stage">
      <div class="question-label"><span>UNIT ${item.unit.num} · GAP FILLING</span><b>${state.gapIndex + 1} / ${pool.length}</b></div>
      <h2>${esc(item.prompt)}</h2>
      <div class="gap-word-bank"><small>WORD BANK</small><div>${wordBank.map(answer => `<button type="button" data-gap-word="${esc(answer)}" ${state.gapChecked ? "disabled" : ""}>${esc(answer)}</button>`).join("")}</div></div>
      <div class="gap-entry large"><input id="gapAnswer" type="text" value="${esc(state.gapAnswer)}" placeholder="Type the missing key term…" autocomplete="off" ${state.gapChecked ? "disabled" : ""}><button class="solid-btn" ${state.gapChecked ? "data-next-gap" : "data-check-gap"}>${state.gapChecked ? "Next question →" : "Check answer"}</button></div>
      ${feedback}
      <div class="stage-nav"><button class="outline-btn" id="prevGap">← Previous</button><button class="outline-btn" id="nextGap">Skip / Next →</button></div>
    </article>`;
    return page({eyebrow:"GAP-FILLING TRAINER",title:"Nhìn định nghĩa, gọi đúng thuật ngữ",lead:`${allGaps.length} câu từ toàn bộ 10 unit; Unit 2, 3, 4 và 9 bám sát các tài liệu ôn tập bạn gửi.`,body});
  }

  function currentGapPool() {
    return state.gapUnit === "all" ? allGaps : allGaps.filter(item => item.unit.id === state.gapUnit);
  }
  function moveGap(nextIndex) {
    const pool = currentGapPool();
    state.gapIndex = (nextIndex + pool.length) % pool.length;
    state.gapAnswer = "";
    state.gapChecked = false;
    state.gapCorrect = false;
    saveState();
    render();
  }

  function practice() {
    const pool = state.practiceUnit === "all" ? allShort : allShort.filter(item => item.unit.id === state.practiceUnit);
    state.practiceIndex = Math.min(state.practiceIndex, Math.max(0, pool.length - 1));
    const item = pool[state.practiceIndex] || pool[0];
    const body = `<div class="practice-toolbar">
      <label>Phạm vi<select id="practiceUnit">${unitOptions(state.practiceUnit)}</select></label>
      <span>${state.practiceIndex + 1} / ${pool.length}</span>
      <button class="outline-btn" id="randomShort">Câu ngẫu nhiên</button>
    </div>
    <article class="practice-stage" data-short-card>
      <div class="question-label"><span>UNIT ${item.unit.num} · SHORT ANSWER</span><b>MAXIMUM 40 WORDS</b></div>
      <h2>${esc(item.q)}</h2>
      <textarea rows="7" data-word-limit="40" placeholder="Write a complete answer in English. Define, explain, and answer the exact question."></textarea>
      <div class="answer-controls"><span data-word-count>0 / 40 words</span><button class="solid-btn" data-reveal-answer>Check with model answer</button></div>
      <div class="model-answer large" hidden><img class="feedback-mascot" src="${MASCOTS.heart}" alt="" aria-hidden="true"><small>MODEL ANSWER · ${wordCount(item.a)} WORDS</small><p>${esc(item.a)}</p><ul><li>Answers the exact question</li><li>Uses the correct technical term</li><li>Explains the mechanism or difference</li><li>Stays within 40 words</li></ul></div>
      <div class="stage-nav"><button class="outline-btn" id="prevShort">← Previous</button><button class="outline-btn" id="nextShort">Next →</button></div>
    </article>`;
    return page({eyebrow:"SHORT-ANSWER TRAINER",title:"Viết ngắn nhưng đủ ý",lead:"Mỗi đáp án mẫu đều đã được kiểm tra và không vượt quá 40 từ.",body});
  }

  function essayLibrary() {
    const body = `<div class="essay-library-head"><p>20 đề theo đúng nội dung từng unit. Mở dàn ý sau khi bạn đã tự xác định position và thesis.</p><label>Lọc unit<select id="essayUnit"><option value="all">Tất cả unit</option>${unitOptions("", false)}</select></label></div>
      <div class="essay-library" id="essayLibrary">${allEssays.map((essay,index) => `<article class="essay-card" data-essay-unit="${essay.unit.id}">
        <div class="question-label"><span>UNIT ${essay.unit.num} · TOPIC ${(essay.index + 1)}</span><b>≥ 300 WORDS</b></div><h3>${esc(essay.prompt)}</h3>
        <button class="outline-btn" data-reveal-outline>Reveal thesis & outline</button>
        <div class="essay-outline" hidden><img class="feedback-mascot" src="${MASCOTS.mustache}" alt="" aria-hidden="true"><div class="thesis"><small>SUGGESTED THESIS</small><p>${esc(essay.thesis)}</p></div><ol>${essay.outline.map(step => `<li>${esc(step)}</li>`).join("")}</ol></div>
      </article>`).join("")}</div>`;
    return page({eyebrow:"ESSAY BANK",title:"Đề essay và dàn ý toàn khóa",lead:"Dùng dàn ý để kiểm tra logic, không học thuộc nguyên bài mẫu.",body});
  }

  function mockHome() {
    const last = state.examHistory[0];
    const body = `<div class="exam-setup">
      <section class="exam-brief">
        <img class="exam-mascot" src="${MASCOTS.sideeye}" alt="" aria-hidden="true"><span>SIMULATED MIDTERM</span><strong>60</strong><h2>minutes</h2>
        <div class="score-map"><div><b>3</b><span>Gap filling<br>10 terms</span></div><div><b>3</b><span>Short answers<br>3 questions</span></div><div><b>4</b><span>Essay<br>Choose 1 of 2</span></div></div>
      </section>
      <section class="exam-options">
        <h2>Chọn phạm vi đề</h2>
        <label class="scope-option selected"><input type="radio" name="examScope" value="midterm" checked><span><b>Midterm hiện tại</b><small>Unit 1, 2, 3, 4 và 9</small></span></label>
        <label class="scope-option"><input type="radio" name="examScope" value="all"><span><b>Full-book test</b><small>Trộn câu hỏi từ toàn bộ 10 unit</small></span></label>
        <ul class="exam-rules"><li>Không hiển thị đáp án trong thời gian làm bài.</li><li>Short answers phải không quá 40 từ.</li><li>Essay phải đạt ít nhất 300 từ.</li><li>Terminology được chấm tự động; phần viết đối chiếu sau khi nộp.</li></ul>
        <button class="start-exam" id="startExam">Bắt đầu bài thi →</button>
        ${last ? `<p class="last-result">Lần gần nhất: ${last.termCorrect}/10 terminology đúng · ${new Date(last.at).toLocaleDateString("vi-VN")}</p>` : ""}
      </section>
    </div>`;
    return page({eyebrow:"MIDTERM TEST",title:"Mô phỏng đúng cấu trúc đề",lead:"Đề được tạo lại mỗi lần bắt đầu và giữ tiến độ nếu bạn tải lại trang.",body});
  }

  function createExam(scope) {
    const units = scope === "midterm" ? D.units.filter(unit => unit.midterm) : D.units;
    const terms = shuffle(units.flatMap(unit => unit.gaps.map((item,index) => ({unitId:unit.id,unitNum:unit.num,index,term:item.answer,definition:item.prompt,accept:item.accept || []})))).slice(0,10);
    const shorts = shuffle(units.flatMap(unit => unit.shortAnswers.map((item,index) => ({unitId:unit.id,unitNum:unit.num,index,...item})))).slice(0,3);
    const essays = shuffle(units.flatMap(unit => unit.essays.map((item,index) => ({unitId:unit.id,unitNum:unit.num,index,...item})))).slice(0,2);
    state.exam = { active:true, scope, startedAt:Date.now(), duration:60*60, terms, shorts, essays, termAnswers:Array(10).fill(""), shortAnswers:Array(3).fill(""), essayChoice:0, essayAnswer:"" };
    saveState();
    render();
  }
  function examSecondsLeft() {
    if (!state.exam?.active) return 0;
    return Math.max(0, state.exam.duration - Math.floor((Date.now() - state.exam.startedAt) / 1000));
  }
  function formatTime(seconds) {
    const min = Math.floor(seconds / 60), sec = seconds % 60;
    return `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
  }
  function startExamTimer() {
    clearInterval(timerHandle);
    if (!state.exam?.active) return;
    timerHandle = setInterval(() => {
      const left = examSecondsLeft();
      const node = document.getElementById("examTimer");
      if (node) node.textContent = formatTime(left);
      if (left <= 0) submitExam(true);
    },1000);
  }
  function examPage() {
    const exam = state.exam;
    const scopeLabel = exam.scope === "midterm" ? "UNIT 1 · 2 · 3 · 4 · 9" : "ALL 10 UNITS";
    const body = `<div class="exam-live-bar"><div><span>TIME LEFT</span><strong id="examTimer">${formatTime(examSecondsLeft())}</strong></div><div><span>SCOPE</span><strong>${scopeLabel}</strong></div><button class="submit-exam" id="submitExam">Submit test</button></div>
      <form class="exam-paper" id="examPaper">
        <section class="paper-section"><header><div><span>PART 1</span><h2>Terminology gap filling</h2></div><strong>3 points</strong></header><p>Complete each sentence with the correct English key term.</p>
          <div class="term-questions">${exam.terms.map((item,index) => `<label><span>${index + 1}</span><div><p>${esc(item.definition)}</p><input type="text" data-exam-term="${index}" value="${esc(exam.termAnswers[index])}" autocomplete="off" placeholder="Correct term…"></div></label>`).join("")}</div>
        </section>
        <section class="paper-section"><header><div><span>PART 2</span><h2>Open-ended theory</h2></div><strong>3 points</strong></header><p>Answer each question in no more than 40 words.</p>
          <div class="exam-short">${exam.shorts.map((item,index) => `<label><b>${index + 1}. ${esc(item.q)}</b><textarea rows="5" data-exam-short="${index}" placeholder="Maximum 40 words…">${esc(exam.shortAnswers[index])}</textarea><span data-exam-short-count="${index}" class="${wordCount(exam.shortAnswers[index]) > 40 ? "over" : ""}">${wordCount(exam.shortAnswers[index])} / 40 words</span></label>`).join("")}</div>
        </section>
        <section class="paper-section"><header><div><span>PART 3</span><h2>Essay</h2></div><strong>4 points</strong></header><p>Choose ONE topic and write at least 300 words.</p>
          <div class="essay-choices">${exam.essays.map((item,index) => `<label class="${exam.essayChoice === index ? "selected" : ""}"><input type="radio" name="essayChoice" data-exam-essay-choice="${index}" ${exam.essayChoice === index ? "checked" : ""}><span><b>Topic ${index + 1}</b>${esc(item.prompt)}</span></label>`).join("")}</div>
          <textarea class="exam-essay-box" rows="18" id="examEssay" placeholder="Write your essay here…">${esc(exam.essayAnswer)}</textarea><div class="essay-counter ${wordCount(exam.essayAnswer) < 300 ? "under" : ""}" id="examEssayCount">${wordCount(exam.essayAnswer)} / 300 words minimum</div>
        </section>
      </form>`;
    return page({eyebrow:"EXAM IN PROGRESS",title:"ESP3 Midterm Simulation",lead:"Answers and outlines remain hidden until you submit.",body,className:"exam-page"});
  }

  function acceptedTerm(answer, target) {
    const a = normalize(answer), t = normalize(target);
    if (!a) return false;
    const withoutParen = normalize(target.replace(/\([^)]*\)/g,""));
    const acronym = (target.match(/\(([^)]+)\)/) || [])[1];
    const compact = value => normalize(value).replace(/\s+/g, "");
    return a === t || a === withoutParen || (acronym && (a === normalize(acronym) || compact(a) === compact(acronym)));
  }
  function acceptedGap(answer, item) {
    return [item.answer, ...(item.accept || [])].some(target => acceptedTerm(answer, target));
  }
  function submitExam(auto = false) {
    if (!state.exam?.active) return;
    clearInterval(timerHandle);
    const exam = state.exam;
    const correctness = exam.terms.map((item,index) => acceptedGap(exam.termAnswers[index], {answer:item.term,accept:item.accept || []}));
    const termCorrect = correctness.filter(Boolean).length;
    exam.active = false;
    exam.submittedAt = Date.now();
    exam.autoSubmitted = auto;
    exam.correctness = correctness;
    exam.termCorrect = termCorrect;
    state.examHistory.unshift({at:Date.now(),scope:exam.scope,termCorrect});
    state.examHistory = state.examHistory.slice(0,10);
    saveState();
    render();
  }
  function examResult() {
    const exam = state.exam;
    const termPoints = (exam.termCorrect / 10 * 3).toFixed(1);
    const resultMascot = exam.termCorrect >= 7 ? MASCOTS.heart : MASCOTS.angry;
    const body = `<section class="result-hero"><img class="result-mascot" src="${resultMascot}" alt="" aria-hidden="true"><div><span>${exam.autoSubmitted ? "TIME EXPIRED · AUTO-SUBMITTED" : "TEST SUBMITTED"}</span><strong>${exam.termCorrect}/10</strong><p>Terminology correct · provisional ${termPoints}/3 points</p></div><button class="start-exam" id="newExam">New test →</button></section>
      <section class="result-note"><strong>Điểm hoàn chỉnh cần giáo viên hoặc bạn tự đối chiếu phần viết.</strong><p>Website chấm tự động Part 1. Với Part 2 và Part 3, hãy so sánh độ chính xác nội dung, giới hạn từ, logic và ngôn ngữ với model answer/dàn ý dưới đây.</p></section>
      <section class="review-section"><header><span>PART 1 REVIEW</span><h2>Terminology</h2></header><div class="review-terms">${exam.terms.map((item,index) => `<article class="${exam.correctness[index] ? "correct" : "wrong"}"><span>${exam.correctness[index] ? "✓" : "×"}</span><div><p>${esc(item.definition)}</p><small>Your answer: ${esc(exam.termAnswers[index] || "—")}</small><strong>${esc(item.term)}</strong></div></article>`).join("")}</div></section>
      <section class="review-section"><header><span>PART 2 REVIEW</span><h2>Short answers</h2></header><div class="short-review">${exam.shorts.map((item,index) => `<article><h3>${index + 1}. ${esc(item.q)}</h3><div><small>YOUR ANSWER · ${wordCount(exam.shortAnswers[index])} WORDS</small><p>${esc(exam.shortAnswers[index] || "No answer")}</p></div><div class="model"><small>MODEL ANSWER · ${wordCount(item.a)} WORDS</small><p>${esc(item.a)}</p></div></article>`).join("")}</div></section>
      <section class="review-section"><header><span>PART 3 REVIEW</span><h2>Essay outline</h2></header><article class="essay-review"><h3>${esc(exam.essays[exam.essayChoice].prompt)}</h3><div class="thesis"><small>SUGGESTED THESIS</small><p>${esc(exam.essays[exam.essayChoice].thesis)}</p></div><ol>${exam.essays[exam.essayChoice].outline.map(step => `<li>${esc(step)}</li>`).join("")}</ol><div class="rubric-grid"><div><b>1 point</b><span>Task response</span></div><div><b>1 point</b><span>Coherence & cohesion</span></div><div><b>1 point</b><span>Lexical resource</span></div><div><b>1 point</b><span>Grammar accuracy</span></div></div></article></section>`;
    return page({eyebrow:"RESULT & REVIEW",title:"Chấm phần có thể chấm chính xác",lead:"Không tạo điểm giả cho essay hoặc short answers.",body});
  }

  function progressPage() {
    const mastered = Object.values(state.termStatus).filter(value => value === "mastered").length;
    const review = Object.values(state.termStatus).filter(value => value === "review").length;
    const body = `<div class="progress-hero"><div><span>OVERALL</span><strong>${progressPercent()}%</strong><p>Tiến độ dựa trên unit hoàn thành và flashcards đã nhớ.</p></div><div><span>UNITS</span><strong>${state.completedUnits.length}/10</strong><p>Đã đánh dấu hoàn thành.</p></div><div><span>KEY TERMS</span><strong>${mastered}</strong><p>Đã nhớ · ${review} cần ôn lại.</p></div></div>
      <div class="progress-units">${D.units.map(unit => {const total=unit.terms.length,done=unit.terms.filter((_,i)=>state.termStatus[`${unit.id}:${i}`]==="mastered").length;return `<article><span>${String(unit.num).padStart(2,"0")}</span><div><h3>${esc(unit.title)}</h3><i><b style="width:${total ? done/total*100 : 0}%"></b></i><small>${done}/${total} terms mastered</small></div><strong>${state.completedUnits.includes(unit.id) ? "Complete" : "In progress"}</strong></article>`;}).join("")}</div>
      <div class="reset-row"><p>Dữ liệu chỉ được lưu trong trình duyệt hiện tại.</p><button class="danger-btn" id="resetProgress">Xóa toàn bộ tiến độ</button></div>`;
    return page({eyebrow:"PROGRESS",title:"Theo dõi phần đã thật sự học",lead:"Không cộng điểm cho việc chỉ mở trang; bạn chủ động đánh dấu hoàn thành và mức nhớ thuật ngữ.",body});
  }

  function render() {
    const route = currentRoute();
    const preserveScroll = render.lastRoute === route;
    const previousScroll = window.scrollY || 0;
    clearInterval(timerHandle);
    let html;
    if (route === "dashboard") html = dashboard();
    else if (route === "learn") html = learnHome();
    else if (route.startsWith("unit/")) { const [,unitId,tab] = route.split("/"); html = unitPage(unitId,tab || "theory"); }
    else if (route === "flashcards") html = flashcards();
    else if (route === "gaps") html = gapFilling();
    else if (route === "practice") html = practice();
    else if (route === "essay") html = essayLibrary();
    else if (route === "mock-test") html = state.exam?.active ? examPage() : state.exam && !state.exam.active ? examResult() : mockHome();
    else if (route === "progress") html = progressPage();
    else html = dashboard();
    app.innerHTML = html;
    document.body.classList.remove("menu-open");
    updateHeaderProgress();
    if (state.exam?.active && route === "mock-test") startExamTimer();
    app.focus({preventScroll:true});
    window.scrollTo({top:preserveScroll ? previousScroll : 0,behavior:"auto"});
    render.lastRoute = route;
  }

  function searchIndex() {
    const rows = [];
    D.units.forEach(unit => {
      rows.push({type:"Unit",title:`Unit ${unit.num} · ${unit.title}`,text:unit.summary,route:`unit/${unit.id}/theory`});
      unit.theories.forEach(item => rows.push({type:`Unit ${unit.num} · Theory`,title:item.title,text:`${item.body} ${item.points.join(" ")}`,route:`unit/${unit.id}/theory`}));
      unit.terms.forEach(term => rows.push({type:`Unit ${unit.num} · Key term`,title:term[0],text:`${term[1]} ${term[2]}`,route:`unit/${unit.id}/terms`}));
      unit.gaps.forEach(item => rows.push({type:`Unit ${unit.num} · Gap filling`,title:item.answer,text:item.prompt,route:`unit/${unit.id}/gaps`}));
      unit.shortAnswers.forEach(item => rows.push({type:`Unit ${unit.num} · Short answer`,title:item.q,text:item.a,route:`unit/${unit.id}/short`}));
      unit.essays.forEach(item => rows.push({type:`Unit ${unit.num} · Essay`,title:item.prompt,text:`${item.thesis} ${item.outline.join(" ")}`,route:`unit/${unit.id}/essay`}));
    });
    return rows;
  }
  const searchRows = searchIndex();
  function renderSearch(query) {
    const target = document.getElementById("searchResults");
    const q = normalize(query);
    if (!q) { target.innerHTML = `<div class="search-empty">Nhập thuật ngữ, khái niệm hoặc câu hỏi cần tìm.</div>`; return; }
    const hits = searchRows.filter(row => normalize(`${row.title} ${row.text}`).includes(q)).slice(0,30);
    target.innerHTML = hits.length ? hits.map(row => `<button data-search-route="${row.route}"><span>${esc(row.type)}</span><strong>${esc(row.title)}</strong><p>${esc(row.text.slice(0,150))}${row.text.length > 150 ? "…" : ""}</p></button>`).join("") : `<div class="search-empty">Không tìm thấy nội dung phù hợp.</div>`;
  }

  document.addEventListener("click", event => {
    if (event.target.closest("#searchButton")) {
      const dialog = document.getElementById("searchDialog");
      renderSearch(""); dialog.showModal();
      setTimeout(() => document.getElementById("searchInput").focus(), 0);
      return;
    }
    if (event.target.closest("#menuButton")) { document.body.classList.toggle("menu-open"); return; }
    const routeButton = event.target.closest("[data-route]");
    if (routeButton) { routeTo(routeButton.dataset.route); return; }
    const complete = event.target.closest("[data-complete-unit]");
    if (complete) {
      const id = complete.dataset.completeUnit, index = state.completedUnits.indexOf(id);
      if (index >= 0) state.completedUnits.splice(index,1); else state.completedUnits.push(id);
      saveState(); render(); return;
    }
    const flashUnit = event.target.closest("[data-flash-unit]");
    if (flashUnit) { state.flashUnit = flashUnit.dataset.flashUnit; state.flashIndex = 0; state.flashFlipped = false; state.flashOrder = []; saveState(); routeTo("flashcards"); return; }
    const gapUnitButton = event.target.closest("[data-gap-unit]");
    if (gapUnitButton) { state.gapUnit = gapUnitButton.dataset.gapUnit; state.gapIndex = 0; state.gapAnswer = ""; state.gapChecked = false; state.gapCorrect = false; saveState(); routeTo("gaps"); return; }
    if (event.target.closest("#flashCard")) { state.flashFlipped = !state.flashFlipped; saveState(); render(); return; }
    const flashStatus = event.target.closest("[data-flash-status]");
    if (flashStatus) {
      const key = state.flashOrder[state.flashIndex]; state.termStatus[key] = flashStatus.dataset.flashStatus;
      if (state.flashIndex < state.flashOrder.length - 1) state.flashIndex++;
      state.flashFlipped = false; saveState(); render(); return;
    }
    if (event.target.closest("#prevFlash")) { state.flashIndex = (state.flashIndex - 1 + state.flashOrder.length) % state.flashOrder.length; state.flashFlipped = false; saveState(); render(); return; }
    if (event.target.closest("#nextFlash")) { state.flashIndex = (state.flashIndex + 1) % state.flashOrder.length; state.flashFlipped = false; saveState(); render(); return; }
    if (event.target.closest("#shuffleFlash")) { state.flashOrder = shuffle(state.flashOrder); state.flashIndex = 0; state.flashFlipped = false; saveState(); render(); return; }
    const unitGapCheck = event.target.closest("[data-unit-gap-check]");
    if (unitGapCheck) {
      const unit = unitById(unitGapCheck.dataset.gapUnitId);
      const index = Number(unitGapCheck.dataset.unitGapCheck);
      const item = unit.gaps[index];
      const card = unitGapCheck.closest("[data-unit-gap-card]");
      const input = card.querySelector(`[data-unit-gap-input="${index}"]`);
      const feedback = card.querySelector(`[data-unit-gap-feedback="${index}"]`);
      const correct = acceptedGap(input.value, item);
      input.classList.toggle("correct", correct);
      input.classList.toggle("wrong", !correct);
      input.setAttribute("aria-invalid", String(!correct));
      feedback.hidden = false;
      feedback.className = `gap-feedback ${correct ? "correct" : "wrong"}`;
      feedback.innerHTML = `<img src="${correct ? MASCOTS.heart : MASCOTS.angry}" alt="" aria-hidden="true"><div><small>${correct ? "CORRECT" : "CORRECT ANSWER"}</small><strong>${esc(item.answer)}</strong>${item.accept?.length ? `<p>Also accepted: ${esc(item.accept.join(" · "))}</p>` : ""}</div>`;
      return;
    }
    const gapWord = event.target.closest("[data-gap-word]");
    if (gapWord) { const input = document.getElementById("gapAnswer"); state.gapAnswer = gapWord.dataset.gapWord; input.value = state.gapAnswer; input.focus(); return; }
    if (event.target.closest("[data-check-gap]")) {
      const pool = currentGapPool(), item = pool[state.gapIndex];
      state.gapCorrect = acceptedGap(state.gapAnswer, item);
      state.gapChecked = true;
      state.gapAttempted += 1;
      if (state.gapCorrect) state.gapCorrectTotal += 1;
      saveState(); render(); return;
    }
    if (event.target.closest("[data-next-gap]") || event.target.closest("#nextGap")) { moveGap(state.gapIndex + 1); return; }
    if (event.target.closest("#prevGap")) { moveGap(state.gapIndex - 1); return; }
    if (event.target.closest("#randomGap")) { const pool = currentGapPool(); moveGap(Math.floor(Math.random() * pool.length)); return; }
    const revealAnswer = event.target.closest("[data-reveal-answer]");
    if (revealAnswer) { const panel = revealAnswer.closest("[data-short-card]").querySelector(".model-answer"); panel.hidden = !panel.hidden; revealAnswer.textContent = panel.hidden ? "Reveal model answer" : "Hide model answer"; return; }
    const revealOutline = event.target.closest("[data-reveal-outline]");
    if (revealOutline) { const panel = revealOutline.parentElement.querySelector(".essay-outline"); panel.hidden = !panel.hidden; revealOutline.textContent = panel.hidden ? "Reveal thesis & outline" : "Hide thesis & outline"; return; }
    if (event.target.closest("#randomShort")) { const pool = state.practiceUnit === "all" ? allShort : allShort.filter(item=>item.unit.id===state.practiceUnit); state.practiceIndex = Math.floor(Math.random()*pool.length); saveState(); render(); return; }
    if (event.target.closest("#prevShort")) { const pool = state.practiceUnit === "all" ? allShort : allShort.filter(item=>item.unit.id===state.practiceUnit); state.practiceIndex = (state.practiceIndex - 1 + pool.length) % pool.length; saveState(); render(); return; }
    if (event.target.closest("#nextShort")) { const pool = state.practiceUnit === "all" ? allShort : allShort.filter(item=>item.unit.id===state.practiceUnit); state.practiceIndex = (state.practiceIndex + 1) % pool.length; saveState(); render(); return; }
    if (event.target.closest("#startExam")) { const scope = document.querySelector('input[name="examScope"]:checked')?.value || "midterm"; createExam(scope); return; }
    if (event.target.closest("#submitExam")) { if (confirm("Submit this test now? Answers cannot be edited after submission.")) submitExam(false); return; }
    if (event.target.closest("#newExam")) { state.exam = null; saveState(); render(); return; }
    if (event.target.closest("#resetProgress")) { if (confirm("Xóa toàn bộ tiến độ, flashcards và lịch sử bài thi trên trình duyệt này?")) { localStorage.removeItem(STORE); state = {...defaults}; render(); } return; }
    const searchRoute = event.target.closest("[data-search-route]");
    if (searchRoute) { document.getElementById("searchDialog").close(); routeTo(searchRoute.dataset.searchRoute); return; }
  });

  document.addEventListener("change", event => {
    if (event.target.id === "unitSwitcher") routeTo(`unit/${event.target.value}/theory`);
    if (event.target.id === "flashUnit") { state.flashUnit = event.target.value; state.flashIndex = 0; state.flashOrder = []; state.flashFlipped = false; saveState(); render(); }
    if (event.target.id === "gapUnit") { state.gapUnit = event.target.value; state.gapIndex = 0; state.gapAnswer = ""; state.gapChecked = false; state.gapCorrect = false; saveState(); render(); }
    if (event.target.id === "practiceUnit") { state.practiceUnit = event.target.value; state.practiceIndex = 0; saveState(); render(); }
    if (event.target.id === "essayUnit") { document.querySelectorAll("[data-essay-unit]").forEach(card => card.hidden = event.target.value !== "all" && card.dataset.essayUnit !== event.target.value); }
    if (event.target.matches('input[name="examScope"]')) document.querySelectorAll(".scope-option").forEach(label => label.classList.toggle("selected", label.contains(event.target)));
    if (event.target.matches("[data-exam-essay-choice]")) { state.exam.essayChoice = Number(event.target.dataset.examEssayChoice); saveState(); document.querySelectorAll(".essay-choices label").forEach((label,index)=>label.classList.toggle("selected",index===state.exam.essayChoice)); }
  });

  document.addEventListener("input", event => {
    if (event.target.id === "searchInput") renderSearch(event.target.value);
    if (event.target.id === "gapAnswer") { state.gapAnswer = event.target.value; saveState(); }
    if (event.target.matches("[data-word-limit]")) {
      const count = wordCount(event.target.value), holder = event.target.closest("[data-short-card]"), output = holder.querySelector("[data-word-count]");
      output.textContent = `${count} / 40 words`; output.classList.toggle("over",count > 40);
    }
    if (event.target.id === "termFilter") {
      const query = normalize(event.target.value); document.querySelectorAll("#termTable article").forEach(row => row.hidden = !row.dataset.termSearch.includes(query));
    }
    if (event.target.matches("[data-exam-term]")) { state.exam.termAnswers[Number(event.target.dataset.examTerm)] = event.target.value; saveState(); }
    if (event.target.matches("[data-exam-short]")) { const index=Number(event.target.dataset.examShort); state.exam.shortAnswers[index]=event.target.value; const count=wordCount(event.target.value), out=document.querySelector(`[data-exam-short-count="${index}"]`); out.textContent=`${count} / 40 words`; out.classList.toggle("over",count>40); saveState(); }
    if (event.target.id === "examEssay") { state.exam.essayAnswer=event.target.value; const count=wordCount(event.target.value), out=document.getElementById("examEssayCount"); out.textContent=`${count} / 300 words minimum`; out.classList.toggle("under",count<300); saveState(); }
    if (event.target.id === "searchInput") renderSearch(event.target.value);
  });

  const searchDialog = document.getElementById("searchDialog");
  document.getElementById("searchButton").addEventListener("click", () => { searchDialog.showModal(); const input=document.getElementById("searchInput"); input.value=""; renderSearch(""); setTimeout(()=>input.focus(),20); });
  document.getElementById("menuButton").addEventListener("click", () => document.body.classList.toggle("menu-open"));
  document.addEventListener("keydown", event => {
    if (event.key === "Enter" && event.target.id === "gapAnswer" && !state.gapChecked) { event.preventDefault(); document.querySelector("[data-check-gap]")?.click(); }
    if (event.key === "Enter" && event.target.matches("[data-unit-gap-input]")) { event.preventDefault(); event.target.closest("[data-unit-gap-card]").querySelector("[data-unit-gap-check]")?.click(); }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); document.getElementById("searchButton").click(); }
    if (event.key === "/" && !/input|textarea/i.test(document.activeElement.tagName)) { event.preventDefault(); document.getElementById("searchButton").click(); }
  });
  window.addEventListener("hashchange", render);
  render();
})();
