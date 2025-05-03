class User{
    id: number;
    email: string;
    user_metadata: {
        full_name: string;
        avatar_url: string;
        email_verified: boolean;
        phone: string;
    }

    constructor(id: number, email: string, full_name: string, avatar_url: string, email_verified: boolean, phone: string) {
        this.id = id;
        this.email = email;
        this.user_metadata = {
            full_name,
            avatar_url,
            email_verified,
            phone
        }
    }
}

export default User