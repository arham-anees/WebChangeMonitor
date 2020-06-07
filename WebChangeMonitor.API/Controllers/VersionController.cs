using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WebChangeMonitor.API.Models;
using WebChangeMonitor.Domain;
using WebChangeMonitor.UnitOfWork;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebChangeMonitor.API.Controllers {
	[Route("api/[controller]")]
	public class VersionController : Controller {

		private iUnitOfWork _UnitOfWork;
		public VersionController(iUnitOfWork unitOfWork) {
			_UnitOfWork = unitOfWork;
		}

		[HttpPost]
		[Route("")]
		public IActionResult index([FromBody]IndexVersionPostActionModel actionModel) { 
			//string version,[FromBody]cFile[] file, List<IndexVersionPostActionModel> actionModels) {
			try {
				Log.WriteLine("Request for creating new version received");
				cVersion version = new cVersion() {
					Version = actionModel.Version,
					Domain = "domain"
				};
				//create version files
				List<cVersionFiles> versionFiles = new List<cVersionFiles>();
				foreach (var item in actionModel.Files.ToList()) {
					Console.WriteLine(item.File.LocalName);
					versionFiles.Add(new cVersionFiles() {
						FileId=item.File.Id,
						//FileStatus=_UnitOfWork.FileStatusRepository.Get(item.StatusId),
						FileStatusId=item.StatusId,
						Version=version
					});
					version.VersionFiles = versionFiles;

					version=_UnitOfWork.VersionRepository.Set(version);
					_UnitOfWork.Complete();
					Log.WriteLine(version.Id.ToString());
					Log.WriteLine("Request for creating new version received");

				}
				return StatusCode(200, actionModel.Files);
			}
			catch (Exception exception) {
				Log.WriteLine(exception);
				return StatusCode(500);
			}
		}
	}
}
