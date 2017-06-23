import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {PhotoModel} from '../models/PhotoModel';
import {FlickerPhotosMapperService} from './flickr-photos-mapper.service';
import {PaginatedPhotoModel} from '../models/PaginatedPhotoModel';

/**
 * Servive used for comunication with Flickr API
 * @see https://www.flickr.com/services/api/explore/flickr.photos.search
 */
@Injectable()
export class FlickrService {

    /**
     * Url for the main search API endpoint: https://www.flickr.com/services/api/explore/flickr.photos.search
     * @type {string}
     */
    private static PHOTOS_SEARCH_URL = `${environment.apiUrl}&method=flickr.photos.search`;

    constructor(private _http: Http) {
    }

    /**
     * Method used to the get the most interesting photo when doing a search
     * @param data
     * @returns {Observable<R|T>}
     */
    getMostInterestingPhoto(data: any): Observable<PhotoModel> {
        let apiUrl = `${FlickrService.PHOTOS_SEARCH_URL}&tags=${data.query}&sort=interestingness-desc&per_page=1` +
            '&extras=date_upload,date_taken,owner_name,views,url_q';
        if (data.user_id) {
            apiUrl += `&user_id=${data.user_id}`;
        }
        return this._http.get(apiUrl)
            .map((response: Response) => <PhotoModel> FlickerPhotosMapperService.mapToFirstPhoto(<any> response.json()))
            .catch(this.handleError);
    }

    /**
     * Method used to make the actual search.
     * @param query
     * @param userId
     * @param page
     * @returns {Observable<R|T>}
     */
    search(query: string, userId: string = null, page = 1): Observable<PaginatedPhotoModel> {
        let apiUrl = `${FlickrService.PHOTOS_SEARCH_URL}&tags=${query}&per_page=6&page=${page}&extras=date_upload,date_taken,owner_name,views,url_q`;
        if (userId) {
            apiUrl += `&user_id=${userId}`;
        }

        return this._http.get(apiUrl)
            .map((response: Response) => <PaginatedPhotoModel> FlickerPhotosMapperService.mapToPhotosWithPagination(<any> response.json()))
            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }
}
