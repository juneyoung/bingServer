module.exports = class Player {
    constructor (sessionId, name, profileImage) {
        this.sessionId = sessionId || '';       // 현재 사용자의 세션 아이디 
        this.name = name || '';         // github 사용자 아이디
        this.profileImage = profileImage || ''; // githubProfileImage
        this.status = 'none'; // [ 'none' , 'ready', 'playing' ];
    }

    toObject () {
    	return {
    		name : this.name,
            profile : this.profile,
            status : this.status
    	}
    }
}