package com.pbatchis.miniblog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Controller for the front-end application.
 */
@Controller
public class WebController {

	/**
	 * Maps URL "/" to index.html file served 
	 * by Thymeleaf template engine.
	 * @return the name of the view resource.
	 */
	@RequestMapping("/")
	public String index() {
		return "index";
	}
}
