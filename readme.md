GruntJS & Nette Framework Sandbox
=================================

it's dirty experimental concept, be careful ;-)

based on Nette Sandbox https://github.com/nette/sandbox (15fbc489a82)



What is [Nette Framework](http://nette.org)?
------------------------

Nette Framework is a popular tool for PHP web development. It is designed to be
the most usable and friendliest as possible. It focuses on security and
performance and is definitely one of the safest PHP frameworks.

Nette Framework speaks your language and helps you to easily build better websites.

What is [GruntJS](http://gruntjs.com)?
------------------------

Grunt is a task-based command line build tool for JavaScript projects



Concept
------------------------

use Grunt for combine and minify CSS and JavaScript files for projects that runs on php - Nette



Install
------------------------

install [Composer](http://getcomposer.org)

install [Grunt](http://gruntjs.com)

clone repository
git clone git://github.com/chemix/Nette-Grunt.git

download dependencies via composer
composer.phar install

Use
------------------------

Edit project.json. In grunt.js update section 'usemin-handler'

'usemin-handler': {
	html: [
		'app/templates/@layout.latte',
		'app/templates/Registration/wizzard.latte',
	]
}

those files will be checked for script or link block definitions

Block definition:

CSS
```html
<!-- build:css {$basePath}/css/screen.min.css -->
<link rel="stylesheet" media="screen,projection,tv" href="{$basePath}/css/reset.css">
<link rel="stylesheet" media="screen,projection,tv" href="{$basePath}/css/screen.css">
<link rel="stylesheet" media="screen,projection,tv" href="{$basePath}/css/hyperCSS3.css">
<!-- endbuild -->
```


or JavaScript
```html
<!-- build:js {$basePath}/js/app.min.js -->
<script src="{$basePath}/js/netteForms.js"></script>
<script src="{$basePath}/js/helpers.js"></script>
<script src="{$basePath}/js/lightbox.js"></script>
<script src="{$basePath}/js/layout.js"></script>
<!-- endbuild -->
```

This is simple definition, grunt looks for block and create minified version js/screen.min.css and js/app.min.js

tadaa run "grunt"

Now we have minified versions, but not in templates

in BasePresenter we define version and mode for templates

```php
		$this->template->version = $this->getConfig('site', 'version');

		if ($this->context->parameters['productionMode']){
			// Production
			$this->template->develMode = FALSE;

		} else {
			// Devel
			$develMode = $this->getConfig('site','develMode');

			if ($develMode === NULL){
				$develMode = TRUE;
			}

			$this->template->develMode = $develMode;
		}
```
and set definition in config.neon

```yaml
common:
	parameters:
		site:
			develMode: true
			version: devel
```

now we update templates like this

```smarty
	{if $develMode}
		<!-- build:js {$basePath}/js/app.min.js -->
		<script src="{$basePath}/js/netteForms.js"></script>
		<script src="{$basePath}/js/helpers.js"></script>
		<script src="{$basePath}/js/lightbox.js"></script>
		<script src="{$basePath}/js/layout.js"></script>
		<!-- endbuild -->
	{else}
		<script src="{$basePath}/js/app.min.js?{$version}"></script>
	{/if}
```


TODO
------------------------

Make Latte macro and remove {if $develMode} & {$version}

{build js="$basePath/js/app.min.js"}
<script src="{$basePath}/js/netteForms.js"></script>
<script src="{$basePath}/js/helpers.js"></script>
<script src="{$basePath}/js/lightbox.js"></script>
<script src="{$basePath}/js/layout.js"></script>
{/build}



License : MIT ./license.md

Packages:
------------------------
Nette: NewBSD or GNU 2 or 3 http://nette.org/en/license
Grunt: MIT https://github.com/gruntjs/grunt/blob/master/LICENSE-MIT
Yeoman: BSD http://opensource.org/licenses/bsd-license.php
grunt-contrib-mincss: MIT https://github.com/gruntjs/grunt-contrib-mincss/blob/master/LICENSE-MIT



