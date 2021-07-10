var readlineSync = require('readline-sync')
const chalk = require('chalk')
let c1 = [" ",chalk.magenta("|")," ",chalk.magenta("|")," "]
let c2 = [chalk.magenta("-"),chalk.magenta("+"),chalk.magenta("-"),chalk.magenta("+"),chalk.magenta("-")]
let c3 = [" ",chalk.magenta("|")," ",chalk.magenta("|")," "]
let c4 = [chalk.magenta("-"),chalk.magenta("+"),chalk.magenta("-"),chalk.magenta("+"),chalk.magenta("-")]
let c5 = [" ",chalk.magenta("|")," ",chalk.magenta("|")," "]
let userPos = []
let cpuPos = []
let userCount = 0
let cpuCount =0
const print = console.log
function printGrid()
{
    print(...c1)
    print(...c2)
    print(...c3)
    print(...c4)
    print(...c5)
}
function takeUserInput()
{
    if((9-userCount+cpuCount)>0)
    {

        var temp = readlineSync.question(chalk.red("enter the position(1-9): "))
        var condition = checkForIllegalMoves("user",temp)
        while(condition==1)
        {
            print(chalk.red("Illegal Move Please Re-enter: "))
            var temp = readlineSync.question(chalk.red("enter the position(1-9): "))
            var condition = checkForIllegalMoves("user",temp)
        }
        userPos[temp-1]=true
        updateBoard("user",temp)
        userCount++

    }
    else
    {
        print(" err no moves left")
    }
}
function takeCpuInput()
{
  if(9 -(userCount+cpuCount) > 0)
  {
    var temp = Math.floor((Math.random() * 9) + 1)
    var condition = checkForIllegalMoves("cpu",temp)
    while(condition==1)
    {
        var temp = Math.floor((Math.random() * 9) + 1)
        var condition = checkForIllegalMoves("cpu",temp)  
    }
    print(chalk.yellow("CPUs Move ---> Position: "+ (temp)))
    print(chalk.bold.green("--------------------------------------------------------------------"))
    cpuPos[temp-1]=true
    cpuCount++
    updateBoard("cpu",temp)
    printGrid()
  }
  else
  {
    print(" err no move left")
  }
}

function updateBoard(player,pos)
{
  if(player === "user")
  {
    symbol = chalk.blue("O")
  }
  if(player === "cpu")
  {
    symbol = chalk.red("X")
  }
  if(pos == 1){c1[0]=symbol}
  if(pos == 2){c1[2]=symbol}
  if(pos == 3){c1[4]=symbol}
  if(pos == 4){c3[0]=symbol}
  if(pos == 5){c3[2]=symbol}
  if(pos == 6){c3[4]=symbol}
  if(pos == 7){c5[0]=symbol}
  if(pos == 8){c5[2]=symbol}
  if(pos == 9){c5[4]=symbol}
}
function checkForIllegalMoves(player,val)
{
    if(player === "user")
    {
        for(var i=0;i<=cpuCount;i++)
        {
            if(cpuPos[val-1]==true||userPos[val-1]==true)
            {
                return 1
            }
        }
        return 0
    }
    if(player === "cpu")
    {
        for(var i=0;i<=userCount;i++)
        {
            if(userPos[val-1]==true||cpuPos[val-1]==true)
            {
                return 1
            }
        }
        return 0
    }
}
function checkCondition()
{
    var userMessage = chalk.cyan("congrats u won !")
    var cpuMessage = chalk.green("opps looks like u just lost ! well better luck next time ....")

    // USER WINNING CONDITIONS

    if(userPos[0]==true&&userPos[1]==true&&userPos[2]==true){print(userMessage); return 1}  // row ;
    if(userPos[3]==true&&userPos[4]==true&&userPos[5]==true){print(userMessage); return 1}  // row 2 
    if(userPos[6]==true&&userPos[7]==true&&userPos[8]==true){print(userMessage); return 1}  // row 3
    if(userPos[0]==true&&userPos[3]==true&&userPos[6]==true){print(userMessage); return 1}  // column 1
    if(userPos[1]==true&&userPos[4]==true&&userPos[7]==true){print(userMessage); return 1}  // column 2 
    if(userPos[2]==true&&userPos[5]==true&&userPos[8]==true){print(userMessage); return 1}  // column 3
    if(userPos[0]==true&&userPos[4]==true&&userPos[8]==true){print(userMessage); return 1}  // diagonal 1
    if(userPos[2]==true&&userPos[4]==true&&userPos[6]==true){print(userMessage); return 1}  // diagonal 2

    // CPU WINNING CONDITIONS

    if(cpuPos[0]==true&&cpuPos[1]==true&&cpuPos[2]==true){print(cpuMessage); return 1}  // row 1
    if(cpuPos[3]==true&&cpuPos[4]==true&&cpuPos[5]==true){print(cpuMessage); return 1}  // row 2 
    if(cpuPos[6]==true&&cpuPos[7]==true&&cpuPos[8]==true){print(cpuMessage); return 1}  // row 3
    if(cpuPos[0]==true&&cpuPos[3]==true&&cpuPos[6]==true){print(cpuMessage); return 1}  // column 1
    if(cpuPos[1]==true&&cpuPos[4]==true&&cpuPos[7]==true){print(cpuMessage); return 1}  // column 2 
    if(cpuPos[2]==true&&cpuPos[5]==true&&cpuPos[8]==true){print(cpuMessage); return 1}  // column 3
    if(cpuPos[0]==true&&cpuPos[4]==true&&cpuPos[8]==true){print(cpuMessage); return 1}  // diagonal 1
    if(cpuPos[2]==true&&cpuPos[4]==true&&cpuPos[6]==true){print(cpuMessage); return 1}  // diagonal 2
}
var gameCondition = checkCondition()
print(chalk.bold.blue("u ready ! lets go ---->"))
print(chalk.bold.blue("user symbol --->  O "))
print(chalk.bold.red("cpu symbol ---> X"))
print(chalk.bold.green("--------------------------------------------------------------------"))
printGrid()
while(1)
{
    if(userCount+cpuCount==9)
    {
        print(chalk.yellow("Its a draw"))
        break
    }
    if(gameCondition ==1 )
    {
      break
    }
    takeUserInput()
    takeCpuInput()
    var gameCondition = checkCondition()
}
