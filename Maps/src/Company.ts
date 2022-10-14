import faker from 'faker/dist/faker.js'
import { Mappable } from './CustomeMap';

export class Company implements Mappable {
    companyName: string;
    catchParse: string;
    location: {
        lat: number;
        lng: number;
    };

    constructor() {
        this.companyName = faker.company.companyName();
        this.catchParse = faker.company.catchPhrase();
        this.location = {
            lat: parseFloat(faker.address.latitude()),
            lng: parseFloat(faker.address.longitude())
        }
    }

    markerContent(): string {
        return `
            <div>
                <h1>Company name is ${this.companyName}</h1>
                <h3>Company Parsase is ${this.catchParse}</h3>
            </div>`;
    }

}