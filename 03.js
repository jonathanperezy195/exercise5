const word_lower    = 'abcdefghijklmnñopqrstuvwxyz';
const word_upper    = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
const all_words     =  word_lower + word_upper;
const word_specials = '!@#$%^&*-_+=?';

const validarPassword = (pass) => {
	var errores = {}, specials_chars = [];
	var lowers = 0, uppers = 0, numbers = 0, specials = 0;
	var saved_letter = false, saved_special = false, saved_numbers = false, repeat_special = false, not_zero = false, not_space = false;
	var pass_split   = pass.split("");

	if(pass.length < 16){ // Al menos 16 caracteres
		errores.E_LENGTH = "Longitud de la clave inválida.";
	}

	pass_split.forEach( (word, index) => {
		if(word=='0' && !not_zero){
			errores.E_NOT_ZERO  = "El 0 no es un carácter válido.";
			not_zero = true;
		}
		if(word== ' ' && !not_space){
			errores.E_NOT_SPACE = "No puede usar espacios para la contraseña.";
			not_space = true;			
		}

		if(searchIn(word, 'lower') >= 0){ 
			lowers++; // contar minusculas
		}
		if(searchIn(word, 'upper') >= 0){	
			uppers++; // contar mayusculas
		}

		if(isNaN(word) || word == " "){
			if(searchIn(word, 'specials') >= 0){ // Buscar caracteres especiales
				if(is_consecutive(pass_split, index, 'specials') && !saved_special){ // Evaluar si existe de forma consecutiva
					errores.E_CONSECUTIVE_SPECIAL = "No se permiten caracteres especiales de forma consecutivas.";
					saved_special = true;
				}
				if(specials_chars.includes(word)){ // Evaluar si el carácter ya fué guardado
					if(!repeat_special){ // Evita repetir el mensaje de error
						errores.E_REPEATS_SPECIAL = "No se permiten caracteres especiales iguales.";	
						repeat_special            = true;			
					}
				}else{
					specials_chars.push(word);
				}
			}else{ // son letras
				if(is_consecutive(pass_split, index, 'all') && !saved_letter){
					errores.E_CONSECUTIVE_LETTERS = "No se permiten letras iguales de forma consecutivas.";
					saved_letter = true;
				}
			}
		}else{
			numbers++;
			if(is_consecutive(pass_split, index, 'int') && !saved_numbers){
				errores.E_CONSECUTIVE_NUMBER = "No se permiten numeros de forma consecutivas.";
				saved_numbers = true;
			}
		}
	})

	if(lowers == 0){
		errores.E_LOWERS  = "La contraseña debe contener al menos una letra minuscula";
	}
	if(uppers == 0){
		errores.E_UPPERS  = "La contraseña debe contener al menos una letra mayúscula.";
	}
	if(numbers < 4){
		errores.E_NUMBERS = "La contraseña debe contener al menos 4 números";
	}
	return errores;
}

const searchIn = (word, type='all') =>{
	switch(type){
		case 'lower':
			return word_lower.indexOf(word);
		break;
		case 'upper':
			return word_upper.indexOf(word);
		break;
		case 'specials':
			return word_specials.indexOf(word);
		break;
		default:
			return all_words.indexOf(word);
		break;
	}
}

const is_consecutive = (array, index, search_type='all') => {
	word = array[index];
	next = typeof array[index+1] == 'undefined' ?false :array[index+1];
	if( next && word == next){ 
		if(search_type == 'int' || (searchIn(word, search_type) >= 0 && searchIn(next, search_type) >= 0) ){
			return true;
		}
	}
	return false;
}