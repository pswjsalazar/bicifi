import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  tutorialsRef: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore) {
  }

  getAll<T>(path: string): AngularFirestoreCollection<T> {
    return this.db.collection(path);
  }

  create<T>(path: string, object: T): Promise<DocumentReference<T>> {
    return this.db.collection<T>(path).add({...object});
  }

  createDoc<T>(path: string, doc: string, pathDoc: string, object: T): Promise<DocumentReference> {
    return this.db.collection<T>(path).doc().collection(pathDoc).add({...object});
  }

  update<T>(path: string, id: string, data: any): Promise<void> {
    return this.db.collection(path).doc(id).update(data);
  }

  delete<T>(path: string, id: string): Promise<void> {
    return this.db.collection(path).doc(id).delete();
  }
}
