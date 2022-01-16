import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

/*interface Food {
  value: string;
  viewValue: string;
}*/

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})

export class CurrencyConverterComponent implements OnInit {

  constructor(private http:HttpClient) { }

  numCur: number = 1;

  config: any;
  JsonCurrencyData: any;
  fromList: any;
  toList: any;

  listHistory: any = [];

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
      (error:HttpErrorResponse)=>{console.log("Error")}
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

  clearHistory(){

    this.listHistory= [] as any;

  }

  inputOnChange(value:string){
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

      this.listHistory.unshift({
        value:value,
        from:this.fromChoosen,
        to:this.toChoosen,
        total:total
      });

    }

  }
}
