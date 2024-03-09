import crypto from "crypto";
import RideStatus, { RequestedStatus, RideStatusFactory } from "./RideStatus";
import Position from "./Position";

// Entity DDD
export default class Ride {
    status: RideStatus;

    constructor (readonly rideId: string, readonly passengerId: string, private driverId: string, status: string, readonly date: Date, readonly fromLat: number, readonly fromLong: number, readonly toLat: number, readonly toLong: number, private fare: number = 0, private distance: number = 0) {
        this.status = RideStatusFactory.create(status, this);
    }

    static create (passengerId: string, fromLat: number, fromLong: number, toLat: number, toLong: number) {
        const rideId = crypto.randomUUID();
        const driverId = "";
        const status = "requested";
        const date = new Date();
        return new Ride(rideId, passengerId, driverId, status, date, fromLat, fromLong, toLat, toLong);
    }

	accept (driverId: string) {
		this.driverId = driverId;
		this.status.accept();
	}

	start () {
		this.status.start();
	}

	finish (positions: Position[]) {
		this.fare = distance * 2.1;
		this.distance = distance;
		this.status.finish();
	}

	getStatus () {
		return this.status;
	}

	getDriverId () {
		return this.driverId;
	}

	getFare () {
		return this.fare;
	}

	getDistance () {
		return this.distance;
	}
}