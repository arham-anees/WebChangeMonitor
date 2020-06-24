using System;
using System.Collections.Generic;
using System.Text;

namespace WebChangeMonitor.Domain {
	public class cAcceptanceStatus {
		public int Id { get; set; }
		public cVersion Version { get; set; }
		public bool IsAccepted { get; set; }
		public string Remarks { get; set; }
		public bool IsActive { get; set; }
	}
}
