using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebChangeMonitor.Domain;

namespace WebChangeMonitor.API.Models {
	public class IndexVersionPostActionModel {
		/// <summary>
		/// this indicates uniques identifiers of files uploaded for current version
		/// </summary>
			public cUploadedFile[] Files { get; set; }
		//public int StatusId { get; set; }
		public string Version { get; set; }

		public class cUploadedFile {
      public cFile File { get; set; }
      //public int Id { get; set; }
      //public string LocalName { get; set; }
      //public string LocalRelativePath { get; set; }
      //public string ServerPath { get; set; }
      //public long Length { get; set; }
      //public string EncodedName { get; set; }
      //public DateTime UploadDateTime { get; set; }
      //public DateTime UploadCompleteDateTime { get; set; }
      //public string ContentType { get; set; }
      public int StatusId { get; set; }
    }
	}
}
