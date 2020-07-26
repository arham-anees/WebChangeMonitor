using System;
using System.Collections.Generic;
using System.Linq;

using FluentFTP;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

using WebChangeMonitor.API.Models;
using WebChangeMonitor.Domain;
using WebChangeMonitor.UnitOfWork;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebChangeMonitor.API.Controllers {
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class VersionsController : Controller {

		private iUnitOfWork _UnitOfWork;
		private IConfiguration _Configuration;

		public VersionsController(iUnitOfWork unitOfWork, IConfiguration configuration) {
			_UnitOfWork = unitOfWork;
			_Configuration = configuration;
		}


		[HttpPost]
		[Route("")]
		public IActionResult index([FromBody]IndexVersionPostActionModel actionModel) {
			//string version,[FromBody]cFile[] file, List<IndexVersionPostActionModel> actionModels) {
			try {
				Log.WriteLine("Request for creating new version received at " + DateTime.Now);
				cVersion version = new cVersion() {
					Version = actionModel.Version,
					Domain = "domain",
					Status = _UnitOfWork.VersionStatusRepository.Get(1)
				};
				//create version files
				List<cVersionFiles> versionFiles = new List<cVersionFiles>();
				//Log.WriteLine($"number of files is {actionModel.Files.Length}");
				foreach (var item in actionModel.Files.ToList()) {
					Console.WriteLine(item.EncodedName);
					Log.WriteLine($"EncodedName: {item.EncodedName}\n Status :{item.StatusId}");
					versionFiles.Add(new cVersionFiles() {
						FileId = _UnitOfWork.FileRepository.Get(item.EncodedName).Id,
						FileStatusId = item.StatusId,
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
				var obj = _UnitOfWork.VersionRepository.GetList();
				return StatusCode(200, obj);
			}
			catch (Exception exception) {
				Log.WriteLine(exception);
				return StatusCode(500, _Configuration["ErrorMessages:internalError"]);
			}
		}

		[HttpGet("{id}")]
		public IActionResult GetVersion(int id) {
			try {
				var obj = _UnitOfWork.VersionRepository.Get(id);
				var lastModifiedBy = _UnitOfWork.VersionRepository.LastModifiedBy(obj.Id);
				Console.WriteLine(obj.Status.Name);
				return StatusCode(200, new { Status = obj.Status.Name, VersionFiles = obj.VersionFiles, Version = obj.Version, 
					Developer = lastModifiedBy.FirstName +" "+lastModifiedBy.LastName, Email=lastModifiedBy.Email, Username=lastModifiedBy.UserName});

			}
			catch (Exception exception) {
				Log.WriteLine(exception,"GetVersion" ,"versions");
				return StatusCode(500, _Configuration["ErrorMessages:internalError"]);
			}
		}

		[HttpPost("upload/{versionId}")]
		public IActionResult UploadToServer(int versionId) {
			try {
				if (false) {
					using (var ftp = new FtpClient("", "", "")) {
						ftp.Connect();

						// upload a folder and all its files
						ftp.UploadDirectory(@"", @"", FtpFolderSyncMode.Mirror);
					}
				}
				using (_UnitOfWork) {
					var version = _UnitOfWork.VersionRepository.Get(versionId);
					if (version == null)
						return NoContent();
				version.Status =_UnitOfWork.VersionStatusRepository.Get(2);
					_UnitOfWork.VersionRepository.Update(version);
					_UnitOfWork.Complete();
				}
				return Ok();
			}
			catch (Exception exception) {
				Log.WriteLine(exception, "UploadToServer", "FilesController");
				return StatusCode(500, exception);
			}
		}
	}
}
