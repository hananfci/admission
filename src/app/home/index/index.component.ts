import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAdd } from 'src/app/share/request.model';
import { HttprequsetService } from '../../share/httprequset.service'
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  @ViewChild('stepper') stepper: any;

  isLinear = true;
  submitSuccess = false;
  personaldataFormGroup: FormGroup;
  educationdataFormGroup: FormGroup;
  documentsFormGroup: FormGroup;
  isForign: boolean = false;
  isChecked: boolean = false;
  countries: any[];
  birthdate: Date;

  age: number;
  addRequest: IAdd;
  postdata = false;
  fileExtension: any;
  fileExtensionError: boolean = false;
  fileSelect: any = null
  personalfile: any = null;
  nationalidfile: any = null;
  certificationfile: any = null;
  passportfile: any = null;
  imgpersonalURL: any;
  imgnationalURL: any;
  imgpassportURL: any;
  imgcertificationURL: any;
  public message: string;
  constructor(private _formBuilder: FormBuilder, private requestService: HttprequsetService) { }

  ngOnInit() {
    this.personaldataFormGroup = this._formBuilder.group({
      studentnamear: ['', [Validators.required, Validators.pattern('[\u0600-\u06FF-/ ]*')]],
      studentnameen: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
      studentbirthdate: ['', Validators.required, this.checkAgeVal.bind(this)],
      studentnationalid: ['', [Validators.pattern(/^\d{14}$/)]],
      studentpassportid: [''],
      studentcountry: [null, [Validators.required]],
      studentgender: ['', [Validators.required]],
      isforign: [false],
      studentaddress: ['', Validators.required]
    }, { validators: [this.checknationalid, this.checkPassportId] });

    this.educationdataFormGroup = this._formBuilder.group({
      certificationtype: ['', Validators.required],
      testresult: ['', Validators.required],
    });

    this.documentsFormGroup = this._formBuilder.group({
      personalimagefile: ['', Validators.required],
      nationalidimagefile: [''],
      certificationimagefile: [''],
      passportimagefile: [''],
    });
    this.OnGetCountriesList();

  }
  checkAgeVal(control: AbstractControl) {
    this.birthdate = this.personaldataFormGroup.value.studentbirthdate
    if (this.birthdate) {
      var timeDiff = Math.abs(Date.now() - new Date(this.birthdate).getTime());
      this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }

    return new Promise(resolve => {
      setTimeout(() => {
        if (this.age < 18) {
          resolve({ minValue: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }
  checknationalid(group: FormGroup) {
    let isforignflag = group.get('isforign').value;
    let nationalid = group.get('studentnationalid').value;
    return (isforignflag == false && (nationalid == '' || nationalid == null)) ? { nationalIdemp: true } : null
  }
  checkPassportId(group: FormGroup) {
    let isforignflag = group.get('isforign').value;
    let PassportId = group.get('studentpassportid').value;
    return (isforignflag == true && (PassportId == '' || PassportId == null)) ? { PassportIdemp: true } : null

  }
  checknationalFile(control: AbstractControl) {

    let nationalFile = control.value;
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.isForign == false && (nationalFile == '' || nationalFile == null)) {
          resolve({ nationalFileemp: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });


  }
  checkPassportFile(control: AbstractControl) {

    let PassportFile = control.value;
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.isForign == true && (PassportFile == '' || PassportFile == null)) {
          resolve({ PassportFileemp: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });


  }



  OnGetCountriesList() {
    this.requestService.OnGetCountries().subscribe((res) => {

      const jsonValue = JSON.stringify(res);
      const valueFromJson = JSON.parse(jsonValue);
      this.countries = (valueFromJson || {}).result

    });
  }
  checkValue(event: any) {
    debugger;
    if (event.target.checked == true) {
      this.isForign = true
    }
    else {
      this.isForign = false
    }


  }
  isInArray(array, word) {
    return array.indexOf(word.toLowerCase()) > -1;
  }

  Upload(event, idElm: number) {
    this.fileSelect = <File>event.target.files[0];
    let photoName = this.fileSelect.name;
    var allowedExtensions = ["jpg", "png", "jpeg"];
    this.fileExtension = photoName.split('.').pop();
    if (this.isInArray(allowedExtensions, this.fileExtension)) {
      this.fileExtensionError = false;
    } else {
      this.fileExtensionError = true;
      return;
    }
    if (event.target.files[0] === 0)
      return;
    var mimeType = this.fileSelect.type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "فقط مسموح برفع صورة.";
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileSelect);
    reader.onload = (_event) => {

      const fd = new FormData();
      if (this.fileSelect != null) {
        fd.append('Image', this.fileSelect, this.fileSelect.name);
      }
      this.postdata = true;
      this.requestService.onPostUploadfile(fd).subscribe(data => {
        const jsonValue = JSON.stringify(data);
        const valueFromJson = JSON.parse(jsonValue);
        var imagepath = (valueFromJson || {}).result
        console.log("personalimagefile", imagepath)
        this.postdata = false;
        if (idElm == 1) {
          this.imgpersonalURL = reader.result;
          this.documentsFormGroup.patchValue({
            personalimagefile: imagepath
          });
        }
        if (idElm == 2) {
          this.imgnationalURL = reader.result;
          this.documentsFormGroup.patchValue({
            nationalidimagefile: imagepath
          });
        }

        if (idElm == 3) {
          this.imgcertificationURL = reader.result;
          this.documentsFormGroup.patchValue({
            certificationimagefile: imagepath
          });
        }

        if (idElm == 4) {
          this.imgpassportURL = reader.result;
          this.documentsFormGroup.patchValue({
            passportimagefile: imagepath
          });
        }



      }, (error) => {
        console.log(error)
      });

    }



  }

  onSubmit() {
    debugger;
    this.postdata = true;

    this.addRequest = {
      studentName_Ar: this.personaldataFormGroup.value.studentnamear,
      studentName_En: this.personaldataFormGroup.value.studentnameen,
      birthDate: this.personaldataFormGroup.value.studentbirthdate,
      nationalId:  this.personaldataFormGroup.value.studentnationalid != null? (this.personaldataFormGroup.value.studentnationalid).toString() : null,
      passportId: this.personaldataFormGroup.value.studentpassportid != null?(this.personaldataFormGroup.value.studentpassportid).toString():null,
      gender: +(this.personaldataFormGroup.value.studentgender),
      address: this.personaldataFormGroup.value.studentaddress,
      countryId: +(this.personaldataFormGroup.value.studentcountry),
      isForign: this.personaldataFormGroup.value.isforign,
      certificationType: this.educationdataFormGroup.value.certificationtype,
      result: +(this.educationdataFormGroup.value.testresult),
      personalImagePath: this.documentsFormGroup.value.personalimagefile,
      natinalIdImagePath: this.documentsFormGroup.value.nationalidimagefile,
      certificationImagePath: this.documentsFormGroup.value.certificationimagefile,
      passportImagePath: this.documentsFormGroup.value.passportimagefile
    }

    this.requestService.onAddRequest(this.addRequest).subscribe(data => {

      this.postdata = false;
      this.submitSuccess = true;
      this.personaldataFormGroup.reset();
      this.educationdataFormGroup.reset();
      this.documentsFormGroup.reset();
      this.imgnationalURL = null;
      this.imgcertificationURL = null;
      this.imgpassportURL = null;
      this.imgpersonalURL = null;
      this.isForign = false;
      setTimeout(() => {
        this.submitSuccess = false;
      }, 4000);



    }, (error) => {
      this.postdata = false;
      console.log(error)
    });

  }

}