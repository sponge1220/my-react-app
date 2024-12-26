import React, { useState } from 'react';
// import { createMember } from '../api/services/memberService';
import { createMember } from '../api/services/mockMemberService'; // 使用假資料服務

interface CreateMemberFormProps {
  onClose: () => void;
  onMemberCreated: () => void; // 當新增成功時的回調
}

const CreateMemberForm: React.FC<CreateMemberFormProps> = ({ onClose, onMemberCreated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMember(name, email);
      onMemberCreated(); // 通知父組件刷新列表
      onClose(); // 關閉表單
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create Member</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          <button type="submit">Create</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default CreateMemberForm;