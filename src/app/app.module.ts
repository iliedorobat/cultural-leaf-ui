import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {NgbActiveOffcanvas, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

import {AtlasService} from './views/atlas/atlas.service';
import {HttpService} from './shared/services/http.service';
import {StrService} from './shared/services/str.service';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AtlasComponent} from './views/atlas/atlas.component';
import {CHOFilterComponent} from './views/cho/filter/cho-filter.component';
import {CHOSummaryScreenComponent} from './views/cho/summary-screen/cho-summary-screen.component';
import {DecimalPipe} from '@angular/common';
import {DetailsScreenComponent} from './shared/models/details-screen/details-screen.component';
import {
    DetailsScreenSectionPipe,
    DetailsScreenSectionSubtitlePipe,
    DetailsScreenSectionTitlePipe,
    DetailsScreenSectionValuePipe
} from './shared/models/details-screen/details-screen.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HorizontalLineComponent} from './shared/components/horizontal-line/horizontal-line';
import {SectionPaneComponent} from './shared/components/panes/section-pane/section-pane.component';
import {SidebarComponent} from './views/sidebar/sidebar.component';
import {EventsChoFilterComponent} from './views/cho/filter/events/events-cho-filter.component';
import {EpochChoFilterComponent} from './views/cho/filter/epoch/epoch-cho-filter.component';
import {GeneralInfoChoFilterComponent} from './views/cho/filter/general-info/general-info-cho-filter.component';
import {LocationsChoFilterComponent} from './views/cho/filter/locations/locations-cho-filter.component';
import {MedalChoFilterComponent} from './views/cho/filter/medal/medal-cho-filter.component';
import {NaturalScienceChoFilterComponent} from './views/cho/filter/natural-science/natural-science-cho-filter.component';
import {SortableHeader} from './shared/components/table/sortable.directive';

// AoT requires an exported function for factories: https://github.com/ngx-translate/core
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        AtlasComponent,
        CHOFilterComponent,
        CHOSummaryScreenComponent,
        DetailsScreenComponent,
        DetailsScreenSectionPipe,
        DetailsScreenSectionSubtitlePipe,
        DetailsScreenSectionTitlePipe,
        DetailsScreenSectionValuePipe,
        HorizontalLineComponent,
        SectionPaneComponent,
        SidebarComponent,
        EventsChoFilterComponent,
        EpochChoFilterComponent,
        GeneralInfoChoFilterComponent,
        LocationsChoFilterComponent,
        MedalChoFilterComponent,
        NaturalScienceChoFilterComponent
    ],
    entryComponents: [
        CHOSummaryScreenComponent,
        DetailsScreenComponent
    ],
    // exports: [
    //   DetailsScreenComponent
    // ],
    imports: [
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        LeafletModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        SortableHeader
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        AtlasService,
        DecimalPipe,
        HttpService,
        NgbActiveOffcanvas,
        StrService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
