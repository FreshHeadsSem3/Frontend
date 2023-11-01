export class TokenResponse {
    public token: string;//jwt token
    public expires: Number;//expiration in seconds

    constructor(Token: string, Expires: Number) {
        this.token = Token;
        this.expires = Expires;
    }
}
