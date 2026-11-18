// Sample content for the mock API. Image fields are file names; the mock
// server renders a coloured placeholder for any /storage/<name> request.
const t = "2025-01-15T08:00:00.000Z";
const add = (rows) => rows.map((r, i) => ({ id: i + 1, created_at: t, updated_at: t, ...r }));

export function seed() {
  return {
    basic_info: add([
      { title: "What is CivilTech Connect", description: "CivilTech Connect is a student-centered platform that brings everything a Civil Technology student needs into one place: curated learning materials, TESDA short courses, job openings from partner firms, and on-the-job-training placements with companies that are ready to host you. Our goal is simple: help you learn faster, get certified, and step into the construction industry with confidence." },
      { title: "Learning Resources", description: "Curated lectures, reference books, design codes and study guides for civil engineering students — organized by subject so you can find what you need before your next exam or project." },
      { title: "Tesda Courses", description: "Explore TESDA-accredited short courses in construction, surveying, welding and related trades. Each course lists the training centers that offer it." },
      { title: "Job Opportunities", description: "Openings from partner firms and contractors looking for civil engineering graduates, technicians and interns." },
      { title: "OJT Opportunities", description: "Partner companies accepting on-the-job-training students. Check available slots and submit your application online." },
    ]),
    founders: add([
      { name: "Engr. Maria Santos", img: "maria_santos.png" },
      { name: "Engr. Juan Dela Cruz", img: "juan_dela_cruz.png" },
      { name: "Engr. Ana Reyes", img: "ana_reyes.png" },
      { name: "Engr. Paolo Garcia", img: "paolo_garcia.png" },
    ]),
    contacts: add([
      { media: "email", info: "civiltech.connect@example.com" },
      { media: "phone no.", info: "+63 912 345 6789" },
      { media: "address", info: "College of Engineering, Legazpi City, Albay" },
    ]),
    socials: add([
      { social_media: "facebook", link: "facebook.com/civiltechconnect" },
      { social_media: "instagram", link: "instagram.com/civiltechconnect" },
      { social_media: "linkedin", link: "linkedin.com/company/civiltechconnect" },
    ]),
    categories: add([
      { category: "Structural Engineering", description: "Analysis and design of beams, columns, slabs and foundations.", category_id: "CAT001", sort: 1 },
      { category: "Geotechnical Engineering", description: "Soil mechanics, foundations and slope stability.", category_id: "CAT002", sort: 2 },
      { category: "Hydraulics & Water Resources", description: "Fluid mechanics, open channels, drainage and water supply.", category_id: "CAT003", sort: 3 },
      { category: "Construction Management", description: "Estimating, scheduling, safety and project controls.", category_id: "CAT004", sort: 4 },
    ]),
    topics: add([
      { topic: "Reinforced Concrete Design", topic_id: "TOP001", category: "Structural Engineering", category_id: "CAT001" },
      { topic: "Steel Design", topic_id: "TOP002", category: "Structural Engineering", category_id: "CAT001" },
      { topic: "Soil Classification", topic_id: "TOP003", category: "Geotechnical Engineering", category_id: "CAT002" },
      { topic: "Shallow Foundations", topic_id: "TOP004", category: "Geotechnical Engineering", category_id: "CAT002" },
      { topic: "Open Channel Flow", topic_id: "TOP005", category: "Hydraulics & Water Resources", category_id: "CAT003" },
      { topic: "Project Scheduling (CPM)", topic_id: "TOP006", category: "Construction Management", category_id: "CAT004" },
    ]),
    learning_materials: add([
      { title: "RC Beam Design Basics", link: "example.com/rc-beam", description: "Singly and doubly reinforced beams using NSCP 2015.", category_id: "CAT001", topic_id: "TOP001" },
      { title: "Column Design Handbook", link: "example.com/columns", description: "Axial and biaxial bending, with worked examples.", category_id: "CAT001", topic_id: "TOP001" },
      { title: "Steel Connections Primer", link: "example.com/steel", description: "Bolted and welded connection design.", category_id: "CAT001", topic_id: "TOP002" },
      { title: "USCS and AASHTO Soil Classification", link: "example.com/soil", description: "Step-by-step classification charts.", category_id: "CAT002", topic_id: "TOP003" },
      { title: "Bearing Capacity Calculator Guide", link: "example.com/bearing", description: "Terzaghi and Meyerhof methods.", category_id: "CAT002", topic_id: "TOP004" },
      { title: "Manning's Equation Explained", link: "example.com/manning", description: "Uniform flow in open channels.", category_id: "CAT003", topic_id: "TOP005" },
      { title: "Critical Path Method in 30 Minutes", link: "example.com/cpm", description: "Build a network diagram and find the critical path.", category_id: "CAT004", topic_id: "TOP006" },
    ]),
    job_opportunities: add([
      { company_name: "Bicol Builders Corp.", email: "hr@bicolbuilders.example", phone: "0917 111 2222", address: "Legazpi City, Albay", job_offers: "Site Engineer, Draftsman", link: "example.com/bicol-builders", company_description: "Regional contractor specializing in roads, bridges and public buildings.", logo: "bicol_builders.png" },
      { company_name: "Mayon Structural Design", email: "careers@mayonstruct.example", phone: "0917 333 4444", address: "Daraga, Albay", job_offers: "Structural Designer, Estimator", link: "example.com/mayon-structural", company_description: "Structural design consultancy for residential and commercial projects.", logo: "mayon_structural.png" },
      { company_name: "Pacific Survey Works", email: "jobs@pacificsurvey.example", phone: "0917 555 6666", address: "Naga City, Camarines Sur", job_offers: "Geodetic Technician, CAD Operator", link: "example.com/pacific-survey", company_description: "Land surveying and mapping services.", logo: "pacific_survey.png" },
    ]),
    ojt_companies: add([
      { company_name: "Bicol Builders Corp.", company_id: "COMP001", company_president: "Engr. R. Villanueva", email: "ojt@bicolbuilders.example", phone: "0917 111 2222", address: "Legazpi City, Albay", deployment_location: "Legazpi City", slots_available: 5, accepted: 2, link: "example.com/bicol-builders", logo: "bicol_builders.png" },
      { company_name: "Mayon Structural Design", company_id: "COMP002", company_president: "Engr. L. Mendoza", email: "ojt@mayonstruct.example", phone: "0917 333 4444", address: "Daraga, Albay", deployment_location: "Daraga", slots_available: 3, accepted: 1, link: "example.com/mayon-structural", logo: "mayon_structural.png" },
      { company_name: "Pacific Survey Works", company_id: "COMP003", company_president: "Engr. T. Bautista", email: "ojt@pacificsurvey.example", phone: "0917 555 6666", address: "Naga City, Camarines Sur", deployment_location: "Naga City", slots_available: 0, accepted: 4, link: "example.com/pacific-survey", logo: "pacific_survey.png" },
    ]),
    ojt_referrals: add([
      { student_number: "2021-00001", student_email: "student1@example.com", company_name: "Albay Road Works", head: "Engr. P. Ramos", address: "Tabaco City", email: "info@albayroad.example", info: "Local road rehabilitation projects.", status: "pending", submitted_at: t },
    ]),
    ojt_applications: add([
      { company_name: "Bicol Builders Corp.", company_president: "Engr. R. Villanueva", company_address: "Legazpi City, Albay", company_email: "ojt@bicolbuilders.example", company_phone: "0917 111 2222", deployment_location: "Legazpi City", student_number: "2021-00001", student_name: "Demo Student", student_email: "student1@example.com", cv: "demo_cv.pdf", course: "BS Civil Engineering", year_level: "3rd Year", status: "pending", submitted_at: t },
    ]),
    tesda_categories: add([
      { category: "Construction", description: "Carpentry, masonry, plumbing and related trades.", category_id: "TC001", sort: 1 },
      { category: "Metals & Engineering", description: "Welding and fabrication.", category_id: "TC002", sort: 2 },
      { category: "Electrical & Electronics", description: "Electrical installation and maintenance.", category_id: "TC003", sort: 3 },
    ]),
    tesda_courses: add([
      { course: "Carpentry NC II", category_id: "TC001", short_desc: "Framing, formworks and finish carpentry.", training_center: "Albay Technical Training Center", course_id: "TCO001" },
      { course: "Masonry NC II", category_id: "TC001", short_desc: "Block laying, plastering and tile setting.", training_center: "Albay Technical Training Center", course_id: "TCO002" },
      { course: "Shielded Metal Arc Welding NC II", category_id: "TC002", short_desc: "SMAW for structural steel.", training_center: "Bicol Skills Institute", course_id: "TCO003" },
      { course: "Electrical Installation and Maintenance NC II", category_id: "TC003", short_desc: "Wiring and troubleshooting.", training_center: "Bicol Skills Institute", course_id: "TCO004" },
    ]),
    training_centers: add([
      { training_center: "Albay Technical Training Center", center_id: "CTR001", address: "Legazpi City, Albay", email: "attc@example.com", phone: "(052) 480-0001" },
      { training_center: "Bicol Skills Institute", center_id: "CTR002", address: "Naga City, Camarines Sur", email: "bsi@example.com", phone: "(054) 472-0002" },
    ]),
    uploaded_files: add([{ filename: "students_2025_sem1.xlsx", database: "student_list_2025_sem1" }]),
    students_list: add([
      { student_number: "2021-00001", full_name: "Demo Student", year_level: "3rd Year", course: "BS Civil Engineering", enrolled_units: 21, age: 21, address: "Legazpi City", birthday: "2004-03-12" },
      { student_number: "2021-00002", full_name: "Sample Learner", year_level: "3rd Year", course: "BS Civil Engineering", enrolled_units: 18, age: 22, address: "Daraga", birthday: "2003-08-30" },
    ]),
    students: add([{ student_number: "2021-00001", full_name: "Demo Student", year_level: "3rd Year", course: "BS Civil Engineering" }]),
    notifs: add([
      { student_number: "2021-00001", student_name: "Demo Student", company_name: "Bicol Builders Corp.", status: "pending", type: "application", read_status: 0 },
    ]),
  };
}
