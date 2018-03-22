import { Component, OnInit } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { DragulaService } from "ng2-dragula/ng2-dragula";
import { FetchRecordService } from "../../fetch-record.service";
@Component({
  selector: "app-order-taskboard",
  templateUrl: "./order-taskboard.component.html",
  styleUrls: ["./order-taskboard.component.scss"],
  providers: [FetchRecordService]
})
export class OrderTaskboardComponent implements OnInit {
  bookedOrder: any;
  bookedObservable: any;
  alterationOrder: any;
  constructor(
    private dragula: DragulaService,
    private fetchRecordService: FetchRecordService,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    this.dragula.drop.subscribe(value => {
      debugger;
      this.db
        .collection("orders")
        .doc(value[1].id)
        .update({
          status: value[2].id
        })
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    });
    // tslint:disable-next-line:prefer-const
    const abc = this.db.collection("orders", ref => {
      return ref.where("status", "==", "Booked");
    });
    const collectionData = abc.valueChanges();
    collectionData.subscribe(data => {
      this.bookedOrder = data;
    });
    const def = this.db.collection("orders", ref2 => {
      return ref2.where("status", "==", "Alteration");
    });
    const alterationData = def.valueChanges();
    alterationData.subscribe(data => {
      this.alterationOrder = data;
    });
  }
}
