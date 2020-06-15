using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using WebChangeMonitor.API.Models;
using WebChangeMonitor.Domain;
using WebChangeMonitor.UnitOfWork;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebChangeMonitor.API.Controllers {
	[Route("api/[controller]")]
	public class AuthController : Controller {
		IConfiguration _Configuration;
		private readonly iUnitOfWork _UnitOfWork;

		public AuthController(IConfiguration configuration, iUnitOfWork unitOfWork) {
			_Configuration = configuration;
			this._UnitOfWork = unitOfWork;
		}

		[Route("Register")]
		[HttpPost]
		public IActionResult SignUp([FromBody]SignUpAuthActionModel actionModel) {
			try {
				cUser user = new cUser() {
					Email = actionModel.Email,
					UserName = actionModel.UserName,
					HashedPassword = actionModel.Password
				};
				Console.WriteLine(user.HashedPassword);
				Console.WriteLine(user.Email);
				Console.WriteLine(user.UserName);
				using (_UnitOfWork) {
					_UnitOfWork.UserRepository.Set(user);
					_UnitOfWork.Complete();
				}
				return StatusCode(200,user);
			}
			catch (Exception exception) {
				Log.WriteLine(exception);
				return StatusCode(500);
			}
		}

		[Route("IsUsernameAvailable")]
		[HttpPost]
		public IActionResult IsUsernameAvailable([FromForm]string username) {
			try {
				Log.Information($"username availability checking {DateTime.Now}");
				if (username == null)
					return StatusCode(400, "null username is not allowed");
				return StatusCode(200, _UnitOfWork.UserRepository.IsUsernameAvaiable(username));
			}
			catch (Exception exception) {
				Log.WriteLine(exception, "IsUsernameAvailable", "Auth");
				return StatusCode(500);
			}
		}

		[Route("IsEmailAvailable")]
		[HttpPost]
		public IActionResult IsEmailAvailable([FromForm]string email) {
			try {
				Log.Information($"email availability checking {DateTime.Now}");
				if (email == null)
					return StatusCode(400, "null username is not allowed");
				return StatusCode(200, _UnitOfWork.UserRepository.IsEmailAvaiable(email));
			}
			catch (Exception exception) {
				Log.WriteLine(exception, "IsUsernameAvailable", "Auth");
				return StatusCode(500);
			}
		}
		public IActionResult Register() { return View(); }
	}
}
