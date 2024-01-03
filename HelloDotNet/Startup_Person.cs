namespace HelloDotNet
{
    public class Person
    {
        public int anInteger = 1;
        public double aNumber = 3.1415;
        public string aString = "foo";
        public bool aBoolean = true;
        public byte[] aBuffer = new byte[10];
        public object[] anArray = new object[] { 1, "foo" };
        public object anObject = new { a = "foo", b = 12 };
    }

    public class Startup_Person
    {
        public async Task<object> InvokeAsync(dynamic input)
        {
            await Task.Delay(10);

            var person = new Person();
            return person;
        }
    }
}
