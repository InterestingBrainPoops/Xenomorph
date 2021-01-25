# Why does this exist
so that people dont need to read through the rats nest that is me code
## Steps:

1. Get nearest food, and get the position of the smallest snakes' head.
    1. Loop through the food list in `gameData.board.food` and get the closest one using my helper function that I've made.
    2. Loop through all of the snakes and add their heads to a list.
    3. Then find the closes one using the same method as used to get the closest food.
2. Find if your body is longer than the smallest snake
3. If so, then `desiredfood` is the smallest snakes head. Otherwise its the closest food.
3. Path to the closest "desiredfood"
    1. Use A* to get the path, and then determine the move to use.
4. Move onto the first step and then send the move.