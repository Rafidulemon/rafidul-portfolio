"use client"
import React, { useEffect, useState } from 'react';

// Define the User type
type User = {
  user_id: string;
  first_name: string;
  last_name: string;
  occupation: string;
  phone: string;
  email: string;
  dob: string; // Adjust based on your date handling
  nationality: string;
  address: string;
  password_hash: string;
  self_introduction: string;
  skill_description: string;
};

function Page() {
  const [user, setUser] = useState<User | null>(null); // Set user state type
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message); // Check if err is an instance of Error
        } else {
          setError('An unknown error occurred'); // Handle unknown error
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {user ? (
        <div>
          <h1>{user.first_name} {user.last_name}</h1>
          <p>Occupation: {user.occupation}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Nationality: {user.nationality}</p>
          <p>Address: {user.address}</p>
          <p>Self Introduction: {user.self_introduction}</p>
          <p>Skills: {user.skill_description}</p>
        </div>
      ) : (
        <p>No user found.</p>
      )}
    </div>
  );
}

export default Page;
