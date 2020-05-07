using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public FilesController(IConfiguration configuration, iUnitOfWork unitOfWork) {
            _Configuration = configuration;
            _UnitOfWork = unitOfWork;
        }

        [HttpPost]
        [Route("ChangedFiles")]
        public IActionResult ChangedFiles([FromBody] ChangeFilesActionModel changeFile) {
            try {
                using (_UnitOfWork) {

                    _UnitOfWork.FileRepository.Set(new cFile() {
                        LocalName = changeFile.LocalName,
                        LocalRelativePath = changeFile.LocalPath,
                        HashedContent = changeFile.HashedContent,
                        UploadDateTime = DateTime.Now,
                        Length = 0
                    });
                    _UnitOfWork.Complete();
                }

                return Created("", new {
                    LocalName = changeFile.LocalName,
                    LocalRelativePath = changeFile.LocalPath,
                    HashedContent = changeFile.HashedContent,
                    UploadDateTime = DateTime.Now,
                    Length = 0
                });
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
    }
}