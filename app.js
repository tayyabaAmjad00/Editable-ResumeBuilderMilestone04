document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resume-form');
    var resumeOutput = document.getElementById('resume-output');
    if (!form || !resumeOutput) {
        console.error('Form or resume output element not found.');
        return;
    }
    var generateResume = function (event) {
        event.preventDefault();
        var nameInput = document.getElementById('name');
        var emailInput = document.getElementById('email');
        var educationInput = document.getElementById('education');
        var workExperienceInput = document.getElementById('work-experience');
        var skillsInput = document.getElementById('skills');
        if (!nameInput || !emailInput || !educationInput || !workExperienceInput || !skillsInput) {
            console.error('One or more input elements not found.');
            return;
        }
        var name = nameInput.value;
        var email = emailInput.value;
        var education = educationInput.value;
        var workExperience = workExperienceInput.value;
        var skills = skillsInput.value;
        var skillsList = skills.split('\n').filter(function (skill) { return skill.trim() !== ''; });
        var resumeHTML = "\n            <div class=\"resume-header\">\n                <h2 contenteditable=\"false\" id=\"resume-name\">".concat(name, "</h2>\n                <p contenteditable=\"false\" id=\"resume-email\">Email: ").concat(email, "</p>\n            </div>\n            <section>\n                <h2 contenteditable=\"false\" id=\"resume-education\">Education</h2>\n                <p contenteditable=\"false\" id=\"resume-education-content\">").concat(education, "</p>\n            </section>\n            <section>\n                <h2 contenteditable=\"false\" id=\"resume-work-experience\">Work Experience</h2>\n                <p contenteditable=\"false\" id=\"resume-work-experience-content\">").concat(workExperience, "</p>\n            </section>\n            <section>\n                <h2 contenteditable=\"false\" id=\"resume-skills\">Skills</h2>\n                <ul id=\"resume-skills-list\">\n                    ").concat(skillsList.map(function (skill) { return "<li contenteditable=\"false\">".concat(skill, "</li>"); }).join(''), "\n                </ul>\n            </section>\n            <button id=\"edit-button\">Edit</button>\n        ");
        resumeOutput.innerHTML = resumeHTML;
        // Add event listeners to make sections editable
        addEditButtonListener();
        addEditableListeners();
    };
    var addEditableListeners = function () {
        var editableElements = document.querySelectorAll('[contenteditable="true"]');
        editableElements.forEach(function (element) {
            element.addEventListener('input', function (event) {
                var target = event.target;
                var id = target.id;
                if (id === 'resume-name') {
                    document.getElementById('name').value = target.innerText;
                }
                else if (id === 'resume-email') {
                    document.getElementById('email').value = target.innerText.replace('Email: ', '');
                }
                else if (id === 'resume-education') {
                    document.getElementById('education').value = target.innerText;
                }
                else if (id === 'resume-work-experience') {
                    document.getElementById('work-experience').value = target.innerText;
                }
                else if (id === 'resume-skills') {
                    var skillsList = document.getElementById('resume-skills-list');
                    var skills = Array.from(skillsList.children)
                        .map(function (li) { return li.innerText; })
                        .join('\n');
                    document.getElementById('skills').value = skills;
                }
            });
        });
    };
    var addEditButtonListener = function () {
        var editButton = document.getElementById('edit-button');
        if (!editButton)
            return;
        editButton.addEventListener('click', function () {
            var editableElements = document.querySelectorAll('[contenteditable="false"]');
            var isEditing = editButton.textContent === 'Edit';
            if (isEditing) {
                // Switch to edit mode
                editableElements.forEach(function (element) {
                    element.setAttribute('contenteditable', 'true');
                });
                editButton.textContent = 'Save';
            }
            else {
                // Switch to view mode
                editableElements.forEach(function (element) {
                    element.setAttribute('contenteditable', 'false');
                });
                editButton.textContent = 'Edit';
            }
        });
    };
    form.addEventListener('submit', generateResume);
});