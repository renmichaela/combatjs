import React from 'react';

export function CombatMap({ G }) {
  const cellStyle = {
    border: '1px solid #555',
    width: '50px',
    height: '50px',
    lineHeight: '50px',
    textAlign: 'center',
  };

  let tbody = [];
  for (let i = 0; i < G.board.y; i++) {
    let cells = [];
    for (let j = 0; j < G.board.x; j++) {
      const id = G.board.y * i + j;
      cells.push(
        <td key={id}>
          {G.board.cells[id] ? (
            <div style={cellStyle}>{G.board.cells[id]}</div>
          ) : (
            <button style={cellStyle} />
          )}
        </td>
      );
    }
    tbody.push(<tr key={i}>{cells}</tr>);
  }

  return (
    <>
      <div>
        <table id="board">
          <tbody>{tbody}</tbody>
        </table>
      </div>
    </>
  );
}