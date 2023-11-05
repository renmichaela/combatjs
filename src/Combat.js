import Actions from './Stages/Actions'
import { Client } from 'boardgame.io/react';
import { CombatMap } from './CombatMap';
import { useState } from 'react';
import Selector from './Components/Selector';

const spendMovement = ({ G, playerID }) => {

};

const boardOptions = (x, y) => {
  const cells = Array(x * y).fill(null);

  return {
    x,
    y,
    cells
  }
}

const Combat = (numPlayers = 3, xCells = 4, yCells = 4) => {
  const playersArray = () => [...Array(numPlayers).keys()];

  const rollInitiative = ({ random }) => {
    return playersArray().map((player) => ({
      player,
      roll: random.D20()
    })).sort((a, b) => a.roll - b.roll).flatMap(obj => obj.player);
  };

  return {
    setup: ({ ctx, random }) => {
      ctx.numPlayers = numPlayers
  
      return {
        board: boardOptions(xCells, yCells),
        playerStats: playersArray().fill({})
      }
    },
    moves: {...Actions, spendMovement},
    turn: {
      order: {
        first: ({ G, ctx }) => 0,
        next: ({ G, ctx }) => (ctx.playOrderPos + 1) % ctx.numPlayers,
        playOrder: rollInitiative
      },
      stages: {
        movement: {
          moves: {}
        },
        action: {
          moves: Actions
        },
        bonusAction: {
          moves: {}
        }
      }
    },
  }
};

const CombatView = () => {
  const [ players, setPlayers ] = useState(2);
  const [ xCells, setXCells ] = useState(10);
  const [ yCells, setYCells ] = useState(10);

  const game = Combat(players, xCells, yCells);
  const CombatClient = Client({
    game,
    board: CombatMap
  });

  const flexStyle = {
    'display': 'flex',
  };

  return (
    <>
      <h1>Combat JS</h1>
      <div style={flexStyle}>
        <div>
          <Selector
            title="Players"
            value={players}
            increment={() => setPlayers(players + 1)}
            decrement={() => setPlayers(players - 1)}
          />
          <Selector
            title="X Cells"
            value={xCells}
            increment={() => setXCells(xCells + 1)}
            decrement={() => setXCells(xCells - 1)}
          />
          <Selector
            title="Y Cells"
            value={yCells}
            increment={() => setYCells(yCells + 1)}
            decrement={() => setYCells(yCells - 1)}
          />
        </div>
        <CombatClient />
      </div>
    </>
  )
};

export default CombatView;
