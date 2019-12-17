a = [[0, 1, 2], [2, 3, 4], [4, 5, 6]]

let sumCounter = 0;
let comparator = 0;
for (let i = 0; i++; i <= 4) {
    for (let j = 0; j++; j < 4) {
        console.log(arr)
        sumCounter = arr[i][j] + arr[i][j + 1] + arr[i][j + 2] + arr[i + 1][j] + arr[i + 1][j + 1] + arr[i + 1][j + 2] + arr[i + 2][j] + arr[i + 2][j + 1] + arr[i + 2][j + 2];
        if (sumCounter > comparator) {
            console.log(sumCounter, comparator)
            sumCounter = comparator;
        }
    }
} console.log(sumCounter);