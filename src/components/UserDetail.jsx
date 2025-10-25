import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUsers } from '../context/UserContext';

// Icon Components
const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);

const Edit2Icon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getUserById, updateUser } = useUsers();
  const [activeTab, setActiveTab] = useState('basic');
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = getUserById(id);
    if (userData) {
      setUser({
        ...userData,
        linkedinUrl: userData.linkedinUrl || '',
        resumeUrl: userData.resumeUrl || 'myresume.pdf',
        workExperience: userData.workExperience || []
      });
    } else {
      navigate('/');
    }
  }, [id, getUserById, navigate]);

  if (!user) return <div className="loading">Loading...</div>;

  const handleInputChange = (e, section = null) => {
    const { name, value } = e.target;
    
    if (section === 'education') {
      setUser(prev => ({
        ...prev,
        education: {
          ...prev.education,
          [name]: value
        }
      }));
    } else if (section === 'workExperience') {
      const index = parseInt(e.target.dataset.index);
      const field = name;
      setUser(prev => {
        const newWorkExp = [...prev.workExperience];
        newWorkExp[index] = {
          ...newWorkExp[index],
          [field]: value
        };
        return {
          ...prev,
          workExperience: newWorkExp
        };
      });
    } else {
      setUser(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = () => {
    updateUser(user.id, user);
    setIsEditing(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const renderBasicInfo = () => (
    <div className="detail-section">
      <div className="section-header">
        <h3>Basic Details</h3>
        {!isEditing && (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            <Edit2Icon />
          </button>
        )}
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>First name</label>
          <input
            type="text"
            name="firstName"
            value={user.firstName || ''}
            onChange={handleInputChange}
            placeholder="e.g. John"
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Last name</label>
          <input
            type="text"
            name="lastName"
            value={user.lastName || ''}
            onChange={handleInputChange}
            placeholder="e.g. Doe"
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Email ID</label>
          <input
            type="email"
            name="email"
            value={user.email || ''}
            onChange={handleInputChange}
            placeholder="e.g. mrnobody@mail.com"
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Year of birth</label>
          <select
            name="yearOfBirth"
            value={user.yearOfBirth || ''}
            onChange={handleInputChange}
            disabled={!isEditing}
          >
            <option value="">YYYY</option>
            {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select
            name="gender"
            value={user.gender || ''}
            onChange={handleInputChange}
            disabled={!isEditing}
          >
            <option value="">Select an option</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Phone number</label>
          <div className="phone-input">
            <span className="country-code">🇮🇳</span>
            <input
              type="text"
              name="phone"
              value={user.phone || ''}
              onChange={handleInputChange}
              placeholder="8332883854"
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Alternate Phone no</label>
          <input
            type="text"
            name="alternatePhone"
            value={user.alternatePhone || ''}
            onChange={handleInputChange}
            placeholder="e.g. 9876543210"
            disabled={!isEditing}
          />
        </div>

        <div className="form-group full-width">
          <label>Address</label>
          <textarea
            name="address"
            value={user.address || ''}
            onChange={handleInputChange}
            placeholder="Enter here"
            disabled={!isEditing}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Pincode</label>
          <input
            type="text"
            name="pincode"
            value={user.pincode || ''}
            onChange={handleInputChange}
            placeholder="Enter here"
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Domicile state</label>
          <select
            name="domicileState"
            value={user.domicileState || ''}
            onChange={handleInputChange}
            disabled={!isEditing}
          >
            <option value="">Select an option</option>
            <option value="maharashtra">Maharashtra</option>
            <option value="delhi">Delhi</option>
            <option value="karnataka">Karnataka</option>
            <option value="tamil nadu">Tamil Nadu</option>
            <option value="west bengal">West Bengal</option>
          </select>
        </div>

        <div className="form-group">
          <label>Domicile country</label>
          <input
            type="text"
            name="domicileCountry"
            value={user.domicileCountry || ''}
            onChange={handleInputChange}
            placeholder="Enter here"
            disabled={!isEditing}
          />
        </div>
      </div>

      {isEditing && (
        <div className="action-buttons-right">
          <button className="btn-cancel" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
          <button className="btn-save" onClick={handleSave}>
            Save
          </button>
        </div>
      )}
    </div>
  );

  const renderEducation = () => (
    <div className="detail-section">
      <div className="section-header">
        <h3>Education Details</h3>
        {!isEditing && (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            <Edit2Icon />
          </button>
        )}
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>School / College</label>
          <input
            type="text"
            name="school"
            value={user.education?.school || ''}
            onChange={(e) => handleInputChange(e, 'education')}
            placeholder="e.g. Lincoln College"
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Highest degree or equivalent</label>
          <input
            type="text"
            name="degree"
            value={user.education?.degree || ''}
            onChange={(e) => handleInputChange(e, 'education')}
            placeholder="e.g. Bachelors in Technology"
            disabled={!isEditing}
          />
        </div>

        <div className="form-group full-width">
          <label>Course</label>
          <input
            type="text"
            name="course"
            value={user.education?.course || ''}
            onChange={(e) => handleInputChange(e, 'education')}
            placeholder="e.g. Computer science engineering"
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
  <label>Year of completion</label>
  <select
    name="yearOfCompletion"
    value={user.education?.yearOfCompletion || ''}
    onChange={(e) => handleInputChange(e, 'education')}
    disabled={!isEditing}
  >
    <option value="">YYYY</option>
    {Array.from({ length: 81 }, (_, i) => 2030 - i).map(year => (
      <option key={year} value={year}>{year}</option>
    ))}
  </select>
</div>


        <div className="form-group">
          <label>Grade</label>
          <input
            type="text"
            name="grade"
            value={user.education?.grade || ''}
            onChange={(e) => handleInputChange(e, 'education')}
            placeholder="Enter here"
            disabled={!isEditing}
          />
        </div>
      </div>

      <div className="section-header" style={{ marginTop: '32px' }}>
        <h3>Skills & Projects</h3>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Skills</label>
          <input
            type="text"
            name="skills"
            value={user.skills || ''}
            onChange={handleInputChange}
            placeholder="Enter here"
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Projects</label>
          <input
            type="text"
            name="projects"
            value={user.projects || ''}
            onChange={handleInputChange}
            placeholder="Enter here"
            disabled={!isEditing}
          />
        </div>
      </div>

      {isEditing && (
        <div className="action-buttons-right">
          <button className="btn-cancel" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
          <button className="btn-save" onClick={handleSave}>
            Save
          </button>
        </div>
      )}
    </div>
  );

  const renderExperience = () => (
    <>
      {/* Work Experience Section */}
      <div className="detail-section">
        <div className="section-header">
          <h3>Work Experience</h3>
          {!isEditing && (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              <Edit2Icon />
            </button>
          )}
        </div>

        {/* First Work Experience Entry */}
        <div className="form-grid" style={{ marginBottom: '24px' }}>
          <div className="form-group full-width">
            <label>Domain</label>
            <input
              type="text"
              name="domain1"
              value={user.domain1 || ''}
              onChange={handleInputChange}
              placeholder="e.g. Technology"
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Sub-domain</label>
            <input
              type="text"
              name="subdomain1"
              value={user.subdomain1 || ''}
              onChange={handleInputChange}
              placeholder="e.g. MERN Stack"
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Experience</label>
            <select
              name="experience1"
              value={user.experience1 || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
            >
              <option value="">Select an option</option>
              <option value="0-1">0-1 years</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5+">5+ years</option>
            </select>
          </div>
        </div>

        {/* Second Work Experience Entry */}
        <div className="form-grid" style={{ marginBottom: '24px' }}>
          <div className="form-group full-width">
            <label>Domain</label>
            <input
              type="text"
              name="domain2"
              value={user.domain2 || ''}
              onChange={handleInputChange}
              placeholder="e.g. Technology"
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Sub-domain</label>
            <input
              type="text"
              name="subdomain2"
              value={user.subdomain2 || ''}
              onChange={handleInputChange}
              placeholder="e.g. MERN Stack"
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Experience</label>
            <select
              name="experience2"
              value={user.experience2 || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
            >
              <option value="">Select an option</option>
              <option value="0-1">0-1 years</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5+">5+ years</option>
            </select>
          </div>
        </div>

        {isEditing && (
          <div className="action-buttons-right">
            <button className="btn-cancel" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
            <button className="btn-save" onClick={handleSave}>
              Save
            </button>
          </div>
        )}
      </div>

      {/* LinkedIn Section */}
      <div className="detail-section">
        <div className="section-header">
          <h3>LinkedIn</h3>
          {!isEditing && (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              <Edit2Icon />
            </button>
          )}
        </div>

        <div className="form-grid">
          <div className="form-group full-width">
            <label>Profile URL</label>
            <input
              type="text"
              name="linkedinUrl"
              value={user.linkedinUrl || ''}
              onChange={handleInputChange}
              placeholder="linkedin.com/in/mrbean"
              disabled={!isEditing}
            />
          </div>
        </div>

        {isEditing && (
          <div className="action-buttons-right">
            <button className="btn-cancel" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
            <button className="btn-save" onClick={handleSave}>
              Save
            </button>
          </div>
        )}
      </div>

      {/* Resume Section */}
      <div className="detail-section">
        <div className="section-header">
          <h3>Resume</h3>
          {!isEditing && (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              <Edit2Icon />
            </button>
          )}
        </div>

        <div className="resume-container">
          <div className="resume-file">
            <div className="file-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#6366f1" strokeWidth="2" fill="none"/>
                <path d="M14 2v6h6" stroke="#6366f1" strokeWidth="2" fill="none"/>
                <path d="M8 13h8M8 17h8" stroke="#6366f1" strokeWidth="2"/>
              </svg>
            </div>
            <span className="file-name">{user.resumeUrl || 'myresume.pdf'}</span>
            <button className="btn-view" onClick={() => alert('Opening resume...')}>View</button>
          </div>
        </div>

        {isEditing && (
          <div className="action-buttons-right">
            <button className="btn-cancel" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
            <button className="btn-save" onClick={handleSave}>
              Save
            </button>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="user-detail-container">
      <button className="back-btn" onClick={() => navigate('/')}>
        <ArrowLeftIcon />
        Back to Users
      </button>

      <div className="user-profile-header">
        <div className="avatar-large">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="20" r="12" stroke="#6366f1" strokeWidth="2" fill="none"/>
            <path d="M10 50 Q10 35, 30 35 Q50 35, 50 50" stroke="#6366f1" strokeWidth="2" fill="none"/>
          </svg>
        </div>
        <div className="user-info">
          <h2>{user.name}</h2>
          <div className="contact-info">
            <span>{user.email}</span>
            <button className="copy-btn" onClick={() => copyToClipboard(user.email)}>
              <CopyIcon />
            </button>
          </div>
          {user.contact && <p>{user.contact}</p>}
        </div>
      </div>

      <div className="tabs">
        <button 
          className={activeTab === 'basic' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('basic')}
        >
          Basic info
        </button>
        <button 
          className={activeTab === 'education' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('education')}
        >
          Education & Skills
        </button>
        <button 
          className={activeTab === 'experience' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('experience')}
        >
          Experience
        </button>
      </div>

      {activeTab === 'basic' && renderBasicInfo()}
      {activeTab === 'education' && renderEducation()}
      {activeTab === 'experience' && renderExperience()}
    </div>
  );
};

export default UserDetail;

