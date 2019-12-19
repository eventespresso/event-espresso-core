export type CurrentUserProps = {
    id: number;
    description: string;
    email: string;
    firstName: string;
    name: string;
    nicename: string;
    nickname: string;
    lastName: string;
    locale: string;
    userId: number;
    username: string;
}

export const CurrentUser = (userData: CurrentUserProps): CurrentUserProps => {
    return {
        id:             userData.id,
        description:    userData.description,
        email:          userData.email,
        firstName:      userData.firstName,
        name:           userData.name,
        nicename:       userData.nicename,
        nickname:       userData.nickname,
        lastName:       userData.lastName,
        locale:         userData.locale,
        userId:         userData.userId,
        username:       userData.username,
    }
};
