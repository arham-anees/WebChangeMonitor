using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using WebChangeMonitor.API.Models;
using WebChangeMonitor.Domain;
using WebChangeMonitor.UnitOfWork;

namespace WebChangeMonitor.API.Controllers
{
    [Route("api/files")]
    [ApiController]
    public class FilesController : ControllerBase {

        private readonly IConfiguration _Configuration;
        private readonly iUnitOfWork _UnitOfWork;
        private readonly IWebHostEnvironment _WebHostEnvironment;

        public FilesController(IConfiguration configuration, iUnitOfWork unitOfWork,IWebHostEnvironment webHostEnvironment) {
            _Configuration = configuration;
            _UnitOfWork = unitOfWork;
            _WebHostEnvironment = webHostEnvironment;
        }

        [HttpPost]
        [Route("Upload")]
        public IActionResult UploadFiles([FromBody] IFormFile file) {
            try {
                
                DateTime uploadStartDateTime=DateTime.Now;
                //generate random name for file and check uniqueness

                string serverPath = "",
                    encodedName = "";
                do {
                    encodedName = Path.GetRandomFileName() + DateTime.Now;
                } while (_UnitOfWork.FileRepository.IsNameExists(encodedName));
                serverPath = _WebHostEnvironment.WebRootPath + "/Resources/" + encodedName;


                //upload file
                using (var stream = System.IO.File.Create(serverPath)) {
                     file.CopyTo(stream);
                }

                //populate fileEntity with local information of file
                cFile fileEntity = new cFile() {
                    Length = file.Length,
                    LocalRelativePath = file.FileName,
                    LocalName = file.FileName.Split('/').Last(),
                    HashedContent = GetHash(System.IO.File.ReadAllText(serverPath)),
                    EncodedName = encodedName,
                    ServerPath = serverPath,
                    UploadDateTime = uploadStartDateTime,
                    UploadCompleteDateTime = DateTime.Now
                };


                //Save to db
                using (_UnitOfWork) {

                    _UnitOfWork.FileRepository.Set(fileEntity);
                    _UnitOfWork.Complete();
                }


                //TODO: URI will provide location for viewing file
                return Created("", new { file });
            }
            catch (Exception e) {
                return StatusCode(500, _Configuration["errorMessages:internalError"]);
            }
        }


        public IActionResult CheckFiles([FromBody]IEnumerable<CheckChangedFilesActionModel> checkChangedFiles) {
            try {
                return StatusCode(200, checkChangedFiles);
            }
            catch (Exception exception) {
                return StatusCode(500, _Configuration["errorMessages:internalError"]);
            }
        }

        private static string GetHash( string input) {

            HashAlgorithm hashAlgorith=SHA256.Create();
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