# backbone-tab

Tab class extends Backbone.js's View object that forms a tab navigation UI.

# Demo

- [demo](http://seckie.github.io/backbone-tab/)

## Usage

### HTML example

Required elements are tab navigation link list, whole contents wrapper (ex: &lt;div class="contents"/&gt;) and each contents with wrapper (ex: &lt;div class="section"/&gt;).
Navigation link element must link to each contents ID.

	<div id="tabsection">
	<div class="nav">
	<ul>
	<li class="tab1"><a href="#section1" class="tabstyle">Section 1</a></li>
	<li class="tab2"><a href="#section2" class="tabstyle">Section 2</a></li>
	<li class="tab3"><a href="#section3" class="tabstyle">Section 3</a></li>
	</ul>
	<!--/.nav--></div>

	<div class="contents">
		<div class="section" id="section1">
			<!-- some contents -->
		<!--/#section1--></div>
		<div class="section" id="section2">
			<!-- some contents -->
		<!--/#section2--></div>
		<div class="section" id="section3">
			<!-- some contents -->
		<!--/#section3--></div>
	<!--/.contents--></div>
	<!--/.tabsection--></div>


### JavaScript example

Create instance from $.Tab constructor.

	var tab = new $.Tab({
	  el: '#tabsection .nav a',
	  effect: false
	});

And you can override "show" method of instance.


## Options
<table border="1">
<colgroup span="1" class="colh">
<colgroup span="1" class="colh">
<colgroup span="1" class="cold">
<thead>
<tr>
<th>option name</th>
<th>default value</th>
<th>note</th>
</tr>
</thead>
<tbody>
<tr>
<td>onClassName</td>
<td>&quot;on&quot;</td>
<td>Class name that will be added to the activated tab.</td>
</tr>
<tr>
<td>defaultIndex</td>
<td>0</td>
<td>Number represents index of content to show when the page is loaded.</td>
</tr>
<tr>
<td>effect</td>
<td>true</td>
<td>Boolean represents contents switching has a fade effect or not.</td>
</tr>
</tbody>
</table>

### CSS example

	.tabsection {
	  margin: 0 auto;
	  padding: 40px 0;
	  width: 600px;
	}
	.nav {
	  position: relative;
	  z-index: 1;
	}
	.nav ul {
	  margin: 0;
	}
	.nav ul:after {
	  content: "";
	  display: block;
	  clear: both;
	}
	.nav li {
	  float: left;
	  width: 140px;
	  margin-bottom: -1px;
	  list-style-type: none;
	}
	.nav a {
	  display: block;
	  border-top: 1px solid #ccc;
	  border-right: 1px solid #ccc;
	  border-left: 1px solid #ccc;
	  background-color: #ccc;
	  margin-right: 10px;
	  padding: .5em 1em;
	  color: #333;
	  text-decoration: none;
	}
	.nav a.on {
	  background-color: #fff;
	}
	.contents {
	  position: relative;
	  z-index: 0;
	  border: 1px solid #ccc;
	}
	.section {
	  padding: 50px 100px;
	  line-height: 1.5;
	}

