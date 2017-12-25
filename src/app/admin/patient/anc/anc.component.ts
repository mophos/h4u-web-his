import { Component, OnInit, Input } from '@angular/core';
import { PhrService } from '../../../services/phr.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-anc',
  templateUrl: './anc.component.html',
  styles: []
})
export class AncComponent implements OnInit {
  @Input('query') query;
  anc = [];

  constructor(
    private phrService: PhrService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  async getAnc() {
    if (this.query) {
      try {
        const rs: any = await this.phrService.getAnc(this.query);
        if (rs.ok) {
          this.anc = rs.rows;
        } else {
          this.alertService.error(JSON.stringify(rs.error));
        }
      } catch (error) {
        this.alertService.serverError();
      }
    }
  }

}
