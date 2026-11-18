// Mock replacement for the Laravel API. No dependencies; in-memory data.
// Run: node mock-api/server.mjs   (listens on http://localhost:8000)
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { seed } from "./seed.mjs";

const PORT = process.env.PORT || 8000;
const here = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.join(here, "storage");
const assetsDir = path.join(here, "assets"); // committed sample photos
fs.mkdirSync(uploadDir, { recursive: true });

const db = seed();
const nextId = (name) => Math.max(0, ...db[name].map((r) => +r.id || 0)) + 1;
const now = () => new Date().toISOString();

// ---- helpers ---------------------------------------------------------------
const send = (res, code, body, headers = {}) => {
  res.writeHead(code, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    ...headers,
  });
  res.end(JSON.stringify(body));
};
const ok = (res, extra = {}) =>
  send(res, 200, { success: true, status: true, message: "Success", ...extra });

async function readBody(req) {
  const type = req.headers["content-type"] || "";
  if (["GET", "HEAD", "DELETE"].includes(req.method) && !type) return {};
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const buf = Buffer.concat(chunks);
  if (!buf.length) return {};
  if (type.includes("application/json")) {
    try { return JSON.parse(buf.toString()); } catch { return {}; }
  }
  if (type.includes("multipart/form-data")) {
    const fd = await new Response(buf, { headers: { "content-type": type } }).formData();
    const out = {};
    for (const [k, v] of fd.entries()) {
      if (typeof v === "string") out[k] = v;
      else if (v.size) {
        const name = `${Date.now()}_${v.name.replace(/[^\w.-]/g, "_")}`;
        fs.writeFileSync(path.join(uploadDir, name), Buffer.from(await v.arrayBuffer()));
        out[k] = name;
      }
    }
    return out;
  }
  return Object.fromEntries(new URLSearchParams(buf.toString()));
}

function svgPlaceholder(label) {
  const text = decodeURIComponent(label).replace(/^\d+_/, "").replace(/\.[a-z0-9]+$/i, "").replace(/[_-]+/g, " ");
  const initials = text.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("") || "?";
  // brand palette: blue ramp with an orange accent, picked deterministically per name
  const pairs = [["#0a3472", "#145da0"], ["#10477b", "#1d7bbf"], ["#051d40", "#145da0"], ["#0a3472", "#2a6fb5"]];
  let h = 0;
  for (const ch of text) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const [c1, c2] = pairs[h % pairs.length];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
<rect width="400" height="400" fill="url(#g)"/>
<rect x="0" y="372" width="400" height="28" fill="#ffbd59"/>
<text x="200" y="228" font-family="Segoe UI,Arial,sans-serif" font-size="132" font-weight="700" fill="#fff" text-anchor="middle" letter-spacing="2">${initials}</text></svg>`;
}

// ---- generic CRUD ----------------------------------------------------------
// [collection, alias key used in create/update responses]
const crud = {
  categories: ["categories", "category"],
  topics: ["topics", "topic"],
  learningMaterials: ["learning_materials", "learningMaterial"],
  "learning-materials": ["learning_materials", "learningMaterial"],
  contacts: ["contacts", "contact"],
  socials: ["socials", "socials"],
  "job-opportunities": ["job_opportunities", "jobOpportunity"],
  "update-job-opportunities": ["job_opportunities", "jobOpportunity"],
  "ojt-companies": ["ojt_companies", "ojtCompany"],
  "update-ojt-companies": ["ojt_companies", "ojtCompany"],
  "tesda-categories": ["tesda_categories", "category"],
  "tesda-courses": ["tesda_courses", "course"],
  "add-tesda-courses": ["tesda_courses", "course"],
  "tesda-training-center": ["training_centers", "center"],
  "edit-training-center": ["training_centers", "center"],
  "delete-training-center": ["training_centers", "center"],
  "update-job": ["job_opportunities", "jobOpportunity"],
  "delete-referral": ["ojt_referrals", "referral"],
  "delete-application": ["ojt_applications", "application"],
  founders: ["founders", "founder"],
  "basic-info": ["basic_info", "basicInfo"],
};

const withRelations = {
  topics: (r) => ({ ...r, category: db.categories.find((c) => c.category_id == r.category_id)?.category ?? r.category }),
  learning_materials: (r) => ({
    ...r,
    topic: db.topics.find((t) => t.topic_id == r.topic_id) ?? null,
    category: db.categories.find((c) => c.category_id == r.category_id) ?? null,
  }),
  tesda_courses: (r) => ({ ...r, category: db.tesda_categories.find((c) => c.category_id == r.category_id) ?? null }),
};

function crudWrite(method, seg, id, body, res) {
  const [name, key] = crud[seg];
  const list = db[name];
  if (method === "DELETE") {
    const i = list.findIndex((r) => r.id == id);
    if (i >= 0) list.splice(i, 1);
    return ok(res, { message: "Deleted successfully" });
  }
  const clean = { ...body };
  delete clean._method;
  if (id) {
    const row = list.find((r) => r.id == id);
    if (!row) return send(res, 404, { success: false, message: "Not found" });
    Object.assign(row, clean, { updated_at: now() });
    return ok(res, { ...row, [key]: row, message: "Updated successfully" });
  }
  const row = { id: nextId(name), ...clean, created_at: now() };
  if (name === "categories" && !row.category_id) row.category_id = `CAT${String(row.id).padStart(3, "0")}`;
  if (name === "topics" && !row.topic_id) row.topic_id = `TOP${String(row.id).padStart(3, "0")}`;
  if (name === "tesda_categories" && !row.category_id) row.category_id = `TC${String(row.id).padStart(3, "0")}`;
  if (name === "ojt_companies" && !row.company_id) row.company_id = `COMP${String(row.id).padStart(3, "0")}`;
  list.push(row);
  const out = withRelations[name] ? withRelations[name](row) : row;
  return ok(res, { ...out, [key]: out, message: "Created successfully" });
}

// list endpoints: [path regex, handler]
const rel = (name) => db[name].map((r) => (withRelations[name] ? withRelations[name](r) : r));
const getRoutes = [
  [/^categories$/, () => ({ categories: db.categories })],
  [/^topics$/, () => ({ categories: db.categories, topics: rel("topics") })],
  [/^learningMaterials$/, () => ({ learningMaterials: rel("learning_materials") })],
  [/^basic-info$/, () => db.basic_info],
  [/^founders$/, () => db.founders],
  [/^contacts$/, () => db.contacts],
  [/^socials$/, () => db.socials],
  [/^job-opportunities$/, () => db.job_opportunities],
  [/^ojt-companies$/, () => db.ojt_companies],
  [/^ojt-referrals$/, () => db.ojt_referrals],
  [/^ojt-applications$/, () =>
    // like the real API: the apply form stores the company_id, the list shows the company name
    db.ojt_applications.map((r) => ({ ...r, company_name: db.ojt_companies.find((c) => c.company_id === r.company_name)?.company_name ?? r.company_name }))],
  [/^tesda-categories$/, () => ({ categories: db.tesda_categories })],
  [/^tesda-courses$/, () => ({ courses: rel("tesda_courses") })],
  [/^training-centers$/, () => db.training_centers],
  [/^fetch-files$/, () => db.uploaded_files],
  [/^fetch-students$/, (q) => db.students_list],
  [/^dashboard$/, () => ({ status: true, message: "Mock dashboard" })],
  [/^logout$/, () => ({ status: true, message: "Logged out" })],
  // public
  [/^user-display-basic-info$/, (q) => db.basic_info.find((b) => b.title === q.get("title")) ?? null],
  [/^user-display-founder$/, () => db.founders],
  [/^user-display-contacts$/, () => db.contacts],
  [/^user-display-socials$/, () => db.socials],
  [/^display-in-user-categories$/, () => db.categories],
  [/^display-in-user-topics\/(.+)$/, (q, m) => db.topics.filter((t) => t.category_id == m[1])],
  [/^display-in-user-learning-materials\/(.+)$/, (q, m) => db.learning_materials.filter((t) => t.topic_id == m[1])],
  [/^user-display-job-opportunities$/, () => db.job_opportunities],
  [/^user-display-ojt-companies$/, () => db.ojt_companies],
  [/^display-in-user-tesda-categories$/, () => db.tesda_categories],
  [/^display-in-user-tesda-learning-courses\/(.+)$/, (q, m) => db.tesda_courses.filter((c) => c.category_id == m[1])],
  [/^user-training-center$/, () => db.training_centers],
  [/^fetch-notifs$/, (q) => db.notifs.filter((n) => n.student_number == q.get("student_number"))],
];

// ---- server ----------------------------------------------------------------
http
  .createServer(async (req, res) => {
    if (req.method === "OPTIONS") return send(res, 204, {});
    const url = new URL(req.url, `http://${req.headers.host}`);
    const p = url.pathname.replace(/^\/+|\/+$/g, "");
    try {
      // static-ish images: /storage/..., /founder/..., /uploads/...
      if (!p.startsWith("api/")) {
        const base = path.basename(p);
        const file = [uploadDir, assetsDir].map((d) => path.join(d, base)).find((f) => base && fs.existsSync(f));
        if (file) {
          const type = /\.png$/i.test(file) ? "image/png" : /\.svg$/i.test(file) ? "image/svg+xml" : /\.pdf$/i.test(file) ? "application/pdf" : "image/jpeg";
          res.writeHead(200, { "Content-Type": type, "Access-Control-Allow-Origin": "*" });
          return fs.createReadStream(file).pipe(res);
        }
        if (/^(storage|founder|uploads|images)\//.test(p)) {
          res.writeHead(200, { "Content-Type": "image/svg+xml", "Access-Control-Allow-Origin": "*" });
          return res.end(svgPlaceholder(base));
        }
        return send(res, 404, { message: "Not found" });
      }

      const route = p.slice(4);
      if (route === "__reset") { // dev helper: restore the original sample data
        for (const k of Object.keys(db)) delete db[k];
        Object.assign(db, seed());
        return ok(res, { message: "Mock data reset" });
      }
      const body = await readBody(req);

      if (req.method === "GET") {
        for (const [re, fn] of getRoutes) {
          const m = route.match(re);
          if (m) return send(res, 200, fn(url.searchParams, m));
        }
      }

      // ---- special POST/PUT/DELETE routes
      let m;
      if (route === "authenticate") return send(res, 200, { status: true, token: "mock-admin-token", id: 1 });
      if (route === "admin-change-password") return ok(res, { message: "Password changed successfully." });
      if (route === "user-login") {
        let s = db.students.find((x) => x.student_number === body.student_number);
        if (!s) {
          s = { id: nextId("students"), student_number: body.student_number, full_name: "Demo Student", year_level: "4", course: "BS Civil Engineering" };
          db.students.push(s);
        }
        return send(res, 200, { message: "Login Successful!", student: s, token: "mock-student-token" });
      }
      if (["verify-password", "change-password", "verify-forgot-password", "reset-password", "emailed-contact"].includes(route))
        return ok(res, { message: "Done (mock)." });
      if (route === "notifications/mark-as-read") {
        db.notifs.forEach((n) => (n.read_status = 1));
        return ok(res);
      }
      if (route === "get-student-applications") {
        const apps = db.ojt_applications.filter((a) => a.student_number == body.student_number);
        return send(res, 200, { applications: apps, isAccepted: apps.some((a) => ["accepted", "pending", "referred"].includes(a.status)) });
      }
      if (route === "apply-ojt") {
        const row = { id: nextId("ojt_applications"), ...body, status: "pending", submitted_at: now() };
        db.ojt_applications.push(row);
        return ok(res, { message: "Application submitted (mock)." });
      }
      if (route === "save-company-referral") {
        db.ojt_referrals.push({ id: nextId("ojt_referrals"), ...body, status: "pending", submitted_at: now() });
        return ok(res, { message: "Referral saved (mock)." });
      }
      if ((m = route.match(/^update-status\/(\d+)$/))) {
        const r = db.ojt_referrals.find((x) => x.id == m[1]); if (r) r.status = body.status;
        return ok(res, { message: "Status updated" });
      }
      if ((m = route.match(/^update-application-status\/(\d+)$/))) {
        const r = db.ojt_applications.find((x) => x.id == m[1]); if (r) r.status = body.status;
        return ok(res, { message: "Status updated" });
      }
      if ((m = route.match(/^update-slots\/(\d+)$/))) {
        const r = db.ojt_companies.find((x) => x.id == m[1]); if (r) r.slots_available = body.slots_available;
        return ok(res, { ...r, ojtCompany: r });
      }
      if (route === "categories/update-sort-order") {
        (body.categories || []).forEach((c, i) => { const r = db.categories.find((x) => x.id == c.id); if (r) r.sort = i; });
        return ok(res);
      }
      if (route === "upload-file") {
        const name = body.file || "students.xlsx";
        db.uploaded_files.push({ id: nextId("uploaded_files"), filename: name, database: `student_list_${Date.now()}` });
        return ok(res, { message: "File uploaded (mock)." });
      }
      if (route === "delete-files") {
        db.uploaded_files = db.uploaded_files.filter((f) => !(body.fileIds || []).includes(f.id));
        return ok(res);
      }
      if (route === "delete-table") return ok(res);

      // ---- generic CRUD: /api/<segment>[/<id>]
      const parts = route.split("/");
      const seg = parts[0];
      const id = parts[1];
      if (crud[seg] && ["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
        // POST to a collection with _method=PUT or POST to an /update-* /:id path both mean "update"
        return crudWrite(req.method, seg, id, body, res);
      }

      console.warn("UNHANDLED", req.method, route);
      return send(res, 404, { success: false, message: `Mock: no handler for ${req.method} /api/${route}` });
    } catch (e) {
      console.error(e);
      return send(res, 500, { success: false, message: String(e) });
    }
  })
  .listen(PORT, () => console.log(`Mock API running on http://localhost:${PORT}`));
