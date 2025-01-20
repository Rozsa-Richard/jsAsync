const apiUrl = 'https://vvri.pythonanywhere.com/api/students';

// Fetch and display all students +
async function fetchStudents() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const studentList = document.getElementById('student-list');
        studentList.innerHTML = '';
        data.forEach(student => {
            const studentDiv = document.createElement('div');
            studentDiv.innerHTML = `
                <p>${student.name}</p>
                <button onclick="showEditStudentForm(${student.id})">Szerkesztés</button>
                <button onclick="deleteStudent(${student.id})">Törlés</button>
            `;
            studentList.appendChild(studentDiv);
        });
    } catch (error) {
        console.error('Error fetching students:', error);
    }
}

// Show create student form +
function showCreateStudentForm() {
    document.getElementById('create-student-form').style.display = 'block';
}

// Cancel create student form +
function cancelCreateStudent() {
    document.getElementById('create-student-form').style.display = 'none';
}

// Create a new student +
async function createStudent(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify({ name, "course_id": 0 }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        });
        const data = await response.json();
        fetchStudents();
        cancelCreateStudent();
    } catch (error) {
        console.error('Error creating student:', error);
    }
}

// Show edit student form +
async function showEditStudentForm(studentId) {
    try {
        const response = await fetch(`${apiUrl}/${studentId}`);
        const data = await response.json();
        document.getElementById('edit-student-id').value = data.id;
        document.getElementById('edit-name').value = data.name;
        document.getElementById('edit-student-form').style.display = 'block';
    } catch (error) {
        console.error('Error fetching student:', error);
    }
}

// Cancel edit student form +
function cancelEditStudent() {
    document.getElementById('edit-student-form').style.display = 'none';
}

// Edit an existing student +
async function editStudent(event) {
    event.preventDefault();
    
    const studentId = document.getElementById('edit-student-id').value;
    const name = document.getElementById('edit-name').value;

    try {
        const response = await fetch(`${apiUrl}/${studentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, "course_id": 0}),
        });
        const data = await response.json();
        fetchStudents();
        cancelEditStudent();
    } catch (error) {
        console.error('Error editing student:', error);
    }
}

// Delete a student
async function deleteStudent(studentId) {
    if (confirm('Biztosan törölni szeretnéd ezt a diákot?')) {
        try {
            await fetch(`${apiUrl}/${studentId}`, {
                method: 'DELETE',
            });
            fetchStudents();
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    }
}
