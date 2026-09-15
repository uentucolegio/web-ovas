// --- Inicialización de todos los elementos interactivos del OVA React Interacción ---
document.addEventListener('DOMContentLoaded', () => {
    
    // Componente Visual - Eventos
    new EventComponent('playground-eventos', 
`function BotonPlay() {
  const reproducir = () => {
    alert('¡Video reproduciendo!');
  };

  return (
    <button onClick={reproducir}>
      ▶️ Play
    </button>
  );
}`, 
        '� Evento onClick en acción'
    );

    // Matcher - Eventos
    new CodeMatcher('matcher-eventos', [
        { concept: 'onClick', code: 'Hacer clic en un botón' },
        { concept: 'onChange', code: 'Escribir en un input' },
        { concept: 'onSubmit', code: 'Enviar un formulario' },
        { concept: 'onMouseEnter', code: 'Pasar el mouse sobre algo' }
    ]);

    // Multiple Choice - Estado
    new MultipleChoiceInteractive('choice-estado',
        '¿Cuál de estos datos DEBE estar en el estado?',
        ['El nombre de tu app (nunca cambia)', 'El número de likes de una publicación', 'Una constante matemática como PI', 'El año actual'],
        'El número de likes de una publicación',
        'El número de likes cambia cuando el usuario hace clic, por lo tanto debe estar en el estado para que React actualice la pantalla automáticamente.'
    );

    // Componente Visual - useState
    new UseStateComponent('playground-usestate', 
`function BotonLike() {
  const [likes, setLikes] = useState(0);

  const darLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div>
      <p>👍 {likes} likes</p>
      <button onClick={darLike}>
        Me gusta
      </button>
    </div>
  );
}`, 
        '� useState - Contador de likes'
    );

    // Componente Visual - Inputs controlados
    new InputComponent('playground-inputs', 
`function Buscador() {
  const [busqueda, setBusqueda] = useState('');

  return (
    <div>
      <input 
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar..."
      />
      <p>Estás buscando: {busqueda}</p>
    </div>
  );
}`, 
        '� Input controlado - Buscador en tiempo real'
    );

    // Fill in the Blank - Input controlado
    new FillInTheBlank('fill-blank-input', 
`function Buscador() {
  const [busqueda, ___0___] = useState('');

  return (
    <input 
      ___1___={busqueda}
      ___2___={(e) => setBusqueda(___3___)}
    />
  );
}`, 
        [
            { answer: 'setBusqueda', hint: 'función para actualizar el estado' },
            { answer: 'value', hint: 'prop que muestra el valor del estado' },
            { answer: 'onChange', hint: 'evento que se dispara al escribir' },
            { answer: 'e.target.value', hint: 'el texto que el usuario escribió' }
        ]
    );

    // Componente Visual - useEffect
    new UseEffectComponent('playground-useeffect', 
`function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('/api/usuarios')
      .then(res => res.json())
      .then(data => {
        setUsuarios(data);
        setCargando(false);
      });
  }, []); // Solo al inicio

  if (cargando) return <p>Cargando...</p>;

  return (
    <ul>
      {usuarios.map(user => (
        <li key={user.id}>{user.nombre}</li>
      ))}
    </ul>
  );
}`, 
        '� useEffect - Carga datos al montar'
    );

    // Sequencer - useEffect
    new CodeSequencer('sequencer-useeffect',
        [
            'El componente se monta en pantalla',
            'useEffect se ejecuta',
            'Se hace fetch a la API',
            'Se actualiza el estado con los datos',
            'React vuelve a renderizar con los nuevos datos'
        ],
        [
            'El componente se monta en pantalla',
            'useEffect se ejecuta',
            'Se hace fetch a la API',
            'Se actualiza el estado con los datos',
            'React vuelve a renderizar con los nuevos datos'
        ]
    );

    // Multiple Choice - Errores
    new MultipleChoiceInteractive('choice-errores',
        '¿Cuál de estos códigos tiene un error?',
        [
            'const [nombre, setNombre] = useState("Ana")', 
            'usuario.nombre = "Carlos" // donde usuario es estado', 
            'setContador(contador + 1)', 
            'useEffect(() => { console.log("Hola") }, [])'
        ],
        'usuario.nombre = "Carlos" // donde usuario es estado',
        'No puedes modificar el estado directamente. Debes usar la función set que te da useState, por ejemplo: setUsuario({ nombre: "Carlos" })'
    );

});
