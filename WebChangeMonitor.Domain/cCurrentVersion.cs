using System;
using System.Collections.Generic;
using System.Text;

namespace WebChangeMonitor.Domain {
	public class cCurrentVersion {
		/// <summary>
		/// this indicates unique record of version
		/// </summary>
		public int Id { get; set; }
		/// <summary>
		/// this indicates version of website
		/// </summary>
		public cVersion Version { get; set; }

	}
}
