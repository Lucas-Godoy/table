import React, { useState } from 'react';
import Header from './components/Header';
import Feed from './components/Feed';
import GroupForm from './components/GroupForm';

function App() {
  const [groups, setGroups] = useState([]);
  const [groupToEdit, setGroupToEdit] = useState(null);
  const [searchGenre, setSearchGenre] = useState('');
  const [requests, setRequests] = useState([]);

  const handleDeleteGroup = (index) => {
    const updatedGroups = [...groups];
    updatedGroups.splice(index, 1);
    setGroups(updatedGroups);
  };

  const addGroup = (newGroup) => {
    if (groupToEdit !== null) {
      const updatedGroups = [...groups];
      updatedGroups[groupToEdit] = newGroup;
      setGroups(updatedGroups);
      setGroupToEdit(null);
    } else {
      setGroups([...groups, newGroup]);
    }
  };

  const handleRemoveMember = (groupIndex, memberIndex) => {
    const updatedGroups = [...groups];
    updatedGroups[groupIndex].members.splice(memberIndex, 1);
    setGroups(updatedGroups);
  };

  const handleEditGroup = (index) => {
    setGroupToEdit(index);
  };

  const handleSearchGenre = (genre) => {
    setSearchGenre(genre);
  };

  const sendJoinRequest = (groupId, userId) => {
    setRequests([...requests, { groupId, userId }]);
    // Adicione aqui a lógica para enviar a solicitação ao servidor, se aplicável
  };

  return (
    <>
      <Header searchGenre={searchGenre} handleSearchGenre={handleSearchGenre} />
      <div className="container">
        <h1>Meu Feed</h1>
        <GroupForm 
          addGroup={addGroup} 
          groupToEdit={groupToEdit !== null ? groups[groupToEdit] : null}
          sendJoinRequest={sendJoinRequest}
        />
        <Feed 
          groups={groups} 
          searchGenre={searchGenre}
          handleDeleteGroup={handleDeleteGroup} 
          handleRemoveMember={handleRemoveMember} 
          handleEditGroup={handleEditGroup}
        />
      </div>
    </>
  );
}

export default App;