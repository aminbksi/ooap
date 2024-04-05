// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var player_pb = require('./player_pb.js');

function serialize_PlayerInterface_EmptyRequest(arg) {
  if (!(arg instanceof player_pb.EmptyRequest)) {
    throw new Error('Expected argument of type PlayerInterface.EmptyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_PlayerInterface_EmptyRequest(buffer_arg) {
  return player_pb.EmptyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_PlayerInterface_GameSettings(arg) {
  if (!(arg instanceof player_pb.GameSettings)) {
    throw new Error('Expected argument of type PlayerInterface.GameSettings');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_PlayerInterface_GameSettings(buffer_arg) {
  return player_pb.GameSettings.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_PlayerInterface_GameStateMessage(arg) {
  if (!(arg instanceof player_pb.GameStateMessage)) {
    throw new Error('Expected argument of type PlayerInterface.GameStateMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_PlayerInterface_GameStateMessage(buffer_arg) {
  return player_pb.GameStateMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_PlayerInterface_GameUpdateMessage(arg) {
  if (!(arg instanceof player_pb.GameUpdateMessage)) {
    throw new Error('Expected argument of type PlayerInterface.GameUpdateMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_PlayerInterface_GameUpdateMessage(buffer_arg) {
  return player_pb.GameUpdateMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_PlayerInterface_Move(arg) {
  if (!(arg instanceof player_pb.Move)) {
    throw new Error('Expected argument of type PlayerInterface.Move');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_PlayerInterface_Move(buffer_arg) {
  return player_pb.Move.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_PlayerInterface_RegisterRequest(arg) {
  if (!(arg instanceof player_pb.RegisterRequest)) {
    throw new Error('Expected argument of type PlayerInterface.RegisterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_PlayerInterface_RegisterRequest(buffer_arg) {
  return player_pb.RegisterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_PlayerInterface_ServerUpdateMessage(arg) {
  if (!(arg instanceof player_pb.ServerUpdateMessage)) {
    throw new Error('Expected argument of type PlayerInterface.ServerUpdateMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_PlayerInterface_ServerUpdateMessage(buffer_arg) {
  return player_pb.ServerUpdateMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_PlayerInterface_SplitRequest(arg) {
  if (!(arg instanceof player_pb.SplitRequest)) {
    throw new Error('Expected argument of type PlayerInterface.SplitRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_PlayerInterface_SplitRequest(buffer_arg) {
  return player_pb.SplitRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_PlayerInterface_SubsribeRequest(arg) {
  if (!(arg instanceof player_pb.SubsribeRequest)) {
    throw new Error('Expected argument of type PlayerInterface.SubsribeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_PlayerInterface_SubsribeRequest(buffer_arg) {
  return player_pb.SubsribeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// The greeting service definition.
var PlayerHostService = exports.PlayerHostService = {
  register: {
    path: '/PlayerInterface.PlayerHost/Register',
    requestStream: false,
    responseStream: false,
    requestType: player_pb.RegisterRequest,
    responseType: player_pb.GameSettings,
    requestSerialize: serialize_PlayerInterface_RegisterRequest,
    requestDeserialize: deserialize_PlayerInterface_RegisterRequest,
    responseSerialize: serialize_PlayerInterface_GameSettings,
    responseDeserialize: deserialize_PlayerInterface_GameSettings,
  },
  subscribe: {
    path: '/PlayerInterface.PlayerHost/Subscribe',
    requestStream: false,
    responseStream: true,
    requestType: player_pb.SubsribeRequest,
    responseType: player_pb.GameUpdateMessage,
    requestSerialize: serialize_PlayerInterface_SubsribeRequest,
    requestDeserialize: deserialize_PlayerInterface_SubsribeRequest,
    responseSerialize: serialize_PlayerInterface_GameUpdateMessage,
    responseDeserialize: deserialize_PlayerInterface_GameUpdateMessage,
  },
  getGameState: {
    path: '/PlayerInterface.PlayerHost/GetGameState',
    requestStream: false,
    responseStream: false,
    requestType: player_pb.EmptyRequest,
    responseType: player_pb.GameStateMessage,
    requestSerialize: serialize_PlayerInterface_EmptyRequest,
    requestDeserialize: deserialize_PlayerInterface_EmptyRequest,
    responseSerialize: serialize_PlayerInterface_GameStateMessage,
    responseDeserialize: deserialize_PlayerInterface_GameStateMessage,
  },
  makeMove: {
    path: '/PlayerInterface.PlayerHost/MakeMove',
    requestStream: false,
    responseStream: false,
    requestType: player_pb.Move,
    responseType: player_pb.EmptyRequest,
    requestSerialize: serialize_PlayerInterface_Move,
    requestDeserialize: deserialize_PlayerInterface_Move,
    responseSerialize: serialize_PlayerInterface_EmptyRequest,
    responseDeserialize: deserialize_PlayerInterface_EmptyRequest,
  },
  splitSnake: {
    path: '/PlayerInterface.PlayerHost/SplitSnake',
    requestStream: false,
    responseStream: false,
    requestType: player_pb.SplitRequest,
    responseType: player_pb.EmptyRequest,
    requestSerialize: serialize_PlayerInterface_SplitRequest,
    requestDeserialize: deserialize_PlayerInterface_SplitRequest,
    responseSerialize: serialize_PlayerInterface_EmptyRequest,
    responseDeserialize: deserialize_PlayerInterface_EmptyRequest,
  },
  subscribeToServerEvents: {
    path: '/PlayerInterface.PlayerHost/SubscribeToServerEvents',
    requestStream: false,
    responseStream: true,
    requestType: player_pb.EmptyRequest,
    responseType: player_pb.ServerUpdateMessage,
    requestSerialize: serialize_PlayerInterface_EmptyRequest,
    requestDeserialize: deserialize_PlayerInterface_EmptyRequest,
    responseSerialize: serialize_PlayerInterface_ServerUpdateMessage,
    responseDeserialize: deserialize_PlayerInterface_ServerUpdateMessage,
  },
};

exports.PlayerHostClient = grpc.makeGenericClientConstructor(PlayerHostService);
