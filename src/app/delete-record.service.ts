import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
@Injectable()
export class DeleteRecordService {
  deleteCollection: AngularFirestoreCollection<any>;
  deleteDocument: AngularFirestoreDocument<any>;

  constructor(private db: AngularFirestore) {}

  deleteRecord(collection, document) {
    this.db
      .collection(collection)
      .doc(document)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        return true;
      })
      .catch(error => {
        console.error("Error removing document: ", error);
        return false;
      });
  }
}
