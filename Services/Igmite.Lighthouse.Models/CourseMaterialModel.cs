using Igmite.Lighthouse.Entities;
using System;
using System.Runtime.Serialization;

namespace Igmite.Lighthouse.Models
{
    [DataContract, Serializable]
    public class CourseMaterialModel : CourseMaterial
    {
        public CourseMaterialModel()
        {
        }

        [DataMember]
        public virtual Guid? VTPId { get; set; }

        [DataMember]
        public virtual Guid? VCId { get; set; }

        [DataMember]
        public virtual Guid? SchoolId { get; set; }
    }
}