<script>
	import Counter from './Counter.svelte'
	import NotFound from './NotFound.svelte'
	import Home from './Home.svelte'
	import Router from 'svelte-spa-router'
	import { link } from 'svelte-spa-router'
	


	const routes = {
		'/days/': Counter,
		'/': Home,
		'*': NotFound
	}

function onClickBurger() {
	burgerMenuClass = "burger "+ (opened ? "active" : "");
	navBarMenuClass = "navbar  menu "+ (opened ? "active" : "");
	if (opened) {
		//navBarMenuStyle = "maxHeight:"+
	}
}

let opened = false;

 let navBarMenuStyle = "";
 let navBarMenuClass = "navbar menu";
 let burgerMenuClass = "burger";



</script>


<header>
  
	<a class="logo" href="#/">My Tools</a>
	
	<input id="nav" type="checkbox">
	<label for="nav" id="burger"></label>
	
	<nav>
	  <ul>
		<li><a href="#/days">Days Counter</a></li>
		<li><a href="#/other">Other</a></li>		
	  </ul>
	</nav> 
	
  </header>

    

<Router {routes} />



