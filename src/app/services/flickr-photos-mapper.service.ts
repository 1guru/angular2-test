import {Injectable} from '@angular/core';
import {PhotoModel} from '../models/PhotoModel';
import {PaginatedPhotoModel} from '../models/PaginatedPhotoModel';

/**
 * The purpose of this mapper is to convert data received from backend to actual models
 */
@Injectable()
export class FlickerPhotosMapperService {

    /**
     * Maps raw data from server to the PhotoModel
     * @param rawPhoto
     * @returns {PhotoModel}
     */
    static mapToPhoto(rawPhoto: any): PhotoModel {
        if (rawPhoto) {
            return new PhotoModel(
                rawPhoto.id,
                rawPhoto.ownername,
                rawPhoto.title,
                new Date(parseInt(rawPhoto.dateupload, 10)),
                new Date(rawPhoto.datetaken),
                parseInt(rawPhoto.views, 10),
                rawPhoto.url_q,
                rawPhoto.height_q,
                rawPhoto.width_q
            );
        }
    }

    /**
     * Maps items from API call to a paginated object
     * @param rawPhotos
     * @returns {PaginatedPhotoModel}
     */
    static mapToPhotosWithPagination(rawPhotos: any): PaginatedPhotoModel {
        const photos: PhotoModel[] = <PhotoModel[]> [];
        if (rawPhotos && rawPhotos.photos && rawPhotos.photos.photo) {
            for (const instance of <any[]> rawPhotos.photos.photo) {
                photos.push(FlickerPhotosMapperService.mapToPhoto(instance));
            }
        }
        return new PaginatedPhotoModel(
            rawPhotos.photos.page,
            rawPhotos.photos.pages,
            rawPhotos.photos.perpage,
            rawPhotos.photos.total,
            photos
        );
    }

    /**
     * Same as mapToPhoto method, but it will get the item froma  list of items
     * @param rawPhotos
     * @returns {PhotoModel}
     */
    static mapToFirstPhoto(rawPhotos: any): PhotoModel {
        if (rawPhotos.stat === 'ok') {
            let photo: PhotoModel = null;
            if (rawPhotos && rawPhotos.photos && rawPhotos.photos.photo) {
                if (rawPhotos.photos.photo.length <= 0) {
                    throw new Error('No results matching your search parameters!');
                }
                photo = FlickerPhotosMapperService.mapToPhoto(<any> rawPhotos.photos.photo[0]);
            }
            return photo;
        }
        throw new Error(rawPhotos.message);
    }
}
