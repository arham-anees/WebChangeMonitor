using System;
using System.Collections.Generic;
using System.Text;

namespace WebChangeMonitor.Domain {
	public class cFileStatus {
		public int Id { get; set; }
		public string Name { get; set; }
		public IEnumerable<cVersionFiles> VersionFiles { get; set; }
	}
}
