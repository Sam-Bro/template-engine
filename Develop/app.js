const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
​
​
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const teamMembers = [];
const idArray = [];

function teamApp() {
    function createManager() {
        console.log("Begin building your team");
        inquirer.prompt([
            {
                type:"input",
                name: "managerName",
                message: "What is the managers name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "What is the managers id?",
                validate: answer => {
                    const pass = answer.match(/^[1-9]\d*$/);
                    if (pass) {
                        return true;
                    }
                }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is the managers Email?",
                validate: answer => {
                    const pass = answer.match(/\S+@\S+\.\S+/);
                    if (pass) {
                        return true;
                    }
                }
            },
            {
                type: "input",
                name: "managerOfficeNo",
                message: "What us the managers office number?",
                validate: answer => {
                    const pass = answer.match(/^[1-9]\d*$/);
                    if (pass) {
                        return true;
                    }
                }
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNo);
            teamMembers.push(manager);
            idArray.push(answers.managerId);
            createTeam();
        });
    }

    function createTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "newMember",
                message: "Which member do you want to add?",
                choices: [
                    "Engineer",
                    "Intern",
                    "No more team members to add"
                ]
            }
        ]).then(userChoice => {
            if(userChoice.newMember === "Engineer") {
                addEngineer();
            } else if (userChoice.newMember === "Intern"){
                addIntern();
            } else {
                buildTeam();
            }
        })
    }

    function addEngineer() {
        inquirer.prompt([
            {
                type: "input", 
                name: "engineerName",
                message: "What is the engineers name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                }
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is the engineers Id?",
                validate: answer => {
                    const pass = answer.match(/^[1-9]\d*$/);
                }
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is the engineers Email?",
                validate: answer => {
                    const pass = answer.match(/\S+@\S+\.\S+/);
                    if (pass) {
                        return true;
                    }
                }
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is the engineers github username?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                }
            }
        ]).then(answers => {
            const engineer = newEngineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub)
            teamMembers.push(engineer);
            idArray.push(answers.engineerId);
            createTeam();
        })
    }

    function addIntern() {
        inquirer.prompt([
            {
                type: "input", 
                name: "internName",
                message: "What is the interns name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                }
            },
            {
                type: "input",
                name: "internId",
                message: "What is the interns Id?",
                validate: answer => {
                    const pass = answer.match(/^[1-9]\d*$/);
                }
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is the interns Email?",
                validate: answer => {
                    const pass = answer.match(/\S+@\S+\.\S+/);
                    if (pass) {
                        return true;
                    }
                }
            },
            {
                type: "input",
                name: "internSchool",
                message: "what school does the intern attend?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                }
            }

        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            teamMembers.push(intern);
            idArray.push(answers.internId);
            createTeam();
        })
    }


    createManager();
}

teamApp()

​
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
​
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.

​
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
​
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
