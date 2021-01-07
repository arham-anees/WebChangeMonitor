using System;
using System.Linq;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using WebChangeMonitor.API.Helper;
using WebChangeMonitor.API.Models;
using WebChangeMonitor.Domain;
using WebChangeMonitor.UnitOfWork;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebChangeMonitor.API.Controllers {
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
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
					Username=userRole.User.UserName,
					Address=userRole.User.Address
				};
				return Ok(result);
			}
			catch (Exception exception) {
				Log.WriteLine(exception);
				return StatusCode(500);
			}
		}

		// PUT api/<controller>/5
		[HttpPut("{username}")]
		public IActionResult Put( string username, [FromBody]UpdateUserActionModel	actionModel) {
			try {
				if (username == null)
					return BadRequest();
				var user = _UnitOfWork.UserRepository.Get(username);
				if (user == null)
					return NoContent();
				user.FirstName = actionModel.FirstName;
				user.MiddleName = actionModel.MiddleName;
				user.LastName = actionModel.LastName;
				user.Address = actionModel.Address;
				user.City = actionModel.City;
				user.Phone = actionModel.Phone;
				_UnitOfWork.UserRepository.Update(user);
				_UnitOfWork.Complete();
				return Ok(user);
			}
			catch (Exception exception) {
				Log.WriteLine(exception);
				return StatusCode(500);
			}
		}

		// DELETE api/<controller>/5
		[HttpDelete("{username}")]
		public IActionResult Delete(string username) {
			try {
				Console.WriteLine("username " + username);
				var user = _UnitOfWork.UserRepository.Get(username);
				if (user == null)
					return NoContent();
				user.IsActive = false;
				_UnitOfWork.UserRepository.Update(user);
				_UnitOfWork.Complete();
				return Ok(user);
			}
			catch (Exception exception) {
				Log.WriteLine(exception);
				return StatusCode(500, "An internal error occurred while processing your request");
			}
		}
	
	[HttpGet("domain/{domainId}")]
	public IActionResult GetDomainUsers(int domainId) {
			try {
				Log.Information("Users for domain id " + domainId + " are requested ");
				if (domainId <= 0)
					return NoContent();
				var users= _UnitOfWork.UserRepository.GetDomainUsers(domainId);
				Log.Information("Users for domain id " + domainId + " are requested and sent data of "+users.Count());
				return Ok(users);
			}
			catch (Exception exception) {
				Log.WriteLine(exception);
				return StatusCode(500, "An internal error occurred while processing your request");
			}
		}
	}
}
