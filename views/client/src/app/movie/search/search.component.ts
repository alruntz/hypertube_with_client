import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TorrentService} from "../../torrent.service";
import {SearchService} from "../../search.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  formGroupSearch = new FormGroup({
    inputTri: new FormControl(),
    inputGenre: new FormControl()
  });

  input_query: string;

  constructor(private torrentService: TorrentService, private searchService: SearchService) { }

  ngOnInit() {
  }



  onSubmitSearch() {
    const genre = this.formGroupSearch.value.inputGenre != null ? this.formGroupSearch.value.inputGenre : 'all';
    this.searchService.search(this.input_query, this.formGroupSearch.value.inputTri, genre, 1, false, this.torrentService.api);
    this.searchService.title = this.input_query;
    this.searchService.genre = genre;
    this.searchService.tri = this.formGroupSearch.value.inputTri;
  }

}