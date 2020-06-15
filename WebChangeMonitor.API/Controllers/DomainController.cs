using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebChangeMonitor.API.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebChangeMonitor.API.Controllers {
	[Route("api/[controller]")]
	public class DomainController : Controller {
		// GET: /<controller>/
[HttpPost]
[Route("")]
		public IActionResult Index(IndexDomainPostActionModel actionModel) {
			try {
				Log.WriteLine(actionModel.Domain);
				return StatusCode(201, actionModel);
			}
			catch (Exception exception) {
				Log.WriteLine(exception);
			}return StatusCode(500);
		}
	}
}
