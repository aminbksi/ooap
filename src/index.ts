import { PlayerHostClient } from "./generated/player_grpc_pb";
import * as grpc from "@grpc/grpc-js";
import { EmptyRequest, RegisterRequest } from "./generated/player_pb";

const client = new PlayerHostClient(
  "192.168.178.62:5168",
  grpc.credentials.createInsecure()
);

console.log("starting?");

const serverEvents = client.subscribeToServerEvents(new EmptyRequest());
serverEvents.on("data", function (thing: any) {
  console.log("data", thing);
});

console.log("Started?");

const req = new RegisterRequest();
req.setPlayername("ForTheWin");

client.register(req, function (err, response) {
  if (err) {
    console.log(err);
  } else {
    console.log("response: ", response);
    // var gameState = new GameState(
    //   response.dimensions,
    //   response.startAddress,
    //   "javascript",
    //   response.playerIdentifier
    // );
    // var gameUpdates = client.Subscribe({
    //   playerIdentifier: response.playerIdentifier,
    // });
    // gameUpdates.on("data", function (update) {
    //   gameState.update(update);
    //   var splits = gameState.getSplits();
    //   for (var i = 0; i < splits.length; i++) {
    //     var split = splits[i];
    //     console.log(
    //       "splitted " + split.oldSnakeName + " into " + split.newSnakeName
    //     );
    //     client.SplitSnake(split, function (err) {
    //       if (err) {
    //         console.log(err);
    //       }
    //     });
    //   }
    //   var moves = gameState.getMoves();
    //   for (var i = 0; i < moves.length; i++) {
    //     var move = moves[i];
    //     console.log(move.snakeName + ": " + move.nextLocation);
    //     client.MakeMove(move, function (err) {
    //       if (err) {
    //         console.log(err);
    //       }
    //     });
    //   }
    // });
  }
});
