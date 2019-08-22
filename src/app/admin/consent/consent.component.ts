import { ConsentService } from './../../services/consent.service';
import { AlertService } from './../../services/alert.service';
import { Component, OnInit, Inject } from '@angular/core';
import { IMyOptions } from 'mydatepicker-th';

import { Subject } from 'rxjs/Subject';
import { WebcamImage } from 'ngx-webcam';
import { Buffer } from 'buffer';
import * as moment from 'moment';
import * as _ from 'lodash';
// const resizebase64 = require('resize-base64');
import { resizebase64 } from 'resize-base64';


@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styles: []
})
export class ConsentComponent implements OnInit {

  perPage = 20;
  list = [];
  query = '';
  modal = false;
  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };
  userId: any;
  cid: any;
  fname: any;
  lname: any;
  birthdate: any;
  tel: any;
  showWebcam = false;
  modalWebcam = false;
  imageBase64: any;
  imageTypeBase64: any;
  isWebcam = false;
  isUpload = false;
  fileName: any;
  filesToUpload: File;
  isUpdate = false;
  modalTel = false;
  modalImage = false;
  modalUploadImage = false;
  modalParent = false;
  checkParent = false;
  parents = [];
  editTel: any;
  isSave = false;
  private trigger: Subject<void> = new Subject<void>();
  public webcamImage: WebcamImage = null;
  constructor(
    private alertService: AlertService,
    private consentService: ConsentService,
    @Inject('API_URL') private apiUrl: string
  ) {

  }

  ngOnInit() {
    this.getList();
  }

  async readSmartcard() {

    this.consentService.getSmartcard().then((rs: any) => {
      if (rs.fname && rs.lname) {
        this.cid = rs.cid;
        this.fname = rs.fname;
        this.lname = rs.lname;
        this.birthdate = {
          date: {
            year: moment(rs.dob, 'YYYYMMDD').get('year') - 543,
            month: moment(rs.dob, 'YYYYMMDD').get('month') + 1,
            day: moment(rs.dob, 'YYYYMMDD').get('date')
          }
        };
      }
    }).catch(error => {
      console.log(error);
    });
  }

  async getList() {
    try {
      const rs: any = await this.consentService.getList(this.query);
      if (rs.ok) {
        this.list = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  doEnter(e) {
    if (e.keyCode === 13) {
      this.getList();
    }
  }

  onClickEdit(w) {
    // this.cid = w.cid;
    // this.fname = w.fname;
    // this.lname = w.lname;
    // this.tel = w.tel;
    // this.birthdate = {
    //   date: {
    //     year: 2019,
    //     month: 1,
    //     day: 1
    //   }
    // };

    // this.isUpdate = true;
    // this.modal = true;
  }

  onClickEditTel(w) {
    this.fname = w.fname;
    this.lname = w.lname;
    this.userId = w.id;
    this.cid = w.cid;
    this.tel = w.tel;
    this.editTel = '';
    this.modalTel = true;
  }

  async onClickEditParent(w) {
    try {
      this.parents = [];
      this.checkParent = false;
      const rs: any = await this.consentService.getParent(w.id, w.cid);
      if (rs.ok) {
        this.userId = w.id;
        this.cid = w.cid;
        for (const i of rs.rows) {
          const obj: any = {
            id: this.parents.length + 1,
            cid: i.cid
          };
          this.parents.push(obj);
        }
        this.modalParent = true;
        if (rs.rows.length) {
          this.checkParent = true;
        }
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  onClickSaveTel() {
    this.alertService.confirm(`คุณต้องการที่จะเปลี่ยนเบอร์ ${this.tel} เป็น ${this.editTel} ใช่ไหม?`)
      .then(async (result) => {
        if (result.value) {
          this.saveTel();
        }
      });
  }

  onClickSaveParent() {
    this.alertService.confirm(`คุณต้องการที่จะเปลี่ยนผู้ดูแลใช่ไหม?`)
      .then(async (result) => {
        if (result.value) {
          this.saveParent();
        }
      });
  }

  async saveTel() {
    try {
      const data = {
        cid: this.cid,
        userId: this.userId,
        tel: this.editTel
      };
      const rs: any = await this.consentService.updateTel(data);
      if (rs.ok) {
        this.modalTel = false;
        await this.getList();
        this.alertService.success();
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async saveParent() {
    try {
      const rs: any = await this.consentService.updateParent(this.userId, this.cid, this.parents);
      if (rs.ok) {
        this.modalParent = false;
        this.alertService.success();
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  openModal() {
    this.checkParent = false;
    this.parents = [];
    this.isWebcam = false;
    this.isUpload = false;
    this.isUpdate = false;
    this.fname = '';
    this.lname = '';
    this.userId = '';
    this.cid = '';
    this.tel = '';
    this.modal = true;
  }

  async save() {
    try {
      this.isSave = true;
      const obj: any = {
        cid: this.cid,
        fname: this.fname,
        lname: this.lname,
        tel: this.tel,
        birthdate: `${this.birthdate.date.year}-${this.birthdate.date.month}-${this.birthdate.date.day}`
      };
      if (this.checkParent) {
        obj.parent = this.parents;
      }
      if (this.isWebcam || this.isUpload) {
        obj.imageBase64 = this.imageBase64;
        // obj.image_type = this.imageTypeBase64;
      } else {
        obj.imageBase64 = null;
      }
      const rs = await this.consentService.save(obj);
      if (rs.ok) {
        this.modal = false;
        this.alertService.success();
        this.getList();
      } else {
        this.alertService.error(rs.error);
      }
      this.isSave = false;
    } catch (error) {
      this.isSave = false;
      this.alertService.error(error);
    }
  }

  openModalWebcam() {
    this.modal = false;
    this.modalWebcam = true;
    this.showWebcam = true;
    this.modalUploadImage = false;
  }

  capture() {
    this.trigger.next();
  }

  async handleImage(e) {
    try {
      this.isWebcam = true;
      this.imageTypeBase64 = e._mimeType;
      this.imageBase64 = e.imageAsDataUrl;
      this.modalWebcam = false;
      this.showWebcam = false;
      if (this.isUpdate) {
        this.modalUploadImage = true;
      } else {
        this.modal = true;
      }
    } catch (error) {
      console.log(error);

    }
  }

  handleInitError(e) {
    console.log(e);
  }

  triggerObservable() {
    return this.trigger.asObservable();
  }

  async fileChangeEvent(fileInput: any) {

    const file = <File>fileInput.target.files[0];
    if (file) {
      this.imageTypeBase64 = file.type;

      if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
        // if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'application/pdf') {
        const reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageBase64 = `data:${file.type};base64,${reader.result.split(',')[1]}`;
          this.isUpload = true;
        };
      } else {
        this.alertService.error('กรุณาเลือกไฟล์ PNG, JPG');
      }
    }
  }

  decodeBase64(dataString) {
    const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    const response: any = {};

    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
  }

  async showImage(id, cid) {
    try {
      const rs: any = await this.consentService.getImage(id, cid);
      if (rs.ok) {
        const response: any = await this.decodeBase64(rs.rows);
        if (response.type === 'image/pdf') {
          const linkSource = rs.rows;
          const downloadLink = document.createElement('a');
          const fileName = `consent-form-${moment().format('x')}.pdf`;

          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();

        } else if (response.type === 'image/jpg' ||
          response.type === 'image/jpeg' ||
          response.type === 'image/png') {
          this.imageBase64 = rs.rows;
          this.modalImage = true;
        }
      }

    } catch (error) {
      console.log(error);
    }
  }

  onClickOpenModalUpload(w) {
    this.isUpdate = true;
    this.imageBase64 = null;
    this.userId = w.id;
    this.cid = w.cid;
    this.modalUploadImage = true;
  }

  resizeImage(base64Str) {

    const img = new Image();
    img.src = base64Str;
    const canvas = document.createElement('canvas');
    const MAX_WIDTH = 2000;
    const MAX_HEIGHT = 2000;
    let width = img.width;
    let height = img.height;

    if (width > height) {
      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }
    } else {
      if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }
    }
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);
    return canvas.toDataURL();
  }


  async doUploadImage() {
    try {
      this.isSave = true;
      const data: any = {
        cid: this.cid,
        userId: this.userId,
        imageBase64: this.resizeImage(this.imageBase64)
      };
      const rs: any = await this.consentService.uploadImage(data);
      if (rs.ok) {
        this.modalUploadImage = false;
        this.getList();
        this.alertService.success();
      } else {
        console.log(rs.error);
        this.alertService.error(rs.error);
      }
      this.isSave = false;
    } catch (error) {
      this.isSave = false;
      console.log(error);
      this.alertService.error(error);
    }
  }


  onClickCheckParent() {
    if (this.checkParent) {
      const obj = {
        cid: '',
        id: 1
      };
      this.parents.push(obj);
    } else {
      this.parents = [];
    }
  }
  addParent() {
    if (this.checkParent) {
      const obj = {
        cid: '',
        id: this.parents.length + 1
      };
      this.parents.push(obj);
    }
  }

  removeParent(id) {
    const idx = _.findIndex(this.parents, { 'id': +id });
    if (idx > -1) {
      this.parents.splice(idx, 1);
    }
  }

  onKeyParent(id, cid) {
    const idx = _.findIndex(this.parents, { 'id': +id });
    if (idx > -1) {
      this.parents[idx].cid = cid.value;
    }
  }

  async onKeyCid(e) {
    if (this.cid.length === 13) {
      const rs: any = await this.consentService.getSmarthealth(this.cid);
      if (rs.ok) {
        this.birthdate = {
          date: {
            year: moment(rs.rows.birth, 'YYYY-MM-DD').get('year'),
            month: moment(rs.rows.birth, 'YYYY-MM-DD').get('month') + 1,
            day: moment(rs.rows.birth, 'YYYY-MM-DD').get('date')
          }
        };
        this.fname = rs.rows.name;
        this.lname = rs.rows.lname;
      }
    }
  }

  checkID() {
    const id = this.cid;
    if (id.length !== 13) {
      return false;
    } else {
      let sum = 0;
      for (let i = 0; i < 12; i++) {
        sum += parseFloat(id.charAt(i)) * (13 - i);
      }
      if ((11 - sum % 11) % 10 !== parseFloat(id.charAt(12))) {
        return false;
      } else {
        return true;
      }
    }
  }

  checkCIDParent() {
    let error = false;
    if (this.checkParent) {
      for (const p of this.parents) {
        if (p.cid.length !== 13) {
          error = true;
        } else {
          let sum = 0;
          for (let i = 0; i < 12; i++) {
            sum += parseFloat(p.cid.charAt(i)) * (13 - i);
          }
          if ((11 - sum % 11) % 10 !== parseFloat(p.cid.charAt(12))) {
            error = true;
          }
        }
      }
    } else {
      error = false;
    }
    console.log(error);

    return error;
  }
}
