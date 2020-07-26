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
	[Authorize]
	public class AcceptanceStatusController : Controller {
		private readonly iUnitOfWork _UnitOfWork;

		public AcceptanceStatusController(iUnitOfWork unitOfWork) {
			this._UnitOfWork = unitOfWork;
		}



		[HttpGet]
		public IActionResult Get() {
			var data = _UnitOfWork.AcceptanceStatusRepository.GetAll().ToList();
			return StatusCode(200, data);
		}

		// GET api/<controller>/5
		[HttpGet("{id}")]
		public IActionResult Get(int id) {
			try {
				var data = _UnitOfWork.AcceptanceStatusRepository.Get(id);
				if (data == null)
					return NoContent();
				return StatusCode(200, data);
			}
			catch (Exception exception) {
				Log.WriteLine(exception, "GetByUser", "AcceptanceStatusController");
				return StatusCode(500);
			}
		}

		// POST api/<controller>
		[HttpPost]
		public IActionResult Post([FromForm]CreateAcceptanceStatusActionModel actionModel) {
			try {
				Log.Information(actionModel.Remarks);
				Log.Information(actionModel.IsAccepted.ToString());
				Log.Information(actionModel.VersionId.ToString());
				if (actionModel == null)
					return BadRequest("null object");
				if (actionModel.VersionId <= 0)
					return BadRequest("invalid version selected");

				var data = new cAcceptanceStatus() {
					Remarks = actionModel.Remarks,
					IsAccepted = actionModel.IsAccepted,
					Version = _UnitOfWork.VersionRepository.Get(actionModel.VersionId),
					IsActive=true
				};
				
				using (_UnitOfWork) {
					_UnitOfWork.AcceptanceStatusRepository.Set(data);
					_UnitOfWork.Complete();
				}
				return Created("",data);
			}
			catch (Exception exception) {
				Log.WriteLine(exception, "GetByUser", "AcceptanceStatusController");
				return StatusCode(500);
			}
		}

		// PUT api/<controller>/5
		[HttpPut("{id}")]
		public IActionResult Put(int id, [FromForm]UpdateAcceptanceStatusActionModel actionModel) {
			try {
				if (actionModel == null)
					return BadRequest("null object");
				if (actionModel.VersionId <= 0)
					return BadRequest("invalid version selected");

				var data = new cAcceptanceStatus() {
					Id = actionModel.Id,
					Remarks = actionModel.Remarks,
					IsAccepted = actionModel.IsAccepted,
					Version = _UnitOfWork.VersionRepository.Get(actionModel.VersionId)
				};
				_UnitOfWork.AcceptanceStatusRepository.Update(data);
				return Put(data.Id,actionModel);
			}
			catch (Exception exception) {
				Log.WriteLine(exception);
				return StatusCode(500);
			}
		}

		/// <summary>
		/// this method donot require user id as parameter 
		/// because this can only be accessed by authorized 
		/// person and that can be extracted from token
		/// </summary>
		/// <returns>returns last acceptance status of user</returns>
		[HttpGet("user/{versionId}")]
		public IActionResult GetByUser(int versionId) {
			try {
				var user = cHelper.User(HttpContext, _UnitOfWork);
				Log.Information("user id "+user.Id.ToString());
				var data = _UnitOfWork.AcceptanceStatusRepository.Get(user,versionId);
				if (data == null)
					return NoContent();
				return StatusCode(200, data);
			}
			catch (Exception exception) {
				Log.WriteLine(exception, "GetByUser", "AcceptanceStatusController");
				return StatusCode(500);
			}
		}
		
		
		[HttpGet("version/{id}")]
		public IActionResult GetByVersion(int id) {
			try {
				var version = _UnitOfWork.VersionRepository.Get(id);
				if (version == null)
					return NoContent();
				var data = _UnitOfWork.AcceptanceStatusRepository.Get(version);
				if (data == null)
					return NoContent();
				return StatusCode(200, data);
			}
			catch (Exception exception) {
				Log.WriteLine(exception, "GetByUser", "AcceptanceStatusController");
				return StatusCode(500);
			}
		}


	}
}
