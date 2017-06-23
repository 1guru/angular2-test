import {Component, OnInit} from '@angular/core';
import {FlickrService} from '../services/flickr.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-tag-list',
    templateUrl: './tag-list.component.html',
    styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit {

    searchForm: FormGroup;
    errorMessage: string;
    searchQueries: any[] = [];
    sortKey = 'views';

    constructor(private _flickrService: FlickrService,
                private _formBuilder: FormBuilder) {
    }


    /**
     * Populates the searchQueries from localStorage if any. Also it will initiate the form
     */
    ngOnInit() {
        if (localStorage.getItem('searchQueries') !== null) {
            this.searchQueries = JSON.parse(localStorage.getItem('searchQueries'));
        }
        this.initForm();
    }

    /**
     * Called on form submit
     * @param formData
     */
    onSubmit(formData: any) {
        this.searchForm.reset();
        this._flickrService.getMostInterestingPhoto(formData)
            .subscribe(
                (photo) => {
                    this.searchQueries.push({
                        tag: formData.query,
                        userId: formData.user_id,
                        image: photo.url_q,
                        ownername: photo.ownername,
                        dateupload: photo.dateupload,
                        datetaken: photo.datetaken,
                        views: photo.views,
                    });
                    localStorage.setItem('searchQueries', JSON.stringify(this.searchQueries));
                    this.sortItems(this.sortKey);
                    this.errorMessage = null;
                },
                error => {
                    this.errorMessage = <any>error;
                }
            );
    }

    /**
     * Method used for sorting items. It accepts 'datetaken', 'dateupload', 'views' keys
     * @param key
     */
    sortItems(key: string) {
        this.sortKey = key;
        if (['datetaken', 'dateupload', 'views'].indexOf(this.sortKey) === -1) {
            this.sortKey = 'views';
        }
        this.searchQueries.sort((a: any, b: any) => {
            if (a[this.sortKey] < b[this.sortKey]) {
                return 1;
            } else if (a[this.sortKey] > b[this.sortKey]) {
                return -1;
            } else {
                return 0;
            }
        });
    }

    /**
     * Method used for constructing the URL to tag details page
     * @param page
     * @returns {string[]}
     */
    getTagDetailsLink(searchQuery: string, userId: string = null) {
        const returnArr = ['/tag', searchQuery];
        if (userId) {
            returnArr.push(userId);
        }
        return returnArr;
    }

    private initForm() {
        this.searchForm = this._formBuilder.group({
            query: ['', [Validators.required]],
            user_id: ['']
        });
    }

}
