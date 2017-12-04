export default class ShowDTO {
    constructor(id, name, image) {
        this._id = id;
        this._name = name;
        this._image = image;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get image() {
        return this._image;
    }
}