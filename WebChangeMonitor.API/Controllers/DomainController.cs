using System;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using WebChangeMonitor.API.Helper;
using WebChangeMonitor.API.Models;
using WebChangeMonitor.Domain;
using WebChangeMonitor.UnitOfWork;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebChangeMonitor.API.Controllers {
	[Route("api/[controller]")]
	[Authorize]
	[ApiController]
	public class DomainController : Controller {
		private readonly iUnitOfWork unitOfWork;

		public DomainController(iUnitOfWork unitOfWork){
			this.unitOfWork = unitOfWork;
		}

		[HttpPost]
		[Route("")]
		public IActionResult Index(IndexDomainPostActionModel actionModel) {
			try {
				Log.WriteLine(actionModel.Domain);
				cDomain domain = new cDomain() {
					Username = actionModel.Username,
					Password = actionModel.Password,
					HomeUrl = actionModel.Domain,
					ServerIp = actionModel.ControlPanelUrl,
					TargetServerDirectory = actionModel.TargetDirectory
				};

				unitOfWork.DomainRepository.Set(domain);
				var user= cHelper.User(HttpContext, unitOfWork);
				user.DomainId = domain.Id;
				unitOfWork.UserRepository.Update(user);

				return StatusCode(201, actionModel);
			}
			catch (Exception exception) {
				Log.WriteLine(exception);
			}
			return StatusCode(500);
		}
	}
}
