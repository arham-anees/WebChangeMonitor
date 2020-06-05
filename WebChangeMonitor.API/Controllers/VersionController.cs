using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebChangeMonitor.Domain;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebChangeMonitor.API.Controllers {
	[Route("api/[controller]")]
	public class VersionController : Controller {
		[HttpPost]
		[Route("")]
		public IActionResult index([FromForm] string version, [FromForm]IEnumerable<cFile> files) {
			try {
				Log.WriteLine($"new version {version} is created");
				Log.WriteLine("files :" + files.Count());
				return StatusCode(200, "request reeived");
			}
			catch (Exception exception) {
				Log.WriteLine(exception);
				return StatusCode(500);
			}
		}
	}
}
