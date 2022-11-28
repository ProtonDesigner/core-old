const fs = window.fs;
const homeDir = window.homeDir;
const path = window.path;

const protonDir = path.join(homeDir, "Proton Projects")

class Project {
    constructor(projectName, author) {
        this.name = projectName || "Untitled Project";
        this.author = author || "Default Author";
        this.elements = {}
		
		this.rootDir = path.join(protonDir, this.name);
        this.assetsDir = path.join(this.rootDir, "assets");
        this.scriptsDir = path.join(this.rootDir, "scripts");
		this.indexPath = path.join(protonDir, "index.json")
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
		if (!fs.existsSync(this.indexPath)) fs.writeFile(this.indexPath, JSON.stringify({}), (err) => {
			if (err) throw err;
		});
    }

	addToIndex() {
		fs.readFile(this.indexPath, (err, data) => {
			if (err) throw err;

			const value = JSON.parse(data || "{}");
			if (!value[this.name]) {
				value[this.name] = {
					name: this.name,
					author: this.author
				};
				fs.writeFile(this.indexPath, JSON.stringify(value), (err) => {
					if (err) throw err;
				});
			}
		})
	}

    saveProject() {
        this.createDirs()
		this.addToIndex()
        fs.writeFile(path.join(homeDir, "Proton Projects", this.name, "project.json"), JSON.stringify({
            name: this.name,
            author: this.author,
            elements: this.elements
        }), (err) => {
            if (err) throw err;
            return "OK";
        })
		console.log("saved")
		console.log(this.elements)
    }

    loadProject(cb) {
		let self = this;
		fs.readFile(path.join(this.rootDir, "project.json"), (err, data) => {
			if (err) throw err;
			console.log(data);
			data = JSON.parse(data.toString() || "{}");
			self.name = data.name;
			self.author = data.author;
			self.elements = data.elements;
			cb(data)
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
