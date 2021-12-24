<script lang="ts">
   import Square from './Square.svelte';

   export let matrix: Array<Array<null | string>>;

   export let onCellClick;
   export let winPosition;
</script>

{#each matrix as array, row}
   <div class="board-row">
      {#each array as element, col}
         <Square
            {winPosition}
            value={element}
            {row}
            {col}
            onClick={onCellClick}
         />
      {/each}
   </div>
{/each}
