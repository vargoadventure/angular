import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Post } from '../models/post.interface';
import { HttpClientService } from './http-client.service';

@Injectable()
export class PostService {
  private readonly storage: Storage = sessionStorage;
  private readonly postSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly http: HttpClientService) { }

  findAll(): Observable<Post[]> {
    return this.http.get('GET_ALL_POSTS');
  }
  
  findById(id: number): Observable<Post> {
    return this.http.get('GET_SINGLE_POST', { id });
  }
  
  notify(): Observable<boolean> {
    return this.postSubject.asObservable();
  }
}
