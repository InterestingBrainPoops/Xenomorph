# Xenomorph  
A snake that kills whenever it can.
# How does it work
Basically it eats food until it is longer than the smallest snake  
in the map, and then starts pathing towards the smallest snakes head. 
Xenomorph itself is stateless, so previous moves have no affect on its current move.
Its quite dumb as it never learns, unless I add a new feature. 
The repl that this is hosted on is the "dev" branch, and the heroku server hosts the "prod" branch.
The reason for that is to prevent breaking changes from utterly killing the snake's ranking. 

## Warning
This snake is NOT meant to be used in a solo match. 
Due to the way it works, it cant be used in the "constrictor" gamemode either.
The snake will just move up constantly in a solo match.
and the final thing, due to the way ive setup the routes, you have to use `/dev/*` for any of the "Sevastipol" moves, and for "Xenomorph" you have to use `/prod/*` route for it.
This just helps keep the things seperated.
The snake is currently hosted on an AWS EC2 instance in the US-West-2 server. It is public.
