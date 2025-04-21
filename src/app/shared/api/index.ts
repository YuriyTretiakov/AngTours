import { environment } from "../../../environments/environment.development";
import { IApi } from "../../models/iapi";

const serverIp = environment.apiUrl;

export const API: any = {
    auth: `${serverIp}/auth`,
    registration: `${serverIp}/register`,
    tours: `${serverIp}/tours`,
    tour: `${serverIp}/tour`,
    config: `/config/config.json`,
    nearestTours: `${serverIp}/nearestTours`,
}