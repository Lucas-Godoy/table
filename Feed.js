import React, { useState, useEffect } from 'react';

function Feed({ groups, searchGenre, currentUser, handleDeleteGroup, handleRemoveMember, handleEditGroup }) {
  const [filteredGroups, setFilteredGroups] = useState(groups);

  useEffect(() => {
    if (searchGenre === '') {
      setFilteredGroups(groups);
    } else {
      const filtered = groups.filter(group => group.genre.toLowerCase().includes(searchGenre.toLowerCase()));
      setFilteredGroups(filtered);
    }
  }, [searchGenre, groups]);

  return (
    <div>
      {filteredGroups.map((group, groupIndex) => (
        <div key={groupIndex}>
          <h3>{group.name}</h3>
          <p>{group.description}</p>
          <p>Gênero: {group.genre}</p>
          <h4>Membros:</h4>
          <ul>
            {group.members.map((member, memberIndex) => (
              <li key={memberIndex}>
                {member}
                <button onClick={() => handleRemoveMember(groupIndex, memberIndex)}>Remover</button>
              </li>
            ))}
          </ul>
          {currentUser === group.creator && (
            <>
              <button onClick={() => handleDeleteGroup(groupIndex)}>Excluir</button>
              <button onClick={() => handleEditGroup(groupIndex)}>Editar</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Feed;