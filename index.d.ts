declare module "discord-oauth2" {
    interface User {
        id: string,
        avatar: string | null | undefined,
        username: string,
        discriminator: string,

        bot?: boolean,
        email?: string,
        flags?: number,
        locale?: string,
        verified?: boolean,
        mfa_enabled?: string,
        premium_type?: number
    }

    interface Integration {
        id: string,
        user: User,
        name: string,
        type: string,
        account: {
            id: string,
            name: string
        }
        enabled: boolean,
        role_id: string,
        syncing: boolean,
        synced_at: string,
        expire_behavior: number,
        expire_grace_period: number
    }

    interface Connection {
        id: string,
        type: string,
        name: string,
        revoked?: string,
        verified: string,
        visibility: string,
        friend_sync: boolean,
        show_activity: boolean,
        integrations?: Integration[]
    }

    export class OAuth2 {
        constructor(options?: {
            requestTimeout?: number,
            latencyThreshold?: number,
            ratelimiterOffset?: number
        });
        tokenRequest(object: {
            code: string,
            scope: string,
            client_id: string,
            grant_type: string,
            redirect_uri: string,
            client_secret: string
        }): Promise<any>;
        revokeToken(access_token: string, credentials: string): Promise<string>;
        getUser(access_token: string): Promise<User>;
        getUserGuilds(access_token: string): Promise<Object[]>;
        getUserConnections(access_token: string): Promise<Connection[]>;
        addMember(data: {
            deaf?: boolean,
            mute?: boolean,
            roles?: string[],
            nickname?: string,

            userId: string,
            guildId: string,
            botToken: string,
            accessToken: string
        }): Promise<any>;
    }
}
