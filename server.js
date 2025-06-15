/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Amisa Ojha       Student ID: 148425234        Date: 2025-06-15
*
*  Published URL: ___________________________________________________________
********************************************************************************/

const express = require("express");
const path = require("path");
const data = require("./modules/project");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

// Static files
app.use(express.static("public"));

// Initialize data before setting up routes
data.initialize()
  .then(() => {
    // Routes
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "views/home.html"));
    });

    app.get("/about", (req, res) => {
      res.sendFile(path.join(__dirname, "views/about.html"));
    });

    app.get("/solutions/projects", async (req, res) => {
      try {
        const sector = req.query.sector;
        let projects;

        if (sector) {
          projects = await data.getProjectsBySector(sector);
        } else {
          projects = await data.getAllProjects();
        }
        res.json(projects);
      } catch (err) {
        res.status(404).json({ message: err });
      }
    });

    app.get("/solutions/projects/:id", async (req, res) => {
      try {
        const project = await data.getProjectById(parseInt(req.params.id));
        res.json(project);
      } catch (err) {
        res.status(404).json({ message: err });
      }
    });

    // Custom 404
    app.use((req, res) => {
      res.status(404).sendFile(path.join(__dirname, "views/404.html"));
    });

    // Start server
    app.listen(HTTP_PORT, () => {
      console.log(`Server running on port ${HTTP_PORT}`);
    });
  })
  .catch(err => {
    console.error("Failed to initialize project data:", err);
  });
