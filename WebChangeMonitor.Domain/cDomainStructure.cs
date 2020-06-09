using System;
using System.Collections.Generic;
using System.Text;

namespace WebChangeMonitor.Domain {
	public class cDomainStructure {
		public int Id { get; set; }
		public cFile File { get; set; }
		public int FileId { get; set; }
		public string Domain { get; set; }
		public cVersion Version { get; set; }
		public int VersionId { get; set; }
	}
}
