using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using WebChangeMonitor.API.Helper;
using WebChangeMonitor.Domain;
using WebChangeMonitor.UnitOfWork;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebChangeMonitor.API.Controllers {
	[Route("api/[controller]")]
	public class UserController : Controller {
		private readonly iUnitOfWork _UnitOfWork;

		public UserController(iUnitOfWork unitOfWork) {
			this._UnitOfWork = unitOfWork;
		}

		[HttpGet]
		public IActionResult Get() {
			try {
				if (!ModelState.IsValid)
					return BadRequest(ModelState);

				cUser user = cHelper.User(HttpContext, _UnitOfWork);
				var userRole = _UnitOfWork.UserRoleRepository.Get(user);
				var result = new {
					FirstName = userRole.User.FirstName,
					MiddleName = userRole.User.MiddleName,
					LastName = userRole.User.LastName,
					Email=userRole.User.Email,
					Phone=userRole.User.Phone,
					RoleName=userRole.Role.RoleName,
					Username=userRole.User.UserName
				};
				return Ok(result);
			}
			catch (Exception exception) {
				Log.WriteLine(exception);
				return StatusCode(500);
			}
		}


		// GET api/<controller>/5
		[HttpGet("{id}")]
		public string Get(int id) {
			return "value";
		}


		// PUT api/<controller>/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody]string value) {
		}

		// DELETE api/<controller>/5
		[HttpDelete("{id}")]
		public void Delete(int id) {
		}
	}
}
