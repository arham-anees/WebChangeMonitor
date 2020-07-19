using System;
using System.Collections.Generic;
using System.Text;

namespace WebChangeMonitor.Domain {
	public class cUser {
		/// <summary>
		/// this indicates unique identifier of user
		/// </summary>
		public int Id { get; set; }
		/// <summary>
		/// this indicates first name of user, this is required
		/// </summary>
		public string FirstName { get; set; }
		/// <summary>
		/// this is middle name of user, this is optional
		/// </summary>
		public string MiddleName { get; set; }
		/// <summary>
		/// this is last name of user, this is required
		/// </summary>
		public string LastName { get; set; }
		/// <summary>
		/// this indicates address of user, this is optional
		/// </summary>
		public string Address { get; set; }
		/// <summary>
		/// this is city of user, this is required
		/// </summary>
		public string City { get; set; }
		/// <summary>
		/// this is unique username of user
		/// </summary>
		public string UserName { get; set; }
		/// <summary>
		/// this is hash of user password
		/// </summary>
		public string HashedPassword { get; set; }
		/// <summary>
		/// this is email of user, this is optional
		/// </summary>
		public string Email { get; set; }
		/// <summary>
		/// this is phone number of user
		/// </summary>
		public string Phone { get; set; }
		/// <summary>
		/// this indicates who registered the user, null indicates user is registered by him/herself
		/// </summary>
		//public string RegisteredBy { get; set; }
		/// <summary>
		/// this indicates registration date of user
		/// </summary>
		///public DateTime DateRegisteredOn { get; set; }
		/// <summary>
		/// this indicates date of last modification to these information
		/// </summary>
		///public DateTime LastModifiedOn { get; set; }
		
		/// <summary>
		/// this indicates status of user
		/// </summary>
		public bool IsActive { get; set; } = true;
		

		public virtual cDomain Domain { get; set; }
		public int DomainId { get; set; }
	}
}
