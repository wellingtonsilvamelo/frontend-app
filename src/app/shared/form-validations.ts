import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormValidations {

  static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {
    const config = {
        'required': `${fieldName} é obrigatório!`,
        'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength}!`,
        'maxlength': `${fieldName} precisa ter no máximo ${validatorValue.requiredLength}!`,
        'cepInvalido': 'CEP Inválido!',
        'emailInvalid': `${fieldName} já existe!`,
        'email': `Por favor, informe um ${fieldName} válido!`,
        'notEqualTo': `${fieldName} não correspondem!`,
        'requiredCheckMin': `Você precisa informar ao menos ${validatorValue.requiredLength} ${fieldName}!`
    }
    return config[validatorName];
  }

    static requiredMinCheckBox(min: number){
        const validator = (formArray: FormArray) => {
          let values = formArray.controls;
          let totalChecked = values.map(v => v.value)
                                   .reduce((total, current) => current ? total + 1 : total, 0);
          return totalChecked >= min ? null : { requiredCheckMin: { requiredLength : min, actualLength: totalChecked } };
        }
        return validator;
    }

    static cepValidator(formControl: FormControl){
        const cep = formControl.value;
        if(cep && cep !== ''){
            const validaCEP = /^[0-9]{8}$/;
            return validaCEP.test(cep) ? null : { cepInvalido : true}
        }
        return null;
    }

    static equalTo(otherField: string){
        const validator = (formControl: FormControl) => {
            if(otherField == null){
                throw new Error('É necessário informar um campo.');
            }

            if(!formControl.root || !(<FormGroup>formControl.root).controls){
                return null;
            }
            
            const field = (<FormGroup>formControl.root).get(otherField);

            if(!field){
                throw new Error('É necessário informar um campo.');
            }

            if(field.value !== formControl.value){
                return { notEqualTo : true }
            }

            return null;
        }
        return validator;
    }

}