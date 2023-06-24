import {fetcher} from "@/shared/lib/axios";

const api = {
    list: "/users",
}

class UserService {
    KEY = 'users';
    list(params: any = {}) {
        return fetcher.get(api.list, {
            params: {...params}
        });
    }
}

export default new UserService();
