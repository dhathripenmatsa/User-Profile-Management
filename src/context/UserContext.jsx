import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [
      {
        id: 1,
        name: 'Dave Richards',
        email: 'dave@mail.com',
        contact: '+91 8332883854',
        firstName: 'Dave',
        lastName: 'Richards',
        yearOfBirth: '',
        gender: '',
        phone: '8332883854',
        alternatePhone: '',
        address: '',
        pincode: '',
        domicileState: '',
        domicileCountry: '',
        education: {
          school: '',
          degree: '',
          course: '',
          yearOfCompletion: '',
          grade: ''
        },
        skills: '',
        projects: '',
        // ✅ NEW FIELDS FOR EXPERIENCE TAB
        domain1: '',
        subdomain1: '',
        experience1: '',
        domain2: '',
        subdomain2: '',
        experience2: '',
        linkedinUrl: '',           // ← LinkedIn URL
        resumeUrl: 'myresume.pdf', // ← Resume file name
        workExperience: []
      },
      {
        id: 2,
        name: 'Abhishek Hari',
        email: 'hari@mail.com',
        contact: '',
        firstName: 'Abhishek',
        lastName: 'Hari',
        yearOfBirth: '',
        gender: '',
        phone: '',
        alternatePhone: '',
        address: '',
        pincode: '',
        domicileState: '',
        domicileCountry: '',
        education: {
          school: '',
          degree: '',
          course: '',
          yearOfCompletion: '',
          grade: ''
        },
        skills: '',
        projects: '',
        // ✅ NEW FIELDS FOR EXPERIENCE TAB
        domain1: '',
        subdomain1: '',
        experience1: '',
        domain2: '',
        subdomain2: '',
        experience2: '',
        linkedinUrl: '',
        resumeUrl: '',
        workExperience: []
      },
      {
        id: 3,
        name: 'Nishta Gupta',
        email: 'nishta@mail.com',
        contact: '',
        firstName: 'Nishta',
        lastName: 'Gupta',
        yearOfBirth: '',
        gender: '',
        phone: '',
        alternatePhone: '',
        address: '',
        pincode: '',
        domicileState: '',
        domicileCountry: '',
        education: {
          school: '',
          degree: '',
          course: '',
          yearOfCompletion: '',
          grade: ''
        },
        skills: '',
        projects: '',
        // ✅ NEW FIELDS FOR EXPERIENCE TAB
        domain1: '',
        subdomain1: '',
        experience1: '',
        domain2: '',
        subdomain2: '',
        experience2: '',
        linkedinUrl: '',
        resumeUrl: '',
        workExperience: []
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const addUser = (user) => {
    const newUser = {
      ...user,
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      education: {
        school: '',
        degree: '',
        course: '',
        yearOfCompletion: '',
        grade: ''
      },
      // ✅ Initialize new fields for new users
      domain1: '',
      subdomain1: '',
      experience1: '',
      domain2: '',
      subdomain2: '',
      experience2: '',
      linkedinUrl: '',
      resumeUrl: '',
      workExperience: []
    };
    setUsers([...users, newUser]);
  };

  const updateUser = (id, updatedUser) => {
    setUsers(users.map(user => user.id === id ? { ...user, ...updatedUser } : user));
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const getUserById = (id) => {
    return users.find(user => user.id === parseInt(id));
  };

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser, getUserById }}>
      {children}
    </UserContext.Provider>
  );
};

