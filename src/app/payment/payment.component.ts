import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import {Router} from "@angular/router";

import { AppService } from '../app.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [AppService]
})
export class PaymentComponent implements OnInit {

	countries = [];
	country = {};
	paymentModes = [];
	cardDetails = {};
	cnamePattern = "^[a-z0-9_-]{8,15}$";
	cvvPattern = "/^[0-9]{3,4}$/";
	isValidFormSubmitted = null;
	paymentOption = {
		name: '',
		img_url: ''
	};

	paymentForm: FormGroup;
	currentDate = new Date();
	paymentFormVisible = false;

  constructor(
  	private formBuilder:FormBuilder,
  	private appService: AppService
  	private router : Router
  ) { 
	this.paymentForm = formBuilder.group({
	    cardName: ['', [Validators.required]],
	    cardNumber: ['', [Validators.required]],
	    month: ['', [Validators.required]],
	    year: ['', [Validators.required]],
	    cvv: ['', [Validators.required]]
  	});
  }

  ngOnInit() {

  	this.appService.getAllContries().subscribe(countries => {
  		this.countries = countries;
  	});

  	this.appService.getCurrentLocation().subscribe(location => {
  		this.country = {
  			Name: location.city,
  			Code: location.countryCode
  		};
  		this.paymentModes = [];
  		this.getPaymentModes(this.country.Code);
  	});
  }

  get cardName() {
     return this.paymentForm.get('cardName');
  }

  get cardNumber() {
     return this.paymentForm.get('cardNumber');
  }

  get month() {
     return this.paymentForm.get('month');
  }

  get year() {
     return this.paymentForm.get('year');
  }

  get cvv() {
     return this.paymentForm.get('cvv');
  }

  onCountryChange($event) {
  	let countryData = this.countries.find(country => country.Code === $event);
  	this.paymentForm.reset();
  	this.isValidFormSubmitted = true;
	this.country = countryData;
	this.paymentFormVisible = false;
	this.getPaymentModes(this.country.Code);
  }

  getPaymentModes(countryCode: String) {
	this.appService.getPaymentOptions(countryCode).subscribe(options => {
		this.paymentModes = options;
	});
  }

  onFormSubmit() {
  	this.isValidFormSubmitted = false;

     if(parseInt(this.amount, 10) > -1 && /^[a-zA-Z]*$/g.test(this.paymentForm.controls.cardName.value) && /^[0-9]{3,4}$/.test(this.paymentForm.controls.cvv.value) && this.validateMonth(this.paymentForm.controls.month.value, this.paymentForm.controls.year.value) && this.validateYear(this.paymentForm.controls.year.value) && this.validateCarNumber(this.paymentForm.controls.cardNumber.value)) {
     this.isValidFormSubmitted = true;
     } else {
     	this.router.navigate(['error']);
     	return;
     }
     this.router.navigate(['status']);
     this.paymentForm.reset();
  }

  	validateCarNumber(value) {
	  // accept only digits, dashes or spaces
		if (/[^0-9-\s]+/.test(value)) return false;

		// The Luhn Algorithm. It's so pretty.
		var nCheck = 0, nDigit = 0, bEven = false;
		value = value.replace(/\D/g, "");

		for (var n = value.length - 1; n >= 0; n--) {
			var cDigit = value.charAt(n),
				  nDigit = parseInt(cDigit, 10);

			if (bEven) {
				if ((nDigit *= 2) > 9) nDigit -= 9;
			}

			nCheck += nDigit;
			bEven = !bEven;
		}

		return (nCheck % 10) == 0;
	}

	validateMonth(month, year) {
		if(parseInt(month, 10) <= this.currentDate.getMonth() && parseInt(year, 10) === this.currentDate.getFullYear()) {
			return false;
		}
		return true;
	}

	validateYear(year) {
		if(parseInt(year) >= this.currentDate.getFullYear()) {
			return true;
		}
		return false;
	}

	onPaymentModeSelect(mode) {
		this.paymentOption = mode;
		this.paymentFormVisible = true;
	}

	onCardNumberChange(evt) {
		var charCode = (evt.which) ? evt.which : event.keyCode
         if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;

         return true;
	}


}
