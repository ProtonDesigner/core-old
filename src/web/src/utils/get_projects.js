fs = window.fs;
homeDir = window.homeDir;
path = window.path;

// const fs = require('fs');
// const homeDir = require('os').homedir();
// const path = require('path');

const projectsPath = path.join(
    homeDir, 'Proton Projects'
)

const get_projects = (cb) => {
    fs.readFile(path.join(projectsPath, 'index.json'), { encoding: 'utf8'}, (err, data) => {
        if (err) throw err;
        const value = JSON.parse(data || "{}");
        cb(value)
    })
}

export default get_projects;

// let p = get_projects((projects) => {
//     console.log(projects)
// })
