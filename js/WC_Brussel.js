export default class WC_Brussel {
    constructor(lon, lat, location) {
        this._lon = lon;
        this._lat = lat;
        this.location = location;
    }

    get lon() {
        return this._lon;
    }

    get lat() {
        return this._lat;
    }

    get htmlString() {
        return this._location;
    }
}