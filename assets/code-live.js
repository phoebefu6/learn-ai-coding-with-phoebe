/* ============================================================
   code-live.js - "The diff that lands"
   learn-ai-coding-with-phoebe

   Five real coding tasks. The code shown is really compiled and
   really executed against a real test suite in this page, and the
   pass or fail you see is the actual result, not a script.

   What the levers change is WHICH code you get back, which is the
   honest model of what changing your prompt actually does.
   Requires runner.js.
   ============================================================ */
(function () {
  "use strict";
  var R = window.LWP_RUNNER;

  /* Each task carries three real implementations and one real suite.
     sloppy  - what a bare ask tends to produce
     solid   - what an ask carrying spec and context tends to produce
     plausible - passes the shipped tests and is still wrong. This is
                 the one the accept-everything trap gives you, and it
                 is the whole reason the QA course exists. */
  var TASKS = [
    {
      id: "median", title: "median(nums)",
      spec: "Return the median. Even-length arrays average the middle two. An empty array returns null.",
      sloppy: [
        "function median(nums) {",
        "  var s = nums.slice().sort();",
        "  return s[Math.floor(s.length / 2)];",
        "}"
      ].join("\n"),
      solid: [
        "function median(nums) {",
        "  if (!nums.length) { return null; }",
        "  var s = nums.slice().sort(function (a, b) { return a - b; });",
        "  var mid = Math.floor(s.length / 2);",
        "  if (s.length % 2 === 0) { return (s[mid - 1] + s[mid]) / 2; }",
        "  return s[mid];",
        "}"
      ].join("\n"),
      plausible: [
        "function median(nums) {",
        "  if (!nums.length) { return null; }",
        "  var s = nums.slice().sort(function (a, b) { return a - b; });",
        "  var mid = Math.floor(s.length / 2);",
        "  if (s.length % 2 === 0) { return (s[mid - 1] + s[mid]) / 2; }",
        "  return s[mid];",
        "}"
      ].join("\n"),
      plausibleFlaw: "none in this task",
      tests: [
        'test("odd length", function () { eq(median([3,1,2]), 2); });',
        'test("even length averages the middle two", function () { eq(median([1,2,3,4]), 2.5); });',
        'test("sorts numerically, not as strings", function () { eq(median([10,9,8]), 9); });',
        'test("empty array returns null", function () { eq(median([]), null); });'
      ].join("\n")
    },
    {
      id: "formatBytes", title: "formatBytes(n)",
      spec: "Format a byte count. 0 gives \"0 B\". 1024 gives \"1 KB\". Round to one decimal place.",
      sloppy: [
        "function formatBytes(n) {",
        "  var u = ['B','KB','MB','GB'];",
        "  var i = Math.floor(Math.log(n) / Math.log(1024));",
        "  return Math.round(n / Math.pow(1024, i) * 10) / 10 + ' ' + u[i];",
        "}"
      ].join("\n"),
      solid: [
        "function formatBytes(n) {",
        "  if (n === 0) { return '0 B'; }",
        "  var u = ['B','KB','MB','GB'];",
        "  var i = Math.floor(Math.log(n) / Math.log(1024));",
        "  if (i >= u.length) { i = u.length - 1; }",
        "  var v = Math.round(n / Math.pow(1024, i) * 10) / 10;",
        "  return v + ' ' + u[i];",
        "}"
      ].join("\n"),
      plausible: [
        "function formatBytes(n) {",
        "  if (n === 0) { return '0 B'; }",
        "  var u = ['B','KB','MB','GB'];",
        "  var i = Math.floor(Math.log(n) / Math.log(1024));",
        "  var v = Math.round(n / Math.pow(1024, i) * 10) / 10;",
        "  return v + ' ' + u[i];",
        "}"
      ].join("\n"),
      plausibleFlaw: "no clamp, so a petabyte-sized number returns \"undefined\"",
      tests: [
        'test("zero", function () { eq(formatBytes(0), "0 B"); });',
        'test("bytes", function () { eq(formatBytes(512), "512 B"); });',
        'test("exactly one kilobyte", function () { eq(formatBytes(1024), "1 KB"); });',
        'test("one and a half megabytes", function () { eq(formatBytes(1572864), "1.5 MB"); });'
      ].join("\n"),
      hiddenTest: 'test("absurdly large input still formats", function () { ok(String(formatBytes(1e18)).indexOf("undefined") === -1, "no undefined unit"); });'
    },
    {
      id: "parseRange", title: "parseRange(str)",
      spec: "Parse \"3-7\" into [3,4,5,6,7]. A single number gives one element. Reversed input counts down.",
      sloppy: [
        "function parseRange(str) {",
        "  var p = str.split('-');",
        "  var out = [];",
        "  for (var i = +p[0]; i <= +p[1]; i++) { out.push(i); }",
        "  return out;",
        "}"
      ].join("\n"),
      solid: [
        "function parseRange(str) {",
        "  var p = String(str).split('-');",
        "  var a = Number(p[0]);",
        "  var b = p.length > 1 ? Number(p[1]) : a;",
        "  var out = [];",
        "  if (a <= b) { for (var i = a; i <= b; i++) { out.push(i); } }",
        "  else { for (var j = a; j >= b; j--) { out.push(j); } }",
        "  return out;",
        "}"
      ].join("\n"),
      plausible: [
        "function parseRange(str) {",
        "  var p = String(str).split('-');",
        "  var a = Number(p[0]);",
        "  var b = p.length > 1 ? Number(p[1]) : a;",
        "  var out = [];",
        "  for (var i = a; i <= b; i++) { out.push(i); }",
        "  return out;",
        "}"
      ].join("\n"),
      plausibleFlaw: "reversed ranges silently return an empty array instead of counting down",
      tests: [
        'test("a simple range", function () { eq(parseRange("3-7"), [3,4,5,6,7]); });',
        'test("a single number", function () { eq(parseRange("5"), [5]); });',
        'test("a two-element range", function () { eq(parseRange("1-2"), [1,2]); });'
      ].join("\n"),
      hiddenTest: 'test("a reversed range counts down", function () { eq(parseRange("7-5"), [7,6,5]); });'
    },
    {
      id: "retry", title: "retry(fn, times)",
      spec: "Call fn until it returns without throwing. Try at most `times` times in total. Rethrow the last error.",
      sloppy: [
        "function retry(fn, times) {",
        "  for (var i = 0; i < times; i++) {",
        "    try { return fn(); } catch (e) {}",
        "  }",
        "}"
      ].join("\n"),
      solid: [
        "function retry(fn, times) {",
        "  var last;",
        "  for (var i = 0; i < times; i++) {",
        "    try { return fn(); } catch (e) { last = e; }",
        "  }",
        "  throw last;",
        "}"
      ].join("\n"),
      plausible: [
        "function retry(fn, times) {",
        "  var last;",
        "  for (var i = 0; i <= times; i++) {",
        "    try { return fn(); } catch (e) { last = e; }",
        "  }",
        "  throw last;",
        "}"
      ].join("\n"),
      plausibleFlaw: "off by one, so it calls your API one more time than you asked for",
      tests: [
        'test("returns on first success", function () { var n=0; eq(retry(function(){ n++; return 7; }, 3), 7); eq(n, 1); });',
        'test("retries until it works", function () { var n=0; eq(retry(function(){ n++; if (n<3) { throw new Error("x"); } return n; }, 5), 3); });',
        'test("rethrows after giving up", function () { throws(function(){ retry(function(){ throw new Error("nope"); }, 2); }); });'
      ].join("\n"),
      hiddenTest: 'test("calls exactly the number of times asked", function () { var n=0; try { retry(function(){ n++; throw new Error("x"); }, 3); } catch (e) {} eq(n, 3); });'
    },
    {
      id: "slugify", title: "slugify(title)",
      spec: "Lowercase, spaces to single dashes, strip punctuation, and no leading or trailing dash.",
      sloppy: [
        "function slugify(title) {",
        "  return title.toLowerCase().replace(/ /g, '-');",
        "}"
      ].join("\n"),
      solid: [
        "function slugify(title) {",
        "  return String(title).toLowerCase()",
        "    .replace(/[^a-z0-9]+/g, '-')",
        "    .replace(/^-+/, '')",
        "    .replace(/-+$/, '');",
        "}"
      ].join("\n"),
      plausible: [
        "function slugify(title) {",
        "  return String(title).toLowerCase().replace(/[^a-z0-9]+/g, '-');",
        "}"
      ].join("\n"),
      plausibleFlaw: "leaves a trailing dash, so every URL ending in punctuation is subtly wrong",
      tests: [
        'test("lowercases and dashes", function () { eq(slugify("Hello World"), "hello-world"); });',
        'test("strips punctuation", function () { eq(slugify("A, B & C"), "a-b-c"); });',
        'test("collapses repeats", function () { eq(slugify("a    b"), "a-b"); });'
      ].join("\n"),
      hiddenTest: 'test("no trailing dash", function () { eq(slugify("Ship it!"), "ship-it"); });'
    }
  ];

  var LEVERS = [
    { id: "spec", w: "spec", session: 1, name: "Write the spec before the prompt",
      why: "Edge cases you do not name are edge cases you do not get. Empty inputs, reversed ranges and exact boundaries are all decisions, and if you skip them the model picks for you." },
    { id: "context", w: "context", session: 2, name: "Give it the surrounding code and conventions",
      why: "Without your existing code it writes plausible generic code, which is how you end up with three different date helpers." },
    { id: "testsfirst", w: "tests", session: 3, name: "Write the tests first",
      why: "A test written before the code describes the behaviour you want. A test written after it describes the behaviour you got." },
    { id: "review", w: "review", session: 3, name: "Read the diff before accepting",
      why: "The one step people skip, and the only one that catches code that is wrong in a way the tests do not cover." }
  ];
  var TRAP = { id: "acceptall", name: "Accept everything, it passes the tests",
    why: "This is the dangerous one, because the code really does pass. Green is evidence that the tests ran, not evidence that the code is right." };

  var state = { spec: false, context: false, testsfirst: false, review: false, acceptall: false };
  var current = 0;

  function variantFor(task) {
    if (state.acceptall) return { key: "plausible", code: task.plausible };
    /* The spec is what decides whether the edge cases get handled at all.
       Context is a separate axis: it decides whether the code looks like the
       rest of your codebase, which no test suite can tell you. */
    if (state.spec) return { key: "solid", code: task.solid };
    return { key: "sloppy", code: task.sloppy };
  }
  function suiteFor(task) {
    /* writing tests first means the edge cases are in the suite from the start */
    return state.testsfirst && task.hiddenTest ? task.tests + "\n" + task.hiddenTest : task.tests;
  }
  function scoreAll() {
    var pass = 0, rows = [];
    TASKS.forEach(function (t) {
      var v = variantFor(t);
      var r = R.runTests(v.code, suiteFor(t));
      var ok = !r.compileError && r.failed === 0 && r.total > 0;
      if (ok) pass++;
      rows.push({ task: t, variant: v, run: r, ok: ok });
    });
    return { pass: pass, total: TASKS.length, rows: rows };
  }

  function el(t, c, x) { var n = document.createElement(t); if (c) n.className = c; if (x != null) n.textContent = x; return n; }

  function mount(root) {
    if (!R) { root.appendChild(el("p", "cl-err", "runner.js did not load, so this playground cannot run.")); return; }

    var read = el("div", "cl-readout");
    var big = el("output", "cl-big", "0/5");
    var cap = el("span", "cl-cap", "");
    read.appendChild(big); read.appendChild(cap);
    root.appendChild(read);

    var picker = el("div", "cl-picker");
    picker.appendChild(el("span", "cl-plabel", "Task:"));
    TASKS.forEach(function (t, i) {
      var b = el("button", "cl-pick" + (i === 0 ? " on" : ""), t.title);
      b.addEventListener("click", function () {
        current = i;
        picker.querySelectorAll(".cl-pick").forEach(function (q) { q.classList.remove("on"); });
        b.classList.add("on"); paint();
      });
      picker.appendChild(b);
    });
    root.appendChild(picker);

    var stage = el("div", "cl-stage");
    root.appendChild(stage);

    var panel = el("div", "cl-panel");
    var ph = el("div", "cl-phead");
    ph.appendChild(el("b", null, "How you asked for it"));
    ph.appendChild(el("span", "cl-pnote", "the levers change which code comes back, and it really runs"));
    panel.appendChild(ph);
    LEVERS.concat([TRAP]).forEach(function (l) {
      var isTrap = l === TRAP;
      var row = el("label", "cl-lever" + (isTrap ? " trap" : ""));
      var cb = document.createElement("input");
      cb.type = "checkbox"; cb.dataset.id = l.id;
      row.appendChild(cb);
      var mid = el("div", "cl-lmid");
      mid.appendChild(el("b", null, l.name));
      mid.appendChild(el("span", "cl-why", l.why));
      row.appendChild(mid);
      if (l.session) row.appendChild(el("span", "cl-sess", "session " + l.session));
      cb.addEventListener("change", function () {
        state[l.id] = cb.checked;
        if (l.id === "acceptall" && cb.checked) {
          state.review = false;
          panel.querySelector('input[data-id="review"]').checked = false;
          panel.querySelector('input[data-id="review"]').closest(".cl-lever").classList.remove("on");
        }
        if (l.id === "review" && cb.checked) {
          state.acceptall = false;
          panel.querySelector('input[data-id="acceptall"]').checked = false;
          panel.querySelector('input[data-id="acceptall"]').closest(".cl-lever").classList.remove("on");
        }
        row.classList.toggle("on", cb.checked);
        paint();
      });
      panel.appendChild(row);
    });
    root.appendChild(panel);

    var rail = el("p", "cl-rail");
    rail.innerHTML = "<b>The code on this page is really executed.</b> Every pass and fail below is " +
      "the real result of compiling that function and running that suite in your browser. What the " +
      "levers model is which code a differently-worded ask tends to produce.";
    root.appendChild(rail);

    function paint() {
      var all = scoreAll();
      big.textContent = all.pass + "/" + all.total;
      big.className = "cl-big " + (all.pass === all.total ? "hi" : all.pass >= 3 ? "mid" : "lo");
      cap.textContent = "tasks whose tests pass first try, with no edit from you.";

      var t = TASKS[current], row = all.rows[current];
      stage.textContent = "";

      var spec = el("div", "cl-spec");
      spec.appendChild(el("b", null, "The task"));
      spec.appendChild(el("span", null, t.spec));
      stage.appendChild(spec);

      var grid = el("div", "cl-grid");
      var codeCol = el("div", "cl-cc");
      var lbl = el("div", "cl-vlabel");
      lbl.appendChild(el("span", "cl-vchip cl-" + row.variant.key,
        row.variant.key === "solid" ? "what a specified ask returns"
        : row.variant.key === "plausible" ? "passes the tests, and is wrong"
        : "what a bare ask returns"));
      codeCol.appendChild(lbl);
      var pre = el("pre", "cl-code");
      row.variant.code.split("\n").forEach(function (ln, i) {
        var r = el("span", "cl-line");
        r.appendChild(el("i", "cl-ln", String(i + 1)));
        r.appendChild(el("code", null, ln));
        pre.appendChild(r);
      });
      codeCol.appendChild(pre);
      grid.appendChild(codeCol);

      var resCol = el("div", "cl-rc");
      var suiteLabel = el("div", "cl-vlabel");
      suiteLabel.appendChild(el("span", "cl-vchip cl-suite",
        state.testsfirst && t.hiddenTest ? "your suite, written first" : "the suite as shipped"));
      resCol.appendChild(suiteLabel);
      var cases = el("div", "cl-cases");
      if (row.run.compileError) {
        cases.appendChild(el("p", "cl-err", row.run.compileError));
      } else {
        row.run.cases.forEach(function (c) {
          var cr = el("div", "cl-case " + (c.ok ? "ok" : "no"));
          cr.appendChild(el("b", null, c.ok ? "PASS" : "FAIL"));
          cr.appendChild(el("span", "cl-cn", c.name));
          if (!c.ok) cr.appendChild(el("span", "cl-cd", c.detail));
          cases.appendChild(cr);
        });
      }
      resCol.appendChild(cases);
      grid.appendChild(resCol);
      stage.appendChild(grid);

      if (!state.context) {
        var conv = el("p", "cl-conv");
        conv.innerHTML = "◐ <b>No test can catch this one.</b> Without your existing code in the " +
          "prompt, what comes back is generic rather than wrong: its own naming, its own error " +
          "style, its own helper. It passes, and your codebase gains a third way of doing this.";
        stage.appendChild(conv);
      }
      if (state.acceptall && t.plausibleFlaw !== "none in this task") {
        var warn = el("p", "cl-trap");
        warn.innerHTML = "⚠ <b>Every test passed and the code is still wrong.</b> " +
          t.plausibleFlaw.charAt(0).toUpperCase() + t.plausibleFlaw.slice(1) +
          ". The suite as shipped never asked, so nothing turned red. This is what green actually proves.";
        stage.appendChild(warn);
      } else if (state.testsfirst && t.hiddenTest) {
        var good = el("p", "cl-good");
        good.innerHTML = "✓ <b>The edge case is in the suite because you wrote it first.</b> " +
          "A test written after the code would have described whatever the code already did.";
        stage.appendChild(good);
      }
    }

    paint();
    window.CODE_LIVE = {
      tasks: TASKS, state: state,
      set: function (id, v) {
        var cb = panel.querySelector('input[data-id="' + id + '"]');
        cb.checked = v; cb.dispatchEvent(new Event("change"));
      },
      setAll: function (v) { ["spec","context","testsfirst","review"].forEach(function (k) {
        window.CODE_LIVE.set(k, v); }); window.CODE_LIVE.set("acceptall", false); },
      pick: function (i) { picker.querySelectorAll(".cl-pick")[i].click(); },
      score: function () { var a = scoreAll(); return a.pass + "/" + a.total; },
      detail: function () { return scoreAll().rows.map(function (r) {
        return r.task.title + " " + r.variant.key + " " + (r.ok ? "PASS" : "FAIL(" + r.run.failed + ")"); }); }
    };
  }

  var host = document.getElementById("code-live");
  if (host) mount(host);
})();
