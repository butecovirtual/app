import moment from 'moment';

export const validation = {
  required: {
    presence: {
      message: "Este campo é obrigatório"
    },
    length: {
      minimun: {
        val: 1,
        message: "Este campo é obrigatório"
      }
    }
  },
  passwordLogin: {
    presence: {
      message: "Favor informar a sua senha"
    }
  },
  password: {
    presence: {
      message: "Favor informar a sua senha"
    },
    format: {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/,
      message:
        "Sua Senha deve ter entre 6 e 15 caracteres, com pelo menos uma letra e um número, sem caracter especial"
    }
  },
  name: {
    presence: {
      message: "Favor informar seu nome ou da banda"
    },
    length: {
      minimun: {
        val: 5,
        message: "O nome informado deverá conter entre 5 e 100 caracteres"
      }
    }
  },
  username: {
    presence: {
      message: "Favor informar seu username"
    },
    length: {
      minimun: {
        val: 4,
        message: "O usuário informado deverá conter entre 4 e 10 caracteres"
      }
    }
  },
  cpf: {
    presence: {
      message: "Favor informar o CPF"
    },
    format: {
      pattern: /[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/,
      message: "Favor informar um CPF válido"
    }
  },
  email: {
    presence: {
      message: "Favor informar o E-mail"
    },
    format: {
      pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Favor informar um E-mail válido"
    }
  },
  phoneNumber: {
    presence: {
      message: "Favor informar o Celular"
    },
    format: {
      pattern: /\([0-9]{2}\)\ [0-9]{5}\-[0-9]{4}$/,
      message: "Favor informar um Celular válido"
    }
  },
  board: {
    presence: {
      message: "Favor informar a Placa do veículo"
    },
    format: {
      pattern: /([a-zA-Z]{3}\-[0-9]{1}[a-zA-Z]{1}[0-9]{2})|([a-zA-Z]{3}\-[0-9]{4})$/,
      message: "Favor informar uma Placa válida ex:HHH-0000 ou HHH-0H00"
    }
  },
  typeVehicle: {
    presence: {
      message: "O tipo de veículo é obrigatório"
    },
    length: {
      minimun: {
        val: 1,
        message: "O tipo de veículo é obrigatório"
      }
    }
  }
};

export const validate = (nameField, value) => {
  const resp = [null, null];
  if (validation.hasOwnProperty(nameField)) {
    const v = validation[nameField];
    if (value === "" || value === null || value === undefined) {
      resp[0] = false;
      resp[1] = v["presence"]["message"];
    } else if (
      v.hasOwnProperty("format") &&
      !v["format"]["pattern"].test(value)
    ) {
      resp[0] = false;
      resp[1] = v["format"]["message"];
    } else if (v.hasOwnProperty("length")) {
      const l = v["length"];
      if (l.hasOwnProperty("minimun") && value.length < l["minimun"]["val"]) {
        resp[0] = false;
        resp[1] = l["minimun"]["message"];
      } else {
        resp[0] = true;
      }
    } else {
      resp[0] = true;
    }
  } else {
    resp[0] = true;
  }
  return resp;
};

export const validateCPF = (value) => {
  if(!value){
      return 'Campo Obrigatório';
  }
  if(!/[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/.test(value)){
      return 'CPF inválido';
  }
}

export const validateExpiration = (value) => {
  if(!value){
      return 'Campo Obrigatório';
  }
  if(!/[0-9]{2}\/[0-9]{2}$/.test(value)){
      return 'Expiração inválida';
  }
  const date = value.split('/');
  const month = date[0];
  const year = date[1];
}

export const validateDate = (value) => {
  if(!value){
      return 'Campo Obrigatório';
  }
  if(!moment(value, 'DD/MM/YYYY').isValid()){
      return 'Data inválida';
  }
}

export const validateCVC = value => {
  if(!value){
      return 'Campo Obrigatório';
  }
  if(!/[0-9]{3}$/.test(value)){
      return 'CVC inválido';
  }
}

export const validateName = value => {
  if(!value){
      return 'Campo Obrigatório';
  }
  if(!value.match(/[a-zA-Z]+/g)){
      return 'Nome inválido';
  }
}

export const validateNumber = value => {
  if(!value){
      return 'Campo Obrigatório';
  }
}
