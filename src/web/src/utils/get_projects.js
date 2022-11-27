// fs = window.fs;
// homeDir = window.homeDir;
// path = window.path;

const fs = require('fs');
const homeDir = require('os').homedir();
const path = require('path');

const projectsPath = path.join(
    homeDir, 'Proton Projects'
)

const get_projects = () => {
    let projects = new Array();

    fs.readdir(projectsPath, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
            fs.readFile(path.join(projectsPath, file, 'project.json'), { encoding: 'utf8'}, (err, data) => {
                if (err) throw err;
                const value = JSON.parse(data || "{}")
                projects.push(value);
            })
        })
    })

    return projects;
}

let p = get_projects()
console.log(p)