/********************************************************************************
* WEB322 – Assignment 04
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Amisa Ojha    Student ID:  148425234   Date: 2025-07-06
*
* 
*
********************************************************************************/

const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

const PORT = process.env.PORT || 8080;


let projects = [];
try {
  projects = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "projects.json")));
} catch (err) {
  console.error("Failed to load projects.json");
}


app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Routes
app.get("/", (req, res) => {
  res.render("index", { page: "/" });
});

app.get("/about", (req, res) => {
  res.render("about", { page: "/about" });
});

app.get("/solutions/projects", (req, res) => {
  const sector = req.query.sector;
  let filteredProjects = projects;

  if (sector) {
    filteredProjects = projects.filter(p => p.sector === sector);
    if (filteredProjects.length === 0) {
      return res.status(404).render("404", { message: "No projects found for sector: " + sector });
    }
  }

  res.render("projects", { page: "/solutions/projects", projects: filteredProjects });
});

app.get("/solutions/projects/:id", (req, res) => {
  const project = projects.find(p => p.id == req.params.id);
  if (!project) {
    return res.status(404).render("404", { message: "No project found with ID: " + req.params.id });
  }

  res.render("project", { project });
});


app.use((req, res) => {
  res.status(404).render("404", { message: "Sorry, the page you are looking for doesn't exist." });
});

app.listen(PORT, () => console.log("Server running on port " + PORT));
