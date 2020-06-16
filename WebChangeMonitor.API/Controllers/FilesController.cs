using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using WebChangeMonitor.API.Helper;
using WebChangeMonitor.API.Models;
using WebChangeMonitor.Domain;
using WebChangeMonitor.UnitOfWork;

namespace WebChangeMonitor.API.Controllers {
	[Route("api/files")]
	[ApiController]
	public class FilesController : ControllerBase {

		private readonly IConfiguration _Configuration;
		private readonly iUnitOfWork _UnitOfWork;
		private readonly IWebHostEnvironment _WebHostEnvironment;

		public FilesController(IConfiguration configuration, iUnitOfWork unitOfWork, IWebHostEnvironment webHostEnvironment) {
			_Configuration = configuration;
			_UnitOfWork = unitOfWork;
			_WebHostEnvironment = webHostEnvironment;
		}

		/// <summary>
		/// this method get website name and return its current version files
		/// </summary>
		/// <param name="website">name of website, developer is developing</param>
		/// <returns></returns>
		[HttpGet][Route("")]
		[Authorize]
		public IActionResult GetFiles() {
			if (ModelState.IsValid) {
				try {
					Log.Information("request to get all website files "+ DateTime.Now);

					Log.Information(cHelper.Username(HttpContext));

					var data = _UnitOfWork.VersionRepository.Get();

					var data2 = _UnitOfWork.FileRepository.GetAll().OrderByDescending(x=>x.UploadDateTime).Select(x => new {
						LocalPath = x.LocalRelativePath,
						Name = x.LocalName,
						EncodedName = x.EncodedName,
						FileType = x.ContentType,
						ServerPath =x.ServerPath
					})
						.Distinct();
					return StatusCode(200, data);
				}
				catch (Exception exception) {
					Log.WriteLine(exception);
					return StatusCode(500, _Configuration["errorMessages:internalError"]);
				}
			}
			return StatusCode(400, new { ModelState.Values });
		}

		/// <summary>
		/// this action upload files generating random name to avoid conflict between files and then save record in database
		/// </summary>
		/// <param name="files">file selected by user for upload</param>
		/// <returns>status code of operation</returns>
		[HttpPost][Route("")]
		public IActionResult UploadFile(IFormFile file) {
			if (ModelState.IsValid) {
				try {
					cFile fileEntity;
					if (file == null) {
						Log.WriteLine("file is empty");
						return BadRequest("no file sent");
					}//foreach (var file in files)
					{
						Console.WriteLine(file.FileName);

						DateTime uploadStartDateTime = DateTime.Now;
						//generate random name for file and check uniqueness

						string serverPath = "",
								encodedName = "";
						do {
							encodedName =$"{Path.GetRandomFileName()}.{DateTime.Now.Ticks}.{DateTime.Now.DayOfYear}.{DateTime.Now.Year}";
						} while (_UnitOfWork.FileRepository.IsNameExists(encodedName));
						serverPath = Path.Combine(_WebHostEnvironment.ContentRootPath.ToUpper(), "ClientSourcesFiles", encodedName);
						Log.WriteLine(serverPath);

						//upload file
						using (var stream = System.IO.File.Create(serverPath)) {
							file.CopyTo(stream);
						}

						//populate fileEntity 
						fileEntity = new cFile() {
							Length = file.Length,
							LocalRelativePath = file.FileName,
							LocalName = file.FileName.Split('/').Last(),
							//HashedContent = GetHash(System.IO.File.ReadAllText(serverPath)),
							EncodedName = encodedName,
							ServerPath = serverPath,
							UploadDateTime = uploadStartDateTime,
							UploadCompleteDateTime = DateTime.Now
						};


						//Save to db
						//using (_UnitOfWork) {

						_UnitOfWork.FileRepository.Set(fileEntity);
						_UnitOfWork.Complete();
						//}

					}

					//TODO: URI will provide location for viewing file
					return StatusCode(201, new { file = fileEntity });
				}
				catch (Exception e) {
					Console.WriteLine(e.Message);
					return StatusCode(500, _Configuration["errorMessages:internalError"]);
				}
			}
			else
				return BadRequest("ModelState errors");
		}
		
		//[HttpPost]
		//[Route("testUpload")]
		//public IActionResult UploadFiles(UploadFilesActionModel actionModel) {
		//	Console.WriteLine(actionModel.HashedContent);
		//	return StatusCode(200);
		//}
		
		/// <summary>
		/// this action checks files and its hashed content against any record in database to upload only modified files
		/// </summary>
		/// <param name="checkChangedFiles">list of files selected by user</param>
		/// <returns>List of files that either don't exists or are modified</returns>
		[HttpPost]
		[Route("Check")]
		public IActionResult CheckFiles([FromBody]IEnumerable<CheckChangedFilesActionModel> checkChangedFiles) {
			try {
				Console.WriteLine("test "+checkChangedFiles.ElementAt(0).HashedContent);
				var changedFilesList = new List<CheckChangedFilesActionModel>();
				using (_UnitOfWork) {
					foreach (var file in checkChangedFiles) {
						if (!_UnitOfWork.FileRepository.IsDuplicate(file.LocalPath, file.HashedContent))
							changedFilesList.Add(file);
					}
				}
				return StatusCode(200, changedFilesList);
			}
			catch (Exception exception) {
				return StatusCode(500, _Configuration["errorMessages:internalError"]);
			}
		}        /// <summary>
						 
		
		/// <summary>
		/// this method returns files of website of authenticated user
		/// </summary>
		/// <returns>list of files</returns>
		[HttpGet]
		[Route("a")]
		public IActionResult _GetFiles() {
			try {
				var data = _UnitOfWork.FileRepository.GetAll().Select(x => new {
					LocalPath = x.LocalRelativePath,
					Name=x.LocalName,
					EncodedName = x.EncodedName,
					FileType = x.ContentType,
					LastModifiedDate=x.UploadDateTime
				});
				return StatusCode(200, data);
			}
			catch (Exception e) {
				System.Diagnostics.Debug.WriteLine(e);
				return StatusCode(500);
			}
		}

		[HttpGet]
		[Route("{encodedName}")]
		public IActionResult GetFile(string encodedName) {
			try {
				var serverPath = Path.Combine(_WebHostEnvironment.ContentRootPath, "ClientSourcesFiles", encodedName);

				var content = System.IO.File.ReadAllText(serverPath);

				var file = _UnitOfWork.FileRepository.Get(encodedName);
				return StatusCode(200, new { content, encodedName,  file});
			}
			catch (Exception e) {
				Debug.WriteLine(e);
				return StatusCode(500);
			}
		}
		private static string GetHash(string input) {

			HashAlgorithm hashAlgorith = SHA256.Create();
			// Convert the input string to a byte array and compute the hash.
			byte[] data = hashAlgorith.ComputeHash(Encoding.UTF8.GetBytes(input));

			// Create a new Stringbuilder to collect the bytes
			// and create a string.
			var sBuilder = new StringBuilder();

			// Loop through each byte of the hashed data
			// and format each one as a hexadecimal string.
			for (int i = 0; i < data.Length; i++) {
				sBuilder.Append(data[i].ToString("x2"));
			}

			// Return the hexadecimal string.
			return sBuilder.ToString();
		}
	}
}