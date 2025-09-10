import { createUseStyles } from 'react-jss';

export const Loader = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.loading}>
        <div className={classes.spinner}></div>
        <div className={classes.loadingText}>Loading...</div>
      </div>
      ;
    </>
  );
};

const useStyles = createUseStyles(
  {
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
      borderTop: '6px solid #ff4500',
      borderRadius: '50%',
      animation: '$spin 1s linear infinite',
    },
    loadingText: {
      fontSize: '22px',
      fontWeight: 600,
      color: '#ff4500',
      animation: '$fade 1.5s ease-in-out infinite alternate',
    },
    '@keyframes spin': {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' },
    },
    '@keyframes fade': {
      from: { opacity: 0.5 },
      to: { opacity: 1 },
    },
  },
  { name: 'Loader' }
);
