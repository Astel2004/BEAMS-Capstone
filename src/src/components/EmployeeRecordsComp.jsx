import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import "../styles/EmployeeRecords.css";
import profileImage from "../assets/profile-user.png";
import Image from "../assets/user.png";
import { useNavigate } from "react-router-dom";

const EmployeeRecordsComp = () => {
  const [activeEmployees, setActiveEmployees] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    surname: "",
    firstname: "",
    middlename: "",
    extension: "",
    civilStatus: "",
    citizenship: "",
    mobileNo: "",
    email: "",
    password: "",
    contact: "",
    birthdate: "",
    gender: "",
    address: {
      province: "",
      city: "",
      zipCode: "",
      barangay: "",
    },
  });
  const navigate = useNavigate();

  const handleViewClick = (employeeId) => {
    navigate(`/employee-profile/${employeeId}`);
  };

  const handleLogout = () => {
    alert("You have been logged out.");
    navigate("/login");
  };

  // Fetch employee records from the backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/employees");
        const data = await response.json();
        setActiveEmployees(data.filter((employee) => employee.status === "Active"));
      } catch (error) {
        console.error("Error fetching employee records:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Handle Add Employee Modal
  const handleAddEmployeeClick = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setNewEmployee({
      surname: "",
      firstname: "",
      middlename: "",
      extension: "",
      civilStatus: "",
      citizenship: "",
      mobileNo: "",
      email: "",
      password: "",
      contact: "",
      birthdate: "",
      gender: "",
      address: {
        province: "",
        city: "",
        zipCode: "",
        barangay: "",
      },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (["province", "city", "zipCode", "barangay"].includes(name)) {
      setNewEmployee({
        ...newEmployee,
        address: { ...newEmployee.address, [name]: value }
      });
    } else {
      setNewEmployee({ ...newEmployee, [name]: value });
    }
  };

  const handleAddEmployeeSubmit = (e) => {
    e.preventDefault();
    // You can add API call here to save the new employee
    alert("Employee added:\n" + JSON.stringify(newEmployee, null, 2));
    handleCloseModal();
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="icon">
            <img src={profileImage} alt="Profile" />
          </div>
          <div className="profile-icon">HR Admin</div>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li onClick={() => navigate("/hr-dashboard")}>Dashboard</li>
            <li onClick={() => navigate("/employee-records")}>Employee Records</li>
            <li onClick={() => navigate("/step-increment")}>Step Increment Tracker</li>
            <li onClick={() => navigate("/reports")}>Reports & Analytics</li>
            <li onClick={() => navigate("/users")}>User Management</li>
            <li onClick={handleLogout}>Log out</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="employee-content">
        <header className="dashboard-header">
          <div className="logo">
            <h2>BEAMS</h2>
          </div>
          <div className="header-icons">
            <span className="icon">📧</span>
            <span className="icon">🔔</span>
            <div className="profile">
              <img src={Image} alt="Image" />
              <span>ADMIN</span>
            </div>
          </div>
        </header>

        <div className="dashboard-title">
          <h2>Employee Records</h2>
        </div>

        {/* Add Employee and Delete Buttons above the Active Employees table */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <button className="add-employee-button" onClick={handleAddEmployeeClick}>
            Add Employee
          </button>
          <button className="delete-employee-button">Delete</button>
        </div>

        {/* Add Employee Modal */}
        {showAddModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Add New Employee</h3>
              <form onSubmit={handleAddEmployeeSubmit} className="add-employee-form">
                <fieldset>
                  <legend>Employee Information</legend>
                <div className="employee-info1">
                <label>
                  Surname:
                  <input
                    type="text"
                    name="surname"
                    value={newEmployee.surname}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  First Name:
                  <input
                    type="text"
                    name="firstname"
                    value={newEmployee.firstname}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Middle Name:
                  <input
                    type="text"
                    name="middlename"
                    value={newEmployee.middlename}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Extension:
                  <input
                    type="text"
                    name="extension"
                    value={newEmployee.extension}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Civil Status:
                  <input
                    type="text"
                    name="civilStatus"
                    value={newEmployee.civilStatus}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Citizenship:
                  <input
                    type="text"
                    name="citizenship"
                    value={newEmployee.citizenship}
                    onChange={handleInputChange}
                  />
                </label>
                </div>
                <div className="employee-info2">
                <label>
                  Mobile No.:
                  <input
                    type="text"
                    name="mobileNo"
                    value={newEmployee.mobileNo}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Email Address:
                  <input
                    type="email"
                    name="email"
                    value={newEmployee.email}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Password:
                  <input
                    type="password"
                    name="password"
                    value={newEmployee.password}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Contact Number:
                  <input
                    type="text"
                    name="contact"
                    value={newEmployee.contact}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Birthdate:
                  <input
                    type="date"
                    name="birthdate"
                    value={newEmployee.birthdate}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Gender:
                  <select
                    name="gender"
                    value={newEmployee.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </label>                  
                </div>
                </fieldset>

                <fieldset>
                  <legend>Address</legend>
                  <div className="address1"> 
                  <label>
                    Province:
                    <input
                      type="text"
                      name="province"
                      value={newEmployee.address.province}
                      onChange={e => setNewEmployee({
                        ...newEmployee,
                        address: { ...newEmployee.address, province: e.target.value }
                      })}
                    />
                  </label>
                  <label>
                    City/Municipality:
                    <input
                      type="text"
                      name="city"
                      value={newEmployee.address.city}
                      onChange={e => setNewEmployee({
                        ...newEmployee,
                        address: { ...newEmployee.address, city: e.target.value }
                      })}
                    />
                  </label>
                  </div>
                  <div className="address2">
                    <label>
                    Zip Code:
                    <input
                      type="text"
                      name="zipCode"
                      value={newEmployee.address.zipCode}
                      onChange={e => setNewEmployee({
                        ...newEmployee,
                        address: { ...newEmployee.address, zipCode: e.target.value }
                      })}
                    />
                  </label>
                  <label>
                    Barangay:
                    <input
                      type="text"
                      name="barangay"
                      value={newEmployee.address.barangay}
                      onChange={e => setNewEmployee({
                        ...newEmployee,
                        address: { ...newEmployee.address, barangay: e.target.value }
                      })}
                    />
                  </label>
                  </div>
                </fieldset>
                <div className="modal-actions">
                  <button type="submit" className="add-employee-button">
                    Add
                  </button>
                  <button type="button" className="delete-employee-button" onClick={handleCloseModal}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Employees Table */}
        <div className="employee-table">
          <h3>Employees</h3>
          <table>
            <thead>
              <tr>
                <th>Employee Id</th>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Position</th>
                <th>Current Step</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {activeEmployees.length > 0 ? (
                activeEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.position}</td>
                    <td>{employee.department}</td>
                    <td>{employee.step}</td>
                    <td>{employee.status}</td>
                    <td>
                      <button
                        className="view-button"
                        onClick={() => handleViewClick(employee.id)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No active employees found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default EmployeeRecordsComp;