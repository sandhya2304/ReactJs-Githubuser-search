import React, { useState } from 'react';
import './github.css';

const Githubusers = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);

    try {
      const res = await fetch(`https://api.github.com/search/users?q=${query}`);
      const data = await res.json();
      setUsers(data.items || []);
    } catch (error) {
      console.error('Error fetching', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="github-container">
      <h2> Github User Search </h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Seacrh Github users"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}> Search </button>
      </div>

      {loading && <p className="loading"> Loading...</p>}

      <ul className="users-list">
        {users.map((user) => (
          <li key={user.id} className="user-card">
            <img src={user.avatar_url} alt={user.login} />
            <p> {user.login} </p>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Githubusers;
