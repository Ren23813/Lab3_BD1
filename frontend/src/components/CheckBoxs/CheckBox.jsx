import { Select } from "../Selects/Select";
import './checkBox.css';

export const CheckBox = ({ club, onChange }) => {
  const handleCheckbox = (e) => {
    const activo = e.target.checked;

    onChange({
      ...club,
      activo,
      seleccion1: activo ? "activo" : "",
      seleccion2: activo ? "miembro" : "",
    });
  };

  const handleSelect1 = (e) => {
    onChange({ ...club, seleccion1: e.target.value });
  };

  const handleSelect2 = (e) => {
    onChange({ ...club, seleccion2: e.target.value });
  };

  return (
    <div className="divC">
      <div className="divTitle">
        <input
          className="check"
          type="checkbox"
          checked={club.activo}
          onChange={handleCheckbox}
        />
        <label className="title">{club.nombre}</label>
      </div>

      {club.activo && (
        <div className="divSelect">
          <Select
            value={club.seleccion1}
            onChange={handleSelect1}
            opciones={['activo', 'inactivo', 'vetado']}
          />
          <Select
            value={club.seleccion2}
            onChange={handleSelect2}
            opciones={['presidente', 'vicepresidente', 'tesorero', 'vocal', 'miembro']}
          />
        </div>
      )}
    </div>
  );
};
