import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../styles/Dashboard.css"; // Assuming you have a CSS file for styling
import "../styles/Users.css"; // Import the CSS file for user management styles
import profileImage from "../assets/profile-user.png"; // Import the image
import Image from "../assets/user.png"; // Import the image

const HRDashboardComp = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [activeTab, setActiveTab] = useState("list");
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
            User List
          </button>
          <button
            className={`user-nav-btn${activeTab === "add" ? " active" : ""}`}
            onClick={() => setActiveTab("add")}
          >
            Add User
          </button>
        </nav>

        {/* Content area for user management pages */}
        <section className="user-management-content">
          {activeTab === "list" && (
            <div className="user-list-window">
              <h3>User List</h3>
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
                  {/* Example rows, replace with dynamic data as needed */}
                  <tr>
                    <td>jdoe</td>
                    <td>John Doe</td>
                    <td>1990-01-01</td>
                    <td>jdoe@email.com</td>
                    <td>User</td>
                    <td>Active</td>
                    <td><button>View</button></td>
                  </tr>
                  <tr>
                    <td>asmith</td>
                    <td>Alice Smith</td>
                    <td>1992-05-12</td>
                    <td>asmith@email.com</td>
                    <td>User</td>
                    <td>Inactive</td>
                    <td><button>View</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {activeTab === "add" && (
            <div className="add-user-window">
              {/* Add User content goes here */}
              <h3>Add User</h3>
              <p>Display the add user form here.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default HRDashboardComp;