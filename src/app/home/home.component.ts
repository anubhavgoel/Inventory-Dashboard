import { Component, OnInit } from '@angular/core';
import { AngularFirestore , AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {FormBuilder, FormGroup, Validators,ReactiveFormsModule,FormControl,FormsModule } from '@angular/forms';
import {MatStepper} from '@angular/material/stepper';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { NgModel } from '@angular/forms';

import {MatPaginator, MatSort, MatTableDataSource,MatFormField,MatFormFieldControl} from '@angular/material';
export class State {
  constructor(public name: string, public population: string, public flag: string) { }
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  items: Observable<any[]>;
  product:any =[];
  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;
  prodcollection: AngularFirestoreCollection<any>;
  proddoc: AngularFirestoreDocument<any>;
  model = new Hero();
  test :any;
  xyz :  any =[];
  dataSource= new MatTableDataSource();
  displayedColumns = ['name'];
 
  states: State[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];
  constructor(db: AngularFirestore, private _formBuilder: FormBuilder) {
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this.filterStates(state) : this.states.slice())
      );
    debugger;
    this.prodcollection = db.collection('Orders');
    this.proddoc = db.collection('Orders').doc("PN001");
    this.test = this.prodcollection.valueChanges();
   // this.prodcollection.valueChanges();
   this.test.subscribe((data) => 
     { 
       this.xyz = data;
      this.dataSource = new MatTableDataSource(this.xyz);
      }
      
  );
  }
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      phone:['', Validators.required],
      address:[],
      pincode:[]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      booking_date: ['', Validators.required],
      Start_date:[],
      end_date:[]
    });
    this.fourthFormGroup = this._formBuilder.group({
      booking_amount:[],
      security_paid:[],
      Delivery_charges:[],
      bill_number:[]
    });
  }
  filterStates(name: string) {
    return this.states.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  add(){
    this.prodcollection.doc(this.model.bill_number).set({
      name: this.model.name,
      address: this.model.address,
      pincode: this.model.pincode,
      booking_date : this.model.booking_date,
      Start_date : this.model.Start_date,
      end_date : this.model.end_date,
      booking_amount: this.model.booking_amount,
      security_paid: this.model.security_paid,
      Delivery_charges: this.model.Delivery_charges,
      bill_number:this.model.bill_number
    })
      .catch((err) => {
      console.log(err);
    })
  }
}
export class Hero {
  
    constructor(
    

    ) {  }
      public phone: number;
      public name: string;
      public address: string;
      public pincode: number;
      public booking_date : Date;
      public Start_date : Date;
      public end_date : Date;
      public booking_amount: number;
      public security_paid: number;
      public Delivery_charges: number;
      public bill_number :string;
  }