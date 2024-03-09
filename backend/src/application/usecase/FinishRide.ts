import Position from "../../domain/Position";
import PositionRepository from "../repository/PositionRepository";
import RideRepository from "../repository/RideRepository";

export default class FinishRide {

	constructor (private rideRepository: RideRepository, private positionRepository: PositionRepository) {
	}

	async execute (input: Input) {
		const ride = await this.rideRepository.getById(input.rideId);
		if (!ride) throw new Error("Ride not found");
		if (ride.getStatus() !== "in_progress") throw new Error("To update position ride must be in progress");
		const positions = await this.positionRepository.listByRideId(input.rideId);
		ride.finish(positions);
		await this.rideRepository.update(ride);
	}

}

type Input = {
	rideId: string,
	lat: number,
	long: number
}