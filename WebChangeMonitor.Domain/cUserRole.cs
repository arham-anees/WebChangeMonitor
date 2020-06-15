using System;
using System.Collections.Generic;
using System.Text;

namespace WebChangeMonitor.Domain {
    public class cUserRole {
        /// <summary>
        /// this is unique identifier of relationship
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// this indicates user of role
        /// </summary>
        public cUser User { get; set; }
        /// <summary>
        /// this indicates role of user
        /// </summary>
        public cRole Role { get; set; }
        /// <summary>
        /// this indicates date of assigning role
        /// </summary>
        ///public DateTime DateAddedOn { get; set; }
        /// <summary>
        /// this indicates user who assigned this role
        /// </summary>
        //public int AssignBy { get; set; }
        /// <summary>
        /// this indicates date when this role was assigned 
        /// </summary>
        //public DateTime AssignOn { get; set; }
        /// <summary>
        /// this indicates date of last modification of relationship
        /// </summary>
        ///public DateTime DateLastModifiedOn { get; set; }
        /// <summary>
        /// this indicates user who last modified relationship
        /// </summary>
        ///public string LastModifiedBy { get; set; }
        /// <summary>
        /// this indicates status of relationship
        /// </summary>
        public bool IsActive { get; set; }
    }
}
