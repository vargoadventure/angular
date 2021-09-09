import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AlertMessage } from '../shared/models/alert-message.model';
import { Post } from '../shared/models/post.interface';
import { HttpClientService } from '../shared/services/http-client.service';
import { PostService } from '../shared/services/post.service';
import { SessionService } from '../shared/services/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  postId?: number;
  post?: Post;
  list: Post[] = [];
  message?: AlertMessage;

  constructor(
    private readonly postService: PostService,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.postService.notify()
      .subscribe((reload: boolean) => {
        if (reload) {
          this.list = [];
          this.loadList();
        }
      })

    this.loadList();
  }

  loadList(): void {
    this.activatedRoute.queryParams
      .pipe(
        switchMap((params) => {
          this.postId = params.id ? +params.id : 0;
          return this.postService.findAll()
        }),
        map((posts: Post[]) => {
          this.post = posts.find((post) => post.id === this.postId);
          return posts;
        })
      ).subscribe((posts: Post[]) => {
        this.list = posts;
        console.log('ini post: ', this.list);
      }, (error) => {
        this.message = {
          status: 'danger',
          text: error.message
        }
      })
  }
}
