import { atom } from "recoil";

type user = {
    username : string ,
    token : string | null
}
export const authState = atom<user>({
    key : 'authState',
    default : {
        username : "",
        token : null
    }
})