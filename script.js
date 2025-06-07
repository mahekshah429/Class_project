let employees = [];
let editIndex = null;

const form = document.getElementById("employeeForm");
const nameinput = document.getElementById("name");
const emailinput = document.getElementById("email");
const roleinput = document.getElementById("role");
const tableBody = document.getElementById("employee-tableBody");
const submitBtn = document.getElementById("submitBtn");

// Handle form submission
form.addEventListener("submit", function(e) {
  e.preventDefault();
  const name = nameinput.value.trim();
  const email = emailinput.value.trim();
  const role = roleinput.value.trim();

  if (!name || !email || !role) return;

  const employeeData = { name, email, role };

  if (editIndex !== null) {
    // Update existing employee
    employees[editIndex] = employeeData;
    editIndex = null;
    submitBtn.textContent = "Add Employee";
  } else {
    // Add new employee
    employees.push(employeeData);
  }

  form.reset();
  renderTable();
});

// Render table
function renderTable() {
  tableBody.innerHTML = "";
  employees.forEach((emp, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.email}</td>
      <td>${emp.role}</td>
      <td>
        <button onclick="editEmployee(${index})">Edit</button>
        <button onclick="deleteEmployee(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Edit employee
function editEmployee(index) {
  const emp = employees[index];
  nameinput.value = emp.name;
  emailinput.value = emp.email;
  roleinput.value = emp.role;
  editIndex = index;
  submitBtn.textContent = "Update Employee";
}

// Delete employee
function deleteEmployee(index) {
  employees.splice(index, 1);
  renderTable();
}
