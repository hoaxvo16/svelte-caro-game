export function copyMatrix(oldMatrix) {
   let matrix = [];
   for (let i = 0; i < oldMatrix.length; i++) {
      matrix.push(oldMatrix[i].slice());
   }
   return matrix;
}
