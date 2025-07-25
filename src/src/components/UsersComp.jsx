import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../styles/Dashboard.css"; // Assuming you have a CSS file for styling
import "../styles/Users.css"; // Import the CSS file for user management styles
import profileImage from "../assets/profile-user.png"; // Import the image
import Image from "../assets/user.png"; // Import the image

const HRDashboardComp = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [activeTab, setActiveTab] = useState("list");
  // Example: Replace with real data fetching
  const [users, setUsers] = useState([]);
  // Employees for dropdown
  const [employees, setEmployees] = useState([]);

  // Fetch employees for dropdown
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/employees");
        const data = await response.json();
        // Sort by surname (or name if no surname)
        const sorted = data.slice().sort((a, b) => {
          const aName = a.surname ? a.surname.toLowerCase() : (a.name || '').toLowerCase();
          const bName = b.surname ? b.surname.toLowerCase() : (b.name || '').toLowerCase();
          return aName.localeCompare(bName);
        });
        setEmployees(sorted);
      } catch (error) {
        console.error("Error fetching employees for dropdown:", error);
      }
    };
    fetchEmployees();
  }, []);
  
  const handleLogout = () => {
    // Perform logout logic here (e.g., clearing tokens)
    alert("You have been logged out.");
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="icon">
            <img src={profileImage} alt="Image" />  
          </div>
          <div className="profile-icon">HR ADMIN</div>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li onClick={() => navigate("/hr-dashboard")}>Dashboard</li>
            <li onClick={() => navigate("/employee-records")}>Employee Records</li>
            <li onClick={() => navigate("/step-increment")}>Step Increment Tracker</li>
            <li onClick={() => navigate("/reports")}>Reports & Analytics</li>
            <li onClick={() => navigate("/users")}>User Management</li>
            <li onClick={handleLogout}>Log out</li>          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="dashboard-header">
          <div className="logo">
            <h2>BEAMS</h2>
          </div>
          <div className="header-icons">
            <span className="icon">📧</span>
            <span className="icon">🔔</span>
            <div className="profile">
              <span className="user">
                <img src={Image} alt="Image" />
              </span>
              ADMIN
            </div>
          </div>
        </header>

        <div className="dashboard-title">
          <h2>User Management</h2>
        </div>

        {/* Navigation Tabs for User Management */}
        <nav className="user-management-nav">
          <button
            className={`user-nav-btn${activeTab === "list" ? " active" : ""}`}
            onClick={() => setActiveTab("list")}
          >
            USER LIST
          </button>
          <button
            className={`user-nav-btn${activeTab === "add" ? " active" : ""}`}
            onClick={() => setActiveTab("add")}
          >
            ADD USER
          </button>
        </nav>

        {/* Content area for user management pages */}
        <section className="user-management-content">
          {activeTab === "list" && (
            <div className="user-list-window">
              <h3>USER LIST</h3>
              <table className="user-list-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Birthdate</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', color: '#888' }}>No users found.</td>
                  </tr>
                ) : (
                  users.map((user, idx) => (
                    <tr key={user._id || idx}>
                      <td>{user.username}</td>
                      <td>{user.name}</td>
                      <td>{user.birthdate}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.status}</td>
                      <td><button>View</button></td>
                    </tr>
                  ))
                )}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === "add" && (
            <div className="add-user-window">
              <h3>ADD NEW USER</h3>
              <form className="add-user-form">

                <div className="add-user-form-row">
                  <label htmlFor="employee">Employee:</label>
                  <select id="employee" name="employee" required className="employee-dropdown">
                    <option value="">Select Employee</option>
                    {employees
                      .filter(emp => !users.some(user => user.employeeId === emp._id))
                      .map(emp => (
                        <option key={emp._id} value={emp._id}>
                          {emp.surname ? `${emp.surname} ${emp.firstname || ''} ${emp.middlename || ''} ${emp.extension || ''}`.trim() : emp.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="add-user-form-row">
                  <label htmlFor="email">Create Email:</label>
                  <input type="email" id="email" name="email" placeholder="Enter user email" required />
                </div>

                <div className="add-user-form-row">
                  <label htmlFor="password">Create Password:</label>
                  <input type="password" id="password" name="password" placeholder="Enter password" required />
                </div>

                <div className="add-user-form-row">
                  <label htmlFor="role">Role:</label>
                  <input type="text" id="role" name="role" value="User" readOnly style={{ background: '#f4f4f4', color: '#888' }} />
                </div>

                <button type="submit" className="add-user-button">Add User</button>
              </form>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default HRDashboardComp;