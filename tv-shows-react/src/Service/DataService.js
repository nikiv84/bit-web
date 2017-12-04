import { commService } from "./CommunicationService";
import ShowDTO from "../Dto/showDTO";

class DataService {
    getShows(showHandler) {
        let shows = [];
        commService.getRequest('shows', (result) => {
            console.log(result.data);
            for (let i = 0; i <= 50; i++) {
                const { id, name, image } = result.data[i];
                const tvShow = new ShowDTO(id, name, image.original);
                shows.push(tvShow);
            };
            console.log(shows);
            showHandler(shows);
        }, (error) => {
            console.log(error);
        })
    }

    getSingleShow(id, showHandler) {
        const singleUrl = `shows/${id}?embed[]=seasons&embed[]=cast`;
        commService.getRequest(singleUrl, (result) => {
            console.log(result.data);
            showHandler(result.data);
        }, (error) => {
            console.log(error);
        })
    }


}

export const dataService = new DataService();