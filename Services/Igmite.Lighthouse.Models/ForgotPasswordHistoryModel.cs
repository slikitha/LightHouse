using Igmite.Lighthouse.Entities;
using Newtonsoft.Json;
using System;
using System.Runtime.Serialization;

namespace Igmite.Lighthouse.Models
{
    [DataContract, Serializable]
    public class ForgotPasswordHistoryModel : ForgotPasswordHistory
    {
        public ForgotPasswordHistoryModel()
        {
        }
    }
}
