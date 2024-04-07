import Position from "../../../../account/src/domain/Position";

export default interface PositionRepository {
    save (position: Position): Promise<void>;
    listByRideId (rideId: string): Promise<Position[]>;
}