using System;
using System.Collections.Generic;
using System.Text;

namespace WebChangeMonitor.Domain {
	public class cVersionStatus {
		public int Id { get; set; }
		public string Name { get; set; }

		public IEnumerable<cVersion> Versions { get; set; }
	}
}
