import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'skeleton',
    templateUrl: './skeleton.component.html',
    styleUrls: ['./skeleton.component.scss']
})

export class SkeletonComponent implements OnInit {
    constructor() {}
    ngOnInit(): void {}
}