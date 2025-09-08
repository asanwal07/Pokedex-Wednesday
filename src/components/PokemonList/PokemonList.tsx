import React, { useState, useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();

  const [searchTerm, setSearchTerm] = useState('');

  const filteredPokemons = useMemo(() => {
    return pokemons.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pokemons, searchTerm]);

  if (loading)
    return (
      <div className={classes.loading}>
        <div className={classes.spinner}></div>
        <div className={classes.loadingText}>Loading...</div>
      </div>
    );

  console.log(pokemons.length);

  return (
    <div>
      <div className={classes.searchContainer}>
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={classes.searchBox}
        />
      </div>

      <div className={classes.root}>
        {filteredPokemons.length === 0 ? (
          <div className={classes.noResults}>No Pokemon found</div>
        ) : (
          filteredPokemons.map((pkmn) => (
            <div key={pkmn.id} className={classes.card}>
              <img src={pkmn.image} alt={pkmn.name} className={classes.image} />
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
            </div>
          ))
        )}
      </div>
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
    },
    typeBadge: {
      padding: '4px 8px',
      borderRadius: '8px',
      background: '#f2f2f2',
      fontSize: '12px',
      fontWeight: 500,
      textTransform: 'capitalize',
      color: '#444',
      '@media (max-width: 480px)': { fontSize: '11px', padding: '3px 6px' },
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
  },
  { name: 'PokemonList' }
);
