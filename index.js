class Board {
    constructor() {
      this.arr = [];
      this.arrCopy = [];
      this.p1 = 0;
      this.n = 10;
      this.snakeMap = {};
      this.ladderMap = {};
      this.currRow = -1;
      this.currColumn = -1;
    }
  
    generateBoard(n) {
        this.arr = [];
      for (let i = 0; i < n; i++) {
        this.arr.push([]);
        /* if(i%2 !== 0) {
          for (let j = (i + 1)*n; j >= (n * i) + 1; j--) {
            this.arr[i].push({
              value: j
            });
          }
        } else { */
            for (let j = (n * i) + 1; j <= (i + 1) * n; j++) {
            this.arr[i].push({
              value: j
            });
          }
       // }
      }
      return this.arr;
    }
  
    generatePlayers(n) {
      this.p1 = 0;
    }
  
    generateSnakes() {
      this.snakeMap = {
        13: 2,
        18: 1,
        67: 23
      };
  
    }
  
    generateLadders() {
      this.ladderMap = {
        10: 25,
        15: 30,
        45: 80,
        30: 70
      };
    }
    
    calculateMatrixPos() {
      for(let i = 0; i < this.arr.length; i++) {
          for(let j = 0; j < this.arr[i].length; j++) {
            if(this.p1 == this.arr[i][j].value) {
              this.currRow = i;
            this.currColumn = j;
          }
        }
      }
    }
  
    setPlayerPosition(val) {
      if(this.p1 != 0) delete this.arr[this.currRow][this.currColumn].p1;
      this.p1 = this.p1 + val;
      if(this.p1 > (this.n * this.n)) {
          this.p1 = this.p1 - val;
          return;
       }
       
      if(this.ladderMap[this.p1]) {
                  this.p1 = this.ladderMap[this.p1]; 
      } else if(this.snakeMap[this.p1]) {
                  this.p1 = this.snakeMap[this.p1];
      }
      this.calculateMatrixPos();
      this.arr[this.currRow][this.currColumn].p1 = 'P1';
      
      let boardHtml = '';
          this.arrCopy.map(f => {
        f.map(d => {
          boardHtml += `<div>${d.value} ${this.ladderMap[d.value] ? 'L' : ''} ${this.snakeMap[d.value] ? 'S' : ''} ${d.p1 ? '<span style="color:red">p1</span>' : ''} </div>`
        })
        boardHtml += `<br/>`;
      })
      document.getElementById('board').innerHTML = boardHtml;
    }
  }
  
  class Display extends Board {
    constructor() {
      super();
    }
  
    displayBoard(n) {
      super.generateBoard(n);
      super.generateSnakes();
      super.generateLadders();
      let boardHtml = '';
      this.arrCopy = this.arr.map(d => d.slice());
      this.arrCopy.reverse().map((f,index) => {
          if(index % 2 == 0) f = f.reverse();
        f.map(d => {
          boardHtml += `<div>${d.value} ${this.ladderMap[d.value] ? 'L' : ''} ${this.snakeMap[d.value] ? 'S' : ''} ${d.p1 ? 'p1' : ''} </div>`
        })
        boardHtml += `<br/>`;
      })
      document.getElementById('board').innerHTML = boardHtml;
    }
  }
  
  let obj = new Display();
  obj.displayBoard(10);
  
  function rollDie() {
    let dice = [1, 2, 3, 4, 5, 6];
    let val = dice[Math.floor(Math.random() * dice.length)];
    document.getElementById('dice').innerHTML = val;
      obj.setPlayerPosition(val);
  }
  