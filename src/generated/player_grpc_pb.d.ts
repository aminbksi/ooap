// package: PlayerInterface
// file: player.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as player_pb from "./player_pb";

interface IPlayerHostService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    register: IPlayerHostService_IRegister;
    subscribe: IPlayerHostService_ISubscribe;
    getGameState: IPlayerHostService_IGetGameState;
    makeMove: IPlayerHostService_IMakeMove;
    splitSnake: IPlayerHostService_ISplitSnake;
    subscribeToServerEvents: IPlayerHostService_ISubscribeToServerEvents;
}

interface IPlayerHostService_IRegister extends grpc.MethodDefinition<player_pb.RegisterRequest, player_pb.GameSettings> {
    path: "/PlayerInterface.PlayerHost/Register";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<player_pb.RegisterRequest>;
    requestDeserialize: grpc.deserialize<player_pb.RegisterRequest>;
    responseSerialize: grpc.serialize<player_pb.GameSettings>;
    responseDeserialize: grpc.deserialize<player_pb.GameSettings>;
}
interface IPlayerHostService_ISubscribe extends grpc.MethodDefinition<player_pb.SubsribeRequest, player_pb.GameUpdateMessage> {
    path: "/PlayerInterface.PlayerHost/Subscribe";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<player_pb.SubsribeRequest>;
    requestDeserialize: grpc.deserialize<player_pb.SubsribeRequest>;
    responseSerialize: grpc.serialize<player_pb.GameUpdateMessage>;
    responseDeserialize: grpc.deserialize<player_pb.GameUpdateMessage>;
}
interface IPlayerHostService_IGetGameState extends grpc.MethodDefinition<player_pb.EmptyRequest, player_pb.GameStateMessage> {
    path: "/PlayerInterface.PlayerHost/GetGameState";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<player_pb.EmptyRequest>;
    requestDeserialize: grpc.deserialize<player_pb.EmptyRequest>;
    responseSerialize: grpc.serialize<player_pb.GameStateMessage>;
    responseDeserialize: grpc.deserialize<player_pb.GameStateMessage>;
}
interface IPlayerHostService_IMakeMove extends grpc.MethodDefinition<player_pb.Move, player_pb.EmptyRequest> {
    path: "/PlayerInterface.PlayerHost/MakeMove";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<player_pb.Move>;
    requestDeserialize: grpc.deserialize<player_pb.Move>;
    responseSerialize: grpc.serialize<player_pb.EmptyRequest>;
    responseDeserialize: grpc.deserialize<player_pb.EmptyRequest>;
}
interface IPlayerHostService_ISplitSnake extends grpc.MethodDefinition<player_pb.SplitRequest, player_pb.EmptyRequest> {
    path: "/PlayerInterface.PlayerHost/SplitSnake";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<player_pb.SplitRequest>;
    requestDeserialize: grpc.deserialize<player_pb.SplitRequest>;
    responseSerialize: grpc.serialize<player_pb.EmptyRequest>;
    responseDeserialize: grpc.deserialize<player_pb.EmptyRequest>;
}
interface IPlayerHostService_ISubscribeToServerEvents extends grpc.MethodDefinition<player_pb.EmptyRequest, player_pb.ServerUpdateMessage> {
    path: "/PlayerInterface.PlayerHost/SubscribeToServerEvents";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<player_pb.EmptyRequest>;
    requestDeserialize: grpc.deserialize<player_pb.EmptyRequest>;
    responseSerialize: grpc.serialize<player_pb.ServerUpdateMessage>;
    responseDeserialize: grpc.deserialize<player_pb.ServerUpdateMessage>;
}

export const PlayerHostService: IPlayerHostService;

export interface IPlayerHostServer {
    register: grpc.handleUnaryCall<player_pb.RegisterRequest, player_pb.GameSettings>;
    subscribe: grpc.handleServerStreamingCall<player_pb.SubsribeRequest, player_pb.GameUpdateMessage>;
    getGameState: grpc.handleUnaryCall<player_pb.EmptyRequest, player_pb.GameStateMessage>;
    makeMove: grpc.handleUnaryCall<player_pb.Move, player_pb.EmptyRequest>;
    splitSnake: grpc.handleUnaryCall<player_pb.SplitRequest, player_pb.EmptyRequest>;
    subscribeToServerEvents: grpc.handleServerStreamingCall<player_pb.EmptyRequest, player_pb.ServerUpdateMessage>;
}

export interface IPlayerHostClient {
    register(request: player_pb.RegisterRequest, callback: (error: grpc.ServiceError | null, response: player_pb.GameSettings) => void): grpc.ClientUnaryCall;
    register(request: player_pb.RegisterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: player_pb.GameSettings) => void): grpc.ClientUnaryCall;
    register(request: player_pb.RegisterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: player_pb.GameSettings) => void): grpc.ClientUnaryCall;
    subscribe(request: player_pb.SubsribeRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<player_pb.GameUpdateMessage>;
    subscribe(request: player_pb.SubsribeRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<player_pb.GameUpdateMessage>;
    getGameState(request: player_pb.EmptyRequest, callback: (error: grpc.ServiceError | null, response: player_pb.GameStateMessage) => void): grpc.ClientUnaryCall;
    getGameState(request: player_pb.EmptyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: player_pb.GameStateMessage) => void): grpc.ClientUnaryCall;
    getGameState(request: player_pb.EmptyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: player_pb.GameStateMessage) => void): grpc.ClientUnaryCall;
    makeMove(request: player_pb.Move, callback: (error: grpc.ServiceError | null, response: player_pb.EmptyRequest) => void): grpc.ClientUnaryCall;
    makeMove(request: player_pb.Move, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: player_pb.EmptyRequest) => void): grpc.ClientUnaryCall;
    makeMove(request: player_pb.Move, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: player_pb.EmptyRequest) => void): grpc.ClientUnaryCall;
    splitSnake(request: player_pb.SplitRequest, callback: (error: grpc.ServiceError | null, response: player_pb.EmptyRequest) => void): grpc.ClientUnaryCall;
    splitSnake(request: player_pb.SplitRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: player_pb.EmptyRequest) => void): grpc.ClientUnaryCall;
    splitSnake(request: player_pb.SplitRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: player_pb.EmptyRequest) => void): grpc.ClientUnaryCall;
    subscribeToServerEvents(request: player_pb.EmptyRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<player_pb.ServerUpdateMessage>;
    subscribeToServerEvents(request: player_pb.EmptyRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<player_pb.ServerUpdateMessage>;
}

export class PlayerHostClient extends grpc.Client implements IPlayerHostClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public register(request: player_pb.RegisterRequest, callback: (error: grpc.ServiceError | null, response: player_pb.GameSettings) => void): grpc.ClientUnaryCall;
    public register(request: player_pb.RegisterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: player_pb.GameSettings) => void): grpc.ClientUnaryCall;
    public register(request: player_pb.RegisterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: player_pb.GameSettings) => void): grpc.ClientUnaryCall;
    public subscribe(request: player_pb.SubsribeRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<player_pb.GameUpdateMessage>;
    public subscribe(request: player_pb.SubsribeRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<player_pb.GameUpdateMessage>;
    public getGameState(request: player_pb.EmptyRequest, callback: (error: grpc.ServiceError | null, response: player_pb.GameStateMessage) => void): grpc.ClientUnaryCall;
    public getGameState(request: player_pb.EmptyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: player_pb.GameStateMessage) => void): grpc.ClientUnaryCall;
    public getGameState(request: player_pb.EmptyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: player_pb.GameStateMessage) => void): grpc.ClientUnaryCall;
    public makeMove(request: player_pb.Move, callback: (error: grpc.ServiceError | null, response: player_pb.EmptyRequest) => void): grpc.ClientUnaryCall;
    public makeMove(request: player_pb.Move, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: player_pb.EmptyRequest) => void): grpc.ClientUnaryCall;
    public makeMove(request: player_pb.Move, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: player_pb.EmptyRequest) => void): grpc.ClientUnaryCall;
    public splitSnake(request: player_pb.SplitRequest, callback: (error: grpc.ServiceError | null, response: player_pb.EmptyRequest) => void): grpc.ClientUnaryCall;
    public splitSnake(request: player_pb.SplitRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: player_pb.EmptyRequest) => void): grpc.ClientUnaryCall;
    public splitSnake(request: player_pb.SplitRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: player_pb.EmptyRequest) => void): grpc.ClientUnaryCall;
    public subscribeToServerEvents(request: player_pb.EmptyRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<player_pb.ServerUpdateMessage>;
    public subscribeToServerEvents(request: player_pb.EmptyRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<player_pb.ServerUpdateMessage>;
}
