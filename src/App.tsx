import { useTheme } from '@hooks/useTheme';
import ThisIsNotAnEasterEgg  from '@components/ThisIsNotAnEasterEgg'

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
    <div>
      <h1>Mi Aplicación con Tema</h1>
      <p>Tema actual: {theme}</p>
      <button onClick={toggleTheme}>Cambiar Tema</button>
    </div>
      <ThisIsNotAnEasterEgg />
    </>
  );
};

export default App;