import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {TagListComponent} from './tag-list/tag-list.component';
import {FlickrService} from './services/flickr.service';
import {TagDetailsComponent} from './tag-details/tag-details.component';

const appRoutes: Routes = [
    {path: 'tags', component: TagListComponent},
    {path: 'tag/:query', component: TagDetailsComponent},
    {path: 'tag/:query/page/:page', component: TagDetailsComponent},
    {path: 'tag/:query/:userId', component: TagDetailsComponent},
    {path: 'tag/:query/:userId/page/:page', component: TagDetailsComponent},
    {
        path: '',
        redirectTo: '/tags',
        pathMatch: 'full'
    },
    {path: '**', component: PageNotFoundComponent}
];


@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        TagListComponent,
        TagDetailsComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        ReactiveFormsModule,
        HttpModule
    ],
    providers: [FlickrService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
