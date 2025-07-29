const handleSignup = async () => 
{
    const res = await fetch('http://localhost:5000/api/auth/signup', 
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
        {
            full_name: fullName,
            email,
            password
        }),
    });
    const data = await res.json();
    if (res.ok) 
    {
        console.log('User created:', data);
        alert("Signup successful!");
    } 
    else 
    {
        alert(data.message);
    }
};