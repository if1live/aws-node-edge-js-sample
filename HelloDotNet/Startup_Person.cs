using System;

namespace HelloDotNet
{
    public class Person
    {
        public string input = string.Empty;

        public int anInteger = 1;
        public long anLong;
        public double aNumber = 3.1415;
        public string aString = "foo";
        public bool aBoolean = true;
        public byte[] aBuffer = new byte[4] { 0x1, 0x2, 0x3, 0x4 };
        public object[] anArray = new object[] { 1, "foo" };
        public object anObject = new { a = "foo", b = 12 };
    }

    public class Startup_Person
    {
        public async Task<object> InvokeAsync(dynamic input)
        {
            var ticks = DateTime.UtcNow.Ticks;
            var person = new Person()
            {
                input = input,
                anLong = ticks,
            };
            return await Task.FromResult(person);
        }
    }
}
