# Xenomorph  
A snake that kills whenever it can.
# How does it work
Basically it eats food until it is longer than the smallest snake  
in the map, and then starts pathing towards the smallest snakes head. 
Xenomorph itself is stateless, so previous moves have no affect on its current move.
Its quite dumb as it never learns, unless I add a new feature. 
The repl that this is hosted on is the "dev" branch, and the heroku server hosts the "prod" branch.
The reason for that is to prevent breaking changes from utterly killing the snake's ranking. 
