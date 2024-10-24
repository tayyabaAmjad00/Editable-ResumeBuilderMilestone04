document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form') as HTMLFormElement | null;
    const resumeOutput = document.getElementById('resume-output') as HTMLDivElement | null;

    if (!form || !resumeOutput) {
        console.error('Form or resume output element not found.');
        return;
    }

    const generateResume = (event: Event): void => {
        event.preventDefault();

        const nameInput = document.getElementById('name') as HTMLInputElement | null;
        const emailInput = document.getElementById('email') as HTMLInputElement | null;
        const educationInput = document.getElementById('education') as HTMLTextAreaElement | null;
        const workExperienceInput = document.getElementById('work-experience') as HTMLTextAreaElement | null;
        const skillsInput = document.getElementById('skills') as HTMLTextAreaElement | null;

        if (!nameInput || !emailInput || !educationInput || !workExperienceInput || !skillsInput) {
            console.error('One or more input elements not found.');
            return;
        }

        const name = nameInput.value;
        const email = emailInput.value;
        const education = educationInput.value;
        const workExperience = workExperienceInput.value;
        const skills = skillsInput.value;

        const skillsList = skills.split('\n').filter(skill => skill.trim() !== '');

        const resumeHTML = `
            <div class="resume-header">
                <h2 contenteditable="false" id="resume-name">${name}</h2>
                <p contenteditable="false" id="resume-email">Email: ${email}</p>
            </div>
            <section>
                <h2 contenteditable="false" id="resume-education">Education</h2>
                <p contenteditable="false" id="resume-education-content">${education}</p>
            </section>
            <section>
                <h2 contenteditable="false" id="resume-work-experience">Work Experience</h2>
                <p contenteditable="false" id="resume-work-experience-content">${workExperience}</p>
            </section>
            <section>
                <h2 contenteditable="false" id="resume-skills">Skills</h2>
                <ul id="resume-skills-list">
                    ${skillsList.map(skill => `<li contenteditable="false">${skill}</li>`).join('')}
                </ul>
            </section>
            <button id="edit-button">Edit</button>
        `;

        resumeOutput.innerHTML = resumeHTML;

        // Add event listeners to make sections editable
        addEditButtonListener();
        addEditableListeners();
    };

    const addEditableListeners = (): void => {
        const editableElements = document.querySelectorAll<HTMLElement>('[contenteditable="true"]');
        editableElements.forEach(element => {
            element.addEventListener('input', (event) => {
                const target = event.target as HTMLElement;
                const id = target.id;

                if (id === 'resume-name') {
                    (document.getElementById('name') as HTMLInputElement).value = target.innerText;
                } else if (id === 'resume-email') {
                    (document.getElementById('email') as HTMLInputElement).value = target.innerText.replace('Email: ', '');
                } else if (id === 'resume-education') {
                    (document.getElementById('education') as HTMLTextAreaElement).value = target.innerText;
                } else if (id === 'resume-work-experience') {
                    (document.getElementById('work-experience') as HTMLTextAreaElement).value = target.innerText;
                } else if (id === 'resume-skills') {
                    const skillsList = document.getElementById('resume-skills-list') as HTMLUListElement;
                    const skills = Array.from(skillsList.children)
                        .map((li) => (li as HTMLLIElement).innerText)
                        .join('\n');
                    (document.getElementById('skills') as HTMLTextAreaElement).value = skills;
                }
            });
        });
    };

    const addEditButtonListener = (): void => {
        const editButton = document.getElementById('edit-button') as HTMLButtonElement | null;
        if (!editButton) return;

        editButton.addEventListener('click', () => {
            const editableElements = document.querySelectorAll<HTMLElement>('[contenteditable="false"]');
            const isEditing = editButton.textContent === 'Edit';

            if (isEditing) {
                // Switch to edit mode
                editableElements.forEach(element => {
                    element.setAttribute('contenteditable', 'true');
                });
                editButton.textContent = 'Save';
            } else {
                // Switch to view mode
                editableElements.forEach(element => {
                    element.setAttribute('contenteditable', 'false');
                });
                editButton.textContent = 'Edit';
            }
        });
    };

    form.addEventListener('submit', generateResume);
});