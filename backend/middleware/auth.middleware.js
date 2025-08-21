import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
export const authenticate = (req, res, next) => 
{
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) 
  {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try 
  {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } 
  catch (err) 
  {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
export async function signup(req, res) 
{
  try 
  {
    const { full_name, email, password } = req.body;
    if (!full_name || !email || !password) 
    {
      return res.status(400).json({ message: 'Full name, email, and password are required' });
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) 
    {
      return res.status(409).json({ message: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      full_name,
      email,
      password: hashedPassword
    });
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, 
    {
      expiresIn: '2h'
    });
    return res.status(201).json({
      message: 'Signup successful',
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email
      }
    });
  } 
  catch (error) 
  {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
export async function login(req, res) 
{
  try 
  {
    const { email, password } = req.body;
    if (!email || !password) 
    {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) 
    {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) 
    {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, 
    {
      expiresIn: '2h'
    });
    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email
      }
    });
  } 
  catch (error) 
  {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
export async function profile(req, res) 
{
  try 
  {
    const user = await User.findByPk(req.user.id, 
    {
      attributes: ['id', 'full_name', 'email']
    });
    if (!user) 
    {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({ user });
  } 
  catch (error) 
  {
    console.error('Profile error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}