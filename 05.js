const eval_to_add_class = (key, result) => {
	var $e = $("#"+key);
	if(typeof result[key] == 'undefined'){
		$e.addClass('text-success').removeClass('text-danger');
		$e.children().addClass('bi-check').removeClass('bi-shield-fill-x');
	}else{
		$e.addClass('text-danger').removeClass('text-success');
		$e.children().addClass('bi-shield-fill-x').removeClass('bi-check');
	}
	active_button();
}

const active_button = () => {
	var $element = $(".msg_content").children('p');
	var total    = $element.length, 
		actives  = 0;
	$element.each(function(){
		if($(this).children().hasClass('bi-check')){
			actives++;
		}
	});
	var $button = $("button[type='submit']");
	actives == total ?$button.removeClass('disabled') :$button.addClass('disabled');
}

$("#password").on('keyup', function(){
	result = validarPassword(this.value);
	eval_to_add_class('E_LENGTH', result);
	eval_to_add_class('E_NUMBERS', result);
	eval_to_add_class('E_NOT_ZERO', result);
	eval_to_add_class('E_NOT_SPACE', result);
	eval_to_add_class('E_CONSECUTIVE_SPECIAL', result);
	eval_to_add_class('E_REPEATS_SPECIAL', result);
	eval_to_add_class('E_CONSECUTIVE_LETTERS', result);
	eval_to_add_class('E_CONSECUTIVE_NUMBER', result);
	eval_to_add_class('E_LOWERS', result);
	eval_to_add_class('E_UPPERS', result);
})
