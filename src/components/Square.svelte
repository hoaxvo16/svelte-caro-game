<script lang="ts">
   export let row: number;
   export let col: number;
   export let value: string | null;
   export let onClick;
   export let winPosition;

   let isWinSquare = false;

   $: isWinSquare = winPosition.find(
      item => item.col === col && item.row === row
   );
</script>

<button
   on:click={() => onClick(row, col)}
   class={isWinSquare ? 'square-win' : 'square'}
>
   {#if value}
      {value}
   {/if}
</button>
