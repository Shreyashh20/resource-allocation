// Sample Data
const employees = [
    {
        id: 1,
        name: "Riya Sharma",
        role: "Frontend Developer",
        skills: ["React", "JavaScript", "CSS", "HTML"],
        weeklyCapacity: 40,
        hoursAssigned: 32,
        status: "busy"
    },
    {
        id: 2,
        name: "Akash Kumar",
        role: "Backend Developer",
        skills: ["Node.js", "Python", "MongoDB", "PostgreSQL"],
        weeklyCapacity: 40,
        hoursAssigned: 45,
        status: "unavailable"
    },
    {
        id: 3,
        name: "Priya Patel",
        role: "Full Stack Developer",
        skills: ["React", "Node.js", "JavaScript", "MongoDB"],
        weeklyCapacity: 40,
        hoursAssigned: 25,
        status: "available"
    },
    {
        id: 4,
        name: "Rahul Singh",
        role: "UI/UX Designer",
        skills: ["Figma", "Adobe XD", "Photoshop", "Illustrator"],
        weeklyCapacity: 40,
        hoursAssigned: 30,
        status: "busy"
    },
    {
        id: 5,
        name: "Sneha Gupta",
        role: "DevOps Engineer",
        skills: ["AWS", "Docker", "Kubernetes", "Jenkins"],
        weeklyCapacity: 40,
        hoursAssigned: 20,
        status: "available"
    }
];

const projects = [
    {
        id: 1,
        name: "Food App",
        requiredSkills: ["React", "Node.js", "MongoDB"],
        duration: 8,
        assignedMembers: ["Riya Sharma", "Priya Patel"],
        status: "in-progress"
    },
    {
        id: 2,
        name: "E-commerce Platform",
        requiredSkills: ["React", "Python", "PostgreSQL"],
        duration: 12,
        assignedMembers: ["Akash Kumar", "Priya Patel"],
        status: "completed"
    },
    {
        id: 3,
        name: "Mobile Banking App",
        requiredSkills: ["React Native", "Node.js", "AWS"],
        duration: 16,
        assignedMembers: ["Sneha Gupta"],
        status: "not-started"
    },
    {
        id: 4,
        name: "Corporate Website",
        requiredSkills: ["HTML", "CSS", "JavaScript", "Figma"],
        duration: 6,
        assignedMembers: ["Rahul Singh"],
        status: "in-progress"
    }
];

let allocations = [
    {
        id: 1,
        projectId: 1,
        employeeId: 1,
        hoursPerWeek: 20,
        duration: 8
    },
    {
        id: 2,
        projectId: 1,
        employeeId: 3,
        hoursPerWeek: 15,
        duration: 8
    },
    {
        id: 3,
        projectId: 2,
        employeeId: 2,
        hoursPerWeek: 25,
        duration: 12
    }
];

// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const pageContents = document.querySelectorAll('.page-content');
const pageTitle = document.querySelector('.page-title');
const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');

// Navigation
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all nav items
        navItems.forEach(nav => nav.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
        
        // Get page name
        const pageName = item.getAttribute('data-page');
        
        // Hide all page contents
        pageContents.forEach(page => page.style.display = 'none');
        
        // Show selected page
        const selectedPage = document.getElementById(`${pageName}-page`);
        if (selectedPage) {
            selectedPage.style.display = 'block';
        }
        
        // Update page title
        const linkText = item.querySelector('.nav-link span').textContent;
        pageTitle.textContent = linkText;
        
        // Initialize page-specific content
        initializePage(pageName);
    });
});

// Sidebar toggle for mobile
sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Initialize page content
function initializePage(pageName) {
    switch(pageName) {
        case 'dashboard':
            initializeDashboard();
            break;
        case 'employees':
            populateEmployeesTable();
            break;
        case 'projects':
            populateProjectsTable();
            break;
        case 'allocation':
            initializeAllocation();
            break;
        case 'reports':
            initializeReports();
            break;
    }
}

// Dashboard initialization
function initializeDashboard() {
    // Initialize utilization chart
    const ctx = document.getElementById('utilizationChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: employees.map(emp => emp.name.split(' ')[0]),
                datasets: [{
                    label: 'Hours Assigned',
                    data: employees.map(emp => emp.hoursAssigned),
                    backgroundColor: '#3b82f6',
                    borderRadius: 4
                }, {
                    label: 'Weekly Capacity',
                    data: employees.map(emp => emp.weeklyCapacity),
                    backgroundColor: '#e5e7eb',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 50
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    }
}

// Populate employees table
function populateEmployeesTable() {
    const tbody = document.getElementById('employees-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = employees.map(emp => `
        <tr>
            <td><strong>${emp.name}</strong></td>
            <td>${emp.role}</td>
            <td>
                <div class="skills-tags">
                    ${emp.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </td>
            <td>${emp.weeklyCapacity}</td>
            <td>${emp.hoursAssigned}</td>
            <td>
                <span class="status-badge status-${emp.status}">
                    ${emp.status.charAt(0).toUpperCase() + emp.status.slice(1)}
                </span>
            </td>
            <td>
                <button class="btn btn-outline" onclick="editEmployee(${emp.id})">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Populate projects table
function populateProjectsTable() {
    const tbody = document.getElementById('projects-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = projects.map(project => `
        <tr>
            <td><strong>${project.name}</strong></td>
            <td>
                <div class="skills-tags">
                    ${project.requiredSkills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </td>
            <td>${project.duration} weeks</td>
            <td>${project.assignedMembers.join(', ')}</td>
            <td>
                <span class="status-badge status-${project.status.replace(' ', '-')}">
                    ${project.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
            </td>
            <td>
                <button class="btn btn-outline" onclick="editProject(${project.id})">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Initialize allocation page
function initializeAllocation() {
    populateProjectSelect();
    populateEmployeeSelect();
    updateAllocationStatus();
}

function populateProjectSelect() {
    const select = document.getElementById('project-select');
    if (!select) return;
    
    select.innerHTML = '<option value="">Select a project</option>' +
        projects.map(project => `<option value="${project.id}">${project.name}</option>`).join('');
}

function populateEmployeeSelect() {
    const select = document.getElementById('employee-select');
    if (!select) return;
    
    select.innerHTML = '<option value="">Select an employee</option>' +
        employees.map(emp => `<option value="${emp.id}">${emp.name}</option>`).join('');
}

function updateAllocationStatus() {
    const container = document.getElementById('allocation-status');
    if (!container) return;
    
    const allocationItems = allocations.map(allocation => {
        const project = projects.find(p => p.id === allocation.projectId);
        const employee = employees.find(e => e.id === allocation.employeeId);
        const isOverbooked = employee && employee.hoursAssigned > employee.weeklyCapacity;
        
        return `
            <div class="allocation-item ${isOverbooked ? 'overbooked' : ''}">
                <h4>${employee?.name} → ${project?.name}</h4>
                <p>${allocation.hoursPerWeek} hours/week for ${allocation.duration} weeks</p>
                ${isOverbooked ? '<div class="overbook-alert"><i class="fas fa-exclamation-triangle"></i> Employee is overbooked!</div>' : ''}
            </div>
        `;
    }).join('');
    
    container.innerHTML = allocationItems || '<p>No current allocations</p>';
}

// Initialize reports
function initializeReports() {
    // Initialize skills chart
    const skillsCtx = document.getElementById('skillsChart');
    if (skillsCtx) {
        const skillCounts = {};
        employees.forEach(emp => {
            emp.skills.forEach(skill => {
                skillCounts[skill] = (skillCounts[skill] || 0) + 1;
            });
        });
        
        new Chart(skillsCtx, {
            type: 'pie',
            data: {
                labels: Object.keys(skillCounts),
                datasets: [{
                    data: Object.values(skillCounts),
                    backgroundColor: [
                        '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
                        '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

// Modal functionality
const modals = document.querySelectorAll('.modal');
const modalCloses = document.querySelectorAll('.modal-close, .modal-cancel');

// Add employee modal
document.getElementById('add-employee-btn')?.addEventListener('click', () => {
    document.getElementById('employee-modal').style.display = 'block';
});

// Create project modal
document.getElementById('create-project-btn')?.addEventListener('click', () => {
    document.getElementById('project-modal').style.display = 'block';
});

// Close modals
modalCloses.forEach(close => {
    close.addEventListener('click', () => {
        modals.forEach(modal => modal.style.display = 'none');
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Form submissions
document.getElementById('employee-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const newEmployee = {
        id: employees.length + 1,
        name: formData.get('emp-name'),
        role: formData.get('emp-role'),
        skills: formData.get('emp-skills').split(',').map(s => s.trim()),
        weeklyCapacity: parseInt(formData.get('emp-capacity')),
        hoursAssigned: 0,
        status: 'available'
    };
    
    employees.push(newEmployee);
    populateEmployeesTable();
    document.getElementById('employee-modal').style.display = 'none';
    e.target.reset();
    
    showNotification('Employee added successfully!', 'success');
});

document.getElementById('project-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const newProject = {
        id: projects.length + 1,
        name: formData.get('proj-name'),
        requiredSkills: formData.get('proj-skills').split(',').map(s => s.trim()),
        duration: parseInt(formData.get('proj-duration')),
        assignedMembers: [],
        status: 'not-started'
    };
    
    projects.push(newProject);
    populateProjectsTable();
    populateProjectSelect();
    document.getElementById('project-modal').style.display = 'none';
    e.target.reset();
    
    showNotification('Project created successfully!', 'success');
});

// Allocation form
document.getElementById('allocation-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const projectId = parseInt(formData.get('project-select'));
    const employeeId = parseInt(formData.get('employee-select'));
    const hoursPerWeek = parseInt(formData.get('hours-week'));
    const duration = parseInt(formData.get('assignment-duration'));
    
    // Check if employee exists and update hours
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
        employee.hoursAssigned += hoursPerWeek;
        if (employee.hoursAssigned > employee.weeklyCapacity) {
            employee.status = 'unavailable';
        } else if (employee.hoursAssigned >= employee.weeklyCapacity * 0.8) {
            employee.status = 'busy';
        }
    }
    
    // Add allocation
    const newAllocation = {
        id: allocations.length + 1,
        projectId,
        employeeId,
        hoursPerWeek,
        duration
    };
    
    allocations.push(newAllocation);
    updateAllocationStatus();
    e.target.reset();
    
    showNotification('Resource allocated successfully!', 'success');
});

// Auto-allocate functionality
document.getElementById('auto-allocate-btn')?.addEventListener('click', () => {
    showNotification('Auto-allocation feature coming soon!', 'info');
});

// Export functionality
document.getElementById('export-pdf-btn')?.addEventListener('click', () => {
    showNotification('PDF export feature coming soon!', 'info');
});

document.getElementById('export-csv-btn')?.addEventListener('click', () => {
    showNotification('CSV export feature coming soon!', 'info');
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add notification styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 0.5rem;
                color: white;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                z-index: 3000;
                animation: slideIn 0.3s ease;
            }
            .notification-success { background: #10b981; }
            .notification-error { background: #ef4444; }
            .notification-info { background: #3b82f6; }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Utility functions
function editEmployee(id) {
    showNotification('Edit employee feature coming soon!', 'info');
}

function editProject(id) {
    showNotification('Edit project feature coming soon!', 'info');
}

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeDashboard();
    populateEmployeesTable();
    populateProjectsTable();
    initializeAllocation();
    initializeReports();
});

// Hand