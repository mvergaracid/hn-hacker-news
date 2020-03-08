import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service'
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'hn-feed';
  panelOpenState = false;
  showDelete: boolean = false
  allNews: any [] = []

  constructor(private newsService: AppService) {

  }

  loadLastNews() { 
    this.newsService.getLastNews()
    .subscribe(res => {
      this.allNews = _.uniqBy(res.results,'story_id')
      console.log(this.allNews)
    })}

  ngOnInit() {
    this.loadLastNews()
  }

  expand(matExpansionPanel:any, item: any) {
    const index = _.findIndex(this.allNews, news => news._id === item._id)
    matExpansionPanel.close()
    window.open(item.story_url ? item.story_url: item.url , "_blank");
  }

  onMouseOver(item: any) {
    const index = _.findIndex(this.allNews, news => news._id === item._id)
    this.allNews[index].del_option = true
  }

  onMouseLeave(item: any) {
    const index = _.findIndex(this.allNews, news => news._id === item._id)
    this.allNews[index].del_option = false
  }

  deleteNews(event, item: any) {
    event.stopPropagation();
    const index = _.findIndex(this.allNews, news => news._id === item._id)
    console.log('deleting :', this.allNews[index])
    this.newsService.deleteNews(this.allNews[index])
    .subscribe(res => {
      this.loadLastNews()
    }, error => console.log(error))
  }
}
