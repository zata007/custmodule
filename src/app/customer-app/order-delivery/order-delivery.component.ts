import { Component, OnInit, ViewChild, ElementRef, NgZone, TemplateRef, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { CustomerStateService } from '../customer-state.service';
import { CustomerService } from '../customer.service';
import { GeoLocationService } from 'src/app/shared/services/geo-location.service';
import { MatDialog, MatBottomSheet } from '@angular/material';
import { MAP_STYLES } from '../map-vehicle/map-consts';
import { DialogPreOrderComponent } from 'src/app/shared/shared-components/dialog-pre-order/dialog-pre-order.component';
import { IRequestGetRestaurantData, IResponseGetRestaurantData } from 'src/app/shared/models/common-model';
import { RestaurantListComponent } from '../restaurant-list/restaurant-list.component';
import { DataService } from 'src/app/shared/services/data.service';
import { ECustomerServiceType } from 'src/app/shared/constants/constants';
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
}

@Component({
  selector: 'app-order-delivery',
  templateUrl: './order-delivery.component.html',
  styleUrls: ['./../map-vehicle/map-vehicle.component.scss', './order-delivery.component.scss']
})
export class OrderDeliveryComponent implements OnInit, OnDestroy {

  @ViewChild('searchFrom', {static: false}) public searchElementRefFrom: ElementRef;
  @ViewChild('requestSubmit', {static: false}) requestSubmit: TemplateRef<any>;
  selectedLabel = 'A';
  selectedIndex = 0;
  haveNoPitstop = false;

  canShowDirection = false;
  canShowPitstops = false;

  public searchControl: FormControl;
  public zoom: number;
  locationFetched: boolean;

  // TODO: Move this value to const file.
  mapStyles = MAP_STYLES;

  markers: Marker[] = [];
  isSubmitRequestVisible: boolean;
  bounds: google.maps.LatLngBounds = null;
  map: google.maps.Map;
  lng: number;
  lat: number;
  curLocResDataSubscription: any;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private commonService: CommonService,
    public customerStateService: CustomerStateService,
    private customerService: CustomerService,
    private geoLocationService: GeoLocationService,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private dataService: DataService,
  ) {}

  ngOnInit() {
    // TODO: Update logic if user is first time visitor then only we should show onboarding

    // Patch map data,
    // set google maps defaults
    this.zoom = 11.5;

    // create search FormControl
    this.searchControl = new FormControl();

    this.initMapAutocomplete();

    this.curLocResDataSubscription = this.customerStateService.currenLocationRestaurantData$.subscribe(resData => {
      console.log(resData);
      this.markers = [];
      resData.filter(i => i.blDelivery).forEach((i, index) => {
        const cardLocation = {
          lat: i.businessLocationCoord[1],
          lng: i.businessLocationCoord[0],
        };
        this.markers.push(cardLocation);
      });
    });
  }

  ngOnDestroy() {
    this.curLocResDataSubscription.unsubscribe();
  }

  initMapAutocomplete() {
    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.bounds = new google.maps.LatLngBounds();
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRefFrom.nativeElement, {
        types: ['establishment'],
        componentRestrictions: { country: 'ind' },
      });

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.customerService.setSelectedPlace(place, true);
          // set latitude, longitude and zoom

          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          const fromLocation = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
          this.map.setCenter(fromLocation);
          this.customerStateService.setFromLocation({ ...fromLocation }, true);
          this.customerService.setLocationData(this.lat, this.lng);
          const current = new google.maps.LatLng(this.lat, this.lng);
          // TODO: Refactor make generic implementation for finding places near stadium
          const Wankhede = new google.maps.LatLng(18.938792, 72.825802);
          if (this.calculateDistance(Wankhede, current) < 2000) {
            // TODO: handle stadium logic
            this.openDialog();
          }

          this.onMapLocationChange();
        });
      });

      const autocompleteTo = autocomplete;

      autocompleteTo.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocompleteTo.getPlace();
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.customerService.setSelectedPlace(place, false);
          const toLocation = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
          this.customerStateService.setFromLocation({ ...toLocation }, false);
          this.onMapLocationChange();
        });
      });
    });
  }

  clickedMarker(label: string, index: number) {
    this.selectedLabel = label;
    this.selectedIndex = index;
  }

  onSlideChange(value: Marker) {
    this.selectedLabel = value.label;
  }

  onMapLocationChange() {
    this.canShowPitstops = false;
    this.canShowDirection = false;
    this.markers = [];
  }

  onRouteSelected(item: any) {
    // Get distance from pitstop
    this.commonService.setDataLoading(true);
    this.customerStateService.calculateDistance((val) => {
      // if more than 100km then not servicable;
      this.commonService.setDataLoading(false);

      if (val < 100000) {
        // TODO: get pitstops
        this.customerService.getPitstops({
          ...this.commonService.getRequestEssentialParams(),
          sourcePoint: [72.870403, 19.130181], // lng, lon
          destnationPoint: [72.870403, 19.130181]
        }).subscribe((data: any) => {
          const pitstops: Array<any> = data.data;

          // check if pitstop is on the edge.
          if (pitstops.length === 0) {
            this.canShowPitstops = false;
            this.haveNoPitstop = true;
            return;
          }

          this.markers = [];
          pitstops.forEach((i, index) => {
            const pitstopMarker: Marker = {
              lat: i.blPitStopLongLat.coordinates[1],
              lng: i.blPitStopLongLat.coordinates[0],
              label: index + '',
            };
            this.customerStateService.isPitStopOnEdge(pitstopMarker.lat, pitstopMarker.lng);
          });
        });
        // Show pitstops
        this.canShowPitstops = true;
      } else {
        // Show not servicable
        this.canShowPitstops = false;
        this.haveNoPitstop = true;
      }
    });
  }

  requestService() {
    // TODO: Uncomment after release this.isSubmitRequestVisible = true;
    this.haveNoPitstop = false;
  }

  submitServiceRequest() {
    this.haveNoPitstop = false;
    this.isSubmitRequestVisible = false;
  }

  GotoRoute() {
    this.customerStateService.setCurrentPage('jasj');
  }

  hasLocationData() {
    return !!this.customerStateService.hasLocationData();
  }

  gotoPitstop() {
    this.customerStateService.setCurrentPage('pitstop-view');
    this.router.navigate(['customer/pitstop']);
  }


  mapReady(map: any) {
    this.map = map;

    // Create the img to hold the control and call the CenterControl()
    const centerControl = this.CenterControl(map);
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControl);

    const sub = this.geoLocationService.getPosition().subscribe((val) => {
      this.lat = val.coords.latitude;
      this.lng = val.coords.longitude;
      this.customerStateService.setFromLocation({ lat: val.coords.latitude, lng: val.coords.longitude }, true);
      this.getPlaceName(val.coords.latitude, val.coords.longitude, (result: google.maps.GeocoderResult) => {
        if (!this.searchElementRefFrom.nativeElement.value) {
          const bounds = new google.maps.LatLngBounds();
          const currentLocation = new google.maps.LatLng(val.coords.latitude, val.coords.longitude);
          bounds.extend(currentLocation);

          this.map.panToBounds(bounds); // # auto-center
          this.searchElementRefFrom.nativeElement.value = result.formatted_address;
          const latlng = new google.maps.LatLng(val.coords.latitude, val.coords.longitude);
          const Wankhede = new google.maps.LatLng(18.938792, 72.825802);
          if (this.calculateDistance(Wankhede, latlng) < 2000) {
            // TODO: handle stadium logic
            this.openDialog();
          }
        }
        sub.unsubscribe();
      });
    });
  }

  /**
   * Get place name by lat and lng
   * @param lat
   * @param lng
   * @param callback returns result as place name
   */
  private getPlaceName(lat, lng, callback: Function) {
    const geocoder = new google.maps.Geocoder();
    const latlng = new google.maps.LatLng(lat, lng);
    const request = { location: latlng };
    geocoder.geocode(request, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const result = results[0];
        const rsltAdrComponent = result.address_components;
        const resultLength = rsltAdrComponent.length;
        if (result != null) {
          console.log(result);
          callback(result);
          // this.address = rsltAdrComponent[resultLength - 8].short_name;
        } else {
          callback(result);
          alert('No address available!');
        }
      }
    });
  }

  /**
   * The CenterControl adds a control to the map that recenters the map on
   * Chicago.
   * This constructor takes the control DIV as an argument.
   *
   */
  CenterControl(map: google.maps.Map) {
    // Set CSS for the control border.
    const controlUI = document.createElement('img');
    controlUI.src = 'assets/icons/location.svg';
    controlUI.width = 40;
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '52px';
    controlUI.style.marginRight = '22px';
    controlUI.style.textAlign = 'center';

    controlUI.title = 'Click to recenter the map';

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', () => {
      const currentLocation = new google.maps.LatLng(this.lat, this.lng);

      map.setCenter(currentLocation);
    });

    return controlUI;
  }

  onOnboardingCompletion() {
    this.searchElementRefFrom.nativeElement.focus();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogPreOrderComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Navigate to page
      if (result) {
        this.router.navigate(['customer/quick-pickup']);
      }
      console.log('The dialog was closed', result);
    });
  }

  calculateDistance(from: google.maps.LatLng, to: google.maps.LatLng) {
    return google.maps.geometry.spherical.computeDistanceBetween(from, to);
  }

  openBottomSheet(): void {
    const data: IRequestGetRestaurantData = {
      ...this.commonService.getRequestEssentialParams(),
      pitstopLatitude: this.lat, // pitStopData.lat,
      pitstopLongitude: this.lng, // pitStopData.lng,
      isTakeAway: false,
      isDelivery: true,
      isOrderAhead: false,
    };
    this.dataService.getRestauratData(data).subscribe((res: IResponseGetRestaurantData) => {
      // TODO: Handle no data
      this.bottomSheet.open(RestaurantListComponent, {
        data:  {data: res.data, openedFrom: ECustomerServiceType.Delivery }
      });
    });
  }
}
