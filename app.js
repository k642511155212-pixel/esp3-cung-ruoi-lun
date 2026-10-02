"use strict";

(() => {
  const D = window.ESP3_DATA;
  const app = document.getElementById("app");
  const STORE = "esp3-mastery-state-v1";
  const allTerms = D.units.flatMap(unit => unit.terms.map((term, index) => ({ unit, index, term: term[0], definition: term[1], vi: term[2], pos: term[3] || "NOUN / NOUN PHRASE", source: term[4] || "CORE TERM", key: `${unit.id}:${index}` })));
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
    flashcardResumeByUnit: {},
    flashStudyMode: "unfinished",
    flashTrackerFilter: "all",
    gapUnit: "all",
    gapIndex: 0,
    gapAnswer: "",
    gapChecked: false,
    gapCorrect: false,
    gapAttempted: 0,
    gapCorrectTotal: 0,
    practiceUnit: "all",
    practiceIndex: 0,
    midtermMode: "gaps",
    midtermUnit: "all",
    exam: null,
    examHistory: [],
    finalReview: null
  };

  let state = loadState();
  let timerHandle = null;
  let learningReturn = "";
  let learningOrigin = "";
  let learningReference = "";
  let flashSession = null;
  let requestedFlashKey = "";
  const learningSnapshots = new Map();
  function rememberLearningRoute() {
    if (!render.lastRoute || state.exam && /test/.test(render.lastRoute)) return;
    learningSnapshots.set(render.lastRoute, {
      fields: Array.from(app.querySelectorAll("input,textarea,select")).map(e=>({value:e.value,checked:e.checked,className:e.className,invalid:e.getAttribute("aria-invalid")})),
      panels: Array.from(app.querySelectorAll(".model-answer,.answer-explanation,.essay-outline,.gap-feedback,.final-gap-feedback")).map(e=>({hidden:e.hidden,html:e.innerHTML,className:e.className})),
      details: Array.from(app.querySelectorAll("details")).map(e=>e.open),
      scroll: window.scrollY || 0
    });
  }

  function loadState() {
    try { return { ...structuredClone(defaults), ...JSON.parse(localStorage.getItem(STORE) || "{}") }; }
    catch { return structuredClone(defaults); }
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
  function gapHintOptions(item, count = 15) {
    const accepted = new Set([item.answer, ...(item.accept || [])].map(value => normalize(value)));
    const seen = new Set();
    const distractors = shuffle(allGaps.map(gap => gap.answer)).filter(term => {
      const key = normalize(term);
      if (!key || accepted.has(key) || seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, Math.max(0, count - 1));
    return shuffle([item.answer, ...distractors]);
  }
  function gapHintMarkup(item) {
    return `<div class="answer-controls"><span></span><button class="outline-btn" type="button" data-gap-hint-toggle>Hint</button></div>
      <div class="gap-feedback" data-gap-hint-box hidden aria-live="polite"><div><small>HINT · WORD BANK</small><strong>${gapHintOptions(item).map(esc).join(" · ")}</strong></div></div>`;
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
    const body = `
      <section class="dashboard-intro">
        <div class="dashboard-copy"><span class="kicker">ESP3 · THE INTERNATIONAL BUSINESS FIELD GUIDE</span><h2>Understand<br>the world.<br><em>Find your words.</em></h2><p>From a trade decision to a well-made argument. Study the concepts, put them to work, and build the language to explain why.</p><div class="hero-actions"><a class="solid-btn hero-cta" href="#final">Open Final Review ↗</a><a class="hero-secondary" href="#flashcards">Continue your vocabulary →</a></div><span class="hero-footnote">10 units · English first · Vietnamese support</span></div>
        <aside class="hero-folio"><div class="folio-heading"><span>FIELD NOTES</span><span>VOL. 03</span></div><div class="folio-title">Trade.<br>Connect.<br><em>Understand.</em></div><div class="folio-orbit" aria-hidden="true"><i></i><i></i><i></i></div><img src="${MASCOTS.flower}" alt="Ruồi Lùn, your study companion"><div class="folio-footer"><span>INTERNATIONAL<br>BUSINESS</span><span>WITH<br>RUỒI LÙN</span></div></aside>
      </section>
      <section class="course-index"><header><span class="eyebrow">THE COURSE, AT A GLANCE</span><h2>Ten perspectives.<br><em>One connected world.</em></h2></header><div class="course-map" aria-label="Course index">${D.units.map(unit=>`<button data-route="unit/${unit.id}/theory" class="map-node ${state.completedUnits.includes(unit.id)?'done':''}"><b>${String(unit.num).padStart(2,'0')}</b><span>${esc(unit.title)}</span><small>↗</small></button>`).join('')}</div></section>

      <div class="stat-row">
        <div><strong>${allTerms.length}</strong><span>vocabulary flashcards</span></div>
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
          <span class="space-number">03</span><img class="space-mascot" src="${MASCOTS.sideeye}" alt="" aria-hidden="true"><div><small>MIDTERM PRACTICE</small><h3>Ôn riêng từng dạng</h3><p>Chọn Gap filling, Q&amp;A hoặc Essay cho riêng Unit 1, 2, 3, 4, 9 hay trộn cả năm unit.</p></div>
          <button data-route="mock-test">Mở khu ôn midterm <span>→</span></button>
        </article>
      </section>

      <section class="resume-panel">
        <div><span class="eyebrow">TIẾN ĐỘ THỰC</span><h2>${state.completedUnits.length}/10 unit đã hoàn thành</h2><p>${mastered}/${allTerms.length} thuật ngữ được đánh dấu “Đã nhớ”.</p></div>
        <button class="outline-btn" data-route="progress">Xem tiến độ</button>
      </section>

      <section class="donate-banner">
        <img src="${MASCOTS.heart}" alt="" aria-hidden="true"><div><span>SUPPORT ESP3 MASTERY</span><h2>Thích trang web này?</h2><p>Bạn có thể ghé mục Donate để ủng hộ người làm nội dung.</p></div><button class="outline-btn" data-route="donate">Mở mục Donate →</button>
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
      <div class="theory-stack">${unit.theories.map((item,index) => `<article id="${F.legacyTheory[unit.num][index]}" class="theory-card concept-section" tabindex="-1">
        <div class="theory-index">${String(index + 1).padStart(2,"0")}</div>
        <div lang="en"><h3>${esc(item.title)}</h3><p>${esc(item.body)}</p>${unit.shortAnswers.map((q,qi)=>({q,support:legacySupport(unit,q)})).filter(x=>x.support.theoryId===F.legacyTheory[unit.num][index]).map(x=>`<a class="theory-link" href="#unit/${unit.id}/short/${x.support.id}">Practice this concept · ${x.support.id} →</a>`).join(' ')}<ul>${item.points.map(point => `<li>${esc(point)}</li>`).join("")}</ul></div>
      </article>`).join("")}</div>
      <div class="next-step"><img src="${MASCOTS.heart}" alt="" aria-hidden="true"><span>NEXT STEP</span><strong>Check whether you can recognize and define the key terms from this lesson.</strong><button data-route="unit/${unit.id}/terms">Open key terms →</button></div>`;
  }

  function termsTab(unit) {
    return `<div class="section-intro"><span>02</span><div><h2>Extended vocabulary bank</h2><p>Gồm core terms, từ trong readings/case studies và vocabulary exercises; có cả noun, verb, adjective, phrasal verb và collocation.</p></div><button class="solid-btn" data-flash-unit="${unit.id}">Học bằng flashcard</button></div>
      <label class="inline-search"><span>⌕</span><input id="termFilter" type="search" placeholder="Tìm trong Unit ${unit.num}…"></label>
      <div class="term-table" id="termTable">${unit.terms.map((term,index) => `<article id="${vocabularyId(unit.num,term[0])}" tabindex="-1" data-term-search="${esc(normalize(term.join(" ")))}"><span class="term-no">${String(index + 1).padStart(2,"0")}</span><div><div class="term-badges"><span>${esc(term[3] || "NOUN / NOUN PHRASE")}</span><span>${esc(term[4] || "CORE TERM")}</span></div><h3>${esc(term[0])}</h3><p>${esc(term[1])}</p><small>${esc(term[2])}</small></div><span class="status-dot ${state.termStatus[`${unit.id}:${index}`] === "mastered" ? "mastered" : ""}" title="${state.termStatus[`${unit.id}:${index}`] === "mastered" ? "Đã nhớ" : "Chưa đánh dấu"}"></span></article>`).join("")}</div>`;
  }

  function gapTab(unit) {
    return `<div class="section-intro gap-intro"><span>03</span><div><h2>Gap filling — điền đúng key term</h2><p>Đọc toàn bộ định nghĩa, nhập thuật ngữ tiếng Anh rồi kiểm tra. Viết hoa và dấu gạch nối không ảnh hưởng kết quả.</p></div><button class="solid-btn" data-gap-unit="${unit.id}">Luyện từng câu</button></div>
      <div class="gap-list">${unit.gaps.map((item,index) => `<article class="gap-card" data-unit-gap-card="${index}">
        <div class="question-label"><span>GAP ${String(index + 1).padStart(2,"0")}</span><b>UNIT ${unit.num}</b></div>
        <h3>${esc(item.prompt)}</h3>
        <div class="gap-entry"><input type="text" data-unit-gap-input="${index}" placeholder="Type the missing term…" autocomplete="off"><button class="solid-btn" data-unit-gap-check="${index}" data-gap-unit-id="${unit.id}">Check</button></div>
        <button class="theory-link" data-related-theory="unit/${unit.id}/theory">Review this unit’s theory ↗</button>
        ${gapHintMarkup(item)}
        <div class="gap-feedback" data-unit-gap-feedback="${index}" hidden aria-live="polite"></div>
      </article>`).join("")}</div>`;
  }

  function legacySupport(unit, item) {
    return F.legacyQuestions[`${unit.num}:${unit.shortAnswers.findIndex(q=>q.q===item.q)}`];
  }
  function legacyAnswer(unit,item) { return legacySupport(unit,item)?.answer || item.a; }
  function legacyExplanation(unit, item) {
    const support=legacySupport(unit,item);
    if(!support?.explanation) return '';
    return `<button class="outline-btn" data-show-explanation aria-expanded="false">Show explanation</button><div class="answer-explanation" hidden><h4>Explanation</h4><p>${esc(support.explanation)}</p>${support.correctionNote?`<p class="source-note">${esc(support.correctionNote)}</p>`:""}${finalSource(support.source)}<button class="theory-link" data-related-theory="unit/${unit.id}/theory/${support.theoryId}">Review related theory ↗</button></div>`;
  }
  function shortTab(unit) {
    return `<div class="section-intro"><span>04</span><div><h2>Câu hỏi ngắn — tối đa 40 từ</h2><p>Hãy tự viết trước. Website đếm từ và chỉ hiển thị model answer khi bạn chủ động mở.</p></div></div>
      <div class="short-list">${unit.shortAnswers.map((item,index) => `<article class="short-card" id="question-${legacySupport(unit,item).id}" data-short-card>
        <div class="question-label"><span>QUESTION ${index + 1}</span><b>≤ 40 WORDS</b></div>
        <h3>${esc(item.q)}</h3><small class="question-ref">${legacySupport(unit,item).id}</small>
        <textarea aria-label="Your answer to ${legacySupport(unit,item).id}" rows="4" data-word-limit="40" placeholder="Write your answer in English…"></textarea>
        <button class="theory-link" data-related-theory="unit/${unit.id}/theory/${legacySupport(unit,item).theoryId}">Review this unit’s theory ↗</button><div class="answer-controls"><span data-word-count>0 / 40 words</span><button class="outline-btn" data-reveal-answer>Reveal model answer</button></div>
        <div class="model-answer" hidden><img class="feedback-mascot" src="${MASCOTS.heart}" alt="" aria-hidden="true"><small>MODEL ANSWER · ${wordCount(legacyAnswer(unit,item))} WORDS</small><p>${esc(legacyAnswer(unit,item))}</p>${legacyExplanation(unit,item)}</div>
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

  const flashStatusText = {new:"○ Unlearned",review:"△ Review",mastered:"✓ Remembered"};
  function flashPool() { return state.flashUnit === "all" ? allTerms : allTerms.filter(t=>t.unit.id===state.flashUnit); }
  function termState(key) { return ["review","mastered"].includes(state.termStatus[key]) ? state.termStatus[key] : "new"; }
  function flashQueue() {
    const pool=flashPool();
    return (state.flashStudyMode==="all" ? pool : [...pool.filter(t=>termState(t.key)==="new"),...pool.filter(t=>termState(t.key)==="review")]).map(t=>t.key);
  }
  function rememberFlash(key) {
    if(!state.flashcardResumeByUnit || typeof state.flashcardResumeByUnit!=="object" || Array.isArray(state.flashcardResumeByUnit)) state.flashcardResumeByUnit={};
    if(key && termState(key)!=="mastered") state.flashcardResumeByUnit[state.flashUnit]=key;
    state.flashOrder=[...flashSession.queue]; state.flashIndex=Math.max(0,flashSession.queue.indexOf(key)); saveState();
  }
  function prepareFlash() {
    if(!flashSession || flashSession.unit!==state.flashUnit || render.lastRoute!=="flashcards") {
      state.flashStudyMode="unfinished";
      const queue=flashQueue(), saved=state.flashcardResumeByUnit?.[state.flashUnit];
      const legacy=state.flashOrder?.[state.flashIndex];
      const requested=requestedFlashKey;requestedFlashKey="";
      const current=requested && flashPool().some(t=>t.key===requested)?requested:queue.includes(saved)?saved:!saved && queue.includes(legacy)?legacy:queue[0] || "";
      flashSession={unit:state.flashUnit,queue,current,history:[]};state.flashFlipped=false;
      rememberFlash(current);
    }
  }
  function selectFlash(key, history=true) {
    if(!flashPool().some(t=>t.key===key)) return;
    if(history && flashSession.current && flashSession.current!==key) flashSession.history.push(flashSession.current);
    flashSession.current=key;state.flashFlipped=false;rememberFlash(key);
  }
  function openFlashScope(unit) {
    state.flashUnit=unit;state.flashStudyMode="unfinished";state.flashTrackerFilter="all";
    flashSession=null;state.flashOrder=[];state.flashIndex=0;saveState();
    if(currentRoute()==="flashcards") render(); else routeTo("flashcards");
  }
  function flashcards() {
    prepareFlash();
    const pool=flashPool(), item=pool.find(t=>t.key===flashSession.current);
    const counts={new:0,review:0,mastered:0};pool.forEach(t=>counts[termState(t.key)]++);
    const progress=pool.length?Math.round(counts.mastered/pool.length*100):0;
    const filter=["all","new","review","mastered"].includes(state.flashTrackerFilter)?state.flashTrackerFilter:"all";
    const body=`<section class="recall-studio"><header class="recall-controls"><label>Study collection<select id="flashUnit">${unitOptions(state.flashUnit)}</select></label><div class="recall-summary"><strong>${counts.mastered}<small> / ${pool.length}</small></strong><span>remembered · ${counts.new+counts.review} unfinished</span></div><button class="outline-btn" id="shuffleFlash">${counts.new+counts.review?'Shuffle unfinished':'Shuffle for review'}</button></header><div class="flash-progress"><span>${progress}% remembered</span><i><b style="width:${progress}%"></b></i></div>
      ${item?`<div class="flash-workspace"><div class="recall-context"><span>UNIT ${item.unit.num} · ${esc(item.unit.title)}</span><span data-card-status>${flashStatusText[termState(item.key)]}</span></div><button class="flash-card ${state.flashFlipped?'flipped':''}" id="flashCard" data-term-key="${item.key}" aria-label="Flip card: ${esc(item.term)}" aria-pressed="${!!state.flashFlipped}"><span class="flash-side front"><small>${esc(item.pos)}</small><strong>${esc(item.term)}</strong><em>Think of the meaning. Then turn the page. ↗</em></span><span class="flash-side back"><small>MEANING</small><strong>${esc(item.definition)}</strong><p>${esc(item.vi)}</p><em>Return to the term ↗</em></span><span class="card-edition">ESP3 · ACTIVE RECALL</span></button><div class="flash-actions"><button class="review-btn" data-flash-status="review">△ Need review</button><button class="prev-btn" id="prevFlash" aria-label="Previous studied card" ${flashSession.history.length?'':'disabled'}>←</button><button class="next-btn" id="nextFlash" aria-label="Next unfinished card">→</button><button class="master-btn" data-flash-status="mastered">✓ Remembered</button></div><p class="recall-note">${state.flashStudyMode==='all'?'Full review collection.':'Unfinished words come first.'} Flipping and browsing never change your status.</p></div>`:`<div class="recall-complete"><img src="${MASCOTS.flower}" alt="Ruồi Lùn celebrates your progress"><span class="eyebrow">COLLECTION COMPLETE</span><h2>A little knowledge,<br><em>well remembered.</em></h2><p>Every term in this collection is marked Remembered. Revisit any word below, or review the collection again.</p><button class="solid-btn" id="reviewAllFlash">Review all words →</button></div>`}</section>
      <section class="vocabulary-tracker" aria-labelledby="trackerTitle"><header><div><span class="eyebrow">YOUR LEARNING INDEX</span><h2 id="trackerTitle">Every word, accounted for.</h2></div><p data-tracker-summary>${counts.mastered} Remembered · ${counts.review} Review · ${counts.new} Unlearned</p></header><nav class="tracker-filters" aria-label="Vocabulary status filter">${[['all','All'],['new','Unlearned'],['review','Review'],['mastered','Remembered']].map(([k,label])=>`<button data-flash-filter="${k}" aria-pressed="${filter===k}" class="${filter===k?'active':''}">${label} <small>${k==='all'?pool.length:counts[k]}</small></button>`).join('')}</nav><div class="tracker-list">${pool.filter(t=>filter==='all'||termState(t.key)===filter).map(t=>`<button class="tracker-row ${t.key===item?.key?'current':''}" data-flash-term="${t.key}" data-term-status="${termState(t.key)}" aria-current="${t.key===item?.key?'true':'false'}"><span>${esc(t.term)}${state.flashUnit==='all'?`<small>Unit ${t.unit.num}</small>`:''}</span><small>${flashStatusText[termState(t.key)]}</small></button>`).join('')||'<p class="tracker-empty">No words in this group yet.</p>'}</div></section>`;
    return page({eyebrow:"THE RECALL ROOM",title:"Make the words yours.",lead:"A focused collection. A place to return. Your progress stays with every word.",className:"flash-page",body});
  }

  function gapFilling() {
    const pool = state.gapUnit === "all" ? allGaps : allGaps.filter(item => item.unit.id === state.gapUnit);
    state.gapIndex = Math.min(state.gapIndex, Math.max(0, pool.length - 1));
    const item = pool[state.gapIndex] || pool[0];
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
      <div class="question-label"><span>UNIT ${item.unit.num} · GAP FILLING</span><b>HINT AVAILABLE · ${state.gapIndex + 1} / ${pool.length}</b></div>
      <h2>${esc(item.prompt)}</h2>
      <div class="gap-entry large"><input id="gapAnswer" type="text" value="${esc(state.gapAnswer)}" placeholder="Type the missing key term…" autocomplete="off" ${state.gapChecked ? "disabled" : ""}><button class="solid-btn" ${state.gapChecked ? "data-next-gap" : "data-check-gap"}>${state.gapChecked ? "Next question →" : "Check answer"}</button></div>
      <button class="theory-link" data-related-theory="unit/${item.unit.id}/theory">Review this unit’s theory ↗</button>
      ${gapHintMarkup(item)}
      ${feedback}
      <div class="stage-nav"><button class="outline-btn" id="prevGap">← Previous</button><button class="outline-btn" id="nextGap">Skip / Next →</button></div>
    </article>`;
    return page({eyebrow:"GAP-FILLING TRAINER",title:"Nhìn định nghĩa, gọi đúng thuật ngữ",lead:`${allGaps.length} câu exam-style, không có word bank; Unit 2, 3, 4 và 9 bám sát các tài liệu ôn tập bạn gửi.`,body});
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
    <article class="practice-stage" id="question-${legacySupport(item.unit,item).id}" data-short-card>
      <div class="question-label"><span>UNIT ${item.unit.num} · SHORT ANSWER</span><b>MAXIMUM 40 WORDS</b></div>
      <h2>${esc(item.q)}</h2><small class="question-ref">${legacySupport(item.unit,item).id}</small>
      <button class="theory-link" data-related-theory="unit/${item.unit.id}/theory/${legacySupport(item.unit,item).theoryId}">Review this unit’s theory ↗</button>
      <textarea aria-label="Your answer to ${legacySupport(item.unit,item).id}" rows="7" data-word-limit="40" placeholder="Write a complete answer in English. Define, explain, and answer the exact question."></textarea>
      <div class="answer-controls"><span data-word-count>0 / 40 words</span><button class="solid-btn" data-reveal-answer>Check with model answer</button></div>
      <div class="model-answer large" hidden><img class="feedback-mascot" src="${MASCOTS.heart}" alt="" aria-hidden="true"><small>MODEL ANSWER · ${wordCount(legacyAnswer(item.unit,item))} WORDS</small><p>${esc(legacyAnswer(item.unit,item))}</p>${legacyExplanation(item.unit,item)}<ul><li>Answers the exact question</li><li>Uses the correct technical term</li><li>Explains the mechanism or difference</li><li>Stays within 40 words</li></ul></div>
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
    const coreUnits = D.units.filter(unit => D.course.midtermUnits.includes(unit.num));
    const validUnitIds = new Set(coreUnits.map(unit => unit.id));
    if (state.midtermUnit !== "all" && !validUnitIds.has(state.midtermUnit)) state.midtermUnit = "all";
    if (!["gaps", "short", "essay"].includes(state.midtermMode)) state.midtermMode = "gaps";
    const selectedUnits = state.midtermUnit === "all" ? coreUnits : coreUnits.filter(unit => unit.id === state.midtermUnit);
    const gapCount = selectedUnits.reduce((sum, unit) => sum + unit.gaps.length, 0);
    const shortCount = selectedUnits.reduce((sum, unit) => sum + unit.shortAnswers.length, 0);
    const essayCount = selectedUnits.reduce((sum, unit) => sum + unit.essays.length, 0);
    const scopeName = state.midtermUnit === "all" ? "Units 1, 2, 3, 4 & 9" : `Unit ${selectedUnits[0].num}`;

    const unitOptionsHtml = `<option value="all" ${state.midtermUnit === "all" ? "selected" : ""}>Tất cả · Unit 1, 2, 3, 4 &amp; 9</option>${coreUnits.map(unit => `<option value="${unit.id}" ${state.midtermUnit === unit.id ? "selected" : ""}>Unit ${unit.num} · ${esc(unit.title)}</option>`).join("")}`;
    const modeContent = state.midtermMode === "gaps"
      ? midtermGapWorksheet(selectedUnits)
      : state.midtermMode === "short"
        ? midtermShortWorksheet(selectedUnits)
        : midtermEssayWorksheet(selectedUnits);

    const body = `<section class="midterm-review-hero">
      <div><span>MIDTERM SCOPE</span><h2>Unit 1 · 2 · 3 · 4 · 9</h2><p>Không có full test và không có đồng hồ. Chọn đúng phần bạn muốn luyện rồi làm toàn bộ ngân hàng câu hỏi exam style.</p></div>
      <img src="${MASCOTS.sideeye}" alt="" aria-hidden="true">
    </section>
    <section class="midterm-controls" aria-label="Midterm practice filters">
      <div class="midterm-mode-switch" role="tablist" aria-label="Chọn dạng bài">
        <button role="tab" aria-selected="${state.midtermMode === "gaps"}" class="${state.midtermMode === "gaps" ? "active" : ""}" data-midterm-mode="gaps"><img src="${MASCOTS.neutral}" alt="" aria-hidden="true"><span><small>PART 1</small><strong>Gap filling</strong><em>${gapCount} questions</em></span></button>
        <button role="tab" aria-selected="${state.midtermMode === "short"}" class="${state.midtermMode === "short" ? "active" : ""}" data-midterm-mode="short"><img src="${MASCOTS.heart}" alt="" aria-hidden="true"><span><small>PART 2</small><strong>Q&amp;A</strong><em>${shortCount} questions · ≤40 words</em></span></button>
        <button role="tab" aria-selected="${state.midtermMode === "essay"}" class="${state.midtermMode === "essay" ? "active" : ""}" data-midterm-mode="essay"><img src="${MASCOTS.mustache}" alt="" aria-hidden="true"><span><small>PART 3</small><strong>Essay &amp; outline</strong><em>${essayCount} topics · ≥300 words</em></span></button>
      </div>
      <div class="midterm-filter-row">
        <label>Phạm vi ôn<select id="midtermUnit">${unitOptionsHtml}</select></label>
        <div><span>ĐANG HIỂN THỊ</span><strong>${esc(scopeName)} · ${state.midtermMode === "gaps" ? `${gapCount} gap-fillings` : state.midtermMode === "short" ? `${shortCount} Q&amp;A` : `${essayCount} essay topics`}</strong></div>
      </div>
    </section>
    <section class="midterm-question-bank">${modeContent}</section>`;
    return page({eyebrow:"MIDTERM PRACTICE",title:"Ôn đúng phần bạn cần",lead:"Tất cả câu hỏi đều viết theo exam style và chỉ lấy phạm vi Unit 1, 2, 3, 4, 9.",body,className:"midterm-review-page"});
  }

  function midtermGroupHeader(unit, type, count) {
    const labels = {gaps:"GAP FILLING",short:"SHORT ANSWERS",essay:"ESSAY PREPARATION"};
    return `<header class="midterm-unit-head"><div><span>UNIT ${String(unit.num).padStart(2,"0")} · ${labels[type]}</span><h2>${esc(unit.title)}</h2></div><b>${count} ${count === 1 ? "item" : "items"}</b></header>`;
  }

  function midtermGapWorksheet(units) {
    let number = 0;
    return units.map(unit => `<section class="midterm-unit-group">
      ${midtermGroupHeader(unit,"gaps",unit.gaps.length)}
      <p class="exam-direction">Complete each sentence with the correct English key term. No word bank is provided.</p>
      <div class="gap-list">${unit.gaps.map((item,index) => {
        number += 1;
        return `<article class="gap-card" data-unit-gap-card="${unit.id}:${index}">
          <div class="question-label"><span>QUESTION ${String(number).padStart(2,"0")}</span><b>UNIT ${unit.num} · EXAM STYLE</b></div>
          <h3>${esc(item.prompt)}</h3>
          <div class="gap-entry"><input type="text" data-unit-gap-input="${index}" placeholder="Type the missing term…" autocomplete="off"><button class="solid-btn" data-unit-gap-check="${index}" data-gap-unit-id="${unit.id}">Check</button></div>
          <button class="theory-link" data-related-theory="unit/${unit.id}/theory">Review this unit’s theory ↗</button>
          ${gapHintMarkup(item)}
          <div class="gap-feedback" data-unit-gap-feedback="${index}" hidden aria-live="polite"></div>
        </article>`;
      }).join("")}</div>
    </section>`).join("");
  }

  function midtermShortWorksheet(units) {
    let number = 0;
    return units.map(unit => `<section class="midterm-unit-group">
      ${midtermGroupHeader(unit,"short",unit.shortAnswers.length)}
      <p class="exam-direction">Answer each question in English in no more than 40 words.</p>
      <div class="short-list">${unit.shortAnswers.map(item => {
        number += 1;
        return `<article class="short-card" id="question-${legacySupport(unit,item).id}" data-short-card>
          <div class="question-label"><span>QUESTION ${String(number).padStart(2,"0")}</span><b>MAXIMUM 40 WORDS</b></div>
          <h3>${esc(item.q)}</h3><small class="question-ref">${legacySupport(unit,item).id}</small>
          <button class="theory-link" data-related-theory="unit/${unit.id}/theory/${legacySupport(unit,item).theoryId}">Review this unit’s theory ↗</button>
          <textarea aria-label="Your answer to ${legacySupport(unit,item).id}" rows="4" data-word-limit="40" placeholder="Write your answer in English…"></textarea>
          <div class="answer-controls"><span data-word-count>0 / 40 words</span><button class="outline-btn" data-reveal-answer>Reveal model answer</button></div>
          <div class="model-answer" hidden><img class="feedback-mascot" src="${MASCOTS.heart}" alt="" aria-hidden="true"><small>MODEL ANSWER · ${wordCount(legacyAnswer(unit,item))} WORDS</small><p>${esc(legacyAnswer(unit,item))}</p>${legacyExplanation(unit,item)}</div>
        </article>`;
      }).join("")}</div>
    </section>`).join("");
  }

  function midtermEssayWorksheet(units) {
    let number = 0;
    return units.map(unit => `<section class="midterm-unit-group">
      ${midtermGroupHeader(unit,"essay",unit.essays.length)}
      <p class="exam-direction">Study the topic, decide your position, then plan an essay of at least 300 words before revealing the suggested structure.</p>
      <div class="essay-list">${unit.essays.map(essay => {
        number += 1;
        return `<article class="essay-card">
          <div class="question-label"><span>TOPIC ${String(number).padStart(2,"0")}</span><b>MINIMUM 300 WORDS</b></div>
          <h3>${esc(essay.prompt)}</h3>
          <button class="outline-btn" data-reveal-outline>Reveal thesis &amp; outline</button>
          <div class="essay-outline" hidden><img class="feedback-mascot" src="${MASCOTS.mustache}" alt="" aria-hidden="true"><div class="thesis"><small>SUGGESTED THESIS</small><p>${esc(essay.thesis)}</p></div><ol>${essay.outline.map(step => `<li>${esc(step)}</li>`).join("")}</ol></div>
        </article>`;
      }).join("")}</div>
    </section>`).join("");
  }

  function donatePage() {
    const body = `<section class="donate-shell">
      <div class="donate-copy">
        <span>SUPPORT THE PROJECT</span>
        <h2>Một chút động lực cho người làm web.</h2>
        <p>Nếu ESP3 Mastery giúp việc ôn tập của bạn dễ dàng hơn, bạn có thể quét mã trong ảnh để ủng hộ.</p>
        <div class="donate-thank-you"><img src="${MASCOTS.heart}" alt="" aria-hidden="true"><div><small>SPECIAL THANKS</small><strong>Cảm ơn Phước Nguyên đã gợi ý</strong></div></div>
      </div>
      <figure class="donate-image-card">
        <img src="donate-phuoc-nguyen.png" alt="Ảnh donate kèm mã QR do người dùng cung cấp">
        <figcaption>Quét mã QR trong ảnh để donate</figcaption>
      </figure>
    </section>`;
    return page({eyebrow:"ESP3 MASTERY · DONATE",title:"Donate",lead:"Cảm ơn bạn đã học cùng những chú ruồi nhỏ.",body,className:"donate-page"});
  }

  function createExam(scope) {
    const units = scope === "midterm" ? D.units.filter(unit => unit.midterm) : D.units;
    const seenAnswers = new Set();
    const terms = shuffle(units.flatMap(unit => unit.gaps.map((item,index) => ({unitId:unit.id,unitNum:unit.num,index,term:item.answer,definition:item.prompt,accept:item.accept || []})))).filter(item => {
      const answer = normalize(item.term);
      if (seenAnswers.has(answer)) return false;
      seenAnswers.add(answer);
      return true;
    }).slice(0,10);
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
    return a === t || compact(a) === compact(t) || a === withoutParen || compact(a) === compact(withoutParen) || (acronym && (a === normalize(acronym) || compact(a) === compact(acronym)));
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

  function finalProgressSummary() {
    const done=finalState().done;
    const groups=[
      {label:"Vocabulary review",route:"final/vocabulary/1",items:F.units.flatMap(u=>[[`vocabulary-${u.num}`]])},
      {label:"Applied situations",route:"final/concepts/2",items:F.units.flatMap(u=>u.situations.map(q=>{const key=q.legacyId||q.id;return [key,...F.sets.map((_,i)=>`set${i+1}-${key}`)];}))},
      {label:"Writing preparation",route:"final/writing/1",items:F.writing.map((_,i)=>[`writing-${i+1}`,...F.sets.map((_,s)=>`set${s+1}-writing-${i+1}`)])},
    ];
    groups.forEach(g=>{g.total=g.items.length;g.done=g.items.filter(keys=>keys.some(k=>done[k])).length;});
    const total=groups.reduce((n,g)=>n+g.total,0),completed=groups.reduce((n,g)=>n+g.done,0);
    return `<section class="final-progress-section"><header><div><span class="eyebrow">FINAL EXAM REVIEW</span><h2>Preparation, with purpose.</h2><p>Explicitly reviewed activities. Repeated cases in Practice Sets count once.</p></div><strong>${completed}<small> / ${total}</small></strong></header><div class="final-progress-lines">${groups.map(g=>`<a href="#${g.route}"><span>${g.label}</span><b>${g.done} / ${g.total}</b><progress max="${g.total}" value="${g.done}" aria-label="${g.label}"></progress></a>`).join('')}</div></section>`;
  }
  function progressPage() {
    const mastered = Object.values(state.termStatus).filter(value => value === "mastered").length;
    const review = Object.values(state.termStatus).filter(value => value === "review").length;
    const body = `<div class="progress-hero"><div><span>OVERALL</span><strong>${progressPercent()}%</strong><p>Tiến độ dựa trên unit hoàn thành và flashcards đã nhớ.</p></div><div><span>UNITS</span><strong>${state.completedUnits.length}/10</strong><p>Đã đánh dấu hoàn thành.</p></div><div><span>KEY TERMS</span><strong>${mastered}</strong><p>Đã nhớ · ${review} cần ôn lại.</p></div></div>
      <div class="progress-units">${D.units.map(unit => {const total=unit.terms.length,done=unit.terms.filter((_,i)=>state.termStatus[`${unit.id}:${i}`]==="mastered").length;return `<article><span>${String(unit.num).padStart(2,"0")}</span><div><h3>${esc(unit.title)}</h3><i><b style="width:${total ? done/total*100 : 0}%"></b></i><small>${done}/${total} terms mastered</small></div><strong>${state.completedUnits.includes(unit.id) ? "Complete" : "In progress"}</strong></article>`;}).join("")}</div>
      ${finalProgressSummary()}${wbProgress()}<div class="reset-row"><p>Dữ liệu chỉ được lưu trong trình duyệt hiện tại.</p><button class="danger-btn" id="resetProgress">Xóa toàn bộ tiến độ</button></div>`;
    return page({eyebrow:"PROGRESS",title:"Theo dõi phần đã thật sự học",lead:"Không cộng điểm cho việc chỉ mở trang; bạn chủ động đánh dấu hoàn thành và mức nhớ thuật ngữ.",body});
  }

  const F = window.ESP3_FINAL;
  function finalSource(s) {
    return `<small class="source-tag">[${s.kind === "Practice" ? "Practice · based on" : "Textbook ·"} Unit ${s.unit} · ${s.pages[0] === s.pages[1] ? "p." + s.pages[0] : "pp." + s.pages.join("–")}]</small>`;
  }
  function finalState() {
    if (!state.finalReview || typeof state.finalReview !== "object") state.finalReview = {};
    state.finalReview.done ||= {};
    state.finalReview.drafts ||= {};
    return state.finalReview;
  }
  function finalDraft(key, label, rows = 5) {
    return `<label class="final-draft">${esc(label)}<textarea rows="${rows}" data-final-draft="${esc(key)}" placeholder="Write your reasoning here…">${esc(finalState().drafts[key] || "")}</textarea><small>Saved on this browser · no prescribed word limit</small></label>`;
  }
  function finalDone(key) {
    return `<button class="outline-btn" data-final-done="${esc(key)}" aria-pressed="${!!finalState().done[key]}">${finalState().done[key] ? "✓ Reviewed · mark incomplete" : "Mark reviewed"}</button>`;
  }
  function vocabularyId(unit, term) { return `vocab-u${unit}-${term.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`; }
  function wbState() {
    const f=finalState();f.wordBox ||= {mode:"study",level:"All",passages:{},mistakes:{}};
    f.wordBox.passages ||= {};f.wordBox.mistakes ||= {};return f.wordBox;
  }
  function wbAttempt(p, scope="bank") {
    const w=wbState(),key=scope+":"+p.id;
    w.passages[key] ||= {answers:{},bankOrder:shuffle([...p.bank]),submitted:false,attempts:[],bestScore:0};
    return w.passages[key];
  }
  function wbCorrect(b,value) {return normalize(value||"")===normalize(b.answer);}
  function wbStatus(p) {
    const a=wbState().passages['bank:'+p.id];
    return !a?'○ Not started':a.bestScore===p.blanks.length?'✓ Mastered':a.attempts.length?'△ Attempted':Object.values(a.answers).some(Boolean)?'◐ In progress':'○ Not started';
  }
  function wbWeak(p) {return new Set(p.blanks.filter(b=>wbState().mistakes[b.vocabId]?.unresolved).map(b=>b.vocabId)).size;}
  function wbSummary() {
    const rows=F.wordBox.map(p=>({p,a:wbState().passages['bank:'+p.id]}));
    const attempted=rows.filter(x=>x.a?.attempts.length),mastered=rows.filter(x=>x.a?.bestScore===x.p.blanks.length);
    const weak=Object.values(wbState().mistakes).filter(m=>m.unresolved);
    return {attempted:attempted.length,mastered:mastered.length,weak:weak.length,average:attempted.length?Math.round(attempted.reduce((n,x)=>n+x.a.bestScore/x.p.blanks.length,0)/attempted.length*100):0};
  }
  function wbProgress() {const s=wbSummary();return `<section class="wb-progress"><span class="eyebrow">WORDS IN CONTEXT · WORD-BOX PRACTICE</span><h2>${s.attempted} <small>/ 16 attempted</small></h2><p>${s.mastered} mastered · best average ${s.average}% · ${s.weak} words to revisit</p><a class="theory-link" href="#final/gaps">Open the Practice Bank →</a></section>`;}
  function wbLanding() {
    const w=wbState(),s=wbSummary();let passages=F.wordBox.filter(p=>w.level==='All'||w.level==='Weak words'&&wbWeak(p)>0||p.level===w.level);
    if(w.level==='Weak words')passages.sort((a,b)=>wbWeak(b)-wbWeak(a)||a.id.localeCompare(b.id));
    return `<section class="wb-bank-head"><span class="eyebrow">WORDS IN CONTEXT</span><h2>Read the whole passage.<br><em>Let context do the work.</em></h2><p>Original textbook-grounded exercises matching the lecturer’s stated word-box format.</p><p>${s.attempted} / 16 attempted · ${s.mastered} mastered · ${s.weak} words to revisit</p></section><nav class="wb-filters" aria-label="Passage difficulty">${['All','Foundation','Standard','Exam-like','Challenge',...(s.weak?['Weak words']:[])].map(l=>`<button class="outline-btn ${w.level===l?'active':''}" data-wb-level="${l}" aria-pressed="${w.level===l}">${l==='Weak words'?'Practice my weak words':l}</button>`).join('')}</nav><div class="wb-index">${passages.map(p=>{const a=w.passages['bank:'+p.id];return `<a href="#final/gaps/${p.id}"><small>${p.id}</small><h3>${esc(p.title)}</h3><p>${p.level} · ${p.blanks.length} blanks${w.level==='Weak words'?' · covers '+wbWeak(p)+' missed words':''}</p><span>${wbStatus(p)}${a?.attempts.length?' · Best '+a.bestScore+'/'+p.blanks.length:''}</span><b>${a?'Continue':'Begin'} →</b></a>`;}).join('')}</div>${s.weak?`<section class="wb-mistakes"><h2>Words to revisit</h2>${Object.entries(w.mistakes).filter(([,m])=>m.unresolved).map(([id,m])=>{const p=F.wordBox.find(p=>p.blanks.some(b=>b.vocabId===id)),b=p.blanks.find(b=>b.vocabId===id);return `<div><strong>△ ${esc(b.answer)}</strong><span>Missed ${m.wrongCount} time${m.wrongCount===1?'':'s'} · Unit ${b.unit}</span>${b.termKey?`<button class="theory-link" data-wb-flash="${b.termKey}">Review flashcard ↗</button>`:''}<a class="theory-link" href="#final/gaps/${p.id}">Practice in context →</a></div>`;}).join('')}</section>`:''}`;
  }
  function wbLinks(b) {
    const term=b.termKey?allTerms.find(t=>t.key===b.termKey):null;
    return `${term?`<button class="theory-link" data-related-theory="unit/${term.unit.id}/terms/${b.vocabId}">Review vocabulary ↗</button><button class="theory-link" data-wb-flash="${term.key}">Review flashcard ↗</button>`:''}${b.theoryId?`<button class="theory-link" data-related-theory="final/theory/${b.unit}/${b.theoryId}">Related theory ↗</button>`:''}`;
  }
  function finalGap(p,scope="bank") {
    const a=wbAttempt(p,scope),w=wbState(),filled=p.blanks.filter(b=>a.answers[b.id]?.trim()).length;
    saveState();
    return `<section id="exercise-${scope}-${p.id}" class="wb-exercise" data-wb-id="${p.id}" data-wb-scope="${scope}"><header class="wb-heading"><div><span class="eyebrow">ORIGINAL WORD-BOX PRACTICE · ${p.id}</span><h2>${esc(p.title)}</h2></div><nav aria-label="Practice mode">${['study','exam'].map(m=>`<button class="outline-btn ${w.mode===m?'active':''}" data-wb-mode="${m}" aria-pressed="${w.mode===m}">${m==='study'?'Study':'Exam practice'}</button>`).join('')}</nav></header><div class="wb-workspace"><aside class="wb-word-bank"><details open><summary>Word Bank · <span data-wb-available>${a.bankOrder.filter(t=>!Object.values(a.answers).some(v=>normalize(v)===normalize(t))).length}</span> available</summary><p>Choose a blank, then tap a word. Each term is single-use; some are unused.</p><div>${a.bankOrder.map(t=>`<button data-wb-word="${esc(t)}" class="${Object.values(a.answers).some(v=>normalize(v)===normalize(t))?'used':''}" ${a.submitted?'disabled':''}>${esc(t)}</button>`).join('')}</div></details></aside><div class="wb-reading"><div class="wb-prose">${p.segments.map(s=>typeof s==='string'?s.split('\n\n').map(esc).join('<br><br>'):(()=>{const b=p.blanks.find(b=>b.id===s.blank),ok=wbCorrect(b,a.answers[b.id]);return `<span class="wb-inline ${a.submitted?(ok?'correct':'wrong'):''}"><label><span class="wb-number">${p.blanks.indexOf(b)+1}</span><input data-wb-blank="${b.id}" value="${esc(a.answers[b.id]||'')}" aria-label="Blank ${p.blanks.indexOf(b)+1} of ${p.blanks.length}" style="--blank-width:${Math.min(28,Math.max(12,b.answer.length+2))}ch" autocomplete="off" ${a.submitted?'readonly':''}></label>${a.submitted?`<small>${ok?'✓ Correct':'× Correct: '+esc(b.answer)}</small>`:''}</span>`;})()).join('')}</div><footer class="wb-submit"><span data-wb-count>${filled} / ${p.blanks.length} filled</span>${!a.submitted?`<button class="solid-btn" data-wb-submit>Check the whole passage</button><p class="wb-empty-notice" role="status" hidden></p><button class="outline-btn" data-wb-submit-anyway hidden>Submit anyway</button>`:`<div class="wb-result" role="status" aria-live="polite"><strong>${a.lastScore} / ${p.blanks.length} correct</strong><p>${Math.round(a.lastScore/p.blanks.length*100)}% · Attempt ${a.attempts.length} · Best ${a.bestScore}/${p.blanks.length}</p></div><button class="outline-btn" data-wb-retry>Retry the full passage</button>`}</footer></div></div>${a.submitted?`<section class="wb-review"><h2>Review your answers</h2>${p.blanks.map((b,i)=>{const ok=wbCorrect(b,a.answers[b.id]);return `<details ${ok?'':'open'}><summary>${i+1}. ${ok?'✓ Correct':'× Incorrect'} · ${esc(b.answer)}</summary><p>Your answer: ${esc(a.answers[b.id]||'— Empty')}<br>Correct: <b>${esc(b.answer)}</b></p><h4>Why it fits</h4><p>${esc(b.explanation)}</p><h4>Why not ${esc(b.closestDistractor)}?</h4><p>${esc(b.whyNot)}</p><small class="source-tag">[Textbook foundation · Unit ${b.unit} · ${esc(F.units.find(u=>u.num===b.unit).title)} · ${esc(b.sourceClass)}]</small><div>${wbLinks(b)}</div></details>`;}).join('')}</section>`:''}${scope==='bank'?`<nav class="question-pagination"><a class="outline-btn" href="#final/gaps/${F.wordBox[(F.wordBox.indexOf(p)+15)%16].id}">← Previous</a><a href="#final/gaps">${F.wordBox.indexOf(p)+1} / 16 · Bank</a><a class="outline-btn" href="#final/gaps/${F.wordBox[(F.wordBox.indexOf(p)+1)%16].id}">Next →</a></nav>`:''}</section>`;
  }
  function wbAssign(panel,id,value) {
    const p=F.wordBox.find(p=>p.id===panel.dataset.wbId),a=wbAttempt(p,panel.dataset.wbScope);if(a.submitted)return;
    if(value.trim()) Object.keys(a.answers).forEach(k=>{if(k!==id&&normalize(a.answers[k])===normalize(value)){a.answers[k]='';const input=panel.querySelector(`[data-wb-blank="${k}"]`);if(input)input.value='';}});
    a.answers[id]=value;a.active=id;
    const input=panel.querySelector(`[data-wb-blank="${id}"]`);if(input)input.value=value;
    panel.querySelectorAll('[data-wb-word]').forEach(e=>e.classList.toggle('used',Object.values(a.answers).some(v=>normalize(v)===normalize(e.dataset.wbWord))));
    panel.querySelector('[data-wb-available]').textContent=a.bankOrder.filter(t=>!Object.values(a.answers).some(v=>normalize(v)===normalize(t))).length;
    panel.querySelector('[data-wb-count]').textContent=p.blanks.filter(b=>a.answers[b.id]?.trim()).length+' / '+p.blanks.length+' filled';saveState();
  }
  function wbSubmit(panel,anyway=false) {
    const p=F.wordBox.find(p=>p.id===panel.dataset.wbId),a=wbAttempt(p,panel.dataset.wbScope);if(a.submitted)return;
    const empty=p.blanks.filter(b=>!a.answers[b.id]?.trim()).length;
    if(empty&&!anyway){const n=panel.querySelector('.wb-empty-notice');n.hidden=false;n.textContent=`You still have ${empty} blanks empty.`;panel.querySelector('[data-wb-submit-anyway]').hidden=false;return;}
    const now=Date.now(),w=wbState();let score=0;
    for(const b of p.blanks){const ok=wbCorrect(b,a.answers[b.id]);if(ok)score++;
      if(!ok){const m=w.mistakes[b.vocabId]||{wrongCount:0,passages:[]};m.wrongCount++;m.lastWrongAt=now;m.unresolved=true;if(!m.passages.includes(p.id))m.passages.push(p.id);w.mistakes[b.vocabId]=m;}else if(w.mistakes[b.vocabId]){w.mistakes[b.vocabId].unresolved=false;w.mistakes[b.vocabId].lastCorrectAt=now;}}
    a.submitted=true;a.lastScore=score;a.bestScore=Math.max(a.bestScore,score);a.attempts.push({submittedAt:now,score,answers:{...a.answers}});saveState();render();
  }
  function finalTheory(unit, returnRoute) {
    return `<section class="final-surface theory-reading"><span class="eyebrow">UNIT ${unit.num} · CONCEPT REFERENCE</span><h2>${esc(unit.title)}</h2><p>Paraphrased textbook foundations. Applications below are original learning examples.</p>${unit.concepts.map(c=>{
      const related=unit.situations.filter(q=>q.relatedTheory.includes(c.id));
      return `<section id="${c.id}" class="concept-section" tabindex="-1"><h3>${esc(c.title)}</h3>${c.bigIdea?`<p class="big-idea"><b>Big idea</b> ${esc(c.bigIdea)}</p>`:''}<p>${esc(c.body)}</p>${c.steps?`<h4>How it works</h4><ol class="theory-process">${c.steps.map(x=>`<li>${esc(x)}</li>`).join('')}</ol>`:''}${c.example?`<p class="theory-application"><b>Original application</b><br>${esc(c.example)}</p>`:''}${c.confusion?`<p><b>Common confusion</b><br>${esc(c.confusion)}</p>`:''}${finalSource(c.source)}${related.length?`<nav class="concept-practice" aria-label="Practice this concept">${related.map(q=>`<a class="theory-link" href="#final/concepts/${unit.num}/${q.id}">Practice this concept · ${esc(q.id)} →</a>`).join('')}</nav>`:''}</section>`;
    }).join('')}<h2>Distinguish before deciding</h2>${unit.distinctions.map(c=>`<section class="distinction"><h3>${esc(c.a)} <span>vs</span> ${esc(c.b)}</h3><p>${esc(c.difference)}</p><div><p><b>${esc(c.a)}</b><br>${esc(c.whenA)}</p><p><b>${esc(c.b)}</b><br>${esc(c.whenB)}</p></div>${finalSource(c.source)}</section>`).join('')}<h2>Common traps</h2><ul class="trap-list">${unit.traps.map(t=>`<li>${esc(t.body)}${finalSource(t.source)}</li>`).join('')}</ul>${learningReturn?`<a class="solid-btn" href="#${returnRoute}">Return to the same question →</a>`:''}</section>`;
  }
  function examMaterial(q) {
    const doc=q.document;
    let document="";
    if(doc?.kind==="bill") document=`<section class="commercial-paper bill-paper"><header><span>No. ${esc(doc.reference)}</span><span>${esc(doc.date)}</span></header><h4>${esc(doc.title)}</h4><div class="bill-value">For <strong>${esc(doc.amount)}</strong></div><p class="bill-order">At <u>${esc(doc.tenor)}</u>, pay to the order of<br><strong>${esc(doc.payee)}</strong><br>the sum of <u>${esc(doc.amountWords)}</u>.</p><footer><div><small>To</small><strong>${esc(doc.drawee)}</strong></div><div class="document-signature"><strong>${esc(doc.issuer)}</strong><span class="signature-mark" aria-hidden="true">LW</span><small>Authorized signature</small></div></footer><small class="document-disclaimer">Original educational representation · not a negotiable instrument</small></section>`;
    else if(doc?.kind==="collection") document=`<section class="commercial-paper letter-paper"><header><strong>${esc(doc.sender)}</strong><span>${esc(doc.date)}</span></header><h4>${esc(doc.title)}</h4><p class="document-reference">Reference ${esc(doc.reference)} · To ${esc(doc.recipient)}</p><p class="document-body">${esc(doc.body)}</p><div class="enclosures"><small>Enclosures</small><ul>${doc.enclosures.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div><footer><span>${esc(doc.signature)}</span><small>Original educational document</small></footer></section>`;
    else if(doc?.kind==="credit") document=`<section class="commercial-paper credit-paper"><header><span>Reference ${esc(doc.reference)}</span><span>${esc(doc.date)}</span></header><h4>${esc(doc.title)}</h4><dl>${doc.fields.map(([k,v])=>`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl><p class="document-body">${esc(doc.body)}</p><footer><span>${esc(doc.signature)}</span><small>Original educational excerpt</small></footer></section>`;
    else if(doc) document=`<section class="exam-document"><h4>${esc(doc.title)}</h4><dl>${doc.fields.map(([k,v])=>`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl></section>`;
    const table=q.table?`<div class="exam-table-scroll" tabindex="0" role="region" aria-label="${esc(q.table.caption)}"><table class="exam-table"><caption>${esc(q.table.caption)}</caption><thead><tr>${q.table.columns.map(h=>`<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${q.table.rows.map(row=>`<tr>${row.map((v,i)=>i?`<td>${esc(v)}</td>`:`<th scope="row">${esc(v)}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`:'';
    return document+table;
  }
  function finalSituation(q, unit, prefix = "") {
    // Legacy storage IDs preserve existing drafts and reviewed flags.
    const key=prefix+(q.legacyId || q.id);
    const questions=q.subquestions || [q.question];
    const theory=q.relatedTheory.map(id=>{const c=unit.concepts.find(c=>c.id===id);return `<button class="theory-link" data-related-theory="final/theory/${unit.num}/${id}">${esc(c.title)} ↗</button>`;}).join('');
    return `<article id="question-${prefix}${q.id}" class="scenario-sheet exam-question" data-short-card><span class="eyebrow">EXAM-STYLE PRACTICE · ${esc(q.id)}</span><h3>${esc(q.title)}</h3>${q.subquestions?`<p class="scenario-question">${esc(q.question)}</p>`:''}${examMaterial(q)}<div class="case-questions">${questions.map((text,i)=>`<section><h4>${q.subquestions?String.fromCharCode(97+i)+'. ':''}${esc(text)}</h4>${finalDraft(key+(i?'-part-'+i:''),q.subquestions?'Your answer · '+String.fromCharCode(97+i):'Your answer',3)}</section>`).join('')}</div><div class="answer-controls"><button class="solid-btn" data-reveal-answer>Reveal model answer</button></div><div class="model-answer" hidden><small>MODEL ANSWER · SUGGESTED RESPONSE</small>${(q.answers || [q.answer]).map((answer,i)=>`<p>${q.answers?`<b>${String.fromCharCode(97+i)}.</b> `:''}${esc(answer)}</p>`).join('')}<button class="outline-btn" data-show-explanation aria-expanded="false">Show explanation</button><div class="answer-explanation" hidden><h4>Explanation</h4><p>${esc(q.explanation)}</p><div class="reasoning-steps"><span>Identify</span><span>Apply</span><span>Explain why</span><span>Distinguish</span></div><p>Review the decisive clue, apply the concept and check why another interpretation does not fit.</p>${finalSource(q.source)}<h4>Review related theory</h4>${theory}</div></div><div class="review-action">${finalDone(key)}</div></article>`;
  }
  function finalWriting(w,index,prefix="") {
    const list=items=>`<ul>${items.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`;
    return `<div class="writing-workspace"><section class="writing-desk"><span class="eyebrow">LECTURER PROMPT · WORDING PRESERVED</span><h2 class="essay-prompt">${esc(w.prompt)}</h2><p><b>${esc(w.type)}</b></p><h3>Understand the question</h3><p>${esc(w.interpretation)}</p>${finalDraft(prefix+'writing-'+index,'Your planning and writing space',16)}${finalDone(prefix+'writing-'+index)}<details><summary>Example thesis and introduction</summary><small>ORIGINAL WRITING SUPPORT · NOT A MODEL TO MEMORISE</small><h3>Possible thesis</h3><p>${esc(w.thesis)}</p><h3>Example introduction</h3><p>${esc(w.introduction)}</p></details><details><summary>Body-paragraph ideas and example conclusion</summary>${list(w.bodyIdeas)}<h3>Example conclusion</h3><p>${esc(w.conclusion)}</p></details></section><aside class="writing-support"><h3>A guide beside your page</h3><p>Build your own position. These are possible arguments, not an official answer key.</p><details open><summary>Textbook foundations</summary>${w.textbook.map(c=>`<p>${esc(c.text)}</p>${finalSource(c.source)}`).join("")}</details><details><summary>Context and evidence</summary><p>${esc(w.context)}</p>${w.evidence.map(e=>`<section class="evidence"><a href="${esc(e.url)}" target="_blank" rel="noopener noreferrer">[Outside source · ${esc(e.name)} · ${esc(e.date)}] ↗</a><p>${esc(e.text)}</p></section>`).join("")}${w.videos.length?`<h4>Lecturer-provided references</h4><p>Video content/transcripts could not be accessed. No arguments here are attributed to these videos. Topic 2's supplied image gives a URL but no title.</p>${w.videos.map((v,i)=>`<a class="video-link" href="https://www.youtube.com/watch?v=${v}" target="_blank" rel="noopener noreferrer">Lecturer reference ${i+1} · ${v} ↗</a>`).join("")}`:''}</details><details open><summary>Possible arguments</summary>${list(w.arguments)}</details><details><summary>Counterarguments and qualifications</summary>${list(w.counterarguments)}</details><details open><summary>Structure and detailed outline</summary><p>${esc(w.structure)}</p><ol>${w.outline.map(x=>`<li>${esc(x)}</li>`).join("")}</ol></details><details><summary>Academic vocabulary and sentence frames</summary>${list(w.vocabulary)}${list(w.frames)}</details></aside></div>`;
  }
  function finalPage() {
    const [,mode = "overview",rawId = "1",rawItem = "0"] = currentRoute().split("/");
    const links = [["final", "Overview"], ["final/vocabulary/1", "01 · Vocabulary"], ["final/gaps", "Words in context"], ["final/concepts/2", "02 · Situations"], ["final/writing/1", "03 · Writing"], ["final/sets/1", "Practice sets"]];
    let content = "", title = "Prepare with purpose.";
    const selected = Number(rawId);
    const unit = F.units.find(u=>u.num===selected && (!["concepts","theory"].includes(mode)||[2,4,5,6,7,8].includes(u.num))) || F.units[mode === "concepts" || mode === "theory" ? 1 : 0];
    const unitNav = (core=false) => `<nav class="unit-pills" aria-label="Choose unit">${F.units.filter(u=>!core||[2,4,5,6,7,8].includes(u.num)).map(u=>`<a class="${u.num===unit.num?'active':''}" href="#final/${mode}/${u.num}" title="${esc(u.title)}">Unit ${u.num}</a>`).join("")}</nav>`;
    if (mode === "vocabulary") {
      title = "Words for the world of business.";
      content = `${unitNav()}<section class="final-surface"><span class="eyebrow">UNIT ${unit.num}</span><h2>${esc(unit.title)}</h2><p>Selected vocabulary from key-term sections and readings. Meanings are paraphrased; examples are original study material.</p><label class="inline-search"><span>Find a term</span><input type="search" id="finalTermFilter" placeholder="Search this unit"></label><div class="final-glossary">${unit.vocabulary.map(v=>`<article id="${vocabularyId(unit.num,v.term)}" class="vocabulary-entry" tabindex="-1" data-final-term="${esc(normalize(v.term+' '+v.meaning+' '+v.vi))}"><span class="eyebrow">${esc(v.origin)}</span><h3>${esc(v.term)}</h3><p>${esc(v.meaning)} <span class="translation">(${esc(v.vi)})</span></p><p class="original-example"><small>ORIGINAL EXAMPLE</small>${esc(v.example)}</p><small>Related phrase: ${esc(v.collocation)}</small>${finalSource(v.source)}${F.wordBox.find(p=>p.blanks.some(b=>b.unit===unit.num && normalize(b.answer)===normalize(v.term)))?`<a class="theory-link" href="#final/gaps/${F.wordBox.find(p=>p.blanks.some(b=>b.unit===unit.num && normalize(b.answer)===normalize(v.term))).id}">Practice this word →</a>`:""}</article>`).join("")}</div>${finalDone('vocabulary-'+unit.num)}</section>`;
    } else if (mode === "gaps") {
      title = "Words in context.";
      const passage=F.wordBox.find(p=>p.id===rawId);
      content=passage?finalGap(passage):wbLanding();
    } else if (mode === "concepts") {
      title = "From concept to decision.";
      const found=unit.situations.findIndex(q=>q.id===rawItem || q.legacyId===rawItem);
      const index=found>=0?found:Math.max(0,Math.min(Number(rawItem)||0,unit.situations.length-1)), q=unit.situations[index];
      content = `${unitNav(true)}<h2>Unit ${unit.num} — ${esc(unit.title)}</h2><div class="situation-workspace"><aside class="concept-reference"><span class="eyebrow">QUESTION INDEX</span><p>Attempt the case first. The model answer opens a separate explanation and related theory.</p><nav class="scenario-nav" aria-label="Situations">${unit.situations.map((x,i)=>`<a class="${i===index?'active':''}" href="#final/concepts/${unit.num}/${x.id}"><span>${String(i+1).padStart(2,'0')}</span>${esc(x.id)}</a>`).join('')}</nav></aside><div>${finalSituation(q,unit)}<div class="question-pagination">${index>0?`<a class="outline-btn" href="#final/concepts/${unit.num}/${unit.situations[index-1].id}">← Previous</a>`:'<span></span>'}<span>${index+1} / ${unit.situations.length} cases</span>${index<unit.situations.length-1?`<a class="outline-btn" href="#final/concepts/${unit.num}/${unit.situations[index+1].id}">Next →</a>`:'<span></span>'}</div></div>`;
    } else if (mode === "theory") {
      title = "Understand the decision.";
      content = finalTheory(unit,learningReturn || `final/concepts/${unit.num}/${rawItem}`);
    } else if (mode === "writing") {
      title = "Make room for an argument.";
      const index=Math.max(0,Math.min(selected-1,F.writing.length-1));
      content = `<nav class="unit-pills" aria-label="Writing topics">${F.writing.map((w,i)=>`<a class="${i===index?'active':''}" href="#final/writing/${i+1}">Topic ${i+1}</a>`).join("")}</nav>${finalWriting(F.writing[index],index+1)}`;
    } else if (mode === "sets") {
      title = "Bring it all together.";
      const set=F.sets[Math.max(0,Math.min(selected-1,F.sets.length-1))];
      content = set ? `<nav class="unit-pills" aria-label="Practice sets">${F.sets.map((x,i)=>`<a class="${x===set?'active':''}" href="#final/sets/${i+1}">Set ${i+1}</a>`).join("")}</nav><section class="practice-heading"><span class="eyebrow">ORIGINAL PRACTICE · NOT AN OFFICIAL PAPER</span><h2>${esc(set.title)}</h2><p>${esc(F.editorialNote)}</p><nav><a href="#" data-practice-jump="set-part1">01 Word box ↓</a><a href="#" data-practice-jump="set-part2">02 Situations ↓</a><a href="#" data-practice-jump="set-part3">03 Writing ↓</a></nav></section><section id="set-part1"><h2>Part 1 · Word-box gap-fill</h2>${set.passageIds.map(id=>finalGap(F.wordBox.find(p=>p.id===id),'set'+selected)).join("")}</section><section id="set-part2"><h2>Part 2 · Apply core concepts</h2>${set.situations.map(x=>{const u=F.units.find(u=>u.num===x.unit);return finalSituation(u.situations.find(q=>q.id===x.questionId),u,'set'+selected+'-');}).join("")}</section><section id="set-part3"><h2>Part 3 · Writing</h2>${set.alternativeWriting?`<p>Optional additional study prompt: <a class="theory-link" href="#final/writing/${set.alternativeWriting}">Topic ${set.alternativeWriting} · trade liberalization →</a>. This is an extra preparation option, not an official exam choice rule.</p>`:""}${finalWriting(F.writing[set.writing-1],set.writing,'set'+selected+'-')}</section>` : '';
    } else {
      content = `<section class="final-overview"><div><span class="eyebrow">YOUR FINAL REVIEW</span><h2>Knowledge becomes useful<br><em>when you can apply it.</em></h2><p>Move from vocabulary to decisions, then develop a reasoned argument. This review follows the lecturer's scope.</p><a class="solid-btn" href="#final/concepts/2">Start situation practice ↗</a></div><img src="${MASCOTS.flower}" alt="Ruồi Lùn, your study companion"></section><div class="final-scope"><article><span>01 / RECOGNISE</span><h3>Words in context</h3><p>All ten units. Vocabulary and reading-derived language, followed by 16 continuous Word-box passages with 134 inline blanks.</p><a href="#final/gaps">Open Words in Context →</a></article><article><span>02 / APPLY</span><h3>Explain a decision</h3><p>Only Units 2, 4, 5, 6, 7 and 8. Identify → apply → explain → distinguish alternatives.</p><a href="#final/concepts/2">Work through situations →</a></article><article><span>03 / ARGUE</span><h3>Build your position</h3><p>Four lecturer prompts. Interpretation, concepts, arguments, counterarguments and writing support.</p><a href="#final/writing/1">Open writing workspace →</a></article></div><section class="final-surface"><h2>Scope and source notes</h2><p>${esc(F.editorialNote)}</p><p>Units 1, 3, 9 and 10 are excluded from Part 2 only. They remain in Part 1 and may inform writing.</p><p>Final review progress: <strong>${Object.values(finalState().done).filter(Boolean).length}</strong> activities marked reviewed. This is separate from the original course progress.</p>${F.notes.map(n=>`<details><summary>${esc(n.title)}</summary><p>${esc(n.body)}</p>${finalSource(n.source)}</details>`).join("")}</section>`;
    }
    return page({eyebrow:"FINAL EXAM REVIEW",title,lead:"Textbook foundations · original practice · thoughtful writing",className:`final-page final-${mode === "overview" ? "home" : mode}`,body:`<nav class="final-nav" aria-label="Final review">${links.map(([r,t])=>`<a class="${(mode==='overview'&&r==='final')||r.split('/')[1]===mode?'active':''}" href="#${r}">${t}</a>`).join("")}</nav>${content}`});
  }

  function render() {
    const route = currentRoute();
    const preserveScroll = render.lastRoute === route;
    const returning=!!learningReturn && route===learningReturn;
    const returnOrigin=returning?learningOrigin:"";
    if(learningReturn && route!==learningReference) { learningReturn=""; learningReference=""; learningOrigin=""; }
    if (!preserveScroll) rememberLearningRoute();
    const previousScroll = window.scrollY || 0;
    clearInterval(timerHandle);
    let html;
    if (route === "dashboard") html = dashboard();
    else if (route === "final" || route.startsWith("final/")) html = finalPage();
    else if (route === "learn") html = learnHome();
    else if (route.startsWith("unit/")) { const [,unitId,tab] = route.split("/"); html = unitPage(unitId,tab || "theory"); }
    else if (route === "flashcards") html = flashcards();
    else if (route === "gaps") html = gapFilling();
    else if (route === "practice") html = practice();
    else if (route === "essay") html = essayLibrary();
    else if (route === "mock-test") html = mockHome();
    else if (route === "donate") html = donatePage();
    else if (route === "progress") html = progressPage();
    else html = dashboard();
    app.innerHTML = html;
    app.dataset.view = route;
    if (learningReturn && (route.includes("/theory") || route.startsWith("final/theory/") || route.startsWith("final/vocabulary/"))) {
      const banner=document.createElement("div"); banner.className="learning-return";
      banner.innerHTML=`<span>You opened this reference from a question.</span><button class="solid-btn" data-route="${esc(learningReturn)}">← Return to the same question</button>`;
      app.querySelector(".page")?.prepend(banner);
    }
    const snapshot=!preserveScroll && route!=="flashcards" && learningSnapshots.get(route);
    if (snapshot) {
      app.querySelectorAll("input,textarea,select").forEach((e,i)=>{if(!e.matches("[data-wb-blank]") && snapshot.fields[i]){e.value=snapshot.fields[i].value;e.checked=snapshot.fields[i].checked;e.className=snapshot.fields[i].className;if(snapshot.fields[i].invalid!==null)e.setAttribute("aria-invalid",snapshot.fields[i].invalid);}});
      app.querySelectorAll(".model-answer,.answer-explanation,.essay-outline,.gap-feedback,.final-gap-feedback").forEach((e,i)=>{const saved=snapshot.panels[i];if(saved){e.hidden=saved.hidden;e.innerHTML=saved.html;e.className=saved.className;}});
      app.querySelectorAll("[data-show-explanation]").forEach(e=>{const open=!e.parentElement.querySelector(".answer-explanation").hidden;e.textContent=open?"Hide explanation":"Show explanation";e.setAttribute("aria-expanded",String(open));});
      app.querySelectorAll("details").forEach((e,i)=>{if(!e.closest("[data-wb-id]"))e.open=!!snapshot.details[i];});
      app.querySelectorAll("[data-reveal-answer]").forEach(e=>{e.textContent=e.closest("[data-short-card]").querySelector(".model-answer").hidden?"Reveal model answer":"Hide model answer";});
    }
    document.querySelectorAll(".desktop-nav a").forEach(a => { const active = route.split("/")[0] === a.hash.slice(1); a.classList.toggle("active", active); if (active) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    document.body.classList.remove("menu-open");
    document.getElementById("menuButton").setAttribute("aria-expanded","false");
    updateHeaderProgress();
    app.focus({preventScroll:true});
    window.scrollTo({top:preserveScroll ? previousScroll : snapshot ? snapshot.scroll : 0,behavior:"auto"});
    const targetId=route.startsWith("final/gaps/") && route.split("/")[3] ? "exercise-"+route.split("/")[3] : route.startsWith("final/vocabulary/") || route.startsWith("final/theory/") || /^unit\/[^/]+\/(theory|terms)\//.test(route) ? route.split("/")[3] : /^unit\/[^/]+\/short\//.test(route) ? "question-"+route.split("/")[3] : "";
    if (targetId && (targetId.startsWith("theory-") || targetId.startsWith("question-") || targetId.startsWith("vocab-") || targetId.startsWith("exercise-"))) {
      const target=document.getElementById(targetId);
      if (target) { target.classList.add("theory-target"); target.scrollIntoView({block:"start",behavior:"auto"}); target.focus({preventScroll:true}); }
    } else if (returning && returnOrigin) {
      document.getElementById(returnOrigin)?.scrollIntoView({block:"start",behavior:"auto"});
    }
    render.lastRoute = route;
  }

  function searchIndex() {
    const rows = [];
    D.units.forEach(unit => {
      rows.push({type:"Unit",title:`Unit ${unit.num} · ${unit.title}`,text:unit.summary,route:`unit/${unit.id}/theory`});
      unit.theories.forEach((item,i) => rows.push({type:"THEORY",title:`U${unit.num} · ${item.title}`,text:`${item.body} ${item.points.join(" ")}`,route:`unit/${unit.id}/theory/${F.legacyTheory[unit.num][i]}`}));
      unit.terms.forEach(term => rows.push({type:`Unit ${unit.num} · Key term`,title:term[0],text:`${term[1]} ${term[2]}`,route:`unit/${unit.id}/terms`}));
      unit.gaps.forEach(item => rows.push({type:`Unit ${unit.num} · Gap filling`,title:item.answer,text:item.prompt,route:`unit/${unit.id}/gaps`}));
      unit.shortAnswers.forEach(item => {const support=legacySupport(unit,item); rows.push({type:"QUESTION",title:`${support.id} · ${item.q}`,text:item.a,route:`unit/${unit.id}/short/${support.id}`});});
      unit.essays.forEach(item => rows.push({type:`Unit ${unit.num} · Essay`,title:item.prompt,text:`${item.thesis} ${item.outline.join(" ")}`,route:`unit/${unit.id}/essay`}));
    });
    F.units.forEach(u => {
      u.vocabulary.forEach(v=>rows.push({type:`Final · Unit ${u.num}`,title:v.term,text:v.meaning,route:`final/vocabulary/${u.num}/${vocabularyId(u.num,v.term)}`}));
      u.concepts.forEach(c=>rows.push({type:"THEORY",title:`U${u.num} · ${c.title}`,text:c.body,route:`final/theory/${u.num}/${c.id}`}));
      u.situations.forEach(q=>rows.push({type:"QUESTION",title:`${q.id} · ${q.title}`,text:q.question+' '+(q.subquestions || []).join(' '),route:`final/concepts/${u.num}/${q.id}`}));
    });
    F.wordBox.forEach(p=>rows.push({type:"WORD BOX",title:p.id+" · "+p.title,text:p.level+" · "+p.blanks.length+" blanks · Original contextual practice",keywords:p.blanks.map(b=>b.answer).join(' '),route:'final/gaps/'+p.id}));
    allTerms.forEach(t=>rows.push({type:"FLASHCARD",title:t.term,text:'Unit '+t.unit.num+' · Active recall',route:'flashcards',termKey:t.key}));
    F.writing.forEach((w,i)=>rows.push({type:"Final writing",title:w.prompt,text:w.interpretation,route:`final/writing/${i+1}`}));
    return rows;
  }
  const searchRows = searchIndex();
  function renderSearch(query) {
    const target = document.getElementById("searchResults");
    const q = normalize(query);
    if (!q) { target.innerHTML = `<div class="search-empty">Nhập thuật ngữ, khái niệm hoặc câu hỏi cần tìm.</div>`; return; }
    const hits = searchRows.filter(row => normalize(`${row.title} ${row.text} ${row.keywords||""}`).includes(q)).slice(0,30);
    target.innerHTML = hits.length ? hits.map(row => `<button data-search-route="${row.route}" ${row.termKey?`data-wb-flash="${row.termKey}"`:""}><span>${esc(row.type)}</span><strong>${esc(row.title)}</strong><p>${esc(row.text.slice(0,150))}${row.text.length > 150 ? "…" : ""}</p></button>`).join("") : `<div class="search-empty">Không tìm thấy nội dung phù hợp.</div>`;
  }

  document.addEventListener("click", event => {
    if (event.target.closest("#searchButton")) {
      const dialog = document.getElementById("searchDialog");
      renderSearch(""); dialog.showModal();
      setTimeout(() => document.getElementById("searchInput").focus(), 0);
      return;
    }
    if (event.target.closest("#menuButton")) { const open=document.body.classList.toggle("menu-open"); document.getElementById("menuButton").setAttribute("aria-expanded",String(open)); return; }
    const jump = event.target.closest("[data-practice-jump]");
    if (jump) { event.preventDefault(); document.getElementById(jump.dataset.practiceJump)?.scrollIntoView({behavior:"smooth"}); return; }
    const wbPanel=event.target.closest('[data-wb-id]');
    const level=event.target.closest('[data-wb-level]');if(level){wbState().level=level.dataset.wbLevel;saveState();render();return;}
    const mode=event.target.closest('[data-wb-mode]');if(mode){wbState().mode=mode.dataset.wbMode;saveState();render();return;}
    const flash=event.target.closest('[data-wb-flash]');if(flash){document.getElementById("searchDialog").close();const t=allTerms.find(t=>t.key===flash.dataset.wbFlash);if(t){requestedFlashKey=t.key;openFlashScope(t.unit.id);}return;}
    if(wbPanel){const p=F.wordBox.find(p=>p.id===wbPanel.dataset.wbId),a=wbAttempt(p,wbPanel.dataset.wbScope);
      const word=event.target.closest('[data-wb-word]');if(word){const id=a.active||p.blanks.find(b=>!a.answers[b.id])?.id||p.blanks[0].id;wbAssign(wbPanel,id,word.dataset.wbWord);wbPanel.querySelector(`[data-wb-blank="${id}"]`).focus({preventScroll:true});if(innerWidth<=850)wbPanel.querySelector(".wb-word-bank details").open=false;return;}
      if(event.target.closest('[data-wb-submit],[data-wb-submit-anyway]')){wbSubmit(wbPanel,!!event.target.closest('[data-wb-submit-anyway]'));return;}
      if(event.target.closest('[data-wb-retry]')){a.answers={};a.submitted=false;a.active='';const previous=a.bankOrder.join('|');a.bankOrder=shuffle([...p.bank]);if(a.bankOrder.join('|')===previous)a.bankOrder.push(a.bankOrder.shift());saveState();render();return;}
    }
    const related = event.target.closest("[data-related-theory]");
    if (related) { event.preventDefault(); learningReturn=currentRoute(); learningReference=related.dataset.relatedTheory; learningOrigin=related.closest("[id^=question-],[id^=exercise-]")?.id || ""; routeTo(related.dataset.relatedTheory); return; }
    const finalMark = event.target.closest("[data-final-done]");
    if (finalMark) { const f=finalState(), key=finalMark.dataset.finalDone; f.done[key]=!f.done[key]; saveState(); finalMark.setAttribute("aria-pressed",String(f.done[key])); finalMark.textContent=f.done[key]?"✓ Reviewed · mark incomplete":"Mark reviewed"; return; }
    const routeButton = event.target.closest("[data-route]");
    if (routeButton) { routeTo(routeButton.dataset.route); return; }
    const complete = event.target.closest("[data-complete-unit]");
    if (complete) {
      const id = complete.dataset.completeUnit, index = state.completedUnits.indexOf(id);
      if (index >= 0) state.completedUnits.splice(index,1); else state.completedUnits.push(id);
      saveState(); render(); return;
    }
    const flashUnit = event.target.closest("[data-flash-unit]");
    if (flashUnit) { openFlashScope(flashUnit.dataset.flashUnit); return; }
    const gapUnitButton = event.target.closest("[data-gap-unit]");
    if (gapUnitButton) { state.gapUnit = gapUnitButton.dataset.gapUnit; state.gapIndex = 0; state.gapAnswer = ""; state.gapChecked = false; state.gapCorrect = false; saveState(); routeTo("gaps"); return; }
    if (event.target.closest("#flashCard")) { state.flashFlipped = !state.flashFlipped; saveState(); render(); return; }
    const tracker=event.target.closest("[data-flash-term]");
    if(tracker) { selectFlash(tracker.dataset.flashTerm);render();document.getElementById("flashCard")?.scrollIntoView({block:"center",behavior:"auto"});return; }
    const filter=event.target.closest("[data-flash-filter]");
    if(filter) { state.flashTrackerFilter=filter.dataset.flashFilter;saveState();render();return; }
    const flashStatus = event.target.closest("[data-flash-status]");
    if(flashStatus && flashSession?.current) {
      const key=flashSession.current;state.termStatus[key]=flashStatus.dataset.flashStatus;
      flashSession.queue=flashQueue();const next=flashSession.queue.find(k=>k!==key)||flashSession.queue[0]||"";
      if(next) selectFlash(next);else {flashSession.history.push(key);flashSession.current="";rememberFlash("");}
      render();return;
    }
    if(event.target.closest("#prevFlash")) { const key=flashSession.history.pop();if(key)selectFlash(key,false);render();return; }
    if(event.target.closest("#nextFlash")) { const q=flashSession.queue;if(q.length)selectFlash(q[(q.indexOf(flashSession.current)+1)%q.length]);render();return; }
    if(event.target.closest("#shuffleFlash") || event.target.closest("#reviewAllFlash")) {
      state.flashStudyMode=event.target.closest("#reviewAllFlash") || !flashPool().some(t=>termState(t.key)!=="mastered") ? "all":"unfinished";
      flashSession.queue=shuffle(flashQueue());if(flashSession.queue.length)selectFlash(flashSession.queue[0]);render();return;
    }
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
    const gapHintToggle = event.target.closest("[data-gap-hint-toggle]");
    if (gapHintToggle) {
      const holder = gapHintToggle.closest("article");
      const panel = holder?.querySelector("[data-gap-hint-box]");
      if (panel) {
        panel.hidden = !panel.hidden;
        gapHintToggle.textContent = panel.hidden ? "Hint" : "Hide hint";
      }
      return;
    }
    const explanationButton=event.target.closest("[data-show-explanation]");
    if(explanationButton) { const panel=explanationButton.parentElement.querySelector(".answer-explanation"); panel.hidden=!panel.hidden; explanationButton.textContent=panel.hidden?"Show explanation":"Hide explanation"; explanationButton.setAttribute("aria-expanded",String(!panel.hidden)); return; }
    const revealAnswer = event.target.closest("[data-reveal-answer]");
    if (revealAnswer) { const panel = revealAnswer.closest("[data-short-card]").querySelector(".model-answer"); panel.hidden = !panel.hidden; revealAnswer.textContent = panel.hidden ? "Reveal model answer" : "Hide model answer"; return; }
    const revealOutline = event.target.closest("[data-reveal-outline]");
    if (revealOutline) { const panel = revealOutline.parentElement.querySelector(".essay-outline"); panel.hidden = !panel.hidden; revealOutline.textContent = panel.hidden ? "Reveal thesis & outline" : "Hide thesis & outline"; return; }
    const midtermMode = event.target.closest("[data-midterm-mode]");
    if (midtermMode) { state.midtermMode = midtermMode.dataset.midtermMode; saveState(); render(); return; }
    if (event.target.closest("#randomShort")) { const pool = state.practiceUnit === "all" ? allShort : allShort.filter(item=>item.unit.id===state.practiceUnit); state.practiceIndex = Math.floor(Math.random()*pool.length); saveState(); render(); return; }
    if (event.target.closest("#prevShort")) { const pool = state.practiceUnit === "all" ? allShort : allShort.filter(item=>item.unit.id===state.practiceUnit); state.practiceIndex = (state.practiceIndex - 1 + pool.length) % pool.length; saveState(); render(); return; }
    if (event.target.closest("#nextShort")) { const pool = state.practiceUnit === "all" ? allShort : allShort.filter(item=>item.unit.id===state.practiceUnit); state.practiceIndex = (state.practiceIndex + 1) % pool.length; saveState(); render(); return; }
    if (event.target.closest("#startExam")) { const scope = document.querySelector('input[name="examScope"]:checked')?.value || "midterm"; createExam(scope); return; }
    if (event.target.closest("#submitExam")) { if (confirm("Submit this test now? Answers cannot be edited after submission.")) submitExam(false); return; }
    if (event.target.closest("#newExam")) { state.exam = null; saveState(); render(); return; }
    if (event.target.closest("#resetProgress")) { if (confirm("Xóa toàn bộ tiến độ và trạng thái flashcards trên trình duyệt này?")) { localStorage.removeItem(STORE); state = structuredClone(defaults); flashSession=null; learningSnapshots.clear(); learningReturn=""; learningReference=""; learningOrigin=""; render.lastRoute=currentRoute(); render(); } return; }
    const searchRoute = event.target.closest("[data-search-route]");
    if (searchRoute) { document.getElementById("searchDialog").close(); routeTo(searchRoute.dataset.searchRoute); return; }
  });

  document.addEventListener("change", event => {
    if (event.target.id === "unitSwitcher") routeTo(`unit/${event.target.value}/theory`);
    if (event.target.id === "flashUnit") { openFlashScope(event.target.value); }
    if (event.target.id === "gapUnit") { state.gapUnit = event.target.value; state.gapIndex = 0; state.gapAnswer = ""; state.gapChecked = false; state.gapCorrect = false; saveState(); render(); }
    if (event.target.id === "practiceUnit") { state.practiceUnit = event.target.value; state.practiceIndex = 0; saveState(); render(); }
    if (event.target.id === "essayUnit") { document.querySelectorAll("[data-essay-unit]").forEach(card => card.hidden = event.target.value !== "all" && card.dataset.essayUnit !== event.target.value); }
    if (event.target.id === "midtermUnit") { state.midtermUnit = event.target.value; saveState(); render(); }
    if (event.target.matches('input[name="examScope"]')) document.querySelectorAll(".scope-option").forEach(label => label.classList.toggle("selected", label.contains(event.target)));
    if (event.target.matches("[data-exam-essay-choice]")) { state.exam.essayChoice = Number(event.target.dataset.examEssayChoice); saveState(); document.querySelectorAll(".essay-choices label").forEach((label,index)=>label.classList.toggle("selected",index===state.exam.essayChoice)); }
  });

  document.addEventListener("focusin",event=>{if(event.target.matches('[data-wb-blank]')){const panel=event.target.closest('[data-wb-id]');wbAttempt(F.wordBox.find(p=>p.id===panel.dataset.wbId),panel.dataset.wbScope).active=event.target.dataset.wbBlank;panel.querySelectorAll('.wb-inline').forEach(e=>e.classList.toggle('active',e.contains(event.target)));}});
  document.addEventListener("input", event => {
    if(event.target.matches('[data-wb-blank]')) {wbAssign(event.target.closest('[data-wb-id]'),event.target.dataset.wbBlank,event.target.value);return;}
    if (event.target.matches("[data-final-draft]")) { finalState().drafts[event.target.dataset.finalDraft]=event.target.value; saveState(); }
    if (event.target.id === "finalTermFilter") { const q=normalize(event.target.value); document.querySelectorAll("[data-final-term]").forEach(row=>row.hidden=!row.dataset.finalTerm.includes(q)); }
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
  document.addEventListener("keydown", event => {
    if (event.key === "Enter" && event.target.id === "gapAnswer" && !state.gapChecked) { event.preventDefault(); document.querySelector("[data-check-gap]")?.click(); }
    if (event.key === "Enter" && event.target.matches("[data-unit-gap-input]")) { event.preventDefault(); event.target.closest("[data-unit-gap-card]").querySelector("[data-unit-gap-check]")?.click(); }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); document.getElementById("searchButton").click(); }
    if (event.key === "/" && !/input|textarea/i.test(document.activeElement.tagName)) { event.preventDefault(); document.getElementById("searchButton").click(); }
  });
  window.addEventListener("hashchange", render);
  render();
})();
