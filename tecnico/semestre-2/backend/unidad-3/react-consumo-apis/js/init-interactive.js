// --- Inicialización de todos los elementos interactivos del OVA Consumo de APIs ---
document.addEventListener('DOMContentLoaded', () => {
    
    // Sequencer - Flujo de comunicación
    new CodeSequencer('sequencer-flujo',
        [
            'Mostrar "Cargando..."',
            'Hacer petición fetch()',
            'Procesar respuesta con .json()',
            'Guardar datos en el estado',
            'Renderizar datos en pantalla'
        ],
        [
            'Mostrar "Cargando..."',
            'Hacer petición fetch()',
            'Procesar respuesta con .json()',
            'Guardar datos en el estado',
            'Renderizar datos en pantalla'
        ]
    );

    // Componente Visual - fetch básico
    new FetchComponent('visual-fetch',
`async function obtenerUsuarios() {
  try {
    const respuesta = await fetch(
      'https://jsonplaceholder.typicode.com/users'
    );
    const datos = await respuesta.json();
    console.log(datos);
  } catch (error) {
    console.error('Error:', error);
  }
}

obtenerUsuarios();`,
        '🌐 Fetch en acción - Trae datos reales'
    );

    // Matcher - Métodos HTTP
    new CodeMatcher('matcher-metodos', [
        { concept: 'GET', code: 'Obtener lista de productos' },
        { concept: 'POST', code: 'Crear un nuevo usuario' },
        { concept: 'PUT/PATCH', code: 'Actualizar perfil' },
        { concept: 'DELETE', code: 'Eliminar una foto' }
    ]);

    // Componente Visual - Estados (carga, error, éxito)
    new LoadingStatesComponent('visual-estados',
`function ListaProductos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/productos')
      .then(res => res.json())
      .then(data => {
        setProductos(data);
        setCargando(false);
      })
      .catch(err => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  if (cargando) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return <ul>{productos.map(p => <li>{p.nombre}</li>)}</ul>;
}`,
        '⏳ Manejo de estados - Carga, Error, Éxito'
    );

    // Multiple Choice - Estados
    new MultipleChoiceInteractive('choice-estados',
        '¿Qué estado debes mostrar mientras esperas la respuesta de la API?',
        ['Error', 'Cargando', 'Éxito', 'Ninguno'],
        'Cargando',
        'Siempre debes mostrar un estado de "Cargando..." mientras esperas la respuesta para que el usuario sepa que algo está pasando.'
    );

    // Matcher - Códigos HTTP
    new CodeMatcher('matcher-codigos', [
        { concept: '200 OK', code: 'Todo bien, aquí están tus datos' },
        { concept: '404 Not Found', code: 'No existe lo que buscas' },
        { concept: '500 Server Error', code: 'El servidor tiene un problema' },
        { concept: '201 Created', code: 'Se creó exitosamente' }
    ]);

    // Componente Visual - POST
    new PostComponent('visual-post',
`function CrearTarea() {
  const [titulo, setTitulo] = useState('');
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);

    try {
      const res = await fetch('/api/tareas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo })
      });
      
      if (!res.ok) throw new Error('Error al crear');
      
      const nuevaTarea = await res.json();
      alert('Tarea creada: ' + nuevaTarea.titulo);
      setTitulo('');
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Nueva tarea"
      />
      <button disabled={enviando}>
        {enviando ? 'Enviando...' : 'Crear'}
      </button>
    </form>
  );
}`,
        '📤 POST - Crear nueva tarea'
    );

    // Fill in the Blank - POST
    new FillInTheBlank('fill-blank-post',
`const res = await fetch('/api/tareas', {
  ___0___: 'POST',
  ___1___: { 'Content-Type': 'application/json' },
  ___2___: JSON.stringify({ titulo: 'Mi tarea' })
});`,
        [
            { answer: 'method', hint: 'especifica el tipo de petición HTTP' },
            { answer: 'headers', hint: 'información sobre el contenido que envías' },
            { answer: 'body', hint: 'los datos que quieres enviar al servidor' }
        ]
    );

});
