import 'froala-editor/js/froala_editor.pkgd.min.js';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { AuthComponent } from './auth/auth.component';
import { StorageServiceModule} from 'angular-webstorage-service';
import { Routes } from '@angular/router';
import {RouterModule} from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { IndexComponent } from './forum/index/index.component';
import { ForumsComponent } from './forum/index/forums/forums.component';
import { ForumComponent } from './forum/index/forum/forum.component';
import { TopicsComponent } from './forum/index/topics/topics.component';
import { MessagesComponent } from './forum/messages/messages.component';
import { TopicComponent } from './forum/index/topic/topic.component';
import { MessageComponent } from './forum/message/message.component';
import { AuthsimpleService } from './authsimple.service';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ReactiveFormsModule } from '@angular/forms';
import { FormContentComponent } from './forum/form-content/form-content.component';
import { EditMessageComponent } from './forum/edit-message/edit-message.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateTopicComponent } from './forum/create-topic/create-topic.component';
import { RegisterComponent } from './register/register.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { TorrentsComponent } from './torrents/torrents.component';
import { TorrentComponent } from './torrent/torrent.component';
import { MovieComponent } from './movie/movie/movie.component';
import { SearchComponent } from './movie/search/search.component';
import { CommentsComponent } from './movie/comments/comments.component';
import { CommentComponent } from './movie/comment/comment.component';
import { PostCommentComponent } from './movie/post-comment/post-comment.component';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from 'angularx-social-login';

const appRoutes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'auth', component: AuthComponent },
  { path: '', component: AuthComponent },
  { path: 'myprofile', component: ProfileComponent },
  { path: 'forum', component: IndexComponent },
  { path: 'forum/index', component: IndexComponent },
  { path: 'forum/forum_content/:id_sectionForum', component: TopicsComponent},
  { path: 'forum/messages/:id_topic', component: MessagesComponent},
  { path: 'forum/message/edit/:id_message', component: EditMessageComponent},
  { path: 'forum/newtopic/:id_sectionForum', component: CreateTopicComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'torrents', component: TorrentsComponent },
  { path: 'torrents/:page', component: TorrentComponent},
  { path: 'torrents/movie/:id_movie', component: MovieComponent },
  { path: 'auth/:code', component: AuthComponent}
];

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('978042394897-qvj53hflbab5ot552d7v9rptn3aplsj6.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("Facebook-App-Id")
  },
  {
    id: LinkedInLoginProvider.PROVIDER_ID,
    provider: new LinkedInLoginProvider("LinkedIn-client-Id", false, 'en_US')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    AuthComponent,
    NavbarComponent,
    ProfileComponent,
    IndexComponent,
    ForumsComponent,
    ForumComponent,
    TopicsComponent,
    MessagesComponent,
    TopicComponent,
    MessageComponent,
    FormContentComponent,
    EditMessageComponent,
    CreateTopicComponent,
    RegisterComponent,
    ConnexionComponent,
    TorrentsComponent,
    TorrentComponent,
    MovieComponent,
    SearchComponent,
    CommentsComponent,
    CommentComponent,
    PostCommentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    StorageServiceModule,
    RouterModule.forRoot(appRoutes),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    ReactiveFormsModule,
    NgxPaginationModule,
    SocialLoginModule
  ],
  providers: [AuthsimpleService, { provide: AuthServiceConfig, useFactory: provideConfig }],
  bootstrap: [AppComponent],
})
export class AppModule { }
