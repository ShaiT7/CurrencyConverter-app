import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ConverterserviceService } from '../converterservice.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})

export class CurrencyConverterComponent implements OnInit {

  constructor(private http:HttpClient, private ConverterService:ConverterserviceService) { }

  numCur: number = 1;

  config: any;
  JsonCurrencyData: any;
  fromList: any;
  toList: any;

  listHistory: any = [];
  result:any={
    value:"",
    from:"",
    to:"",
    total:""
  };
  fromChoosen: string = "";
  toChoosen: string = "";

  ngOnInit(): void {
    this.getConfig().subscribe((data:any) => {
      this.config={...data};
      this.getJson().subscribe((data: any) => {
        this.JsonCurrencyData ={... data};
        this.getFromList();
        this.getToList();
      });
    },
      (error:HttpErrorResponse)=>{console.log("Error"); this.showWarning();}
    );
  }

  configUrl = 'assets/configConverterService.json';

  showWarning() {
      alert("Error communication to API");
  }

  getConfig() {
    return this.http.get<any>(this.configUrl);
  }

  getJson(){
    console.log(this.config["url"]);
    return this.http.get<any>(this.config["url"]);
  }

  getFromList(){
    this.fromList=[];
    // this.fromList = [this.JsonCurrencyData.base];
    Object.keys(this.JsonCurrencyData.rates).forEach(key => {
      this.fromList.push(key);
    });
  };

  getToList(){
    this.toList=[];
    Object.keys(this.JsonCurrencyData.rates).forEach(key => {
      this.toList.push(key);
    });
    // console.log(this.toList);
  };

  // clearHistory() {

  //   //this.listHistory = [] as any;

  //   this.result={
  //     value:"",
  //     from:"",
  //     to:"",
  //     total:""
  //   };

  // }

  inputOnChange(value:string) {
    let ChosCur:number;
    let total:number;

    if (this.fromChoosen != this.JsonCurrencyData.base){
      total =parseInt(value)/this.JsonCurrencyData.rates[this.fromChoosen]* this.JsonCurrencyData.rates[this.toChoosen];
    }
    else{
     ChosCur = this.JsonCurrencyData.rates[this.toChoosen];
     total = ChosCur * parseInt(value);
    }

    // this.listHistory.push({
    //   value:event.target.value,
    //   from:this.fromChoosen,
    //   to:this.toChoosen,
    //   total:total
    // });

    if (isNaN(total)) {
        alert("please choose Currency");
    } else {

    this.result={
      value:value,
      from:this.fromChoosen,
      to:this.toChoosen,
      total:total
    };

      // this.listHistory.unshift(this.result);
      this.ConverterService.unshiftHistory(this.result);
    }

  }
}
