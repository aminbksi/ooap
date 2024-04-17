# SWOC 2024 Multiplayer snake bot

This repo contains the code for the Sioux Weekend of Code 2024
challenge: multiplayer, multi-dimensional snake.

It is based on the JS example client by Matthijs van Bemmelen, who
also invented this variant on the game and implemented the [server
code](https://github.com/matthijsman/Swoc2024) (incl visualization).
Thanks [@matthijsman](https://github.com/matthijsman)!

Thanks also to Joost Sannen for his moral and programming support,
Duncan Stiphout and Thijn van Dijk for organizing the event and
of course Sioux for enabling this kind of fun :-D

## Status

The repo contains the code as used during the finals, incl the few
commits made as 'snapshots' of states during the weekend.

It's pretty rough on the edges and does still contain a few bugs :)

## Usage

Copy `example.env` to `.env` and edit the hostname and player name inside of it.

Then run:

```sh
npm install
npm run build
npm start
```

## License

MIT
