import React from 'react';
import style from "./Header.module.css";

function Header({ searchGenre, handleSearchGenre }) {
  return (
    <header className={style.header}>
      <span>TableFinder</span>
      <nav>
        <a href="">Home</a>
        <a href="">Sair</a>
      </nav>
      <input
        type="text"
        placeholder="Pesquisar por Gênero"
        value={searchGenre}
        onChange={(e) => handleSearchGenre(e.target.value)}
        className={style.searchInput}
      />
    </header>
  );
}

export default Header;