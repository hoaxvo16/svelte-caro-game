<script lang="ts">
   import { onMount } from 'svelte';
   import Square from './Square.svelte';

   export let matrix: Array<Array<null | string>>;

   export let onCellClick;
   export let winPostion;
</script>

{#each matrix as array, row}
   <div class="board-row">
      {#each array as element, col}
         <Square
            winPosition={winPostion}
            value={element}
            {row}
            {col}
            onClick={onCellClick}
         />
      {/each}
   </div>
{/each}
