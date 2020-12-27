const bodyParser = require('body-parser')
const express = require('express')
var PF = require('pathfinding');
var _ = require('lodash');
const {
  performance
} = require('perf_hooks');
const PORT = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json())

app.get('/', handleIndex)
app.post('/start', handleStart)
app.post('/move', handleMove)
app.post('/end', handleEnd)

app.listen(PORT, () => console.log(`Battlesnake Server listening at http://127.0.0.1:${PORT}`))


function handleIndex(request, response) {
  var battlesnakeInfo = {
    apiversion: '1',
    author: 'BrokenKeyboard',
    color: '#111111',
    head: 'smile',
    tail: 'block-bum'
  }
  response.status(200).json(battlesnakeInfo)
}
function add(p1, p2) {
    return {x : p1.x + p2.x, y: p1.y+p2.y};
}
function dist(head, dest) {
    return (dest.x-head.x)**2 + (dest.y-head.y)**2;
}
function isLegal(pos, size) {
  return pos.x < size.width && pos.x >= 0 && pos.y < size.height && pos.y >= 0;
}
function handleStart(request, response) {
  var gameData = request.body

  console.log('START')
  response.status(200).send('ok')
}
function notnear(snakes, newpos, me){
  for(let x = 0; x < snakes.length; x ++){
    if(manhattan(snakes[x].head, newpos) == 1 && me.length <= snakes[x].length && me.id != snakes[x].id){
      return true;
    }
  }
  return false;
}
function print(str) {
  // python much?
  console.log(str);
}

function manhattan(p1, p2) {
  return (Math.abs(p2.x-p1.x) + Math.abs(p2.y-p1.y));
}

function within(list, obj) {
  for(let x = 0; x < list.length; x++) {
    if(_.isEqual(list[x], obj)){
      // print("I got here");
      return true;
    }
  }
  return false;
}
function handleMove(request, response) {
  let t0 = performance.now();
  var gameData = request.body
  var finder = new PF.AStarFinder();
  gameData.you.body.pop(gameData.you.length-1);
  var grid = new PF.Grid(gameData.board.width, gameData.board.height); 
  var snekbodylist = [];
  for(let x = 0; x < gameData.board.snakes.length; x++){
    for(let i = 0; i < gameData.board.snakes[x].length-1; i++){
      let bodypart = gameData.board.snakes[x].body[i];
      snekbodylist.push(bodypart);
      grid.setWalkableAt(bodypart.x, gameData.board.height-bodypart.y-1, false);

    }
  }
  // grid.setWalkableAt(gameData.you.head.x, gameData.board.height-gameData.you.head.y-1, true);
  //console.log(gameData.you.body[0]);
  // console.log(gameData.you.head);
  var possibleMoves = [{x:0,y:1}, {x:0,y:-1}, {x:1,y:0}, {x:-1,y: 0}];
  var actualmoves = ["up", "down", "right", "left"];
  //print(move)
  var max = 1000;
  var move = 0;
  let desiredfood = {x: 100000, y:10000};
  // find closest food
  // find smallest length snake's id
  let smalllength = 1000;
  let smallsnakepos = {};
  // print(gameData.board.snakes)
  for(let x = 0; x < gameData.board.snakes.length; x++){
    if(gameData.board.snakes[x]["length"] < smalllength && gameData.board.snakes[x].id != gameData.you.id){
      print("Got here")
      smalllength = gameData.board.snakes[x]["length"];
      //print(gameData.board.snakes[x]["length"]);
      smallsnakepos = x;
    }
  }
  //print(gameData.board.snakes[smallsnakepos]["length"])
  //desiredfood = {x: 100000, y:10000};
  // find closest food
  for(let x = 0; x < gameData.board.food.length; x++){
    if(dist(gameData.you.head, desiredfood)>dist(gameData.you.head, gameData.board.food[x])){
      desiredfood = gameData.board.food[x];
    }
  }
  if(gameData.you["length"] > gameData.board.snakes[smallsnakepos]["length"]){
    desiredfood = gameData.board.snakes[smallsnakepos].head;
  }
  for(let x = 0; x < 4; x++){
    //print(add(gameData.you.head, possibleMoves[x]))
    //print(within(snekbodylist, add(gameData.you.head, possibleMoves[x])))
    if(!within(snekbodylist, add(gameData.you.head, possibleMoves[x])) && isLegal(add(gameData.you.head, possibleMoves[x]), {height: gameData.board.height, width: gameData.board.width})){
      if(dist(add(gameData.you.head, possibleMoves[x]), desiredfood) < max && !notnear(gameData.board.snakes,add(gameData.you.head, possibleMoves[x]), gameData.you)){
        
          //print("Numero Dos")
          max = dist(add(gameData.you.head, possibleMoves[x]), desiredfood);
          move = x;
        
      }
    }
  }
  move = actualmoves[move];
  console.log('MOVE: ' + move)
  console.log("Time taken:", performance.now()-t0);
  response.status(200).send({
    move: move
  })

}

function handleEnd(request, response) {
  var gameData = request.body

  console.log('END')
  response.status(200).send('ok')
}
