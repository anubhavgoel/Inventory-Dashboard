import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
@Injectable()
export class FetchRecordService {
  constructor(private db: AngularFirestore) {}

  fetchCollection(collection) {
    return this.db.collection(collection).valueChanges();
  }
  fetchDocument(collection, document) {
    return this.db
      .collection(collection)
      .doc(document)
      .valueChanges();
  }
}
