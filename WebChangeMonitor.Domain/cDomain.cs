using System;
using System.Collections.Generic;
using System.Text;

namespace WebChangeMonitor.Domain {
	public class cDomain {
		public int Id { get; set; }
		public string HomeUrl { get; set; }
		public string ServerIp { get; set;	 }
		public string Username { get; set; }
		public string Password { get; set; }
		public string TargetServerDirectory { get; set; }
	}
}
