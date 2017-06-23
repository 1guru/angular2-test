import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FlickrService} from '../services/flickr.service';
import {PhotoModel} from '../models/PhotoModel';

/**
 * Component that handles the results for a search.
 */
@Component({
    selector: 'app-tag-details',
    templateUrl: './tag-details.component.html',
    styleUrls: ['./tag-details.component.css']
})
export class TagDetailsComponent implements OnInit {

    errorMessage: string;
    searchQuery: string;
    userId: string;

    totalResults: number;
    totalPages = 0;
    currentPage = 1;
    nextPage = 1;
    previousPage = 1;

    photos: PhotoModel[] = [];

    constructor(private route: ActivatedRoute,
                private _flickrService: FlickrService) {
    }

    /**
     * Subscribe for the actual url parameters. @see app.module.ts for the actual routes
     */
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.searchQuery = params['query'];
            this.userId = params['userId'];
            if (params['page']) {
                this.currentPage = +params['page'];
            }
            this.searchPhotos(this.currentPage);
        });
    }

    /**
     * Search photos and populates the results.
     * @param page
     */
    searchPhotos(page: number) {
        console.log(page);
        this.currentPage = page;
        this._flickrService.search(this.searchQuery, this.userId, page)
            .subscribe(
                results => {
                    this.photos = results.items;
                    this.totalResults = results.total;
                    this.totalPages = results.pages;

                    this.nextPage = this.currentPage >= this.totalPages ? this.currentPage : this.currentPage + 1;
                    this.previousPage = this.currentPage <= 1 ? 1 : this.currentPage - 1;
                },
                error => {
                    this.errorMessage = <any>error;
                }
            );
    }

    /**
     * Method used for constructing the URL for pagination
     * @param page
     * @returns {string[]}
     */
    getTagDetailsLink(page: number) {
        const returnArr = ['/tag', this.searchQuery];
        if (this.userId) {
            returnArr.push(this.userId.toString());
        }
        returnArr.push('page');
        returnArr.push(page.toString());
        return returnArr;
    }

}
