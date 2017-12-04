import axios from "axios";
import { BASE_URL } from "../Constants";

class CommunicationService {
    getRequest(url, getDataHandler, errorHandler) {
        const requestUrl = `${BASE_URL}/${url}`;
        axios({
            method: "GET",
            url: requestUrl
        })
            .then(result => {
                getDataHandler(result);
            })
            .catch((error) => errorHandler(error));
    }
}

export const commService = new CommunicationService();