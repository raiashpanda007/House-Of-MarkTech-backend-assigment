import "express"; 
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string; 
        email: string;
        type: string;
        name: string;
      }
      
    }
  }
}