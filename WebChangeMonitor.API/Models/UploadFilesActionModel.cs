using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace WebChangeMonitor.API.Models {
	public class UploadFilesActionModel {
		public string HashedContent { get; set; }
		public IFormFile File { get; set; }
	}
}
