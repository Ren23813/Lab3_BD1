import './table.css'

export const Table = ({
  columnas,
  datos
}) => {
  return (
    <div className='divT'> 
      {datos.length === 0 ? (
        <h3>No hay datos disponibles</h3>
      ) : (
        <table>
          <thead>
            <tr>
              {columnas.map((col) => (
                <th key={col.key}>{col.titulo}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {datos.map((item) => (
              <tr key={item.id}>
                {columnas.map((col) => (
                  <td key={col.key}>
                    {col.key === 'acciones' ? (
                      <button onClick={() => console.log('Editar', item)}>
                        Editar
                      </button>
                    ) : (
                      item[col.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
