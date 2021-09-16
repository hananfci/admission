import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAdd } from 'src/app/share/request.model';
import { HttprequsetService } from '../../share/httprequset.service'
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isLinear = true;
  personaldataFormGroup: FormGroup;
  educationdataFormGroup: FormGroup;
  documentsFormGroup: FormGroup;
  isForign: boolean = false;
  isChecked: boolean = false;
  countries: any[];
  birthdate: Date;
  isforignflag:boolean;
  age: number;
  addRequest:IAdd;
  postdata = false;
  fileExtension: any;
  fileExtensionError: boolean = false;
  selectedFile: any = null;
  imgURL: any;
  public message: string;
  constructor(private _formBuilder: FormBuilder, private requestService: HttprequsetService) { }

  ngOnInit() {
    this.personaldataFormGroup = this._formBuilder.group({
      studentnamear: ['',[ Validators.required,Validators.pattern('[\u0600-\u06FF-/ ]*')]],
      studentnameen: ['',[ Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]],
      studentbirthdate: ['', Validators.required, this.checkAgeVal.bind(this)],
      studentnationalid: ['', [Validators.pattern(/^\d{14}$/)]],
      studentpassportid: [''],
      studentcountry: ['', Validators.required],
      studentgender: ['', [Validators.required]],
      isforign: [false, Validators.required],
      studentaddress: ['', Validators.required]
    },{validators: [this.checknationalid,this.checkPassportId]});
    this.educationdataFormGroup = this._formBuilder.group({
      certificationtype: ['', Validators.required],
      testresult: ['', Validators.required],
    });
    this.documentsFormGroup = this._formBuilder.group({
      personalimagefile: ['', Validators.required],
      nationalidimagefile: ['', Validators.required],
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
  checknationalid (group: FormGroup) {
    let isforignflag = group.get('isforign').value;
    let nationalid = group.get('studentnationalid').value;
   return (isforignflag == false && (nationalid == '' || nationalid == null) )? {nationalIdemp: true} : null
  }
  checkPassportId (group: FormGroup) {
    let isforignflag = group.get('isforign').value;
    let PassportId = group.get('studentpassportid').value;
   return (isforignflag == true && (PassportId == '' || PassportId == null) )? {PassportIdemp: true} : null


  }



  OnGetCountriesList() {
    this.requestService.OnGetCountries().subscribe((res) => {

      const jsonValue = JSON.stringify(res);
      const valueFromJson = JSON.parse(jsonValue);
      this.countries = (valueFromJson || {}).result
      console.log(" this.countries", this.countries)

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

  Upload(event,idelm:number) {

    this.selectedFile = <File>event.target.files[0];
    let photoName = this.selectedFile.name;
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

    var mimeType = this.selectedFile.type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "فقط مسموح برفع صورة.";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
  onPost(){

  }
/*   onPost(){
    this.postdata = true;
    this.addRequest = {
           id:0,
           nameAr: this.aboutAppAddform.value.textAr,
           nameEn: this.aboutAppAddform.value.textEn
    }
    this.requestService.onAddRequest(this.addRequest).subscribe(data => {

      this.postdata = false;


    }, (error) => {
      console.log(error)
    });

  }
 */
}