// Sample content for the mock API.
// - Learning-material links, agency websites, agency logos and TESDA qualification
//   names are real (links were checked to resolve when this file was written).
// - People, slot counts, job openings and contact lines are SAMPLE data for demo use.
// - Image fields are file names served from mock-api/assets (stock photos from Pexels,
//   free to use, plus agency logos) or mock-api/storage (admin uploads).
const t = "2025-01-15T08:00:00.000Z";
const add = (rows) => rows.map((r, i) => ({ id: i + 1, created_at: t, updated_at: t, ...r }));

const SEE = "See website";

export function seed() {
  return {
    basic_info: add([
      { title: "What is CivilTech Connect", description: "CivilTech Connect is a student-centered platform that brings everything a Civil Technology student needs into one place: curated learning materials, TESDA short courses, job openings from partner agencies, and on-the-job-training placements with organizations that are ready to host you. Our goal is simple: help you learn faster, get certified, and step into the construction industry with confidence." },
      { title: "Learning Resources", description: "Free lectures, reference pages and design guides for civil engineering and civil technology students, organized by subject so you can find what you need before your next exam or project. Every link opens an external, publicly available resource." },
      { title: "Tesda Courses", description: "Explore TESDA-accredited short courses in construction, metals, electrical and automotive trades. Each course lists the training centers that offer it. For official schedules, requirements and assessment dates, check tesda.gov.ph." },
      { title: "Job Opportunities", description: "Public-sector and infrastructure organizations that hire civil engineering graduates and technicians. Open a company to see typical positions and visit its official website to apply." },
      { title: "OJT Opportunities", description: "Organizations that accept on-the-job-training students. Check the available slots, then submit your application online. OJT applications are limited to 4th-year students." },
    ]),
    founders: add([
      { name: "Engr. Amara Okoye", img: "founder_1.jpg" },
      { name: "Engr. Daniel Weber", img: "founder_2.jpg" },
      { name: "Engr. Sofia Marquez", img: "founder_3.jpg" },
      { name: "Engr. Henry Collins", img: "founder_4.jpg" },
    ]),
    contacts: add([
      { media: "email", info: "civiltech.connect@example.com" },
      { media: "phone no.", info: "+63 912 345 6789" },
      { media: "address", info: "College of Engineering, Legazpi City, Albay" },
    ]),
    socials: add([
      { social_media: "facebook", link: "www.facebook.com" },
      { social_media: "instagram", link: "www.instagram.com" },
      { social_media: "linkedin", link: "www.linkedin.com" },
    ]),

    categories: add([
      { category: "Structural Engineering", description: "Analysis and design of beams, columns, slabs and foundations.", category_id: "CAT001", sort: 1 },
      { category: "Geotechnical Engineering", description: "Soil mechanics, foundations and slope stability.", category_id: "CAT002", sort: 2 },
      { category: "Hydraulics & Water Resources", description: "Fluid mechanics, open channels, drainage and water supply.", category_id: "CAT003", sort: 3 },
      { category: "Construction Management", description: "Scheduling, project evaluation, safety and project controls.", category_id: "CAT004", sort: 4 },
      { category: "Surveying & Geomatics", description: "Measurement, mapping and site layout.", category_id: "CAT005", sort: 5 },
    ]),
    topics: add([
      { topic: "Reinforced Concrete Design", topic_id: "TOP001", category: "Structural Engineering", category_id: "CAT001" },
      { topic: "Steel Design", topic_id: "TOP002", category: "Structural Engineering", category_id: "CAT001" },
      { topic: "Structural Analysis & Mechanics", topic_id: "TOP003", category: "Structural Engineering", category_id: "CAT001" },
      { topic: "Soil Classification", topic_id: "TOP004", category: "Geotechnical Engineering", category_id: "CAT002" },
      { topic: "Foundations & Bearing Capacity", topic_id: "TOP005", category: "Geotechnical Engineering", category_id: "CAT002" },
      { topic: "Open Channel Flow", topic_id: "TOP006", category: "Hydraulics & Water Resources", category_id: "CAT003" },
      { topic: "Water Science", topic_id: "TOP007", category: "Hydraulics & Water Resources", category_id: "CAT003" },
      { topic: "Project Scheduling", topic_id: "TOP008", category: "Construction Management", category_id: "CAT004" },
      { topic: "Project Evaluation", topic_id: "TOP009", category: "Construction Management", category_id: "CAT004" },
      { topic: "Construction Safety", topic_id: "TOP010", category: "Construction Management", category_id: "CAT004" },
      { topic: "Surveying Basics", topic_id: "TOP011", category: "Surveying & Geomatics", category_id: "CAT005" },
    ]),
    learning_materials: add([
      { title: "MIT OCW 1.054: Mechanics and Design of Concrete Structures", link: "ocw.mit.edu/courses/1-054-mechanics-and-design-of-concrete-structures-spring-2004/", description: "Full university course: lecture notes, assignments and exams on reinforced concrete behavior and design.", category_id: "CAT001", topic_id: "TOP001" },
      { title: "Reinforced concrete: overview", link: "en.wikipedia.org/wiki/Reinforced_concrete", description: "How steel and concrete work together: materials, behavior, detailing and failure modes.", category_id: "CAT001", topic_id: "TOP001" },
      { title: "Structural steel: overview", link: "en.wikipedia.org/wiki/Structural_steel", description: "Common shapes, grades and properties used in steel construction.", category_id: "CAT001", topic_id: "TOP002" },
      { title: "MIT OCW 1.571: Structural Analysis and Control", link: "ocw.mit.edu/courses/1-571-structural-analysis-and-control-spring-2004/", description: "Course materials on analyzing structures and their response to loads.", category_id: "CAT001", topic_id: "TOP003" },
      { title: "MIT OCW 1.050: Solid Mechanics", link: "ocw.mit.edu/courses/1-050-solid-mechanics-fall-2004/", description: "Stress, strain and deformation: the foundation for structural design.", category_id: "CAT001", topic_id: "TOP003" },
      { title: "Unified Soil Classification System (USCS)", link: "en.wikipedia.org/wiki/Unified_Soil_Classification_System", description: "Classify soils by grain size and plasticity with the standard USCS groups and symbols.", category_id: "CAT002", topic_id: "TOP004" },
      { title: "Bearing capacity of soil", link: "en.wikipedia.org/wiki/Bearing_capacity", description: "Terzaghi, Meyerhof and related methods for shallow foundation capacity.", category_id: "CAT002", topic_id: "TOP005" },
      { title: "FHWA Geotechnical Engineering", link: "www.fhwa.dot.gov/engineering/geotech/", description: "U.S. Federal Highway Administration guidance on foundations, slopes and ground improvement.", category_id: "CAT002", topic_id: "TOP005" },
      { title: "Open-channel flow", link: "en.wikipedia.org/wiki/Open-channel_flow", description: "Flow with a free surface: channels, flumes, culverts and drainage.", category_id: "CAT003", topic_id: "TOP006" },
      { title: "Manning's formula", link: "en.wikipedia.org/wiki/Manning_formula", description: "Estimate velocity and discharge in open channels from slope, roughness and geometry.", category_id: "CAT003", topic_id: "TOP006" },
      { title: "USGS Water Science School", link: "www.usgs.gov/special-topics/water-science-school", description: "Plain-language explanations of the water cycle, groundwater, streamflow and water use.", category_id: "CAT003", topic_id: "TOP007" },
      { title: "Critical path method (CPM)", link: "en.wikipedia.org/wiki/Critical_path_method", description: "Build a network diagram, find the critical path and compute float.", category_id: "CAT004", topic_id: "TOP008" },
      { title: "MIT OCW 1.040: Project Management", link: "ocw.mit.edu/courses/1-040-project-management-spring-2009/", description: "Scheduling, cost control, risk and procurement for engineering projects.", category_id: "CAT004", topic_id: "TOP008" },
      { title: "MIT OCW 1.011: Project Evaluation", link: "ocw.mit.edu/courses/1-011-project-evaluation-spring-2011/", description: "Economic and decision analysis for infrastructure projects.", category_id: "CAT004", topic_id: "TOP009" },
      { title: "OSHA: Construction Industry", link: "www.osha.gov/construction", description: "Hazard guidance, standards and training resources for construction sites.", category_id: "CAT004", topic_id: "TOP010" },
      { title: "Surveying: overview", link: "en.wikipedia.org/wiki/Surveying", description: "Methods and instruments: levels, total stations, GNSS and photogrammetry.", category_id: "CAT005", topic_id: "TOP011" },
    ]),

    // Real public agencies (real websites and logos). Slots, openings and contact
    // lines are sample values.
    job_opportunities: add([
      { company_name: "DPWH", email: SEE, phone: SEE, address: "Port Area, Manila", job_offers: "Engineer I, Construction Inspector, Draftsman", link: "www.dpwh.gov.ph", company_description: "Department of Public Works and Highways: plans, designs, builds and maintains national roads, bridges, flood-control works and public buildings.", logo: "logo_dpwh.png" },
      { company_name: "DOTr", email: SEE, phone: SEE, address: "Clark, Pampanga", job_offers: "Project Engineer, Transport Planner", link: "dotr.gov.ph", company_description: "Department of Transportation: leads planning and delivery of roads, rail, aviation and maritime transport infrastructure.", logo: "logo_dotr.png" },
      { company_name: "NIA", email: SEE, phone: SEE, address: "Diliman, Quezon City", job_offers: "Irrigation Engineer, Survey Aide, Construction Foreman", link: "www.nia.gov.ph", company_description: "National Irrigation Administration: develops, operates and maintains irrigation systems across the country.", logo: "logo_nia.png" },
      { company_name: "BCDA", email: SEE, phone: SEE, address: "Bonifacio Global City, Taguig", job_offers: "Project Engineer, Planning Officer", link: "www.bcda.gov.ph", company_description: "Bases Conversion and Development Authority: develops former military lands into new urban and infrastructure districts.", logo: "logo_bcda.svg" },
      { company_name: "Philippine Ports Authority", email: SEE, phone: SEE, address: "Port Area, Manila", job_offers: "Port Engineer, Marine Structures Inspector", link: "ppa.com.ph", company_description: "Plans, builds and manages ports and port infrastructure nationwide.", logo: "logo_ppa.png" },
    ]),
    ojt_companies: add([
      { company_name: "DPWH", company_id: "COMP001", company_president: "District Engineer (Sample)", email: SEE, phone: SEE, address: "Port Area, Manila", deployment_location: "Manila / Quezon City", slots_available: 8, accepted: 3, link: "www.dpwh.gov.ph", logo: "logo_dpwh.png" },
      { company_name: "DOTr", company_id: "COMP002", company_president: "Project Director (Sample)", email: SEE, phone: SEE, address: "Clark, Pampanga", deployment_location: "Pampanga / Metro Manila", slots_available: 4, accepted: 1, link: "dotr.gov.ph", logo: "logo_dotr.png" },
      { company_name: "NIA", company_id: "COMP003", company_president: "Division Manager (Sample)", email: SEE, phone: SEE, address: "Diliman, Quezon City", deployment_location: "Quezon City / Provincial offices", slots_available: 6, accepted: 2, link: "www.nia.gov.ph", logo: "logo_nia.png" },
      { company_name: "BCDA", company_id: "COMP004", company_president: "Project Manager (Sample)", email: SEE, phone: SEE, address: "Bonifacio Global City, Taguig", deployment_location: "Taguig / Clark", slots_available: 5, accepted: 1, link: "www.bcda.gov.ph", logo: "logo_bcda.svg" },
      { company_name: "Philippine Ports Authority", company_id: "COMP005", company_president: "Port Manager (Sample)", email: SEE, phone: SEE, address: "Port Area, Manila", deployment_location: "Manila", slots_available: 3, accepted: 0, link: "ppa.com.ph", logo: "logo_ppa.png" },
    ]),
    ojt_referrals: add([
      { student_number: "2021-00001", student_email: "student1@example.com", company_name: "Albay Road Works", head: "Engr. P. Ramos", address: "Tabaco City", email: "info@albayroad.example", info: "Local road rehabilitation projects.", status: "pending", submitted_at: t },
      { student_number: "2021-00002", student_email: "student2@example.com", company_name: "Legazpi Concrete Products", head: "Mr. R. Aquino", address: "Legazpi City", email: "hello@legazpiconcrete.example", info: "Precast concrete and hollow blocks.", status: "accepted", submitted_at: t },
    ]),
    ojt_applications: add([
      { company_name: "DPWH", company_president: "District Engineer (Sample)", company_address: "Port Area, Manila", company_email: SEE, company_phone: SEE, deployment_location: "Manila", student_number: "2021-00001", student_name: "Demo Student", student_email: "student1@example.com", cv: "demo_cv.pdf", course: "BS Civil Engineering", year_level: "4", status: "pending", submitted_at: t },
      { company_name: "NIA", company_president: "Division Manager (Sample)", company_address: "Diliman, Quezon City", company_email: SEE, company_phone: SEE, deployment_location: "Quezon City", student_number: "2021-00002", student_name: "Sample Learner", student_email: "student2@example.com", cv: "demo_cv.pdf", course: "BS Civil Engineering", year_level: "4", status: "accepted", submitted_at: t },
    ]),

    // Real TESDA qualification names (NC = National Certificate level).
    tesda_categories: add([
      { category: "Construction", description: "Building trades: carpentry, masonry, plumbing, tile setting, scaffolding and painting.", category_id: "TC001", sort: 1 },
      { category: "Metals & Engineering", description: "Welding and metal fabrication for structures and machinery.", category_id: "TC002", sort: 2 },
      { category: "Electrical & Electronics", description: "Electrical installation, maintenance and electronics servicing.", category_id: "TC003", sort: 3 },
      { category: "Automotive & Land Transport", description: "Vehicle servicing and professional driving.", category_id: "TC004", sort: 4 },
    ]),
    // training_center is a JSON string of training-center IDs (center_id), e.g. '["CTR001","CTR002"]'.
    tesda_courses: add([
      { course: "Carpentry NC II", category_id: "TC001", short_desc: "Formworks, framing, roofing and finish carpentry for buildings.", training_center: JSON.stringify(["CTR001", "CTR002", "CTR005"]), course_id: "TCO001" },
      { course: "Masonry NC II", category_id: "TC001", short_desc: "Block laying, plastering, concrete works and tile setting basics.", training_center: JSON.stringify(["CTR001", "CTR003", "CTR006"]), course_id: "TCO002" },
      { course: "Plumbing NC II", category_id: "TC001", short_desc: "Install and maintain water supply, drainage and sanitary systems.", training_center: JSON.stringify(["CTR001", "CTR002", "CTR004"]), course_id: "TCO003" },
      { course: "Tile Setting NC II", category_id: "TC001", short_desc: "Surface preparation and installation of floor and wall tiles.", training_center: JSON.stringify(["CTR002", "CTR005"]), course_id: "TCO004" },
      { course: "Scaffold Erection NC II", category_id: "TC001", short_desc: "Safe erection, inspection and dismantling of scaffolding.", training_center: JSON.stringify(["CTR001", "CTR006"]), course_id: "TCO005" },
      { course: "Construction Painting NC II", category_id: "TC001", short_desc: "Surface preparation and application of paints and coatings.", training_center: JSON.stringify(["CTR003", "CTR004"]), course_id: "TCO006" },
      { course: "Shielded Metal Arc Welding (SMAW) NC I", category_id: "TC002", short_desc: "Entry-level welding of plates and structural sections.", training_center: JSON.stringify(["CTR001", "CTR004", "CTR005"]), course_id: "TCO007" },
      { course: "Shielded Metal Arc Welding (SMAW) NC II", category_id: "TC002", short_desc: "Weld structural steel in multiple positions to code.", training_center: JSON.stringify(["CTR001", "CTR004", "CTR006"]), course_id: "TCO008" },
      { course: "Electrical Installation and Maintenance NC II", category_id: "TC003", short_desc: "Wiring, circuits, protection devices and troubleshooting.", training_center: JSON.stringify(["CTR001", "CTR002", "CTR004", "CTR006"]), course_id: "TCO009" },
      { course: "Electronics Products Assembly and Servicing NC II", category_id: "TC003", short_desc: "Assemble, test and repair electronic circuits and products.", training_center: JSON.stringify(["CTR003", "CTR005"]), course_id: "TCO010" },
      { course: "Automotive Servicing (Engine Repair) NC II", category_id: "TC004", short_desc: "Diagnose, service and repair gasoline and diesel engines.", training_center: JSON.stringify(["CTR004", "CTR006"]), course_id: "TCO011" },
      { course: "Driving NC II", category_id: "TC004", short_desc: "Safe vehicle operation, road rules and basic maintenance.", training_center: JSON.stringify(["CTR002", "CTR004", "CTR005"]), course_id: "TCO012" },
    ]),
    // CTR001 is a real TESDA site; the rest are mock training centers.
    training_centers: add([
      { training_center: "TESDA Complex (Taguig)", center_id: "CTR001", address: "East Service Road, South Superhighway, Taguig City", email: "See tesda.gov.ph", phone: "See tesda.gov.ph" },
      { training_center: "Albay Provincial Training Center (Mock)", center_id: "CTR002", address: "Legazpi City, Albay", email: "albay.training@example.com", phone: "(052) 480-0002" },
      { training_center: "Naga Skills Institute (Mock)", center_id: "CTR003", address: "Naga City, Camarines Sur", email: "naga.skills@example.com", phone: "(054) 472-0003" },
      { training_center: "Sorsogon Technical Center (Mock)", center_id: "CTR004", address: "Sorsogon City, Sorsogon", email: "sorsogon.tech@example.com", phone: "(056) 211-0004" },
      { training_center: "Bicol Construction Skills Academy (Mock)", center_id: "CTR005", address: "Daraga, Albay", email: "bicol.academy@example.com", phone: "(052) 483-0005" },
      { training_center: "Masbate Trades Training Center (Mock)", center_id: "CTR006", address: "Masbate City, Masbate", email: "masbate.trades@example.com", phone: "(056) 333-0006" },
    ]),

    uploaded_files: add([
      { filename: "students_2025_sem1.xlsx", database: "student_list_2025_sem1" },
      { filename: "students_2025_sem2.xlsx", database: "student_list_2025_sem2" },
    ]),
    students_list: add([
      { student_number: "2021-00001", full_name: "Demo Student", year_level: "4", course: "BS Civil Engineering", enrolled_units: 21, age: 22, address: "Legazpi City", birthday: "2003-03-12" },
      { student_number: "2021-00002", full_name: "Sample Learner", year_level: "4", course: "BS Civil Engineering", enrolled_units: 18, age: 22, address: "Daraga", birthday: "2003-08-30" },
      { student_number: "2022-00103", full_name: "Mara Dizon", year_level: "3", course: "BS Civil Engineering", enrolled_units: 24, age: 21, address: "Camalig", birthday: "2004-01-19" },
      { student_number: "2022-00117", full_name: "Joel Bautista", year_level: "3", course: "BS Civil Engineering", enrolled_units: 24, age: 21, address: "Tabaco", birthday: "2004-06-02" },
      { student_number: "2023-00208", full_name: "Lea Fernandez", year_level: "2", course: "BS Civil Engineering", enrolled_units: 22, age: 20, address: "Ligao", birthday: "2005-11-25" },
      { student_number: "2024-00311", full_name: "Rico Navarro", year_level: "1", course: "BS Civil Engineering", enrolled_units: 21, age: 19, address: "Polangui", birthday: "2006-09-08" },
    ]),
    // year_level "4" so the demo student can apply for OJT (the UI requires 4th year)
    students: add([{ student_number: "2021-00001", full_name: "Demo Student", year_level: "4", course: "BS Civil Engineering" }]),
    notifs: add([
      { student_number: "2021-00001", student_name: "Demo Student", company_name: "DPWH", status: "pending", type: "application", read_status: 0 },
      { student_number: "2021-00001", student_name: "Demo Student", company_name: "NIA", status: "accepted", type: "application", read_status: 0 },
    ]),
  };
}
