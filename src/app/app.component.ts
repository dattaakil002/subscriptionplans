import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as  subscriptionData from './subscription.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // title = 'auxanoprjt';
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef> | any;
  @ViewChildren("secondboxes") secondboxes: QueryList<ElementRef> | any;

  subscriptionDetails : any = (subscriptionData as any).default;
  subscriptionType: any;
  planType: any;
  planAmount: any;
  subCategoryDetails: any = [];
  viewSelectedDetails: boolean = false;
  listIndex: any = -1;
  listIndexJ: any = -1;
  viewPopUp: boolean = false;


  constructor(private toastr: ToastrService) {}

  ngOnInit(){
    console.log(this.subscriptionDetails);
    
    setTimeout(() => {
      this.secondboxes.forEach((element:any) => {
        element.nativeElement.disabled = true;
      });
    }, 1000);
  }

  selectedsubscription(i:any,j:any){
    var firstPlan;
    var subelement = <HTMLInputElement> document.getElementById('first-pla'+i+'-'+j)
    console.log(subelement.checked);
    if(this.listIndex != i){
      this.subCategoryDetails = [];
      this.listIndex = i;
    }
    if(subelement.checked){
      this.viewSelectedDetails = true;
      this.subscriptionType = this.subscriptionDetails[i].subscriptionType;
      this.planType = this.subscriptionDetails[i].plans[j].planType;
      this.planAmount = this.subscriptionDetails[i].plans[j].amount;
      this.listIndexJ = j;
    }
    else{
      this.viewSelectedDetails = false;
      this.subscriptionType = '';
      this.planType = '';
      this.planAmount = '';
      this.subCategoryDetails = [];
    }
    // console.log(this.subscriptionDetails[i].plans[j].planType);
    this.checkboxes.forEach((element:any) => {
      // console.log(element.nativeElement.disabled);
      // console.log(element.nativeElement.id.includes('first-pla'+i+'-'+j));
      // console.log(element.nativeElement.checked);
      // console.log(i,j);
      if(!(element.nativeElement.id.includes('first-pla'+i+'-'+j))){
        element.nativeElement.checked = false;
      }
      else{
        firstPlan = element.nativeElement.checked;
      }
    });

    if(firstPlan == true){
      this.secondboxes.forEach((element:any) => {
        if(!(element.nativeElement.id.includes('second-pla'+i))){
          element.nativeElement.checked = false;
          element.nativeElement.disabled = true;
          // this.subCategoryDetails = [];
        }
        else{
          element.nativeElement.disabled = false;
        }
      });
    }
    else{
      this.secondboxes.forEach((element:any) => {
        if((element.nativeElement.id.includes('second-pla'+i))){
          element.nativeElement.checked = false;
          element.nativeElement.disabled = true;
        }
      });
    }
    
  }

  selectedsubCategory(i:any,k:any){
    console.log(this.subscriptionDetails[i].subCategory[k].categoryDesc);
    var category = this.subscriptionDetails[i].subCategory[k];
    var element = <HTMLInputElement> document.getElementById('second-pla'+i+'-'+k)
    console.log(element.checked);
    if(element.checked){
      this.subCategoryDetails.push(category);
    }
    else{
      this.subCategoryDetails.forEach((element:any, i:any) => {
        if(element == category){
          this.subCategoryDetails.splice(i,1);
        }
      });
    }
  }

  proceedToPay(){
    var subelement = <HTMLInputElement> document.getElementById('first-pla'+this.listIndex+'-'+this.listIndexJ);
    var count = 0;
    this.secondboxes.forEach((element:any) => {
      if((element.nativeElement.id.includes('second-pla'+this.listIndex)) && element.nativeElement.checked ){
        count++;
      }
    });

    if( count >= this.subscriptionDetails[this.listIndex].defaultPackageSelect ){
      this.viewPopUp = true;
    }
    else{
      this.viewPopUp = false;
      this.toastr.error('Please select atleast ' +this.subscriptionDetails[this.listIndex].defaultPackageSelect+ ' for ' +this.subscriptionType+ ' Plan' );
      this.toastr.error('Please select atleast ' +this.subscriptionDetails[this.listIndex].defaultPackageSelect+ ' for ' +this.subscriptionType+ ' Plan' );

    }
  }
}
