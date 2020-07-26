using System.Collections.Generic;
using System.Linq;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

using WebChangeMonitor.API.Models;
using WebChangeMonitor.UnitOfWork;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebChangeMonitor.API.Controllers {
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class RoleController : Controller {
		private readonly IConfiguration _Configuration;
		private readonly iUnitOfWork _UnitOfWork;

		public RoleController(IConfiguration configuration, iUnitOfWork unitOfWork) {
			this._Configuration = configuration;
			this._UnitOfWork = unitOfWork;
		}

		[HttpGet]
		[Route("")]
		public IEnumerable<GetAllRolesActionModel> Get() {
			return _UnitOfWork.RoleRepository.GetAll().Select(x=>new GetAllRolesActionModel() {
			Id=x.Id,
			Name=x.RoleName
			}).Where(x => x.Id != 1).Where(x=>x.Id!=5);
		}


	}
}
