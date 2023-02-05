import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

import {AtlasService} from './views/atlas/atlas.service';
import {HttpService} from './shared/services/http.service';
import {MarkerModalService} from './views/atlas/marker-modal/marker-modal.service';
import {StrService} from './shared/services/str.service';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AtlasComponent} from './views/atlas/atlas.component';
import {ChosModalComponent} from './views/cho-list-modal/chos-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HorizontalLineComponent} from './shared/components/horizontal-line/horizontal-line';
import {MarkerModalComponent} from './views/atlas/marker-modal/marker-modal.component';
import {
    MarkerModalMuseumPayloadPipe,
    MarkerModalSectionPipe,
    MarkerModalSectionSubtitlePipe,
    MarkerModalSectionTitlePipe,
    MarkerModalSectionValuePipe
} from './views/atlas/marker-modal/maker-modal.pipe';
import {SectionPaneComponent} from './shared/components/panes/section-pane/section-pane.component';
import {SidebarFilterComponent} from './views/sidebar-filter/sidebar-filter.component';
import {SidebarEventsFilterComponent} from './views/sidebar-filter/events/sidebar-events-filter.component';
import {SidebarEpochFilterComponent} from './views/sidebar-filter/epoch/sidebar-epoch-filter.component';
import {SidebarGeneralInfoFilterComponent} from './views/sidebar-filter/general-info/sidebar-general-info-filter.component';
import {SidebarLocationsFilterComponent} from './views/sidebar-filter/locations/sidebar-locations-filter.component';
import {SidebarMedalFilterComponent} from './views/sidebar-filter/medal/sidebar-medal-filter.component';
import {SidebarNaturalScienceFilterComponent} from './views/sidebar-filter/natural-science/sidebar-natural-science-filter.component';

// AoT requires an exported function for factories: https://github.com/ngx-translate/core
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        AtlasComponent,
        ChosModalComponent,
        HorizontalLineComponent,
        MarkerModalComponent,
        MarkerModalMuseumPayloadPipe,
        MarkerModalSectionPipe,
        MarkerModalSectionSubtitlePipe,
        MarkerModalSectionTitlePipe,
        MarkerModalSectionValuePipe,
        SectionPaneComponent,
        SidebarFilterComponent,
        SidebarEventsFilterComponent,
        SidebarEpochFilterComponent,
        SidebarGeneralInfoFilterComponent,
        SidebarLocationsFilterComponent,
        SidebarMedalFilterComponent,
        SidebarNaturalScienceFilterComponent
    ],
    entryComponents: [
        ChosModalComponent,
        MarkerModalComponent
    ],
    // exports: [
    //   MarkerModalComponent
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
        ReactiveFormsModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        AtlasService,
        HttpService,
        MarkerModalService,
        StrService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
