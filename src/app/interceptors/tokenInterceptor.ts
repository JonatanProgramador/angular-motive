import { inject } from "@angular/core";
import { UserService } from "../services/user.service";

export async function tokenInterceptor(url:string|URL, options:RequestInit) {
    const userService = inject(UserService);
    options.credentials="include";
    await userService.isAuth();
    if(userService.getPermised()) {
        const response = fetch(url, options);
        return response
    } else {
        return null;
    }
}