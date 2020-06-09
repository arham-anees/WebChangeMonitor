using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using WebChangeMonitor.API.Models;
using WebChangeMonitor.Domain;
using WebChangeMonitor.UnitOfWork;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebChangeMonitor.API.Controllers {
	[Route("api/[controller]")]
	public class VersionController : Controller {

		private iUnitOfWork _UnitOfWork;
		private IConfiguration _Configuration;

		public VersionController(iUnitOfWork unitOfWork, IConfiguration configuration) {
			_UnitOfWork = unitOfWork;
			_Configuration = configuration;
		}


		[HttpPost]
		[Route("")]
		public IActionResult index([FromBody]IndexVersionPostActionModel actionModel) { 
			//string version,[FromBody]cFile[] file, List<IndexVersionPostActionModel> actionModels) {
			try {
				Log.WriteLine("Request for creating new version received at "+DateTime.Now);
				cVersion version = new cVersion() {
					Version = actionModel.Version,
					Domain = "domain"
				};
				//create version files
				List<cVersionFiles> versionFiles = new List<cVersionFiles>();
				//Log.WriteLine($"number of files is {actionModel.Files.Length}");
				foreach (var item in actionModel.Files.ToList()) {
					//Console.WriteLine(item.EncodedName);
					//Log.WriteLine($"EncodedName: {item.EncodedName}\n Status :{item.StatusId}");
					versionFiles.Add(new cVersionFiles() {
						FileId=_UnitOfWork.FileRepository.Get(item.EncodedName).Id,
						FileStatusId=item.StatusId,
					});

				}
				Log.WriteLine($"total files :{actionModel.Files.Count()}");
				version.VersionFiles = versionFiles;
				version = _UnitOfWork.VersionRepository.Set(version);

				//_UnitOfWork.VersionFileRepository.Set(versionFiles);
				_UnitOfWork.Complete();
				Log.WriteLine("Request for creating new version received");

				return StatusCode(200, actionModel.Files);
			}
			catch (Exception exception) {
				Log.WriteLine(exception);
				return StatusCode(500);
			}
		}

		[HttpGet]
		[Route("")]
	public IActionResult index() {
			try {
				var obj = _UnitOfWork.VersionRepository.Get(14);
				return StatusCode(200, obj);
			}
			catch (Exception exception) {
				Log.WriteLine(exception);
				return StatusCode(500, _Configuration["ErrorMessages:internalError"]);
			}
		}
	}
}
