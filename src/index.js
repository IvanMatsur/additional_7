module.exports = function solveSudoku(matrix) {
  var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var initialMatrix;

  while(hasZeros(matrix)) {
    initialMatrix = matrix.slice();

    for(var i = 0; i < matrix.length; i++) {
      var arr = [];
      var zerosCnt = 0;
      for(var k = 0; k < matrix[i].length; k++) {
        arr.push(matrix[i][k]);
        
        if(matrix[i][k] === 0) {
          zerosCnt++;
        }
      }

      if(zerosCnt === 1) {
        for(var k = 0; k < matrix[i].length; k++) {
          if(matrix[i][k] === 0) {
            matrix[i][k] = defineGap(nums, arr);
          }
        }
      }
    }

    for(var i = 0; i < matrix.length; i++) {
      var arr = [];
      var zerosCnt = 0;
      for(var k = 0; k < matrix.length; k++) {
        arr.push(matrix[k][i]);
        
        if(matrix[k][i] === 0) {
          zerosCnt++;
        }
      }
  
      if(zerosCnt === 1) {
        for(var k = 0; k < matrix[i].length; k++) {
          if(matrix[k][i] === 0) {
            matrix[k][i] = defineGap(nums, arr);
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

function compareTwoArrs(arr1 = [], arr2 = []) {
  for(var i = 0; i < arr1.length; i++) {
    if(arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

function defineGap(nums = [], arr = []) {
  var flag;
  for(var i = 0; i < nums.length; i++) {
    flag = false;
    for(var k = 0; k < arr.length; k++) {
      if(nums[i] === arr[k]) {
        flag = true;
        break;
      }
    }

    if(!flag) {
      return nums[i];
    }
  }
}

function hasZeros(matrix) {
  for(var i = 0; i < matrix.length; i++) {
    for(var k = 0; k < matrix[i].length; k++) {
      if(matrix[i][k] === 0) {
        return true;
      }
    }
  }

  return false;
}