import { Company } from "./Company";
import { User } from "./User";

export interface Mappable {
    location: {
        lat: number,
        lng: number
    };
    markerContent(): string;
}

export class CustomMap {

    private googleMap: google.maps.Map;

    constructor(divID: string) {
        this.googleMap = new google.maps.Map(document.getElementById(divID)!, {
            zoom: 1,
            center: {
                lat: 0,
                lng: 0
            }
        });
    }

    addMarker(mappable: Mappable): void {
        const marker = new google.maps.Marker({
            map: this.googleMap,
            position: {
                lat: mappable.location.lat,
                lng: mappable.location.lng
            }
        });

        marker.addListener("click", () => {
            const infowindow = new google.maps.InfoWindow({
                content: mappable.markerContent(),
            });

            infowindow.open(this.googleMap, marker);
        })
    }

    // addCompannyMarker(company: Company) : void {
    //     new google.maps.Marker({
    //         map: this.googleMap,
    //         position: {
    //             lat: company.location.lan,
    //             lng: company.location.lng
    //         }
    //     });
    // }

}