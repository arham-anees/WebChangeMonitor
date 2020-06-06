using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WebChangeMonitor.API.Models;
using WebChangeMonitor.Domain;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebChangeMonitor.API.Controllers {
	[Route("api/[controller]")]
	public class VersionController : Controller {
		[HttpPost]
		[Route("")]
		public IActionResult index([FromBody]IndexVersionPostActionModel actionModel) { 
			//string version,[FromBody]cFile[] file, List<IndexVersionPostActionModel> actionModels) {
			try {
				Log.WriteLine($"new version {actionModel.Version} is created");
				//Log.WriteLine("files :" + actionModels.Count());
				return StatusCode(200, actionModel.Files);
			}
			catch (Exception exception) {
				Log.WriteLine(exception);
				return StatusCode(500);
			}
		}
	}
}
