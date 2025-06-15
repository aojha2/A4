const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];

function initialize() {
    return new Promise((resolve, reject) => {
        try {
            projects = projectData.map(project => {
                const sector = sectorData.find(sec => sec.id === project.sector_id);
                return {
                    ...project,
                    sector: sector ? sector.sector_name : "Unknown"
                };
            });
            resolve();
        } catch (err) {
            reject("Initialization failed");
        }
    });
}

function getAllProjects() {
    return new Promise((resolve, reject) => {
        projects.length > 0 ? resolve(projects) : reject("No projects available");
    });
}

function getProjectById(projectId) {
    return new Promise((resolve, reject) => {
        const project = projects.find(p => p.id === projectId);
        project ? resolve(project) : reject("Project not found");
    });
}

function getProjectsBySector(sector) {
    return new Promise((resolve, reject) => {
        const filtered = projects.filter(p =>
            p.sector.toLowerCase().includes(sector.toLowerCase())
        );
        filtered.length > 0 ? resolve(filtered) : reject("No projects found for that sector");
    });
}

module.exports = {
    initialize,
    getAllProjects,
    getProjectById,
    getProjectsBySector
};
