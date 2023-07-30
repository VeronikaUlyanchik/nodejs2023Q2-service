import { User } from "src/user/entities/user.entity";

export const deletePasswordResponse = (user: User) => {
    const newUser = {...user};
    delete newUser.password;
    return newUser;
}