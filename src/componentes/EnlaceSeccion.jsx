import { useLocation, useNavigate } from 'react-router-dom';

// Enlace que lleva a una sección de la portada (#escenarios, #programacion...).
// Con HashRouter la "#" ya la usa la ruta, así que se hace scroll por código:
// si estás en otra página, primero vuelve a la portada.
export default function EnlaceSeccion({ id, onNavegar, children, ...props }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const ir = (e) => {
    e.preventDefault();
    if (onNavegar) onNavegar();
    const scroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ block: 'start' });
    };
    if (pathname === '/') {
      scroll();
    } else {
      navigate('/');
      setTimeout(scroll, 120);
    }
  };

  return (
    <a href="#/" onClick={ir} {...props}>
      {children}
    </a>
  );
}
