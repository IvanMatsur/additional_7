module.exports = function solveSudoku(matrix) {

  while(true) {
    var initialMatrix = copyArr(matrix);

    for(var i = 0; i < matrix.length; i++) {
      for(var j = 0; j < matrix[i].length; j++) {
        if(matrix[i][j] === 0) {
          var res = getPossibles(matrix, i, j);

          if(res.length === 1) {
            matrix[i][j] = res[0];
          } else {
            var res1 = res.slice();

            for(var k = 0; k < matrix.length; k++) {
              if(k === j) {
                continue;
              }
              res1 = spliceRepeats(res1, getPossibles(matrix, i, k));
            }
            
            if(res1.length === 1) {
              matrix[i][j] = res1[0];
            }
          }

          if(matrix[i][j] === 0) {
            var res2 = res.slice();

            for(var k = 0; k < matrix.length; k++) {
              if(k === i) {
                continue;
              }
              res2 = spliceRepeats(res2, getPossibles(matrix, k, j));
            }
            
            if(res2.length === 1) {
              matrix[i][j] = res2[0];
            }
          }

          if(matrix[i][j] === 0) {
            var res2 = [];
            var res3 = [];

            var res4 = [];
            var res5 = [];

            if(j % 3 === 0) {
              res2 = getPossibles(matrix, i, j + 1);
              res3 = getPossibles(matrix, i, j + 2);
            } else if(j % 3 === 1) {
              res2 = getPossibles(matrix, i, j - 1);
              res3 = getPossibles(matrix, i, j + 1);
            } else if(j % 3 === 2) {
              res2 = getPossibles(matrix, i, j - 2);
              res3 = getPossibles(matrix, i, j - 1);
            }

            if(i % 3 === 0) {
              res4 = getPossibles(matrix, i + 1, j);
              res5 = getPossibles(matrix, i + 2, j);
            } else if(i % 3 === 1) {
              res4 = getPossibles(matrix, i - 1, j);
              res5 = getPossibles(matrix, i + 1, j);
            } else if(i % 3 === 2) {
              res4 = getPossibles(matrix, i - 2, j);
              res5 = getPossibles(matrix, i - 1, j);
            }

            var calc = spliceRepeats(spliceRepeats(spliceRepeats(spliceRepeats(res, res2), res3), res4), res5);

            if(calc.length === 1) {
              matrix[i][j] = calc[0];
            }
          }
        }
      }
    }

    if(compareTwoArrs(initialMatrix, matrix)) {
      break;
    }
  }

  return matrix;
}

function getPossibles(matrix = [], i, j) {
  if(matrix[i][j] !== 0) {
    return [];
  }

  var result;
  var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  var horizontal = [];
  for(var k = 0; k < matrix[i].length; k++) {
    horizontal.push(matrix[i][k]);
  }

  var vertical = [];
  for(var k = 0; k < matrix.length; k++) {
    vertical.push(matrix[k][j]);
  }

  var x = parseInt(i / 3) + 1;
  var y = parseInt(j / 3) + 1;
  var kube = [];
  for(var kx = x * 3 - 3; kx < x * 3; kx++) {
    for(var ky = y * 3 - 3; ky < y * 3; ky++) {
      kube.push(matrix[kx][ky]);
    }
  }

  result = spliceRepeats(spliceRepeats(spliceRepeats(nums, horizontal), vertical), kube);

  return result;
}

function copyArr(arrToCopy = []) {
  var arrCopied = [];

  for(var i = 0; i < arrToCopy.length; i++) {
    arrCopied[i] = arrToCopy[i].slice();
  }

  return arrCopied;
}

function spliceRepeats(target = [], repeats = []) {
  var result = target.slice();

  for(var i = 0; i < repeats.length; i++) {
    for(var j = 0; j < result.length; j++) {
      if(result[j] === repeats[i]) {
        result.splice(j, 1);
        break;
      }
    }
  }

  return result;
}

function compareTwoArrs(arr1 = [], arr2 = []) {
  for(var i = 0; i < arr1.length; i++) {
    for(var j = 0; j < arr1[i].length; j++) {
      if(arr1[i][j] !== arr2[i][j]) {
        return false;
      }
    }
  }

  return true;
}