const Selector = ({ title, value, increment, decrement }) => {
  const buttonStyle = {
    'padding': '0.5rem 1rem',
  };

  const divStyle = {
    'margin': '0.5rem 0rem'
  }

  const spanStyle = {
    'marginLeft': '2rem',
    'marginRight': '2rem',
  };

  return (
    <div style={divStyle}>
      <button style={buttonStyle} onClick={decrement}>-</button>
      <span style={spanStyle}>{title}: {value}</span>
      <button style={buttonStyle} onClick={increment}>+</button>
    </div>
  )
}

export default Selector;
