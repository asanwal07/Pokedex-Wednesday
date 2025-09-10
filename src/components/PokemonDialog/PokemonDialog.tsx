import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from '@mui/material';
import { useGetPokemon } from '../../hooks/useGetPokemon';
import { createUseStyles } from 'react-jss';
import { Loader } from '../Loader/Loader';

export const PokemonDialog = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useGetPokemon(name || '');
  const classes = useStyles();

  const handleClose = () => navigate('/pokemon');

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      grass: '#78C850',
      poison: '#A040A0',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      ice: '#98D8D8',
      fighting: '#C03028',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC',
      normal: '#A8A878',
    };
    return colors[type.toLowerCase()] || '#68A090';
  };

  return (
    <Dialog open={!!name} onClose={handleClose} fullWidth maxWidth="md">
      {loading ? (
        <DialogContent className={classes.dialogContent}>
          <Loader />
        </DialogContent>
      ) : data?.pokemon ? (
        <div className={classes.root}>
          <DialogTitle className={classes.header}>
            <div className={classes.titleSection}>
              <Typography variant="h4" className={classes.pokemonName}>
                {data.pokemon.name}
              </Typography>
              <Typography variant="subtitle1" className={classes.pokemonNumber}>
                #{String(data.pokemon.number).padStart(3, '0')}
              </Typography>
            </div>
            <IconButton onClick={handleClose} className={classes.closeBtn}>
              ✕
            </IconButton>
          </DialogTitle>

          <DialogContent className={classes.content}>
            <div className={classes.imageSection}>
              <div className={classes.imageContainer}>
                <img
                  src={data.pokemon.image}
                  alt={data.pokemon.name}
                  className={classes.image}
                />
              </div>
              <div className={classes.typesContainer}>
                {data.pokemon.types.map((type: string) => (
                  <span
                    key={type}
                    className={classes.typeBadge}
                    style={{ backgroundColor: getTypeColor(type) }}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <div className={classes.infoSection}>
              <div className={classes.infoGrid}>
                <div className={classes.infoCard}>
                  <span className={classes.infoLabel}>Classification</span>
                  <span className={classes.infoValue}>
                    {data.pokemon.classification}
                  </span>
                </div>

                <div className={classes.infoCard}>
                  <span className={classes.infoLabel}>Height</span>
                  <span className={classes.infoValue}>
                    {data.pokemon.height.minimum} -{' '}
                    {data.pokemon.height.maximum}
                  </span>
                </div>

                <div className={classes.infoCard}>
                  <span className={classes.infoLabel}>Weight</span>
                  <span className={classes.infoValue}>
                    {data.pokemon.weight.minimum} -{' '}
                    {data.pokemon.weight.maximum}
                  </span>
                </div>
              </div>

              <div className={classes.statsSection}>
                <h3 className={classes.statsTitle}>Battle Stats</h3>
                <div className={classes.statsGrid}>
                  <div className={classes.statCard}>
                    <div className={classes.statIcon}>⚡</div>
                    <div className={classes.statInfo}>
                      <span className={classes.statLabel}>Max CP</span>
                      <span className={classes.statValue}>
                        {data.pokemon.maxCP}
                      </span>
                    </div>
                  </div>
                  <div className={classes.statCard}>
                    <div className={classes.statIcon}>❤️</div>
                    <div className={classes.statInfo}>
                      <span className={classes.statLabel}>Max HP</span>
                      <span className={classes.statValue}>
                        {data.pokemon.maxHP}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </div>
      ) : null}
    </Dialog>
  );
};

const useStyles = createUseStyles({
  dialogPaper: {
    borderRadius: '24px !important',
    overflow: 'hidden',
    maxHeight: '90vh',
  },
  root: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '500px',
  },
  header: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    display: 'flex !important',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px !important',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  },
  titleSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  pokemonName: {
    fontWeight: '700 !important',
    fontSize: '28px !important',
    color: '#2c3e50',
    textTransform: 'capitalize',
    margin: '0 !important',
  },
  pokemonNumber: {
    background: 'linear-gradient(45deg, #ff6b6b, #ffa726)',
    color: 'white !important',
    padding: '4px 12px',
    borderRadius: '20px',
    fontWeight: '600 !important',
    fontSize: '14px !important',
  },
  closeBtn: {
    backgroundColor: 'rgba(0, 0, 0, 0.1) !important',
    width: '40px !important',
    height: '40px !important',
    fontSize: '18px !important',
    fontWeight: 'bold !important',
    transition: 'all 0.2s ease !important',
    '&:hover': {
      backgroundColor: 'rgba(255, 0, 0, 0.1) !important',
      transform: 'scale(1.1)',
    },
  },
  content: {
    display: 'flex !important',
    gap: '32px',
    padding: '32px !important',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    minHeight: '400px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '24px',
    },
  },
  imageSection: {
    flex: '0 0 280px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  imageContainer: {
    width: '240px',
    height: '240px',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: '8px',
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '50%',
    },
  },
  image: {
    width: '200px',
    height: '200px',
    objectFit: 'contain',
    filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2))',
    position: 'relative',
    zIndex: 1,
  },
  typesContainer: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  typeBadge: {
    padding: '8px 20px',
    borderRadius: '25px',
    fontSize: '14px',
    fontWeight: '600',
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    transform: 'translateY(0)',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
    },
  },
  infoSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  infoGrid: {
    display: 'grid',
    gap: '16px',
  },
  infoCard: {
    background: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    },
  },
  infoLabel: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#64748b',
  },
  infoValue: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#1e293b',
  },
  statsSection: {
    marginTop: '8px',
  },
  statsTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '16px',
    textAlign: 'center',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    '@media (max-width: 480px)': {
      gridTemplateColumns: '1fr',
      gap: '12px',
    },
  },
  statCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    color: 'white',
    boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  statIcon: {
    fontSize: '24px',
    width: '40px',
    height: '40px',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  statLabel: {
    fontSize: '14px',
    opacity: 0.9,
    fontWeight: '500',
  },
  statValue: {
    fontSize: '20px',
    fontWeight: '700',
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60vh',
  },
});
