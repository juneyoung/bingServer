module.exports = class Player {
    constructor (sessionId, username, profileImage) {
        this.sessionId = sessionId || '';       // 현재 사용자의 세션 아이디 
        this.username = username || '';         // github 사용자 아이디
        this.profileImage = profileImage || ''; // githubProfileImage
    }
}