# Herdsman Game


## Install project:

```
git clone https://github.com/MaciejWaligora/herdsman
cd herdsman
npm i
npm start
```


Runs the Game in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Game settings:

By default, the game will spawn Green area and Yellow area along with Hero (red circle) and 20 animals (white cricles), the area size and positions can be modifed in GameConfig.ts along with every othee setting for animals (animal quantity, animal speed)

# Additional feature: 

## Random Animal Spawn:

in GameConfig.ts set :

```js
randomSpawn: true,

```

 **randomSpawn = true** animalQty will be a limit of how many animals can be on field at once, and animals will be randomly spawned <br /><br />
 
 **randomSpawn = false** animalQty will be an amount of animals spawn on filed during game load, no new animals will be spawned
