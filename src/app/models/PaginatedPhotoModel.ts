import {PhotoModel} from './PhotoModel';
export class PaginatedPhotoModel {

    constructor(public page: number,
                public pages: number,
                public perpage: number,
                public total: number,
                public items: PhotoModel[]) {
    }

}
