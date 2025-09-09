import React, { useState, useMemo, useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { Link } from 'react-router-dom';
import useDebounced from 'src/hooks/useDebounce';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 16;

  const debounceFn = useDebounced((val: string) => {
    setSearchTerm(val);
  }, 500);

  function handleChange(val: string) {
    setInputValue(val);
    debounceFn(val);
  }

  const filteredPokemons = useMemo(() => {
    return pokemons.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pokemons, searchTerm]);

  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPokemons = filteredPokemons.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading)
    return (
      <div className={classes.loading}>
        <div className={classes.spinner}></div>
        <div className={classes.loadingText}>Loading...</div>
      </div>
    );

  return (
    <div>
      <div className={classes.searchContainer}>
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          className={classes.searchBox}
        />
      </div>

      <div className={classes.root}>
        {filteredPokemons.length === 0 ? (
          <div className={classes.noResults}>No Pokemon found</div>
        ) : (
          paginatedPokemons.map((pkmn) => (
            <div key={pkmn.id} className={classes.card}>
              <Link to={`/pokemon/${pkmn.name}`} className={classes.link}>
                <img
                  src={pkmn.image}
                  alt={pkmn.name}
                  className={classes.image}
                />
                <div className={classes.info}>
                  <h3 className={classes.name}>
                    {pkmn.number} - {pkmn.name}
                  </h3>
                  <div className={classes.types}>
                    {pkmn.types.map((type) => (
                      <span key={type} className={classes.typeBadge}>
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className={classes.pagination}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${classes.pageBtn} ${
              currentPage === 1 ? classes.disabled : ''
            }`}
          >
            ← Prev
          </button>

          <div className={classes.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`${classes.pageBtn} ${
                  currentPage === page ? classes.active : ''
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${classes.pageBtn} ${
              currentPage === totalPages ? classes.disabled : ''
            }`}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '20px',
      padding: '32px',
      boxSizing: 'border-box',
      '@media (max-width: 768px)': { gap: '12px', padding: '16px' },
      '@media (max-width: 480px)': { gap: '10px', padding: '12px' },
    },
    card: {
      flex: '0 1 180px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      background: '#fff',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'pointer',
      color: '#222',
      '&:hover': {
        transform: 'translateY(-6px) scale(1.05)',
        boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
        '& $image': { transform: 'scale(1.15)' }, // image zoom
      },
      '@media (max-width: 480px)': { flex: '0 1 140px', padding: '12px' },
    },
    link: {
      textDecoration: 'none',
    },
    image: {
      width: '120px',
      height: '120px',
      objectFit: 'contain',
      marginBottom: '12px',
      transition: 'transform 0.3s ease',
      '@media (max-width: 480px)': { width: '90px', height: '90px' },
    },
    info: { textAlign: 'center' },
    name: {
      fontSize: '16px',
      fontWeight: 600,
      margin: '8px 0',
      color: '#333',
      '@media (max-width: 480px)': { fontSize: '14px' },
    },
    types: {
      display: 'flex',
      justifyContent: 'center',
      gap: '6px',
      flexWrap: 'wrap',
      textDecoration: 'none',
    },
    typeBadge: {
      padding: '4px 8px',
      borderRadius: '8px',
      background: '#f2f2f2',
      fontSize: '12px',
      fontWeight: 500,
      textTransform: 'capitalize',
      color: '#444',
      transition: 'all 0.25s ease',
      transform: 'scale(1)',
      '@media (max-width: 480px)': { fontSize: '11px', padding: '3px 6px' },
      '&:hover': {
        background: 'red',
        color: '#fff',
        transform: 'scale(1.1)',
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        textDecoration: 'none',
      },
    },
    loading: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '80vh',
      gap: '16px',
    },
    spinner: {
      width: '50px',
      height: '50px',
      border: '6px solid #f3f3f3',
      borderTop: '6px solid #ff4500', // Pokémon-style orange
      borderRadius: '50%',
      animation: '$spin 1s linear infinite',
    },
    loadingText: {
      fontSize: '22px',
      fontWeight: 600,
      color: '#ff4500',
      animation: '$fade 1.5s ease-in-out infinite alternate',
    },
    // Keyframes
    '@keyframes spin': {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' },
    },
    '@keyframes fade': {
      from: { opacity: 0.5 },
      to: { opacity: 1 },
    },
    searchContainer: {
      display: 'flex',
      justifyContent: 'center', // center horizontally
      margin: '24px 0',
      '@media (max-width: 480px)': {
        margin: '16px 0',
      },
      color: 'black',
    },
    searchBox: {
      width: '100%',
      maxWidth: '400px',
      padding: '8px 12px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      fontSize: '14px',
      outline: 'none',
      '&:focus': {
        borderColor: '#ff4500',
        boxShadow: '0 0 5px rgba(255,69,0,0.5)',
      },
      '@media (max-width: 480px)': {
        maxWidth: '90%',
        fontSize: '13px',
      },
      color: 'black',
    },
    noResults: {
      width: '100%',
      textAlign: 'center',
      fontSize: '18px',
      color: '#999',
      marginTop: '32px',
    },
    resultInfo: {
      textAlign: 'center',
      color: '#666',
      fontSize: '14px',
      marginTop: '8px',
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      marginTop: '32px',
      padding: '20px',
    },
    pageNumbers: {
      display: 'flex',
      gap: '4px',
      '@media (max-width: 480px)': {
        display: 'none',
      },
    },
    pageBtn: {
      padding: '8px 12px',
      border: '1px solid #ddd',
      background: 'Black',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      '&:hover:not(.disabled)': {
        background: 'white',
        color: 'black',
        borderColor: '#bbb',
      },
    },
    active: {
      background: '#667eea !important',
      color: 'white !important',
      borderColor: '#667eea !important',
      '&:hover': {
        background: '#5a6fd8 !important',
      },
    },
    disabled: {
      opacity: '0.5',
      cursor: 'not-allowed !important',
      '&:hover': {
        background: 'white !important',
        borderColor: '#ddd !important',
      },
    },
  },
  { name: 'PokemonList' }
);
