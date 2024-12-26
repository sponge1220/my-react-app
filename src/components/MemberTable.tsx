import React, { useState, useEffect } from 'react';
import { fetchMembers, Member } from '../api/services/mockMemberService';
import CreateMemberForm from './CreateMemberForm';

const MemberTable: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMembers = async () => {
    try {
      const data = await fetchMembers();
      setMembers(data);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleMemberCreated = () => {
    loadMembers(); // 刷新列表
  };

  return (
    <div className="card">
      <h1>Member List</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setShowForm(true)}>Add Member</button>
      {showForm && (
        <CreateMemberForm
          onClose={() => setShowForm(false)}
          onMemberCreated={handleMemberCreated}
        />
      )}
    </div>
  );
};

export default MemberTable;
