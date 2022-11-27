// fs = window.fs;
// homeDir = window.homeDir;
// path = window.path;

const fs = require('fs');
const homeDir = require('os').homedir();
const path = require('path');

const projectsPath = path.join(
    homeDir, 'Proton Projects'
)

// const get_projects = () => {
//     let projects = [];

//     fs.readdir(projectsPath, (err, files) => {
//         if (err) throw err;

//         files.forEach(file => {
//             fs.readFile(path.join(projectsPath, file, 'project.json'), { encoding: 'utf8'}, (err, data) => {
//                 if (err) throw err;
//                 const value = JSON.parse(data || "{}")
//                 projects = [...projects, value];
//             })
//         })
//     })

//     return projects;
// }

class get_projects {
    constructor() {
        this.projects = [];
    }

    get_projects() {
        fs.readdir(projectsPath, (err, files) => {
            if (err) throw err;
    
            files.forEach(file => {
                fs.readFile(path.join(projectsPath, file, 'project.json'), { encoding: 'utf8'}, (err, data) => {
                    if (err) throw err;
                    const value = JSON.parse(data || "{}")
                    this.projects = [...this.projects, value];
                    return this.projects
                })
            })
            return this.projects
        })

        return this.projects;
    }
}

let p = new get_projects()
p.get_projects()
console.log(p.projects)