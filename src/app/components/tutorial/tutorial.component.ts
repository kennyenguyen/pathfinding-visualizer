import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tutorial',
    templateUrl: './tutorial.component.html',
    styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {

    curr_page: number;
    skip: boolean;
    next_or_finish: string;

    constructor() {
        this.curr_page = 1;
        this.skip = false;
        this.next_or_finish = "Next";
    }
    
    ngOnInit() { }

    public nextButton() {
        if (this.curr_page == 8) {
            this.skip = true;
        } else {
            this.curr_page = (this.curr_page + 1 > 8) ? this.curr_page : this.curr_page + 1;
            if (this.curr_page == 8) {
                this.next_or_finish = "Finish";
            }
        }
    }

    public prevButton() {
        this.curr_page = (this.curr_page - 1 < 1) ? this.curr_page : this.curr_page - 1;
        if (this.curr_page != 8) {
            this.next_or_finish = "Next";
        }
    }

    public skipButton() {
        this.skip = true;
    }

}
