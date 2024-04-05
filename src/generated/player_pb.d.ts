// package: PlayerInterface
// file: player.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class GameSettings extends jspb.Message { 
    clearDimensionsList(): void;
    getDimensionsList(): Array<number>;
    setDimensionsList(value: Array<number>): GameSettings;
    addDimensions(value: number, index?: number): number;
    clearStartaddressList(): void;
    getStartaddressList(): Array<number>;
    setStartaddressList(value: Array<number>): GameSettings;
    addStartaddress(value: number, index?: number): number;
    getPlayeridentifier(): string;
    setPlayeridentifier(value: string): GameSettings;
    getGamestarted(): boolean;
    setGamestarted(value: boolean): GameSettings;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GameSettings.AsObject;
    static toObject(includeInstance: boolean, msg: GameSettings): GameSettings.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GameSettings, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GameSettings;
    static deserializeBinaryFromReader(message: GameSettings, reader: jspb.BinaryReader): GameSettings;
}

export namespace GameSettings {
    export type AsObject = {
        dimensionsList: Array<number>,
        startaddressList: Array<number>,
        playeridentifier: string,
        gamestarted: boolean,
    }
}

export class Move extends jspb.Message { 
    getPlayeridentifier(): string;
    setPlayeridentifier(value: string): Move;
    getSnakename(): string;
    setSnakename(value: string): Move;
    clearNextlocationList(): void;
    getNextlocationList(): Array<number>;
    setNextlocationList(value: Array<number>): Move;
    addNextlocation(value: number, index?: number): number;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Move.AsObject;
    static toObject(includeInstance: boolean, msg: Move): Move.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Move, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Move;
    static deserializeBinaryFromReader(message: Move, reader: jspb.BinaryReader): Move;
}

export namespace Move {
    export type AsObject = {
        playeridentifier: string,
        snakename: string,
        nextlocationList: Array<number>,
    }
}

export class SplitRequest extends jspb.Message { 
    getPlayeridentifier(): string;
    setPlayeridentifier(value: string): SplitRequest;
    getOldsnakename(): string;
    setOldsnakename(value: string): SplitRequest;
    getNewsnakename(): string;
    setNewsnakename(value: string): SplitRequest;
    getSnakesegment(): number;
    setSnakesegment(value: number): SplitRequest;
    clearNextlocationList(): void;
    getNextlocationList(): Array<number>;
    setNextlocationList(value: Array<number>): SplitRequest;
    addNextlocation(value: number, index?: number): number;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SplitRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SplitRequest): SplitRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SplitRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SplitRequest;
    static deserializeBinaryFromReader(message: SplitRequest, reader: jspb.BinaryReader): SplitRequest;
}

export namespace SplitRequest {
    export type AsObject = {
        playeridentifier: string,
        oldsnakename: string,
        newsnakename: string,
        snakesegment: number,
        nextlocationList: Array<number>,
    }
}

export class GameUpdateMessage extends jspb.Message { 
    clearUpdatedcellsList(): void;
    getUpdatedcellsList(): Array<UpdatedCell>;
    setUpdatedcellsList(value: Array<UpdatedCell>): GameUpdateMessage;
    addUpdatedcells(value?: UpdatedCell, index?: number): UpdatedCell;
    clearRemovedsnakesList(): void;
    getRemovedsnakesList(): Array<string>;
    setRemovedsnakesList(value: Array<string>): GameUpdateMessage;
    addRemovedsnakes(value: string, index?: number): string;
    clearPlayerscoresList(): void;
    getPlayerscoresList(): Array<PlayerScore>;
    setPlayerscoresList(value: Array<PlayerScore>): GameUpdateMessage;
    addPlayerscores(value?: PlayerScore, index?: number): PlayerScore;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GameUpdateMessage.AsObject;
    static toObject(includeInstance: boolean, msg: GameUpdateMessage): GameUpdateMessage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GameUpdateMessage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GameUpdateMessage;
    static deserializeBinaryFromReader(message: GameUpdateMessage, reader: jspb.BinaryReader): GameUpdateMessage;
}

export namespace GameUpdateMessage {
    export type AsObject = {
        updatedcellsList: Array<UpdatedCell.AsObject>,
        removedsnakesList: Array<string>,
        playerscoresList: Array<PlayerScore.AsObject>,
    }
}

export class GameStateMessage extends jspb.Message { 
    clearUpdatedcellsList(): void;
    getUpdatedcellsList(): Array<UpdatedCell>;
    setUpdatedcellsList(value: Array<UpdatedCell>): GameStateMessage;
    addUpdatedcells(value?: UpdatedCell, index?: number): UpdatedCell;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GameStateMessage.AsObject;
    static toObject(includeInstance: boolean, msg: GameStateMessage): GameStateMessage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GameStateMessage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GameStateMessage;
    static deserializeBinaryFromReader(message: GameStateMessage, reader: jspb.BinaryReader): GameStateMessage;
}

export namespace GameStateMessage {
    export type AsObject = {
        updatedcellsList: Array<UpdatedCell.AsObject>,
    }
}

export class UpdatedCell extends jspb.Message { 
    clearAddressList(): void;
    getAddressList(): Array<number>;
    setAddressList(value: Array<number>): UpdatedCell;
    addAddress(value: number, index?: number): number;
    getPlayer(): string;
    setPlayer(value: string): UpdatedCell;
    getFoodvalue(): number;
    setFoodvalue(value: number): UpdatedCell;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdatedCell.AsObject;
    static toObject(includeInstance: boolean, msg: UpdatedCell): UpdatedCell.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdatedCell, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdatedCell;
    static deserializeBinaryFromReader(message: UpdatedCell, reader: jspb.BinaryReader): UpdatedCell;
}

export namespace UpdatedCell {
    export type AsObject = {
        addressList: Array<number>,
        player: string,
        foodvalue: number,
    }
}

export class PlayerScore extends jspb.Message { 
    getPlayername(): string;
    setPlayername(value: string): PlayerScore;
    getScore(): number;
    setScore(value: number): PlayerScore;
    getSnakes(): number;
    setSnakes(value: number): PlayerScore;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PlayerScore.AsObject;
    static toObject(includeInstance: boolean, msg: PlayerScore): PlayerScore.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PlayerScore, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PlayerScore;
    static deserializeBinaryFromReader(message: PlayerScore, reader: jspb.BinaryReader): PlayerScore;
}

export namespace PlayerScore {
    export type AsObject = {
        playername: string,
        score: number,
        snakes: number,
    }
}

export class RegisterRequest extends jspb.Message { 
    getPlayername(): string;
    setPlayername(value: string): RegisterRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RegisterRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RegisterRequest): RegisterRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RegisterRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RegisterRequest;
    static deserializeBinaryFromReader(message: RegisterRequest, reader: jspb.BinaryReader): RegisterRequest;
}

export namespace RegisterRequest {
    export type AsObject = {
        playername: string,
    }
}

export class SubsribeRequest extends jspb.Message { 
    getPlayeridentifier(): string;
    setPlayeridentifier(value: string): SubsribeRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SubsribeRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SubsribeRequest): SubsribeRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SubsribeRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SubsribeRequest;
    static deserializeBinaryFromReader(message: SubsribeRequest, reader: jspb.BinaryReader): SubsribeRequest;
}

export namespace SubsribeRequest {
    export type AsObject = {
        playeridentifier: string,
    }
}

export class ServerUpdateMessage extends jspb.Message { 
    getMessagetype(): MessageType;
    setMessagetype(value: MessageType): ServerUpdateMessage;
    getMessage(): string;
    setMessage(value: string): ServerUpdateMessage;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ServerUpdateMessage.AsObject;
    static toObject(includeInstance: boolean, msg: ServerUpdateMessage): ServerUpdateMessage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ServerUpdateMessage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ServerUpdateMessage;
    static deserializeBinaryFromReader(message: ServerUpdateMessage, reader: jspb.BinaryReader): ServerUpdateMessage;
}

export namespace ServerUpdateMessage {
    export type AsObject = {
        messagetype: MessageType,
        message: string,
    }
}

export class EmptyRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EmptyRequest.AsObject;
    static toObject(includeInstance: boolean, msg: EmptyRequest): EmptyRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EmptyRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EmptyRequest;
    static deserializeBinaryFromReader(message: EmptyRequest, reader: jspb.BinaryReader): EmptyRequest;
}

export namespace EmptyRequest {
    export type AsObject = {
    }
}

export enum MessageType {
    GAMESTATECHANGE = 0,
    PLAYERJOINED = 1,
}
