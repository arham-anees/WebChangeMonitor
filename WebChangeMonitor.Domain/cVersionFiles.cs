using System;
using System.Collections.Generic;
using System.Text;

namespace WebChangeMonitor.Domain {
	public class cVersionFiles {
		public int Id { get; set; }
		public cVersion Version { get; set; }
		public cFile File { get; set; }
	}
}
