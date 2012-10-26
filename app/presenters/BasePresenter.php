<?php

/**
 * Base presenter for all application presenters.
 */
abstract class BasePresenter extends Nette\Application\UI\Presenter
{
	function beforeRender()
	{
		parent::beforeRender();

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
	}

	public function getConfig($path, $name = NULL)
	{
		if ($path != NULL &&
			$name != NULL &&
			isset($this->context->parameters[$path][$name])){

			return $this->context->parameters[$path][$name];

		} elseif ($path != NULL &&
			$name === NULL &&
			isset($this->context->parameters[$path])){

			return $this->context->parameters[$path];

		}else {
			return NULL;
		}
	}
}
