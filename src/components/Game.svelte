<script lang="ts">
   import { afterUpdate, beforeUpdate, onMount } from 'svelte';
   import { copyMatrix } from '../utils/matrix';
   import { calculateWinner, checkDraw } from '../utils/logic';
   import Board from './Board.svelte';

   let row = 3;
   let col = 3;
   let winner = null;
   let isDraw = false;
   let move = 0;
   let winPosition = [];
   let isXNext = true;
   let isAscending = true;
   let matrix = [];
   let div;
   let history = [
      {
         matrix: matrix,
         position: {
            row: 0,
            col: 0,
         },
         move: 0,
      },
   ];

   onMount(() => {
      const rowInit = parseInt(prompt('Insert row'));
      const colInit = parseInt(prompt('Insert col'));
      if (!isNaN(rowInit) && rowInit > 3 && !isNaN(colInit) && colInit > 3) {
         row = rowInit;
         col = colInit;
      }
   });

   afterUpdate(() => {
      if (isAscending) div.scrollTo(0, div.scrollHeight);
      else div.scrollTo({ top: 0, behavior: 'smooth' });
   });

   $: (function () {
      const current = history.find(item => item.move === move);

      const result = calculateWinner(
         current.matrix,
         current.position.row,
         current.position.col
      );

      if (result) {
         winPosition = result.position;
         winner = result.player;
         return;
      } else {
         winner = null;
         winPosition = [];
         if (checkDraw(current.matrix) === true) {
            isDraw = true;
         }
      }
   })();

   $: matrix = Array.from({ length: row }, () => Array(col).fill(null));

   const cellClick = (row: number, col: number) => {
      if (!matrix[row][col] && !winPosition.length) {
         if (isXNext) {
            isXNext = false;
            matrix[row][col] = 'X';
         } else {
            isXNext = true;
            matrix[row][col] = 'O';
         }
         if (isAscending) {
            const sliced = history.slice(0, move + 1);

            sliced.push({
               matrix: copyMatrix(matrix),
               position: {
                  row: row,
                  col: col,
               },
               move: ++move,
            });
            history = sliced;
         } else {
            const sliced = history.slice(
               history.length - move - 1,
               history.length
            );

            sliced.unshift({
               matrix: copyMatrix(matrix),
               position: {
                  row: row,
                  col: col,
               },
               move: ++move,
            });
            history = sliced;
         }
      }
   };

   const goToMove = (moveNum: number) => {
      const filtered = history.find(item => item.move === moveNum);
      isXNext = moveNum % 2 === 0;
      matrix = copyMatrix(filtered.matrix);
      move = moveNum;
   };

   const sortMove = () => {
      isAscending ? (isAscending = false) : (isAscending = true);
      history = history.reverse();
   };

   const restartGame = () => {
      matrix = Array.from({ length: row }, () => Array(col).fill(null));
      history = [
         {
            matrix: matrix,
            position: {
               row: 0,
               col: 0,
            },
            move: 0,
         },
      ];

      winPosition = [];
      isXNext = true;
      winner = null;
      isDraw = false;
      move = 0;
   };
</script>

<div class="game">
   <div class="game-board">
      <div>
         <Board {winPosition} onCellClick={cellClick} {matrix} />
         <div class="button-container">
            <button on:click={sortMove}
               >{#if isAscending}
                  Sort move descending
               {:else}
                  Sort move ascending
               {/if}</button
            >
            <button on:click={restartGame}>Restart game</button>
         </div>
      </div>
      <div>
         {#if winner}<h1>Winner {winner}</h1> {/if}
         {#if isDraw}<h1>Draw!!!</h1> {/if}
         <p>
            {#if isXNext}
               Next Player:X
            {:else}
               Next Player:O
            {/if}
         </p>
      </div>

      <div class="move" bind:this={div}>
         {#each history as item}
            <div>
               {#if item.move}
                  <button
                     class={item.move === move ? 'current-move' : 'move-btn'}
                     on:click={() => goToMove(item.move)}
                     >Go to move {item.move}, Position: row:{item.position.row},
                     col:{item.position.col}</button
                  >
               {/if}
            </div>
         {/each}
      </div>
   </div>
</div>
