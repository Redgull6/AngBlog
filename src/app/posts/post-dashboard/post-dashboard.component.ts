import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';

import { PostService } from '../post.service';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';



@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {

  title: string;
  image: string = null;
  content: string;

  buttonText: string = "Create Post";

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
   

  constructor(
    private auth: AuthService,
    private postService: PostService, 
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
  }
  uploadImage(event) {
    const file = event.target.files[0]
    const path = `posts/${file.name}`
    const fileRef = this.storage.ref(path);
    if (file.type.split('/')[0] !== 'image') {
      return alert('only image files')
    } else {
      const task = this.storage.upload(path, file)
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(
         finalize(() => this.downloadURL = fileRef.getDownloadURL() )
      )
      .subscribe()
      console.log('Image Uploaded!');

    }
  }
  createPost() {
    const data = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      content: this.content,
      image: this.image,
      published: new Date(),
      title: this.title
    };
    this.postService.create(data);
    this.title = '';
    this.content = '';
    this.image = '';
    this.buttonText = 'Post Created!';
    setTimeout(() => (this.buttonText = "Create Post"), 3000);
  }
}
