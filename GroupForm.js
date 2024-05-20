import React, { useState, useEffect } from 'react';

function GroupForm({ addGroup, groupToEdit, sendJoinRequest }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState([]);
  const [newMemberId, setNewMemberId] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    if (groupToEdit) {
      setName(groupToEdit.name);
      setDescription(groupToEdit.description);
      setMembers(groupToEdit.members);
      setGenre(groupToEdit.genre);
    } else {
      resetForm();
    }
  }, [groupToEdit]);

  const resetForm = () => {
    setName('');
    setDescription('');
    setMembers([]);
    setGenre('');
    setNewMemberId('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) return;
    addGroup({ name, description, members, genre });
    resetForm();
  };

  const handleSendRequest = () => {
    if (newMemberId.trim() !== '') {
      sendJoinRequest(name, newMemberId); // Aqui `name` é usado como `groupId`, ajuste conforme necessário
      setNewMemberId('');
    }
  };

  const handleRemoveMember = (index) => {
    const updatedMembers = [...members];
    updatedMembers.splice(index, 1);
    setMembers(updatedMembers);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome do Grupo"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descrição do Grupo"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="ID do Novo Membro"
        value={newMemberId}
        onChange={(e) => setNewMemberId(e.target.value)}
      />
      <button type="button" onClick={handleSendRequest}>Enviar Solicitação</button>

      {members.map((member, index) => (
        <div key={index}>
          <p>{member}</p>
          <button type="button" onClick={() => handleRemoveMember(index)}>Remover</button>
        </div>
      ))}

      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="">Selecione o Gênero</option>
        <option value="D&D">D&D</option>
        <option value="Tormenta">Tormenta</option>
        <option value="Vampire">Vampire</option>
        {/* Adição de mais opções caso necessário */}
      </select>

      <button type="submit">Criar Grupo</button>
    </form>
  );
}

export default GroupForm;