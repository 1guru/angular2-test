export class PhotoModel {

    constructor(public id: number,
                public ownername: string,
                public title: string,
                public dateupload: Date,
                public datetaken: Date,
                public views: number,
                public url_q: string,
                public height_q: string,
                public width_q: string) {
    }

}
