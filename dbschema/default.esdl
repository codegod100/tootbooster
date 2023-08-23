module default {
    type Application {
        required client_id: str;
        required client_secret: str;
        required host: str;
    }

    type User {
        required username: str;
        required access_token: str;
        required host: str;
    }
}
