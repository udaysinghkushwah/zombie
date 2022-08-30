import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  DEFAULT_INIT_GRID,
  GRID_MAX,
  GRID_MIN,
} from '@zombie/board/interfaces';

export class SettingsForm extends FormGroup {
  get formControls() {
    return {
      size: this.controls['size'] as FormControl,
      sizeExtra: this.controls['sizeExtra'] as FormControl,
      zombies: this.controls['zombies'] as FormControl,
      creatures: this.controls['creatures'] as FormControl,
      mode: this.controls['mode'] as FormControl,
      moveSet: this.controls['moveSet'] as FormControl,
    };
  }

  constructor() {
    super(settingsFormInitControls);
  }
}

export const MODE_ZOMBIE = 0;

export const MODE_CREATURE = 1;

export const settingsFormInitControls = {
  size: new FormControl(DEFAULT_INIT_GRID.length, [
    Validators.required,
    Validators.min(GRID_MIN),
    Validators.max(GRID_MAX),
  ]),
  // extra control, will not be sent
  sizeExtra: new FormControl(2, [
    Validators.required,
    Validators.min(GRID_MIN),
    Validators.max(GRID_MAX),
  ]),
  zombies: new FormControl(0, [Validators.required, Validators.min(1)]),
  creatures: new FormControl(0, [Validators.required, Validators.min(1)]),
  mode: new FormControl(MODE_ZOMBIE, [
    Validators.required,
    Validators.min(MODE_ZOMBIE),
    Validators.max(MODE_CREATURE),
  ]),
  moveSet: new FormControl('', [
    Validators.required,
    (control: AbstractControl) => {
      const value: string = control.value;
      const acceptedCharacters = 'UDLRudlr'.split('');
      const invalidCharacters = value
        .split('')
        .filter((ch) => !acceptedCharacters.includes(ch));

      if (invalidCharacters.length > 0) {
        return { invalidCharacters: invalidCharacters };
      }

      if (value.length - invalidCharacters.length < 1) {
        return { tooShort: true };
      }
      return null;
    },
  ]),
};

export type settingsFormKeys = keyof typeof settingsFormInitControls;
