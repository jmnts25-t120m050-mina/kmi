import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppConstants } from '../../app.constants';
import { BmiCats } from '../../app.enums';

@Component({
  imports: [
    FormsModule
  ],
  selector: 'app-calc',
  styleUrl: './calc.css',
  templateUrl: './calc.html',
})
export class Calc {
  protected readonly AppConstants = AppConstants;
  public weight: number | null = null;
  public height: number | null = null;

  public resultText: string = 'Čia pasirodys Jūsų kūno masės indeksas (KMI)';
  public alertText: string = 'Prašome įvesti duomenis';
  public alertType: string = 'alert-primary';

  public calcBmi() {
    let result = this.bmiResult();
    if (result) {
      this.resultText = `Jūsų KMI yra ${ result.toFixed(2) }`;
      let bmiCat = this.calcBmiCat(result);
      this.setAlert(bmiCat);
    }
  }

  private setAlert(bmiCat: BmiCats) {
    switch (bmiCat) {
      case BmiCats.under:
        this.alertText = AppConstants.UNDER_LABEL;
        this.alertType = 'alert-info';
        break;
      case BmiCats.normal:
        this.alertText = AppConstants.NORMAL_LABEL;
        this.alertType = 'alert-success';
        break;
      case BmiCats.over:
        this.alertText = AppConstants.OVER_LABEL;
        this.alertType = 'alert-info';
        break;
      case BmiCats.cat1:
        this.alertText = AppConstants.CAT1_LABEL;
        this.alertType = 'alert-warning';
        break;
      case BmiCats.cat2:
        this.alertText = AppConstants.CAT2_LABEL;
        this.alertType = 'alert-danger';
        break;
      default:
        this.alertText = AppConstants.CAT3_LABEL;
        this.alertType = 'alert-dark';
        break;
    }
  }

  private calcBmiCat(bmi: number) : BmiCats {
    if (bmi > AppConstants.CAT2_MAX)
      return BmiCats.cat3;
    else if (bmi > AppConstants.CAT1_MAX)
      return BmiCats.cat2;
    else if (bmi > AppConstants.OVER_MAX)
      return BmiCats.cat1;
    else if (bmi > AppConstants.NORMAL_MAX)
      return BmiCats.over;
    else if (bmi >= AppConstants.NORMAL_MIN)
      return BmiCats.normal;
    return BmiCats.under;
  }

  private bmiResult() : number | null {
    if (this.weight && this.height) {
      let height_m = this.height / 100;
      return this.weight / Math.pow(height_m, 2);
    }
    return null;
  }
}
