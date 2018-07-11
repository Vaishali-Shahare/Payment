import { Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { constant } from './app.constant';

@Injectable()
export class AppService {
	
	constructor(
		private http: Http
	) {

	}

	public getAllContries(): Observable<[]> {
		return this.http.get(constant.COUNTRIES_API).map(response => {
			const countries = response.json();
			return countries;
		})
		.catch(this.handleError);
	}

	private handleError (error: Response | any) {
		console.error('Error : ', error);
		return Observable.throw(error);
	}

	public getCurrentLocation(): Observable<[]> {
		return this.http.get(constant.IP_API).map(response => {
			const location = response.json();
			return location;
		})
		.catch(this.handleError);
	}

	public getPaymentOptions(countryCode): Observable<[]> {
		return this.http.get(constant.PAYMENT_URL+countryCode).map(response => {
			return response.json();
		})
		.catch(this.handleError);
	}
}