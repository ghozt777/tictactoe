var readlineSync = require('readline-sync');
var c1 = [" ","|"," ","|"," "];
var c2 = ["-","+","-","+","-"];
var c3 = [" ","|"," ","|"," "];
var c4 = ["-","+","-","+","-"];
var c5 = [" ","|"," ","|"," "];
var userPos = new Array();
var cpuPos = new Array();
var userCount = 0;
var cpuCount =0;
function printGrid()
{
console.log(...c1);
console.log(...c2);
console.log(...c3);
console.log(...c4);
console.log(...c5);
}
function takeUserInput()
{
    if((9-userCount+cpuCount)>0)
    {

        var temp = readlineSync.question("enter the position(1-9): ");
        var condition = checkForIllegalMoves("user",temp);
        while(condition==1)
        {
            console.log("Illegal Move Please Re-enter: ");
            var temp = readlineSync.question("enter the position(1-9): ");
            var condition = checkForIllegalMoves("user",temp);
        }
        userPos[userCount]=temp;
        updateBoard("user",userPos[userCount]);
        printGrid();
        userCount++;

    }
    else
    {
        console.log(" err no moves left");
    }
}
function takeCpuInput()
{
  if(9 -(userCount+cpuCount) > 0)
  {
    var temp = Math.floor(Math.random() * 9);
    var condition = checkForIllegalMoves("cpu",temp);
    while(condition==1)
    {
        var temp = Math.floor(Math.random() * 10);
        var condition = checkForIllegalMoves("cpu",temp);  
    }
    console.log("CPUs Move ---> Position: "+ (temp));
    cpuPos[cpuCount]=temp;
    cpuCount++;
    updateBoard("cpu",temp);
    printGrid();
  }
  else
  {
    console.log(" err no move left");
  }
}

function updateBoard(player, pos)
{
  if(player === "user")
  {
    symbol = "O";
  }
  if(player === "cpu")
  {
    symbol = "X";
  }
  if(pos == 1){c1[0]=symbol;}
  if(pos == 2){c1[2]=symbol;}
  if(pos == 3){c1[4]=symbol;}
  if(pos == 4){c3[0]=symbol;}
  if(pos == 5){c3[2]=symbol;}
  if(pos == 6){c3[4]=symbol;}
  if(pos == 7){c5[0]=symbol;}
  if(pos == 8){c5[2]=symbol;}
  if(pos == 9){c5[4]=symbol;}
}
function checkForIllegalMoves(player,val)
{
    if(player === "user")
    {
        for(var i=0;i<=cpuCount;i++)
        {
            if(val == cpuPos[i])
            {
                return 1;
            }
        }
        return 0;
    }
    if(player === "cpu")
    {
        for(var i=0;i<=userCount;i++)
        {
            if(val == userPos[i])
            {
                return 1;
            }
        }
        return 0;
    }
}
function checkCondition()
{
    // mapping
    for(var i=0;i<userCount;i++){userPos[userPos[i]-1]=userPos[i];}
    var userMessage = "congrats u won !";
    var cpuMessage = "opps looks like u just lost ! well better luck next time ....";
    if(userPos[0]==1&&userPos[1]==2&&userPos[2]==3){console.log(userMessage); return 1;}  // row 1
    if(userPos[3]==4&&userPos[4]==5&&userPos[5]==6){console.log(userMessage); return 1;}  // row 2 
    if(userPos[6]==7&&userPos[7]==8&&userPos[8]==9){console.log(userMessage); return 1;}  // row 3
    if(userPos[0]==1&&userPos[3]==4&&userPos[6]==7){console.log(userMessage); return 1;}  // column 1
    if(userPos[1]==2&&userPos[4]==5&&userPos[7]==8){console.log(userMessage); return 1;}  // column 2 
    if(userPos[2]==3&&userPos[5]==6&&userPos[8]==9){console.log(userMessage); return 1;}  // column 3
    if(userPos[0]==1&&userPos[4]==5&&userPos[8]==9){console.log(userMessage); return 1;}  // diagonal 1
    if(userPos[2]==3&&userPos[4]==5&&userPos[6]==7){console.log(userMessage); return 1;} // diagonal 2
}
var gameCondition = checkCondition();
while(gameCondition!=1)
{
    takeUserInput();
    takeCpuInput();
    var gameCondition = checkCondition();
}
