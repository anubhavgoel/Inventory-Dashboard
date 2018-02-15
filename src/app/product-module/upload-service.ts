import { Injectable } from '@angular/core';
import { Upload } from './upload';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploadService {

  basePath = 'uploads';
  uploadsRef: any;
  uploads: Observable<Upload[]>;

  constructor(private db: AngularFirestore) { }

//   getUploads() {
//     this.uploads = this.db.list(this.basePath).snapshotChanges().map((actions) => {
//       return actions.map((a) => {
//         const data = a.payload.val();
//         const $key = a.payload.key;
//         return { $key, ...data };
//       });
//     });
//     return this.uploads;
//   }

//   deleteUpload(upload: Upload) {
//     this.deleteFileData(upload.$key)
//     .then( () => {
//       this.deleteFileStorage(upload.name);
//     })
//     .catch((error) => console.log(error));
//   }

  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  pushUpload(upload: Upload, productForm):any {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.storage.UploadTaskSnapshot) =>  {
        // upload in progress
        const snap = snapshot;
        upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        if (uploadTask.snapshot.downloadURL) {
          upload.url = uploadTask.snapshot.downloadURL;
          upload.name = upload.file.name;
          productForm.patchValue({
            image:upload.name,
            imageUrl:upload.url
          });
          //this.saveFileData(upload);
          return;
        } else {
          console.error('No download URL!');
        }
      },
    );
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    this.db.collection('products').doc('PN-SHE-001').set({
        name:upload.name,
        url:upload.url
    });
  }

  // Writes the file details to the realtime db
  private deleteFileData(key: string) {
    return this.db.doc(`${this.basePath}/`).delete();
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }
}
