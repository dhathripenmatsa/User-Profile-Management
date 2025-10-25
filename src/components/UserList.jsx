import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../context/UserContext';
import AddUserModal from './AddUserModal';

// Icon components
const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const UserList = () => {
  const navigate = useNavigate();
  const { users, deleteUser } = useUsers();
  const [showModal, setShowModal] = useState(false);

  const handleView = (userId) => {
    navigate(`/user/${userId}`);
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(userId);
    }
  };

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h2>Users</h2>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <PlusIcon />
          Add user
        </button>
      </div>

      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>User name</th>
              <th>E-mail</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="icon-btn-action" 
                      onClick={() => handleView(user.id)}
                      title="View"
                    >
                      <EyeIcon />
                    </button>
                    <button 
                      className="icon-btn-action" 
                      onClick={() => handleDelete(user.id)}
                      title="Delete"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ PAGINATION REMOVED - No more 3/5 display */}

      {showModal && <AddUserModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default UserList;
