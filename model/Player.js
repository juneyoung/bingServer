module.exports = class Player {
    constructor (id, username, profileImage) {
        this.id = id || '';
        this.username = username || '';
        this.profileImage = profileImage || '';
    }
}