/*!!
 * Power Panel Drawer <https://github.com/carlos-sweb/pp-drawer>
 * @author Carlos Illesca
 * @version 1.0.6 (2020/04/26 14:15 PM)
 * Released under the MIT License
 */
(function(global , factory ){
  	
  	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  	
  	typeof define === 'function' && define.amd ? define('ppDrawer', factory) :
	
	(global = global || self, (function () {
        
    var exports = global.ppDrawer = factory();    

	}()
	
));

})( this,(function(  ) {

	return function( identy ){
		/*
		*@name ___lisenAnimation
		*@type Function
		*@description esta funcion dependiendo del evento 
		* remueve la animacion que oportunamente tiene el mismo 
		* nombre de la class que esta en el objecto
		*/
		function ___lisenAnimation(event){

			var animation = event.animationName, target = event.target;	

			if( animation == 'fadeOut' ){target.classList.add('hidden')}

			if( animation == 'pp-drawer--close' ){target.classList.add('hidden_drawer')}

			target.classList.remove(animation);			
		}	
		/*
		*@name __scrimClose
		*@type boolean
		*@description - Esta funcion describe si se debe cerrar el 
		*drawer desde un click del scrim 		
		*/
		this.__srimClose = true;
		/*
		*@name scrimClose
		*@type Function
		*@params val = bollean
		*@description - cambia el valor de __scrimClose, solo se aceptar valores
		* boleanos
		*/
		this.scrimClose = function( val ){
			if( val == true || val == false ){
				if( val != this.__srimClose ){ 
					this.__srimClose = val;
				}				
			}
		}
		/*
		*@name __open
		*@type boolean
		*@description - Esta variable muestra el 
		*esta de drawer si esta abierto o cerrado
		*/
		this.__open = false;
		/*
		*@name isOpen
		*@type Function
		*@description - Funcion que retorna el valor boleano para 
		* verificar si el drawer esta abierto
		*/
		this.isOpen = function (){
			return this.__open;
		}
		/*
		*@name drawer
		*@type HtmlElement
		*/
		this.drawer = null;
		/*
		*@name drawer
		*@type HtmlElement
		*/
		this.scrim = null;
		// ------------------------------------------------------------------------
		/*
		*@name init
		*@type Function
		*@params : __identy = string
		*description - Funcion que inicializa los elementos
		*/
		this.init = function( __identy ){
			if( typeof __identy == 'string' ){
						
			var drawer = document.querySelector(".pp-drawer[drawer-id='"+__identy+"']");
			var scrim = document.querySelector(".pp-drawer-scrim[drawer-id='"+__identy+"']");
			if(drawer != null  && scrim != null  ){
				
				this.drawer = drawer;
				this.scrim = scrim;
				this.scrim.addEventListener('animationend',___lisenAnimation);
				this.drawer.addEventListener('animationend',___lisenAnimation);
				this.scrim.addEventListener('click',function(){
					if( this.__srimClose == true ){
						this.close();	
					}
				}.bind(this));

				// Verificamos que el __identy coincida
			}else{console.warn("pp-drawer say :  drawer-id='"+__identy+"' no found");}			
		}else{ console.warn("pp-drawer say : drawer-id must be string") }

		}
		// ------------------------------------------------------------------------
		/*
		*@name open
		*@type Function
		*@description - Funcion que ejecuta las animaciones de 
		*apertura del drawer
		*/
		this.open = function( ){
			if( this.drawer != null && this.scrim != null && this.__open == false ){

				this.drawer.classList.remove("hidden_drawer");	
				this.drawer.classList.add("pp-drawer--open");

				this.scrim.classList.add("fadeIn");
				this.scrim.classList.remove("hidden");
				this.__open = true;

			}
		}
		// ------------------------------------------------------------------------			
		/*
		*@name close
		*@type Function
		*@description - Funcion que ejecuta las animaciones de 
		*cierre del drawer
		*/
		this.close = function(){
			 if( this.drawer != null && this.scrim != null && this.__open == true ){			 				 	
		 		this.__open = false;
				this.drawer.classList.add("pp-drawer--close");
				this.scrim.classList.add("fadeOut");
			 }
		}
		// ------------------------------------------------------------------------
		// Se inicializa		
		if( identy != undefined ){ this.init(identy); }
	}

}))