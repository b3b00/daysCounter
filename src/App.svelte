<script>
	import Counter from './Counter.svelte'
	import NotFound from './NotFound.svelte'
	import Home from './Home.svelte'
	import Year from './calendar/Year.svelte'
	import Year2 from './calendar2/Year2.svelte'
	import Router from 'svelte-spa-router'
	import { link } from 'svelte-spa-router'
	


	const routes = {
		'/days/': Counter,
		'/calendar/:year': Year,
		'/calendar2/': Year2,
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
		<li><a href="#/calendar/2022">Calendar</a></li>
		<li><a href="#/calendar2">Calendar2</a></li>
		<li><a href="#/other">Other</a></li>		
	  </ul>
	</nav> 
	
  </header>

    

<Router {routes} />



