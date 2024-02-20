import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


enum Colors {
	GRAY = 'bg-secondary',
	YELLOW = 'bg-warning',
	GREEN = 'bg-success',
  RED = 'bg-danger'
}

@Component({
  selector: 'app-validation-form',
  templateUrl: './validation-form.component.html',
  styleUrl: './validation-form.component.scss'
})

export class ValidationFormComponent {
  password = new FormControl('',[
    Validators.required,
    Validators.minLength(8)
  ]
  );

  strengthBars = [
    { color: Colors.GRAY },
    { color: Colors.GRAY },
    { color: Colors.GRAY }
  ];

  constructor() {
    this.password.valueChanges.subscribe(value => {
      if (value) {
        this.updateStrengthBars(value);
      }
    });
  }


  private updateStrengthBars(value: string): void {
    this.strengthBars.forEach(bar => bar.color = Colors.GRAY);

    if (!value) {
      return;
    }

    const strength = this.calculatePasswordStrength(value);

    if (value.length < 8) {
      this.strengthBars.forEach(bar => bar.color = Colors.RED);
      return;
    }

    switch (strength) {
      case 1:
        this.strengthBars[0].color = Colors.RED;
        break;
      case 2:
        this.strengthBars[0].color = Colors.YELLOW;
        this.strengthBars[1].color = Colors.YELLOW;
        break;
      case 3:
        this.strengthBars.forEach(bar => bar.color = Colors.GREEN);
        break;
      default:
    }
  }

  private calculatePasswordStrength(password: string): number {
    let strength = 0;
    const hasLetters = /[a-zA-Z\u0400-\u04FF]+/.test(password);
    const hasDigits = /[0-9]+/.test(password);
    const hasSymbols = /[^a-zA-Z0-9\u0400-\u04FF]+/.test(password);

    if (hasLetters) {
      strength++;
    };
    if (hasDigits) {
      strength++;
    };
    if (hasSymbols) {
      strength++;
    };

    return strength;
  }
}
