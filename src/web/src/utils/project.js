const fs = window.fs;
const homeDir = window.homeDir;
const path = window.path;

class Project {
    constructor(projectName, author) {
        this.name = projectName || "Untitled Project";
        this.author = author || "Default Author";
        this.elements = {}
		
		this.rootDir = path.join(homeDir, "Proton Projects", this.name);
        this.assetsDir = path.join(this.rootDir, "assets");
        this.scriptsDir = path.join(this.rootDir, "scripts");
    }

    addElement(element) {
        this.elements[element.uid] = element;
    }

    deleteElement(element) {
        delete this.elements[element.uid];
    }

    createDirs() {
        if (!fs.existsSync(this.rootDir)) fs.mkdirSync(this.rootDir, { recursive: true });
        if (!fs.existsSync(this.scriptsDir)) fs.mkdirSync(this.scriptsDir, { recursive: true });
        if (!fs.existsSync(this.assetsDir)) fs.mkdirSync(this.assetsDir, { recursive: true });
    }

    saveProject() {
        this.createDirs()
        fs.writeFile(path.join(homeDir, "Proton Projects", this.name, "project.json"), JSON.stringify({
            name: this.name,
            author: this.author,
            elements: this.elements
        }), (err) => {
            if (err) throw err;
            return "OK";
        })
		// console.log("saved")
    }

    loadProject() {
		fs.readFile(path.join(this.rootDir, "project.json"), (err, data) => {
			if (err) throw err;
			console.log(data);
			data = JSON.parse(data || "{}");
			this.name = data.name;
			this.author = data.author;
			this.elements = data.elements;
		})
    }
}

export default Project;

// const project = new Project("yo", "tech");
// project.addElement({
//     "id": 1,
//     "uid": "62e23776yfy8dfdv87",
//     "props": {
//         "ur": "mom"
//     },
//     "alias": "hey"
// })
// project.saveProject()
